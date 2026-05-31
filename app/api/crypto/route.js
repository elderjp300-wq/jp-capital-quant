export const revalidate = 21600; // 6h

// CoinGecko BTC: price + 30d daily series. No key required.
export async function GET() {
  try {
    const url =
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart' +
      '?vs_currency=usd&days=30&interval=daily';
    const r = await fetch(url, { next: { revalidate: 21600 } });
    if (!r.ok) {
      return Response.json({ error: 'CoinGecko ' + r.status }, { status: 502 });
    }
    const data = await r.json();
    const prices = Array.isArray(data.prices) ? data.prices.map((p) => p[1]) : [];
    const price = prices.length ? prices[prices.length - 1] : null;
    const first = prices.length ? prices[0] : null;
    const pct30 = first ? Number((((price - first) / first) * 100).toFixed(2)) : null;

    return Response.json(
      { symbol: 'BTC', price, pct30, series: prices },
      { headers: { 'Cache-Control': 's-maxage=21600, stale-while-revalidate=86400' } }
    );
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
