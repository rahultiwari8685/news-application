import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { getLiveStatus } from "../api/newsApi";

export default function useLiveStatus() {
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLiveStatus = async () => {
    try {
      const res = await getLiveStatus();

      if (res?.status) {
        setIsLive(res.isLive);
        setVideoId(res.videoId || "");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveStatus();

    const interval = setInterval(fetchLiveStatus, 30000);

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        fetchLiveStatus();
      }
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  return {
    isLive,
    videoId,
    loading,
  };
}
