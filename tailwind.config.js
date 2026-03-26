/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        themeLight: {
          100: '#FCF8F8',
          200: '#FBEFEF',
          300: '#F9DFDF',
          400: '#FEEAC9',
          500: '#FFCDC9',
          600: '#F5AFAF',
        },
        themeDark: {
          100: '#3A0519',
          200: '#670D2F',
          300: '#850E35',
          400: '#A53860',
          500: '#EE6983',
          600: '#EF88AD',
        },
        primary: '#FFCDC9',
        secondary: '#EF88AD',
        success: '#FEEAC9',
        error: '#F5AFAF',
        warning: '#EE6983',
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight to avoid conflicts with MUI base styles
  },
  plugins: [],
}

