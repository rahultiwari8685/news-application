import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import useTheme from "../theme/useTheme";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.topheadlinesnews.com/api/categories/getAllCategory",
      );

      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text,
          },
        ]}
      >
        🗂 Categories
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.categoryItem,
              {
                backgroundColor: theme.dark ? "#1E1E1E" : "#F3F3F3",
              },
            ]}
            onPress={() =>
              navigation.navigate("CategoryNewsScreen", {
                categoryId: item._id,
                categoryName: item.name,
              })
            }
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: theme.colors.text,
                },
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />

      <StatusBar style={theme.dark ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  categoryItem: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  categoryText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
