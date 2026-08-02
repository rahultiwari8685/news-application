import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import axios from "axios";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import Index from "./app/index.js";
import ThemeProvider from "./app/src/theme/ThemeProvider.js";
import useTheme from "./app/src/theme/useTheme.js";

import { navigationRef } from "./app/src/navigation/navigationRef";
import { registerForPushNotifications } from "./app/src/services/notificationService";

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
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    initPush();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Foreground Notification");
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Click");

        const slug = response.notification.request.content.data.slug;

        if (slug) {
          navigationRef.navigate("NewsDetail", {
            slug,
          });
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const initPush = async () => {
    const token = await registerForPushNotifications();

    console.log("Expo Token:", token);

    if (!token) return;

    try {
      await axios.post(
        "https://api.hindustantvlive.com/api/notification/save-token",
        {
          token,
          platform: Platform.OS,
        },
      );

      console.log("Token Saved");
    } catch (e) {
      console.log(e.response?.data || e.message);
    }
  };

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
