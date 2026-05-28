'use client';

import { useState } from 'react';
import { Reveal, I } from '@/components/lib';

// AI screen — JP Capital AI brain header, tabs (Signals / Scenarios / Risks),
// signal cards with confidence pills, "Generate Custom Insight" CTA.

const SIGNALS = [
  {
    title: 'Yield Curve Signal',
    when: '10m ago',
    body:
      '2s10s curve flattening momentum has accelerated. Historical analog to 2006 suggests final hike is priced. Recommend closing duration shorts.',
    conf: 'High',
  },
  {
    title: 'DXY Breakdown',
    when: '1h ago',
    body:
      'Dollar index breaking below 104.50 support on weak ISM data. Model is flipping to structural short USD against high-beta EM currencies.',
    conf: 'Med',
  },
  {
    title: 'Energy Shock Risk',
    when: '3h ago',
    body:
      'WTI crude option skew showing extreme put premium. Supply-side geopolitics not fully priced. Tactical long energy equities advised.',
    conf: 'Med',
  },
  {
    title: 'Credit Decompression',
    when: '6h ago',
    body:
      'HY OAS at 342bps is two-sigma tight vs 1y. Model recommends rolling into IG and adding tail hedges via HYG put spreads.',
    conf: 'High',
  },
];

const SCENARIOS = [
  {
    title: 'Soft Landing Continues',
    when: 'Base case · 55%',
    body:
      'Inflation glides to 2.3% by Q4. Fed delivers 50–75bps of cuts. SPX +6% to 5550, USD softer, gold rangebound 2300–2400.',
    conf: 'High',
  },
  {
    title: 'Sticky Inflation / No Cuts',
    when: 'Bear case · 25%',
    body:
      'Services CPI fails to break 3%. Fed pushes first cut into ’27. Bear-steepener resumes, USD bid returns, breadth narrows.',
    conf: 'Med',
  },
  {
    title: 'Re-Acceleration',
    when: 'Tail case · 12%',
    body:
      'NFP > 250k for 3 prints, ISM > 53. Cuts repriced to 0. 10y > 4.75%, USDJPY tests 158, risk asset drawdown 6–9%.',
    conf: 'Low',
  },
];

const RISKS = [
  {
    title: 'JPY Intervention',
    when: 'Probability rising',
    body:
      'USDJPY at 151.80 with MoF rhetoric escalating. Risk-reversal skew now favors topside-defensive. Avoid AUDJPY carry.',
    conf: 'High',
  },
  {
    title: 'Election Vol Spike',
    when: 'Calendar event',
    body:
      'Implied vols for Nov elections under-pricing tail. Recommend buying VIX call ratios into Oct as cheap convexity.',
    conf: 'Med',
  },
  {
    title: 'Bond Auction Tail',
    when: 'Next: 7Y Thu',
    body:
      'Indirect bid trending lower for 3 consecutive auctions. Watch for >3bp tail to ignite duration unwind.',
    conf: 'Med',
  },
];

const FEEDS = { Signals: SIGNALS, Scenarios: SCENARIOS, Risks: RISKS };

export function AIScreen() {
  const [tab, setTab] = useState('Signals');
  const tabs = ['Signals', 'Scenarios', 'Risks'];
  const items = FEEDS[tab];

  return (
    <div className="px-4 pt-4 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="brain-icon-wrap">
          <I.brain className="w-6 h-6" />
        </span>
        <div className="min-w-0">
          <div className="text-[22px] font-bold tracking-tight leading-tight">JP Capital AI</div>
          <div className="flex items-center gap-1.5 mt-1 text-green text-[13.5px]">
            <span className="dot-live"></span>
            Model Active (v4.5)
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="card p-1 flex gap-1">
        {tabs.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${
                active ? 'bg-[#16181F] text-fg' : 'text-mute'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* signal cards */}
      <div className="space-y-3">
        {items.map((s, i) => (
          <Reveal key={tab + i} delay={i * 60}>
            <SignalCard s={s} />
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <button
        className="w-full rounded-2xl flex items-center justify-center gap-2 py-4 mt-2"
        style={{
          background: '#3B82F6',
          boxShadow: '0 12px 28px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}
      >
        <I.spark className="w-5 h-5 text-white" />
        <span className="text-white text-[16px] font-semibold">Generate Custom Insight</span>
      </button>
    </div>
  );
}

export function SignalCard({ s }) {
  return (
    <div
      className="card pl-5 pr-4 py-4 relative"
      style={{ borderLeft: '3px solid #3B82F6' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <I.message className="w-4 h-4 text-blue shrink-0" />
          <h4 className="text-[17px] font-bold text-fg tracking-tight truncate">
            {s.title}
          </h4>
        </div>
        <span className="text-mute text-[12.5px] num shrink-0 ml-2">{s.when}</span>
      </div>
      <p className="text-mute text-[14px] leading-[1.55]">{s.body}</p>
      <div className="flex justify-end mt-3">
        <span className="pill pill-ghost" style={{ fontSize: 11.5 }}>
          Conf: {s.conf}
        </span>
      </div>
    </div>
  );
}

export default AIScreen;
