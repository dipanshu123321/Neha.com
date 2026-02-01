import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
      // ❌ unique REMOVED
    },
    email: {
      type: String,
      required: true
      // ❌ unique REMOVED
    },
    plan: String,
    city: String,
    date: String,
    time: String,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
