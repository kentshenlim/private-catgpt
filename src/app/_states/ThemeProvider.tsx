"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const ThemeContext = createContext<{
  isDarkTheme: boolean;
  switchTheme: () => void;
}>({
  isDarkTheme: true,
  switchTheme() {
    console.log("Theme switched!");
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.getElementById("html-root");
    if (!html) return;
    if (isDark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [isDark]);

  function switchTheme() {
    setIsDark((isDark) => !isDark);
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme: isDark, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
