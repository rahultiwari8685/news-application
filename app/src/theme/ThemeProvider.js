import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { DarkTheme, LightTheme } from "./colors";
import ThemeContext from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const systemTheme = useColorScheme();

  const [themeMode, setThemeMode] = useState("system");

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem("theme");

    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }

  async function changeTheme(mode) {
    setThemeMode(mode);
    await AsyncStorage.setItem("theme", mode);
  }

  const theme = useMemo(() => {
    if (themeMode === "light") return LightTheme;

    if (themeMode === "dark") return DarkTheme;

    return systemTheme === "dark" ? DarkTheme : LightTheme;
  }, [themeMode, systemTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
