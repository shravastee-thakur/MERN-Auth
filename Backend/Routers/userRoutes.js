import express from "express";
import { login, logout, register } from "../Controllers/userController.js";

const router = express.Router();

// Register user
router.post("/register-user", register);

// Login user
router.post("/login-user", login);

// Logout user
router.post("/logout-user", logout);

export default router;
