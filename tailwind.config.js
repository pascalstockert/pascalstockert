/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html"],
  theme: {
    extend: {
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
