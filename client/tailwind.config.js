/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        flex: {
          '1': '1 1 0%',
          auto: '1 1 auto',
          initial: '0 1 auto',
          none: 'none',
        },
        align: {
          'auto': 'auto',
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'baseline': 'baseline',
          'stretch': 'stretch',
        },
        justify: {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'between': 'space-between',
          'around': 'space-around',
        },
       
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter","light", "dark"],
  
  },
}

