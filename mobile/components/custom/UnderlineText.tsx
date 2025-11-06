import { Platform, Text, View } from 'react-native';
import React from 'react';

export function UnderlineText({
    children,
    textColor = '#212121',
    underlineColor = '#1E88E5',
}: {
    children: React.ReactNode;
    textColor?: string;
    underlineColor?: string;
}) {
    const [w, setW] = React.useState(0);

    return (
        <View style={{ alignItems: 'center' }}>
            <Text
                onLayout={(e) => setW(e.nativeEvent.layout.width)}
                style={{
                    color: textColor,
                    textDecorationLine: Platform.OS === 'ios' ? 'underline' : 'none',
                    textDecorationColor: underlineColor,
                    fontSize: 25
                }}
            >
                {children}
            </Text>

            {Platform.OS === 'android' && (
                <View
                    style={{
                        width: w,
                        height: 2,
                        backgroundColor: underlineColor,
                        marginTop: 4,
                        borderRadius: 999,
                    }}
                />
            )}
        </View>
    );
}
