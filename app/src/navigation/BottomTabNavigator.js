import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BookmarksScreen from "../screens/BookmarksScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#4a00e0",
                tabBarInactiveTintColor: "#888",
                tabBarStyle: { height: 60, paddingBottom: 5 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") iconName = focused ? "home" : "home-outline";
                    else if (route.name === "Categories") iconName = focused ? "list" : "list-outline";
                    else if (route.name === "Bookmarks") iconName = focused ? "bookmark" : "bookmark-outline";
                    else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Categories" component={CategoriesScreen} />
            <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
