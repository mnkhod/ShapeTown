import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";


/** @type {import('tailwindcss').Config} */
export default withAccountKitUi(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'malio': ['"Little Malio 8-Bit"', 'monospace']
        },
        cursor: {
          'default': 'url(/assets/hud/Cursor.png) 1 1, auto',
        },
      },
    },
    plugins: [],
  },
  {
    colors: {
      "btn-primary": createColorSet("#E82594", "#FF66CC"),
      "fg-accent-brand": createColorSet("#E82594", "#FF66CC"),
    },
  },
);