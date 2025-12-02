import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticket.js";
import userRoutes from "./routes/user.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Mount API routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", userRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("MongoDB connected with Express using ES Modules!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
