import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawerContent({ navigation }) {
    return (
        <DrawerContentScrollView style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Rahul Tiwari</Text>
                <Text style={styles.profileEmail}>rtiwari69572@gmail.com</Text>
            </View>

            <View style={styles.menuSection}>
                <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                    <Text style={styles.menuItem}>🏠 Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
                    <Text style={styles.menuItem}>🗞️ Categories</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Bookmarks")}>
                    <Text style={styles.menuItem}>🔖 Bookmarks</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Text style={styles.menuItem}>👤 Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={[styles.menuItem, { color: "red" }]}>🚪 Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    profileSection: {
        alignItems: "center",
        paddingVertical: 40,
        backgroundColor: "#4a00e0",
    },
    profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
    profileName: { fontSize: 18, color: "#fff", fontWeight: "bold" },
    profileEmail: { fontSize: 14, color: "#e0e0e0" },
    menuSection: { padding: 20 },
    menuItem: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
    },
});
