/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          /* Primary blue — replaces green everywhere */
          green:         "#1565C0",
          "green-light": "#42A5F5",
          "green-dark":  "#0D47A1",
          /* Deep navy — replaces old blue */
          blue:          "#0A2540",
          "blue-light":  "#1976D2",
          /* Sky accent — replaces gold */
          gold:          "#0EA5E9",
          "gold-light":  "#38BDF8",
          /* Light blue tint background — replaces cream */
          cream:         "#EFF6FF",
          /* Dark navy */
          dark:          "#071829",
        },
      },
      fontFamily: {
        serif:  ["Playfair Display", "Georgia", "serif"],
        sans:   ["Inter", "system-ui", "sans-serif"],
        stat:   ["Oswald", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, rgba(7,24,41,0.95) 0%, rgba(13,71,161,0.88) 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease-out forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        "slide-left": "slideLeft 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideLeft: { "0%": { opacity: 0, transform: "translateX(24px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};
