/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#050505',
        'cyber-cyan': '#00f2ff',
        'alert-orange': '#ff8c00'
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
