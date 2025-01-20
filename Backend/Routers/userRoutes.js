import express from "express";
import { login, register } from "../Controllers/userController.js";

const router = express.Router();

// Register user
router.post("/register-user", register);

// Login user
router.post("/login-user", login);

export default router;
