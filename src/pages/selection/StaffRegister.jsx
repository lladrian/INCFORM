import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetDepartmentsQuery,
  useGetRolesQuery,
  useStaffSignUpMutation,
} from "../../api/apiSlice";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

function StaffRegister() {
  const navigate = useNavigate();
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useGetDepartmentsQuery();
  const {
    data: roles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useGetRolesQuery();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [status, setStatus] = useState(0);

  const [loading, setLoading] = useState(false);
  const [staffSignUp] = useStaffSignUpMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  console.log("hello");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Uncomment this to prevent the default form submission

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        fullname,
        email,
        password,
        role_id: selectedRole,
        department_id: selectedDepartment,
        status,
      };

    const result =   await staffSignUp(payload).unwrap();
    
    console.log(JSON.stringify(result, null, 2)); // Pretty-print the result
    // Reset form fields and show success message
      setFullname("");
      setEmail("");
      setEmployeeId("");
      setPassword("");

      setSelectedRole("");
      setSelectedDepartment("");
      setConfirmPassword("");
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
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
        <p className="text-center mb-10 font-extrabold text-2xl text-blue-800">
          STAFF REGISTRATION FORM
        </p>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="text-xs block mb-2 font-semibold"
            >
              Full Name
            </label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              type="text"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-xs block mb-2 font-semibold">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="employee-id"
              className="text-xs block mb-2 font-semibold"
            >
              Employee ID
            </label>
            <input
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              name="employee-id"
              type="text"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter employee ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="text-xs block mb-2 font-semibold">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              name="role"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              disabled={rolesLoading}
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles &&
                roles.roles
                  .filter(
                    (role) =>
                      role.role_name !== "Admin" && role.role_name !== "Student"
                  ) // Filter out Admin and Student
                  .map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                    </option>
                  ))}
            </select>
            {rolesError && (
              <p className="text-red-500 text-xs mt-2">Failed to load roles.</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-xs block mb-2 font-semibold"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="text-xs block mb-2 font-semibold"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirm-password"
              type="password"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Confirm password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="text-xs block mb-2 font-semibold"
            >
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              name="department"
              required
              className="w-full text-blue-800 text-sm border-b border-blue-300 focus:border-blue-500 px-2 py-3 outline-none"
              disabled={departmentsLoading}
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
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Register
            </button>
          </div>
          <div className="md:col-span-2 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-staff" className="text-blue-600 hover:underline">
              Login here.
            </Link>
          </div>
        </form>
      </div>
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
  );
}

export default StaffRegister;
