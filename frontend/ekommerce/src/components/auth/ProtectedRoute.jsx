import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader"; // It's good practice to import a Loader
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ admin, children }) => {
  // Add `loading` to the destructured state
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // Show message when user is not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error("Please login to access this page.");
    }
  }, [isAuthenticated, loading]);

  // Show message when user is not admin but trying to access admin route
  useEffect(() => {
    if (!loading && isAuthenticated && admin && user?.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
    }
  }, [isAuthenticated, loading, admin, user?.role]);

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