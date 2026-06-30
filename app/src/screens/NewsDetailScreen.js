import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useTheme from "../theme/useTheme";

export default function NewsDetailScreen({ route, navigation }) {
  const { slug } = route.params;
  const { theme } = useTheme();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contentBlocks, setContentBlocks] = useState([]);

  useEffect(() => {
    getNewsDetail();
  }, [slug]);

  const getNewsDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.topheadlinesnews.com/api/news/slug/${slug}`,
      );

      if (response.data.status) {
        const newsData = response.data.data;

        setNews(newsData);

        try {
          const parsedContent = JSON.parse(newsData.content);

          if (parsedContent?.blocks) {
            setContentBlocks(parsedContent.blocks);
          }
        } catch (err) {
          console.log("Content Parse Error:", err);
        }
      }
    } catch (error) {
      console.log("Detail Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!news) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 18,
          }}
        >
          News not found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: `https://api.topheadlinesnews.com/uploads/images/${news.thumbnail}`,
          }}
          style={styles.image}
        />

        <View style={styles.contentContainer}>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            <Text style={styles.categoryText}>
              {news.categories?.[0]?.name || "News"}
            </Text>
          </View>

          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            {news.title}
          </Text>

          {!!news.subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.subText,
                },
              ]}
            >
              {news.subtitle}
            </Text>
          )}

          <View style={styles.metaRow}>
            <Text
              style={[
                styles.metaText,
                {
                  color: theme.colors.subText,
                },
              ]}
            >
              {new Date(news.createdAt).toLocaleDateString("en-IN")}
            </Text>

            <Text style={styles.metaText}>Top Headlines</Text>
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.border,
              },
            ]}
          />

          {contentBlocks.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <Text
                  key={index}
                  style={[
                    styles.content,
                    {
                      color: theme.colors.text,
                    },
                  ]}
                >
                  {block.data.text}
                </Text>
              );
            }

            return null;
          })}
        </View>
      </ScrollView>

      <StatusBar style={theme.dark ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

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
    height: 260,
    resizeMode: "cover",
  },

  contentContainer: {
    padding: 20,
  },

  categoryBadge: {
    backgroundColor: "#4a00e0",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    // color: "#111",
    lineHeight: 34,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    // color: "#666",
    lineHeight: 24,
    marginBottom: 15,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  metaText: {
    fontSize: 13,
    // color: "#888",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 20,
  },

  content: {
    fontSize: 18,
    lineHeight: 32,
    color: "#333",
    marginBottom: 18,
  },
});
