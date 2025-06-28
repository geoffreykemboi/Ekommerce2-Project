// backend/middlewares/auth.js (Corrected and Final Version)

import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
     
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the ID from the token
    const user = await User.findById(decoded.id);

    // 👇 THIS IS THE CRITICAL FIX 👇
    // If the token is valid but the user no longer exists, block the request.
    if (!user) {
        return next(new ErrorHandler("Authentication failed, user not found.", 401));
    }

    // If the user is found, attach them to the request object
    req.user = user;

    next(); // Continue to the next middleware or route handler
});

// Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // This check is now safer because isAuthenticatedUser guarantees req.user exists.
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