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
} from "@mui/material";
import InstructorComponent from "../../components/InstructorComponent";
import HeadDepartmentComponent from "../../components/HeadDepartmentComponent";

const colors = {
  universityBlue: "#007BFF", // Main university color
  lightBlue: "#E3F2FD", // Light background for contrast
  darkBlue: "#0056B3", // Darker blue for contrast and active states
  successGreen: "#28A745", // Success messages
  errorRed: "#DC3545", // Error messages
  infoBlue: "#17A2B8", // Info messages
};

const CombinedDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600); // Adjust breakpoint as needed

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
    <Container
      sx={{
        paddingBottom: "24px",
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.lightBlue,
        transition: "width 0.3s", // Smooth transition for width
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: colors.universityBlue,
          color: "#FFFFFF", // White for text
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        DASHBOARD
      </Paper>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        centered
        TabIndicatorProps={{ style: { backgroundColor: colors.successGreen } }}
        sx={{
          "& .MuiTab-root": { color: colors.darkBlue },
          "& .Mui-selected": { color: colors.universityBlue },
          marginBottom: 2,
        }}
      >
        <Tab label="Instructor Dashboard" />
        <Tab label="Department Head Dashboard" />
      </Tabs>

      {tabValue === 0 && (
        <>
          {/* Instructor Dashboard Content */}
          <InstructorComponent />
        </>
      )}

      {tabValue === 1 && (
        <>
          {/* Head Department Dashboard Content */}
          <HeadDepartmentComponent />
        </>
      )}
    </Container>
  );
};

export default CombinedDashboard;
