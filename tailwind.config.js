/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#080808',
          charcoal: '#0D0D0D',
          dark: '#151515',
          elevated: '#1C1C1C',
          card: '#121212',
          cardHover: '#181818',
          cream: '#F5F1E8',
          creamLight: '#FCFAF6',
          muted: '#A8A39A',
          subtle: '#6E6A63',
          gold: {
            DEFAULT: '#C9A86A',
            light: '#E5D0A6',
            dark: '#9A7A3E',
            glow: 'rgba(201, 168, 106, 0.25)',
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E5D0A6 0%, #C9A86A 50%, #9A7A3E 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(201, 168, 106, 0.2) 50%, transparent 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(201, 168, 106, 0.08) 0%, transparent 70%)',
        'dark-radial-bottom': 'radial-gradient(circle at 50% 100%, rgba(201, 168, 106, 0.06) 0%, transparent 60%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(201, 168, 106, 0.15)',
        'gold-md': '0 0 25px rgba(201, 168, 106, 0.25)',
        'gold-lg': '0 10px 40px -10px rgba(201, 168, 106, 0.35)',
        'luxury-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'shimmer': 'shimmer 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}
