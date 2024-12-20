/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image":
          "url('https://i.pinimg.com/736x/57/a4/e5/57a4e5f7132d5d74e10e2f4e7b1c6f7e.jpg')", // Update this path
      },
      animation: {
        dash: "dash4 1.5s ease-in-out infinite",
      },
      keyframes: {
        dash4: {
          "0%": {
            strokeDasharray: "1, 200",
            strokeDashoffset: "0",
          },
          "50%": {
            strokeDasharray: "90, 200",
            strokeDashoffset: "-35px",
          },
          "100%": {
            strokeDashoffset: "-125px",
          },
        },
      },
    },
  },
  plugins: [],
};
