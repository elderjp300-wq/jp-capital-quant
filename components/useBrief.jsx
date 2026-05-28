'use client';

import { useState, useEffect } from 'react';

// Fetches the weekly editorial brief (Fed path, correlation, narrative).
// Edit public/weekly-brief.json to update these cards.
export function useBrief() {
  const [brief, setBrief] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch('/weekly-brief.json', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => { if (alive) setBrief(j); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return brief;
}
