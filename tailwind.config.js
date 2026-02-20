/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6B21A8",   // Deep Purple
          blue: "#2563EB",     // Electric Blue
          pink: "#EC4899",     // Magenta
        }
      }
    },
  },
  plugins: [],
}
