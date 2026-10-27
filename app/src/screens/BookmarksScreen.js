import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useTheme from "../theme/useTheme";
import { getBookmarks, removeBookmark } from "../utils/bookmarkStorage";

const IMAGE_URL = "https://api.topheadlinesnews,com/uploads/images/";

export default function BookmarksScreen({ navigation }) {
  const { theme } = useTheme();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = async () => {
    try {
      setLoading(true);

      const data = await getBookmarks();

      setBookmarks(data);
    } catch (error) {
      console.log("Bookmarks loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, []),
  );

  const handleRemove = async (slug) => {
    await removeBookmark(slug);

    setBookmarks((prev) => prev.filter((item) => item.slug !== slug));
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: theme.dark ? "#1E1E1E" : "#FFFFFF",
          },
        ]}
        onPress={() =>
          navigation.navigate("NewsDetail", {
            slug: item.slug,
          })
        }
      >
        {item.thumbnail ? (
          <Image
            source={{
              uri: `${IMAGE_URL}${item.thumbnail}`,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <Ionicons name="newspaper-outline" size={30} color="#999" />
          </View>
        )}

        <View style={styles.content}>
          <Text
            numberOfLines={2}
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            {item.title}
          </Text>

          <Text
            numberOfLines={1}
            style={[
              styles.category,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            {item.categories?.[0]?.name || "News"}
          </Text>

          <Pressable
            style={styles.removeButton}
            onPress={() => handleRemove(item.slug)}
          >
            <Ionicons name="bookmark" size={20} color="#E53935" />

            <Text style={styles.removeText}>Remove Bookmark</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Text style={{ color: theme.colors.text }}>Loading bookmarks...</Text>
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
      <View style={styles.header}>
        <Text
          style={[
            styles.heading,
            {
              color: theme.colors.text,
            },
          ]}
        >
          Bookmarks
        </Text>

        <Text
          style={[
            styles.count,
            {
              color: theme.colors.subText,
            },
          ]}
        >
          {bookmarks.length} saved
        </Text>
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={70} color="#999" />

          <Text
            style={[
              styles.emptyTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            No Bookmarks
          </Text>

          <Text
            style={[
              styles.emptyText,
              {
                color: theme.colors.subText,
              },
            ]}
          >
            Save news articles here to read them later.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.slug}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
  },

  count: {
    marginTop: 4,
    fontSize: 14,
  },

  card: {
    flexDirection: "row",

    borderRadius: 16,

    marginBottom: 16,

    overflow: "hidden",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  image: {
    width: 120,
    height: 150,
    resizeMode: "cover",
  },

  noImage: {
    width: 120,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  content: {
    flex: 1,
    padding: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 23,
  },

  category: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
  },

  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  removeText: {
    marginLeft: 6,
    color: "#E53935",
    fontSize: 12,
    fontWeight: "600",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
});
