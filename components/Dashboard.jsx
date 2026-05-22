'use client';

import React, { useState } from 'react';
import QuantChart from './QuantChart';

export default function DashboardScreen() {
  const [activeAsset, setActiveAsset] = useState('EURUSD');

  return (
    <div className="p-4 space-y-4">
      {/* Asset Selection Controls */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveAsset('EURUSD')}
          className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
            activeAsset === 'EURUSD'
              ? 'bg-blue/10 border-blue text-blue'
              : 'bg-[#0F1116] border-[rgba(255,255,255,0.06)] text-mute'
          }`}
        >
          EURUSD Terminal
        </button>
        <button
          onClick={() => setActiveAsset('XAUUSD')}
          className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
            activeAsset === 'XAUUSD'
              ? 'bg-blue/10 border-blue text-blue'
              : 'bg-[#0F1116] border-[rgba(255,255,255,0.06)] text-mute'
          }`}
        >
          XAUUSD Spot
        </button>
      </div>

      {/* High-Performance Canvas Core */}
      <QuantChart symbol={activeAsset} />

      {/* Terminal Metric Grid Placeholders */}
      <div className="bg-[#0F1116] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
        <span className="text-xs font-bold text-fg2 uppercase tracking-wide block mb-2">Execution Analytics</span>
        <div className="grid grid-cols-2 gap-2 font-mono">
          <div className="bg-black/40 border border-[rgba(255,255,255,0.03)] p-3 rounded-xl">
            <div className="text-[10px] text-mute">SPREAD</div>
            <div className="text-sm font-semibold text-fg mt-0.5">0.4 Pips</div>
          </div>
          <div className="bg-black/40 border border-[rgba(255,255,255,0.03)] p-3 rounded-xl">
            <div className="text-[10px] text-mute">VOLATILITY</div>
            <div className="text-sm font-semibold text-green mt-0.5">STABLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
