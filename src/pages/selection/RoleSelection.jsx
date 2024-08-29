import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === "student") {
      navigate("/login-student");
    } else if (role === "staff") {
      navigate("/login-staff");
    }
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage:
          "url('https://apps.evsu.edu.ph/assets/img/images/EVSU-v2.jpg?v=1')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">
            Select Your Role
          </h1>
          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-full bg-maroon text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:bg-maroon-dark hover:scale-105"
              onClick={() => handleRoleSelection("student")}
            >
              Student
            </button>
            <button
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
              onClick={() => handleRoleSelection("staff")}
            >
              Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
