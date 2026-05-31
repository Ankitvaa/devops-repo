import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API Running",
  });
});

// Database Status Route
app.get("/db-status", (req, res) => {
  res.json({
    connected: mongoose.connection.readyState === 1,
    database: mongoose.connection.name,
    host: mongoose.connection.host,
  });
});

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();

    console.log("✅ Database connection successful");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server Started on Port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
