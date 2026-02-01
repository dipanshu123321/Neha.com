import express from "express";
import Booking from "../models/booking.js";

const router = express.Router();

/* 🔹 CREATE BOOKING */
router.post("/book", async (req, res) => {
  try {
    // 🔥 IMPORTANT: force new document
    const booking = new Booking({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      plan: req.body.plan,
      city: req.body.city,
      date: req.body.date,
      time: req.body.time,
      status: "Pending"
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking successful"
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({
      success: false,
      message: "Booking failed"
    });
  }
});

/* 🔹 ADMIN: GET ALL BOOKINGS */
router.get("/admin/bookings", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

export default router;
