import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Load environment variables
dotenv.config();

// Init app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB
connectDB();

// 🔗 Routes
app.use("/api", bookingRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ❌ Handle unknown routes (VERY HELPFUL)
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// PORT (Render uses process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
