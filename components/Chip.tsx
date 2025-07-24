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
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: '#6366f1',
    },
    pressed: {
        opacity: 0.8,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    textActive: {
        color: '#fff',
    },
});
