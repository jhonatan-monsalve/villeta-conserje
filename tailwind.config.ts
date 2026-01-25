import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F8F6F3",
          dark: "#10221a",
        },
        foreground: {
          DEFAULT: "#3A3A3A",
          dark: "#F8F6F3",
        },
        primary: {
          DEFAULT: "#2C5F4F",
          light: "#3D7A65",
          dark: "#10221a",
        },
        gold: {
          DEFAULT: "#C9A961",
          light: "#D4B97D",
        },
        surface: {
          light: "#F8F6F3",
          dark: "#10221a",
        },
        text: {
          main: "#3A3A3A",
          sub: "#4c9a79",
          light: "#F8F6F3",
        },
        border: {
          DEFAULT: "#E5E5E5",
          dark: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
