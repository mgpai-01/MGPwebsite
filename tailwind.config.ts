import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2a6b40',
        'sage-accent': '#6a9e78',
        'hero-bg': '#1c3325',
        'page-bg': '#faf9f6',
        'alt-bg': '#f0ede6',
        'footer-bg': '#141f17',
        'body-text': '#1c2b1e',
        'muted-text': '#6b7b6e',
        'photo-placeholder': '#e8e2d9',
      },
      fontFamily: {
        condensed: ['var(--font-barlow-condensed)', 'sans-serif'],
        sans: ['var(--font-barlow)', 'sans-serif'],
      },
      maxWidth: {
        content: '1360px',
      },
    },
  },
  plugins: [],
}

export default config
