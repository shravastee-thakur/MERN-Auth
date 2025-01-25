import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendOtp,
  sendResetPasswordOtp,
  verifyOtp,
} from "../Controllers/userController.js";
import { userAuth } from "../Middlewares/userAuth.js";

const router = express.Router();

// Register user
router.post("/register-user", register);

// Login user
router.post("/login-user", login);

// Logout user
router.post("/logout-user", logout);

// Send otp
router.post("/send-otp", userAuth, sendOtp);

// Verify otp
router.post("/verify-otp", userAuth, verifyOtp);

// Authenticated user
router.post("/is-authenticated", userAuth, isAuthenticated);

// send reset password otp
router.post("/send-reset-password-otp", sendResetPasswordOtp);

// reset password
router.post("/reset-password", resetPassword);

export default router;
