/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#FF6B35',
          600: '#E85A2D',
        },
        cream: '#F9F7F3',
      },
      fontFamily: {
        mono: ['"Courier Prime"', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}