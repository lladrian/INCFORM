import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  useGetCoursesQuery,
  useGetInstructorQuery,
  useGetSemesterQuery,
  useGetAllDataQuery,
  useRequestINCFormMutation,
} from "../../api/apiSlice";

const colors = {
  teal: "#008080",
  darkTeal: "#004d4d",
  white: "#ffffff",
  lightGray: "#f5f5f5",
  black: "#000000",
  maroon: "#800000",
};

const RequestINCForm = () => {
  const fullname = localStorage.getItem("fullname");
  const studentID = localStorage.getItem("studentID");
  const uniqueID = localStorage.getItem("uniqueID");
  const departmentID = localStorage.getItem("departmentID");
  const courseID = localStorage.getItem("courseID");

  const {
    data: semester,
    error: semesterError,
    isLoading: semesterLoading,
  } = useGetSemesterQuery();

  const {
    data: allData,
    error: allDataError,
    isLoading: allDataLoading,
  } = useGetAllDataQuery({ departmentID, courseID });

  const {
    data: instructor,
    error: instructorsError,
    isLoading: instructorsLoading,
  } = useGetInstructorQuery();

  const {
    data: course,
    error: coursesError,
    isLoading: coursesLoading,
  } = useGetCoursesQuery();

  const [requestINCForm, { isLoading: requestLoading }] =
    useRequestINCFormMutation();

  const [formData, setFormData] = useState({
    student_id_number: studentID,
    student_unique_id: uniqueID,
    subject_id: "",
    semester_id: "", // Changed from semester to semesterId
    course_id: courseID,
    department_id: departmentID,
    school_year_taken: "",
    student_id: studentID,
    academic_year_id: "", // Changed from year to yearLevelId
    head_department_unique_id: "",
    registrar_unique_id: "",
    instructor_unique_id: "",
    amount: "",

    units: "",
    HeadDepartmentName: "",
    studentName: fullname,
    subjectName: "",
    subjectCode: "",
    instructorName: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data State:", formData); // Check the formData values

    const jsonData = {
      student_id_number: formData.student_id_number,
      student_id: formData.student_id,
      subject_id: formData.subject_id,
      department_id: formData.department_id,
      course_id: formData.course_id,
      school_year_taken: formData.school_year_taken,
      semester_id: formData.semester_id,
      academic_year_id: formData.academic_year_id,
      student_unique_id: formData.student_unique_id,
      instructor_unique_id: formData.instructor_unique_id,
      head_department_unique_id: formData.head_department_unique_id,
      registrar_unique_id: formData.registrar_unique_id,
      amount: formData.amount,
    };

    

    try {
      const result = await requestINCForm(jsonData).unwrap();
      setSnackbarMessage(
        "Your inc form request has been successfully created."
      );
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      console.log("Form submission result:", JSON.stringify(result, null, 2));

      // Reset form data to initial state
      setFormData({
        student_id_number: studentID,
        student_unique_id: uniqueID,
        subject_id: "",
        semester_id: "",
        course_id: courseID,
        department_id: departmentID,
        school_year_taken: "",
        student_id: studentID,
        academic_year_id: "",
        head_department_unique_id: "",
        registrar_unique_id: "",
        instructor_unique_id: "",
        amount: "",
        units: "",
        HeadDepartmentName: "",
        studentName: fullname,
        subjectName: "",
        subjectCode: "",
        instructorName: "",
      });
    } catch (error) {
      setSnackbarMessage(
        "Failed to submit form. Please check the console for details."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Submit error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const yearLevels = [
    { id: 1, title: "1st Year" },
    { id: 2, title: "2nd Year" },
    { id: 3, title: "3rd Year" },
    { id: 4, title: "4th Year" },
    { id: 5, title: "5th Year" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightGray p-4 pt-20">
      <Paper
        elevation={6}
        style={{ backgroundColor: colors.white, color: colors.black }}
        className="p-6 max-w-4xl w-full"
      >
        <h1
          className="text-center mb-6 text-2xl font-bold"
          style={{ color: colors.maroon }}
        >
          COMPLETION FORM
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: colors.black,
                    backgroundColor: "transparent",
                    "&:focus": {
                      borderColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: colors.black,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Student ID"
                name="student_id"
                value={formData.student_id}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: colors.black,
                    backgroundColor: "transparent",
                    "&:focus": {
                      borderColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: colors.black,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {semesterLoading ? (
                <TextField
                  label="Semester"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : semesterError ? (
                <TextField
                  label="Semester"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load semesters"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={semester.semester || []}
                  getOptionLabel={(option) => option.semester || ""}
                  value={
                    (semester.semester || []).find(
                      (sem) => sem.id === formData.semester_id
                    ) || null
                  }
                  onChange={(e, value) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      semester_id: value ? value.id : "", // Store the ID
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Semester"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {allDataLoading ? (
                <TextField
                  label="Subject"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : allDataError ? (
                <TextField
                  label="Subject"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load subject"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={allData.subjects || []}
                  getOptionLabel={(option) => option.description || ""}
                  value={
                    allData.subjects.find(
                      (subject) => subject.description === formData.subjectName
                    ) || null
                  }
                  onChange={(e, value) => {
                    const subjectUnits = value ? value.subject_units : 0;

                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      subjectName: value ? value.description : "",
                      subjectCode: value ? value.subject_code : "",
                      units: value ? value.subject_units : "",
                      amount: subjectUnits * 50, // Ensure units is used for calculation
                      subject_id: value ? value.id : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subject"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {" "}
                      {/* Ensure each option has a unique key */}
                      {option.description}
                    </li>
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Subject Code"
                name="subjectCode"
                value={formData.subjectCode}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: colors.black,
                    backgroundColor: "transparent",
                    "&:focus": {
                      borderColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: colors.black,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Number of units"
                name="units"
                value={formData.units}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: colors.black,
                    backgroundColor: "transparent",
                    "&:focus": {
                      borderColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: colors.black,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled
                label="Amount"
                name="amount"
                value={formData.amount}
                fullWidth
                InputProps={{ readOnly: true }}
                variant="standard"
                sx={{
                  "& .MuiInputBase-root": {
                    color: colors.black,
                    backgroundColor: "transparent",
                    "&:focus": {
                      borderColor: "transparent",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: colors.black,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {allDataLoading ? (
                <TextField
                  label="S.Y. Taken"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : allDataError ? (
                <TextField
                  label="S.Y. Taken"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load S.Y. Taken"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={(allData.school_years || "")
                    .split(",")
                    .map((year) => ({ title: year.trim() }))}
                  getOptionLabel={(option) => option.title || ""}
                  value={
                    (allData.school_years || "")
                      .split(",")
                      .map((year) => ({ title: year.trim() }))
                      .find(
                        (year) => year.title === formData.school_year_taken
                      ) || null
                  }
                  onChange={(e, value) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      school_year_taken: value ? value.title : "",
                    }));
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="S.Y. Taken"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {coursesLoading ? (
                <TextField
                  label="Course"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : coursesError ? (
                <TextField
                  label="Course"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load courses"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={course.courses || []}
                  getOptionLabel={(option) => option.course_abbreviation || ""}
                  value={
                    (course.courses || []).find((crs) => crs.id === courseID) ||
                    null
                  }
                  disabled // Add this line to disable the Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Course"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={yearLevels}
                getOptionLabel={(option) => option.title}
                value={
                  yearLevels.find(
                    (level) => level.id === formData.academic_year_id
                  ) || null
                }
                onChange={(e, value) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    academic_year_id: value ? value.id : "", // Store ID instead of title
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Year Level"
                    variant="standard"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        color: colors.black,
                        backgroundColor: "transparent",
                        "&:focus": {
                          borderColor: "transparent",
                          boxShadow: "none",
                        },
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {instructorsLoading ? (
                <TextField
                  label="Instructor"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : instructorsError ? (
                <TextField
                  label="Instructor"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load instructors"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={Array.from(
                    new Map(
                      (instructor.instructors || []).map((item) => [
                        item.fullname,
                        item,
                      ])
                    ).values()
                  )}
                  getOptionLabel={(option) => option.fullname || ""}
                  value={
                    (instructor.instructors || []).find(
                      (inst) => inst.fullname === formData.instructorName
                    ) || null
                  }
                  onChange={(e, value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      instructorName: value ? value.fullname : "",
                      instructor_unique_id: value ? value.unique_id : "", // Store the ID
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Instructor"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {allDataLoading ? (
                <TextField
                  label="Head department"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : allDataError ? (
                <TextField
                  label="Head department"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load Head department"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={(allData.head_departments || []).filter(
                    (dept) => dept.department_id === departmentID
                  )}
                  getOptionLabel={(option) => option.fullname || ""}
                  value={
                    (allData.head_departments || [])
                      .filter((dept) => dept.department_id === departmentID)
                      .find(
                        (hod) =>
                          hod.unique_id === formData.head_department_unique_id
                      ) || null
                  }
                  onChange={(e, newValue) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      HeadDepartmentName: newValue ? newValue.fullname : "",
                      head_department_unique_id: newValue
                        ? newValue.unique_id
                        : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Head department"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {allDataLoading ? (
                <TextField
                  label="Head Registrar"
                  variant="standard"
                  required
                  disabled
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : allDataError ? (
                <TextField
                  label="Head Registrar"
                  variant="standard"
                  required
                  error
                  fullWidth
                  helperText="Failed to load Head Registrar"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.black,
                      backgroundColor: "transparent",
                      "&:focus": {
                        borderColor: "transparent",
                        boxShadow: "none",
                      },
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: colors.black,
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  options={(allData.registrars || []).filter(
                    (registrar) => registrar.role_name === "Registrar Head"
                  )}
                  getOptionLabel={(option) => option.fullname || ""}
                  value={
                    (allData.registrars || [])
                      .filter(
                        (registrar) => registrar.role_name === "Registrar Head"
                      )
                      .find(
                        (registrar) =>
                          registrar.unique_id === formData.registrar_unique_id
                      ) || null
                  }
                  onChange={(e, newValue) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      HeadRegistrarName: newValue ? newValue.fullname : "",
                      registrar_unique_id: newValue ? newValue.unique_id : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Head Registrar"
                      variant="standard"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          color: colors.black,
                          backgroundColor: "transparent",
                          "&:focus": {
                            borderColor: "transparent",
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>

          <div className="flex justify-end mt-4 space-x-4">
            <Button
              variant="contained"
              style={{ backgroundColor: colors.teal, color: colors.white }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{
              backgroundColor: "#008080", // Teal background for Alert
              color: "#fff", // White text for contrast
              "& .MuiAlert-icon": {
                color: "#fff", // White icon color for visibility
              },
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default RequestINCForm;
