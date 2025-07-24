import {FlashList} from '@shopify/flash-list';
import {useAssets} from '@/hooks/useAsset';
import {ActivityIndicator} from 'react-native';
import AssetItem from '@/components/AssetItem';
import {useRouter} from 'expo-router';
import {useAssetFilter} from "@/hooks/useAssetFilter";
import FilterBar from "@/components/FilterBar";
import BlobUtil from 'react-native-blob-util';

export default function AssetListScreen() {
    const {data, isLoading} = useAssets();
    const router = useRouter();

    const filters = useAssetFilter();

    const filtered = (data ?? [])
        .filter((a) => (filters.showNew ? true : !a.is_new))
        .filter((a) => (filters.showPro ? true : !a.is_pro))
        .filter((a) => a.price_usd >= filters.priceMin)
        .sort((a, b) =>
            filters.sortBy === 'price'
                ? b.price_usd - a.price_usd
                : b.market_cap_usd - a.market_cap_usd
        );


    if (isLoading) {
        return <ActivityIndicator style={{flex: 1}}/>;
    }

    return (
        <FlashList
            data={filtered}
            keyExtractor={(item) => item.token_address}
            estimatedItemSize={60}
            ListHeaderComponent={FilterBar} // 👉 use a function
            renderItem={({item}) => (
                <AssetItem
                    asset={item}
                    onPress={() =>
                        router.push({
                            pathname: '/asset/[address]',
                            params: {address: item.token_address},
                        })
                    }
                />
            )}
        />
    );
}
