import { Grid, Typography } from "@mui/material";
import React from "react";

function GridForm({ name, data, index }) {
  const colors = {
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
  };
  return (
    <Grid item xs={12} sm={6}>
      <Typography
        variant="subtitle1"
        sx={{
          color: colors.slateGray,
          fontSize: {
            xs: "0.875rem",
            sm: "1rem",
          },
        }}
      >
        {name} <strong>{data}</strong>
      </Typography>
    </Grid>
  );
}

export default GridForm;
