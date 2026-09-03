import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";

import useTheme from "../theme/useTheme";

const { width } = Dimensions.get("window");

const IMAGE_URL = "https://api.hindustantvlive.com/uploads/images/";

export default function NewsDetailScreen({ route, navigation }) {
  const { slug } = route.params;

  const { theme } = useTheme();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsDetail();
  }, [slug]);

  const getNewsDetail = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.hindustantvlive.com/api/news/slug/${slug}`,
      );

      if (response.data?.status) {
        setNews(response.data.data);
      } else {
        setNews(null);
      }
    } catch (error) {
      console.log(
        "News Detail Error:",
        error?.response?.data || error?.message,
      );

      setNews(null);
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

  const htmlContent = news.content || "";

  const tagsStyles = {
    body: {
      color: theme.colors.text,
      fontSize: 18,
      lineHeight: 32,
    },

    p: {
      color: theme.colors.text,
      fontSize: 18,
      lineHeight: 32,
      marginTop: 0,
      marginBottom: 18,
    },

    h2: {
      color: theme.colors.text,
      fontSize: 22,
      lineHeight: 30,
      fontWeight: "700",
      marginTop: 18,
      marginBottom: 12,
    },

    h3: {
      color: theme.colors.text,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "700",
      marginTop: 15,
      marginBottom: 10,
    },

    strong: {
      fontWeight: "700",
    },

    a: {
      color: theme.colors.primary,
      textDecorationLine: "underline",
    },

    ul: {
      marginBottom: 15,
    },

    ol: {
      marginBottom: 15,
    },

    li: {
      color: theme.colors.text,
      fontSize: 18,
      lineHeight: 30,
      marginBottom: 8,
    },
  };

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
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!!news.thumbnail && (
          <Image
            source={{
              uri: `${IMAGE_URL}${news.thumbnail}`,
            }}
            style={styles.image}
          />
        )}

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
              {news.createdAt
                ? new Date(news.createdAt).toLocaleDateString("en-IN")
                : ""}
            </Text>

            <Text
              style={[
                styles.metaText,
                {
                  color: theme.colors.subText,
                },
              ]}
            >
              Top Headlines
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.border,
              },
            ]}
          />

          {!!htmlContent && (
            <RenderHTML
              contentWidth={width - 40}
              source={{
                html: htmlContent,
              }}
              tagsStyles={tagsStyles}
              enableExperimentalMarginCollapsing
            />
          )}

          {!!news.author?.name && (
            <View
              style={[
                styles.authorBox,
                {
                  borderTopColor: theme.colors.border,
                },
              ]}
            >
              {!!news.author?.profileImage && (
                <Image
                  source={{
                    uri: `${IMAGE_URL}${news.author.profileImage}`,
                  }}
                  style={styles.authorImage}
                />
              )}

              <View style={styles.authorInfo}>
                <Text
                  style={[
                    styles.authorLabel,
                    {
                      color: theme.colors.subText,
                    },
                  ]}
                >
                  Published by
                </Text>

                <Text
                  style={[
                    styles.authorName,
                    {
                      color: theme.colors.text,
                    },
                  ]}
                >
                  {news.author.name}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <StatusBar style={theme.dark ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* BACK BUTTON */

  backButton: {
    position: "absolute",

    top: 50,
    left: 16,

    zIndex: 20,

    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "rgba(0,0,0,0.55)",

    justifyContent: "center",
    alignItems: "center",
  },

  /* IMAGE */

  image: {
    width: "100%",
    height: 280,

    resizeMode: "cover",
  },

  /* ARTICLE */

  contentContainer: {
    padding: 20,
  },

  /* CATEGORY */

  categoryBadge: {
    alignSelf: "flex-start",

    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 20,

    marginBottom: 12,
  },

  categoryText: {
    color: "#fff",

    fontSize: 12,

    fontWeight: "700",
  },

  /* TITLE */

  title: {
    fontSize: 26,

    fontWeight: "700",

    lineHeight: 35,

    marginBottom: 12,
  },

  /* SUBTITLE */

  subtitle: {
    fontSize: 16,

    lineHeight: 25,

    marginBottom: 15,
  },

  /* META */

  metaRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 15,
  },

  metaText: {
    fontSize: 13,
  },

  /* DIVIDER */

  divider: {
    height: 1,

    marginBottom: 20,
  },

  /* AUTHOR */

  authorBox: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 25,

    paddingTop: 20,

    borderTopWidth: 1,
  },

  authorImage: {
    width: 45,
    height: 45,

    borderRadius: 23,

    marginRight: 12,
  },

  authorInfo: {
    flex: 1,
  },

  authorLabel: {
    fontSize: 12,

    marginBottom: 2,
  },

  authorName: {
    fontSize: 15,

    fontWeight: "700",
  },
});
