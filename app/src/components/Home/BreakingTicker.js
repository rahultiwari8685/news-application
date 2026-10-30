import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useBreakingNews from "../../hooks/useBreakingNews";
import useTheme from "../../theme/useTheme";

export default function BreakingTicker({ navigation }) {
  const { theme } = useTheme();
  const breakingNews = useBreakingNews();

  const translateX = useRef(new Animated.Value(0)).current;

  const [contentWidth, setContentWidth] = useState(0);

  const news = Array.isArray(breakingNews)
    ? breakingNews.filter((item) => item?.title && item?.slug)
    : [];

  useEffect(() => {
    if (!news.length || contentWidth <= 0) {
      return;
    }

    translateX.stopAnimation();
    translateX.setValue(0);

    const duration = Math.max(contentWidth * 30, 18000);

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -contentWidth,
        duration,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
      translateX.stopAnimation();
    };
  }, [news.length, contentWidth, translateX]);

  if (!news.length) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.dark ? "#111111" : "#FFFFFF",
        },
      ]}
    >
      <View style={styles.leftBox}>
        <Ionicons name="flash" color="#FFFFFF" size={17} />

        <Text style={styles.breakingText}>BREAKING</Text>
      </View>

      <View style={styles.rightBox}>
        <Animated.View
          style={[
            styles.track,
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        >
          <View
            style={styles.newsSet}
            onLayout={(event) => {
              const measuredWidth = event.nativeEvent.layout.width;

              if (measuredWidth > 0 && measuredWidth !== contentWidth) {
                setContentWidth(measuredWidth);
              }
            }}
          >
            {news.map((item, index) => (
              <NewsItem
                key={`first-${item._id || item.slug || index}`}
                item={item}
                navigation={navigation}
                textColor={theme.colors.text}
              />
            ))}
          </View>

          <View style={styles.newsSet}>
            {news.map((item, index) => (
              <NewsItem
                key={`second-${item._id || item.slug || index}`}
                item={item}
                navigation={navigation}
                textColor={theme.colors.text}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

function NewsItem({ item, navigation, textColor }) {
  const handlePress = () => {
    console.log("==============================");
    console.log("BREAKING NEWS CLICKED");
    console.log("TITLE:", item?.title);
    console.log("SLUG:", item?.slug);
    console.log("NAVIGATION:", !!navigation);
    console.log("==============================");

    if (!item?.slug) {
      console.log("ERROR: News slug is missing");
      return;
    }

    if (!navigation) {
      console.log("ERROR: Navigation object is missing");
      return;
    }

    try {
      navigation.navigate("NewsDetail", {
        slug: item.slug,
      });
    } catch (error) {
      console.log("NAVIGATION ERROR:", error?.message || error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      delayPressIn={0}
      style={styles.newsItem}
    >
      <View style={styles.newsRow}>
        <View style={styles.redDot} />

        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={[
            styles.newsText,
            {
              color: textColor,
            },
          ]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 46,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
  },

  leftBox: {
    width: 100,
    height: "100%",

    backgroundColor: "#D50000",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
    elevation: 5,
  },

  breakingText: {
    color: "#FFFFFF",

    fontSize: 12,
    fontWeight: "800",

    marginLeft: 5,

    letterSpacing: 0.5,
  },

  rightBox: {
    flex: 1,
    height: "100%",

    overflow: "hidden",

    justifyContent: "center",
  },

  track: {
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "flex-start",
  },

  newsSet: {
    flexDirection: "row",
    alignItems: "center",
  },

  newsItem: {
    justifyContent: "center",

    paddingHorizontal: 12,

    minHeight: 46,
  },

  newsRow: {
    flexDirection: "row",
    alignItems: "center",

    height: 46,
  },

  redDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: "#D50000",

    marginRight: 7,
  },

  newsText: {
    fontSize: 20,
    fontWeight: "600",

    includeFontPadding: false,
  },
});
