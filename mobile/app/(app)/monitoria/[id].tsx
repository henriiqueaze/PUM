import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getMonitoriaById, type Monitoria } from '@/data/monitoria';

const BLUE = '#1E88E5';

export default function MonitoriaDetalheScreen() {
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

    if (!item) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F6F7' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>

                <View style={styles.headerRow}>
                    <Image source={{ uri: item.avatarUrl }} style={styles.headerAvatar} />
                    <View style={{ flexShrink: 1 }}>
                        <Text style={styles.headerTitle}>{item.title}</Text>
                        <Text style={styles.headerSubtitle}>{item.area}</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
                <View style={styles.card}>
                    <View style={styles.cardTop}>
                        <Text style={styles.cardTitleMuted}>Monitor</Text>
                        <TouchableOpacity
                            style={styles.outlineBtn}
                            onPress={() => router.push({ pathname: '/(app)/monitoria/perfil', params: { id: item.id } })}
                        >
                            <Text style={styles.outlineBtnText}>Ver perfil</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{item.tutor}</Text>

                    <View style={styles.metaRow}>
                        <View style={styles.ratingRow}>
                            <MaterialIcons name="star-rate" size={18} color="#FFA000" />
                            <Text style={styles.metaText}> {item.rating.toFixed(1)}</Text>
                        </View>
                        <View style={styles.dot} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="people-outline" size={18} color="#9CA3AF" />
                            <Text style={styles.metaText}> {item.vagas} vagas disponíveis</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Informações</Text>

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={22} color={BLUE} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.infoLabel}>Local</Text>
                            <Text style={styles.infoValue}>{item.location}</Text>
                        </View>
                    </View>

                    <View style={[styles.infoRow, { marginTop: 14 }]}>
                        <Ionicons name="calendar-outline" size={22} color={BLUE} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.infoLabel}>Tipo</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.mode}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
                    {item.slots.map((s) => (
                        <View key={s} style={styles.slot}>
                            <Ionicons name="time-outline" size={18} color="#6B7280" />
                            <Text style={styles.slotText}>  {s}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.ctaWrap}>
                <TouchableOpacity
                    style={styles.ctaBtn}
                    onPress={() => router.push({ pathname: '/(app)/monitoria/agendar', params: { id: item.id } })}
                >
                    <Text style={styles.ctaText}>Agendar Monitoria</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { backgroundColor: BLUE, paddingTop: 48, paddingHorizontal: 12, paddingBottom: 14, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
    headerAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#fff' },
    headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800' },
    headerSubtitle: { color: '#E6F2FF', fontSize: 16, marginTop: 2 },

    card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 14, shadowColor: '#000', elevation: 2 },
    cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardTitleMuted: { color: '#6B7280', fontSize: 16, fontWeight: '700' },
    outlineBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB' },
    outlineBtnText: { color: '#374151', fontWeight: '700' },
    name: { fontSize: 22, fontWeight: '800', color: '#111827', marginTop: 8 },
    metaRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center' },
    ratingRow: { flexDirection: 'row', alignItems: 'center' },
    metaText: { color: '#6B7280', fontSize: 16 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB', marginHorizontal: 10 },

    sectionTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 12 },
    infoRow: { flexDirection: 'row', alignItems: 'center' },
    infoLabel: { color: '#6B7280', fontSize: 14 },
    infoValue: { color: '#111827', fontSize: 18, fontWeight: '700' },

    badge: { alignSelf: 'flex-start', borderWidth: 1, borderColor: BLUE, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, marginTop: 6 },
    badgeText: { color: BLUE, fontWeight: '700' },

    slot: { marginTop: 12, backgroundColor: '#F3F4F6', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' },
    slotText: { color: '#111827', fontSize: 16, fontWeight: '600' },

    ctaWrap: { position: 'absolute', left: 0, right: 0, bottom: 16, paddingHorizontal: 16 },
    ctaBtn: { height: 54, borderRadius: 12, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
    ctaText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
