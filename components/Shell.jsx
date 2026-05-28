'use client';

import { fmt, FlashNum, useTickingPrice, I } from '@/components/lib';

// Top ticker + bottom navigation
// Shared shell chrome used on every screen.

export function TopTicker() {
  const dxy = useTickingPrice(7, 104.5279, 0.04, 2400);
  const spx = useTickingPrice(13, 5234.88, 0.9, 2800);
  const dxyBase = 104.17;
  const spxBase = 5252.55;
  const dxyChg = dxy - dxyBase;
  const spxChg = spx - spxBase;

  return (
    <div className="ticker-row px-4 py-3">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-mute num text-[11px] tracking-[0.04em]">DXY</span>
          <FlashNum value={dxy} format={(v) => fmt(v, 3)} className="text-[14px] text-fg2" />
          <span
            className={`num text-[12px] ${dxyChg >= 0 ? 'text-green' : 'text-red'}`}
          >
            {dxyChg >= 0 ? '+' : ''}
            {fmt(dxyChg, 3)}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-mute num text-[11px] tracking-[0.04em]">SPX</span>
          <FlashNum value={spx} format={(v) => fmt(v, 4)} className="text-[14px] text-fg2" />
          <span
            className={`num text-[12px] ${spxChg >= 0 ? 'text-green' : 'text-red'}`}
          >
            {spxChg >= 0 ? '+' : ''}
            {fmt(spxChg, 4)}
          </span>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: I.dashboard },
  { id: 'markets', label: 'Markets', icon: I.markets },
  { id: 'macro', label: 'Macro', icon: I.macro },
  { id: 'ai', label: 'AI', icon: I.ai },
  { id: 'settings', label: 'Settings', icon: I.settings },
];

export function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav fixed bottom-0 inset-x-0 z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-[520px]">
        <div className="grid grid-cols-5 pt-2 pb-2">
          {TABS.map((t) => {
            const isActive = active === t.id;
            const IconC = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className="tap relative flex flex-col items-center justify-center gap-1.5"
              >
                {isActive && <span className="nav-active-bar"></span>}
                <IconC
                  className={`w-[22px] h-[22px] ${isActive ? 'text-blue' : 'text-mute'}`}
                />
                <span
                  className={`text-[11px] ${
                    isActive ? 'text-blue font-medium' : 'text-mute'
                  }`}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
