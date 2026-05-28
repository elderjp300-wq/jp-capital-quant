'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// JP Capital — Quant Dominance · primitives, helpers, icons

/* ───────── number helpers ───────── */
export const fmt = (n, d = 2) =>
  Number(n).toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
export const signed = (n, d = 2) => `${n > 0 ? '+' : ''}${fmt(n, d)}`;
export const pct = (n, d = 2) => `${n > 0 ? '+' : ''}${fmt(n, d)}%`;
export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function genSeries(seed, n = 24, vol = 1, drift = 0) {
  const r = mulberry32(seed);
  const out = [0];
  for (let i = 1; i < n; i++) out.push(out[i - 1] + (r() - 0.5) * vol + drift);
  return out;
}

/* ───────── smooth-path sparkline ───────── */
export function Sparkline({
  data,
  width = 110,
  height = 36,
  stroke = '#22C55E',
  strokeWidth = 1.8,
  pad = 3,
  smooth = true,
}) {
  const d = useMemo(() => {
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const step = (width - pad * 2) / (data.length - 1);
    const pts = data.map((v, i) => [
      pad + i * step,
      height - pad - ((v - min) / span) * (height - pad * 2),
    ]);
    if (!smooth)
      return pts
        .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
        .join(' ');
    let str = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1];
      const [x, y] = pts[i];
      const cx = (px + x) / 2;
      str += ` C${cx.toFixed(1)} ${py.toFixed(1)} ${cx.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(
        1,
      )} ${y.toFixed(1)}`;
    }
    return str;
  }, [data, width, height, pad, smooth]);

  return (
    <svg width={width} height={height} className="block">
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ───────── card primitive ───────── */
export function Card({ title, right, children, accent = false, className = '' }) {
  return (
    <section className={`${accent ? 'card-accent' : 'card'} p-5 ${className}`}>
      {(title || right) && (
        <header className="flex items-start justify-between mb-3">
          {typeof title === 'string' ? <h3 className="h-card">{title}</h3> : title}
          {right}
        </header>
      )}
      {children}
    </section>
  );
}

/* ───────── ticking value (live feel) ───────── */
export function useTickingPrice(seed, base, vol = 0.05, ms = 2200) {
  const [v, setV] = useState(base);
  const r = useRef(mulberry32(seed));
  useEffect(() => {
    const id = setInterval(() => {
      setV((prev) => {
        const next = prev + (r.current() - 0.5) * vol * 2;
        return next;
      });
    }, ms);
    return () => clearInterval(id);
  }, [vol, ms]);
  return v;
}

/* Flash on value change */
export function FlashNum({ value, format = (v) => fmt(v, 2), className = '' }) {
  const prev = useRef(value);
  const [cls, setCls] = useState('');
  useEffect(() => {
    if (value > prev.current) setCls('flash-up');
    else if (value < prev.current) setCls('flash-down');
    prev.current = value;
    const t = setTimeout(() => setCls(''), 600);
    return () => clearTimeout(t);
  }, [value]);
  return <span className={`num ${cls} ${className}`}>{format(value)}</span>;
}

/* ───────── icons (Lucide-style, original) ───────── */
export const I = {
  dashboard: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  markets: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M3 17 9 11l4 4 8-10"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 7h7v7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  macro: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3c2.6 2.7 4 5.9 4 9s-1.4 6.3-4 9c-2.6-2.7-4-5.9-4-9s1.4-6.3 4-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  ),
  ai: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 3.5 13.6 8 18 9.5l-4.4 1.5L12 15.5l-1.6-4.5L6 9.5 10.4 8 12 3.5Z"
        fill="currentColor"
      />
      <path
        d="M19 14l.7 1.8 1.8.7-1.8.7L19 19l-.7-1.8-1.8-.7 1.8-.7L19 14Z"
        fill="currentColor"
      />
    </svg>
  ),
  settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 4 13.4 8.6 18 10l-4.6 1.4L12 16l-1.4-4.6L6 10l4.6-1.4L12 4Z"
        fill="currentColor"
      />
      <path
        d="M19 14.5 19.6 16 21 16.5l-1.4.5L19 18.5l-.6-1.5L17 16.5l1.4-.5L19 14.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  brain: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M9.5 4a2.5 2.5 0 0 0-2.4 1.8 2.2 2.2 0 0 0-2 2.2c0 .3 0 .6.2.9A2.5 2.5 0 0 0 4 11.4c0 .9.5 1.7 1.2 2.1-.1.3-.2.7-.2 1A2.5 2.5 0 0 0 7.4 17a2.5 2.5 0 0 0 4.6.5V4.8A2.5 2.5 0 0 0 9.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 4a2.5 2.5 0 0 1 2.4 1.8 2.2 2.2 0 0 1 2 2.2c0 .3 0 .6-.2.9A2.5 2.5 0 0 1 20 11.4c0 .9-.5 1.7-1.2 2.1.1.3.2.7.2 1a2.5 2.5 0 0 1-2.4 2.5 2.5 2.5 0 0 1-4.6.5V4.8A2.5 2.5 0 0 1 14.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  message: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H10l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  trendUp: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M5 14 11 8l3 3 5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 6h5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  arrowUpRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 3 5 5.5v6c0 4.5 3 8.2 7 9.5 4-1.3 7-5 7-9.5v-6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  refresh: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  signOut: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M14 5h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8l4 4-4 4M13 12H3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/* ───────── reveal-on-scroll (fade-up, fires once, 60ms stagger when grouped) ───────── */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const mergedStyle = { ...(style || {}), '--reveal-delay': `${delay}ms` };
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}

