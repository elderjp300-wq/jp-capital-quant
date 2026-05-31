'use client';

import { useState, useEffect } from 'react';
import { fmt, Sparkline, Card, Reveal, I } from '@/components/lib';

// Markets screen — AI macro board.
// 4 key assets (Gold, US 10Y, BTC, EUR/USD), each with live price + spark
// + an AI-written cross-asset read, plus a desk synthesis footer.
// Data comes from /api/market-reads (FRED + Twelve Data + CoinGecko + Groq).

const ASSETS = [
  { id: 'gold',   sym: 'XAU/USD', name: 'Gold Spot',          decimals: 2, unit: '$' },
  { id: 'us10y',  sym: 'US 10Y',  name: 'US 10-Year Yield',   decimals: 2, unit: '',  suffix: '%' },
  { id: 'btc',    sym: 'BTC',     name: 'Bitcoin',            decimals: 0, unit: '$' },
  { id: 'eurusd', sym: 'EUR/USD', name: 'Euro / US Dollar',   decimals: 4, unit: '' },
];

// Map each asset id to its spark source in the snapshot/route data.
function useMarketBoard() {
  const [board, setBoard] = useState(null);
  const [sparks, setSparks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    // Main AI board (prices + reads + desk)
    const boardP = fetch('/api/market-reads')
      .then((r) => r.json())
      .then((j) => { if (alive) { if (j.error) setError(true); else setBoard(j); } })
      .catch(() => { if (alive) setError(true); });

    // Spark series (fetched in parallel from the same cached routes)
    const sparkP = Promise.all([
      fetch('/api/markets?symbol=XAU/USD').then((r) => r.json()).catch(() => null),
      fetch('/api/markets?symbol=EUR/USD').then((r) => r.json()).catch(() => null),
      fetch('/api/crypto').then((r) => r.json()).catch(() => null),
      fetch('/api/fred?series=DGS10&limit=22').then((r) => r.json()).catch(() => null),
    ]).then(([gold, eur, btc, fred]) => {
      if (!alive) return;
      const fredSeries =
        fred && Array.isArray(fred.DGS10)
          ? fred.DGS10.map((o) => o.value).reverse()
          : [];
      setSparks({
        gold: gold && gold.series ? gold.series : [],
        eurusd: eur && eur.series ? eur.series : [],
        btc: btc && btc.series ? btc.series : [],
        us10y: fredSeries,
      });
    });

    Promise.all([boardP, sparkP]).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { board, sparks, loading, error };
}

function AssetCard({ asset, snap, read, spark }) {
  const price = snap ? snap.price : null;
  const chg = snap ? (asset.id === 'us10y' ? snap.chg30pts : snap.chg30) : null;
  const up = (chg ?? 0) >= 0;
  // For gold/EUR a rise is "green"; for 10Y we keep green=up too (neutral convention).
  const moveColor = up ? '#22C55E' : '#EF4444';

  const priceTxt =
    price == null
      ? '—'
      : `${asset.unit}${fmt(price, asset.decimals)}${asset.suffix || ''}`;

  const chgTxt =
    chg == null
      ? ''
      : asset.id === 'us10y'
      ? `${up ? '+' : ''}${fmt(chg, 2)}pts 30D`
      : `${up ? '+' : ''}${fmt(chg, 2)}% 30D`;

  return (
    <Card title={asset.sym} right={<span className="text-mute text-[12px]">{asset.name}</span>}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="big-num text-[30px] leading-none">{priceTxt}</div>
          <div className="num text-[13px] mt-1.5" style={{ color: moveColor }}>
            {chgTxt}
          </div>
        </div>
        <div className="shrink-0 pb-1">
          <Sparkline
            data={spark && spark.length ? spark : [1, 1.02, 0.99, 1.01, 1]}
            width={96}
            height={40}
            stroke={moveColor}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {read ? (
        <div className="note-card p-3.5 mt-4 space-y-2">
          <p className="text-[14px] leading-[1.5] text-fg2">{read.move}</p>
          <p className="text-[14px] leading-[1.5] text-mute">
            <span className="text-blue font-semibold">Implication: </span>
            {read.implication}
          </p>
        </div>
      ) : (
        <div className="note-card p-3.5 mt-4">
          <p className="text-[13px] text-mute">Read unavailable.</p>
        </div>
      )}
    </Card>
  );
}

export function MarketsScreen() {
  const { board, sparks, loading, error } = useMarketBoard();
  const snap = board ? board.snapshot : null;
  const reads = board ? board.reads : null;
  const desk = reads ? reads.desk : null;
  const updated = board ? board.updated : null;

  const fmtUpdated = (iso) => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });
    } catch { return ''; }
  };

  return (
    <div className="pt-4 px-4 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-[20px] font-bold tracking-tight text-fg">Macro Board</h1>
        <span className="text-mute text-[12px]">
          {loading ? 'Loading…' : updated ? `Updated ${fmtUpdated(updated)}` : ''}
        </span>
      </div>

      {error && !board ? (
        <div className="note-card p-4 text-mute text-[14px]">
          Live board unavailable right now. Pull to refresh shortly.
        </div>
      ) : null}

      {ASSETS.map((a, i) => (
        <Reveal key={a.id} delay={i * 70}>
          <AssetCard
            asset={a}
            snap={snap ? snap[a.id] : null}
            read={reads ? reads[a.id] : null}
            spark={sparks ? sparks[a.id] : null}
          />
        </Reveal>
      ))}

      {/* Desk synthesis footer */}
      <Reveal delay={ASSETS.length * 70}>
        <section className="card-accent p-5 mt-1">
          <header className="flex items-center gap-3 mb-3">
            <span className="icon-blue w-9 h-9 rounded-xl grid place-items-center text-blue">
              <I.spark className="w-4 h-4" />
            </span>
            <span className="text-blue font-semibold tracking-[0.08em] text-[12.5px]">
              DESK TAKE
            </span>
          </header>
          <p className="text-fg2 text-[15.5px] leading-[1.55]">
            {desk || (loading ? 'Synthesizing the board…' : 'Desk take unavailable.')}
          </p>
        </section>
      </Reveal>
    </div>
  );
}

export default MarketsScreen;
