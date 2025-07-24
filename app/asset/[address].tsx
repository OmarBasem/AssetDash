import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import AssetIcon from "@/components/AssetIcon";
import {useAssetDetail} from "@/hooks/useAssetDetail";

export default function AssetDetailRoute() {
    const {address} = useLocalSearchParams<{ address: string }>();
    const {data: asset} = useAssetDetail(address);
    if (!asset) return null;

    return (
        <ScrollView contentContainerStyle={s.container}>
            <View style={s.hero}>
                <AssetIcon uri={asset.token_icon} style={s.icon}/>
                <View>
                    <Text style={s.symbol}>{asset.token_symbol}</Text>
                    <Text style={s.price}>${asset.price_usd.toFixed(8)}</Text>
                    <Text style={[
                        s.delta,
                        asset.price_change_percent.h24 >= 0 ? s.up : s.down
                    ]}>
                        {asset.price_change_percent.h24.toFixed(2)}%
                    </Text>
                </View>
            </View>

            <View style={s.grid}>
                <Stat label="Market Cap" value={asset.market_cap_usd}/>
                <Stat label="Vol 24h" value={asset.volume_usd.h24}/>
                <Stat label="Liquidity" value={asset.liquidity_usd}/>
            </View>

            <View style={s.card}>
                <Text style={s.cardTitle}>Whale Activity (24 h)</Text>
                <Text>Trades: {asset.whale_buys_count.h24}️ buys / {asset.whale_sells_count.h24}️ sells</Text>
                <Text>Net flow: <Text style={asset.whale_net_flow_usd.h24 >= 0 ? s.up : s.down}>
                    ${asset.whale_net_flow_usd.h24.toFixed(0)}
                </Text></Text>
                <Text>Net supply: {asset.whale_net_supply_percent.h24.toFixed(2)}%</Text>
            </View>

            <View style={s.badges}>
                {asset.is_new && <Badge text="🆕 New"/>}
                {asset.is_pump && <Badge text="🚀 Pump"/>}
                {asset.is_pro && <Badge text="⭐ Pro"/>}
                {asset.is_bonk && <Badge text="👑 Bonk"/>}
            </View>

            <View style={s.card}>
                <Text style={s.cardTitle}>About</Text>
                <Text>Address: {asset.token_address}</Text>
                <Text>Total supply: {formatNum(asset.total_supply)}</Text>
            </View>
        </ScrollView>
    );
}

const Stat = ({label, value}: { label: string; value: number }) => (
    <View style={s.statBox}>
        <Text style={s.statVal}>{formatNum(value)}</Text>
        <Text style={s.statLabel}>{label}</Text>
    </View>
);

const Badge = ({text}: { text: string }) => (
    <View style={s.badge}><Text style={s.badgeText}>{text}</Text></View>
);

const formatNum = (n: number) =>
    Intl.NumberFormat('en', {notation: 'compact', maximumFractionDigits: 1}).format(n);

const s = StyleSheet.create({
    container: {padding: 16, gap: 20},
    hero: {flexDirection: 'row', gap: 16, alignItems: 'center'},
    icon: {width: 56, height: 56, borderRadius: 28},
    symbol: {fontSize: 24, fontWeight: '600'},
    price: {fontVariant: ['tabular-nums'], fontSize: 16},
    delta: {marginTop: 2, fontVariant: ['tabular-nums']},
    up: {color: '#16a34a'},
    down: {color: '#dc2626'},
    grid: {flexDirection: 'row', justifyContent: 'space-between'},
    statBox: {alignItems: 'center', flex: 1},
    statVal: {fontWeight: '600', fontVariant: ['tabular-nums']},
    statLabel: {fontSize: 12, color: '#6b7280'},
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
        gap: 4,
    },
    cardTitle: {fontWeight: '600', marginBottom: 4},
    badges: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
    badge: {
        backgroundColor: '#e5e7eb',
        paddingHorizontal: 8, paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {fontSize: 12, fontWeight: '500'},
    placeholder: {backgroundColor: '#e5e7eb'},
});
