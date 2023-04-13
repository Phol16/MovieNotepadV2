/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"var(--primary)",
        secondary:"var(--secondary)",
        secondaryHover:"var(--secondaryHover)",
        teriary:"var(--teriary)",
        primaryText:"var(--primaryText)",
      },
      backgroundImage:{
        bgSeat: "url('./src/assets/bgseats.jpg')"
      },
      fontFamily:{
        poppins:"'poppins', 'serif', 'sans'"
      }
    },
  },
  plugins: [],
}