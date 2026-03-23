/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        secondary: '#FF6F00',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight to avoid conflicts with MUI base styles
  },
  plugins: [],
}

