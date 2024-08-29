import React from "react";
import { Container, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const GradeEntry = () => {
  const handleGradeSubmission = () => {
    // Handle grade submission logic
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Grade Entry
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Student Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Department" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Course" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Grade" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleGradeSubmission}>
              Submit Grade
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default GradeEntry;
