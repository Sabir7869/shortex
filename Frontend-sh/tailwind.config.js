/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)", // Deep blue gradient similar to Bitly
        "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
        "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)",
        "hero-gradient": "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)", // Dark background
      },
      colors: {
        navbarColor: "#ffffff",
        btnColor: "#3b82f6", // Bright blue similar to Bitly
        linkColor: "#2a5bd7",
        bitly: {
          navy: "#0f172a",
          blue: "#1e40af", 
          lightBlue: "#3b82f6",
          orange: "#ff6b35", // Similar to Bitly's accent color
          gray: "#64748b",
          lightGray: "#f1f5f9"
        },
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
        bitly: "0 20px 40px rgba(15, 23, 42, 0.15)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat"],
      },
    },
  },

  variants: {
    extend: {
      backgroundImage: ["responsive"],
    },
  },

  plugins: [],
};