import React from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const IncFormRequestsCard = ({ title, loading, error, count, colors }) => {
  return (
    <Card sx={{ backgroundColor: colors.offWhite, height: "100%" }}>
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: colors.slateGray }}
        >
          {title}
        </Typography>
        {loading ? (
          <Typography
            variant="h2"
            component="p"
            style={{ color: colors.slateGray }}
          >
            <CircularProgress sx={{ color: colors.universityBlue }} />
          </Typography>
        ) : error ? (
          <Typography
            variant="h2"
            component="p"
            style={{ color: colors.slateGray }}
          >
            Error loading data
          </Typography>
        ) : (
          <Typography
            variant="h2"
            component="p"
            sx={{ color: colors.universityBlue, fontWeight: "bold" }}
          >
            {count}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default IncFormRequestsCard;
