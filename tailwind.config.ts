import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
} satisfies Config;
