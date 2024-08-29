import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStaffLoginMutation } from "../../api/apiSlice";
import { useAuth } from "../../utils/authContext";
import { CircularProgress, Box, Typography } from "@mui/material";
import Slider from "react-slick";
import staffImage from "../../assets/logo.png";
import Logo from "../../assets/logo.png";
import dog from "../../assets/dog.jpg";

function StaffLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staffLogin, { isLoading }] = useStaffLoginMutation();
  const navigate = useNavigate();
  const { loading: tokenLoading, login, expirationMessage } = useAuth();

  useEffect(() => {
    if (expirationMessage) {
      alert(expirationMessage);
    }
  }, [expirationMessage]);

  if (tokenLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lightGray">
        <CircularProgress sx={{ color: "#007BFF" }} /> {/* Blue loading spinner */}
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await staffLogin(credentials).unwrap();
      if (Array.isArray(response) && response.length > 0) {
        const token = response[0];
        login(token);
        navigate("/");
      } else {
        console.error("Unexpected response format");
        alert("Login failed. Unexpected response format.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.data?.message) {
        alert(error.data.message);
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
      <div className="absolute inset-0 bg-black/50 z-1" />

      <div className="flex flex-col min-h-screen relative z-10">
        <Box
          sx={{
            bgcolor: "#007BFF", // University blue color
            color: "white",
            textAlign: "center",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
          className="flex items-center justify-center"
        >
          <div
            className="flex items-center justify-center w-20 h-20 bg-white rounded-full"
            style={{ backgroundColor: "#fff" }}
          >
            <img src={Logo} alt="Logo" className="w-20 h-20" />
          </div>
          <div className="ml-5">
            <Typography variant="h4" fontWeight="bold">
              Staff Login Portal
            </Typography>
            <Typography variant="body2" mt={1}>
              Welcome to the Staff Portal. Please log in to access your dashboard.
            </Typography>
          </div>
        </Box>

        <div className="flex-grow flex items-center justify-center relative">
          <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-4xl w-full p-4 m-4 shadow-elevation-5 rounded-md bg-white">
            <div className="md:max-w-md w-full px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-8 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate("/")} // Go back to previous page
                  />
                  <h3 className="text-blue-600 text-2xl font-extrabold">
                    Sign in for Staff
                  </h3>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-black text-xs block mb-2 font-semibold"
                  >
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="text"
                      required
                      className="w-full text-blue-600 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter email"
                      value={email}
                      aria-describedby="email-error"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-[18px] h-[18px] absolute right-2"
                      style={{ color: "#bbb" }}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label
                    htmlFor="password"
                    className="text-black text-xs block mb-2 font-semibold"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full text-blue-600 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                      placeholder="Enter password"
                      aria-describedby="password-error"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      style={{ color: "#bbb" }}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-black"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link className="text-blue-600 font-semibold text-sm hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    disabled={!email || !password || isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <div className="mb-8 text-center">
                <p className="text-sm mt-4 text-black">
                  Don't have an account?{" "}
                  <Link
                    to="/register-staff"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>

            <div className="hidden md:block md:h-full rounded-xl lg:p-8 p-4">
              <Slider {...settings}>
                <div>
                  <img
                    src={dog}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Slide 1"
                  />
                </div>
                <div>
                  <img
                    src={staffImage}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Slide 2"
                  />
                </div>
                <div>
                  <img
                    src={staffImage}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Slide 3"
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;
