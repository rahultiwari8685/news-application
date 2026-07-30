import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useLiveStatus from "../../hooks/useLiveStatus";
import useTheme from "../../theme/useTheme";

export default function Header({ navigation }) {
  const { theme } = useTheme();

  const { isLive, videoId } = useLiveStatus();

  // LIVE Dot Animation
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [isLive]);

  const openYoutube = async () => {
    if (!videoId) return;

    const appUrl = `vnd.youtube://${videoId}`;
    const webUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const supported = await Linking.canOpenURL(appUrl);

    if (supported) {
      Linking.openURL(appUrl);
    } else {
      Linking.openURL(webUrl);
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
      <View style={styles.leftSection}>
        <Image
          source={require("../../../../assets/images/TH_Logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.rightSection}>
        {isLive ? (
          <TouchableOpacity style={styles.liveButton} onPress={openYoutube}>
            <Animated.View
              style={[
                styles.liveDot,
                {
                  opacity,
                },
              ]}
            />

            <Text style={styles.liveText}>LIVE</Text>
          </TouchableOpacity>
        ) : (
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
        )}

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

  logo: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  liveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 22,
    marginLeft: 10,
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 6,
  },

  liveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
