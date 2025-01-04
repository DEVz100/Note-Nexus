import dotenv from "dotenv";
// Load env vars
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
import "./config/db.js";

// Routes
app.use("/api/auth", authRoutes);

// Serve static files from frontend
app.use(express.static("../"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
