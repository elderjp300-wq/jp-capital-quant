'use client';

import { useMemo } from 'react';
import { fmt, Card, Reveal, I } from '@/components/lib';
import { useFred } from '@/components/useFred';

// Dashboard screen — main landing.
// Cards: AI Brief, Risk Appetite, Fed Funds/OIS, US Yield Curve,
//        DXY Strength, Liquidity & Bal Sheet, 30D Correlation matrix.

/* ───────── AI Brief ───────── */
export function AIBriefCard() {
  return (
    <section className="card-accent p-5">
      <header className="flex items-center gap-3 mb-4">
        <span className="icon-blue w-10 h-10 rounded-xl grid place-items-center text-blue">
          <I.spark className="w-5 h-5" />
        </span>
        <span className="text-blue font-semibold tracking-[0.08em] text-[13px]">
          POWERED BY <span className="text-blue">JP CAPITAL AI</span>
        </span>
      </header>

      <p className="text-fg2 text-[16.5px] leading-[1.55]">
        The Fed remains on hold as core PCE moderates toward 2.4%. DXY weakness is
        creating a tailwind for commodities and EM. Yield curve normalization
        suggests the hiking cycle is behind us.{' '}
        <span className="text-orange font-semibold">Key risk:</span>{' '}
        <span className="text-fg2">
          hotter-than-expected NFP could reprice terminal rate expectations and shock
          short-end yields.
        </span>
      </p>

      <div className="flex items-center justify-between mt-5">
        <span className="text-mute text-[13px]">Updated 4 mins ago</span>
        <span className="pill pill-ghost">Confidence: High</span>
      </div>
    </section>
  );
}

