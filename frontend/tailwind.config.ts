// C:\Users\Melody\Documents\haliberrycake\frontend\tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: '#A89080',      /* Warm taupe - friendly primary */
          light: '#C9A876',        /* Gold - luxury accent */
          dark: '#3D2817',         /* Deep chocolate - sophisticated */
        },
        apricot: '#D4A9A0',        /* Blush rose - feminine */
        blush: {
          DEFAULT: '#D4A9A0',
          light: '#F4E6DC',
          dark: '#C4988F',
        },
        golden: {
          DEFAULT: '#C9A876',      /* Warm gold */
          dark: '#B5926A',
        },
        cream: {
          DEFAULT: '#F9F7F4',      /* Premium cream */
          dark: '#F0E8E3',
        },
        chocolate: {
          DEFAULT: '#3D2817',      /* Deep chocolate brown */
          light: '#5F5A54',
          lighter: '#A89080',
        },
        brand: {
          50:  '#FAF8F6',          /* Ivory */
          100: '#F9F7F4',          /* Premium cream */
          200: '#F0E8E3',          /* Sand */
          300: '#D4A9A0',          /* Blush rose */
          400: '#C9A876',          /* Gold */
          500: '#A89080',          /* Taupe */
          600: '#8A8178',          /* Muted */
          700: '#5F5A54',          /* Secondary text */
          800: '#3D2817',          /* Deep chocolate */
          900: '#2D2620',          /* Text primary */
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.35rem, 2.5vw, 2rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'luxury': '0 8px 40px rgba(61, 40, 23, 0.12), 0 2px 10px rgba(45, 38, 32, 0.06)',
        'luxury-lg': '0 20px 60px rgba(61, 40, 23, 0.16), 0 4px 20px rgba(45, 38, 32, 0.08)',
        'luxury-sm': '0 4px 20px rgba(61, 40, 23, 0.10), 0 1px 6px rgba(45, 38, 32, 0.05)',
        'blush': '0 8px 40px rgba(212, 169, 160, 0.2)',
        'inner-soft': 'inset 0 2px 8px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FAF8F6 0%, #F9F7F4 40%, #F0E8E3 100%)',
        'gradient-peach': 'linear-gradient(180deg, #FAF8F6 0%, #F9F7F4 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FAF8F6 0%, #D4A9A0 50%, #A89080 100%)',
        'gradient-cream': 'linear-gradient(180deg, #FAF8F6 0%, #F9F7F4 100%)',
        'gradient-dark-overlay': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(45, 38, 32, 0.6) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config