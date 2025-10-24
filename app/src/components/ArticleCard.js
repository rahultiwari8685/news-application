import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function ArticleCard({ article, onPress }) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Image source={{ uri: article.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.snippet} numberOfLines={2}>{article.snippet}</Text>
                <StatusBar style="light" />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    image: { width: "100%", height: 180 },
    content: { padding: 12 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 6, color: "#222" },
    snippet: { color: "#666", fontSize: 14 },
});
