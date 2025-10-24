import { createNativeStackNavigator } from "@react-navigation/native-stack";


import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function DrawerNavigator() {
//     return (
//         <Drawer.Navigator
//             initialRouteName="Dashboard"
//             drawerContent={(props) => <CustomDrawerContent {...props} />}
//             screenOptions={{ headerShown: true }}
//         >
//             <Drawer.Screen name="Dashboard" component={HomeScreen} />
//             <Drawer.Screen name="Categories" component={CategoriesScreen} />
//             <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
//             <Drawer.Screen name="Profile" component={ProfileScreen} />
//         </Drawer.Navigator>
//     );
// }

export default function Index() {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainDrawer" component={BottomTabNavigator} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        </Stack.Navigator>
    );
}
