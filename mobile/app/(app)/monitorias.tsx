import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getAllMonitorias, type Monitoria, type Mode } from '@/data/monitoria';

const BLUE = '#1E88E5';

export default function MonitoriasScreen() {
    const [query, setQuery] = useState('');
    const [tab, setTab] = useState<'Todos' | Mode>('Presencial');
    const [data, setData] = useState<Monitoria[] | null>(null);

    useEffect(() => {
        getAllMonitorias().then(setData);
    }, []);

    const list = useMemo(() => {
        if (!data) return [];
        const q = query.trim().toLowerCase();
        return data
            .filter((i) => (tab === 'Todos' ? true : i.mode === tab))
            .filter((i) => !q || i.title.toLowerCase().includes(q) || i.tutor.toLowerCase().includes(q));
    }, [data, query, tab]);

    const renderItem = ({ item }: { item: Monitoria }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => router.push({ pathname: '/(app)/monitoria/[id]', params: { id: item.id } })}
        >
            <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                    <View style={{ flexShrink: 1 }}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.tutor}</Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <Ionicons name="location-outline" size={18} color="#6B7280" />
                <Text style={styles.locationText}>  {item.location}</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.ratingRow}>
                    <MaterialIcons name="star-rate" size={18} color="#FFA000" />
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>

                <View style={styles.modeBadge}>
                    <Text style={styles.modeText}>{item.mode}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.wrap}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.push('/(app)')} style={{ padding: 6 }}>
                    <Ionicons name="arrow-back" size={22} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.topTitle}>Todas as Monitorias</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={18} color="#9CA3AF" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar disciplinas..."
                    placeholderTextColor="#9CA3AF"
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            <View style={styles.tabsWrap}>
                {(['Todos', 'Presencial', 'EAD'] as const).map((t) => {
                    const focused = tab === t;
                    return (
                        <TouchableOpacity key={t} style={[styles.tab, focused && styles.tabActive]} onPress={() => setTab(t)}>
                            <Text style={[styles.tabText, focused && styles.tabTextActive]}>{t}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {!data ? (
                <ActivityIndicator style={{ marginTop: 24 }} />
            ) : (
                <FlatList
                    data={list}
                    keyExtractor={(i) => i.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: '#F5F6F7' },
    topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 50, paddingBottom: 8, backgroundColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
    topTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#111827' },
    searchBox: { marginTop: 12, marginHorizontal: 16, backgroundColor: '#F3F4F6', height: 44, borderRadius: 14, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
    searchInput: { marginLeft: 8, flex: 1, color: '#111827' },
    tabsWrap: { marginTop: 12, marginHorizontal: 16, backgroundColor: '#ECEFF1', borderRadius: 22, padding: 6, flexDirection: 'row', justifyContent: 'space-between' },
    tab: { flex: 1, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    tabActive: { backgroundColor: '#fff' },
    tabText: { color: '#374151', fontSize: 15, fontWeight: '600' },
    tabTextActive: { color: '#111827' },
    card: { backgroundColor: '#fff', borderRadius: 18, padding: 14, marginTop: 16, shadowColor: '#000', elevation: 2 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    avatar: { width: 42, height: 42, borderRadius: 21 },
    cardTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
    cardSubtitle: { color: '#6B7280', marginTop: 2 },
    locationText: { color: '#6B7280', fontSize: 15 },
    cardFooter: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { color: '#111827', fontWeight: '700' },
    modeBadge: { borderWidth: 1, borderColor: BLUE, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
    modeText: { color: BLUE, fontWeight: '700' },
});
