'use client';

import React, { useEffect, useRef, useState } from 'react';

function ChartCanvas({ symbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let chart;
    try {
      const { createChart } = require('lightweight-charts');
      
      chart = createChart(containerRef.current, {
        width: containerRef.current.clientWidth || 340,
        height: 300,
        layout: { background: { color: '#000000' }, textColor: '#71717A' },
        grid: { vertLines: { visible: false }, horzLines: { visible: false } },
        timeScale: { visible: true }
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#22C55E', downColor: '#EF4444',
        borderVisible: false, wickUpColor: '#22C55E', wickDownColor: '#EF4444'
      });

      // Simple mock data fallback for initialization stability
      const now = Math.floor(Date.now() / 1000);
      const data = [];
      let price = symbol === 'EURUSD' ? 1.0850 : 2340.0;
      for (let i = 50; i > 0; i--) {
        data.push({
          time: now - i * 60,
          open: price, high: price + 0.001, low: price - 0.001, close: price
        });
      }
      candleSeries.setData(data);
    } catch (err) {
      console.error("Canvas mounting error:", err);
    }

    return () => { if (chart) chart.remove(); };
  }, [symbol]);

  return <div ref={containerRef} className="w-full h-[300px]" />;
}

export default function QuantChart({ symbol = 'EURUSD' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full bg-[#0A0A0F] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 min-h-[360px]">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold tracking-tight text-white">{symbol} Live Feed</span>
        <span className="text-[10px] bg-blue-500/10 text-blue-400 font-mono px-1.5 py-0.5 rounded">1M Canvas</span>
      </div>
      {mounted ? (
        <ChartCanvas symbol={symbol} />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center font-mono text-xs text-zinc-500">
          Waking Engine Core...
        </div>
      )}
    </div>
  );
}
