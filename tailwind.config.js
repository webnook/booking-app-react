export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      bgColor: "#f3f4f6",
      text700: "#374151",
      text400: "#94a3b8",
      text500: "#64748b",
      text100: "#f1f5f9",
      text300: "#d1d5db",
      white: "#fff",
      primary700: "#4338ca",
      primary600: "#4f46e5",
      primary100: "#e0e7ff",
      rose500: "#f43f5e",
      borderColor: "#ebe9e9",
    },
    extend: {
      gridTemplateColumns: {
        "auto-fit-300": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
