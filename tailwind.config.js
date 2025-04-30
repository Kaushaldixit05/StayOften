/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F8F7',
          100: '#CCF1EF',
          200: '#99E3DF',
          300: '#66D5CF',
          400: '#33C7C0',
          500: '#0FB5AE', // Primary teal
          600: '#0C908A',
          700: '#096C67',
          800: '#064845',
          900: '#032422',
        },
        secondary: {
          50: '#FFF5F0',
          100: '#FFEBE0',
          200: '#FFD7C2',
          300: '#FFC3A3',
          400: '#FFAF85',
          500: '#FF8552', // Coral accent
          600: '#CC6A42',
          700: '#995031',
          800: '#663721',
          900: '#331B10',
        },
        sand: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F5ECDF',
          300: '#F0E3CF',
          400: '#EBD9BF',
          500: '#E6D0AF',
          600: '#B8A68C',
          700: '#8A7D69',
          800: '#5C5346',
          900: '#2E2A23',
        },
        success: {
          50: '#E8F5E9',
          500: '#4CAF50',
          700: '#388E3C',
        },
        warning: {
          50: '#FFF8E1',
          500: '#FFC107',
          700: '#FFA000',
        },
        error: {
          50: '#FFEBEE',
          500: '#F44336',
          700: '#D32F2F',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};