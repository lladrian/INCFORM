import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useGetINCRequestInstructorQuery } from "../../api/apiSlice";
import TableComponent from "../../components/TableComponent";
import SubjectRequestChart from "../../components/SubjectRequestChart";
import IncFormRequestsCard from "../../components/IncFormRequestsCard";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const InstructorDashboard = () => {
  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestInstructorQuery({ instructor_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];

  const totalIncRequests = requestIncForms.length;

  const pendingIncRequests = requestIncForms.filter(
    (request) =>
      request.instructor_status === "0" && request.instructor_date === null
  ).length;

  const completedIncRequests = requestIncForms.filter(
    (request) =>
      request.instructor_status !== "0" && request.instructor_date !== null
  ).length;

  // Expanded Data for the chart
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
        backgroundColor: "#007BFF", // University Blue
        borderColor: "#0056B3", // Darker Blue
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

  const handleCloseDetails = () => {
    setSelectedSubject(null);
  };

  const colors = {
    universityBlue: "#007BFF", // Main university color
    lightBlue: "#E3F2FD", // Light background for contrast
    darkBlue: "#0056B3", // Darker blue for contrast and active states
    successGreen: "#28A745", // Success messages
    errorRed: "#DC3545", // Error messages
    infoBlue: "#17A2B8", // Info messages
    slateGray: "#2F4F4F", // Text and border color
    lightGray: "#F5F5F5", // Background color
    offWhite: "#FAFAFA", // Form input and card background
    coral: "#FF6F61", // Accent color for buttons and notifications
  };

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
        Instructor Dashboard
      </Paper>

      <Grid container spacing={4} mb={4}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <IncFormRequestsCard
            title="Total INC Form Requests"
            loading={incRequestLoading}
            error={incRequestError}
            count={totalIncRequests}
            colors={colors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <IncFormRequestsCard
            title="Pending INC Form Requests"
            loading={incRequestLoading}
            error={incRequestError}
            count={pendingIncRequests}
            colors={colors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <IncFormRequestsCard
            title="Completed INC Form Requests"
            loading={incRequestLoading}
            error={incRequestError}
            count={completedIncRequests}
            colors={colors}
          />
        </Grid>

        {/* Pending Requests Table */}
        <Grid item xs={12}>
          <TableComponent
            title="Pending Requests"
            data={requestIncForms}
            loading={incRequestLoading}
            filterCondition={(request) => request.instructor_status === "0"}
            viewPath="/instructor-form-management"
            noDataMessage="No INC Form Requests"
            colors={colors}
          />

          <TableComponent
            title="Approved Requests History"
            data={requestIncForms}
            loading={incRequestLoading}
            filterCondition={(request) => request.instructor_status !== "0"}
            viewPath="/archive"
            noDataMessage="No INC Form Requests"
            colors={colors}
          />
        </Grid>

        <Grid item xs={12}>
          <SubjectRequestChart
            chartData={chartData}
            chartOptions={chartOptions}
            selectedSubject={selectedSubject}
            handleBarClick={handleBarClick}
            handleCloseDetails={handleCloseDetails}
            colors={colors}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorDashboard;
