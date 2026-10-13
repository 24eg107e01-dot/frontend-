/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05070e',
          surface: '#0d1322',
          surfaceCard: 'rgba(16, 24, 44, 0.75)',
          border: 'rgba(56, 189, 248, 0.15)',
          blue: '#0ea5e9',
          cyan: '#06b6d4',
          emerald: '#10b981',
          purple: '#a855f7',
          pink: '#ec4899',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(14, 165, 233, 0.4), 0 0 20px rgba(168, 85, 247, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(14, 165, 233, 0.8), 0 0 40px rgba(168, 85, 247, 0.5)' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
