import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useTheme from "../theme/useTheme";

export default function SettingsScreen() {
  const { theme, themeMode, changeTheme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>

      {/* Appearance */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
          },
        ]}
      >
        <Text style={[styles.heading, { color: theme.colors.text }]}>
          Appearance
        </Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => changeTheme("system")}
        >
          <Text style={{ color: theme.colors.text }}>📱 System Default</Text>

          {themeMode === "system" && (
            <Ionicons
              name="checkmark-circle"
              color={theme.colors.primary}
              size={22}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => changeTheme("light")}
        >
          <Text style={{ color: theme.colors.text }}>☀ Light</Text>

          {themeMode === "light" && (
            <Ionicons
              name="checkmark-circle"
              color={theme.colors.primary}
              size={22}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => changeTheme("dark")}
        >
          <Text style={{ color: theme.colors.text }}>🌙 Dark</Text>

          {themeMode === "dark" && (
            <Ionicons
              name="checkmark-circle"
              color={theme.colors.primary}
              size={22}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Notifications */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
          },
        ]}
      >
        <Text style={[styles.heading, { color: theme.colors.text }]}>
          Notifications
        </Text>

        <View style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Breaking News</Text>

          <Switch value />
        </View>

        <View style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Trending News</Text>

          <Switch value />
        </View>
      </View>

      {/* About */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
          },
        ]}
      >
        <TouchableOpacity style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Privacy Policy</Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Terms & Conditions</Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Contact Us</Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Rate App</Text>

          <Ionicons name="star" size={20} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          textAlign: "center",
          marginVertical: 30,
          color: theme.colors.subText,
        }}
      >
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
});
