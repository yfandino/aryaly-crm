module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        top: 'top'
      },
      boxShadow: {
        y: "0 0 15px -3px rgba(0, 0, 0, 0.1), 0 0 15px -3px rgba(0, 0, 0, 0.1)"
      },
      flex: {
        "noshrink-nogrow-25": "0 0 25%"
      },
      keyframes: {
        "loading-first": {
          '0%': { left: "-100%", width: "80%" },
          '100%': { left: "100%", width: "10%" },
        },
        "loading-second": {
          '0%': { left: "-150%", width: "80%" },
          '100%': { left: "100%", width: "10%" },
        }
      },
      animation: {
        "loading-first": 'loading-first 1.5s ease-out infinite',
        "loading-second": 'loading-second 1.5s ease-in infinite'
      }
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"]
    },
  },
  plugins: [],
}
