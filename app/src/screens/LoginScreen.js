import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Temporary navigation to main drawer
        navigation.replace("MainDrawer");
    };

    return (
        <LinearGradient
            colors={["#4a00e0", "#8e2de2"]}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.innerContainer}
            >
                {/* Logo */}
                <Image
                    source={{ uri: "https://i.ibb.co/2W2F2vK/mediavarta-logo.png" }}
                    style={styles.logo}
                />

                {/* App Name */}
                <Text style={styles.title}>MediaVarta</Text>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                {/* Social Login */}
                <Text style={styles.socialText}>Or login with</Text>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={[styles.socialBtn, { backgroundColor: "#DB4437" }]}>
                        <Ionicons name="logo-google" size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.socialBtnText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialBtn, { backgroundColor: "#3b5998" }]}>
                        <Ionicons name="logo-facebook" size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.socialBtnText}>Facebook</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logo: { width: 100, height: 100, marginBottom: 16, resizeMode: "contain" },
    title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 30 },
    inputContainer: { width: "100%" },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 30,
        marginBottom: 15,
        paddingHorizontal: 16,
        height: 50,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 16, color: "#333" },
    forgotBtn: { alignSelf: "flex-end", marginBottom: 20 },
    forgotText: { color: "#fff", fontSize: 13 },
    loginBtn: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    loginText: { color: "#4a00e0", fontSize: 16, fontWeight: "bold" },
    socialText: { color: "#fff", marginBottom: 12 },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    socialBtn: {
        flex: 0.48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 30,
    },
    socialBtnText: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
