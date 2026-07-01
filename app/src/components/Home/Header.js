import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import useTheme from "../../theme/useTheme";

export default function Header({ navigation, userName = "Reader" }) {
  const { theme } = useTheme();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.leftSection}>
        {/* <Text
          style={[
            styles.greeting,
            {
              color: theme.colors.subText,
            },
          ]}
        >
          {greeting} 👋
        </Text> */}

        <Image
          source={require("../../../../assets/images/TH_Logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: theme.dark ? "#1E1E1E" : "#F3F3F3",
            },
          ]}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color={theme.colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: theme.dark ? "#1E1E1E" : "#F3F3F3",
            },
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    paddingHorizontal: 16,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: -25,
  },

  leftSection: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,

    marginBottom: 5,

    fontWeight: "500",
  },

  logo: {
    width: 200,

    height: 150,

    resizeMode: "contain",
  },

  rightSection: {
    flexDirection: "row",
  },

  iconButton: {
    width: 44,

    height: 44,

    borderRadius: 22,

    justifyContent: "center",

    alignItems: "center",

    marginLeft: 10,
  },
});
