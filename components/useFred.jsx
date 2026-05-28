'use client';

import { useState, useEffect } from 'react';

// Shared FRED fetch hook. Returns { data, loading, error }.
// data is { SERIES_ID: [{date, value}, ...], ... } or null.
export function useFred(series, limit = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    fetch(`/api/fred?series=${encodeURIComponent(series)}&limit=${limit}`)
      .then((r) => r.json())
      .then((json) => {
        if (!alive) return;
        if (json && json.error) { setError(json.error); setData(null); }
        else setData(json);
      })
      .catch((e) => { if (alive) setError(String(e)); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [series, limit]);

  return { data, loading, error };
}
