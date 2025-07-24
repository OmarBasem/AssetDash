import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Asset, Timeframed } from '@/types/asset';

const ENDPOINT =
  'https://dev-screener-api.assetdash.com/moby_screener/leaderboard/degen_list?compact=false';

const TICK_MS = 10_000;
const MUTATION_PROB = 0.5;

export const ASSETS_KEY = ['assets'];

export const fetchAssets = async (): Promise<Asset[]> => {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
};

export function useAssets() {
  const qc = useQueryClient();

  const query = useQuery<Asset[]>({
    queryKey: ASSETS_KEY,
    queryFn: fetchAssets,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!query.isSuccess) return;
    const id = setInterval(() => {
      qc.setQueryData<Asset[]>(ASSETS_KEY, prev =>
        prev?.map(a => (Math.random() < MUTATION_PROB ? randomizeAsset(a) : a)) ?? prev
      );
    }, TICK_MS);
    return () => clearInterval(id);
  }, [query.isSuccess, qc]);

  return query;
}


function randomizeAsset(a: Asset): Asset {
  // ±5% price wiggle
  const factor = 0.95 + Math.random() * 0.10;
  const newPrice = round(a.price_usd * factor, 4);

  // recompute a couple of “relevant fields” consistently
  const priceChangePct = ((newPrice - a.price_usd) / a.price_usd) * 100;

  return {
    ...a,
    price_usd: newPrice,
    price_change_percent: bumpTimeframed(a.price_change_percent, priceChangePct),
    volume_usd: bumpTimeframed(a.volume_usd, randScale(0.9, 1.1)),
    whale_buys_count: bumpTimeframed(a.whale_buys_count, randInt(-3, 3)),
    whale_sells_count: bumpTimeframed(a.whale_sells_count, randInt(-3, 3)),
    whale_net_flow_usd: bumpTimeframed(a.whale_net_flow_usd, randScale(-2000, 2000)),
  };
}

function bumpTimeframed<T extends number>(
  t: Timeframed<T>,
  delta: number | ((old: T) => T),
): Timeframed<T> {
  const bump = (old: T): T =>
    typeof delta === 'function' ? (delta as any)(old) : ((old as any) + delta) as T;

  return {
    m5: bump(t.m5),
    m30: bump(t.m30),
    h1: bump(t.h1),
    h4: bump(t.h4),
    h8: bump(t.h8),
    h24: bump(t.h24),
  };
}

const round = (n: number, d = 2) => +n.toFixed(d);
const randScale = (min: number, max: number) => (v: number) =>
  round(v * (min + Math.random() * (max - min)), 2);
const randInt = (min: number, max: number) => (v: number) =>
  v + Math.floor(Math.random() * (max - min + 1)) + min;
