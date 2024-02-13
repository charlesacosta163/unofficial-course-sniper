/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '576px'},
      // => @media (max-width: 576px) { ... }
    },
    colors: {
      "primary": "#272e7c",
      "secondary": "#DEDCFF",
      "light": '#FFFFFF',
      "gray": "#eeeef2",
      "dark": "#323740",
      "green": "#008445",
      "accent": "#0600C2",

      "greenHovered": "#04ba63",
      "grayHovered": "#bcbcd6",


      "bgLightMode": "#F8F8FF",
      "bgDarkMode": "#19191F",
      "fontDarkMode": "#EBE9FC",
      "bgDarkSecondary": "#1c1061",
      "bgDarkPrimary": "#3A31D8",
      "bgGrayBtn": "#40404F",
      "bgDarkFooter": "#0d0d11"
    },
  },
  plugins: [],
}

