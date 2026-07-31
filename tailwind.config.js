/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grace: {
          bg: '#FAF9F5',
          darkBg: '#121110',
          card: '#FFFFFF',
          darkCard: '#1C1A18',
          espresso: '#181615',
          'espresso-light': '#2A2725',
          sand: '#F2EFE9',
          'sand-dark': '#E5E1D8',
          gold: '#C5A880',
          'gold-dark': '#A38761',
          muted: '#8C8780',
          border: '#E8E4DC',
          darkBorder: '#2E2B28',
          success: '#2E6F40',
          amber: '#B8860B',
          danger: '#9B2C2C'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'grace-subtle': '0 2px 12px rgba(24, 22, 21, 0.04)',
        'grace-card': '0 6px 24px rgba(24, 22, 21, 0.06)',
        'grace-floating': '0 12px 36px rgba(24, 22, 21, 0.12)'
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
}
