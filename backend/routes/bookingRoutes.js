import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* 🔹 CREATE BOOKING (From Contact / Booking Form) */
router.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      message: "Booking successful"
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({
      message: "Booking failed"
    });
  }
});

/* 🔹 GET ALL BOOKINGS (ADMIN DASHBOARD – READ ONLY) */
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({
      message: "Error fetching bookings"
    });
  }
});

export default router;
