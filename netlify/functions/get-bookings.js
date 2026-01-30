import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export async function handler() {
  try {
    await client.connect();
    const bookings = await client
      .db("makeupBooking")
      .collection("bookings")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(bookings)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching bookings" })
    };
  }
}
