import { LinearGradient } from "expo-linear-gradient"; // Expo gradient
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainDrawer");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#4a00e0", "#8e2de2"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require("../../../assets/images/TH_Logo.png")}
            style={styles.logo}
          />
        </View>
      </View>

      <Text style={styles.title}>Top Headlines</Text>
      <Text style={styles.tagline}>Stay Updated, Stay Ahead</Text>

      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logoCircle: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  tagline: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
