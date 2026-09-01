import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import useTheme from "../../theme/useTheme";

export default function CategorySlider({ categories }) {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat._id}
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
