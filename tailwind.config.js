/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "row-start-1",
    "row-start-2",
    "row-start-3",
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
  ],
  theme: {
    extend: {
      fontFamily: {
        shrikhand: ["Shrikhand", "sans-serif"],
        lora: ["Lora", "sans"],
        bungee: ["Bungee", "sans-serif"],
      },
    },
  },
  plugins: [],
};
