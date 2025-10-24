import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Header({ title }: { title: string }) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Ionicons name="notifications-outline" size={24} color="#e63946" />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
    },
    title: { fontSize: 24, fontWeight: "700", color: "#222" },
});
