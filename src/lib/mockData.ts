export const mockAssets = {
  rates: [
    { symbol: "US2Y", name: "US 2-Year", value: 4.82, change: 0.05, changePct: 1.05, regime: "Hawkish", trend: [4.75, 4.78, 4.79, 4.80, 4.81, 4.83, 4.82] },
    { symbol: "US5Y", name: "US 5-Year", value: 4.41, change: 0.03, changePct: 0.68, regime: "Neutral", trend: [4.35, 4.38, 4.39, 4.40, 4.42, 4.41, 4.41] },
    { symbol: "US10Y", name: "US 10-Year", value: 4.37, change: 0.02, changePct: 0.46, regime: "Bear Flatten", trend: [4.30, 4.33, 4.35, 4.36, 4.38, 4.37, 4.37] },
    { symbol: "US30Y", name: "US 30-Year", value: 4.52, change: -0.01, changePct: -0.22, regime: "Bear Flatten", trend: [4.55, 4.54, 4.53, 4.53, 4.52, 4.53, 4.52] },
    { symbol: "BUND10Y", name: "Bund 10-Year", value: 2.45, change: 0.04, changePct: 1.66, regime: "Hawkish", trend: [2.35, 2.38, 2.40, 2.42, 2.44, 2.45, 2.45] },
    { symbol: "JGB10Y", name: "JGB 10-Year", value: 0.88, change: 0.01, changePct: 1.15, regime: "Yield Cap", trend: [0.85, 0.86, 0.87, 0.87, 0.88, 0.88, 0.88] },
    { symbol: "GILT10Y", name: "Gilt 10-Year", value: 4.12, change: 0.06, changePct: 1.48, regime: "Hawkish", trend: [4.00, 4.05, 4.08, 4.10, 4.11, 4.12, 4.12] },
  ],
  equities: [
    { symbol: "SPX", name: "S&P 500", value: 5240.15, change: -12.40, changePct: -0.24, regime: "Bullish", trend: [5150, 5180, 5200, 5220, 5250, 5260, 5240] },
    { symbol: "NDX", name: "Nasdaq 100", value: 18240.50, change: -45.20, changePct: -0.25, regime: "Overbought", trend: [17800, 17950, 18050, 18150, 18250, 18300, 18240] },
    { symbol: "DJIA", name: "Dow Jones", value: 39540.20, change: 15.30, changePct: 0.04, regime: "Neutral", trend: [39000, 39200, 39400, 39450, 39500, 39550, 39540] },
    { symbol: "FTSE", name: "FTSE 100", value: 7850.40, change: 25.10, changePct: 0.32, regime: "Accumulation", trend: [7750, 7780, 7800, 7820, 7830, 7840, 7850] },
    { symbol: "DAX", name: "DAX", value: 18450.60, change: 40.20, changePct: 0.22, regime: "Bullish", trend: [18100, 18250, 18350, 18400, 18450, 18480, 18450] },
    { symbol: "NKY", name: "Nikkei 225", value: 39850.00, change: -150.00, changePct: -0.38, regime: "Consolidation", trend: [39000, 39400, 39800, 40100, 40000, 39900, 39850] },
  ],
  fx: [
    { symbol: "EUR/USD", name: "Euro / US Dollar", value: 1.0845, change: -0.0012, changePct: -0.11, regime: "Bearish", trend: [1.0900, 1.0880, 1.0870, 1.0860, 1.0850, 1.0840, 1.0845] },
    { symbol: "GBP/USD", name: "Pound / US Dollar", value: 1.2650, change: -0.0020, changePct: -0.16, regime: "Neutral", trend: [1.2720, 1.2700, 1.2680, 1.2670, 1.2660, 1.2650, 1.2650] },
    { symbol: "USD/JPY", name: "US Dollar / Yen", value: 151.80, change: 0.25, changePct: 0.16, regime: "Intervention Risk", trend: [150.50, 150.80, 151.20, 151.50, 151.70, 151.90, 151.80] },
    { symbol: "USD/CNH", name: "US Dollar / Offshore Yuan", value: 7.2540, change: 0.0050, changePct: 0.07, regime: "Bullish", trend: [7.2300, 7.2350, 7.2400, 7.2450, 7.2500, 7.2550, 7.2540] },
    { symbol: "DXY", name: "US Dollar Index", value: 104.32, change: 0.15, changePct: 0.14, regime: "Bullish", trend: [103.50, 103.80, 104.00, 104.10, 104.20, 104.30, 104.32] },
  ],
  commodities: [
    { symbol: "GOLD", name: "Gold", value: 2345.50, change: 12.40, changePct: 0.53, regime: "Safe Haven", trend: [2250, 2280, 2300, 2320, 2335, 2340, 2345] },
    { symbol: "WTI", name: "WTI Crude", value: 85.40, change: 0.85, changePct: 1.01, regime: "Supply Tight", trend: [81.00, 82.50, 83.80, 84.50, 85.00, 85.20, 85.40] },
    { symbol: "COPPER", name: "Copper", value: 4.25, change: 0.04, changePct: 0.95, regime: "Bullish", trend: [4.00, 4.08, 4.12, 4.18, 4.22, 4.24, 4.25] },
  ],
  crypto: [
    { symbol: "BTC", name: "Bitcoin", value: 68450.00, change: 1240.00, changePct: 1.85, regime: "Halving Run", trend: [64000, 65500, 66800, 67200, 67800, 68000, 68450] },
    { symbol: "ETH", name: "Ethereum", value: 3450.20, change: 85.40, changePct: 2.54, regime: "Accumulation", trend: [3200, 3300, 3350, 3400, 3420, 3440, 3450] },
    { symbol: "SOL", name: "Solana", value: 185.40, change: -2.50, changePct: -1.33, regime: "Consolidation", trend: [170, 178, 185, 192, 190, 188, 185] },
  ]
};

export const tickerItems = [
  { symbol: "DXY", value: 104.32, change: 0.15 },
  { symbol: "SPX", value: 5240.15, change: -12.40 },
  { symbol: "US10Y", value: 4.37, change: 0.02 },
  { symbol: "US2Y", value: 4.82, change: 0.05 },
  { symbol: "VIX", value: 16.4, change: 0.8 },
  { symbol: "GOLD", value: 2345.5, change: 12.4 },
  { symbol: "BTC", value: 68450, change: 1240 },
  { symbol: "WTI", value: 85.4, change: 0.85 },
  { symbol: "EUR/USD", value: 1.0845, change: -0.0012 },
];
