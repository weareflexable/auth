/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#252431",
        white: "#f7f7f7",
      },
      fontFamily: {
        heading: ["Cairo", "sans-serif"],
      },
      boxShadow: {
        btnShadow: "2px 2px 9px #6B5D5D",
      },
    },
  },
  plugins: [],
};
