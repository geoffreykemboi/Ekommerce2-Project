import ErrorHandler from '../utils/errorHandler.js';

export default function (err, req, res, next) {
    let error = {
        statusCode: err?.statusCode || 500,  
        message: err?.message || "Internal Server Error",
    };

    // Handle invalid mongoose ObjectId error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err?.path}`;
        error = new ErrorHandler(message, 400);
    }

        // Handle mongoose validation error
        if (err.name === "ValidationError") {
        const message = Object.values(err?.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }
        
    // Handle mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err?.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    // Handle JWT token errors
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid. Try again";
        error = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token has expired. Try again";
        error = new ErrorHandler(message, 400);
    }
    if (process.env.NODE_ENV === "DEVELOPMENT") {
            res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: err,
            stack: err?.stack,  // Include the stack trace for debugging
    });
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
            res.status(error.statusCode).json({
            success: false,
            message: error.message,
    });
    }
    
    }

