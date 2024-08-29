import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
  Box,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  StepButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemText,
  ListItem,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  useGetINCRequestHODQuery,
  useHODApproveFormMutation,
  useInstructorApproveFormMutation,
} from "../../../api/apiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridForm from "../../../components/GridForm";
import OtpComponent from "../../../components/OtpComponent"; // Import OTP Component

import "../style.css"; // Ensure this path is correct

const colors = {
  maroon: "#d30707", // Primary color for headers, key sections, main buttons
  darkMaroon: "#b70707", // Hover states, secondary buttons, subtle highlights
  white: "#fffffd", // Main background color for a clean appearance
  offWhite: "#FAFAFA", // Backgrounds for sections or cards to create depth
  lightGray: "#F5F5F5", // Backgrounds for less prominent areas, borders, separators
  gray: "#d3d3d3", // Secondary text, borders, or subtle elements
  black: "#000000", // Main text for high contrast and readability
  teal: "#008080", // Accent color for highlights, secondary buttons, call-to-action elements
  slateGray: "#2F4F4F", // Text and icons where strong readability is needed
  coral: "#FF6F61", // Accent color for highlights, call-to-action elements
};

const steps = [
  "Form Submitted",
  "Instructor Approval",
  "Cashier Payment",
  "Department Head Approval",
  "Registrar Final Approval",
  "Completed",
];

