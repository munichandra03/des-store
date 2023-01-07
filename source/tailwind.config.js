/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // des storefront theme
        cartred: "#D31313",
        cart_desc: "#242424",
        cart_bg: "#F0EFF2",
        cart_hr: "#D8D6DC",
        lightblack: "#242424",
        bluenavy: "#37446A",
        mydesbtn: "#4F2F0A",
        "secondary-bg": "#f0810f",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        primary: "#6200EE",
        secondary: "#03DAC6",
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        "green-light": "#38A169",
        "green-300": "#48BB78",
        yellow: "#ffc82c",
        "yellow-900": "#744210",
        "yellow-800": "#795B12",
        "yellow-600": "#D69E2E",
        "gray-300": "#EDF2F7",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        "yellow-1000": "#f59b42",
        brown: "#4F2F0A",
        // stone: colors.warmGray,
        // sky: colors.lightBlue,
        // neutral: colors.trueGray,
        // gray: colors.coolGray,
        // slate: colors.blueGray,
      },
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", "serif"],
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      spacing: {
        "cta-slogan": "460px",
      },
    },
  },
  plugins: [],
};
