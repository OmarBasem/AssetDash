import {FlashList} from '@shopify/flash-list';
import {useAssets} from '@/hooks/useAssets';
import {ActivityIndicator} from 'react-native';
import AssetItem from '@/components/AssetItem';
import {useRouter} from 'expo-router';
import {useAssetFilter} from "@/hooks/useAssetFilter";
import FilterBar from "@/components/FilterBar";
import {useCallback, useMemo} from "react";
import {Asset} from "@/types/asset";

export default function AssetListScreen() {
    const {data, isLoading, isFetching, refetch} = useAssets();
    const router = useRouter();
    const filters = useAssetFilter();
    const filtered = useMemo(() => {
        if (!data) return [];
        return data
            .filter(a => (filters.showNew ? true : !a.is_new))
            .filter(a => (filters.showPro ? true : !a.is_pro))
            .filter(a => a.price_usd >= filters.priceMin)
            .sort((a, b) =>
                filters.sortBy === 'price'
                    ? b.price_usd - a.price_usd
                    : b.market_cap_usd - a.market_cap_usd
            );
    }, [data, filters.showNew, filters.showPro, filters.priceMin, filters.sortBy]);

    const keyExtractor = useCallback((item: Asset) => item.token_address, []);
    const renderItem = useCallback(
        ({item}: { item: Asset }) => (
            <AssetItem
                asset={item}
                onPress={() =>
                    router.push({pathname: '/asset/[address]', params: {address: item.token_address}})
                }
            />
        ),
        [router]
    );

    if (isLoading) {
        return <ActivityIndicator style={{flex: 1}}/>;
    }
    const refreshing = isFetching && !isLoading;
    return (
        <>
            <FilterBar/>
            <FlashList
                data={filtered}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                estimatedItemSize={64}
                refreshing={refreshing}
                onRefresh={refetch}
            />
        </>
    );
}
