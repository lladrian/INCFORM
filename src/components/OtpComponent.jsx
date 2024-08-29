import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const OtpComponent = ({ onVerify }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Email Verification
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        We have sent a code to your email ba**@dipainhouse.com
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {[...Array(4)].map((_, index) => (
          <Grid item key={index}>
            <TextField
              variant="outlined"
              inputProps={{ maxLength: 1 }}
              sx={{ width: 50, height: 50, textAlign: "center" }}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={onVerify}
        sx={{ marginTop: 2 }}
      >
        Verify Account
      </Button>
    </Box>
  );
};

export default OtpComponent;
