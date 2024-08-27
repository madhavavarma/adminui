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
        'primary-color': 'var(--primary-color)',
        'bg-light': "#f9f7f7",
        'bg-dark': "#22282e",
        'txt-color-1': "#707793",
        'bg-alert': "#ffe2d5",
        'bg-alert-dark': "rgba(255, 108, 47, 0.15)",
        'txt-alert': "#662b13",
        'txt-alert-dark': "#ffa782",

        'topbar-height': 'var(--topbar-height)',

        'main-nav-width': 'var(--main-nav-width)',
        'main-nav-width-sm': 'var(--main-nav-width-sm)',
        'main-nav-bg': 'var(--main-nav-bg)',
        'main-nav-item-color': 'var(--main-nav-item-color)',
        'main-nav-item-hover-color': 'var(--main-nav-item-hover-color)'
      }
    },
  },
  plugins: [],
  darkMode: "selector"
}

