import { BlurView } from "expo-blur";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function GlassButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <BlurView intensity={70} tint="light" style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </BlurView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginVertical: 10 },
    button: {
        paddingVertical: 15,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
    },
    text: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
