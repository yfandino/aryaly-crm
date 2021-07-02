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
