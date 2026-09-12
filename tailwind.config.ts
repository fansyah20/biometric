import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a1120",
          900: "#0f172a",
          800: "#16213a",
          700: "#1e2c4a",
          600: "#2a3a5c",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        gold: {
          300: "#fbd889",
          400: "#f2c14e",
          500: "#d9a520",
        },
        // New: light-theme brand palette (PalmID-style blue) for the
        // dashboard shell + Profil page.
        brand: {
          50: "#eef4ff",
          100: "#dbe7fe",
          200: "#b8d0fd",
          500: "#3568e0",
          700: "#1d3f8f",
          800: "#17326f",
        },
        surface: {
          DEFAULT: "#f4f6fb",
          card: "#ffffff",
          border: "#e2e8f0",
          muted: "#eef1f6",
        },
        ink: {
          DEFAULT: "#0f1b2d",
          muted: "#5b6b82",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        kiosk: "1.25rem",
      },
      boxShadow: {
        panel: "0 20px 60px -20px rgba(0,0,0,0.55)",
        glow: "0 0 0 1px rgba(52,211,153,0.25), 0 0 24px rgba(52,211,153,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;