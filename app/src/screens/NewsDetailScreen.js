import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function NewsDetailScreen({ route, navigation }) {
    const { item } = route.params || {};
    const article = item || {
        title: "Breaking News: Market Sees Historic Growth",
        image: "https://picsum.photos/800/400?random=3",
        category: "Business",
        author: "Jane Doe",
        date: "October 9, 2025",
        content: `The stock market witnessed an unprecedented surge today as investors responded positively to the latest economic growth reports. Analysts predict continued momentum throughout the quarter.\n\nIn related news, technology and renewable energy sectors led the rally with record-breaking performance.\n\nExperts believe this marks a pivotal moment for global markets, signaling a return to pre-recession confidence.`,
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image */}
                <Image
                    source={{ uri: article.image || "https://via.placeholder.com/800x400.png" }}
                    style={styles.image}
                />

                <View style={styles.contentContainer}>
                    {/* Category Badge */}
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{article.category}</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>{article.title}</Text>

                    {/* Meta */}
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>🕓 {article.date}</Text>
                        <Text style={styles.metaText}>✍️ {article.author}</Text>
                    </View>

                    {/* Content */}
                    <Text style={styles.content}>{article.content}</Text>
                </View>
            </ScrollView>

            {/* Floating Bookmark Button */}
            <TouchableOpacity style={styles.bookmarkBtn}>
                <Ionicons name="bookmark-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    backButton: {
        position: "absolute",
        top: 50,
        left: 16,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 50,
        padding: 10,
    },

    image: {
        width: "100%",
        height: 250,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        resizeMode: "cover",
    },

    contentContainer: { padding: 20, marginTop: 8 },

    categoryBadge: {
        backgroundColor: "#4a00e0",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 12,
    },
    categoryText: { color: "#fff", fontWeight: "600", fontSize: 12, textTransform: "uppercase" },

    title: { fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "#111" },

    metaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
    metaText: { color: "#666", fontSize: 13 },

    content: { fontSize: 16, lineHeight: 26, color: "#333" },

    bookmarkBtn: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#8e2de2",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#8e2de2",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
