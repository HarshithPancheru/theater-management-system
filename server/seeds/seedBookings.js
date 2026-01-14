import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Booking from "../src/modules/booking/booking.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace these ObjectIds with actual IDs from your seeded Users, Shows, and Seats collections
    const bookings = [
      {
        userId: "67890abcdef1234567890123",   // Example User _id
        showId: "78901abcdef1234567890123",   // Example Show _id
        seatIds: ["89012abcdef1234567890123"], // Example Seat _id(s)
        paymentMethod: "CARD",
        totalAmount: 500,
        status: "CONFIRMED"
      },
      {
        userId: "67890abcdef1234567890456",
        showId: "78901abcdef1234567890456",
        seatIds: ["89012abcdef1234567890456", "89012abcdef1234567890789"],
        paymentMethod: "UPI",
        totalAmount: 750,
        status: "CANCELLED"
      }
    ];

    await Booking.insertMany(bookings);
    console.log("✅ Bookings seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
