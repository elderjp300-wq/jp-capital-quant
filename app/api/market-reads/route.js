export const revalidate = 21600; // 6h

export async function GET() {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return Response.json({ error: 'GROQ_API_KEY not set' }, { status: 500 });
  }

  // Slice 1: hardcoded sample numbers to prove the Groq pipeline.
  // Slice 2 will replace this with live FRED / Twelve Data / CoinGecko data.
  const snapshot = {
    gold: { price: 2342.7, chg30: 1.8 },
    us10y: { price: 4.48, chg30: -0.1 },
    btc: { price: 67342, chg30: 6.2 },
    eurusd: { price: 1.1647, chg30: -0.73 },
  };

  const prompt =
    'You are a macro desk analyst. Given ONLY these numbers, write a one-sentence ' +
    'neutral market read for EACH asset. Describe context, never give buy/sell advice. ' +
    'Never invent numbers beyond those given. Respond as STRICT JSON with keys ' +
    'gold, us10y, btc, eurusd, each a string. No markdown, no preamble.\n\n' +
    'Data (price, 30-day % change): ' + JSON.stringify(snapshot);

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
