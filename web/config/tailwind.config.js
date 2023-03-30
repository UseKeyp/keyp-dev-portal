/** @type {import('tailwindcss').Config} */
const { softUi } = require('@usekeyp/tailwind-presets')

module.exports = {
  content: [
    'src/**/*.{js,jsx,ts,tsx}',
    '../node_modules/@usekeyp/components-soft-ui/src/**/*.{js,jsx,ts,tsx,md}',
  ],
  presets: [softUi],
  theme: {
    extend: {},
  },
  plugins: [],
}
