/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // Enable dark mode based on system preferences
  theme: {
    extend: {
      colors: {
        primary: '#FF6A00',
        dark: '#1A1A1A',
        metallic: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};