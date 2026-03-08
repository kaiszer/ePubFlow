/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#23c483', // Brand green from old UI
          foreground: '#ffffff',
          hover: '#2ee59d',
        },
        background: '#ffffff',
        muted: {
          DEFAULT: '#f0f0f0',
          foreground: '#6c757d',
        }
      }
    },
  },
  plugins: [],
}
