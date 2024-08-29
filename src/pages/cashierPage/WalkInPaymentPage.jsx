import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetINCRequestCashierQuery } from "../../api/apiSlice";

// Placeholder for colors
const colors = {
  teal: "#008080", // Primary color
  coral: "#FF6F61", // Accent color for buttons and notifications
  lightGray: "#F5F5F5", // Background color
};

const WalkInPaymentPage = () => {
  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestCashierQuery();

  const requestIncForms = incRequest?.request_inc_forms || [];

  const [searchId, setSearchId] = useState(""); // State for the search input
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faceToFacePayments, setFaceToFacePayments] = useState([
    {
      id: "3",
      studentId: "2021-31087",
      studentName: "Emily Davis",
      subject: "Chemistry 301",
      units: 3, // Units field
      status: "Pending",
    },
    {
      id: "4",
      studentId: "2021-31088",
      studentName: "Michael Brown",
      subject: "Biology 101",
      units: 2, // Units field
      status: "Pending",
    },
    // Add more example data as needed
  ]);

  const handleApprovePayment = () => {
    if (transactionDetails) {
      // Update payment status in the state
      setFaceToFacePayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === transactionDetails.id
            ? { ...payment, status: "Completed" }
            : payment
        )
      );
      setIsModalOpen(false);
      setTransactionDetails(null);
      alert(
        `Payment for Student ID ${transactionDetails.studentId} has been approved!`
      );
    }
  };

  // Filter payments based on the searchId
  const filteredPayments = faceToFacePayments.filter((payment) =>
    payment.studentId.includes(searchId)
  );

  // Calculate the amount based on units
  const calculateAmount = (units) => {
    return `₱${units * 50}`; // 50 per unit
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
        WALK-IN PAYMENT
      </Paper>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Face-to-Face Payment Processing
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <TextField
            label="Search by EVSU ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} // Update searchId on change
          />
        </Paper>

        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Student ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Student Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Subject</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Units</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Amount</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Actions</Typography>
                </TableCell>
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
                      request.cashier_status === "0"
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
                          request.cashier_status === "0"
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
                              to={`/walk-in-Details/${request.inc_unique_number}`}
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

      {/* Approve Payment Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Approve Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" fontWeight="bold">
            <span>Student ID:</span> {transactionDetails?.studentId}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <span>Student:</span> {transactionDetails?.studentName}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <span>Subject:</span> {transactionDetails?.subject}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <span>Units:</span> {transactionDetails?.units}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            <span>Amount:</span> {calculateAmount(transactionDetails?.units)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleApprovePayment}
            variant="contained"
            sx={{ backgroundColor: colors.coral }}
          >
            Approve Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WalkInPaymentPage;
