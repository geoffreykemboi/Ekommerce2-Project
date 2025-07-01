// src/utils/apiErrorHandler.js
// Global API error handler

import { toast } from "react-hot-toast";
import { clearAuthData } from "./auth";

/**
 * Handle API errors globally
 * @param {Object} error - Error object from RTK Query
 * @param {string} operation - Description of the operation that failed
 * @param {Function} dispatch - Redux dispatch function (optional)
 */
export const handleApiError = (error, operation = "operation", dispatch = null) => {
  const status = error?.error?.status || error?.status;
  const message = error?.error?.data?.message || error?.data?.message || error?.message;

  // Handle authentication errors
  if (status === 401) {
    if (message?.includes("JSON Web Token") || message?.includes("invalid") || message?.includes("expired")) {
      // Clear invalid tokens from localStorage
      clearAuthData();
      
      // Clear Redux state if dispatch is provided
      if (dispatch) {
        const { setUser, setIsAuthenticated } = require('../redux/features/userSlice');
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      }
      
      toast.error("Your session has expired. Please login again.");
      
      // Optionally redirect to login page
      // window.location.href = '/login';
    } else if (!message?.includes("Login first")) {
      // Show other 401 errors that aren't just "not logged in"
      toast.error(`Authentication error: ${message}`);
    }
    return;
  }

  // Handle other HTTP errors
  if (status === 403) {
    toast.error("You don't have permission to perform this action.");
    return;
  }

  if (status === 404) {
    toast.error(`Resource not found during ${operation}.`);
    return;
  }

  if (status === 500) {
    toast.error(`Server error during ${operation}. Please try again later.`);
    return;
  }

  // Handle network errors
  if (status === "FETCH_ERROR" || !status) {
    toast.error(`Network error during ${operation}. Please check your connection.`);
    return;
  }

  // Generic error fallback
  toast.error(`Error during ${operation}: ${message || "Unknown error"}`);
};

export default handleApiError;
