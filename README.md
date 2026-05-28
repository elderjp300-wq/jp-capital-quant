# JP Capital — Quant Dominance

Mobile-first quant macro terminal — **Next.js 14 (App Router)** + **React 18** + **Tailwind CSS 3**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Layout

```
app/
  layout.jsx     # Root layout, fonts, global CSS
  page.jsx       # Client shell + tab router
  globals.css    # Tailwind + design tokens + animations
components/
  lib.jsx        # Helpers, Sparkline, Card, FlashNum, Reveal, icons
  Shell.jsx      # TopTicker + BottomNav
  Dashboard.jsx
  Markets.jsx
  Macro.jsx
  AI.jsx
  Settings.jsx
```

All data is synthetic — replace the arrays at the top of each module with real feeds.
Respects `prefers-reduced-motion`.
