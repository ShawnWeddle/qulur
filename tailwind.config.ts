import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      animation: {
        Q1pulse: "Q1Keys 2s ease-in-out infinite",
        U1pulse: "U1Keys 2s ease-in-out infinite",
        L1pulse: "L1Keys 2s ease-in-out infinite",
        U2pulse: "U2Keys 2s ease-in-out infinite",
        R1pulse: "R1Keys 2s ease-in-out infinite",
      },
      keyframes: {
        Q1Keys: {
          "0%": {transform: "scale(1)"},
          "30%": {transform: "scale(0.5)"},
          "60%": {transform: "scale(1)"},
          "100%": {transform: "scale(1)"},
        },
        U1Keys: {
          "0%": {transform: "scale(1)"},
          "10%": {transform: "scale(1)"},
          "40%": {transform: "scale(0.5)"},
          "70%": {transform: "scale(1)"},
          "100%": {transform: "scale(1)"},
        },
        L1Keys: {
          "0%": {transform: "scale(1)"},
          "20%": {transform: "scale(1)"},
          "50%": {transform: "scale(0.5)"},
          "80%": {transform: "scale(1)"},
          "100%": {transform: "scale(1)"},
        },
        U2Keys: {
          "0%": {transform: "scale(1)"},
          "30%": {transform: "scale(1)"},
          "60%": {transform: "scale(0.5)"},
          "90%": {transform: "scale(1)"},
          "100%": {transform: "scale(1)"},
        },
        R1Keys: {
          "0%": {transform: "scale(1)"},
          "40%": {transform: "scale(1)"},
          "70%": {transform: "scale(0.5)"},
          "100%": {transform: "scale(1)"},
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
