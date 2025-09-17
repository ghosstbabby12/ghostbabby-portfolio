/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ghost-purple': '#667eea',
        'ghost-pink': '#764ba2',
        'ghost-blue': '#f093fb',
        'dark-bg': '#0c0c0c',
        'dark-secondary': '#1a1a2e',
        'dark-accent': '#16213e',
      },
      backgroundImage: {
        'ghost-gradient': 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        'text-gradient': 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'card-gradient': 'linear-gradient(45deg, #667eea, #764ba2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'slideIn': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: '0.3' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(180deg)', 
            opacity: '0.8' 
          },
        },
        glow: {
          from: { 
            filter: 'drop-shadow(0 0 5px rgba(102, 126, 234, 0.5))' 
          },
          to: { 
            filter: 'drop-shadow(0 0 20px rgba(118, 75, 162, 0.8))' 
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}