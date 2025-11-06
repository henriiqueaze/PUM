import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabName = 'home' | 'monitorias' | 'minhas' | 'perfil';

export type BottomTabBarProps = {
    active: TabName;
    onTabPress: (name: TabName) => void;
    style?: ViewStyle;
};

const BLUE = '#1E88E5';
const GRAY = '#9CA3AF';
const LABEL = '#374151';

export default function BottomTabBar({ active, onTabPress, style }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    const Item = ({
        name,
        label,
        icon,
    }: {
        name: TabName;
        label: string;
        icon: React.ReactNode;
    }) => {
        const focused = active === name;
        return (
            <TouchableOpacity
                accessibilityRole="button"
                onPress={() => onTabPress(name)}
                style={styles.item}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <View style={styles.iconWrap}>
                    {React.cloneElement(icon as any, { color: focused ? BLUE : GRAY })}
                </View>
                <Text style={[styles.label, { color: focused ? BLUE : LABEL }]}>{label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) }, style]}>
            <Item
                name="home"
                label="Início"
                icon={<Ionicons name="home-outline" size={24} />}
            />
            <Item
                name="monitorias"
                label="Monitorias"
                icon={<MaterialCommunityIcons name="book-open-variant" size={24} />}
            />
            <Item
                name="minhas"
                label="Minhas"
                icon={<Ionicons name="calendar-outline" size={24} />}
            />
            <Item
                name="perfil"
                label="Perfil"
                icon={<Ionicons name="person-outline" size={24} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        paddingTop: 10,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 8,
        elevation: 8,
    },
    item: { alignItems: 'center', justifyContent: 'center', gap: 4, paddingHorizontal: 8 },
    iconWrap: { height: 26, justifyContent: 'center' },
    label: { fontSize: 13, fontWeight: '600' },
});
