import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import useTheme from "../../theme/useTheme";

const { width } = Dimensions.get("window");

export default function HeroSlider({ news, navigation }) {
  const { theme } = useTheme();

  const progress = useSharedValue(0);

  const [activeIndex, setActiveIndex] = useState(0);

  if (!news.length) return null;

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={260}
        autoPlay
        autoPlayInterval={4000}
        pagingEnabled
        data={news}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("NewsDetail", {
                slug: item.slug,
              })
            }
          >
            <Image
              source={{
                uri:
                  "https://api.bharattvmedia.com/uploads/images/" +
                  item.thumbnail,
              }}
              style={styles.image}
            />

            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.95)"]}
              style={styles.overlay}
            >
              {/* <View style={styles.topRow}>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveText}>LIVE</Text>
                </View>

                <View style={styles.iconRow}>
                  <TouchableOpacity>
                    <Ionicons name="bookmark-outline" color="#fff" size={22} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginLeft: 15 }}>
                    <Ionicons
                      name="share-social-outline"
                      color="#fff"
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
              </View> */}

              <View style={styles.category}>
                <Text style={styles.categoryText}>
                  {item.categories?.[0]?.name || "News"}
                </Text>
              </View>

              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>

              {/* <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString("en-IN")}
              </Text> */}

              <View style={styles.bottomRow}>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString("en-IN")}
                </Text>

                <View style={styles.iconRow}>
                  <TouchableOpacity>
                    <Ionicons name="bookmark-outline" color="#fff" size={22} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginLeft: 18 }}>
                    <Ionicons
                      name="share-social-outline"
                      color="#fff"
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        )}
      />

      {/* Pagination */}

      <View style={styles.pagination}>
        {news.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: activeIndex === index ? 22 : 8,

                backgroundColor:
                  activeIndex === index ? theme.colors.primary : "#C4C4C4",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  date: {
    color: "#ddd",
    fontSize: 12,
  },

  image: {
    width: "100%",
    height: 260,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  liveBadge: {
    backgroundColor: "#E53935",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  liveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },

  iconRow: {
    flexDirection: "row",
  },

  category: {
    backgroundColor: "#4A00E0",
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 30,
  },

  date: {
    color: "#ddd",
    marginTop: 8,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  dot: {
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});
