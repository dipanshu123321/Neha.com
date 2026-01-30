import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // 🔐 Backend validation (extra safety)
  if (
    !data.name ||
    !data.phone ||
    !data.email ||
    !data.plan ||
    !data.city ||
    !data.date ||
    !data.time
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid data" })
    };
  }

  try {
    await client.connect();
    const db = client.db("makeupBooking");
    const collection = db.collection("bookings");

    // 🚫 SLOT CONFLICT CHECK
    const existing = await collection.findOne({
      date: data.date,
      time: data.time,
      city: data.city
    });

    if (existing) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          message: "This date & time slot is already booked"
        })
      };
    }

    // ✅ INSERT BOOKING
    await collection.insertOne({
      ...data,
      createdAt: new Date()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Booking confirmed successfully 🎉"
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server error, try again"
      })
    };
  }
}
