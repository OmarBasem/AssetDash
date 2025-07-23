import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useAssetFilter} from '@/hooks/useAssetFilter';
import Chip from "@/components/Chip";

export default function FilterBar() {
    const {showNew, toggleNew, showPro, togglePro, priceMin, setPriceMin,  sortBy, setSort} =
        useAssetFilter();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(priceMin ? String(priceMin) : '');

    const confirm = () => {
        const num = Number(draft);
        setPriceMin(isNaN(num) ? 0 : num);
        setEditing(false);
    };

    return (
        <View style={styles.row}>
            <Chip label="New" active={showNew} onPress={toggleNew}/>
            <Chip label="Pro" active={showPro} onPress={togglePro}/>

            {/* price filter */}
            {editing ? (
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        value={draft}
                        onChangeText={setDraft}
                        autoFocus
                        keyboardType="decimal-pad"
                        placeholder="≥ USD"
                        onSubmitEditing={confirm}
                        onBlur={confirm}
                    />
                </View>
            ) : (
                <Chip
                    label={priceMin ? `≥ $${priceMin}` : 'Price'}
                    active={!!priceMin}
                    onPress={() => {
                        setDraft(priceMin ? String(priceMin) : '');
                        setEditing(true);
                    }}
                />
            )}
            <Chip active={sortBy === 'price'} label="Sort: Price" onPress={() => setSort('price')}/>
            <Chip active={sortBy === 'marketCap'} label="Sort: MC" onPress={() => setSort('marketCap')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 8,
        padding: 8,
        backgroundColor: '#fff',
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 9999,
        backgroundColor: '#e5e7eb',
    },
    chipActive: {backgroundColor: '#6366f1'},
    chipText: {fontSize: 12, fontWeight: '600', color: '#374151'},
    chipTextActive: {color: '#fff'},

    inputBox: {
        borderRadius: 9999,
        backgroundColor: '#e5e7eb',
        paddingHorizontal: 8,
        paddingVertical: 0,
        minWidth: 80,
        justifyContent: 'center',
    },
    input: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        paddingVertical: 4,
    },
});
