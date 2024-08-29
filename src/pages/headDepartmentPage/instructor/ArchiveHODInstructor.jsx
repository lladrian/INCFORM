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
import { useGetINCRequestInstructorQuery } from "../../../api/apiSlice";
import { Link } from "react-router-dom";

const colors = {
  universityBlue: "#007BFF",
  darkBlue: "#0056B3",
  lightBlue: "#E3F2FD",
  slateGray: "#2F4F4F",
  lightGray: "#F5F5F5",
  offWhite: "#FAFAFA",
  coral: "#FF6F61",
};

const ArchiveHODInstructor = () => {
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

  return (
    <Container
      sx={{
        padding: "24px",
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
          backgroundColor: colors.universityBlue,
          color: colors.offWhite,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Approved Requests History
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
          backgroundColor: colors.offWhite,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.slateGray,
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

              <TableCell sx={{ color: colors.offWhite }}>Grade</TableCell>
              <TableCell sx={{ color: colors.offWhite }}>Remark</TableCell>
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
                      <td style={{ padding: "0.75rem", textAlign: "left" }}>
                        <Skeleton variant="text" width="100%" />
                      </td>
                    </tr>
                  ))
                : requestIncForms
                    .filter(
                      (request) =>
                        request.instructor_status !== "0" &&
                        request.instructor_date !== null
                    )
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>1</TableCell>
                        <TableCell>{request.student_fullname}</TableCell>
                        <TableCell>{request.subject_code}</TableCell>

                        <TableCell>{request.description}</TableCell>
                        <TableCell>{request.created_date}</TableCell>

                        <TableCell>{request.grade}</TableCell>
                        <TableCell>{request.remark}</TableCell>
                        <TableCell>
                          <>
                            <Link
                              to={`/myinc-requests/${request.inc_unique_number}`}
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
                              Edit
                            </Button>
                          </>
                        </TableCell>
                      </TableRow>
                    ))}
            </>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.universityBlue,
            color: colors.offWhite,
          }}
        >
          Edit Request
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.offWhite }}>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Student:</strong> {selectedRequest?.studentName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Subject:</strong> {selectedRequest?.subject}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Grade:</strong> {selectedRequest?.grade}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Comment:</strong> {selectedRequest?.comment}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: colors.offWhite,
          }}
        >
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.coral,
              color: colors.offWhite,
              "&:hover": {
                backgroundColor: colors.universityBlue,
              },
            }}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ArchiveHODInstructor;
