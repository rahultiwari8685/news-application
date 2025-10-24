import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function BookmarksScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>🔖 No bookmarks yet</Text>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 18, color: "#555" },
});
