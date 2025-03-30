/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'aurora-shift': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '25%': { transform: 'translate(10%, 10%) rotate(1deg)' },
          '50%': { transform: 'translate(-5%, 15%) rotate(-1deg)' },
          '75%': { transform: 'translate(-10%, 5%) rotate(-2deg)' },
        },
        'aurora-shift-reverse': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '25%': { transform: 'translate(-15%, -10%) rotate(1deg)' },
          '50%': { transform: 'translate(10%, -15%) rotate(-1deg)' },
          '75%': { transform: 'translate(15%, -5%) rotate(-2deg)' },
        },
        'aurora-pulse': {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.2)' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translateX(0%)', opacity: '0.7' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translateX(0%)', opacity: '0.7' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        'aurora-shift': 'aurora-shift 15s ease infinite',
        'aurora-shift-reverse': 'aurora-shift-reverse 20s ease infinite',
        'aurora-pulse': 'aurora-pulse 10s ease-in-out infinite',
        'star-movement-bottom': 'star-movement-bottom 8s linear infinite',
        'star-movement-top': 'star-movement-top 8s linear infinite',
      },
    },
  },
  plugins: [],
}