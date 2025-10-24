import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const categories = ["Business", "Technology", "Sports", "Entertainment", "Health"];

const articles = [
    {
        id: "1",
        title: "AI Revolution in 2025",
        snippet: "Artificial intelligence is reshaping industries faster than ever...",
        image: "https://picsum.photos/400/200?1",
        category: "Technology",
    },
    {
        id: "2",
        title: "SpaceX launches next-gen Starship",
        snippet: "The future of space travel has begun with a new era of innovation...",
        image: "https://picsum.photos/400/200?2",
        category: "Science",
    },
    {
        id: "3",
        title: "Global Markets Hit Record Highs",
        snippet: "Investors celebrate as global markets break new records...",
        image: "https://picsum.photos/400/200?3",
        category: "Business",
    },
    {
        id: "4",
        title: "World Cup 2025 Highlights",
        snippet: "The excitement continues as teams battle for the ultimate trophy...",
        image: "https://picsum.photos/400/200?4",
        category: "Sports",
    },
];

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>MediaVarta</Text>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={28} color="#4a00e0" />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                    {categories.map((cat) => (
                        <TouchableOpacity key={cat} style={styles.categoryChip}>
                            <Text style={styles.categoryText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Trending / Featured News */}
                <Text style={styles.sectionTitle}>Trending News</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {articles.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.trendingCard}
                            onPress={() => navigation.navigate("NewsDetail", { item })}
                        >
                            <Image source={{ uri: item.image }} style={styles.trendingImage} />
                            <View style={styles.trendingOverlay}>
                                <Text style={styles.trendingTitle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Latest Articles */}
                <Text style={styles.sectionTitle}>Latest Articles</Text>
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.articleCard}
                            onPress={() => navigation.navigate("NewsDetail", { item })}
                        >
                            <Image source={{ uri: item.image }} style={styles.articleImage} />
                            <View style={styles.articleContent}>
                                <Text style={styles.articleCategory}>{item.category}</Text>
                                <Text style={styles.articleTitle}>{item.title}</Text>
                                <Text style={styles.articleSnippet}>{item.snippet}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("Bookmarks")} // example action
            >
                <Ionicons name="bookmark-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: 16, marginBottom: 16 },
    logo: { fontSize: 24, fontWeight: "bold", color: "#4a00e0" },

    categories: { marginBottom: 16, marginHorizontal: 16 },
    categoryChip: {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    categoryText: { fontSize: 14, color: "#4a00e0", fontWeight: "600" },

    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, marginHorizontal: 16, color: "#111" },

    trendingCard: { width: 250, height: 140, borderRadius: 16, marginLeft: 16, marginRight: 16, overflow: "hidden" },
    trendingImage: { width: "100%", height: "100%" },
    trendingOverlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 8,
    },
    trendingTitle: { color: "#fff", fontWeight: "bold", fontSize: 14 },

    articleCard: {
        flexDirection: "row",
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        overflow: "hidden",
    },
    articleImage: { width: 120, height: 100 },
    articleContent: { flex: 1, padding: 12 },
    articleCategory: { fontSize: 12, fontWeight: "600", color: "#4a00e0", marginBottom: 4 },
    articleTitle: { fontSize: 16, fontWeight: "bold", color: "#111", marginBottom: 4 },
    articleSnippet: { fontSize: 14, color: "#666", lineHeight: 20 },

    // Floating Action Button
    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#4a00e0",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#4a00e0",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
