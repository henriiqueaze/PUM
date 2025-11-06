import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getMonitoriaById, type Monitoria } from '@/data/monitoria';

const BLUE = '#1E88E5';

export default function PerfilMonitorScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [item, setItem] = useState<Monitoria | null>(null);

    useEffect(() => {
        if (!id) return;
        getMonitoriaById(String(id)).then((m) => {
            if (!m) {
                Alert.alert('Monitoria não encontrada', '', [{ text: 'OK', onPress: () => router.back() }]);
            }
            setItem(m);
        });
    }, [id]);

    if (!item) return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Image source={{ uri: item.avatarUrl }} style={styles.photo} />
                    <Text style={styles.name}>{item.tutor}</Text>
                    <Text style={styles.role}>{`Monitor de ${item.title}`}</Text>

                    <View style={styles.ratingWrap}>
                        <MaterialIcons name="star-rate" size={18} color="#FFD54F" />
                        <Text style={styles.ratingText}>{item.rating.toFixed(1)} ({item.reviews.length} avaliações)</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sobre</Text>
                    <Text style={styles.cardText}>{item.bio}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Estatísticas</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{item.stats.total}</Text>
                            <Text style={styles.statLabel}>Monitorias</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{Math.round(item.stats.presenca * 100)}%</Text>
                            <Text style={styles.statLabel}>Presença</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{item.rating.toFixed(1)}</Text>
                            <Text style={styles.statLabel}>Avaliação</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Avaliações Recentes</Text>
                    {item.reviews.map((r, idx) => (
                        <View key={idx} style={{ paddingVertical: 14, borderTopWidth: idx ? StyleSheet.hairlineWidth : 0, borderTopColor: '#E5E7EB' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>{r.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <MaterialIcons name="star-rate" size={18} color="#FFA000" />
                                    <Text style={{ fontWeight: '700' }}>{r.stars}</Text>
                                </View>
                            </View>
                            <Text style={{ color: '#4B5563', marginTop: 6 }}>{r.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { backgroundColor: BLUE, paddingTop: 48, paddingHorizontal: 12, paddingBottom: 16, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
    headerCenter: { alignItems: 'center', marginTop: 8 },
    photo: { width: 92, height: 92, borderRadius: 46, borderColor: '#fff', borderWidth: 2, marginBottom: 8 },
    name: { color: '#fff', fontSize: 24, fontWeight: '800' },
    role: { color: '#E6F2FF', marginTop: 2, fontSize: 16 },
    ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
    ratingText: { color: '#fff', fontWeight: '700' },

    card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 14, shadowColor: '#000', elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 10 },
    cardText: { color: '#374151', fontSize: 16, lineHeight: 22 },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
    statBox: { alignItems: 'center', flex: 1 },
    statValue: { fontSize: 22, fontWeight: '800', color: BLUE },
    statLabel: { color: '#6B7280', marginTop: 4 },
});