/* ───────── Risk Appetite gauge ───────── */
export function RiskAppetiteCard() {
  const value = 62;
  // Half-circle gauge geometry
  const W = 280, H = 160, R = 110, cx = W / 2, cy = 140;
  const angleFor = (v) => Math.PI * (1 - v / 100); // 0→π (left to right)
  const pt = (v, r = R) => {
    const a = angleFor(v);
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
  };
  // Arc helper: large=0, sweep=1
  const arcPath = (from, to, r = R) => {
    const [x1, y1] = pt(from, r);
    const [x2, y2] = pt(to, r);
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(
      1,
    )} ${y2.toFixed(1)}`;
  };

  const [needleX, needleY] = pt(value, R - 6);
  const knobX = needleX;
  const knobY = needleY;

  return (
    <Card
      title="Risk Appetite"
      right={<span className="pill pill-green">Mild Risk-On</span>}
    >
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          {/* zone arcs (navy 0-30, red 30-70, orange 70-100) */}
          <path
            d={arcPath(0, 30)}
            stroke="#1B2540"
            strokeWidth="22"
            fill="none"
            strokeLinecap="butt"
          />
          <path
            d={arcPath(30, 70)}
            stroke="#DC2626"
            strokeWidth="22"
            fill="none"
            strokeLinecap="butt"
          />
          <path
            d={arcPath(70, 100)}
            stroke="#F59E0B"
            strokeWidth="22"
            fill="none"
            strokeLinecap="butt"
          />

          {/* glow under needle tip */}
          <circle cx={needleX} cy={needleY} r="14" fill="rgba(255,255,255,0.18)" />

          {/* needle */}
          <line
            x1={cx}
            y1={cy}
            x2={knobX}
            y2={knobY}
            stroke="#FAFAFA"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx={knobX} cy={knobY} r="6" fill="#FAFAFA" />
          <circle cx={cx} cy={cy} r="10" fill="#FAFAFA" />
          <circle cx={cx} cy={cy} r="4" fill="#0B0D12" />

          {/* big value */}
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fill="#FAFAFA"
            className="num"
            fontSize="36"
            fontWeight="700"
            letterSpacing="-1"
          >
            {value}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="card p-4 text-center">
          <div className="label">VIX</div>
          <div className="num text-[22px] text-green font-bold mt-1">16.4</div>
        </div>
        <div className="card p-4 text-center">
          <div className="label">HY Spreads</div>
          <div className="num text-[22px] text-fg font-bold mt-1">342bps</div>
        </div>
      </div>
    </Card>
  );
}

/* ───────── Fed Funds / OIS line chart ───────── */
export function FedFundsCard() {
  // Implied Fed funds path through meetings
  const path = [
    { d: 'Current', r: 5.375, status: null },
    { d: 'Jun',     r: 5.375, status: 'hold' },
    { d: 'Jul',     r: 5.31,  status: 'hold' },
    { d: 'Sep',     r: 5.04,  status: 'cut' },
    { d: 'Nov',     r: 4.79,  status: 'cut' },
    { d: 'Dec',     r: 4.50,  status: 'cut' },
  ];

  const W = 340, H = 170, padL = 38, padR = 12, padT = 14, padB = 26;
  const minY = 4.30, maxY = 5.53;
  const xs = (i) => padL + (i * (W - padL - padR)) / (path.length - 1);
  const ys = (v) => padT + (1 - (v - minY) / (maxY - minY)) * (H - padT - padB);

  const dStr = path
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xs(i).toFixed(1)} ${ys(p.r).toFixed(1)}`)
    .join(' ');

  return (
    <Card
      title="Fed Funds / OIS"
      right={<span className="pill pill-blue">Pricing 2 Cuts</span>}
    >
      <div className="big-num text-[42px] leading-none">5.25-5.50%</div>
      <div className="text-mute text-[14px] mt-2">
        Terminal rate expected Dec 2025: 4.50%
      </div>

      {/* meeting markers */}
      <div className="grid grid-cols-3 gap-3 mt-5 mb-2">
        {[
          { d: 'Jun 12', a: 'Hold', dot: 'orange', tone: 'fg' },
          { d: 'Jul 31', a: 'Hold', dot: 'orange', tone: 'fg' },
          { d: 'Sep 18', a: '-25bps', dot: 'green', tone: 'green' },
        ].map((m, i) => (
          <div key={i} className="flex flex-col items-center">
            <span
              className="w-2.5 h-2.5 rounded-full mb-2"
              style={{
                background: m.dot === 'orange' ? '#F59E0B' : '#22C55E',
                boxShadow:
                  m.dot === 'orange'
                    ? '0 0 8px rgba(245,158,11,0.6)'
                    : '0 0 8px rgba(34,197,94,0.6)',
              }}
            ></span>
            <span className="text-mute text-[13px] num">{m.d}</span>
            <span
              className={`text-[14px] font-semibold mt-1 num ${
                m.tone === 'green' ? 'text-green' : 'text-fg'
              }`}
            >
              {m.a}
            </span>
          </div>
        ))}
      </div>

      {/* line chart */}
      <div className="mt-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          {/* y-axis labels */}
          {[5.53, 5.00, 4.30].map((v) => (
            <g key={v}>
              <text
                x={padL - 6}
                y={ys(v) + 3.5}
                textAnchor="end"
                fontSize="11"
                fill="#71717A"
                className="num"
              >
                {v.toFixed(2)}
              </text>
              <line
                x1={padL}
                x2={W - padR}
                y1={ys(v)}
                y2={ys(v)}
                stroke="rgba(255,255,255,0.04)"
              />
            </g>
          ))}

          {/* line */}
          <path d={dStr} fill="none" stroke="#3B82F6" strokeWidth="2.2" strokeLinejoin="round" />

          {/* dots */}
          {path.map((p, i) => (
            <circle
              key={i}
              cx={xs(i)}
              cy={ys(p.r)}
              r="3.6"
              fill="#0B0D12"
              stroke="#3B82F6"
              strokeWidth="2"
            />
          ))}

          {/* x labels */}
          {path.map((p, i) => (
            <text
              key={i}
              x={xs(i)}
              y={H - 6}
              textAnchor="middle"
              fontSize="12"
              fill="#71717A"
            >
              {p.d}
            </text>
          ))}
        </svg>
      </div>
    </Card>
  );
}

