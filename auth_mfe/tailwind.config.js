/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  important: ".auth-app", // ✅ THIS IS THE MAGIC

  theme: {
    extend: {},
  },

  plugins: [],
};
