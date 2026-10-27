import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { initializeNotifications } from "./app/src/services/NotificationHandler";

import { useEffect } from "react";
import { Platform } from "react-native";
import Index from "./app/index.js";
import { navigationRef } from "./app/src/navigation/navigationRef";
import { registerFCM } from "./app/src/services/fcmService";
import ThemeProvider from "./app/src/theme/ThemeProvider.js";
import useTheme from "./app/src/theme/useTheme.js";
function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme.dark ? "light" : "dark"} />

      <NavigationContainer ref={navigationRef}>
        <Index />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      await initPush();
      await initializeNotifications();
    }

    setupNotifications();
  }, []);



  const initPush = async () => {
    console.log("STEP 1");

    const token = await registerFCM();
    alert(token ? "TOKEN GENERATED" : "TOKEN NULL");

    console.log("STEP 2");
    console.log("FCM TOKEN:", token);

    if (!token) {
      console.log("TOKEN IS NULL");
      return;
    }

    try {
      console.log("STEP 3");

      const response = await axios.post(
        "https://api.topheadlinesnews,com/api/notification/save-token",
        {
          token,
          platform: Platform.OS,
        },
      );

      console.log("STEP 4");
      console.log(response.data);
    } catch (err) {
      alert(err.message);
      console.log(err);
      return null;
    }
  };
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
