/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'upb-blue': '#1e40af',
        'upb-blue-light': '#3b82f6',
        'upb-blue-dark': '#1e3a8a',
        'upb-gray': '#6b7280',
        'upb-gray-light': '#f3f4f6',
        'upb-gray-dark': '#374151',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        ripple: {
          'to': { transform: 'scale(4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
