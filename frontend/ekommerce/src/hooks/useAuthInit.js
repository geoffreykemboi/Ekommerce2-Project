// src/hooks/useAuthInit.js
// Hook to initialize authentication state from localStorage

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setIsAuthenticated } from '../redux/features/userSlice';
import { hasValidAuth, getUser, clearAuthData } from '../utils/auth';

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user has valid authentication data
    if (hasValidAuth()) {
      try {
        const user = getUser();
        if (user) {
          dispatch(setUser(user));
          dispatch(setIsAuthenticated(true));
          console.log("🔐 Authentication restored from localStorage");
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        // If there's an error parsing user data, clear everything
        console.warn("⚠️ Invalid auth data found, clearing...", error);
        clearAuthData();
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      }
    } else {
      // No valid auth data, ensure state is cleared
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
    }
  }, [dispatch]);
};

export default useAuthInit;
