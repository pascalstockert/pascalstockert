const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway', defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      white: '#FFFBEF',
      black: '#453B3A',
      yolol: '#B14E7F',
      brock: '#CD3723',
      mead: '#C69F3D',
      malfi: '#77DD77',
    }
  },
  plugins: [],
}

