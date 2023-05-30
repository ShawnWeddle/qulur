import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
} satisfies Config;
