"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/_states/ThemeProvider";

export default function ThemeToggler() {
  const { isDarkTheme, switchTheme } = useTheme();

  return (
    <button onClick={switchTheme}>
      {isDarkTheme ? <Sun strokeWidth={3} /> : <Moon strokeWidth={3} />}
    </button>
  );
}
