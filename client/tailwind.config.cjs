/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#108cc2',
        secendary: '#60c1eb',
        darkBg: '#131313',
      },
    },
  },
  plugins: [],
}
