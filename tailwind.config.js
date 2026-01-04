/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e293b',
        'secondary': '#0f172a',
        'accent': '#3b82f6',
      },
      backgroundImage: {
        'gradient-sunny': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-snow': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
