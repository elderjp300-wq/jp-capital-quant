export const revalidate = 3600;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'DXY';
  const key = process.env.TWELVE_DATA_API_KEY;
  if (!key) {
    return Response.json({ error: 'TWELVE_DATA_API_KEY not set' }, { status: 500 });
  }

  try {
    // quote = latest price + daily change; time_series = 30d for the spark
    const base = 'https://api.twelvedata.com';
    const q = `symbol=${encodeURIComponent(symbol)}&apikey=${key}`;

    const [quoteRes, tsRes] = await Promise.all([
      fetch(`${base}/quote?${q}`, { next: { revalidate: 3600 } }),
      fetch(`${base}/time_series?interval=1day&outputsize=30&${q}`, { next: { revalidate: 3600 } }),
    ]);
    const quote = await quoteRes.json();
    const ts = await tsRes.json();

    // Twelve Data signals errors with { status: 'error', message, code }
    if (quote.status === 'error') {
      return Response.json({ error: 'TD quote: ' + quote.message, code: quote.code }, { status: 502 });
    }

    const closes = Array.isArray(ts.values)
      ? ts.values.map((v) => Number(v.close)).reverse() // oldest -> newest
      : [];

    const price = Number(quote.close);
    const first = closes.length ? closes[0] : price;
    const pct30 = first ? ((price - first) / first) * 100 : Number(quote.percent_change);

    return Response.json(
      {
        symbol,
        price,
        changePct: Number(quote.percent_change),
        pct30: Number(pct30.toFixed(2)),
        series: closes,
      },
      { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } }
    );
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
