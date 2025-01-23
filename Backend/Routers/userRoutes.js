import express from "express";
import {
  login,
  logout,
  register,
  sendOtp,
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

export default router;
