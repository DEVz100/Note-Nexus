import dotenv from "dotenv";
// Load env vars
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
import "./config/db.js";

// Serve static files from client directory
app.use(express.static(path.join(__dirname, "../client")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

// Handle all routes by serving index.html
app.get("*", (req, res) => {
  // If it's an API route that wasn't handled, return 404
  if (req.url.startsWith("/api")) {
    return res.status(404).json({ message: "API endpoint not found" });
  }

  // For all other routes, determine which HTML file to serve
  const route = req.path.toLowerCase();

  if (route === "/login") {
    res.sendFile(path.join(__dirname, "../client/login.html"));
  } else if (route === "/signup") {
    res.sendFile(path.join(__dirname, "../client/signup.html"));
  } else if (route.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "../client/admin/admin.html"));
  } else {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  }
});

const PORT = process.env.PORT || 5001;
app
  .listen(PORT)
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is busy. Trying ${PORT + 1}...`);
      app.listen(PORT + 1, () => {
        console.log(`Server running on port ${PORT + 1}`);
      });
    } else {
      console.error("Server error:", error);
    }
  })
  .on("listening", () => {
    console.log(`Server running on port ${PORT}`);
  });
