import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        cyber: {
          cyan: "#00daf7",
          bg: "#0d0d0d",
          panel: "#121212",
        }
      },
      borderWidth: {
        '3': '3px',
      },

    },
  },
  plugins: [],
} satisfies Config;
