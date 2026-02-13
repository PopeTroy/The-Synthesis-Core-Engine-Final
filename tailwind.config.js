/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        synthesis: {
          bg: '#fcfcfd',
          surface: '#ffffff',
          border: '#e2e8f0',
          text: '#0f172a',
          muted: '#64748b'
        }
      }
    }
  },
  plugins: [],
}