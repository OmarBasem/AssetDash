import { useQuery } from '@tanstack/react-query';
import {Asset} from "@/types/asset";

const ENDPOINT =
  'https://dev-screener-api.assetdash.com/moby_screener/leaderboard/degen_list?compact=false';

export function useAssets() {
  return useQuery<Asset[]>({
    queryKey: ['degeneracy'],
    queryFn: () => fetch(ENDPOINT).then(r => r.json()),
    // refetchInterval: 3_000,
    select: data => {
      // mutate a random 5% of items with a pseudo‑price for the “random update” requirement
      return data.map(item =>
        Math.random() < 0.05
          ? { ...item, price_usd: +(item.price_usd * (0.95 + Math.random() * 0.1)).toFixed(4) }
          : { ...item, price_usd: +(item.price_usd * (0.95 + Math.random() * 0.1)).toFixed(4) },
      );
    },
  });
}
