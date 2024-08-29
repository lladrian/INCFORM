import React, { createContext, useContext, useState, useEffect } from "react";
import { isTokenExpired } from "./tokenUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("X-JWT-TOKEN") || "");
  const [expirationMessage, setExpirationMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        if (isTokenExpired(token)) {
          // Token is expired
          setIsAuthenticated(false);
          localStorage.removeItem("X-JWT-TOKEN");
          setExpirationMessage(
            "Your session has expired. Please log in again."
          );
          setRole("");
        } else {
          // Token is valid
          setIsAuthenticated(true);
          setExpirationMessage("");
          try {
            const parsedToken = JSON.parse(atob(token.split(".")[1]));

            // Log the data inside the token

            const tokenRole = parsedToken?.data.user?.role_name || "";
            setRole(tokenRole);

            console.log("Role:", tokenRole);
          } catch (error) {
            console.error("Error parsing token:", error);
            setRole("");
          }
        }
      } else {
        // No token
        setIsAuthenticated(false);
        setRole("");
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("X-JWT-TOKEN", newToken);
    setIsAuthenticated(true);
    setExpirationMessage("");
    try {
      const parsedToken = JSON.parse(atob(newToken.split(".")[1]));
      setRole(parsedToken?.user?.role_name || "");
    } catch (error) {
      console.error("Error parsing token:", error);
      setRole("");
    }
  };

  const logout = () => {
    setToken("");
    setIsAuthenticated(false);
    localStorage.removeItem("X-JWT-TOKEN");
    setExpirationMessage("");
    setRole("");
  };

  // Optional: Implement token refresh logic here if needed

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        expirationMessage,
        loading,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
