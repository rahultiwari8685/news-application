import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useTheme from "../theme/useTheme";
export default function CategoryNewsScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;

  const { theme } = useTheme();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const res = await axios.get(
        `https://api.topheadlinesnews,com/api/news/category/${categoryId}`,
      );

      if (res.data.status) {
        setNews(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      />
    );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {categoryName}
      </Text>

      <FlatList
        data={news}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: theme.dark ? "#181818" : "#fff",
                transform: [{ scale: pressed ? 0.98 : 1 }],
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
                uri:
                  "https://api.topheadlinesnews,com/uploads/images/" +
                  item.thumbnail,
              }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.content}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{categoryName}</Text>
              </View>

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

              {/* {!!item.subtitle && (
                <Text numberOfLines={3} style={styles.subtitle}>
                  {item.subtitle}
                </Text>
              )} */}

              {/* <View style={styles.footer}>
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={18}
                    color="#E53935"
                  />

                  <Text style={styles.author}>{item.author?.name}</Text>
                </View>

                <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={16} color="#888" />

                  <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </Text>
                </View>
              </View> */}

              <View style={styles.readMore}>
                <Text style={styles.readMoreText}>Read Full Story</Text>

                <Ionicons
                  name="arrow-forward-circle"
                  size={26}
                  color="#E53935"
                />
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  card: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 18,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E53935",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 5,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#777",
    lineHeight: 23,
  },

  // footer: {
  //   marginTop: 18,
  // },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  author: {
    marginLeft: 6,
    color: "#E53935",
    fontWeight: "700",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  date: {
    marginLeft: 6,
    color: "#888",
  },

  readMore: {
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  readMoreText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E53935",
  },
});
