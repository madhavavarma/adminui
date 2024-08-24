/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'HankenG': ['"Hanken Grotesk"', 'Play'],
        'Play': ['Play', '"Hanken Grotesk"'],
      },
      colors: {
        'blue': "#f9f7f7",
        'txt-color-1': "#707793",
        'bg-alert': "#ffe2d5",
        'txt-alert': "#662b13",
      }
    },
  },
  plugins: [],
}