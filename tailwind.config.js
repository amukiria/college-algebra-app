/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}', // Include app router files
    './src/components/**/*.{js,jsx}', // Include components
    './src/pages/**/*.{js,jsx}', // Include pages (if any)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d3748', // Dark gray for backgrounds
        secondary: '#4a5568', // Slightly lighter gray
        accent: '#3182ce', // Saturated blue for buttons and highlights
        text: '#edf2f7', // Off-white for text
      },
    },
  },
  plugins: [],
};
