export const revalidate = 21600; // 6h

export async function GET() {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return Response.json({ error: 'GROQ_API_KEY not set' }, { status: 500 });
  }

  // Slice 1b: still sample numbers — testing PROMPT QUALITY before wiring live data.
  // Slice 2 replaces this with live FRED / Twelve Data / CoinGecko.
  const snapshot = {
    gold:   { price: 2342.7, chg30: 1.8 },
    us10y:  { price: 4.48,   chg30: -0.1 },
    btc:    { price: 67342,  chg30: 6.2 },
    eurusd: { price: 1.1647, chg30: -0.73 },
  };

  const prompt =
`You are the macro desk analyst for a gold/FX trader. You are given a live snapshot of four assets with price and 30-day % change:
- Gold (XAU/USD)
- US 10Y Treasury yield
- Bitcoin (risk proxy)
- EUR/USD (dollar read)

Your job is CROSS-ASSET interpretation, NOT description. For each asset write EXACTLY two sentences:
(1) the move, stated briefly;
(2) the IMPLICATION relative to the OTHER assets in this snapshot.
You MUST connect assets to each other (e.g. falling yields + rising gold = real-yield tailwind; rising BTC = risk-on confirmation; EUR/USD direction = dollar tail/headwind).

Then add a "desk" field: ONE sentence synthesizing the whole board.

HARD RULES:
- Reason ONLY from the four numbers given. Do NOT invent data, levels, news, or events.
- If the moves do not actually support a relationship, do NOT manufacture one.
- Never give buy/sell/trade advice. Context only.
- Do NOT merely restate price and %; the value is the relationship/implication.
- Output STRICT JSON with keys gold, us10y, btc, eurusd, desk. No markdown, no preamble.

Snapshot (price, 30-day % change): ${JSON.stringify(snapshot)}`;

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + key,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return Response.json({ error: 'Groq ' + r.status, detail: t.slice(0, 300) }, { status: 502 });
    }
    const data = await r.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    let reads;
    try { reads = JSON.parse(raw); } catch { reads = { _raw: raw }; }

    return Response.json(
      { updated: new Date().toISOString(), reads },
      { headers: { 'Cache-Control': 's-maxage=21600, stale-while-revalidate=86400' } }
    );
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
