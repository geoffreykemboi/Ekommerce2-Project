import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js"; // Ensure the path to the User model is correct
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// Register a new user => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    sendToken(user, 201, res); // Send token and user data in response
});

// Login user => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    // Find user in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 201, res);
});

// Logout user => /api/v1/logout (Fixed incorrect endpoint comment)
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

// Forgot Password => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false }); // Prevent validation errors on missing fields

    // Create reset password URL
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = getResetPasswordTemplate(user?.name, resetUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "Ekommerce Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error?.message, 500));
    }
});


// Reset Password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
    
        if (!user) {
            return next(
                new ErrorHandler(
                    "Reset Password Token is invalid or has expired",
                    400
                )
            );
        }
    
        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Passwords do not match", 400));
        }
    
        // Set the new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save();
    
        sendToken(user, 200, res);
    });

    // Get current user details => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user.id);

    res.status(200).json({
        success: true,
        user,
    });
}
);  


    // update password => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req?.user.id).select("+password");

    // Check the previous password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.newPassword;          // Set the new password
    await user.save();                             // Save the updated user

     
    res.status(200).json({
        success: true,
        user,
    });
}
);

    // Update User Profile => /api/v1/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };  

    const user = await User.findByIdAndUpdate(
        req.user.id,
        newUserData,
        {
            new: true,
        }
    );  
     
    res.status(200).json({
        success: true,
        user,
    });
}
);

// Get all Users - ADMIN => /api/v1/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get all User - ADMIN => /api/v1/admin/users
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const users = await User.findById(req.params.id);   

if (!users) {
    return next(
        new ErrorHandler(`User not found with id": ${req.params.id}`, 404)
    );
}

    res.status(200).json({
        success: true,
        users,
    });
});

// Update user Details - ADMIN => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,        
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Delete User - ADMIN => /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
        );
    }

    //TODO: Remove user avatar from cloudinary if applicable
    
    
    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});