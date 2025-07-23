import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {Image} from "expo-image";
import {Asset} from "@/types/asset";

interface AssetItemProps {
  asset: Asset;
  onPress?: () => void;
}

const AssetItem: React.FC<AssetItemProps> = ({ asset, onPress }) => {
  const {
    token_icon,
    token_symbol,
    price_usd,
    market_cap_usd,
    is_pump,
    is_new,
  } = asset;

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      {token_icon ? (
        <Image source={token_icon} style={styles.icon} />
      ) : (
        <View style={[styles.icon, styles.placeholder]} />
      )}

      <View style={styles.meta}>
        <Text style={styles.symbol}>{token_symbol}</Text>
        <Text style={styles.marketCap}>MC: {formatNumber(market_cap_usd)}</Text>
      </View>

      <View style={styles.priceBlock}>
        <Text style={styles.price}>${price_usd.toFixed(6)}</Text>
        {is_pump && <Text style={styles.badge}>🚀</Text>}
        {is_new && <Text style={styles.badge}>🆕</Text>}
      </View>
    </Pressable>
  );
};

function formatNumber(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  pressed: { opacity: 0.75 },
  icon: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  placeholder: { backgroundColor: '#e5e7eb' },
  meta: { flex: 1 },
  symbol: { fontSize: 16, fontWeight: '600', textTransform: 'uppercase' },
  marketCap: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  priceBlock: { alignItems: 'flex-end' },
  price: { fontVariant: ['tabular-nums'], fontWeight: '600' },
  badge: { fontSize: 12, marginTop: 2 },
});

export default memo(AssetItem);
