
// import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";

// import Index from "./app/index.js";
// import { navigationRef } from "./app/src/navigation/navigationRef";
// import ThemeProvider from "./app/src/theme/ThemeProvider.js";
// import useTheme from "./app/src/theme/useTheme.js";

// function AppContent() {
//   const { theme } = useTheme();

//   return (
//     <>
//       <StatusBar style={theme.dark ? "light" : "dark"} />

//       <NavigationContainer ref={navigationRef}>
//         <Index />
//       </NavigationContainer>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }




import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Index from "./app/index";
import ThemeProvider from "./app/src/theme/ThemeProvider";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
