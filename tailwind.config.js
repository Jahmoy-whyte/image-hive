/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DD133C",
        secondary: "#423527",
        blackOpacity: "rgba(0, 0, 0, 0.47)",
      },
      fontFamily: {
        interBold: "Inter-Bold",
        interMedium: "Inter-Medium",
        interRegular: "Inter-Regular",
      },
    },
  },
  plugins: [],
};
