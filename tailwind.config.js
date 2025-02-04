/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pdarkblue: "#0B588F",
        pblue: "#26AAE1",
        porange: "#EB891B",
        pgreen: "#68B92E",
        base: "#EEF0F2",
        ternaryBlue: "#0A3357",
        primaryBlue: "#228be6",
        secondaryBlue: "#D7EAFB",
        primaryOrange: "#e67e22",
        grayCustom: "#eef0f2",
      },
    },
  },
  plugins: [],
};
