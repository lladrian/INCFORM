import React from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

import "../../StudentDashboard.css";
import { useGetINCRequestQuery } from "../../api/apiSlice";

const colors = {
  maroon: "#d30707",
  darkMaroon: "#b70707",
  white: "#fffffd",
  offWhite: "#FAFAFA",
  lightGray: "#F5F5F5",
  gray: "#d3d3d3",
  black: "#000000",
  teal: "#008080",
  slateGray: "#2F4F4F",
  coral: "#FF6F61",
};

const StudentDashboard = () => {
  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestQuery({ student_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: colors.lightGray,
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ color: colors.black }}
        >
          Student Dashboard
        </Typography>

        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              style={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: colors.black }}
                >
                  Total Request Forms
                </Typography>
                {incRequestLoading ? (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    <CircularProgress sx={{ color: "#d30707" }} />
                  </Typography>
                ) : incRequestError ? (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    {requestIncForms.length}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              style={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: colors.black }}
                >
                  Pending Requests
                </Typography>
                {incRequestLoading ? (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    <CircularProgress sx={{ color: "#d30707" }} />
                  </Typography>
                ) : incRequestError ? (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    {
                      requestIncForms.filter((form) => form.form_status === "0")
                        .length
                    }
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              style={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: colors.black }}
                >
                  Completed Requests
                </Typography>
                {incRequestLoading ? (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    <CircularProgress sx={{ color: "#d30707" }} />
                  </Typography>
                ) : incRequestError ? (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h4" style={{ color: colors.maroon }}>
                    {
                      requestIncForms.filter((form) => form.form_status === "1")
                        .length
                    }
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <main style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderBottom: `1px solid ${colors.gray}`,
                }}
              >
                <Typography variant="h6" style={{ color: colors.black }}>
                  Pending Requests
                </Typography>
              </div>
              <div className="table-responsive">
                <table
                  className="min-w-full divide-y divide-gray"
                  style={{ borderCollapse: "collapse", width: "100%" }}
                >
                  <thead
                    style={{
                      backgroundColor: colors.maroon,
                      color: colors.white,
                    }}
                  >
                    <tr>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        #
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Subject Code
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Subject Name
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Instructor
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Status
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Request Date
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      backgroundColor: colors.white,
                      color: colors.black,
                    }}
                  >
                    {incRequestLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
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
                          (request) => request.form_status === "0"
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
                          <>
                            {requestIncForms
                              .filter((request) => request.form_status === "0")
                              .map((request, index) => (
                                <tr
                                  key={request.id}
                                  style={{
                                    borderBottom: `1px solid ${colors.gray}`,
                                  }}
                                >
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    {request.subject_code}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    {request.description}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    {request.instructor_fullname}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    {request.form_status === "0"
                                      ? "Pending"
                                      : "Completed"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    {new Date(
                                      request.created_date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td
                                    style={{
                                      padding: "0.75rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    <Link
                                      to={`/myinc-requests/${request.inc_unique_number}`}
                                      onMouseOver={(e) =>
                                        (e.target.style.color =
                                          colors.darkMaroon)
                                      }
                                      onMouseOut={(e) =>
                                        (e.target.style.color = colors.teal)
                                      }
                                      style={{ textDecoration: "none" }}
                                    >
                                      <Button>View</Button>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
                <Box textAlign="center" sx={{ mt: 2 }}>
                  <Button
                    variant="text"
                    style={{
                      color: colors.teal,
                      borderRadius: "20px",
                      padding: "8px 16px",
                      textDecoration: "none",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.color = colors.darkMaroon)
                    }
                    onMouseOut={(e) => (e.target.style.color = colors.teal)}
                  >
                    View All Pending Requests
                  </Button>
                </Box>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderBottom: `1px solid ${colors.gray}`,
                }}
              >
                <Typography variant="h6" style={{ color: colors.black }}>
                  Completed Requests
                </Typography>
              </div>
              <div className="table-responsive">
                <table
                  className="min-w-full divide-y divide-gray"
                  style={{ borderCollapse: "collapse", width: "100%" }}
                >
                  <thead
                    style={{
                      backgroundColor: colors.maroon,
                      color: colors.white,
                    }}
                  >
                    <tr>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        #
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Subject Code
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Subject Name
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Instructor
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Status
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Grade
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Remarks
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Completion Date
                      </th>
                      <th style={{ padding: "0.75rem", textAlign: "left" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      backgroundColor: colors.white,
                      color: colors.black,
                    }}
                  >
                    {incRequestLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <tr key={index}>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                            <td
                              style={{ padding: "0.75rem", textAlign: "left" }}
                            >
                              <Skeleton variant="text" width="100%" />
                            </td>
                          </tr>
                        ))
                      : requestIncForms
                          .filter((request) => request.form_status === "1")
                          .map((request, index) => (
                            <tr
                              key={request.id}
                              style={{
                                borderBottom: `1px solid ${colors.gray}`,
                              }}
                            >
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {request.subject_code}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {request.description}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {request.instructor_fullname}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                <span style={{ color: colors.maroon }}>
                                  {request.form_status === "0"
                                    ? "Pending"
                                    : "Completed"}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {request.grade}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {request.remarks ? (
                                  <span style={{ color: colors.teal }}>
                                    PASSED
                                  </span>
                                ) : (
                                  <span style={{ color: colors.maroon }}>
                                    FAILED
                                  </span>
                                )}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                {new Date(
                                  request.completion_date
                                ).toLocaleDateString()}
                              </td>
                              <td
                                style={{
                                  padding: "0.75rem",
                                  textAlign: "left",
                                }}
                              >
                                <a
                                  href="#"
                                  style={{
                                    color: colors.teal,
                                    textDecoration: "none",
                                  }}
                                  onMouseOver={(e) =>
                                    (e.target.style.color = colors.darkMaroon)
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.color = colors.teal)
                                  }
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                  </tbody>
                </table>
                <Box textAlign="center" sx={{ mt: 2 }}>
                  <Button
                    variant="text"
                    style={{
                      color: colors.teal,
                      borderRadius: "20px",
                      padding: "8px 16px",
                      textDecoration: "none",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.color = colors.darkMaroon)
                    }
                    onMouseOut={(e) => (e.target.style.color = colors.teal)}
                  >
                    View All Completed Requests
                  </Button>
                </Box>
              </div>
            </Paper>
          </Grid>
        </main>
      </Container>
    </div>
  );
};

export default StudentDashboard;
