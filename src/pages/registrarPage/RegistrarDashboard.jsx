import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Paper,
  Box,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  useGetDepartmentsQuery,
  useGetINCRequestRegistrarQuery,
} from "../../api/apiSlice";

const departmentColors = {
  Mathematics: "#1f77b4",
  Science: "#ff7f0e",
  Humanities: "#2ca02c",
  Engineering: "#d62728",
  IT: "#9467bd",
};

const RegistrarDashboard = () => {
  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestRegistrarQuery({ registrar_unique_id: uniqueID });
  const {
    data: departments,
    error: departmentError,
    isLoading: departmentLoading,
  } = useGetDepartmentsQuery();

  const requestIncForms = incRequest?.request_inc_forms || [];

  const summaryData = {
    totalReceived: 150,
    finalized: 120,
    pending: 30,
    byDepartment: {
      Mathematics: 30,
      Science: 25,
      Humanities: 20,
      Engineering: 40,
      IT: 35,
    },
    yearlyData: [
      {
        year: "2020",
        Mathematics: 10,
        Science: 12,
        Humanities: 8,
        Engineering: 15,
        IT: 20,
      },
      {
        year: "2021",
        Mathematics: 15,
        Science: 18,
        Humanities: 10,
        Engineering: 25,
        IT: 30,
      },
      {
        year: "2022",
        Mathematics: 20,
        Science: 25,
        Humanities: 15,
        Engineering: 30,
        IT: 35,
      },
      {
        year: "2023",
        Mathematics: 30,
        Science: 25,
        Humanities: 20,
        Engineering: 40,
        IT: 35,
      },
    ],
  };

  const colors = {
    teal: "#008080",
    coral: "#FF6F61",
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: colors.teal,
          color: "#FAFAFA",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        DASHBOARD
      </Paper>

      {/* Summary Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total INC Forms Received</Typography>
              <Typography variant="h4">
                {incRequestLoading ? (
                  <CircularProgress sx={{ color: colors.teal }} />
                ) : (
                  requestIncForms.filter(
                    (request) =>
                      request.instructor_status !== "0" &&
                      request.cashier_status !== "0" &&
                      request.head_department_status !== "0"
                  ).length
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Finalized INC Forms</Typography>
              <Typography variant="h4">
                {incRequestLoading ? (
                  <CircularProgress sx={{ color: colors.teal }} />
                ) : (
                  requestIncForms.filter(
                    (request) =>
                      request.instructor_status !== "0" &&
                      request.cashier_status !== "0" &&
                      request.head_department_status !== "0" &&
                      request.registrar_status !== "0" &&
                      request.form_status !== "0"
                  ).length
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending INC Forms</Typography>
              <Typography variant="h4">
                {incRequestLoading ? (
                  <CircularProgress sx={{ color: colors.teal }} />
                ) : (
                  requestIncForms.filter(
                    (request) =>
                      request.instructor_status !== "0" &&
                      request.cashier_status !== "0" &&
                      request.head_department_status !== "0" &&
                      request.registrar_status === "0" &&
                      request.form_status === "0"
                  ).length
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginBottom: 3 }} />

      {/* INC Forms by Department */}
      <Typography variant="h5" gutterBottom>
        INC Forms by Department
      </Typography>
      <Grid container spacing={3}>
        {departmentLoading || !departments?.departments ? (
          <>
            {Array.from(Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "120px" }}>
                  <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <>
            {departments.departments.map((department) => (
              <Grid item xs={12} sm={6} md={4} key={department.id}>
                <Card sx={{ height: "120px" }}>
                  <CardContent>
                    <Typography variant="h6">
                      {department.department_name}
                    </Typography>
                    <Typography variant="h5">
                      {incRequestLoading ? (
                        <CircularProgress sx={{ color: colors.teal }} />
                      ) : (
                        requestIncForms.filter(
                          (request) =>
                            request.department_id === department.id &&
                            request.instructor_status !== "0" &&
                            request.cashier_status !== "0" &&
                            request.head_department_status !== "0" &&
                            request.registrar_status === "0" &&
                            request.form_status === "0"
                        ).length
                      )}{" "}
                      forms received
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Yearly INC Forms Data */}
      <Typography variant="h5" gutterBottom>
        Yearly INC Forms Data
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={summaryData.yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(departmentColors).map((department) => (
            <Bar
              key={department}
              dataKey={department}
              fill={departmentColors[department]}
              name={department}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default RegistrarDashboard;
