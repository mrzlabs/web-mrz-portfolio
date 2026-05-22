import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mrz-dark': '#070315',
        'mrz-purple': '#c084fc',
        'mrz-light': '#f4efe5',
        'mrz-accent': '#8b5cf6',
        'mrz-cyan': '#38f8d6',
        'mrz-panel': '#0f0a1f',
        'mrz-border': '#2d1b4e',
        'mrz-muted': '#a0aec0',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      keyframes: {
        'twinkle': {
          '0%, 100%': { opacity: '0.85', filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.3))' },
          '50%': { opacity: '0.95', filter: 'drop-shadow(0 0 16px rgba(192, 132, 252, 0.5))' },
        },
        'bot-breathe': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.45))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.85))' },
        },
        'bot-eye': {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '94%': { transform: 'scaleY(0.15)' },
        },
        'bot-hop': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '45%': { transform: 'translateY(-12px)' },
          '70%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'bot-breathe': 'bot-breathe 3.4s ease-in-out infinite',
        'bot-eye': 'bot-eye 2.2s ease-in-out infinite',
        'bot-hop': 'bot-hop 0.42s cubic-bezier(0.3, 1.4, 0.5, 1)',
      },
    },
  },
  plugins: [],
}
export default config
