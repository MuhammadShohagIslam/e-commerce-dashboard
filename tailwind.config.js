/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            primary: "#000000",
            secondary: "#F2F2F2",
            accent: "#FFFFFF",
            success: "#10b981",
        },
        backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      },
    },
    plugins: [require('tailwind-scrollbar')],
  }
