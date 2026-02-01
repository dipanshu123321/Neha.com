import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  plan: String,
  city: String,
  date: String,
  time: String,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Booking", bookingSchema);
