import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* 🔹 CREATE BOOKING (form) */
router.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking successful" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});

/* 🔹 GET ALL BOOKINGS (ADMIN) */
router.get("/admin/bookings", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

/* 🔹 UPDATE STATUS (ADMIN) */
router.put("/admin/update/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Status updated" });
});

export default router;
