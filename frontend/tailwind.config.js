
import tailwindcss3d from 'tailwindcss-3d'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        pokemoncard: 'repeat(auto-fill, minmax(300px, 300px))'
      }

    },
  },
  plugins: [tailwindcss3d],
}

