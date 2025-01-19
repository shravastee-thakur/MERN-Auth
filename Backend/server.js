import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./Db/connectDb.js";
connectDb();

import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
