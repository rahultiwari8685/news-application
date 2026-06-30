import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

export default function ArticleDetailScreen({ route }) {
  const { article } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        facilisis urna. Praesent ultrices eros in cursus turpis massa tincidunt
        dui ut ornare. Amet facilisis magna etiam tempor.
      </Text>
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  image: { width: "100%", height: 220, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24, color: "#444" },
});
