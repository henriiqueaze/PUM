import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import { StyleSheet, TextInput } from "react-native";

export default function CustomInput({ title, value, setValue, placeholder }: { title: string, value: string, setValue: Dispatch<SetStateAction<string>>, placeholder: string }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: "100%",
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        height: 50,
        fontSize: 18,
    },
});