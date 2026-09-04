import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import useTheme from "../../theme/useTheme";

export default function CategorySlider({ categories, navigation }) {
  const { theme } = useTheme();

  const handleCategoryPress = (cat) => {
    if (!cat?._id) {
      console.log("Category ID missing");
      return;
    }

    if (!navigation) {
      console.log("Navigation object missing");
      return;
    }

    console.log("==============================");
    console.log("CATEGORY CLICKED");
    console.log("CATEGORY NAME:", cat.name);
    console.log("CATEGORY ID:", cat._id);
    console.log("==============================");

    navigation.navigate("CategoryNewsScreen", {
      categoryId: cat._id,
      categoryName: cat.name,
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat._id}
          activeOpacity={0.7}
          onPress={() => handleCategoryPress(cat)}
          style={[
            styles.categoryChip,
            {
              backgroundColor: theme.dark ? "#252525" : "#f2f2f2",
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 10,
  },

  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
