'use client';

import { useState } from 'react';
import { Reveal, I } from '@/components/lib';

// Settings screen — profile, plan, preference toggles, links, sign out, footer.

export function SettingsScreen() {
  const [dark, setDark] = useState(true);
  const [push, setPush] = useState(true);
  const [auto, setAuto] = useState(true);

  const blocks = [
    // 0 — Profile
    <div className="card p-4 flex items-center gap-4">
      <div className="avatar">
        <I.user className="w-7 h-7" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[20px] font-bold tracking-tight leading-tight">Alex Quant</div>
        <div className="text-mute text-[13.5px] num truncate">alex@jpcapital.com</div>
      </div>
      <span
        className="px-3 py-1.5 rounded-md text-[12px] font-bold tracking-wide"
        style={{
          background: '#F59E0B',
          color: '#0B0D12',
          boxShadow: '0 0 14px rgba(245,158,11,0.45)',
        }}
      >
        PRO
      </span>
    </div>,
    // 1 — Plan
    <div className="card p-4 flex items-center justify-between">
      <div>
        <div className="text-[15px] font-bold text-fg leading-tight">Pro Plan Active</div>
        <div className="text-mute text-[13.5px] mt-0.5">Renews Dec 31, 2024</div>
      </div>
      <button className="text-blue text-[14.5px] font-semibold">Manage</button>
    </div>,
    // 2 — Preferences
    <div>
      <div className="label mb-2 px-1">Preferences</div>
      <div className="card divide-y divide-white/[0.06]">
        <ToggleRow
          icon={<I.shield className="w-5 h-5 text-mute" />}
          title="Dark Mode"
          checked={dark}
          onChange={setDark}
          tone="dim"
        />
        <ToggleRow
          icon={<I.bell className="w-5 h-5 text-mute" />}
          title="Push Notifications"
          sub="Alerts for regime shifts"
          checked={push}
          onChange={setPush}
        />
        <ToggleRow
          icon={<I.refresh className="w-5 h-5 text-mute" />}
          title="Auto-Refresh"
          sub="Every 5 seconds"
          checked={auto}
          onChange={setAuto}
        />
      </div>
    </div>,
    // 3 — Links
    <div className="card divide-y divide-white/[0.06]">
      <LinkRow title="API Documentation" />
      <LinkRow title="Contact Support" />
    </div>,
    // 4 — Sign out
    <button className="flex items-center justify-center gap-2 w-full text-red text-[16px] font-semibold py-4">
      <I.signOut className="w-5 h-5" />
      Sign Out
    </button>,
    // 5 — Footer
    <div className="text-center pt-2 pb-4">
      <div className="num text-mute text-[12.5px]">JP Capital — Quant Dominance v1.0.0</div>
      <div className="num text-mute text-[12.5px] mt-1">Made in NYC</div>
    </div>,
  ];

  return (
    <div className="px-4 pt-4 pb-4 space-y-4">
      {blocks.map((b, i) => (
        <Reveal key={i} delay={i * 60}>
          {b}
        </Reveal>
      ))}
    </div>
  );
}

export function ToggleRow({ icon, title, sub, checked, onChange, tone = '' }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
    >
      <span
        className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-fg leading-tight">{title}</div>
        {sub && <div className="text-mute text-[12.5px] mt-0.5">{sub}</div>}
      </div>
      <span className={`toggle ${checked ? (tone === 'dim' ? 'on-dim' : 'on') : ''}`}></span>
    </button>
  );
}

export function LinkRow({ title }) {
  return (
    <button className="w-full flex items-center justify-between px-4 py-4 text-left">
      <span className="text-[15px] font-semibold text-fg">{title}</span>
      <I.chevron className="w-4 h-4 text-mute" />
    </button>
  );
}

export default SettingsScreen;
