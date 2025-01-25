import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/connectDb.js";
connectDb();

import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

import userRoutes from "./Routers/userRoutes.js";
import userDataRoutes from "./Routers/userDataRoutes.js";

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
// http://localhost:5000/api/v1/users/register-user

app.use("/api/v1/userData", userDataRoutes);
// http://localhost:5000/api/v1/userData/get-user-data

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
