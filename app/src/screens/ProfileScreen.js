import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john@example.com</Text>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
    name: { fontSize: 22, fontWeight: "700" },
    email: { color: "#666" },
});
