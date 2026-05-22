'use client';

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useMarket } from '@/context/MarketContext';

export default function QuantChart({ symbol = 'EURUSD' }) {
  const chartContainerRef = useRef(null);
  const seriesRef = useRef(null);
  const { prices } = useMarket();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 320,
      layout: {
        background: { color: '#000000' },
        textColor: '#71717A',
        fontSize: 11,
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
      rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.06)' },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.06)',
        timeVisible: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    });

    seriesRef.current = candlestickSeries;

    const now = Math.floor(Date.now() / 1000);
    const initialData = [];
    let basePrice = symbol === 'EURUSD' ? 1.08500 : 2340.00;

    for (let i = 100; i > 0; i--) {
      const time = now - i * 60;
      const open = basePrice + (Math.random() - 0.5) * (symbol === 'EURUSD' ? 0.0005 : 2.0);
      const close = open + (Math.random() - 0.5) * (symbol === 'EURUSD' ? 0.0005 : 2.0);
      const high = Math.max(open, close) + Math.random() * (symbol === 'EURUSD' ? 0.0002 : 1.0);
      const low = Math.min(open, close) - Math.random() * (symbol === 'EURUSD' ? 0.0002 : 1.0);

      initialData.push({ time, open, high, low, close });
      basePrice = close;
    }
    
    candlestickSeries.setData(initialData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol]);

  useEffect(() => {
    if (!seriesRef.current || !prices[symbol]) return;
    
    const livePrice = prices[symbol].bid;
    const currentTime = Math.floor(Date.now() / 1000);
    const roundedTime = currentTime - (currentTime % 60);

    seriesRef.current.update({
      time: roundedTime,
      open: livePrice,
      high: livePrice,
      low: livePrice,
      close: livePrice
    });
  }, [prices, symbol]);

  return (
    <div className="w-full bg-[#0A0A0F] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold tracking-tight text-fg">{symbol} Live Feed</span>
          <span className="text-[10px] bg-blue/10 text-blue font-mono px-1.5 py-0.5 rounded uppercase font-medium">1M Canvas</span>
        </div>
        <div className="text-xs font-mono text-mute">
          Tick: <span className="text-fg font-semibold">{prices[symbol]?.bid}</span>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full relative" style={{ minHeight: '320px' }} />
    </div>
  );
}
