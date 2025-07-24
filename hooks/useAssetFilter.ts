import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandMMKVStorage} from "@/store/mmkv";

type State = {
    showNew: boolean;
    showPro: boolean;
    priceMin: number;
    sortBy: 'price' | 'marketCap';
    toggleNew: () => void;
    togglePro: () => void;
    setPriceMin: (n: number) => void;
    setSort: (s: State['sortBy']) => void;
};

export const useAssetFilter = create<State>()(
    persist(
        (set) => ({
            showNew: true,
            showPro: true,
            priceMin: 0,
            sortBy: 'price',
            toggleNew: () => set((s) => ({showNew: !s.showNew})),
            togglePro: () => set((s) => ({showPro: !s.showPro})),
            setPriceMin: (priceMin) => set({priceMin}),
            setSort: (sortBy) => set({sortBy}),
        }),
        {
            name: 'asset-filters',
            storage: createJSONStorage(() => zustandMMKVStorage),
        },
    )
);
