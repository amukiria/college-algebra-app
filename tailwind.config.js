/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode via the .dark class
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        background: "#F0F4F8",  // Use as the base background instead of white
        primary: "#2E5AAC",     // For headings, primary text, and key elements
        accent: "#00BFA6",      // For interactive elements like buttons, links, badges
        text: "#263238",        // Main text color
        secondary: "#B0BEC5",   // For borders, subtle accents, and secondary backgrounds

        // Dark Mode Colors (if needed)
        darkBg: "#1F2739",      // Dark mode background
        lightText: "#F0F4F8",   // Light text color for dark mode
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
