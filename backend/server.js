import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", bookingRoutes);

// Test route (health check)
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// PORT for Render (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
