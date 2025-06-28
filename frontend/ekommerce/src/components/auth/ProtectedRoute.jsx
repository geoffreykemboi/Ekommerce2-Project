import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader"; // It's good practice to import a Loader

const ProtectedRoute = ({ admin, children }) => {
  // Add `loading` to the destructured state
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // Best Practice: While checking auth status, show a loader
  // This prevents the user from being momentarily redirected before auth is confirmed.
  if (loading) {
    return <Loader />;
  }
  
  // This part is correct
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // This part is also correct
  if (admin && user?.role !== "admin") {  
    return <Navigate to="/" replace />;
  }

  // ✅ THE FIX: If all checks pass, render the component's children!
  // This was the missing line in your code.
  return children;
};

export default ProtectedRoute;