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
        'topbar-height': 'var(--topbar-height)',
        'primary-color': 'var(--primary-color)',        
        'bg-light': 'var(--background-color-light)',
        'bg-dark': 'var(--background-color-dark)',
        'bg-alert': 'var(--background-color-error-light)',
        'bg-alert-dark': 'var(--background-color-error-light)',
        
        'text-color-gray': 'var(--text-color-gray)',         
        'txt-alert': 'var(--text-color-alert)',
        'txt-alert-dark': 'var(--text-color-alert-dark)', 

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

