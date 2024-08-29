import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetDepartmentsQuery,
  useGetProgramsQuery,
  useGetRolesQuery,
  useStudentSignUpMutation,
} from "../../api/apiSlice";
import { useAuth } from "../../utils/authContext";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

function RegisterStudent() {
  const navigate = useNavigate();
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useGetDepartmentsQuery();
  const {
    data: programs,
    error: programsError,
    isLoading: programsLoading,
  } = useGetProgramsQuery();
  const {
    data: roles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useGetRolesQuery();
  console.log(departments);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("8");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentSignUp] = useStudentSignUpMutation();
  const { token, loading: tokenLoading } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'

  if (tokenLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lightGray">
        <CircularProgress sx={{ color: "#d30707" }} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
    try {
      const result = await studentSignUp({
        fullname,
        email,
        student_id_number: studentId,
        password,

        gender,
        role_id: selectedRole,
        department_id: selectedDepartment,
        course_id: selectedProgram,
      }).unwrap();

      console.log("result:", JSON.stringify(result, null, 2));

      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFullname("");
      setEmail("");
      setStudentId("");
      setPassword("");
      setGender("");

      setSelectedDepartment("");
      setSelectedProgram("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
      setSnackbarMessage("Registration failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="font-[sans-serif] bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://apps.evsu.edu.ph/assets/img/images/EVSU-v2.jpg?v=1')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="max-w-4xl w-full p-6 m-4 shadow-lg rounded-md bg-white relative z-10">
        <p className="text-center mb-10 font-extrabold text-2xl text-maroon">
          STUDENT REGISTRATION FORM
        </p>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Full Name
            </label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              type="text"
              required
              className="w-full text-maroon text-sm border-b border-slateGray focus:border-maroon px-2 py-3 outline-none"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              required
              className="w-full text-maroon text-sm border-b border-slateGray focus:border-maroon px-2 py-3 outline-none"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="student-id"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Student ID
            </label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              name="student-id"
              type="text"
              required
              className="w-full text-maroon text-sm border-b border-slateGray focus:border-maroon px-2 py-3 outline-none"
              placeholder="Enter student ID"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              required
              className="w-full text-slateGray text-sm border-b border-maroon focus:border-maroon px-2 py-3 outline-none"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              required
              className="w-full text-maroon text-sm border-b border-slateGray focus:border-maroon px-2 py-3 outline-none"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirm-password"
              type="password"
              required
              className="w-full text-maroon text-sm border-b border-slateGray focus:border-maroon px-2 py-3 outline-none"
              placeholder="Confirm password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              name="department"
              required
              className="w-full text-slateGray text-sm border-b  border-maroon focus:border-maroon px-2 py-3 outline-none"
              disabled={departmentsLoading || departmentsError}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments &&
                departments.departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
            </select>
            {departmentsError && (
              <p className="text-red-500 text-xs mt-2">
                Failed to load departments.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="program"
              className="text-slateGray text-xs block mb-2 font-semibold"
            >
              Program
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              name="program"
              required
              className="w-full text-slateGray text-sm border-b border-maroon focus:border-maroon px-2 py-3 outline-none"
              disabled={programsLoading || programsError}
            >
              <option value="" disabled>
                Select Program
              </option>
              {programs &&
                programs.courses.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.course_name}
                  </option>
                ))}
            </select>
            {programsError && (
              <p className="text-red-500 text-xs mt-2">
                Failed to load programs.
              </p>
            )}
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-maroon text-white px-4 py-2 rounded-md shadow-md hover:bg-darkMaroon"
            >
              Register
            </button>
          </div>
          <div className="md:col-span-2 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-student" className="text-maroon hover:underline">
              Login here.
            </Link>
          </div>
        </form>
        {/* Snackbar for success or error messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default RegisterStudent;
