import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetINCRequestHODQuery } from "../api/apiSlice";
import { Link } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const colors = {
  universityBlue: "#007BFF", // Main university color
  lightBlue: "#E3F2FD", // Light background for contrast
  darkBlue: "#0056B3", // Darker blue for contrast and active states
  successGreen: "#28A745", // Success messages
  errorRed: "#DC3545", // Error messages
  infoBlue: "#17A2B8", // Info messages
};

const HeadDepartmentComponent = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600); // Adjust breakpoint as needed

  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestHODQuery({ headDepartment_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];

  // Example data
  const totalRequests = 30;
  const pendingRequests = 5;
  const completedRequests = 25;

  const subjectRequests = [
    { subject: "Mathematics 101", count: 10 },
    { subject: "Physics 201", count: 15 },
    { subject: "Chemistry 301", count: 8 },
    { subject: "Biology 401", count: 5 },
    { subject: "Computer Science 101", count: 20 },
    { subject: "History 201", count: 12 },
    { subject: "Literature 301", count: 7 },
    { subject: "Economics 401", count: 9 },
    { subject: "Philosophy 101", count: 6 },
    { subject: "Art History 201", count: 11 },
    { subject: "Music Theory 301", count: 13 },
    { subject: "Sociology 401", count: 14 },
    // Add more subjects and counts as needed
  ];

  const [selectedSubject, setSelectedSubject] = useState(null);

  const chartData = {
    labels: selectedSubject
      ? [selectedSubject.subject]
      : subjectRequests.map((req) => req.subject),
    datasets: [
      {
        label: "Number of Requests",
        data: selectedSubject
          ? [selectedSubject.count]
          : subjectRequests.map((req) => req.count),
        backgroundColor: colors.universityBlue, // University Blue
        borderColor: colors.darkBlue, // Darker Blue
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart fits the container
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.parsed.y;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
  };

  const handleBarClick = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const subject = subjectRequests[index];
      setSelectedSubject(subject);
    }
  };

  const pendingRequestsData = [
    {
      id: 1,
      studentName: "John Doe",
      yearLevel: "3rd Year",
      subject: "Math",
      dateRequested: "2024-08-15",
      grade: "A",
      comment: "Great performance",
      status: "Pending",
    },
    // Add more sample pending requests here
  ];

  const completedRequestsData = [
    {
      id: 2,
      studentName: "Jane Smith",
      yearLevel: "2nd Year",
      subject: "Science",
      dateRequested: "2024-08-10",
      grade: "B",
      comment: "Good work",
      status: "Completed",
    },
    // Add more sample completed requests here
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Department Head Dashboard Content */}
      <Typography
        variant="h6"
        sx={{ color: colors.universityBlue, marginBottom: 2 }}
      >
        Department Head Dashboard
      </Typography>

      <Grid container spacing={3} marginBottom={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#FFFFFF" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.darkBlue }}>
                Total INC Form Requests
              </Typography>
              <Typography variant="h2" sx={{ color: colors.universityBlue }}>
                {incRequestLoading ? (
                  <Typography
                    variant="h2"
                    component="p"
                    style={{ color: colors.slateGray }}
                  >
                    <CircularProgress sx={{ color: colors.universityBlue }} />
                  </Typography>
                ) : incRequestError ? (
                  <Typography
                    variant="h2"
                    component="p"
                    style={{ color: colors.slateGray }}
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography
                    variant="h2"
                    component="p"
                    sx={{ color: colors.universityBlue, fontWeight: "bold" }}
                  >
                    {
                      requestIncForms.filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.cashier_status !== "0" &&
                          request.head_department_status === "0"
                      ).length
                    }
                  </Typography>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#FFFFFF" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.darkBlue }}>
                Pending INC Form Requests
              </Typography>
              <Typography variant="h2" sx={{ color: colors.universityBlue }}>
                {incRequestLoading ? (
                  <Typography
                    variant="h2"
                    component="p"
                    style={{ color: colors.slateGray }}
                  >
                    <CircularProgress sx={{ color: colors.universityBlue }} />
                  </Typography>
                ) : incRequestError ? (
                  <Typography
                    variant="h2"
                    component="p"
                    style={{ color: colors.slateGray }}
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography
                    variant="h2"
                    component="p"
                    sx={{ color: colors.universityBlue, fontWeight: "bold" }}
                  >
                    {
                      requestIncForms.filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.cashier_status !== "0" &&
                          request.head_department_status === "0"
                      ).length
                    }
                  </Typography>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#FFFFFF" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.darkBlue }}>
                Completed INC Form Requests
              </Typography>
              <Typography variant="h2" sx={{ color: colors.universityBlue }}>
                {incRequestLoading ? (
                  <Typography
                    variant="h2"
                    component="p"
                    style={{ color: colors.slateGray }}
                  >
                    <CircularProgress sx={{ color: colors.universityBlue }} />
                  </Typography>
                ) : incRequestError ? (
                  <Typography
                    variant="h2"
                    component="p"
                    style={{ color: colors.slateGray }}
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography
                    variant="h2"
                    component="p"
                    sx={{ color: colors.universityBlue, fontWeight: "bold" }}
                  >
                    {
                      requestIncForms.filter(
                        (request) =>
                          request.instructor_status !== "0" &&
                          request.cashier_status !== "0" &&
                          request.head_department_status === "0"
                      ).length
                    }
                  </Typography>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        sx={{ color: colors.universityBlue, marginBottom: 2 }}
      >
        Pending Requests
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#FFFFFF" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Student Name
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Subject Code
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Subject Name
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Date Requested
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                  (request) =>
                    request.instructor_status !== "0" &&
                    request.cashier_status !== "0" &&
                    request.head_department_status === "0"
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
                        request.cashier_status !== "0" &&
                        request.head_department_status === "0"
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
                          {request.form_status === "0" ? "Not approve yet" : ""}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/hod-form-management/${request.inc_unique_number}`}
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
      </TableContainer>

      <Typography
        variant="h6"
        sx={{ color: colors.universityBlue, marginTop: 4, marginBottom: 2 }}
      >
        Approved Requests History
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#FFFFFF" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Student Name
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Subject Code
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Subject Name
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Date Requested
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: colors.slateGray, fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                  (request) =>
                    request.instructor_status !== "0" &&
                    request.cashier_status !== "0" &&
                    request.head_department_status === "0"
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
                        request.cashier_status !== "0" &&
                        request.head_department_status === "0"
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
                          {request.form_status === "0" ? "Not approve yet" : ""}
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chart */}
      <Grid item xs={12}>
        <Card sx={{ backgroundColor: "#FFFFFF", padding: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: colors.darkBlue }}
            >
              Subject Request Overview
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "400px", // Adjust height as needed for responsiveness
                overflow: "hidden", // Hide overflow to ensure the chart fits
              }}
            >
              <Bar
                data={chartData}
                options={chartOptions}
                onClick={handleBarClick}
              />
            </Box>
            {selectedSubject && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" component="p">
                  {`Subject: ${selectedSubject.subject}`}
                </Typography>
                <Typography variant="body1">
                  {`Number of Requests: ${selectedSubject.count}`}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.universityBlue,
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: colors.darkBlue,
                    },
                    marginTop: 1,
                  }}
                  onClick={() => setSelectedSubject(null)}
                >
                  Close Details
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default HeadDepartmentComponent;
