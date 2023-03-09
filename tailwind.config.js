/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {  
      screens: {
        'xxsm': '360px',
        'xsm': '414px',
      },
      boxShadow: {
      '2lg': '0 0 25px 5px rgba(0,0,0, .07)',
    }},
  },
  plugins: [],
}
