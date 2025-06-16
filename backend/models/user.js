import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Import crypto for generating reset tokens

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false // Exclude password from queries by default
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String, // Token for password reset functionality
    resetPasswordExpire: Date, // Expiration date for the password reset token
}, // **Fixed misplaced closing bracket**
    { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

// Encrypting password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // If password is not modified, skip hashing
    }
    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10); // **Removed unnecessary dynamic import**
    next();
});

// Return JWT token for user authentication
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME || "7d" // **Fixed misleading comment (default is 7 days, not 30)**
    });
};

// Compare input password with hashed password in the database
userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);  // **Fixed comment to clarify that this compares the given password with the stored hashed password**
};

const User = mongoose.model("User", userSchema); // Create the User model from the schema

// Generate a password reset token
userSchema.methods.getResetPasswordToken = function () {

    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash the token and set it to the resetPasswordToken field
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    // Set the expiration time for the reset token
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes

    return resetToken; // Return the plain token to send to the user

}

export default User; // Export the User model for use in other parts of the application
