/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        transition: {
          '0%':{
            opacity:1
          },
          '100%': {
            opacity:0
          }
        }
      },
      animation: {
        transition: 'transition .5s ease-in-out',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
