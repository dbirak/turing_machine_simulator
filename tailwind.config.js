import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  important: "#root",
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        // dark: {
        //   primary: "#38bdf8",
        //   secondary: "#818CF8",
        //   accent: "#F471B5",
        //   neutral: "#1E293B",
        //   "neutral-focus": "#273449",
        //   "base-100": "#0A0F1C",
        //   info: "#0CA5E9",
        //   success: "#2DD4BF",
        //   warning: "#F4BF50",
        //   error: "#FB7085",
        // },
      },
      {
        lofi: {
          primary: "#0d0d0d",
          "primary-content": "#ffffff",
          secondary: "#1a1919",
          "secondary-content": "#ffffff",
          accent: "#262626",
          "accent-content": "#ffffff",
          neutral: "#000000",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e6e5e5",
          "base-content": "#000000",
          info: "#5fcfdd",
          "info-content": "#031011",
          success: "#69fec3",
          "success-content": "#04160e",
          warning: "#ffce69",
          "warning-content": "#170f04",
          error: "#ff9181",
          "error-content": "#180706",
        },
      },
    ],
  },
  theme: {
    extend: {},
    fontFamily: {
      geist: ["Geist", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
