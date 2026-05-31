export const revalidate = 3600;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Fetch one FRED series, with one automatic retry if rate-limited (429).
async function fetchSeries(id, key, limit) {
  const url =
    'https://api.stlouisfed.org/fred/series/observations' +
    '?series_id=' + encodeURIComponent(id) +
    '&api_key=' + key +
    '&file_type=json&sort_order=desc&limit=' + limit;

  for (let attempt = 0; attempt < 2; attempt++) {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (r.ok) {
      const data = await r.json();
      const obs = (data.observations || [])
        .filter((o) => o.value !== '.')
        .map((o) => ({ date: o.date, value: Number(o.value) }));
      return [id, obs];
    }
    // Rate-limited or transient: wait and retry once.
    if (r.status === 429 && attempt === 0) {
      await sleep(700);
      continue;
    }
    return [id, { error: 'FRED ' + r.status }];
  }
  return [id, { error: 'FRED retry-failed' }];
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
    // Sequential with a comfortable 500ms gap (well within FRED's window),
    // plus per-series retry above. Cached 6h so latency is paid once.
    const out = {};
    for (let i = 0; i < ids.length; i++) {
      const [id, val] = await fetchSeries(ids[i], key, limit);
      out[id] = val;
      if (i < ids.length - 1) await sleep(500);
    }
    return Response.json(out, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
