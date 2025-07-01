// backend/routes/auth.js (Final Correct Version)

import express from 'express';
import {
    registerUser, loginUser, logout, forgotPassword, resetPassword,
    getUserProfile, updatePassword, updateProfile, allUsers,
    getUserDetails, updateUser, deleteUser
} from '../controllers/authControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
import uploadAvatar from '../middlewares/uploadAvatar.js';

const router = express.Router();

router.route("/register").post(uploadAvatar.single('avatar'), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

router.route("/admin/users/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default router;