import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="giedi"]'],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)",
        spice: "rgb(var(--spice) / <alpha-value>)",
        mark: "rgb(var(--mark) / <alpha-value>)",
        wordmark: "rgb(var(--wordmark) / <alpha-value>)",
        line: "rgb(var(--line) / var(--line-alpha))",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
      },
      maxWidth: {
        container: "1440px",
      },
      spacing: {
        section: "clamp(96px, 12vw, 192px)",
        gutter: "clamp(20px, 4vw, 64px)",
      },
    },
  },
  plugins: [],
};

export default config;
