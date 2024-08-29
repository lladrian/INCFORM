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
  TablePagination,
  Skeleton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import { useGetINCRequestInstructorQuery } from "../../../api/apiSlice";

// Updated color scheme
const colors = {
  universityBlue: "#007BFF", // Main university color
  lightBlue: "#E3F2FD", // Light background for contrast
  darkBlue: "#0056B3", // Darker blue for contrast and active states
  successGreen: "#28A745", // Success messages
  errorRed: "#DC3545", // Error messages
  infoBlue: "#17A2B8", // Info messages
};

const HODInstructorFORM = () => {
  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestInstructorQuery({ instructor_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];



  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    console.log("Approving request:", selectedRequest, grade, comment);
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleRejectRequest = () => {
    console.log("Rejecting request:", selectedRequest, rejectionMessage);
    setIsRejectModalOpen(false);
    setSelectedRequest(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearchQuery =
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (tabValue === 0) {
      return request.status === "Pending" && matchesSearchQuery;
    } else if (tabValue === 1) {
      return request.status === "Approved" && matchesSearchQuery;
    }
    return false;
  });

  const paginatedRequests = filteredRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container
      sx={{
        paddingBottom: "24px",
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.lightBlue,
        transition: "width 0.3s",
      }}
    >
      {/* Instructor Banner */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: colors.universityBlue,
          color: colors.lightBlue,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        INSTRUCTOR FUNCTIONALITY
      </Paper>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: colors.universityBlue,
        }}
      >
        INC Form Management
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by student name or subject"
        sx={{
          backgroundColor: colors.lightBlue,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.darkBlue,
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
                  visibility: searchQuery ? "visible" : "hidden",
                  color: colors.darkBlue,
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
        sx={{ marginTop: 3, backgroundColor: colors.lightBlue }}
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: 2 }}
      />

      {/* Approve/Manage Request Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {" "}
        <DialogTitle
          sx={{
            backgroundColor: colors.universityBlue,
            color: colors.lightBlue,
          }}
        >
          {tabValue === 0 ? "Manage Request" : "Edit Request"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.lightBlue }}>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Student:</strong> {selectedRequest?.studentName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Subject:</strong> {selectedRequest?.subject}
          </Typography>
          {tabValue === 0 ? (
            <>
              <TextField
                label="Grade"
                variant="outlined"
                fullWidth
                margin="normal"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                sx={{
                  backgroundColor: colors.lightBlue,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.darkBlue,
                    },
                  },
                }}
              />
              <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{
                  backgroundColor: colors.lightBlue,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.darkBlue,
                    },
                  },
                }}
              />
            </>
          ) : (
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Grade:</strong> {selectedRequest?.grade}
            </Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: colors.lightBlue,
          }}
        >
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancel
          </Button>
          {tabValue === 0 ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.successGreen,
                color: colors.lightBlue,
                "&:hover": {
                  backgroundColor: colors.darkBlue,
                },
              }}
              onClick={handleApproveRequest}
            >
              Confirm
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.successGreen,
                color: colors.lightBlue,
                "&:hover": {
                  backgroundColor: colors.darkBlue,
                },
              }}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Reject Request Dialog */}
      <Dialog
        open={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.universityBlue,
            color: colors.lightBlue,
          }}
        >
          Reject Request
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.lightBlue }}>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Student:</strong> {selectedRequest?.studentName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Subject:</strong> {selectedRequest?.subject}
          </Typography>
          <TextField
            label="Rejection Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={rejectionMessage}
            onChange={(e) => setRejectionMessage(e.target.value)}
            sx={{
              backgroundColor: colors.lightBlue,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.darkBlue,
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: colors.lightBlue,
          }}
        >
          <Button onClick={() => setIsRejectModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.errorRed,
              color: colors.lightBlue,
              "&:hover": {
                backgroundColor: colors.darkBlue,
              },
            }}
            onClick={handleRejectRequest}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HODInstructorFORM;
