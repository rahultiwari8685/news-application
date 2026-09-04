import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import BookmarksScreen from "./src/screens/BookmarksScreen";
import CategoryNewsScreen from "./src/screens/CategoryNewsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";
import SplashScreen from "./src/screens/SplashScreen";
const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainDrawer" component={BottomTabNavigator} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="CategoryNewsScreen" component={CategoryNewsScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
    </Stack.Navigator>
  );
}
