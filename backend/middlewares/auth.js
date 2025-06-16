import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/user.js"; // Ensure the path to your User model is correct
import jwt from "jsonwebtoken";

// Check if the user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    console.log(token); // Log token for debugging

    if (!token) {
        return next(new ErrorHandler("Please login first to access this resource", 401));
    }
     
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);


    next(); // Call next middleware or route handler
});

// Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: (${req.user?.role}) is not allowed to access this resource`,
                     403
                )
            );
        }
        next(); // Call next middleware or route handler
    };
};

