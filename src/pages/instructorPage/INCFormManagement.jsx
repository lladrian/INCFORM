import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetINCRequestInstructorQuery } from "../../api/apiSlice";
import { Link } from "react-router-dom";

// Define your color scheme
const colors = {
  universityBlue: "#007BFF", // Main university color
  darkBlue: "#0056B3", // Darker blue for contrast
  lightBlue: "#E3F2FD", // Light background for contrast
  slateGray: "#2F4F4F", // Text and border color
  lightGray: "#F5F5F5", // Background color
  offWhite: "#FAFAFA", // Form input and card background
  coral: "#FF6F61", // Accent color for buttons and notifications
};

const INCFormManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestInstructorQuery({ instructor_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];

  const requests = [
    {
      id: "1",
      studentName: "Jane Doe",
      subject: "Math 101",
      dateRequested: "2024-08-10",
      grade: "",
      comment: "",
      status: "Pending",
    },
    {
      id: "2",
      studentName: "John Smith",
      subject: "Physics 201",
      dateRequested: "2024-08-05",
      grade: "B",
      comment: "Good effort",
      status: "Approved",
    },
    // Add more requests as needed
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setGrade(request.grade || "");
    setComment(request.comment || "");
    setIsModalOpen(true);
  };

  const handleApproveRequest = () => {
    // Implement approval logic, update the request with new grade/comment
    console.log("Approving request:", selectedRequest, grade, comment);
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleRejectRequest = () => {
    // Implement rejection logic, update the request with rejection message
    console.log("Rejecting request:", selectedRequest, rejectionMessage);
    setIsRejectModalOpen(false);
    setSelectedRequest(null);
  };

  // Filter logic to display only pending requests based on search query
  const filteredRequests = requests.filter((request) => {
    const matchesSearchQuery =
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return request.status === "Pending" && matchesSearchQuery; // Show only pending requests
  });

  return (
    <Container
      sx={{
        padding: "24px",
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.lightGray,
        transition: "width 0.3s", // Smooth transition for width
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: colors.universityBlue,
          color: colors.offWhite,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        INC Form Management
      </Paper>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by student name or subject"
        sx={{
          backgroundColor: colors.offWhite, // Background for search input
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.slateGray, // Border color for search input
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClearSearch}
                edge="end"
                sx={{
                  visibility: searchQuery ? "visible" : "hidden", // Only show the clear button when there is input
                  color: colors.slateGray,
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, backgroundColor: colors.offWhite }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.universityBlue }}>
              <TableCell sx={{ color: colors.offWhite }}>#</TableCell>
              <TableCell sx={{ color: colors.offWhite }}>
                Student Name
              </TableCell>
              <TableCell sx={{ color: colors.offWhite }}>
                Subject Code
              </TableCell>
              <TableCell sx={{ color: colors.offWhite }}>
                Subject Name
              </TableCell>

              <TableCell sx={{ color: colors.offWhite }}>
                Date Requested
              </TableCell>

              <TableCell sx={{ color: colors.offWhite }}>Status</TableCell>
              <TableCell sx={{ color: colors.offWhite }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <>
              {incRequestLoading
                ? Array.from({ length: 5 }).map((_, index) => (
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
                : requestIncForms
                    .filter(
                      (request) =>
                        request.instructor_status === "0" &&
                        request.instructor_date === null
                    )
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>1</TableCell>
                        <TableCell>{request.student_fullname}</TableCell>
                        <TableCell>{request.subject_code}</TableCell>

                        <TableCell>{request.description}</TableCell>
                        <TableCell>{request.created_date}</TableCell>

                        <TableCell>
                          {request.form_status == "0" ? "Pending" : "Completed"}
                        </TableCell>
                        <TableCell>
                          <>
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

                            <Button
                              variant="outlined"
                              sx={{
                                color: colors.coral, // Accent color for reject button
                                borderColor: colors.coral,
                                "&:hover": {
                                  backgroundColor: colors.lightGray, // Background color on hover
                                },
                              }}
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsRejectModalOpen(true);
                              }}
                            >
                              Approve
                            </Button>
                          </>
                        </TableCell>
                      </TableRow>
                    ))}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default INCFormManagement;
