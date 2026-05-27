'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMarket } from '@/context/MarketContext';

function ChartContainer({ symbol, prices }) {
  const containerRef = useRef(null);
  const seriesRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let chart;
    let active = true;

    // Asynchronously fetch the modern ES Module path strictly inside the browser layer
    import('lightweight-charts')
      .then(({ createChart }) => {
        if (!active || !containerRef.current) return;

        chart = createChart(containerRef.current, {
          width: containerRef.current.clientWidth || 340,
          height: 300,
          layout: {
            background: { type: 'solid', color: '#0A0A0F' },
            textColor: '#71717A',
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
          },
          grid: {
            vertLines: { color: 'rgba(255, 255, 255, 0.02)' },
            horzLines: { color: 'rgba(255, 255, 255, 0.02)' },
          },
          crosshair: {
            mode: 1,
            vertLine: { color: '#3B82F6', width: 1, style: 2 },
            horzLine: { color: '#3B82F6', width: 1, style: 2 },
          },
          rightPriceScale: {
            borderColor: 'rgba(255, 255, 255, 0.06)',
            entireTextOnly: true,
          },
          timeScale: {
            borderColor: 'rgba(255, 255, 255, 0.06)',
            timeVisible: true,
          },
        });

        const candleSeries = chart.addCandlestickSeries({
          upColor: '#22C55E',
          downColor: '#EF4444',
          borderVisible: false,
          wickUpColor: '#22C55E',
          wickDownColor: '#EF4444',
        });

        seriesRef.current = candleSeries;
        chartRef.current = chart;

        // Populate baseline historical context waves
        const now = Math.floor(Date.now() / 1000);
        const data = [];
        let currentPrice = symbol === 'EURUSD' ? 1.08540 : 2342.50;

        for (let i = 60; i > 0; i--) {
          const time = now - i * 60;
          const volatility = symbol === 'EURUSD' ? 0.00015 : 0.8;
          const change = (Math.random() - 0.5) * volatility;
          const open = currentPrice;
          const close = currentPrice + change;
          const high = Math.max(open, close) + Math.random() * (volatility * 0.3);
          const low = Math.min(open, close) - Math.random() * (volatility * 0.3);

          data.push({ time, open, high, low, close });
          currentPrice = close;
        }

        candleSeries.setData(data);
        chart.timeScale().fitContent();
      })
      .catch((err) => console.error("Webpack dynamic bundle stream failed:", err));

    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
      if (chart) chart.remove();
    };
  }, [symbol]);

  // Synchronize Live WebSockets context data with the modern canvas reference
  useEffect(() => {
    if (!seriesRef.current || !prices?.[symbol]) return;

    const liveBid = prices[symbol].bid;
    const currentTime = Math.floor(Date.now() / 1000);
    const roundedTime = currentTime - (currentTime % 60);

    seriesRef.current.update({
      time: roundedTime,
      open: liveBid,
      high: liveBid,
      low: liveBid,
      close: liveBid,
    });
  }, [prices, symbol]);

  return <div ref={containerRef} className="w-full h-[300px]" />;
}

export default function QuantChart({ symbol = 'EURUSD' }) {
  const { prices } = useMarket();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeBid = prices?.[symbol]?.bid;

  return (
    <div className="w-full bg-[#0A0A0F] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 min-h-[360px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold tracking-wider text-white uppercase font-mono">{symbol} Live Feed</span>
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-tight animate-pulse">
            Live Stream
          </span>
        </div>
        <div className="text-xs font-mono text-zinc-400">
          Price: <span className="text-white font-bold">{activeBid ? activeBid.toFixed(symbol === 'EURUSD' ? 5 : 2) : 'Connecting...'}</span>
        </div>
      </div>
      
      {mounted ? (
        <ChartContainer symbol={symbol} prices={prices} />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center font-mono text-xs text-zinc-500">
          Waking Engine Core...
        </div>
      )}
    </div>
  );
}
