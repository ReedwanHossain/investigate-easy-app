/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            500: '#3b82f6',
            600: '#2563eb',
          },
          secondary: {
            500: '#64748b',
            600: '#475569',
          },
        },
      },
    },
    plugins: [],
  }