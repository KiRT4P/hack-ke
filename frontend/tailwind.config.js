/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        usable: "1600px",
      },
      colors: {
        accent: "#80ed99",
        primary: "#fff",
        secondary: "#E4E4E4",
        background: "#fff",
        dark: "#9ca3af",
        marker: "#ff7a72",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
