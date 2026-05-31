export const revalidate = 21600; // 6h

// Helper: absolute base URL for internal route calls (Vercel-safe)
function baseUrl(req) {
  const host = req.headers.get('host');
  const proto = host && host.includes('localhost') ? 'http' : 'https';
  return `${proto}://${host}`;
}

async function safeJson(url, opts) {
  try {
    const r = await fetch(url, opts);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

export async function GET(req) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return Response.json({ error: 'GROQ_API_KEY not set' }, { status: 500 });

  const base = baseUrl(req);

  // Pull all four live in parallel, reusing our existing routes.
  const [gold, eur, btc, fred] = await Promise.all([
    safeJson(`${base}/api/markets?symbol=XAU/USD`, { next: { revalidate: 21600 } }),
    safeJson(`${base}/api/markets?symbol=EUR/USD`, { next: { revalidate: 21600 } }),
    safeJson(`${base}/api/crypto`, { next: { revalidate: 21600 } }),
    safeJson(`${base}/api/fred?series=DGS10&limit=22`, { next: { revalidate: 21600 } }),
  ]);

  // US10Y: compute 30d change from FRED series (≈22 trading days)
  let y10 = null, y10chg = null;
  if (fred && Array.isArray(fred.DGS10) && fred.DGS10.length) {
    y10 = fred.DGS10[0].value;                       // newest (sort desc)
    const old = fred.DGS10[fred.DGS10.length - 1].value;
    y10chg = Number((y10 - old).toFixed(2));          // bps move in points
  }

  const snapshot = {
    gold:   { price: gold ? gold.price : null, chg30: gold ? gold.pct30 : null },
    us10y:  { price: y10, chg30pts: y10chg },
    btc:    { price: btc ? btc.price : null, chg30: btc ? btc.pct30 : null },
    eurusd: { price: eur ? eur.price : null, chg30: eur ? eur.pct30 : null },
  };

  const prompt =
`You are the macro desk analyst for a gold/FX trader. Live snapshot of four assets (price, and 30-day % change unless noted):
- gold = Gold XAU/USD (USD per ounce)
- us10y = US 10-Year Treasury yield in %, with chg30pts = change in percentage points over ~30 days
- btc = Bitcoin USD (risk proxy)
- eurusd = EUR/USD (dollar read: down = stronger dollar)

Your job is CROSS-ASSET interpretation, NOT description. For EACH asset return two fields:
- "move": one short sentence citing the ACTUAL number from the data.
- "implication": one sentence on what it means RELATIVE TO THE OTHER assets here.
Connect them (e.g. falling yields + rising gold = real-yield tailwind; falling BTC + falling gold = broad de-risking; EUR/USD down = dollar headwind for gold/EM).

Also return "desk": ONE sentence synthesizing the whole board.

HARD RULES:
- Reason ONLY from these numbers. NEVER invent data, price levels, news, or events.
- If a value is null, say data is unavailable for that asset; do not guess.
- If the moves don't support a relationship, don't manufacture one.
- No buy/sell/trade advice. Context only.
- Output STRICT JSON, EXACTLY this shape:
{"gold":{"move":"","implication":""},"us10y":{"move":"","implication":""},"btc":{"move":"","implication":""},"eurusd":{"move":"","implication":""},"desk":""}
No markdown, no preamble.

Snapshot: ${JSON.stringify(snapshot)}`;

  const ai = await safeJson('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    }),
  });

  if (!ai) return Response.json({ error: 'Groq request failed', snapshot }, { status: 502 });

  let reads;
  try { reads = JSON.parse(ai.choices?.[0]?.message?.content || '{}'); }
  catch { reads = {}; }

  return Response.json(
    { updated: new Date().toISOString(), snapshot, reads },
    { headers: { 'Cache-Control': 's-maxage=21600, stale-while-revalidate=86400' } }
  );
}
