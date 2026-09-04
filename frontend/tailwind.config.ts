import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "Georgia", "serif"],
        serif: ['"Instrument Serif"', "Georgia", '"Times New Roman"', "serif"],
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
        // "field manual" — layered warm dark, blueprint hairlines
        ink: {
          DEFAULT: "#0b0a09", // page base
          raised: "#12100e", // ambient layer
          card: "#171412", // surfaces
          deep: "#0e0c0b", // wells / console
          line: "#282320", // hairlines
          bright: "#3b352f", // hover hairlines
        },
        paper: {
          DEFAULT: "#ede9e3", // primary text
          dim: "#a8a297", // secondary text
          faint: "#6f6a61", // tertiary / labels
        },
        amber: {
          DEFAULT: "#e9a23b", // single accent
          soft: "rgba(233, 162, 59, 0.12)",
          deep: "#c47f1d",
          glow: "rgba(233, 162, 59, 0.22)",
        },
        signal: "#8fc7a4", // live/online status only
        // inverted "paper" sections
        cream: {
          DEFAULT: "#e8e2d6",
          deep: "#ddd5c5",
          ink: "#171412",
          dim: "#57524a",
          line: "#c9c0ad",
        },
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 10.5vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em", fontFamily: '"Bricolage Grotesque Variable", Georgia, serif' }],
        "display-xl": ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontFamily: '"Bricolage Grotesque Variable", Georgia, serif' }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.025em", fontFamily: '"Bricolage Grotesque Variable", Georgia, serif' }],
        "display-md": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontFamily: '"Bricolage Grotesque Variable", Georgia, serif' }],
        metric: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontFamily: '"Bricolage Grotesque Variable", Georgia, serif' }],
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
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(143,199,164,0.5)" },
          "100%": { boxShadow: "0 0 0 8px rgba(143,199,164,0)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
        sweep: "sweep 0.9s cubic-bezier(0.22,1,0.36,1)",
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
