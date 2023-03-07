/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {   boxShadow: {
      '2lg': '0 0 25px 5px rgba(0,0,0, .07)',
    }},
  },
  plugins: [],
}
