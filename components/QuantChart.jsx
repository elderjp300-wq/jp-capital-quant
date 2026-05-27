'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { useMarket } from '@/context/MarketContext';

function ChartCanvas({ symbol, prices }) {
  const containerRef = useRef(null);
  const seriesRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Initialize the GPU Canvas with the exact terminal obsidian theme
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth || 340,
      height: 300,
      layout: {
        background: { type: 'solid', color: '#0A0A0F' },
        textColor: '#71717A',
        fontSize: 10,
        fontFamily: 'JetBrains Mono, monospace',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
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
        secondsVisible: false,
      },
    });

    // 2. Configure Institutional Candlestick Colors
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    });

    seriesRef.current = candleSeries;
    chartRef.current = chart;

    // 3. Generate Simulated Structural Market Waves (Instead of flat lines)
    const now = Math.floor(Date.now() / 1000);
    const data = [];
    let currentPrice = symbol === 'EURUSD' ? 1.08540 : 2342.50;

    for (let i = 80; i > 0; i--) {
      const time = now - i * 60;
      const volatility = symbol === 'EURUSD' ? 0.00015 : 0.8;
      
      const change = (Math.random() - 0.5) * volatility;
      const open = currentPrice;
      const close = currentPrice + change;
      const high = Math.max(open, close) + Math.random() * (volatility * 0.4);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.4);

      data.push({ time, open, high, low, close });
      currentPrice = close;
    }

    candleSeries.setData(data);
    chart.timeScale().fitContent();

    // Responsive window observer for mobile view orientation changes
    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol]);

  // 4. Live Tick Mutator: Feeds live websocket prices directly into the active candle
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
          Price: <span className="text-white font-bold transition-all duration-700">{activeBid ? activeBid.toFixed(symbol === 'EURUSD' ? 5 : 2) : 'Connecting...'}</span>
        </div>
      </div>
      
      {mounted ? (
        <ChartCanvas symbol={symbol} prices={prices} />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center font-mono text-xs text-zinc-500">
          Waking Engine Core...
        </div>
      )}
    </div>
  );
}
