import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getMonitoriaById, type Monitoria } from '@/data/monitoria';

const BLUE = '#1E88E5';

export default function AgendarMonitoriaScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [item, setItem] = useState<Monitoria | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (!id) return;
        getMonitoriaById(String(id)).then((m) => {
            if (!m) {
                Alert.alert('Monitoria não encontrada', '', [{ text: 'OK', onPress: () => router.back() }]);
            }
            setItem(m);
        });
    }, [id]);

    const onConfirm = () => {
        if (!selected) {
            Alert.alert('Selecione um horário', 'Escolha um dos horários disponíveis.');
            return;
        }
        Alert.alert('Agendado!', `${item?.title}\n${selected}`, [{ text: 'OK', onPress: () => router.back() }]);
    };

    if (!item) return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
                    <Ionicons name="arrow-back" size={22} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.topTitle}>Agendar Monitoria</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <Image source={{ uri: item.avatarUrl }} style={{ width: 44, height: 44, borderRadius: 22 }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>{item.title}</Text>
                            <Text style={{ color: '#6B7280' }}>{item.tutor}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Selecione o horário</Text>
                {item.slots.map((slot) => {
                    const on = selected === slot;
                    return (
                        <TouchableOpacity key={slot} style={[styles.slot, on && styles.slotActive]} onPress={() => setSelected(slot)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="time-outline" size={18} color={on ? BLUE : '#6B7280'} />
                                <Text style={[styles.slotText, on && { color: '#0F172A' }]}>  {slot}</Text>
                            </View>
                            <Text style={{ color: '#9CA3AF', fontWeight: '600' }}>{item.vagas} vagas</Text>
                        </TouchableOpacity>
                    );
                })}

                <Text style={styles.sectionTitle}>Observações (opcional)</Text>
                <TextInput
                    style={styles.notes}
                    multiline
                    numberOfLines={4}
                    placeholder="Descreva suas dúvidas ou tópicos que gostaria de revisar..."
                    placeholderTextColor="#9CA3AF"
                    value={notes}
                    onChangeText={setNotes}
                    textAlignVertical="top"
                />
            </ScrollView>

            <View style={styles.ctaWrap}>
                <TouchableOpacity style={styles.ctaBtn} onPress={onConfirm}>
                    <Text style={styles.ctaText}>Confirmar Agendamento</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 48, paddingBottom: 10, backgroundColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
    topTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#111827' },
    card: { backgroundColor: '#fff', borderRadius: 18, padding: 14, shadowColor: '#000', elevation: 2, marginBottom: 14 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginTop: 12, marginBottom: 8 },
    slot: { backgroundColor: '#F3F4F6', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    slotActive: { backgroundColor: '#EEF6FF', borderWidth: 1, borderColor: BLUE },
    slotText: { color: '#111827', fontSize: 16, fontWeight: '700' },
    notes: { backgroundColor: '#F3F4F6', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E5E7EB', minHeight: 120 },
    ctaWrap: { position: 'absolute', left: 0, right: 0, bottom: 16, paddingHorizontal: 16 },
    ctaBtn: { height: 54, borderRadius: 12, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
    ctaText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
