import React from "react";
import {
  Grid,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  CircularProgress,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useGetINCRequestCashierQuery } from "../../api/apiSlice";

// Register necessary components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

const colors = {
  teal: "#008080",
  slateGray: "#2F4F4F",
  lightGray: "#F5F5F5",
  offWhite: "#FAFAFA",
  coral: "#FF6F61",
};

const monthlyRevenue = [
  { month: "Jan", revenue: 20000 },
  { month: "Feb", revenue: 25000 },
  { month: "Mar", revenue: 30000 },
  { month: "Apr", revenue: 28000 },
  { month: "May", revenue: 35000 },
  { month: "Jun", revenue: 40000 },
];

const yearlyRevenue = [
  { year: "2021", revenue: 200000 },
  { year: "2022", revenue: 220000 },
  { year: "2023", revenue: 250000 },
];

const transactionData = [
  { id: "TX001", method: "Online", amount: 5000, status: "Completed" },
  { id: "TX002", method: "Walk-In", amount: 3000, status: "Pending" },
  { id: "TX003", method: "Online", amount: 7000, status: "Completed" },
];

// Line chart data
const monthlyRevenueData = {
  labels: monthlyRevenue.map((data) => data.month),
  datasets: [
    {
      label: "Monthly Revenue",
      data: monthlyRevenue.map((data) => data.revenue),
      borderColor: colors.teal,
      backgroundColor: "rgba(0, 128, 128, 0.2)",
      fill: true,
    },
  ],
};

// Bar chart data
const yearlyRevenueData = {
  labels: yearlyRevenue.map((data) => data.year),
  datasets: [
    {
      label: "Yearly Revenue",
      data: yearlyRevenue.map((data) => data.revenue),
      backgroundColor: colors.teal,
    },
  ],
};

// INC forms data
const incFormsData = {
  totalReceived: 120,
  totalCompleted: 90,
  totalPending: 30,
};

export default function MainDashboard() {
  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestCashierQuery();

  const requestIncForms = incRequest?.request_inc_forms || [];

  return (
    <Container
      sx={{
        paddingBottom: "24px",
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.lightGray,
        transition: "width 0.3s",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: colors.teal,
          color: colors.offWhite,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        DASHBOARD
      </Paper>

      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                height: "100%",
                backgroundColor: colors.offWhite,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  color: colors.teal,
                }}
              >
                <MonetizationOnIcon sx={{ marginRight: 1 }} /> Total Amount
                Received (This Month)
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: colors.teal }}
              >
                ₱100,000
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                height: "100%",
                backgroundColor: colors.offWhite,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  color: colors.teal,
                }}
              >
                <AccountBalanceWalletIcon sx={{ marginRight: 1 }} /> Payment
                Method Breakdown
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                  color: colors.slateGray,
                }}
              >
                Online Payments: <span>60%</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: colors.slateGray,
                }}
              >
                Walk-in Payments:{" "}
                <span style={{ color: colors.coral }}>40%</span>
              </Typography>
            </Paper>
          </Grid>

          {/* New Grid item for INC forms data */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                height: "100%",
                backgroundColor: colors.offWhite,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  color: colors.teal,
                }}
              >
                INC Forms Status
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                  color: colors.slateGray,
                }}
              >
                Total Received:
                {incRequestLoading ? (
                  <CircularProgress sx={{ color: colors.teal }} />
                ) : incRequestError ? (
                  "Error loading data"
                ) : (
                  <span>
                    {
                      requestIncForms.filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.instructor_date !== null
                      ).length
                    }
                  </span>
                )}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                  color: colors.slateGray,
                }}
              >
                Total Completed:
                {incRequestLoading ? (
                  <CircularProgress sx={{ color: colors.teal }} />
                ) : incRequestError ? (
                  "Error loading data"
                ) : (
                  <span>
                    {
                      requestIncForms.filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.instructor_date !== null &&
                          request.cashier_date !== null &&
                          request.cashier_status !== "0"
                      ).length
                    }
                  </span>
                )}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: colors.slateGray,
                }}
              >
                Total Pending:
                {incRequestLoading ? (
                  <CircularProgress sx={{ color: colors.teal }} />
                ) : incRequestError ? (
                  "Error loading data"
                ) : (
                  <span>
                    {
                      requestIncForms.filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.instructor_date !== null &&
                          request.cashier_date === null &&
                          request.cashier_status === "0"
                      ).length
                    }
                  </span>
                )}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 2,
              height: "100%",
              backgroundColor: colors.offWhite,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: colors.teal }}
            >
              Monthly Revenue
            </Typography>
            <div style={{ height: 300 }}>
              <Line data={monthlyRevenueData} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 2,
              height: "100%",
              backgroundColor: colors.offWhite,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: colors.teal }}
            >
              Yearly Revenue
            </Typography>
            <div style={{ height: 300 }}>
              <Bar data={yearlyRevenueData} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 2,
              backgroundColor: colors.offWhite,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: colors.teal }}
            >
              Recent Transactions
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: colors.offWhite }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>₱{transaction.amount}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
