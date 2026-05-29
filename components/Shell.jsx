'use client';

import { I } from '@/components/lib';

// Bottom navigation — shared shell chrome used on every screen.

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
