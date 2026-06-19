/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5D9E32",
        secondary: "#3233A9",
        orange: "#C48012",
        "orange-light": "rgba(196, 128, 18, 0.26)",
      },
    },
  },
  plugins: [],
};
