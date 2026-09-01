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

  const news = breakingNews || [];

  // Create two identical sets.
  // When the first set disappears, the second set is already there.
  const tickerNews = [...news, ...news];

  useEffect(() => {
    if (!news.length || contentWidth <= 0) {
      return;
    }

    translateX.stopAnimation();

    // Start from beginning
    translateX.setValue(0);

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -contentWidth,
        duration: Math.max(contentWidth * 35, 20000),
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
  }, [news.length, contentWidth]);

  if (!news.length) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.dark ? "#111" : "#fff",
        },
      ]}
    >
      {/* BREAKING LABEL */}
      <View style={styles.leftBox}>
        <Ionicons name="flash" color="#fff" size={17} />

        <Text style={styles.breakingText}>BREAKING</Text>
      </View>

      {/* TICKER AREA */}
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
          {/* FIRST SET - USED TO MEASURE WIDTH */}
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
                index={index}
                navigation={navigation}
                textColor={theme.colors.text}
              />
            ))}
          </View>

          {/* SECOND SET - MAKES THE LOOP CONTINUOUS */}
          <View style={styles.newsSet}>
            {news.map((item, index) => (
              <NewsItem
                key={`second-${item._id || item.slug || index}`}
                item={item}
                index={index}
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

/**
 * Individual breaking-news item
 */
function NewsItem({ item, navigation, textColor }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (!item?.slug) {
          return;
        }

        navigation.navigate("NewsDetails", {
          slug: item.slug,
        });
      }}
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
    height: 46,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },

  leftBox: {
    width: 120,
    height: "100%",
    backgroundColor: "#d50000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 10,
    elevation: 5,
  },

  breakingText: {
    color: "#fff",
    fontSize: 13,
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
    width: "max-content",
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
  },

  redDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#d50000",
    marginRight: 7,
  },

  newsText: {
    fontSize: 15,
    fontWeight: "600",
    includeFontPadding: false,
  },
});
