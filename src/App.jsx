// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginStudent from "./pages/selection/LoginStudent";
import RegisterStudent from "./pages/selection/RegisterStudent";
import LoginStaff from "./pages/selection/StaffLogin";
import RegisterStaff from "./pages/selection/StaffRegister";

import { useAuth } from "./utils/authContext";
import { useSecureDataQuery } from "./api/apiSlice";
import { CircularProgress } from "@mui/material";
import LayoutAuth from "./components/LayoutAuth";
import LayoutNonAuth from "./components/LayoutNonAuth";
import StudentDashboard from "./pages/studentPage/StudentDashboard";
import INCRequestForm from "./pages/studentPage/INCRequestForm";
import MyINCRequests from "./pages/studentPage/MyINCRequests";
import INCRequestDetail from "./pages/studentPage/INCRequestDetail";
import InstructorDashboard from "./pages/instructorPage/InstructorDashboard";
import INCFormManagement from "./pages/instructorPage/INCFormManagement";

import CombinedDashboard from "./pages/headDepartmentPage/CombinedDashboard";
import HODInstructorFORM from "./pages/headDepartmentPage/instructor/HOD-Instructor-form";
import HODManageForms from "./pages/headDepartmentPage/hod/HODManageForms";
import MainDashboard from "./pages/cashierPage/MainDashboard";
import OnlinePaymentPage from "./pages/cashierPage/OnlinePaymentPage.JSX";
import WalkInPaymentPage from "./pages/cashierPage/WalkInPaymentPage";
import CashierReport from "./pages/cashierPage/CashierReport";
import ArchivedINCForms from "./pages/cashierPage/ArchivedINCForms";
import RegistrarDashboard from "./pages/registrarPage/RegistrarDashboard";
import RegistrarINCFormManage from "./pages/registrarPage/RegistrarINCFormManage";
import GradeEntry from "./pages/registrarPage/GradeEntry";
import Reports from "./pages/registrarPage/Reports";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoleSelection from "./pages/selection/RoleSelection";
import Archive from "./pages/instructorPage/Archive";
import Summary from "./pages/instructorPage/Summary";
import INCStudentRequestDetail from "./pages/instructorPage/INCStudentRequestDetail";
import ArchiveHOD from "./pages/headDepartmentPage/hod/ArchiveHOD";
import ArchiveHODInstructor from "./pages/headDepartmentPage/instructor/ArchiveHODInstructor";
import InstructorINCStudentDetails from "./pages/headDepartmentPage/instructor/InstructorINCStudentDetails";
import WalkinDetails from "./pages/cashierPage/WalkinDetails";
import HODINCStudentDetails from "./pages/headDepartmentPage/hod/HOD-INCStudentDetails";

function App() {
  const { isAuthenticated, expirationMessage, logout, loading, role } =
    useAuth();
  const { data, error, isLoading } = useSecureDataQuery(null, {
    skip: !isAuthenticated, // Skip this query if not authenticated
  });

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lightGray">
        <CircularProgress sx={{ color: "teal" }} />
      </div>
    );
  }

  if (error) {
    logout(); // Logout on error
    return <div>Error: {error.message || "Unknown error"}</div>;
  }

  return (
    <div>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<LayoutAuth />}>
            {role === "Student" ? (
              <>
                <Route index element={<StudentDashboard />} />
                <Route path="inc-request" element={<INCRequestForm />} />
                <Route path="myinc-requests" element={<MyINCRequests />} />
                <Route
                  path="/myinc-requests/:id"
                  element={<INCRequestDetail />}
                />
              </>
            ) : role === "Instructor" ? (
              <>
                <Route index element={<InstructorDashboard />} />
                <Route path="/dashboard" element={<InstructorDashboard />} />
                <Route
                  path="inc-form-management"
                  element={<INCFormManagement />}
                />
                <Route path="archive" element={<Archive />} />
                <Route
                  path="/instructor-form-management/:id"
                  element={<INCStudentRequestDetail />}
                />
                <Route
                  path="/archive/:id"
                  element={<INCStudentRequestDetail />}
                />
                <Route path="summary" element={<Summary />} />
              </>
            ) : role === "Head Department" ? (
              <>
                <Route index element={<CombinedDashboard />} />
                <Route path="/dashboard" element={<CombinedDashboard />} />
                <Route
                  path="/instructor-form-management"
                  element={<HODInstructorFORM />}
                />
                <Route
                  path="/archive-instructor"
                  element={<ArchiveHODInstructor />}
                />
                <Route path="/archive-hod" element={<ArchiveHODInstructor />} />
                <Route
                  path="/instructor-form-management/:id"
                  element={<InstructorINCStudentDetails />}
                />
                <Route
                  path="/hod-form-management/:id"
                  element={<HODINCStudentDetails />}
                />

                <Route
                  path="/hod-form-management"
                  element={<HODManageForms />}
                />
              </>
            ) : role === "Cashier" ? (
              <>
                <Route index element={<MainDashboard />} />
                <Route path="/dashboard" element={<MainDashboard />} />
                <Route
                  path="/online-payments"
                  element={<OnlinePaymentPage />}
                />
                <Route
                  path="/walk-in-payments"
                  element={<WalkInPaymentPage />}
                />
                <Route
                  path="/walk-in-Details/:id"
                  element={<WalkinDetails />}
                />
                <Route path="/online-Details/:id" element={<WalkinDetails />} />

                <Route path="/reports" element={<CashierReport />} />
                <Route path="/archived-inc" element={<ArchivedINCForms />} />
                <Route path="/archived-inc/:id" element={<WalkinDetails />} />
              </>
            ) : role === "Registrar Head" ? (
              <>
                <Route index element={<RegistrarDashboard />} />
                <Route
                  path="/inc-form-management"
                  element={<RegistrarINCFormManage />}
                />
                <Route path="/grade-entry" element={<GradeEntry />} />
                <Route path="/reports" element={<Reports />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <Route path="/" element={<LayoutNonAuth />}>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login-student" element={<LoginStudent />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/login-staff" element={<LoginStaff />} />
            <Route path="/register-staff" element={<RegisterStaff />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
