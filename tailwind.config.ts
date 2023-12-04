/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        titillium: ["var(--font-titillium)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FF9001",
          // DEFAULT: "#ffcd11",
          100: "#ffe1b9",
          200: "#ffcc8b",
          300: "#ffb85d",
          400: "#ffa42e",
          500: "#ff9000",
          600: "#ef8700",
          700: "#a25b00",
          800: "#744100",
          900: "#462700",
        },
        custom: {
          white: "#f5f5f5",
          black: "#232323",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
