export const revalidate = 3600;

// Fetch one FRED series (latest `limit` observations, newest first)
async function fetchSeries(id, key, limit) {
  const url =
    'https://api.stlouisfed.org/fred/series/observations' +
    '?series_id=' + encodeURIComponent(id) +
    '&api_key=' + key +
    '&file_type=json&sort_order=desc&limit=' + limit;
  const r = await fetch(url, { next: { revalidate: 3600 } });
  if (!r.ok) return [id, { error: 'FRED ' + r.status }];
  const data = await r.json();
  const obs = (data.observations || [])
    .filter((o) => o.value !== '.')
    .map((o) => ({ date: o.date, value: Number(o.value) }));
  return [id, obs];
}

// Small helper: run async tasks with limited concurrency (avoids FRED 429 bursts)
async function mapLimit(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const series = searchParams.get('series');
  const limit = Math.min(parseInt(searchParams.get('limit') || '1', 10) || 1, 400);

  if (!series) {
    return Response.json({ error: 'missing ?series=' }, { status: 400 });
  }
  const key = process.env.FRED_API_KEY;
  if (!key) {
    return Response.json({ error: 'FRED_API_KEY not set' }, { status: 500 });
  }

  const ids = series.split(',').map((s) => s.trim()).filter(Boolean);

  try {
    // Concurrency capped at 2 to stay under FRED's burst limit.
    const results = await mapLimit(ids, 2, (id) => fetchSeries(id, key, limit));
    return Response.json(Object.fromEntries(results), {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
