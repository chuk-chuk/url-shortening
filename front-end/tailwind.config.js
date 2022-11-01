const colors = require('tailwindcss/colors')

module.exports = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Gilroy", "sans-serif"],
      body: ["Graphik", "sans-serif"],
    },
    extend: {
      colors: {
        amber: colors.amber,
        emerald: colors.emerald,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
 }