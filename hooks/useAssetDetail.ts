import { useQuery } from '@tanstack/react-query';
import { Asset } from '@/types/asset';
import { ASSETS_KEY, fetchAssets } from '@/hooks/useAssets';

export function useAssetDetail(address?: string) {
  return useQuery<Asset[], Error, Asset | undefined>({
    queryKey: ASSETS_KEY,
    queryFn: fetchAssets,
    enabled: !!address,
    select: data => data.find(a => a.token_address === address),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
