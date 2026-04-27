import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "calc(1rem - 4px)",
        md: "calc(1rem - 2px)",
        lg: "1rem",
        xl: "calc(1rem + 4px)",
        "2xl": "calc(1rem + 8px)",
        "3xl": "calc(1rem + 12px)",
        "4xl": "calc(1rem + 16px)",
      },
      colors: {
        background: "oklch(0.965 0.025 85)",
        foreground: "oklch(0.24 0.09 285)",
        card: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.24 0.09 285)",
        },
        primary: {
          DEFAULT: "oklch(0.52 0.22 285)",
          foreground: "oklch(0.99 0 0)",
          deep: "oklch(0.32 0.15 285)",
        },
        secondary: {
          DEFAULT: "oklch(0.94 0.04 285)",
          foreground: "oklch(0.24 0.09 285)",
        },
        muted: {
          DEFAULT: "oklch(0.94 0.025 85)",
          foreground: "oklch(0.5 0.04 285)",
        },
        accent: {
          DEFAULT: "oklch(0.92 0.06 285)",
          foreground: "oklch(0.24 0.09 285)",
        },
        destructive: {
          DEFAULT: "oklch(0.62 0.22 25)",
          foreground: "oklch(0.99 0 0)",
        },
        success: {
          DEFAULT: "oklch(0.7 0.17 155)",
          foreground: "oklch(0.99 0 0)",
        },
        border: "oklch(0.9 0.03 85)",
        input: "oklch(0.9 0.03 85)",
        ring: "oklch(0.6 0.18 285)",
        cream: {
          DEFAULT: "oklch(0.965 0.025 85)",
          soft: "oklch(0.985 0.012 85)",
        },
        navy: "oklch(0.24 0.09 285)",
        sky: {
          DEFAULT: "oklch(0.78 0.13 240)",
          soft: "oklch(0.93 0.06 240)",
        },
        teal: {
          DEFAULT: "oklch(0.78 0.13 175)",
          soft: "oklch(0.93 0.06 175)",
        },
        lilac: {
          DEFAULT: "oklch(0.7 0.15 295)",
          soft: "oklch(0.92 0.06 295)",
        },
        pink: {
          DEFAULT: "oklch(0.78 0.14 350)",
          soft: "oklch(0.93 0.05 350)",
        },
        sun: {
          DEFAULT: "oklch(0.85 0.16 90)",
          soft: "oklch(0.94 0.08 90)",
        },
        coral: "oklch(0.72 0.17 25)",
        mint: {
          DEFAULT: "oklch(0.85 0.1 155)",
          soft: "oklch(0.94 0.05 155)",
        },
      },
      boxShadow: {
        pill: "0 4px 0 0 oklch(0 0 0 / 0.12)",
        card: "0 6px 18px -8px oklch(0 0 0 / 0.18)",
      },
      keyframes: {
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "shake-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        float: "float-soft 4s ease-in-out infinite",
        shake: "shake-horizontal 0.4s ease-in-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};
