import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const avatar1 = { uri: 'https://i.pravatar.cc/100?img=5' };
const avatar2 = { uri: 'https://i.pravatar.cc/100?img=12' };
const avatar3 = { uri: 'https://i.pravatar.cc/100?img=31' };

type Available = {
    id: string;
    title: string;
    tutor: string;
    rating: number;
    mode: 'Presencial' | 'EAD';
    avatar: any;
};

const available: Available[] = [
    { id: '1', title: 'Cálculo I', tutor: 'Ana Silva', rating: 4.8, mode: 'Presencial', avatar: avatar1 },
    { id: '3', title: 'Programação I', tutor: 'Carlos Santos', rating: 4.9, mode: 'EAD', avatar: avatar2 },
    { id: '2', title: 'Química Orgânica', tutor: 'Maria Oliveira', rating: 4.7, mode: 'Presencial', avatar: avatar3 },
];

const BLUE = '#1E88E5';

export default function HomeDashboardScreen() {
    const [query, setQuery] = useState('');

    const goToList = () =>
        router.push({ pathname: '/(app)/monitorias', params: query ? { q: query } : undefined });

    const goToDetail = (id: string) =>
        router.push({ pathname: '/(app)/minhas/player/[id]', params: { id } });

    const renderAvailable = ({ item }: { item: Available }) => (
        <TouchableOpacity
            style={styles.cardRow}
            activeOpacity={0.9}
            onPress={() => goToDetail(item.id)}
        >
            <View style={styles.rowLeft}>
                <Image source={item.avatar} style={styles.avatar} />
                <View>
                    <Text style={styles.rowTitle}>{item.title}</Text>
                    <Text style={styles.rowSubtitle}>{item.tutor}</Text>
                </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.modePill} onPress={() => goToDetail(item.id)}>
                    <Text style={styles.modePillText}>{item.mode}</Text>
                </TouchableOpacity>

                <View style={styles.ratingRow}>
                    <MaterialIcons name="star-rate" size={18} color="#FFA000" />
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.hello}>Olá,</Text>
                    <Text style={styles.username}>Fipinho Jr</Text>
                </View>

                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(app)/minhas')}>
                        <Ionicons name="calendar-outline" size={22} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => Alert.alert('Notificações', 'Sem novas notificações (mock).')}
                    >
                        <Ionicons name="notifications-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={20} color="#9CA3AF" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar disciplinas ou monitores..."
                        placeholderTextColor="#9CA3AF"
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                        onSubmitEditing={goToList}
                    />
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconWrap}>
                            <Ionicons name="calendar-outline" size={22} color="#1E88E5" />
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Agendadas</Text>
                            <Text style={styles.statValue}>2</Text>
                        </View>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIconWrap, { backgroundColor: '#FFF7ED' }]}>
                            <Ionicons name="checkmark-done-outline" size={22} color="#F59E0B" />
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Concluídas</Text>
                            <Text style={styles.statValue}>12</Text>
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 12 }}
                data={available}
                keyExtractor={(i) => i.id}
                renderItem={renderAvailable}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.sectionTitle}>Próximas Monitorias</Text>

                        <TouchableOpacity
                            style={styles.nextCard}
                            activeOpacity={0.9}
                            onPress={() => goToDetail('a1')}
                        >
                            <View style={styles.nextLeft}>
                                <View style={styles.nextIcon}>
                                    <Ionicons name="calendar-outline" size={22} color="#fff" />
                                </View>
                                <View>
                                    <Text style={styles.nextTitle}>Cálculo I</Text>
                                    <Text style={styles.nextSubtitle}>Com Ana Silva</Text>

                                    <View style={styles.dateRow}>
                                        <Ionicons name="time-outline" size={16} color="#6B7280" />
                                        <Text style={styles.dateText}> 15/11/2025 às 14:00-16:00</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View style={styles.statusPill}>
                                    <Text style={styles.statusText}>Confirmado</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionTitle}>Monitorias Disponíveis</Text>
                            <TouchableOpacity onPress={goToList}>
                                <Text style={styles.link}>Ver todas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },

    header: {
        backgroundColor: BLUE,
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 26,
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
    },
    hello: { color: '#E6F2FF', fontSize: 16 },
    username: { color: '#fff', fontWeight: '700', fontSize: 22 },
    headerIcons: { position: 'absolute', right: 12, top: 50, flexDirection: 'row', gap: 10 },
    iconBtn: { padding: 8 },

    searchBox: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 46,
        borderRadius: 14,
        paddingHorizontal: 12,
    },
    searchInput: { marginLeft: 8, flex: 1, color: '#111827' },

    statsRow: { flexDirection: 'row', gap: 16, marginTop: 18 },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        elevation: 2,
    },
    statIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F1FF',
    },
    statLabel: { color: '#6B7280', fontSize: 14 },
    statValue: { color: '#111827', fontSize: 20, fontWeight: '700' },

    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginTop: 10, marginBottom: 8 },
    sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },

    nextCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 3,
    },
    nextLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
    nextIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
    nextTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    nextSubtitle: { color: '#6B7280', marginTop: 2 },
    dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    dateText: { color: '#6B7280' },

    statusPill: { backgroundColor: '#22C55E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
    statusText: { color: '#fff', fontWeight: '700' },

    cardRow: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 14,
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 2,
    },
    rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    rowTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    rowSubtitle: { color: '#6B7280', marginTop: 2 },

    modePill: {
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: BLUE,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },
    modePillText: { color: BLUE, fontWeight: '700' },

    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10, alignSelf: 'flex-end' },
    ratingText: { color: '#111827', fontWeight: '700' },

    link: { color: BLUE, fontWeight: '700' },
});
