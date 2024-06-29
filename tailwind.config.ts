import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        brd: "#3A3A3A",
        // secondary: "#333",
        main: "#fff",
        primary: "#FB0104",
        // primary: "#222",
        secondary: "#010538"
      },
      fontFamily: {
        "helvetica-bold": ["helvetica-bold"],
        "helvetica-light": ["helvetica-light"],
        "helvetica-medium": ["helvetica-medium"],
        "helvetica-regular": ["helvetica-regular"],

        "neue-light": ["neue-light"],
        "neue-regular": ["neue-regular"],
        "neue-ultra-bold": ["neue-ultra-bold"],
        
        "offbit-101": ["offbit-101"],
        "offbit-101-bold": ["offbit-101-bold"],
        "offbit-bold": ["offbit-bold"],
        "offbit-dot": ["offbit-dot"],
        "offbit-dot-bold": ["offbit-dot-bold"],
        "offbit-regular": ["offbit-regular"],
        
        "thunder-bold": ["thunder-bold"],
        "thunder-extrabold": ["thunder-extrabold"],
        "thunder-semibold": ["thunder-semibold"],
      },
    },
  },
  plugins: [],
}
export default config