/* ───────── US Yield Curve ───────── */
export function YieldCurveCard() {
  const { data, loading, error } = useFred('DGS2,DGS5,DGS10,DGS30', 1);

  // Fallback to last-known values if the fetch fails, so the card never breaks.
  const v = (id, fb) => {
    const arr = data && data[id];
    return Array.isArray(arr) && arr.length ? arr[0].value : fb;
  };
  const y2 = v('DGS2', 4.82);
  const y5 = v('DGS5', 4.41);
  const y10 = v('DGS10', 4.37);
  const y30 = v('DGS30', 4.52);

  const bars = [
    { k: '2Y', v: y2 },
    { k: '5Y', v: y5 },
    { k: '10Y', v: y10 },
    { k: '30Y', v: y30 },
  ];

  // Derived 2s10s spread + honest label/colour
  const spread = Math.round((y10 - y2) * 100); // bps
  const inverted = spread < 0;
  const flat = Math.abs(spread) <= 10;
  const headline = inverted ? 'Inverted' : flat ? 'Flat' : 'Normal';
  const pillCls = inverted ? 'pill-red' : flat ? 'pill-orange' : 'pill-green';
  const pillTxt = `${spread >= 0 ? '+' : ''}${spread}bps 2s10s`;
  const barColor = (k) => (k === '2Y' || k === '30Y' ? '#F59E0B' : '#3B82F6');

  // Auto-scale y-axis to the live values with padding
  const vals = bars.map((b) => b.v);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const padR = (hi - lo) * 0.25 || 0.2;
  const minY = lo - padR, maxY = hi + padR;

  const W = 340, H = 170, pL = 40, pR = 8, pT = 16, pB = 28;
  const ys = (val) => pT + (1 - (val - minY) / (maxY - minY)) * (H - pT - pB);
  const bw = (W - pL - pR) / bars.length;
  const ticks = [maxY, (maxY + minY) / 2, minY];

  return (
    <Card
      title="US Yield Curve"
      right={<span className={`pill ${pillCls}`}>{pillTxt}</span>}
    >
      <div className="flex items-center gap-3">
        <span className="big-num text-[34px] leading-none">
          {loading ? '…' : headline}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3 text-mute text-[13.5px]">
        <I.arrowUpRight className="w-4 h-4 text-orange" />
        {error ? 'Last known — feed unavailable' : `10Y ${fmt(y10, 2)}% · 30Y ${fmt(y30, 2)}%`}
      </div>

      <div className="mt-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          {ticks.map((val) => (
            <text
              key={val}
              x={pL - 6}
              y={ys(val) + 4}
              textAnchor="end"
              fontSize="11"
              fill="#71717A"
              className="num"
            >
              {val.toFixed(2)}
            </text>
          ))}

          {bars.map((b, i) => {
            const x = pL + i * bw + bw * 0.18;
            const w = bw * 0.64;
            const y = ys(b.v);
            const baseY = H - pB;
            return (
              <g key={b.k}>
                <rect x={x} y={y} width={w} height={baseY - y} rx="2" fill={barColor(b.k)} />
                <text
                  x={x + w / 2}
                  y={H - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#71717A"
                >
                  {b.k}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

/* ───────── DXY Strength ───────── */
export function DXYStrengthCard() {
  const series = useMemo(
    () => [0.8, 0.7, 0.85, 0.6, 0.55, 0.7, 0.5, 0.45, 0.3, 0.35, 0.25, 0.2, 0.15, 0.18, 0.1, 0.05, 0.08, 0.02, 0],
    [],
  );

  return (
    <Card
      title="DXY Strength"
      right={<span className="pill pill-orange">Bearish Cons.</span>}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="big-num text-[42px] leading-none">104.32</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="num text-red text-[16px] font-semibold">-1.20%</span>
            <span className="text-mute num text-[13px]">30D</span>
          </div>
        </div>
        <div className="shrink-0">
          <svg width="120" height="60" viewBox="0 0 120 60" className="block">
            <defs>
              <linearGradient id="dxyFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(239,68,68,0.45)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0)" />
              </linearGradient>
            </defs>
            {(() => {
              const pts = series.map((v, i) => [
                4 + (i * (120 - 8)) / (series.length - 1),
                10 + v * 40,
              ]);
              const d =
                'M' +
                pts
                  .map(([x, y], i) => {
                    if (i === 0) return `${x.toFixed(1)},${y.toFixed(1)}`;
                    const [px, py] = pts[i - 1];
                    const cx = (px + x) / 2;
                    return `C${cx.toFixed(1)},${py.toFixed(1)} ${cx.toFixed(
                      1,
                    )},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
                  })
                  .join(' ');
              const last = pts[pts.length - 1];
              const area = `${d} L${last[0]},56 L${pts[0][0]},56 Z`;
              return (
                <>
                  <path d={area} fill="url(#dxyFill)" />
                  <path d={d} stroke="#EF4444" strokeWidth="2" fill="none" />
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      <div className="note-card p-4 mt-4">
        <p className="text-[14px] leading-[1.55] text-mute">
          <span className="text-blue font-semibold">Correlation Note:</span>{' '}
          <span className="text-fg2">
            USD weakness is creating a bid for EM equities and commodities. Watch
            103.50 support.
          </span>
        </p>
      </div>
    </Card>
  );
}

/* ───────── Liquidity & Bal Sheet ───────── */
export function LiquidityCard() {
  // WALCL (Fed total assets, $mn), SOFR (%), WTREGEN (TGA, $mn)
  const { data, error } = useFred('WALCL,SOFR,WTREGEN', 1);
  const v = (id, fb) => {
    const arr = data && data[id];
    return Array.isArray(arr) && arr.length ? arr[0].value : fb;
  };
  const walcl = v('WALCL', 7120000);   // $mn
  const sofr = v('SOFR', 5.31);        // %
  const tga = v('WTREGEN', 750000);    // $mn

  const assetsT = (walcl / 1_000_000).toFixed(2); // -> $T
  const tgaB = Math.round(tga / 1000);            // -> $B

  // QT pace is Fed policy guidance, not a daily series. Manual knob —
  // update only when the Fed changes the runoff cap.
  const qtPace = '-$60B';

  const W = 320, H = 60;
  const pts = [
    [4, 28], [40, 28], [56, 30], [92, 30], [108, 32], [144, 32],
    [160, 34], [196, 34], [212, 36], [248, 36], [264, 38], [316, 38],
  ];
  const stepPath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');

  return (
    <Card
      title="Liquidity & Bal Sheet"
      right={
        <span
          className="w-2.5 h-2.5 rounded-full bg-red mt-2 mr-1"
          style={{ boxShadow: '0 0 8px rgba(239,68,68,0.7)' }}
        ></span>
      }
    >
      <div className="grid grid-cols-2 gap-y-5 gap-x-4">
        <div>
          <div className="label">Fed Total Assets</div>
          <div className="big-num text-[28px] mt-1.5">${assetsT}T</div>
        </div>
        <div>
          <div className="label">QT Pace</div>
          <div className="big-num text-[28px] mt-1.5 text-red">
            {qtPace}<span className="text-mute text-[13px]">/mo</span>
          </div>
        </div>
        <div>
          <div className="label">TGA Balance</div>
          <div className="big-num text-[28px] mt-1.5">${tgaB}B</div>
        </div>
        <div>
          <div className="label">SOFR</div>
          <div className="big-num text-[28px] mt-1.5">{fmt(sofr, 2)}%</div>
        </div>
      </div>

      <div className="relative mt-5 h-[64px]">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
          <path d={stepPath} stroke="#EF4444" strokeWidth="2" fill="none" />
        </svg>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <span className="watermark whitespace-nowrap">TIGHTENING REGIME</span>
        </div>
      </div>
    </Card>
  );
}

/* ───────── 30D Rolling Correlation matrix ───────── */
export function CorrelationCard() {
  const syms = ['SPX', 'US10Y', 'DXY', 'GOLD', 'BTC'];
  // Symmetric matrix
  const M = [
    [null, -0.45, -0.65, 0.35, 0.72],
    [-0.45, null, 0.55, -0.25, -0.30],
    [-0.65, 0.55, null, -0.80, -0.55],
    [0.35, -0.25, -0.80, null, 0.45],
    [0.72, -0.30, -0.55, 0.45, null],
  ];

  const cellCls = (v) => {
    if (v === null) return 'text-dim';
    const mag = Math.abs(v);
    if (v > 0) return mag > 0.6 ? 'heat-pos-strong' : 'heat-pos';
    return mag > 0.6 ? 'heat-neg-strong' : 'heat-neg';
  };

  return (
    <Card title="30D Rolling Correlation">
      <div className="rounded-xl overflow-hidden border border-line">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-12"></th>
              {syms.map((s) => (
                <th
                  key={s}
                  className="num text-mute font-medium text-[12px] py-2 text-center"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {syms.map((row, i) => (
              <tr key={row}>
                <th className="num text-mute font-medium text-[12px] py-2 text-center border-t border-line">
                  {row}
                </th>
                {syms.map((_col, j) => {
                  const v = M[i][j];
                  return (
                    <td
                      key={j}
                      className="border-t border-l border-line p-0"
                    >
                      <div
                        className={`h-11 grid place-items-center num text-[13px] font-semibold ${cellCls(
                          v,
                        )}`}
                      >
                        {v === null ? '—' : v > 0 ? fmt(v, 2) : `-${fmt(Math.abs(v), 2)}`}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ───────── Dashboard screen wrapper ───────── */
export function DashboardScreen() {
  const cards = [
    AIBriefCard,
    RiskAppetiteCard,
    FedFundsCard,
    YieldCurveCard,
    DXYStrengthCard,
    LiquidityCard,
    CorrelationCard,
  ];
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

export default DashboardScreen;
