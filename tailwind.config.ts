import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F4EBDD",
        leaf: {
          DEFAULT: "#53633F",
          dark: "#3E4B2F",
          deep: "#2E3823",
        },
        saffron: {
          DEFAULT: "#C99528",
          light: "#E0B457",
        },
        cocoa: "#2B2118",
        sand: "#D8C7A5",
        chilli: "#A63827",
        cream: "#FFF9EF",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
export default config;
