/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EDE4D9',
        },
        burgundy: {
          50: '#FBF2F4',
          100: '#F6E4E8',
          200: '#EBC9D1',
          300: '#DAA0AF',
          400: '#C78391',
          500: '#8A2045',
          600: '#6B1835', // Primary brand color
          700: '#541229',
          800: '#3D0D1E',
          900: '#2A0915',
          950: '#19040C',
        },
        gold: {
          100: '#F4EEDB',
          200: '#E7DCBA',
          300: '#D6C393',
          400: '#C5A36A', // Champagne gold
          500: '#A9864E',
          600: '#866838',
        },
        rose: {
          100: '#F7EAEE',
          200: '#EED5DC',
          300: '#E0B5C1',
          400: '#C78391', // Muted rose
          500: '#B06B79',
        },
        espresso: {
          50: '#F5F4F3',
          100: '#E6E4E2',
          300: '#B2ACA7',
          500: '#675E59',
          700: '#3D3430',
          900: '#29221F', // Dark espresso
          950: '#171311',
        },
        beige: {
          100: '#F8F4EE',
          200: '#EDE4D9', // Soft beige
          300: '#DFCDBE',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 34, 31, 0.05)',
        'luxury': '0 10px 30px -5px rgba(107, 24, 53, 0.08), 0 4px 10px -2px rgba(41, 34, 31, 0.04)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'modal': '0 25px 50px -12px rgba(41, 34, 31, 0.25)',
      }
    },
  },
  plugins: [],
}

