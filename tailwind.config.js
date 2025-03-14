/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./**/*.html"],
  theme: {
    extend: {},
  },
  corePlugins: {
    container: false, // Disables Tailwind's container class
  },
  plugins: [],
}