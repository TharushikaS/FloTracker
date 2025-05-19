module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B98", // Pink
        secondary: "#A259FF", // Purple
        accent: "#FFB6C1", // Light Pink
        neutral: "#FFEAEE", // Very Light Pink
        dark: "#4A2040", // Dark Purple
        bgLight: "#FFF0F5", // Light Background
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}