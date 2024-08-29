import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useGetINCRequestQuery } from "../../api/apiSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridForm from "../../components/GridForm";

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

const INCRequestDetail = () => {
  const { id: incID } = useParams();
  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [gcashDetails, setGcashDetails] = useState("");
  console.log(incID);
  const uniqueID = localStorage.getItem("uniqueID");
  const {
    data: incRequest,
    error: incRequestError,
    isLoading: incRequestLoading,
  } = useGetINCRequestQuery({ student_unique_id: uniqueID });

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
    setPaymentType("");
    setGcashDetails("");
  };

  const handleMakePayment = () => {
    console.log("Payment process initiated.");
    handleCloseModal();
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleGcashDetailsChange = (event) => {
    setGcashDetails(event.target.value);
  };

  return (
    <Container
      style={{
        padding: "24px",
        paddingTop: "80px",
        backgroundColor: colors.white,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ color: colors.black }}
      >
        INC Request Details
      </Typography>

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
                          .filter((request) => request.inc_unique_number === incID)
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
                          .filter((request) => request.inc_unique_number === incID)
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
                                data={form.cashier_fullname}
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
                  sx={{
                    "& .MuiStepLabel-root": {
                      color: index === 2 ? colors.teal : colors.slateGray,
                      fontSize: {
                        xs: "0.625rem",
                        sm: "0.75rem",
                      },
                    },
                    "& .MuiStepConnector-line": {
                      borderColor: index === 2 ? colors.teal : colors.slateGray,
                    },
                  }}
                >
                  <StepLabel>
                    {label}

                    {index === 2 && currentStep === 2 && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colors.teal,
                          color: colors.white,
                          marginLeft: 1,
                          padding: "4px 8px",
                          fontSize: {
                            xs: "0.625rem",
                            sm: "0.75rem",
                          },
                          borderRadius: 1,
                          textTransform: "none",
                          boxShadow: 2,
                          "&:hover": {
                            backgroundColor: colors.darkMaroon,
                            boxShadow: 4,
                          },
                        }}
                        onClick={handleOpenModal}
                        startIcon={<PaymentsIcon />}
                      >
                        Payment Method
                      </Button>
                    )}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
        <Box marginTop="24px" display="flex" justifyContent="space-between">
          <Link to="/inc-requests">
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

      {/* Payment Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%", // Responsive width
            maxWidth: 400,
            bgcolor: colors.offWhite,
            border: "2px solid",
            borderColor: colors.slateGray,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="payment-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: colors.teal }}
          >
            Choose Payment Method
          </Typography>
          <FormControl fullWidth variant="standard" sx={{ mt: 2 }}>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={paymentType}
              onChange={handlePaymentTypeChange}
              sx={{
                backgroundColor: colors.offWhite,
                borderColor: colors.slateGray,
                "& .MuiSelect-icon": {
                  color: colors.slateGray,
                },
              }}
            >
              <MenuItem value="GCash">GCash</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
          {paymentType === "GCash" && (
            <>
              <TextField
                id="gcash-reference"
                label="GCash Reference Number"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                value={gcashDetails}
                onChange={handleGcashDetailsChange}
              />
              <Typography
                variant="body2"
                sx={{ mt: 2, color: colors.slateGray }}
              >
                Please send your payment to the following GCash number:
                09123456789. After payment, please provide the GCash reference
                number here.
              </Typography>
            </>
          )}
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="error"
              sx={{
                borderColor: colors.slateGray,
                color: colors.slateGray,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleMakePayment}
              variant="contained"
              sx={{
                backgroundColor: colors.teal,
                color: colors.white,
                "&:hover": {
                  backgroundColor: colors.darkMaroon,
                },
              }}
            >
              Confirm Payment
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default INCRequestDetail;
