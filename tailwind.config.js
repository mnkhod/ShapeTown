import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";


/** @type {import('tailwindcss').Config} */
export default withAccountKitUi(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  },
  {
    // override account kit themes
    colors: {
      "btn-primary": createColorSet("#E82594", "#FF66CC"),
      "fg-accent-brand": createColorSet("#E82594", "#FF66CC"),
    },
  },
);