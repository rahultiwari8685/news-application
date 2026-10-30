// import { useEffect, useState } from "react";
// import { AppState } from "react-native";
// import { getLiveStatus } from "../api/newsApi";

// export default function useLiveStatus() {
//   const [isLive, setIsLive] = useState(false);
//   const [videoId, setVideoId] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchLiveStatus = async () => {
//     try {
//       const res = await getLiveStatus();

//       if (res?.status) {
//         setIsLive(res.isLive);
//         setVideoId(res.videoId || "");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiveStatus();

//     const interval = setInterval(fetchLiveStatus, 30000);

//     const subscription = AppState.addEventListener("change", (state) => {
//       if (state === "active") {
//         fetchLiveStatus();
//       }
//     });

//     return () => {
//       clearInterval(interval);
//       subscription.remove();
//     };
//   }, []);

//   return {
//     isLive,
//     videoId,
//     loading,
//   };
// }

```javascript
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";
import { getLiveStatus } from "../api/newsApi";

export default function useLiveStatus() {
  const [isLive, setIsLive] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLiveStatus = useCallback(async () => {
    try {
      const res = await getLiveStatus();

      if (!res?.status) {
        setIsLive(false);
        setVideoId("");
        return;
      }

      const live = res.isLive === true;
      const id = typeof res.videoId === "string" ? res.videoId : "";

      setIsLive(live && Boolean(id));
      setVideoId(live ? id : "");
    } catch (error) {
      console.error("Failed to fetch YouTube live status:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [fetchLiveStatus]);

  return { isLive, videoId, loading };
}
```;
