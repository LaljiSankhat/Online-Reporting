/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "blue" : "#3575E2"
      },
      boxShadow: {
        'b': '-5px 10px 50px -30px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

