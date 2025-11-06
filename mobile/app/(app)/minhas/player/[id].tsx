import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { router, useLocalSearchParams } from 'expo-router';
import { getAgendamentoById, type AgendamentoComMonitoria } from '@/data/agendamentos';

export default function PlayerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [a, setA] = useState<AgendamentoComMonitoria | null>(null);

    useEffect(() => {
        if (!id) return;
        getAgendamentoById(String(id)).then(setA);
    }, [id]);

    if (!a) return <ActivityIndicator style={{ marginTop: 40 }} />;

    const dur = a.durationMin ? `${Math.floor(a.durationMin / 60)}h ${a.durationMin % 60}min` : '—';

    return (
        <View style={{ flex: 1, backgroundColor: '#111' }}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{a.title}</Text>
                    <Text style={styles.subtitle}>{formatDate(a.dateISO)}</Text>
                </View>
                <View style={{ width: 28 }} />
            </View>

            <View style={{ height: 240, backgroundColor: '#000' }}>
                {a.videoUrl ? (
                    <WebView
                        style={{ flex: 1 }}
                        source={{ html: youtubeEmbed(a.videoUrl) }}
                        allowsFullscreenVideo
                        mediaPlaybackRequiresUserAction={false}
                    />
                ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="play-circle" size={78} color="#3B82F6" />
                    </View>
                )}
            </View>

            <ScrollView style={{ flex: 1, backgroundColor: '#F3F4F6' }} contentContainerStyle={{ padding: 16 }}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{a.title}</Text>
                    <Text style={{ color: '#6B7280', marginTop: 6 }}>Monitor: {a.tutor}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 12 }}>
                        <Row icon="calendar-outline" text={formatDate(a.dateISO)} />
                        <Row icon="time-outline" text={dur} />
                    </View>
                </View>

                {a.summary ? (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Sobre esta monitoria</Text>
                        <Text style={{ color: '#374151', marginTop: 10, lineHeight: 22 }}>{a.summary}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}

function Row({ icon, text }: { icon: any; text: string }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name={icon} size={18} color="#6B7280" />
            <Text style={{ color: '#111827', fontWeight: '600' }}>{text}</Text>
        </View>
    );
}

function formatDate(iso: string) {
    const [y, m, d] = iso.split('-').map((s) => parseInt(s, 10));
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('pt-BR');
}

function youtubeEmbed(url: string) {
    const embed = url.includes('/embed/') ? url : url.replace('watch?v=', 'embed/');
    return `
  <html><head><meta name="viewport" content="initial-scale=1, maximum-scale=1">
  <style>body,html{margin:0;padding:0;background:#000;height:100%}</style></head>
  <body>
    <iframe width="100%" height="100%" src="${embed}"
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  </body></html>`;
}

const styles = StyleSheet.create({
    topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 48, paddingBottom: 10, backgroundColor: '#111' },
    title: { color: '#fff', fontSize: 18, fontWeight: '800' },
    subtitle: { color: '#E5E7EB', marginTop: 2 },
    card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 14, shadowColor: '#000', elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
});
