import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

import { navigationRef } from "../navigation/navigationRef";

export async function initializeNotifications() {
  // Create Channel
  await notifee.createChannel({
    id: "breaking-news",
    name: "Breaking News",
    importance: AndroidImportance.HIGH,
  });

  /**
   * Foreground Notification
   */
  messaging().onMessage(async (remoteMessage) => {
    console.log("Foreground Notification");
    console.log(remoteMessage);

    await notifee.displayNotification({
      data: remoteMessage.data,
      title: remoteMessage.notification?.title || remoteMessage.data.title,

      body: remoteMessage.notification?.body || remoteMessage.data.body,

      android: {
        channelId: "breaking-news",

        pressAction: {
          id: "default",
        },

        smallIcon: "ic_launcher",

        style: remoteMessage.data?.image
          ? {
              type: AndroidStyle.BIGPICTURE,
              picture: remoteMessage.data.image,
            }
          : undefined,
      },
    });
  });

  /**
   * Background Click
   */
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage?.data?.slug) {
      navigationRef.navigate("NewsDetail", {
        slug: remoteMessage.data.slug,
      });
    }
  });

  /**
   * App Killed
   */
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage?.data?.slug) {
        navigationRef.navigate("NewsDetail", {
          slug: remoteMessage.data.slug,
        });
      }
    });

  /**
   * Notifee Click
   */
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      const slug = detail.notification?.data?.slug;

      if (slug) {
        navigationRef.navigate("NewsDetail", {
          slug,
        });
      }
    }
  });
}
