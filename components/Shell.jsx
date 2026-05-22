'use client';

import React from 'react';
import { useMarket } from '@/context/MarketContext';

export function TopTicker() {
  const { prices, isDbReady } = useMarket();

  return (
    <div className="w-full bg-[#0A0A0F] border-b border-[rgba(255,255,255,0.06)] px-4 py-2 flex items-center justify-between z-50 sticky top-0 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center space-x-4">
        {/* EURUSD Ticker Section */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold text-fg2 tracking-wider">EURUSD</span>
            <span className="text-[10px] px-1 rounded bg-green/10 text-green font-mono">
              +{prices.EURUSD.change}%
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5 font-mono">
            <span className="text-sm font-semibold text-fg transition-all duration-100">
              {prices.EURUSD.bid.toFixed(5)}
            </span>
            <span className="text-[11px] text-mute">
              {prices.EURUSD.ask.toFixed(5)}
            </span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-line" />

        {/* XAUUSD Ticker Section */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold text-fg2 tracking-wider">XAUUSD</span>
            <span className="text-[10px] px-1 rounded bg-red/10 text-red font-mono">
              {prices.XAUUSD.change}%
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5 font-mono">
            <span className="text-sm font-semibold text-fg transition-all duration-100">
              {prices.XAUUSD.bid.toFixed(2)}
            </span>
            <span className="text-[11px] text-mute">
              {prices.XAUUSD.ask.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Database Storage Sync Indicator */}
      <div className="flex items-center space-x-1.5">
        <span className={`h-2 w-2 rounded-full ${isDbReady ? 'bg-green animate-pulse' : 'bg-orange'}`} />
        <span className="text-[10px] text-mute font-mono tracking-tight uppercase">
          {isDbReady ? 'Vector Sync' : 'DB Init'}
        </span>
      </div>
    </div>
  );
}

export function BottomNav({ currentTab, setTab }) {
  // Keeping your existing BottomNav architecture completely intact
  const tabs = [
    { id: 'dashboard', label: 'Terminal', icon: '📊' },
    { id: 'markets', label: 'Watch', icon: '📈' },
    { id: 'macro', label: 'Macro', icon: '🌍' },
    { id: 'ai', label: 'QuantAI', icon: '🧠' },
    { id: 'settings', label: 'Config', icon: '⚙️' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[520px] mx-auto bg-[#0F1116] border-t border-[rgba(255,255,255,0.06)] px-2 py-2 flex justify-around items-center z-50">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => {
            setTab(t.id);
            window.location.hash = t.id;
          }}
          className={`flex flex-col items-center space-y-0.5 px-3 py-1 rounded-xl transition-all ${
            currentTab === t.id ? 'text-blue bg-blue/10 font-medium' : 'text-mute hover:text-fg'
          }`}
        >
          <span className="text-lg">{t.icon}</span>
          <span className="text-[10px] tracking-tight">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
