import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    '../ui/**/*.{js,ts,jsx,tsx,mdx}', // 👈 include UI
    './**/*.{js,ts,jsx,tsx,mdx}' // 👈 include assets if needed
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

export default config
