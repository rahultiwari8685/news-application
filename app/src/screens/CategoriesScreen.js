import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const categories = ["Business", "Technology", "Sports", "Health", "Entertainment", "Science"];

export default function CategoriesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🗂 Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Pressable style={styles.categoryItem}>
                        <Text style={styles.categoryText}>{item}</Text>
                    </Pressable>
                )}
            />
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
    categoryItem: {
        padding: 16,
        backgroundColor: "#f3f3f3",
        borderRadius: 10,
        marginBottom: 10,
    },
    categoryText: { fontSize: 18, fontWeight: "500" },
});
