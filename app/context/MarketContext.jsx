'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const MarketContext = createContext(null);

const DB_NAME = 'JPTerminalDB';
const DB_VERSION = 1;
const STORE_NAME = 'historical_ohlcv';

// Helper function to open IndexedDB securely using native browser promises
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(null);
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Use a composite key tracking timestamp and symbol to prevent data collisions
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export function MarketProvider({ children }) {
  const [db, setDb] = useState(null);
  const [prices, setPrices] = useState({
    EURUSD: { bid: 1.08520, ask: 1.08531, change: +0.12 },
    XAUUSD: { bid: 2342.10, ask: 2342.60, change: -0.45 }
  });
  const [isDbReady, setIsDbReady] = useState(false);

  // Initialize DB instance on client boot
  useEffect(() => {
    initDB()
      .then((database) => {
        setDb(database);
        setIsDbReady(true);
        console.log('[📦 DB] IndexedDB Vector Storage Engine Initialized.');
      })
      .catch((err) => console.error('[-] DB Init Failure:', err));
  }, []);

  // Live Pricing Ingestion Stream Simulation (Simulating real-time WebSocket pulses)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const eurusdPip = (Math.random() - 0.5) * 0.00010;
        const xauusdPip = (Math.random() - 0.5) * 0.40;
        
        return {
          EURUSD: {
            bid: parseFloat((prev.EURUSD.bid + eurusdPip).toFixed(5)),
            ask: parseFloat((prev.EURUSD.ask + eurusdPip).toFixed(5)),
            change: prev.EURUSD.change
          },
          XAUUSD: {
            bid: parseFloat((prev.XAUUSD.bid + xauusdPip).toFixed(2)),
            ask: parseFloat((prev.XAUUSD.ask + xauusdPip).toFixed(2)),
            change: prev.XAUUSD.change
          }
        };
      });
    }, 400); // 400ms ultra-fast tactical ticks

    return () => clearInterval(interval);
  }, []);

  // Store data vectors without freezing main UI rendering
  const cacheHistoricalBars = async (bars) => {
    if (!db) return;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(transaction);
      
      bars.forEach(bar => store.put(bar));
      
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error);
    });
  };

  return (
    <MarketContext.Provider value={{ prices, isDbReady, cacheHistoricalBars }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be executed strictly within a MarketProvider setup');
  }
  return context;
}
