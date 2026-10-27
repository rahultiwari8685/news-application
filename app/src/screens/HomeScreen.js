import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BreakingTicker from "../components/Home/BreakingTicker.js";
import CategorySlider from "../components/Home/CategorySlider.js";
import Header from "../components/Home/Header";
import HeroSlider from "../components/Home/HeroSlider.js";
import useTheme from "../theme/useTheme.js";

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  const { theme } = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
    getNews();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.topheadlinesnews,com/api/categories/getAllCategory",
      );

      if (response.data.success) {
        const menuCategories = response.data.data.filter(
          (item) => item.showInMenu === "1",
        );

        setCategories(menuCategories);
      }
    } catch (error) {
      console.log("Category Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const getNews = async () => {
    try {
      const response = await axios.get(
        "https://api.topheadlinesnews,com/api/news/getAllNews?limit=20",
      );

      if (response.data.status) {
        const newsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        // Only Text News
        const latestNews = newsArray.filter(
          (item) => Number(item.videoType) === 2,
        );

        setNews(latestNews);
      }
    } catch (error) {
      console.log("News Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        <BreakingTicker navigation={navigation} />

        {loading ? (
          <Text style={{ marginHorizontal: 16 }}>Loading categories...</Text>
        ) : (
          <CategorySlider categories={categories} navigation={navigation} />
        )}

        {/* Trending / Featured News */}
        {/* <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Trending News
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {news.slice(0, 5).map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.trendingCard}
              onPress={() =>
                navigation.navigate("NewsDetail", {
                  slug: item.slug,
                })
              }
            >
              <Image
                source={{
                  uri: `https://api.topheadlinesnews,com/uploads/images/${item.thumbnail}`,
                }}
                style={styles.trendingImage}
              />
              <View style={styles.trendingOverlay}>
                <Text style={styles.trendingTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Top Stories
        </Text>

        {/* <HeroSlider news={news.slice(0, 5)} navigation={navigation} /> */}
        <HeroSlider news={news.slice(0, 5)} navigation={navigation} />

        {/* Latest Articles */}
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Latest Articles
        </Text>
        <FlatList
          data={news}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.articleCard,
                {
                  backgroundColor: theme.dark ? "#1E1E1E" : "#fff",
                },
              ]}
              onPress={() =>
                navigation.navigate("NewsDetail", {
                  slug: item.slug,
                })
              }
            >
              <Image
                source={{
                  uri: `https://api.topheadlinesnews,com/uploads/images/${item.thumbnail}`,
                }}
                style={styles.articleImage}
              />

              <View style={styles.articleContent}>
                <Text
                  style={[
                    styles.articleCategory,
                    {
                      color: theme.colors.primary,
                    },
                  ]}
                >
                  {item.categories?.[0]?.name || "News"}
                </Text>

                <Text
                  style={[
                    styles.articleTitle,
                    {
                      color: theme.colors.text,
                    },
                  ]}
                >
                  {item.title}
                </Text>

                {/* <Text style={styles.articleSnippet} numberOfLines={2}>
                  {item.subtitle}
                </Text> */}
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Floating Action Button */}
      {/* <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        onPress={() => navigation.navigate("Bookmarks")} // example action
      >
        <Ionicons name="bookmark-outline" size={28} color="#fff" />
      </TouchableOpacity> */}
      <StatusBar style={theme.dark ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: -10,
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: 30,
    resizeMode: "contain",
  },

  categories: { marginBottom: 16, marginHorizontal: 16 },
  categoryChip: {
    // backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: { fontSize: 14, color: "#4a00e0", fontWeight: "600" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
    marginHorizontal: 16,
    color: "#111",
  },

  trendingCard: {
    width: 250,
    height: 140,
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    overflow: "hidden",
  },
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
  articleImage: { width: 120, resizeMode: "cover" },
  articleContent: { flex: 1, padding: 12 },
  articleCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4a00e0",
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
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
