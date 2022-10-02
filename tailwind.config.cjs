/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        title1: '#413F42',
        title2: '#7F8487',
        primary: '#363062',
        secondary: '#4D4C7D',
        space: '#827397',
        vintage: '#E9D5DA',
      },
    },
  },
  plugins: [],
};
