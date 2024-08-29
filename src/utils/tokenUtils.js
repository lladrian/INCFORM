import { jwtDecode } from "jwt-decode";

/**
 * Checks if the given JWT token is expired.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if the token is expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  try {
    const expirationTime = getTokenExpirationTime(token);
    const currentTime = Date.now() / 1000; // current time in seconds

    return expirationTime < currentTime;
  } catch (e) {
    return true; // Consider token expired if there's an error
  }
};

/**
 * Retrieves the expiration time from the JWT token.
 * @param {string} token - The JWT token.
 * @returns {number} - The expiration time (exp) in seconds since the epoch.
 */

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getTokenExpirationTime = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    // Convert the decoded token data to a string for the alert
    //  const decodedTokenString = JSON.stringify(decodedToken, null, 2);
    // alert(`Decoded Token Data:\n${decodedTokenString}`); // Display the decoded token data in an alert

    // Example for extracting specific data
    localStorage.setItem("fullname", decodedToken.data.user.fullname); // Adjust according to your token payload
    localStorage.setItem("studentID", decodedToken.data.user.student_id_number); // Adjust according to your token payload
    localStorage.setItem("departmentID", decodedToken.data.user.department_id); // Adjust according to your token payload
    localStorage.setItem("courseID", decodedToken.data.user.course_id); // Adjust according to your token payload
    localStorage.setItem("uniqueID", decodedToken.data.user.unique_id); // Adjust according to your token payload
    
    
    return decodedToken.exp;
  } catch (e) {
    alert("Failed to decode token.");
    throw new Error("Failed to decode token.");
  }
};
