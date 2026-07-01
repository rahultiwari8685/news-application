import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useTheme from "../theme/useTheme";

import BookmarksScreen from "../screens/BookmarksScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ShortsScreen from "../screens/ShortsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: theme.colors.tabActive,
        tabBarInactiveTintColor: theme.colors.tabInactive,

        tabBarStyle: {
          backgroundColor: theme.colors.tabBackground,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 5,
        },

        sceneStyle: {
          backgroundColor: theme.colors.background,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;

            case "Categories":
              iconName = focused ? "list" : "list-outline";
              break;

            case "Bookmarks":
              iconName = focused ? "bookmark" : "bookmark-outline";
              break;

            case "Setting":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen
        name="Video"
        component={ShortsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />

      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
