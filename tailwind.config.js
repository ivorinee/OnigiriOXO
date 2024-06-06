/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        shrikhand: ["Shrikhand", "sans-serif"],
        lora: ["Lora", "sans"],
        bungee: ["Bungee", "sans-serif"]
      }
    },
  },
  plugins: [],
};
