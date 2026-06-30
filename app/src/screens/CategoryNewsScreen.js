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
        `https://api.topheadlinesnews.com/api/news/category/${categoryId}`,
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
            <Image
              source={{
                uri:
                  "https://api.topheadlinesnews.com/uploads/images/" +
                  item.thumbnail,
              }}
              style={styles.image}
            />

            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  heading: {
    fontSize: 28,
    marginTop: 35,
    fontWeight: "700",
    marginBottom: 15,
  },

  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 4,
  },

  image: {
    width: "100%",
    height: 220,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    padding: 12,
  },
});
