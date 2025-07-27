/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],      
        pop: ['var(--font-poppins)'],  
        rob: ['var(--font-roboto)'],
        mono: ['var(--font-jetbrains)'],  
      },
    },
  },
  plugins: [],
}

