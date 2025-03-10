"use client";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggler() {
  const [isDark, setIsDark] = useState(true);

  function handleClick() {
    const html = document.getElementById("html-root");
    if (!html) return;
    html.classList.toggle("dark");
    setIsDark(!isDark);
  }

  return (
    <button onClick={handleClick}>
      {isDark ? <Sun strokeWidth={3} /> : <Moon strokeWidth={3} />}
    </button>
  );
}
