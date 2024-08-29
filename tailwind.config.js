/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // This includes all relevant file types in the src folder and its subfolders
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#d30707", // Primary color for headers, key sections, main buttons
        darkMaroon: "#b70707", // Hover states, secondary buttons, subtle highlights
        white: "#fffffd", // Main background color for a clean appearance
        offWhite: "#FAFAFA", // Backgrounds for sections or cards to create depth
        lightGray: "#F5F5F5", // Backgrounds for less prominent areas, borders, separators
        gray: "#d3d3d3", // Secondary text, borders, or subtle elements
        black: "#000000", // Main text for high contrast and readability
        teal: "#008080", // Accent color for highlights, secondary buttons, call-to-action elements
        slateGray: "#2F4F4F", // Text and icons where strong readability is needed
        coral: "#FF6F61", // Accent color for highlights, call-to-action elements

        // Adding University colors
        universityBlue: "#007BFF", // Main university color
        lightBlue: "#E3F2FD", // Light background for contrast
        darkBlue: "#0056B3", // Darker blue for contrast and active states
        successGreen: "#28A745", // Success messages
        errorRed: "#DC3545", // Error messages
        infoBlue: "#17A2B8", // Info messages
      },

      boxShadow: {
        "elevation-3":
          "0px 4px 8px rgba(0, 0, 0, 0.1), 0px -2px 4px rgba(0, 0, 0, 0.1)",

        // Add other custom shadow values here if needed
      },
    },
  },
  plugins: [],
};
