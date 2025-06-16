import express from 'express';
import { loginUser, registerUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, deleteUser, updateUser} from '../controllers/authControllers.js';  // Import the registerUser controller
import { get } from 'mongoose';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/register").post(registerUser); // Route for user registration
router.route("/login").post(loginUser); // Route for user login (using the same controller for simplicity, but ideally should be a separate controller)
router.route("/logout").get(logout);  // Route for user logout

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword); // Route for resetting password
  
router.route("/me").get(isAuthenticatedUser,getUserProfile); // Route for getting user profile
router.route("/me/update").get(isAuthenticatedUser,updateProfile); // Route for updating user profile
router.route("/password/update").put(isAuthenticatedUser, updatePassword); // Route for updating user password

router
.route("/admin/users")
.put(isAuthenticatedUser, authorizeRoles("admin"), allUsers) // Route for admin to get all users; 

router
.route("/admin/users/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails) // Route for admin to get all users; 
.put(isAuthenticatedUser, authorizeRoles("admin"), updateUser) // Route for admin to get all users; 
.put(isAuthenticatedUser, authorizeRoles("admin"), deleteUser) // Route for admin to delete a user;


export default router;

