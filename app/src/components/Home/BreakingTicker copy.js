import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useBreakingNews from "../../hooks/useBreakingNews";
import useTheme from "../../theme/useTheme";

const { width } = Dimensions.get("window");

export default function BreakingTicker({ navigation }) {
  const { theme } = useTheme();
  const breakingNews = useBreakingNews();

  const translateX = useRef(new Animated.Value(width)).current;

  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (!breakingNews.length || textWidth === 0) return;

    translateX.stopAnimation();

    translateX.setValue(width);

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: 45000,
        useNativeDriver: true,
      }),
    ).start();
  }, [breakingNews, textWidth]);

  if (!breakingNews.length) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.dark ? "#111" : "#fff",
        },
      ]}
    >
      {/* Left Breaking Label */}

      <View style={styles.leftBox}>
        <Ionicons name="flash" color="#fff" size={16} />

        <Text style={styles.breakingText}>BREAKING</Text>
      </View>

      {/* Marquee */}

      <View style={styles.rightBox}>
        <Animated.View
          style={[
            styles.marqueeContent,
            {
              transform: [{ translateX }],
            },
          ]}
          onLayout={(e) => {
            setTextWidth(e.nativeEvent.layout.width);
          }}
        >
          {breakingNews.concat(breakingNews).map((item, index) => (
            <TouchableOpacity
              key={`${item._id}-${index}`}
              onPress={() =>
                navigation.navigate("NewsDetails", {
                  slug: item.slug,
                })
              }
            >
              <Text
                style={[
                  styles.newsText,
                  {
                    color: theme.colors.text,
                  },
                ]}
              >
                🔴 {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },

  leftBox: {
    width: 120,
    backgroundColor: "#d50000",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  marqueeContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  newsText: {
    fontSize: 15,
    fontWeight: "600",
    marginRight: 60,
  },

  breakingText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 13,
  },

  rightBox: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  newsText: {
    fontSize: 22,
    fontWeight: "600",
  },
});
