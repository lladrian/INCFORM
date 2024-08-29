import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";

const Reports = () => {
  const handleGenerateReport = () => {
    // Handle report generation logic
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleGenerateReport}>
              Generate Department Report
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" onClick={handleGenerateReport}>
              Generate Yearly Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Reports;
