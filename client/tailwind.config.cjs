/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        Dark: {

          "primary": "#F58E2D",

          "secondary": "#9333ea",

          "accent": "#CBFD03",

          "neutral": "#191A3F",

          "base-100": "#3F3E3D",

          "info": "#3194F6",

          "success": "#5FC992",

          "warning": "#F7DE2D",

          "error": "#E60300",
          
          "micolor":"#c93d0a"
        
        },
        Lite: {

          "primary": "#F58E2D",

          "secondary": "#9333ea",

          "accent": "#CBFD03",

          "neutral": "#191A3F",

          "base-100": "#f5f5f4",

          "info": "#3194F6",

          "success": "#5FC992",

          "warning": "#F7DE2D",

          "error": "#E60300",
          "fondo": "#9FFA8E",
        },
      },

    ],
  },
}