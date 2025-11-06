import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { OptionMenu } from '@/app/(public)';

type Props = {
    active: OptionMenu;
    onSelect: (opt: OptionMenu) => void;
};

export default function MenuHorizontal({ active, onSelect }: Props) {
    const items: OptionMenu[] = ['sobre', 'contatos', 'faq'];

    return (
        <View style={styles.wrapper}>
            <View style={styles.menu}>
                {items.map((opt) => {
                    const isActive = active === opt;
                    const label = opt === 'sobre' ? 'Sobre' : opt === 'contatos' ? 'Contatos' : 'FAQ';

                    return (
                        <Pressable
                            key={opt}
                            accessibilityRole="button"
                            accessibilityState={{ selected: isActive }}
                            onPress={() => onSelect(opt)}
                            style={[styles.item]}
                        >
                            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
                            {isActive && <View style={styles.underline} />}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: 'transparent' },
    menu: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    item: { alignItems: 'center', paddingVertical: 8, flex: 1 },
    label: { color: '#eee', fontSize: 14, fontWeight: '600' },
    labelActive: { color: '#fff' },
    underline: {
        height: 3,
        width: '60%',
        backgroundColor: '#0A84FF',
        borderRadius: 999,
        marginTop: 6,
    },
});
