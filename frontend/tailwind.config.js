
import tailwindcss3d from 'tailwindcss-3d'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flip: {
          from: { transform: 'rotateY(0)' },
          to: { transform: 'rotateY(180deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        flip: 'flip 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) 1 forwards',
        wiggle: 'wiggle .2s ease-in-out infinite',
      },
      gridTemplateColumns: {
        pokemoncard: 'repeat(auto-fill, minmax(300px, 300px))'
      }

    },
  },
  plugins: [tailwindcss3d],
}

