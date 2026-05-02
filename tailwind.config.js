/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'discord-blurple': '#5865F2',
        'discord-dark': '#2C2F33',
        'discord-darker': '#23272A',
        'discord-gray': '#99AAB5',
        'discord-light-gray': '#36393F',
        'discord-green': '#43B581',
        'discord-yellow': '#FAA61A',
        'discord-red': '#F04747',
      },
    },
  },
  plugins: [],
}
