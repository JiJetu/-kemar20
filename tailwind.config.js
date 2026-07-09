/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#39842B",
        secondary: "#0047D2",
        orange: "#C48012",
        "orange-light": "rgba(196, 128, 18, 0.26)",
      },
    },
  },
  plugins: [],
};
