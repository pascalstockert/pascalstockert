const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', defaultTheme.fontFamily.sans],
        'serif': ['"Times New Roman"', defaultTheme.fontFamily.serif],
      },
      screens: {
        'hr': '512px',
      },
      spacing: {
        '128': '32rem',
        '256': '64rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
