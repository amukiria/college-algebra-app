/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FDF5EE", // Off-white
        lightNeutral: "#FCEFE4", // Beige
        coral: "#FF6B50", // Saturated Coral
        salmon: "#FF7A70", // Vibrant Salmon
        darkNavy: "#1F2739", // Saturated Dark Navy
        grayNeutral: "#4B5563", // Saturated Gray
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
