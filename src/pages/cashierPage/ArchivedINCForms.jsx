import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Button,
  Checkbox,
} from "@mui/material";
import { useGetINCRequestCashierQuery } from "../../api/apiSlice"; // Import your API hook
import { Link } from "react-router-dom";

const colors = {
  lightGray: "#f1f1f1",
  teal: "#008080",
  universityBlue: "#00509E",
  coral: "#FF6F61",
  offWhite: "#f8f9fa",
  slateGray: "#708090",
};

const ArchivedINCForms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page

  // Fetch data using your custom API hook
  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestCashierQuery();

  // Default to empty array if data is not yet available
  const requestIncForms = incRequest?.request_inc_forms || [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredForms = requestIncForms.filter(
    (request) =>
      request.instructor_status !== "0" &&
      request.instructor_date !== null &&
      request.cashier_date !== null &&
      request.cashier_status !== "0" &&
      (request.student_fullname.toLowerCase().includes(searchQuery) ||
        request.subject_code.toLowerCase().includes(searchQuery) ||
        request.description.toLowerCase().includes(searchQuery))
  );

  // Calculate pagination data
  const paginatedForms = filteredForms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

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
          fontSize: { xs: "1.2rem", sm: "1.4rem" },
        }}
      >
        ARCHIVED INC FORMS
      </Paper>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Search Archived INC Forms
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <TextField
            label="Search by Student Name, ID, or Subject"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Paper>
      </Box>

      <Paper style={{ marginTop: "20px", padding: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Subject Code</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date Requested</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedForms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: colors.universityBlue, fontWeight: "bold" }}
                    >
                      No INC Form Requests
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedForms.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.student_fullname}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.student_id_number}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.subject_code}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.description}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.subject_units}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.instructor_fullname}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.created_date}
                    </TableCell>
                    <TableCell sx={{ color: colors.slateGray }}>
                      {request.form_status === "0" ? "Pending" : "Completed"}
                    </TableCell>
                    <TableCell>
                      <Link to={`/archived-inc/${request.inc_unique_number}`}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: colors.coral,
                            color: colors.offWhite,
                            "&:hover": {
                              backgroundColor: colors.universityBlue,
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
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          style={{ marginTop: "20px" }}
        />
      </Paper>
    </Container>
  );
};

export default ArchivedINCForms;
