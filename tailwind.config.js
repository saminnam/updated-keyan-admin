/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('https://i.pinimg.com/736x/57/a4/e5/57a4e5f7132d5d74e10e2f4e7b1c6f7e.jpg')", // Update this path
      },
    },
  },
  plugins: [],
}
