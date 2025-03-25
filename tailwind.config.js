/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'seance': {
          '50': '#fcf4ff',
          '100': '#f8e7ff',
          '200': '#f0ceff',
          '300': '#e8a8ff',
          '400': '#dc74fe',
          '500': '#c83ff6',
          '600': '#af1fda',
          '700': '#9416b5',
          '800': '#8516a0',
          '900': '#671679',
          '950': '#430151',
      },
    }
  },
  plugins: [],
}

