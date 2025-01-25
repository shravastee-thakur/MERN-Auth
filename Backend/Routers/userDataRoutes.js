import express from "express";
import { getUserData } from "../Controllers/userDataController.js";
import { userAuth } from "../Middlewares/userAuth.js";

const router = express.Router();

// Get user data
router.get("/get-user-data", userAuth, getUserData);

export default router;
