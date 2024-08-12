import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          lightBlue: "#e0f2fe", // Example soft blue
          lavender: "#d9bfff", // Example purple
          pastelPink: "#ffe6f2", // Example pink
        },
        secondary: {
          navy: "#00284d", // Example dark blue
          deepPurple: "#482850", // Example dark purple
        },
        accent: {
          gold: "#ffd700", // Example gold
          silver: "#c0c0c0", // Example silver
        },
      },
    },
  },
  plugins: [],
}
export default config
