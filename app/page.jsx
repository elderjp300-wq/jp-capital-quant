"use client";

import React, { useState } from 'react';

export default function TerminalHome() {
  const [activeTab, setActiveTab] = useState('macro');

  const goldWatchlist = [
    { pair: "XAU/USD", price: "2,354.10", change: "+0.12%", status: "up" }
  ];

  // Pure dark-mode institutional color matrix tokens
  const theme = {
    bg: '#0a0d12',
    surface: '#11151c',
    border: '#1f2532',
    text: '#e8edf5',
    textDim: '#8590a5',
    accent: '#f5a623',
    bull: '#4ade80',
    bear: '#ef4444'
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      fontSize: '12px',
      paddingBottom: '60px'
    }}>
      
      {/* HEADER / TICKER BAR */}
      <header style={{
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.bull }} />
          <span style={{ fontWeight: 'bold', trackingWith: '0.05em' }}>
            JP CAPITAL <span style={{ color: theme.accent, fontSize: '10px', border: `1px solid ${theme.accent}33`, padding: '2px 4px', borderRadius: '3px', marginLeft: '4px' }}>QUANT DOMINANCE</span>
          </span>
        </div>
        
        {/* Gold Pricing Feed */}
        {goldWatchlist.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: `1px solid ${theme.border}`, paddingLeft: '12px' }}>
            <span style={{ color: theme.textDim }}>{item.pair}</span>
            <span style={{ fontWeight: 'bold' }}>{item.price}</span>
            <span style={{ color: item.status === 'up' ? theme.bull : theme.bear }}>{item.change}</span>
          </div>
        ))}
      </header>

      {/* SYSTEM WORKSPACE */}
      <main style={{ flex: 1, padding: '16px' }}>
        <div style={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: '4px',
          padding: '16px',
          minHeight: '300px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.border}`,
            paddingBottom: '8px',
            marginBottom: '16px'
          }}>
            <span style={{ color: theme.accent, fontWeight: 'bold', letterSpacing: '0.1em' }}>
              // {activeTab.toUpperCase()} ENGINE
            </span>
            <span style={{ color: theme.textDim, fontSize: '10px' }}>STATUS: ONLINE</span>
          </div>
          
          <p style={{ color: theme.textDim, lineHeight: '1.6' }}>
            XAU/USD Macro liquidity channels running normal parameters. Quantitative core workspace ready for layout migrations.
          </p>
        </div>
      </main>

      {/* MOBILE HUD NAVIGATION NAVIGATION */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '56px',
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
              <span style={{ fontSize: '14px', marginBottom: '2px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
