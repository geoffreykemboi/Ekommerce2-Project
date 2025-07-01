// src/utils/auth.js
// Authentication utility functions

/**
 * Clear authentication data from localStorage
 * Note: Redux store updates should be handled in components/hooks, not here
 * to avoid circular dependencies
 */
export const clearAuthData = () => {
  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  console.log("🧹 Authentication data cleared from localStorage");
};

/**
 * Check if user has valid authentication data
 */
export const hasValidAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  return !!(token && user);
};

/**
 * Get current token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Get current user from localStorage
 */
export const getUser = () => {
  const userData = localStorage.getItem("user");
  try {
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Set authentication data in localStorage
 */
export const setAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export default {
  clearAuthData,
  hasValidAuth,
  getToken,
  getUser,
  setAuthData
};
