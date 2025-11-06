import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const user = {
    name: 'Fipinho Jr',
    email: 'fipinho@ads.fiponline.edu.br',
    avatarUrl: 'https://i.pravatar.cc/200?img=8',
    course: 'Análise e Desenvolvimento',
    registry: '2023001234',
    term: '4º Período',
    stats: { done: 14, hours: 28 },
};

const BLUE = '#1E88E5';

export default function PerfilScreen() {
    const onSettings = () => {
        Alert.alert('Configurações', 'Aqui você pode abrir uma tela de configurações.');
    };

    const onLogout = () => {
        router.replace('/(auth)/login');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meu Perfil</Text>

                <View style={styles.headerCenter}>
                    <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Informações do Aluno</Text>

                    <Row label="Curso" value={user.course} />
                    <Row label="Matrícula" value={user.registry} />
                    <Row label="Período" value={user.term} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Minhas Estatísticas</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={[styles.statValue, { color: BLUE }]}>{user.stats.done}</Text>
                            <Text style={styles.statLabel}>Monitorias{'\n'}Concluídas</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{user.stats.hours}h</Text>
                            <Text style={styles.statLabel}>Horas de Estudo</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.settingRow} onPress={onSettings} activeOpacity={0.8}>
                    <Ionicons name="settings-outline" size={20} color="#111827" />
                    <Text style={styles.settingText}>Configurações</Text>
                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.9}>
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: BLUE,
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
    },
    headerTitle: { color: '#E6F2FF', fontSize: 28, fontWeight: '800' },
    headerCenter: { alignItems: 'center', marginTop: 14 },
    avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: '#fff' },
    name: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 10 },
    email: { color: '#E6F2FF', marginTop: 4 },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginTop: 14,
        shadowColor: '#000',
        elevation: 2,
    },
    cardTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E5E7EB',
    },
    rowLabel: { flex: 1, color: '#6B7280', fontSize: 16 },
    rowValue: { color: '#111827', fontSize: 16, fontWeight: '700' },

    statsRow: { flexDirection: 'row', gap: 16, marginTop: 6 },
    statBox: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
    },
    statValue: { fontSize: 22, fontWeight: '800' },
    statLabel: { color: '#6B7280', textAlign: 'center', marginTop: 6 },

    settingRow: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 16,
        shadowColor: '#000',
        elevation: 1,
    },
    settingText: { flex: 1, color: '#111827', fontSize: 16, fontWeight: '700' },

    logoutBtn: {
        marginTop: 14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#FCA5A5',
        backgroundColor: '#FFF5F5',
        paddingVertical: 16,
        alignItems: 'center',
    },
    logoutText: { color: '#DC2626', fontWeight: '800', fontSize: 16 },
});
