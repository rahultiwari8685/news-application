import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useTheme from "../theme/useTheme";

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.topheadlinesnews,com/api/categories/getAllCategory",
      );

      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.loader, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color="#E53935" />
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
      <StatusBar style={theme.dark ? "light" : "dark"} />

      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Browse Categories
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <Pressable
            android_ripple={{ color: "#ddd" }}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: theme.dark ? "#1A1A1A" : "#fff",
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            onPress={() =>
              navigation.navigate("CategoryNewsScreen", {
                categoryId: item._id,
                categoryName: item.name,
              })
            }
          >
            <View style={styles.iconCircle}>
              <Ionicons name="newspaper-outline" color="#fff" size={26} />
            </View>

            <Text
              numberOfLines={2}
              style={[
                styles.cardTitle,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {item.name}
            </Text>

            <View style={styles.bottom}>
              <Text style={styles.explore}>Explore</Text>

              <Ionicons name="arrow-forward" size={18} color="#E53935" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    width: "48%",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    minHeight: 50,
  },

  bottom: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  explore: {
    color: "#E53935",
    fontWeight: "700",
    fontSize: 15,
  },
});
