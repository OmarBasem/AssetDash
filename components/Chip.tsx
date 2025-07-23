import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

type Props = {
    label: string;
    active?: boolean;
    onPress: () => void;
};

export default function Chip({label, active = false, onPress}: Props) {
    return (
        <Pressable
            style={({pressed}) => [
                styles.base,
                active && styles.active,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 9999,
        backgroundColor: '#e5e7eb', // gray‑200
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: '#6366f1', // indigo‑500
    },
    pressed: {
        opacity: 0.8,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151', // gray‑700
    },
    textActive: {
        color: '#fff',
    },
});
