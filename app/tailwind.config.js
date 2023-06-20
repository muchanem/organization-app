const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "inbox-indigo": "#7d86b1",
        "projects-blue": "#3caefd",
        "tags-purple": "#bf80ff",
        "forecast-red": "#eb4765",
        "flagged-orange": "#f28a54",
        "flagged-dorange": "#ee6635",
        "now-teal": "#20bfbc",
        "today-yellow": "#f8dd7e",
      },
      fontFamily: {
        'sans': ['Work Sans']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
