import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

const owl = require('@/assets/images/fipinhoCadastro.png');

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            router.replace('/(app)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <View style={styles.header_image}>
                        <Image source={owl} style={{ width: '100%', height: '100%' }} />
                    </View>

                    <Text style={styles.title}>Plataforma de Monitoria</Text>
                    <Text style={styles.subtitle}>Unifip - Centro Universitário</Text>
                </View>

                <View style={styles.blueWrap}>
                    <View style={styles.card}>
                        <Text style={styles.label}>Email Acadêmico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="fipinho@ads.fiponline.edu.br"
                            placeholderTextColor="#9CA3AF"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={[styles.label, { marginTop: 16 }]}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            value={pwd}
                            onChangeText={setPwd}
                        />

                        <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} disabled={loading}>
                            <Text style={styles.primaryBtnText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.forgot}>Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingTop: 30,
        height: 400,
        justifyContent: "flex-end",
    },
    header_image: {
        width: 180,
        height: 260,
        alignItems: 'center',
        justifyContent: "center",
    },
    title: { fontSize: 28, fontWeight: '600', color: '#111827', textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#6B7280', marginTop: 6, textAlign: 'center' },

    blueWrap: {
        flex: 1,
        backgroundColor: '#1E88E5',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        paddingTop: 36,
        marginTop: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 22,
        shadowColor: '#000',
        elevation: 4,
        marginHorizontal: 8,
    },
    label: { fontSize: 16, color: '#111827', marginBottom: 8 },
    input: {
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    primaryBtn: {
        marginTop: 22,
        height: 52,
        borderRadius: 12,
        backgroundColor: '#1E88E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    forgot: { marginTop: 18, color: '#1E88E5', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
