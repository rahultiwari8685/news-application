import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import ShortCard from "../components/Shorts/ShortCard";
import { getShorts } from "../services/shortsApi";
export default function ShortsScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocused = useIsFocused();
  const pagerRef = useRef(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await getShorts();
      setVideos(data);
    } catch (error) {
      console.log("Shorts Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextVideo = () => {
    const next = currentIndex + 1;

    if (next < videos.length) {
      pagerRef.current?.setPage(next);
      setCurrentIndex(next);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  return (
    <PagerView
      ref={pagerRef}
      style={styles.container}
      orientation="vertical"
      initialPage={0}
      offscreenPageLimit={2}
      onPageSelected={(e) => {
        setCurrentIndex(e.nativeEvent.position);
      }}
    >
      {videos.map((item, index) => (
        <View key={item._id}>
          <ShortCard
            item={item}
            navigation={navigation}
            isActive={currentIndex === index && isFocused}
            onVideoEnd={nextVideo}
          />
        </View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
