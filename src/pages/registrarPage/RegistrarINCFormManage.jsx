import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { useGetINCRequestRegistrarQuery } from "../../api/apiSlice";

const RegistrarINCFormManage = () => {
  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest, // Default to an empty array
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestRegistrarQuery({ registrar_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];

  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedForms, setSelectedForms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFormDetails, setSelectedFormDetails] = useState(null);

  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleComplete = () => {
    // Assuming you want to mark selected forms as "Completed"
    // without relying on checkboxes
    setIncForms((prevForms) =>
      prevForms.map((form) =>
        selectedForms.includes(form.id)
          ? { ...form, status: "Completed" }
          : form
      )
    );
    setSelectedForms([]);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleViewDetails = (form) => {
    setSelectedFormDetails(form);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFormDetails(null);
  };

  const filteredForms = requestIncForms.filter((form) => {
    const statusCheck =
      form.instructor_status !== "0" &&
      form.cashier_status !== "0" &&
      form.head_department_status !== "0" &&
      form.registrar_status === "0" &&
      form.form_status === "0";

    const departmentMatch =
      selectedDepartment === "" || form.department_name === selectedDepartment;

    const searchMatch =
      form.student?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.department_name?.toLowerCase().includes(searchQuery.toLowerCase());

    return statusCheck && departmentMatch && searchMatch;
  });

  // Define your color scheme
  const colors = {
    teal: "#008080", // Primary color
    slateGray: "#2F4F4F", // Text and border color
    lightGray: "#F5F5F5", // Background color
    offWhite: "#FAFAFA", // Form input and card background
    coral: "#FF6F61", // Accent color for buttons and notifications
  };

  return (
    <Container>
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
        INC FORM MANAGEMENT
      </Paper>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                label="Department"
              >
                <MenuItem value="">All Departments</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                {/* Add more departments as needed */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        {incRequestLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <CircularProgress sx={{ color: colors.teal }} />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "student"}
                    direction={orderBy === "student" ? sortDirection : "asc"}
                    onClick={() => handleSort("student")}
                  >
                    Student Name
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel>Subject Code</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Subject Name</TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel>Program</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Instructor</TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? sortDirection : "asc"}
                    onClick={() => handleSort("date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredForms.map((form, index) => (
                <TableRow key={form.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{form.student_id_number}</TableCell>
                  <TableCell>{form.student_fullname}</TableCell>
                  <TableCell>{form.subject_code}</TableCell>
                  <TableCell>{form.description}</TableCell>

                  <TableCell>{form.course_name}</TableCell>
                  <TableCell>{form.instructor_fullname}</TableCell>
                  <TableCell>{form.created_date}</TableCell>
                  <TableCell>
                    {form.form_status === "0" ? "Pending" : "Completed"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewDetails(form)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Form Details</DialogTitle>
        <DialogContent>
          {selectedFormDetails && (
            <Box>
              <Typography variant="body1">
                <strong>ID:</strong> {selectedFormDetails.id}
              </Typography>
              <Typography variant="body1">
                <strong>Student:</strong> {selectedFormDetails.student}
              </Typography>

              <Typography variant="body1">
                <strong>Department:</strong> {selectedFormDetails.department}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong>{" "}
                {format(new Date(selectedFormDetails.date), "yyyy-MM-dd")}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedFormDetails.status}
              </Typography>
              {/* Add more details if needed */}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RegistrarINCFormManage;
