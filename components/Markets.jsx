'use client';

import { useState, useMemo } from 'react';
import { fmt, genSeries, Sparkline, Reveal } from '@/components/lib';

// Markets screen — segmented (Rates / Equities / FX / Commodities / Crypto)
// and a list of instrument rows with sparklines and status pills.

const MARKETS_DATA = {
  Rates: [
    { sym: 'US2Y',    name: 'US 2-Year',   px: 4.82,  chg: 1.05,  status: ['Hawkish', 'green'],     spark: { seed: 21, up: true } },
    { sym: 'US5Y',    name: 'US 5-Year',   px: 4.41,  chg: 0.68,  status: ['Neutral', 'green'],     spark: { seed: 22, up: true } },
    { sym: 'US10Y',   name: 'US 10-Year',  px: 4.37,  chg: 0.46,  status: ['Bear Flatten', 'green'], spark: { seed: 23, up: true } },
    { sym: 'US30Y',   name: 'US 30-Year',  px: 4.52,  chg: -0.22, status: ['Bear Flatten', 'red'],   spark: { seed: 24, up: false } },
    { sym: 'BUND10Y', name: 'Bund 10-Year',px: 2.45,  chg: 1.66,  status: ['Hawkish', 'green'],     spark: { seed: 25, up: true } },
    { sym: 'JGB10Y',  name: 'JGB 10-Year', px: 0.88,  chg: 1.15,  status: ['Yield Cap', 'green'],   spark: { seed: 26, up: true } },
    { sym: 'GILT10Y', name: 'Gilt 10-Year',px: 4.12,  chg: 1.48,  status: ['Hawkish', 'green'],     spark: { seed: 27, up: true } },
  ],
  Equities: [
    { sym: 'SPX',     name: 'S&P 500',         px: 5234.88, chg: -0.34, status: ['Choppy', 'orange'], spark: { seed: 31, up: false } },
    { sym: 'NDX',     name: 'Nasdaq 100',      px: 18432.5, chg: -0.42, status: ['Tech Heavy', 'red'], spark: { seed: 32, up: false } },
    { sym: 'RTY',     name: 'Russell 2000',    px: 2068.4,  chg: 0.85,  status: ['Rotating', 'green'], spark: { seed: 33, up: true } },
    { sym: 'STOXX50', name: 'Euro Stoxx 50',   px: 5045.2,  chg: 0.52,  status: ['Bullish', 'green'], spark: { seed: 34, up: true } },
    { sym: 'NKY',     name: 'Nikkei 225',      px: 38617.1, chg: 1.18,  status: ['Bullish', 'green'], spark: { seed: 35, up: true } },
    { sym: 'HSI',     name: 'Hang Seng',       px: 19012.4, chg: -0.91, status: ['Bearish', 'red'],   spark: { seed: 36, up: false } },
  ],
  FX: [
    { sym: 'EUR/USD', name: 'Euro / US Dollar',          px: 1.0845,  chg: -0.11, status: ['Bearish', 'red'],   spark: { seed: 41, up: false } },
    { sym: 'GBP/USD', name: 'Pound / US Dollar',         px: 1.265,   chg: -0.16, status: ['Neutral', 'red'],   spark: { seed: 42, up: false } },
    { sym: 'USD/JPY', name: 'US Dollar / Yen',           px: 151.80,  chg: 0.16,  status: ['Intervention Risk', 'green'], spark: { seed: 43, up: true } },
    { sym: 'USD/CNH', name: 'US Dollar / Offshore Yuan', px: 7.254,   chg: 0.07,  status: ['Bullish', 'green'], spark: { seed: 44, up: true } },
    { sym: 'DXY',     name: 'US Dollar Index',           px: 104.32,  chg: 0.14,  status: ['Bullish', 'green'], spark: { seed: 45, up: true } },
  ],
  Commodities: [
    { sym: 'WTI',  name: 'WTI Crude',     px: 78.42, chg: 1.24,  status: ['Backwardation', 'green'], spark: { seed: 51, up: true } },
    { sym: 'GOLD', name: 'Gold Spot',     px: 2342.7, chg: 0.62, status: ['Bullish', 'green'],       spark: { seed: 52, up: true } },
    { sym: 'CU',   name: 'Copper',        px: 4.61,  chg: -0.85, status: ['Bearish', 'red'],         spark: { seed: 53, up: false } },
    { sym: 'NG',   name: 'Natural Gas',   px: 2.74,  chg: 2.18,  status: ['Volatile', 'orange'],     spark: { seed: 54, up: true } },
    { sym: 'XAG',  name: 'Silver Spot',   px: 31.42, chg: 1.45,  status: ['Bullish', 'green'],       spark: { seed: 55, up: true } },
  ],
  Crypto: [
    { sym: 'BTC',  name: 'Bitcoin',  px: 67342.0, chg: 2.18,  status: ['Bullish', 'green'],  spark: { seed: 61, up: true } },
    { sym: 'ETH',  name: 'Ethereum', px: 3514.6,  chg: 1.42,  status: ['Bullish', 'green'],  spark: { seed: 62, up: true } },
    { sym: 'SOL',  name: 'Solana',   px: 172.5,   chg: 3.85,  status: ['Momentum', 'green'], spark: { seed: 63, up: true } },
    { sym: 'BNB',  name: 'BNB',      px: 612.4,   chg: -0.42, status: ['Neutral', 'red'],    spark: { seed: 64, up: false } },
    { sym: 'XRP',  name: 'XRP',      px: 0.5184,  chg: -1.12, status: ['Bearish', 'red'],    spark: { seed: 65, up: false } },
  ],
};

