import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import useTheme from "../../theme/useTheme";

const { width, height } = Dimensions.get("window");

export default function ShortCard({ item, isActive, onVideoEnd, navigation }) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);

  const videoUrl = `https://api.topheadlinesnews.com/uploads/videos/${item.video}`;

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;

    player.play();
  });

  useEffect(() => {
    if (!player) return;

    setPaused(false);

    if (isActive) {
      player.currentTime = player.currentTime;
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  useEffect(() => {
    if (!player) return;

    const subscription = player.addListener("playToEnd", () => {
      setPaused(false);
      onVideoEnd();
    });

    return () => subscription.remove();
  }, [player]);

  useEffect(() => {
    if (!player) return;

    const ready = player.addListener("playingChange", ({ isPlaying }) => {
      if (isPlaying) {
        setLoading(false);
      }
    });

    return () => ready.remove();
  }, [player]);


  useEffect(() => {
    if (!player) return;

    let animationFrame;

    const updateProgress = () => {
      setProgress(player.currentTime || 0);
      setDuration(player.duration || 1);

      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [player]);

  const shareNews = async () => {
    try {
      await Share.share({
        message: `${item.title}\n\nhttps://hindustantvlive.com/news/${item.slug}`,
      });
    } catch (e) {
      console.log(e);
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
      {/* Loader */}

      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}


      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => {
          if (!player) return;

          if (paused) {
            setPaused(false);

            setTimeout(() => {
              player.play();
            }, 50);
          } else {
            player.pause();
            setPaused(true);
          }
        }}
      >
        <VideoView
          player={player}
          style={styles.video}
          nativeControls={false}
          contentFit="cover"
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
      </Pressable>

      {/* Play Icon */}

      {paused && (
        <View style={styles.pauseIcon}>
          <Ionicons name="play" size={80} color="#fff" />
        </View>
      )}

      {/* Progress */}

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progress,
            {
              width: `${Math.min((progress / duration) * 100, 100)}%`,
            },
          ]}
        />
      </View>

      {/* Overlay */}

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,.2)", "rgba(0,0,0,.9)"]}
        style={styles.overlay}
      >
        <View style={styles.category}>
          <Text style={styles.categoryText}>
            {item.categories?.[0]?.name || "News"}
          </Text>
        </View>

        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>

        {/* <Text numberOfLines={3} style={styles.subtitle}>
          {item.subtitle}
        </Text> */}

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString("en-IN")}
            </Text>

            <Text style={styles.author}>{item.author?.name}</Text>
          </View>

          <View style={styles.icons}>
            <TouchableOpacity onPress={shareNews}>
              <Ionicons name="share-social-outline" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 25 }}>
              <Ionicons name="bookmark-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },

  video: {
    position: "absolute",
    width: width,
    height: height,
  },

  pauseIcon: {
    position: "absolute",
    top: "45%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    paddingBottom: 50,
  },

  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    zIndex: 999,
  },

  progress: {
    height: 4,
    backgroundColor: "#ff0000",
  },

  category: {
    backgroundColor: "#E53935",
    alignSelf: "flex-start",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 15,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "700",
  },

  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 34,
  },

  subtitle: {
    color: "#ddd",
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignItems: "center",
  },

  date: {
    color: "#fff",
    fontWeight: "600",
  },

  author: {
    color: "#ddd",
    marginTop: 5,
  },

  icons: {
    alignItems: "center",
  },

  button: {
    marginTop: 25,
    backgroundColor: "#E53935",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 14,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
