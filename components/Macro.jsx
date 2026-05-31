'use client';

import { useFred } from '@/components/useFred';
import { pct, fmt, Card, Reveal } from '@/components/lib';

// Macro screen — Cycle Phase ring, Global Regime Map grid,
// Central Bank Policy Tracker rows, 3M Cross-Asset Momentum bars.

/* ───────── US Macro Metrics (live FRED) ───────── */
export function MacroMetricsCard() {
  // 13 months covers YoY for the monthly indices; GDPC1 quarterly.
  const { data } = useFred('CPIAUCSL,CPILFESL,PCEPI,UNRATE,ICSA,GDPC1', 13);

  const ser = (id) => (data && Array.isArray(data[id]) ? data[id] : []);

  // Year-over-year % for an index series (latest vs ~12 periods back)
  const yoy = (id) => {
    const a = ser(id);
    if (a.length < 13) return null;
    return (a[0].value / a[12].value - 1) * 100;
  };
  // Latest raw value + its date
  const latest = (id) => {
    const a = ser(id);
    return a.length ? a[0] : null;
  };
  // QoQ annualized real growth for GDPC1
  const gdpGrowth = () => {
    const a = ser('GDPC1');
    if (a.length < 2) return null;
    const q = a[0].value / a[1].value; // quarterly ratio
    return (Math.pow(q, 4) - 1) * 100;  // annualized
  };

  const cpi = yoy('CPIAUCSL');
  const core = yoy('CPILFESL');
  const pce = yoy('PCEPI');
  const un = latest('UNRATE');
  const claims = latest('ICSA');
  const gdp = gdpGrowth();

  // MoM / WoW deltas for the raw-value metrics
  const unPrev = ser('UNRATE')[1];
  const claimsPrev = ser('ICSA')[1];
  const unDelta = un && unPrev ? un.value - unPrev.value : null;
  const claimsDelta = claims && claimsPrev ? claims.value - claimsPrev.value : null;

  const fmtDate = (d) => {
    if (!d) return '';
    try {
      return new Date(d + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
    } catch { return d; }
  };

  // Inflation: lower = good (green when <= 2.5, orange mid, red hot)
  const inflTone = (v) =>
    v == null ? 'text-fg' : v <= 2.5 ? 'text-green' : v <= 3.5 ? 'text-orange' : 'text-red';

  const metrics = [
    { k: 'CPI (YoY)',   v: cpi == null ? '—' : pct(cpi, 1),  sub: fmtDate(latest('CPIAUCSL')?.date), tone: inflTone(cpi) },
    { k: 'Core CPI',    v: core == null ? '—' : pct(core, 1), sub: fmtDate(latest('CPILFESL')?.date), tone: inflTone(core) },
    { k: 'PCE (YoY)',   v: pce == null ? '—' : pct(pce, 1),   sub: fmtDate(latest('PCEPI')?.date),    tone: inflTone(pce) },
    { k: 'Unemployment',v: un == null ? '—' : fmt(un.value, 1) + '%',
        sub: (unDelta == null ? '' : (unDelta >= 0 ? '+' : '') + fmt(unDelta, 1) + 'pp · ') + fmtDate(un?.date),
        tone: 'text-fg' },
    { k: 'Jobless Claims', v: claims == null ? '—' : Math.round(claims.value / 1000) + 'K',
        sub: (claimsDelta == null ? '' : (claimsDelta >= 0 ? '+' : '') + Math.round(claimsDelta / 1000) + 'K · ') + fmtDate(claims?.date),
        tone: claimsDelta != null && claimsDelta > 0 ? 'text-orange' : 'text-fg' },
    { k: 'GDP (real)',  v: gdp == null ? '—' : pct(gdp, 1),   sub: fmtDate(latest('GDPC1')?.date) + ' ann.', tone: gdp != null && gdp >= 0 ? 'text-green' : 'text-red' },
  ];

  return (
    <Card title="US Macro Metrics" right={<span className="text-mute text-[12px]">latest actuals</span>}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {metrics.map((m) => (
          <div key={m.k}>
            <div className="label text-[11px]">{m.k}</div>
            <div className={`big-num text-[24px] mt-1 ${m.tone}`}>{m.v}</div>
            <div className="text-mute num text-[11px] mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────── Macro Cycle Phase ring ───────── */
export function MacroCyclePhaseCard() {
  // 4-segment ring: Recovery (green/teal), Expansion (orange), Slowdown (orange-yellow), Recession (red), Recovery (blue)
  // Mirroring screenshot: top-left red (recession), top-right orange (slowdown — active), bottom-right green (recovery), bottom-left blue (expansion)
  const R = 56;
  const C = 70;
  const seg = (from, to, color) => {
    // angle 0 = 12 o'clock, clockwise
    const a1 = (from / 100) * Math.PI * 2 - Math.PI / 2;
    const a2 = (to / 100) * Math.PI * 2 - Math.PI / 2;
    const x1 = C + R * Math.cos(a1);
    const y1 = C + R * Math.sin(a1);
    const x2 = C + R * Math.cos(a2);
    const y2 = C + R * Math.sin(a2);
    const large = to - from > 50 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(
      2,
    )} ${y2.toFixed(2)}`;
  };

  // dot position on active (Slowdown) segment — about 32% around (top-right)
  const dotA = (32 / 100) * Math.PI * 2 - Math.PI / 2;
  const dotX = C + R * Math.cos(dotA);
  const dotY = C + R * Math.sin(dotA);

  return (
    <Card
      title="Macro Cycle Phase"
      right={
        <div className="flex items-center gap-2">
          <span className="text-mute text-[13px]">Current Phase</span>
          <span className="pill pill-orange">Slowdown</span>
        </div>
      }
    >
      <div className="flex items-center gap-5">
        <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
          <svg viewBox="0 0 140 140" className="w-full h-full">
            {/* track */}
            <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            {/* segments */}
            <path d={seg(75, 100, '#EF4444')} stroke="#EF4444" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d={seg(0, 25, '#F59E0B')} stroke="#F59E0B" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d={seg(25, 50, '#22C55E')} stroke="#22C55E" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d={seg(50, 75, '#3B82F6')} stroke="#3B82F6" strokeWidth="10" fill="none" strokeLinecap="round" />
            {/* active dot */}
            <circle
              cx={dotX}
              cy={dotY}
              r="6"
              fill="#F59E0B"
              stroke="#0B0D12"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.7))' }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-[14px] font-semibold leading-tight">Late</div>
              <div className="text-[14px] font-semibold leading-tight">Cycle</div>
            </div>
          </div>
        </div>
        <p className="text-fg2 text-[14.5px] leading-[1.55] flex-1">
          Growth decelerating while inflation remains sticky. Bias towards defensive
          equities and duration.
        </p>
      </div>
    </Card>
  );
}

/* ───────── Global Regime Map ───────── */
export function GlobalRegimeCard() {
  const regions = [
    { k: 'US',    pill: ['Hawkish', 'blue'],     gdp: '+2.4%', cpi: '3.2%' },
    { k: 'EU',    pill: ['Dovish', 'red'],       gdp: '+0.3%', cpi: '2.6%' },
    { k: 'China', pill: ['Easing', 'orange'],    gdp: '+4.8%', cpi: '0.1%' },
    { k: 'Japan', pill: ['Normalizing', 'green'],gdp: '+0.5%', cpi: '2.8%' },
    { k: 'UK',    pill: ['Neutral', 'red'],      gdp: '+0.1%', cpi: '3.4%' },
    { k: 'EM',    pill: ['Mixed', 'blue'],       gdp: '+4.2%', cpi: '4.5%' },
  ];

  return (
    <Card title="Global Regime Map">
      <div className="grid grid-cols-2 -m-2">
        {regions.map((r, i) => (
          <div
            key={r.k}
            className="p-4 border-line"
            style={{
              borderTop: i >= 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderLeft: i % 2 === 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[19px] font-bold tracking-tight">{r.k}</span>
              <span className={`pill pill-${r.pill[1]}`} style={{ fontSize: 11, padding: '3px 8px' }}>
                {r.pill[0]}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <div>
                <div className="label text-[10px]">GDP</div>
                <div className="num text-[15px] font-semibold mt-0.5">{r.gdp}</div>
              </div>
              <div className="ml-4">
                <div className="label text-[10px]">CPI</div>
                <div className="num text-[15px] font-semibold mt-0.5">{r.cpi}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────── Central Bank Policy Tracker ───────── */
export function CentralBankCard() {
  const banks = [
    { k: 'Fed',  r: '5.50%', a: 'Hold',      d: 'Jun 12', tone: 'fg' },
    { k: 'ECB',  r: '4.50%', a: 'Cut 25bps', d: 'Jun 6',  tone: 'green' },
    { k: 'BOJ',  r: '0.10%', a: 'Hold',      d: 'Jun 14', tone: 'fg' },
    { k: 'BOE',  r: '5.25%', a: 'Hold',      d: 'Jun 20', tone: 'fg' },
    { k: 'PBOC', r: '3.45%', a: 'Hold',      d: 'May 20', tone: 'fg' },
  ];
  return (
    <Card title="Central Bank Policy Tracker">
      <div>
        {banks.map((b) => (
          <div key={b.k} className="row">
            <div className="flex items-baseline gap-5 min-w-0">
              <span className="text-[18px] font-bold tracking-tight w-14 shrink-0">{b.k}</span>
              <span className="big-num text-[22px]">{b.r}</span>
            </div>
            <div className="flex items-baseline gap-2 shrink-0">
              <span
                className={`text-[14px] font-semibold ${
                  b.tone === 'green' ? 'text-green' : 'text-fg2'
                }`}
              >
                {b.a}
              </span>
              <span className="text-mute text-[13px]">({b.d})</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────── 3M Cross-Asset Momentum ───────── */
export function CrossAssetMomentumCard() {
  const rows = [
    { k: 'Rates',       v: -0.6 },
    { k: 'Equities',    v: +0.8 },
    { k: 'FX (USD)',    v: +0.4 },
    { k: 'Commodities', v: +0.7 },
    { k: 'Crypto',      v: +0.9 },
  ];

  return (
    <Card title="3M Cross-Asset Momentum">
      <div className="space-y-4 mt-1">
        {rows.map((r) => {
          const up = r.v >= 0;
          const pct = Math.abs(r.v); // bar fills relative to abs 1.0 max
          return (
            <div key={r.k} className="flex items-center gap-3">
              <div className="text-mute text-[14px] w-[90px] shrink-0">{r.k}</div>
              {/* bar — line in middle, fill extends from center */}
              <div className="flex-1 relative h-4">
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/15"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2.5 rounded-full bg-white/[0.04]"></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-2.5 rounded-full"
                  style={
                    up
                      ? {
                          left: '50%',
                          width: `${Math.min(pct, 1) * 50}%`,
                          background: '#22C55E',
                          boxShadow: '0 0 12px rgba(34,197,94,0.45)',
                        }
                      : {
                          right: '50%',
                          width: `${Math.min(pct, 1) * 50}%`,
                          background: '#EF4444',
                          boxShadow: '0 0 12px rgba(239,68,68,0.45)',
                        }
                  }
                ></div>
              </div>
              <div
                className={`num text-[14px] font-semibold w-[42px] text-right ${
                  up ? 'text-fg' : 'text-fg'
                }`}
              >
                {up ? '+' : ''}
                {r.v.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function MacroScreen() {
  const cards = [MacroMetricsCard, MacroCyclePhaseCard, GlobalRegimeCard, CentralBankCard, CrossAssetMomentumCard];
  return (
    <div className="space-y-4 px-4 pt-4">
      {cards.map((C, i) => (
        <Reveal key={i} delay={i * 60}>
          <C />
        </Reveal>
      ))}
    </div>
  );
}

export default MacroScreen;
