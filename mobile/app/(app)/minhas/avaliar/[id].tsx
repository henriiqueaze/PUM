import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getAgendamentoById, enviarAvaliacao, type AgendamentoComMonitoria } from '@/data/agendamentos';

export default function AvaliarScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [a, setA] = useState<AgendamentoComMonitoria | null>(null);
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (!id) return;
        getAgendamentoById(String(id)).then(setA);
    }, [id]);

    const submit = async () => {
        if (!stars) {
            Alert.alert('Avaliação', 'Selecione uma nota de 1 a 5.');
            return;
        }
        await enviarAvaliacao(String(id), stars, comment);
        Alert.alert('Obrigado!', 'Sua avaliação foi enviada.', [
            { text: 'OK', onPress: () => router.back() },
        ]);
    };

    if (!a) return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
        <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
                    <Ionicons name="arrow-back" size={22} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.topTitle}>Avaliar Monitoria</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
                <View style={styles.card}>
                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>{a.title}</Text>
                    <Text style={{ color: '#6B7280', marginTop: 4 }}>Com {a.tutor} - {formatDate(a.dateISO)}</Text>
                </View>

                <Text style={styles.sectionTitle}>Como foi a monitoria?</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <TouchableOpacity key={n} onPress={() => setStars(n)}>
                            <MaterialIcons name="star-rate" size={36} color={n <= stars ? '#F59E0B' : '#E5E7EB'} />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Deixe um comentário</Text>
                <TextInput
                    style={styles.textarea}
                    multiline
                    placeholder="Conte como foi sua experiência na monitoria..."
                    placeholderTextColor="#9CA3AF"
                    value={comment}
                    onChangeText={setComment}
                    textAlignVertical="top"
                />
            </ScrollView>

            <View style={styles.ctaWrap}>
                <TouchableOpacity style={styles.ctaBtn} onPress={submit}>
                    <Text style={styles.ctaText}>Enviar Avaliação</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function formatDate(iso: string) {
    const [y, m, d] = iso.split('-').map((s) => parseInt(s, 10));
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('pt-BR');
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 48, paddingBottom: 10, backgroundColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
    topTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#111827' },

    card: { backgroundColor: '#fff', borderRadius: 18, padding: 14, shadowColor: '#000', elevation: 2, marginBottom: 14 },

    sectionTitle: { color: '#111827', fontWeight: '800', fontSize: 16, marginTop: 12 },

    textarea: { marginTop: 10, backgroundColor: '#fff', minHeight: 140, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB', padding: 12 },

    ctaWrap: { position: 'absolute', left: 0, right: 0, bottom: 16, paddingHorizontal: 16 },
    ctaBtn: { height: 52, borderRadius: 12, backgroundColor: '#1E88E5', alignItems: 'center', justifyContent: 'center' },
    ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
