import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import useTheme from "../../theme/useTheme";

export default function BreakingTicker() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#E53935",
        },
      ]}
    >
      <Ionicons name="radio" color="#fff" size={18} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.text}>
          Breaking: Top Headlines News brings the latest headlines • Elections •
          Sports • Business • Technology
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  text: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
  },
});
