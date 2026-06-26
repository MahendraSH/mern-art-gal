import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="night"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  }, plugins: [daisyui],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "night",
    themes: ["winter", "night"],


  },
}