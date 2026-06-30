import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Index from "./app/index.js";
import ThemeProvider from "./app/src/theme/ThemeProvider.js";
import useTheme from "./app/src/theme/useTheme.js";

function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme.dark ? "light" : "dark"} />

      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
