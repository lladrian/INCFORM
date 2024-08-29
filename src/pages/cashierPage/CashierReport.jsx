import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

// Updated color palette
const colors = {
  teal: "#008080", // Primary color
  slateGray: "#2F4F4F", // Text and border color
  lightGray: "#F5F5F5", // Background color
  offWhite: "#FAFAFA", // Form input and card background
  coral: "#FF6F61", // Accent color for buttons and notifications
};

// Static report data
const staticReportData = {
  daily: [
    {
      date: "2024-08-20",
      totalAmount: "$200",
      onlineAmount: "$150",
      walkInAmount: "$50",
      onlineFormsProcessed: 3,
      walkInFormsProcessed: 2,
    },
  ],
  weekly: [
    {
      week: "2024-W33",
      totalAmount: "$1,400",
      onlineAmount: "$1,000",
      walkInAmount: "$400",
      onlineFormsProcessed: 20,
      walkInFormsProcessed: 15,
    },
  ],
  monthly: [
    {
      month: "August 2024",
      totalAmount: "$6,000",
      onlineAmount: "$4,500",
      walkInAmount: "$1,500",
      onlineFormsProcessed: 100,
      walkInFormsProcessed: 50,
    },
  ],
  yearly: [
    {
      year: "2024",
      totalAmount: "$72,000",
      onlineAmount: "$54,000",
      walkInAmount: "$18,000",
      onlineFormsProcessed: 1200,
      walkInFormsProcessed: 600,
    },
  ],
};

const CashierReport = () => {
  const [reportType, setReportType] = useState("daily");
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReportData = () => {
      setIsLoading(true);
      // Simulate fetching data from an API
      setTimeout(() => {
        setReportData(staticReportData[reportType]);
        setIsLoading(false);
      }, 1000); // Simulated delay
    };

    fetchReportData();
  }, [reportType]);

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: colors.lightGray }}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: colors.teal,
          color: colors.offWhite,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", sm: "1.4rem" }, // Responsive font size
        }}
      >
        CASHIER REPORT
      </Paper>
      <Box mb={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.teal, color: colors.offWhite }}
              onClick={() => setReportType("daily")}
            >
              Daily
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.teal, color: colors.offWhite }}
              onClick={() => setReportType("weekly")}
            >
              Weekly
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.teal, color: colors.offWhite }}
              onClick={() => setReportType("monthly")}
            >
              Monthly
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.teal, color: colors.offWhite }}
              onClick={() => setReportType("yearly")}
            >
              Yearly
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mb={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{ backgroundColor: colors.coral, color: colors.offWhite }}
          startIcon={<RefreshIcon />}
          onClick={() => fetchReportData()}
        >
          Generate Report
        </Button>
      </Box>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: colors.slateGray }}>
                  Date/Period
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.slateGray }}>
                  Total Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.slateGray }}>
                  Online Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.slateGray }}>
                  Walk-In Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.slateGray }}>
                  Online Forms Processed
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.slateGray }}>
                  Walk-In Forms Processed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {entry.date || entry.week || entry.month || entry.year}
                  </TableCell>
                  <TableCell>{entry.totalAmount}</TableCell>
                  <TableCell>{entry.onlineAmount}</TableCell>
                  <TableCell>{entry.walkInAmount}</TableCell>
                  <TableCell>{entry.onlineFormsProcessed}</TableCell>
                  <TableCell>{entry.walkInFormsProcessed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CashierReport;
