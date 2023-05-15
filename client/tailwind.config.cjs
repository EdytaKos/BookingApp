/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#0067B1', //button primary color
        headerBg: '#131313', //header background color
        textprim: '#D7D7D7', //text and border primary color
        textsec: '#A7A7A7', //text and border secendary color
        inputBg: '#161A1D', //input background color
      },
    },
  },
  plugins: [],
}