export function MarketsScreen() {
  const cats = Object.keys(MARKETS_DATA);
  const [cat, setCat] = useState('Rates');
  const rows = MARKETS_DATA[cat];

  return (
    <div className="pt-3">
      {/* segmented bar */}
      <div className="no-scrollbar overflow-x-auto pb-3 px-4">
        <div className="flex gap-2 w-max">
          {cats.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-semibold tracking-tight ${
                  active ? 'seg-active' : 'text-mute bg-white/[0.04] border border-white/5'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* rows */}
      <div className="space-y-3 px-4">
        {rows.map((r, i) => (
          <Reveal key={r.sym} delay={i * 60}>
            <MarketRow r={r} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function MarketRow({ r }) {
  const up = r.chg >= 0;
  const sparkStroke = r.spark.up ? '#22C55E' : '#EF4444';
  // Build a deterministic series biased by spark.up
  const data = useMemo(() => {
    const base = genSeries(r.spark.seed, 18, 0.8, r.spark.up ? 0.06 : -0.06);
    return base;
  }, [r.spark.seed, r.spark.up]);

  const [statusText, statusTone] = r.status;
  const fmtPx = (v) => {
    if (Math.abs(v) >= 1000) return fmt(v, 2);
    if (Math.abs(v) >= 100) return fmt(v, 2);
    if (Math.abs(v) >= 10) return fmt(v, 2);
    if (Math.abs(v) >= 1) return fmt(v, 3);
    return fmt(v, 4);
  };

  return (
    <div className="card px-4 py-3.5 flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-[17px] font-bold tracking-tight text-fg leading-tight truncate">
          {r.sym}
        </div>
        <div className="text-[12px] text-mute mt-0.5 truncate">{r.name}</div>
      </div>

      <Sparkline data={data} width={70} height={28} stroke={sparkStroke} strokeWidth={1.7} />

      <div className="text-right shrink-0 min-w-[60px]">
        <div className="num text-[16px] font-bold text-fg leading-tight">
          {fmtPx(r.px)}
        </div>
        <div className={`num text-[12px] mt-0.5 ${up ? 'text-green' : 'text-red'}`}>
          {up ? '+' : ''}
          {fmt(r.chg, 2)}%
        </div>
      </div>

      <span className={`pill pill-${statusTone} shrink-0`} style={{ fontSize: 11, padding: '4px 8px' }}>
        {statusText}
      </span>
    </div>
  );
}

export default MarketsScreen;