const HODINCStudentDetails = () => {
  const { id: incID } = useParams();
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState();
  const [mfaCode, setMfaCode] = useState("");
  const [stepIndex, setStepIndex] = useState(0); // To manage dialog steps

  const [HODApproveForm, { isLoading }] = useHODApproveFormMutation();

  const uniqueID = localStorage.getItem("uniqueID");

  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestHODQuery({ headDepartment_unique_id: uniqueID });

  const requestIncForms = incRequest?.request_inc_forms || [];

  const [routeStatus, setRouteStatus] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Filter statusRoute based on incID
    const statusRoute = requestIncForms.filter(
      (request) => request.inc_unique_number === incID
    );

    if (statusRoute.length > 0) {
      const statuses = statusRoute.map((form) => ({
        head_department_status: form.head_department_status,
        cashier_status: form.cashier_status,
        instructor_status: form.instructor_status,
        registrar_status: form.registrar_status,
        payment_status: form.payment_status,
        form_status: form.form_status,
      }));

      setRouteStatus(statuses);

      // Log only when routeStatus is first set
    }
  }, [requestIncForms, incID]); // Dependencies updated to include both props

  useEffect(() => {
    routeStatus.forEach((status) => {
      // Perform any side effects or operations here

      if (status.instructor_status !== "0") {
        setCurrentStep(2);
      }
      if (status.cashier_status !== "0" && status.instructor_status === "1") {
        setCurrentStep(3);
      }
      if (
        status.head_department_status !== "0" &&
        status.cashier_status === "1"
      ) {
        setCurrentStep(4);
      }
      if (
        status.registrar_status !== "0" &&
        status.head_department_status === "1"
      ) {
        setCurrentStep(5);
      }
      if (
        status.form_status !== "0" &&
        status.registrar_status !== "0" &&
        status.head_department_status !== "0" &&
        status.cashier_status !== "0" &&
        status.instructor_status !== "0"
      ) {
        setCurrentStep(6);
      }
    });
  }, [routeStatus]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setGcashDetails("");
  };

  const colors = {
    universityBlue: "#007BFF", // Main university color
    darkBlue: "#0056B3", // Darker blue for contrast
    lightBlue: "#E3F2FD", // Light background for contrast
    slateGray: "#2F4F4F", // Text and border color
    lightGray: "#F5F5F5", // Background color
    offWhite: "#FAFAFA", // Form input and card background
    coral: "#FF6F61", // Accent color for buttons and notifications
    teal: "#008080",
  };

  const approvalSteps = ["MFA Verification"];

  const handleClick = (index) => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setStepIndex(0);
    setGrade("");
    setMfaCode("");
  };

  const handleSubmit = async () => {
    try {
      const response = await HODApproveForm({
        inc_unique_number: incID,
        credentials: {
          head_department_status: 1,
        },
      }).unwrap();

      console.log("Form submitted successfully:", response);
      setOpen(false); // Open the dialog
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        INC REQUEST DETAITLS
      </Paper>

      <Paper
        elevation={3}
        style={{ padding: "24px", backgroundColor: colors.offWhite }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                color: colors.slateGray,
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                },
                fontWeight: "bold",
              }}
            >
              Request ID: {incID}
            </Typography>
            <Divider />
            <Box marginTop="16px">
              <div>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        color: colors.slateGray,
                        fontSize: {
                          xs: "1rem",
                          sm: "1.25rem",
                        },
                      }}
                    >
                      <strong> Removal/Completion Form Information</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {incRequestLoading ? (
                      <Grid container spacing={2}>
                        {/* Adjust Skeleton components to match the grid layout */}
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        {/* Add more Grid items with Skeleton components as needed */}
                      </Grid>
                    ) : incRequestError ? (
                      <Typography
                        variant="h6"
                        style={{
                          color: colors.maroon,
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        Error loading data
                      </Typography>
                    ) : (
                      <>
                        {requestIncForms
                          .filter(
                            (request) => request.inc_unique_number === incID
                          )
                          .map((form, index) => (
                            <Grid container spacing={2} key={index}>
                              <GridForm
                                name="Subject Code:"
                                data={form.subject_code}
                                index={index}
                              />
                              <GridForm
                                name="Subject Name:"
                                data={form.description}
                                index={index}
                              />
                              <GridForm
                                name="Subject Units:"
                                data={form.subject_units}
                                index={index}
                              />
                              <GridForm
                                name="Amount:"
                                data={`₱${form.amount}`}
                                index={index}
                              />

                              <GridForm
                                name="S.Y. Taken:"
                                data={form.school_year_taken}
                                index={index}
                              />
                              <GridForm
                                name="Semester:"
                                data={
                                  form.semester_id === "1"
                                    ? "1st"
                                    : form.semester_id === "2"
                                    ? "2nd"
                                    : "Summer"
                                }
                                index={index}
                              />

                              <GridForm
                                name="Course/Yr:"
                                data={`${form.course_abbreviation} - ${
                                  form.academic_year_id === "1"
                                    ? "1st Year"
                                    : form.academic_year_id === "2"
                                    ? "2nd Year"
                                    : form.academic_year_id === "3"
                                    ? "3rd Year"
                                    : form.academic_year_id === "4"
                                    ? "4th Year"
                                    : "5th Year"
                                }`}
                                index={index}
                              />

                              <GridForm
                                name="Instructor Name:"
                                data={form.instructor_fullname}
                                index={index}
                              />
                              <GridForm
                                name="Removal/Completion Grade:"
                                data={form.grade}
                                index={index}
                              />
                              <GridForm
                                name="Remark:"
                                data={form.remark}
                                index={index}
                              />
                              <GridForm
                                name="Date Requested:"
                                data={form.created_date}
                                index={index}
                              />
                              <GridForm
                                name="Status:"
                                data={
                                  form.form_status === "0"
                                    ? "Pending"
                                    : "Completed"
                                }
                                index={index}
                              />
                            </Grid>
                          ))}
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        color: colors.slateGray,
                        fontSize: {
                          xs: "1rem",
                          sm: "1.25rem",
                        },
                      }}
                    >
                      <strong>Additional Information</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {incRequestLoading ? (
                      <Grid container spacing={2}>
                        {/* Adjust Skeleton components to match the grid layout */}
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Skeleton variant="text" width="100%" />
                        </Grid>
                        {/* Add more Grid items with Skeleton components as needed */}
                      </Grid>
                    ) : incRequestError ? (
                      <Typography
                        variant="h6"
                        style={{
                          color: colors.maroon,
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        Error loading data
                      </Typography>
                    ) : (
                      <>
                        {requestIncForms
                          .filter(
                            (request) => request.inc_unique_number === incID
                          )
                          .map((form, index) => (
                            <Grid container spacing={2} key={index}>
                              {/* Added Grid item with a size */}
                              <GridForm
                                name="Instructor Name:"
                                data={form.instructor_fullname}
                              />
                              <GridForm
                                name="Approved date:"
                                data={form.instructor_date}
                              />
                              <GridForm
                                name="Head Department Name:"
                                data={form.head_department_fullname}
                              />
                              <GridForm
                                name="Approved date:"
                                data={form.head_department_date}
                              />
                              <GridForm
                                name="Cashier Name:"
                                data={form.instructor_fullname}
                              />
                              <GridForm
                                name="Approved date:"
                                data={form.cashier_date}
                              />
                              <GridForm
                                name="Head Registrar Name:"
                                data={form.registrar_fullname}
                              />
                              <GridForm
                                name="Approved date:"
                                data={form.registrar_date}
                              />
                              <GridForm
                                name="Registrar Name:"
                                data={form.registrar_fullname}
                              />
                              <GridForm
                                name="Finalized date:"
                                data={form.completion_date}
                              />
                            </Grid>
                          ))}
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
            <Divider style={{ margin: "24px 0" }} />
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                color: colors.slateGray,
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                },
                fontWeight: "bold",
              }}
            >
              Routing Status
            </Typography>

            <Stepper
              activeStep={currentStep}
              alternativeLabel
              style={{
                padding: "16px 0",
                overflowX: "auto", // Allows horizontal scrolling if needed
              }}
            >
              {steps.map((label, index) => (
                <Step
                  key={index}
                  onClick={() => handleClick(index)}
                  sx={{
                    "& .MuiStepLabel-root": {
                      color:
                        index === 3 && currentStep === 3
                          ? colors.teal // Use coral color for the specified condition
                          : colors.slateGray,
                      fontSize: {
                        xs: "0.625rem",
                        sm: "0.75rem",
                      },
                      transition: "color 0.3s ease",
                    },
                    "& .MuiStepConnector-line": {
                      borderColor:
                        index === 3 && currentStep === 3
                          ? colors.teal // Use coral color for the connector line
                          : colors.slateGray,
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover": {
                      cursor:
                        index === 3 && currentStep === 3
                          ? "pointer"
                          : "default",
                      transform:
                        index === 3 && currentStep === 3
                          ? "scale(1.05)"
                          : "none",
                      transition: "transform 0.3s ease",
                    },
                  }}
                >
                  <StepLabel
                    sx={{
                      ...(index === 3 && currentStep === 3
                        ? {
                            animation: "pulse-animation 1s infinite",
                          }
                        : {}),
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
              <DialogTitle
                sx={{
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="h6" component="div">
                  Step Information
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Stepper activeStep={stepIndex} alternativeLabel>
                    {approvalSteps.map((label) => (
                      <Step key={label}>
                        <StepLabel sx={{ color: "#1976d2" }}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Grid container spacing={3}>
                  (
                  <Grid item xs={12}>
                    <OtpComponent onVerify={() => alert("Verified")} />
                  </Grid>
                  )
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{ backgroundColor: "#f5f5f5", padding: "16px" }}
              >
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Approve
                </Button>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    borderColor: "#d32f2f",
                    color: "#d32f2f",
                    "&:hover": { borderColor: "#b71c1c", color: "#b71c1c" },
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
        <Box marginTop="24px" display="flex" justifyContent="space-between">
          <Link to="/inc-form-management">
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.maroon,
                color: colors.white,
                marginRight: "8px",
                fontSize: { xs: "0.65rem", sm: "0.875rem" },
              }}
            >
              Back to List
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default HODINCStudentDetails;
