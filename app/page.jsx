"use client";

import React, { useState } from 'react';

export default function TerminalHome() {
  const [activeTab, setActiveTab] = useState('macro');

  // XAU/USD Asset Monitor State
  const goldWatchlist = [
    { pair: "XAU/USD", price: "2,354.10", change: "+0.12%", status: "up" },
    { pair: "DXY INDEX", price: "104.65", change: "-0.22%", status: "dn" }
  ];

  // Synthetic historical series for the SVG Sparklines (Macro Trends)
  const dxyHistory = [105.1, 104.9, 105.2, 104.8, 104.7, 104.65];
  const liquidityHistory = [88.1, 88.3, 88.2, 88.5, 88.9, 89.2];

  // Pure dark-mode institutional color matrix tokens
  const theme = {
    bg: '#0a0d12',
    surface: '#11151c',
    surface2: '#161b24',
    border: '#1f2532',
    borderBright: '#2a3142',
    text: '#e8edf5',
    textDim: '#8590a5',
    textMute: '#4a5364',
    accent: '#f5a623',
    bull: '#4ade80',
    bear: '#ef4444',
    info: '#60a5fa'
  };

  // Failsafe SVG Sparkline Generator Component
  const Sparkline = ({ data, color }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 140;
    const height = 30;
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
      </svg>
    );
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      fontSize: '11px',
      paddingBottom: '65px',
      boxSizing: 'border-box'
    }}>
      
      {/* HEADER / TICKER BAR */}
      <header style={{
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.bull }} />
          <span style={{ fontWeight: 'bold', letterSpacing: '0.05em' }}>
            JP CAPITAL <span style={{ color: theme.accent, fontSize: '10px', border: `1px solid ${theme.accent}33`, padding: '1px 4px', borderRadius: '3px', marginLeft: '4px' }}>QUANT DOMINANCE</span>
          </span>
        </div>
        
        {/* Dynamic Pricing Feed */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {goldWatchlist.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: idx > 0 ? `1px solid ${theme.border}` : 'none', paddingLeft: idx > 0 ? '12px' : '0' }}>
              <span style={{ color: theme.textDim }}>{item.pair}</span>
              <span style={{ fontWeight: 'bold' }}>{item.price}</span>
              <span style={{ color: item.status === 'up' ? theme.bull : theme.bear }}>{item.change}</span>
            </div>
          ))}
        </div>
      </header>

      {/* CORE WORKSPACE FRAMEWORK */}
      <div style={{ flex: 1, display: 'flex', padding: '12px', boxSizing: 'border-box' }}>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          {/* TAB HEADER HUD */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.border}`,
            paddingBottom: '6px',
            marginBottom: '12px'
          }}>
            <span style={{ color: theme.accent, fontWeight: 'bold', letterSpacing: '0.1em' }}>
              // {activeTab.toUpperCase()} PANEL ENGINE
            </span>
            <span style={{ color: theme.textMute, fontSize: '10px' }}>SYS_REGIME: RISK_ON</span>
          </div>

          {/* CONDITIONAL VIEW MANAGER */}
          {activeTab === 'macro' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              
              {/* CARD 1: DXY STRENGTH MATRIX */}
              <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '4px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: theme.textDim, fontWeight: 'bold' }}>
                  <span>[M01] USD STRENGTH SCORE</span>
                  <span style={{ color: theme.bear }}>BEARISH IMPULSE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text }}>104.65</div>
                    <div style={{ color: theme.textDim, fontSize: '10px', marginTop: '2px' }}>DXY Rolling 5-Day Trend</div>
                  </div>
                  <div style={{ paddingRight: '8px' }}>
                    <Sparkline data={dxyHistory} color={theme.bear} />
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: theme.textMute, borderTop: `1px solid ${theme.border}`, paddingTop: '6px', marginTop: '4px' }}>
                  Impact: Weakening Dollar forms a structural tailwind for XAU global liquidity allocation.
                </div>
              </div>

              {/* CARD 2: REAL YIELDS CALCULATOR */}
              <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '4px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: theme.textDim, fontWeight: 'bold' }}>
                  <span>[M02] US 10Y REAL YIELD CALCULATOR</span>
                  <span style={{ color: theme.accent }}>INVERSE DRIVER</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: theme.surface2, padding: '6px', borderRadius: '3px' }}>
                    <span style={{ color: theme.textDim }}>US 10Y Nominal Yield</span>
                    <span style={{ fontWeight: 'bold', marginLeft: 'auto' }}>4.36%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: theme.surface2, padding: '6px', borderRadius: '3px' }}>
                    <span style={{ color: theme.textDim }}>10Y Inflation Breakeven</span>
                    <span style={{ fontWeight: 'bold', marginLeft: 'auto', color: theme.info }}>2.30%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: `${theme.accent}15`, border: `1px solid ${theme.accent}33`, padding: '6px', borderRadius: '3px' }}>
                    <span style={{ color: theme.accent, fontWeight: 'bold' }}>NET REAL YIELD</span>
                    <span style={{ fontWeight: 'bold', marginLeft: 'auto', color: theme.accent }}>2.06%</span>
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: theme.textMute, borderTop: `1px solid ${theme.border}`, paddingTop: '6px' }}>
                  Rule: When Real Yields fall, Gold opportunity cost drops, precipitating capital inflows.
                </div>
              </div>

              {/* CARD 3: GLOBAL LIQUIDITY AGGREGATE */}
              <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '4px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: theme.textDim, fontWeight: 'bold' }}>
                  <span>[M03] GLOBAL LIQUIDITY INDEX</span>
                  <span style={{ color: theme.bull }}>EXPANDING</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.bull }}>$89.2T</div>
                    <div style={{ color: theme.textDim, fontSize: '10px', marginTop: '2px' }}>Aggregate Central Bank Base</div>
                  </div>
                  <div style={{ paddingRight: '8px' }}>
                    <Sparkline data={liquidityHistory} color={theme.bull} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                  <div style={{ background: theme.surface2, padding: '4px 6px', borderRadius: '2px', color: theme.textDim }}>Fed Balance Sheet: <span style={{ color: theme.text, fontWeight: 'bold' }}>$7.2T</span></div>
                  <div style={{ background: theme.surface2, padding: '4px 6px', borderRadius: '2px', color: theme.textDim }}>PBoC Liquidity: <span style={{ color: theme.text, fontWeight: 'bold' }}>¥42.1T</span></div>
                </div>
              </div>

            </div>
          )}

          {activeTab !== 'macro' && (
            <div style={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              padding: '24px',
              textAlign: 'center',
              color: theme.textDim
            }}>
              Workspace Module [{activeTab.toUpperCase()}] is primed. Awaiting quantitative component parameters.
            </div>
          )}

        </main>
      </div>

      {/* MOBILE NAV HUD NAVIGATION */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '52px',
        backgroundColor: theme.surface,
        borderTop: `1px solid ${theme.border}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        zIndex: 100
      }}>
        {[
          { id: 'macro', icon: '📊', label: 'Macro' },
          { id: 'rates', icon: '📈', label: 'Rates' },
          { id: 'cross-asset', icon: '🔄', label: 'Cross' },
          { id: 'narrative', icon: '🤖', label: 'Narr' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? `${theme.accent}0d` : 'transparent',
                border: 'none',
                color: isActive ? theme.accent : theme.textDim,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '13px', marginBottom: '2px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
