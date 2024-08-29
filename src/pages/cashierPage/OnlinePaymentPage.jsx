import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Skeleton,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useGetINCRequestCashierQuery } from "../../api/apiSlice";
import { Link } from "react-router-dom";

const OnlinePaymentPage = () => {
  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestCashierQuery();

  const requestIncForms = incRequest?.request_inc_forms || [];

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [processing, setProcessing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [amountError, setAmountError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlinePayments, setOnlinePayments] = useState([
    {
      id: "1",
      referenceNumber: "REF12345",
      studentName: "John Doe",
      subject: "Mathematics 101",
      amount: "₱500",
      status: "Pending",
      type: "Online",
    },
    {
      id: "2",
      referenceNumber: "REF67890",
      studentName: "Jane Smith",
      subject: "English Literature",
      amount: "₱700",
      status: "Completed",
      type: "Online",
    },
    // Add more payments as needed
  ]);

  const handlePayment = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setAmountError("Please enter a valid amount.");
      return;
    }

    setAmountError(""); // Clear any previous error messages
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSnackbarMessage("Payment successful!");
      setOpenSnackbar(true);
      // Reset form or navigate to another page as needed
      setAmount("");
      setPaymentMethod("Credit Card");
    }, 2000);
  };

  const handleApprovePayment = (payment) => {
    setOnlinePayments((prevPayments) =>
      prevPayments.map((p) =>
        p.id === payment.id ? { ...p, status: "Completed" } : p
      )
    );
    setSnackbarMessage(`Payment for ${payment.studentName} approved!`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPayments = onlinePayments.filter((payment) =>
    payment.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colors = {
    teal: "#008080", // Primary color
    slateGray: "#2F4F4F", // Text and border color
    lightGray: "#F5F5F5", // Background color
    offWhite: "#FAFAFA", // Form input and card background
    coral: "#FF6F61", // Accent color for buttons and notifications
  };

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
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", sm: "1.4rem" }, // Responsive font size
        }}
      >
        ONLINE PAYMENT
      </Paper>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Online Payment Processing
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <TextField
            label="Search by Reference Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Paper>

        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: colors.slateGray }}>
                  Reference Number
                </TableCell>
                <TableCell sx={{ color: colors.slateGray }}>
                  Student Name
                </TableCell>
                <TableCell sx={{ color: colors.slateGray }}>Subject</TableCell>
                <TableCell sx={{ color: colors.slateGray }}>Amount</TableCell>
                <TableCell sx={{ color: colors.slateGray }}>Status</TableCell>
                <TableCell sx={{ color: colors.slateGray }}>Type</TableCell>
                <TableCell sx={{ color: colors.slateGray }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incRequestLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                    <td style={{ padding: "0.75rem", textAlign: "left" }}>
                      <Skeleton variant="text" width="100%" />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {requestIncForms.filter(
                    (request) =>
                      request.instructor_status !== "0" &&
                      request.instructor_date !== null &&
                      request.cashier_date === null &&
                      request.cashier_status === "0" &&
                      request.payment_method === "ONLINE"
                  ).length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6} // Adjust this to the number of columns you have
                        sx={{
                          padding: "16px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{
                            color: colors.universityBlue,
                            fontWeight: "bold",
                          }}
                        >
                          No INC Form Requests
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    requestIncForms
                      .filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.instructor_date !== null &&
                          request.cashier_date === null &&
                          request.cashier_status === "0" &&
                          request.payment_method === "ONLINE"
                      )
                      .map((request, index) => (
                        <TableRow key={request.id}>
                          <TableCell sx={{ color: colors.slateGray }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ color: colors.slateGray }}>
                            {request.student_fullname}
                          </TableCell>
                          <TableCell sx={{ color: colors.slateGray }}>
                            {request.subject_code}
                          </TableCell>
                          <TableCell sx={{ color: colors.slateGray }}>
                            {request.description}
                          </TableCell>
                          <TableCell sx={{ color: colors.slateGray }}>
                            {request.created_date}
                          </TableCell>
                          <TableCell sx={{ color: colors.slateGray }}>
                            {request.form_status === "0"
                              ? "Not approve yet"
                              : ""}
                          </TableCell>
                          <TableCell>
                            <Link
                              to={`/instructor-form-management/${request.inc_unique_number}`}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: colors.coral, // Accent color for buttons
                                  color: colors.offWhite,
                                  "&:hover": {
                                    backgroundColor: colors.universityBlue, // Primary color on hover
                                  },
                                  marginRight: 1,
                                }}
                              >
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            backgroundColor: colors.teal,
            color: "white", // Ensures text is readable on dark background
            "& .MuiAlert-icon": {
              color: "white", // Makes sure the icon is also readable
            },
            "& .MuiAlert-message": {
              fontWeight: "bold", // Optional: Make the message more prominent
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OnlinePaymentPage;
