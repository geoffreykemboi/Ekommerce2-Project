// backend/middlewares/auth.js (JWT via Authorization header)

import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    let token;
    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler("Authentication failed, user not found.", 401));
        }
        req.user = user;
        next();
    } catch (error) {
        // Handle JWT errors more gracefully
        console.error("Error in controller:", error);
        
        if (error.name === "JsonWebTokenError") {
            return next(new ErrorHandler("JSON Web Token is invalid. Try again", 401));
        }
        if (error.name === "TokenExpiredError") {
            return next(new ErrorHandler("JSON Web Token has expired. Try again", 401));
        }
        
        // For any other JWT-related errors
        return next(new ErrorHandler("Authentication failed. Please login again.", 401));
    }
});

// Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role (${req.user.role}) is not allowed to access this resource`,
                     403
                )
            );
        }
        next();
    };
};