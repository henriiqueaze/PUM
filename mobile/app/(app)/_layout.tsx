import { View } from 'react-native';
import { Slot, router, useSegments } from 'expo-router';
import BottomTabBar from '@/components/custom/BottomTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function getActiveTabFromSegments(segments: string[]) {
    const child = segments[1] ?? 'index';

    const monitoriasGroup = new Set([
        'monitorias',
        'monitoria',
        'agendar',
        'perfil-monitor',
        'video',
        'avaliar',
    ]);

    if (child === 'index') return 'home';
    if (monitoriasGroup.has(child)) return 'monitorias';
    if (child === 'minhas') return 'minhas';
    if (child === 'perfil') return 'perfil';
    return 'home';
}

export default function AppLayout() {
    const insets = useSafeAreaInsets();
    const segments = useSegments();
    const active = getActiveTabFromSegments(segments as string[]);

    return (
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <View style={{ flex: 1, paddingBottom: 74 + insets.bottom }}>
                <Slot />
            </View>

            <BottomTabBar
                active={active}
                onTabPress={(t) => {
                    if (t === 'home') router.replace('/(app)');
                    if (t === 'monitorias') router.replace('/(app)/monitorias');
                    if (t === 'minhas') router.replace('/(app)/minhas');
                    if (t === 'perfil') router.replace('/(app)/perfil');
                }}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
            />
        </View>
    );
}
