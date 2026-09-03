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

  const translateX = useRef(new Animated.Value(0)).current;

  const [contentWidth, setContentWidth] = useState(0);

  const news = Array.isArray(breakingNews)
    ? breakingNews.filter((item) => item?.title)
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
      {
        resetBeforeIteration: true,
      },
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
                key={`news-first-${item._id || item.slug || index}`}
                item={item}
                navigation={navigation}
                textColor={theme.colors.text}
              />
            ))}
          </View>

          <View style={styles.newsSet}>
            {news.map((item, index) => (
              <NewsItem
                key={`news-second-${item._id || item.slug || index}`}
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
    if (!item?.slug) {
      console.log("Breaking news slug missing:", item);

      return;
    }

    console.log("Opening NewsDetail:", item.slug);

    navigation.navigate("NewsDetail", {
      slug: item.slug,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.newsItem}
    >
      <View style={styles.newsRow}>
        {/* RED DOT */}

        <View style={styles.redDot} />

        {/* NEWS TITLE */}

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
    width: 80,
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

    fontSize: 16,
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
    fontSize: 15,
    fontWeight: "600",

    includeFontPadding: false,
  },
});
