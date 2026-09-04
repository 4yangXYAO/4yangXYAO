import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "Georgia", "serif"],
        sans: [
          '"Inter Variable"',
          "system-ui",
          "-apple-system",
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans CJK SC"',
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono Variable"',
          "ui-monospace",
          '"PingFang SC"',
          '"Microsoft YaHei"',
          "monospace",
        ],
      },
      colors: {
        // warm editorial dark
        ink: {
          DEFAULT: "#0b0a09", // page background
          soft: "#121010", // raised surface
          card: "#181513", // cards
          line: "#2a2622", // hairlines
        },
        paper: {
          DEFAULT: "#ede9e3", // primary text
          dim: "#a39e94", // secondary text
          faint: "#6b665e", // tertiary / labels
        },
        amber: {
          DEFAULT: "#e9a23b", // single accent
          soft: "rgba(233, 162, 59, 0.12)",
          deep: "#c47f1d",
        },
      },
      fontSize: {
        // fluid display scale
        "display-xl": ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        lead: ["clamp(1.125rem, 2vw, 1.375rem)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
