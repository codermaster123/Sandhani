/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    fontFamily: {
       Rampart: ["Rampart One", "cursive"],
       Arvo:["Arvo","Fantasy"],
       title:["Righteous", "cursive"],
      },
      
    },
    
  },
  daisyui: {
      themes: [
        {
          mytheme: {
          primary: "#B9261C",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          },
        },
      ],
    },
  plugins: [require("daisyui")],

}