import React, { useEffect, useMemo, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList, Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
    getAgendamentos,
    cancelarAgendamento,
    type AgendamentoComMonitoria,
} from '@/data/agendamentos';
import { router } from 'expo-router';

const GREEN = '#22C55E';

type Tab = 'Agendadas' | 'Histórico';

export default function MinhasScreen() {
    const [tab, setTab] = useState<Tab>('Agendadas');
    const [data, setData] = useState<AgendamentoComMonitoria[] | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        getAgendamentos().then(setData);
    }, []);

    const now = new Date().toISOString().slice(0, 10);

    const list = useMemo(() => {
        if (!data) return [];
        if (tab === 'Agendadas') {
            return data
                .filter((a) => a.dateISO >= now && a.status === 'Confirmado')
                .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
        }
        return data
            .filter((a) => a.dateISO < now || a.status !== 'Confirmado')
            .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
    }, [data, tab, now]);

    const handleCancelar = (id: string) => {
        Alert.alert('Cancelar monitoria', 'Tem certeza que deseja cancelar?', [
            { text: 'Não' },
            {
                text: 'Sim',
                style: 'destructive',
                onPress: async () => {
                    try {
                        setLoadingId(id);
                        await cancelarAgendamento(id);
                        const next = await getAgendamentos();
                        setData(next);
                    } finally {
                        setLoadingId(null);
                    }
                },
            },
        ]);
    };

    const renderAgendada = (item: AgendamentoComMonitoria) => (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>Com {item.tutor}</Text>
                </View>
                <View style={styles.badgeOk}>
                    <Text style={styles.badgeOkText}>Confirmado</Text>
                </View>
            </View>

            <View style={{ marginTop: 12, gap: 10 }}>
                <Row icon="calendar-outline" text={formatDate(item.dateISO)} />
                <Row icon="time-outline" text={`${item.start}-${item.end}`} />
                <Row icon={item.local === 'Ao vivo' ? 'videocam-outline' : 'location-outline'} text={item.local} />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.joinBtn}
                    onPress={() => router.push({ pathname: '/(app)/minhas/player/[id]', params: { id: item.id } })}
                >
                    <Text style={styles.joinText}>Entrar na Sala</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => handleCancelar(item.id)}
                    disabled={loadingId === item.id}
                >
                    <Text style={styles.cancelText}>{loadingId === item.id ? 'Cancelando...' : 'Cancelar'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );

    const renderHistorico = (item: AgendamentoComMonitoria) => (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>Com {item.tutor}</Text>
                </View>

                {!!item.ratingGiven && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <MaterialIcons name="star-rate" size={18} color="#FFA000" />
                        <Text style={{ fontWeight: '700' }}>{item.ratingGiven}</Text>
                    </View>
                )}
            </View>

            <View style={{ marginTop: 12, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Row icon="calendar-outline" text={formatDate(item.dateISO)} style={{ flex: 1 }} />
                {item.recorded && (
                    <View style={styles.pill}>
                        <Ionicons name="film-outline" size={16} color="#2563EB" />
                        <Text style={styles.pillText}>Gravada</Text>
                    </View>
                )}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.joinBtn, { flex: item.ratingGiven ? 1 : 0.48 }]}
                    onPress={() => router.push({ pathname: '/(app)/minhas/player/[id]', params: { id: item.id } })}
                >
                    <Text style={styles.joinText}>Assistir</Text>
                </TouchableOpacity>

                {!item.ratingGiven && (
                    <TouchableOpacity
                        style={[styles.cancelBtn, { flex: 0.48 }]}
                        onPress={() => router.push({ pathname: '/(app)/minhas/avaliar/[id]', params: { id: item.id } })}
                    >
                        <Text style={styles.cancelText}>Avaliar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );

    const renderItem = ({ item }: { item: AgendamentoComMonitoria }) => (
        <View style={styles.card}>
            {tab === 'Agendadas' ? renderAgendada(item) : renderHistorico(item)}
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Minhas Monitorias</Text>
            </View>

            <View style={styles.tabsWrap}>
                {(['Agendadas', 'Histórico'] as const).map((t) => {
                    const on = t === tab;
                    return (
                        <TouchableOpacity key={t} style={[styles.tab, on && styles.tabActive]} onPress={() => setTab(t)}>
                            <Text style={[styles.tabText, on && styles.tabTextActive]}>{t}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <FlatList
                data={list}
                keyExtractor={(i) => i.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120, paddingTop: 10 }}
            />
        </View>
    );
}

function Row({ icon, text, style }: { icon: any; text: string; style?: any }) {
    return (
        <View style={[styles.infoRow, style]}>
            <Ionicons name={icon} size={18} color="#6B7280" />
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );
}

function formatDate(iso: string) {
    const [y, m, d] = iso.split('-').map((s) => parseInt(s, 10));
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('pt-BR');
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: { fontSize: 28, fontWeight: '800', color: '#111827' },

    tabsWrap: {
        marginTop: 12,
        marginHorizontal: 16,
        backgroundColor: '#E9ECEF',
        borderRadius: 22,
        padding: 6,
        flexDirection: 'row',
    },
    tab: { flex: 1, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    tabActive: { backgroundColor: '#fff' },
    tabText: { color: '#6B7280', fontWeight: '700' },
    tabTextActive: { color: '#111827' },

    card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 16, shadowColor: '#000', elevation: 2 },
    title: { fontSize: 22, fontWeight: '800', color: '#111827' },
    subtitle: { color: '#6B7280', marginTop: 2 },

    badgeOk: { backgroundColor: GREEN, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
    badgeOkText: { color: '#fff', fontWeight: '700' },

    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    infoText: { color: '#111827', fontSize: 16, fontWeight: '600' },

    actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 16 },
    joinBtn: { flex: 1, backgroundColor: GREEN, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    joinText: { color: '#fff', fontSize: 16, fontWeight: '800' },
    cancelBtn: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    cancelText: { color: '#111827', fontSize: 16, fontWeight: '800' },

    pill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: '#93C5FD', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: '#EFF6FF' },
    pillText: { color: '#2563EB', fontWeight: '700' },
});
