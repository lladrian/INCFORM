import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Bar } from "react-chartjs-2";

const SubjectRequestChart = ({
  chartData,
  chartOptions,
  selectedSubject,
  handleBarClick,
  handleCloseDetails,
  colors,
}) => {
  return (
    <Card sx={{ backgroundColor: colors.offWhite, padding: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: colors.slateGray }}
        >
          Subject Request Overview
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "400px", // Adjust height as needed for responsiveness
            overflow: "hidden", // Hide overflow to ensure the chart fits
          }}
        >
          <Bar
            data={chartData}
            options={chartOptions}
            onClick={handleBarClick}
          />
        </Box>
        {selectedSubject && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="p">
              {`Subject: ${selectedSubject.subject}`}
            </Typography>
            <Typography variant="body1">
              {`Number of Requests: ${selectedSubject.count}`}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.universityBlue,
                color: colors.offWhite,
                "&:hover": {
                  backgroundColor: colors.coral,
                },
                marginTop: 1,
              }}
              onClick={handleCloseDetails}
            >
              Close Details
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectRequestChart;
