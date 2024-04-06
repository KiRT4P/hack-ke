/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'usable': '1600px'
      },
      colors: {
        'accent': "#80ed99",
        'primary': "#fff",
        'secondary': "#E4E4E4",
        'background': "#b4ccf0",
        'dark': "#9ca3af",
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}