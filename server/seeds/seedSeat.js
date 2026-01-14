import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Seat from "../src/modules/seat/seat.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace screenId with actual ObjectId from your Screens collection
    const seats = [
      {
        screenId: "67890abcdef1234567890123", // Example Screen _id
        seatLabel: "A1",
        rowLabel: "A",
        category: "PREMIUM"
      },
      {
        screenId: "67890abcdef1234567890123",
        seatLabel: "A2",
        rowLabel: "A",
        category: "PREMIUM"
      },
      {
        screenId: "67890abcdef1234567890456",
        seatLabel: "B1",
        rowLabel: "B",
        category: "GOLD"
      },
      {
        screenId: "67890abcdef1234567890456",
        seatLabel: "B2",
        rowLabel: "B",
        category: "GOLD"
      },
      {
        screenId: "67890abcdef1234567890789",
        seatLabel: "C1",
        rowLabel: "C",
        category: "SILVER"
      },
      {
        screenId: "67890abcdef1234567890789",
        seatLabel: "C2",
        rowLabel: "C",
        category: "BALCONY"
      }
    ];

    await Seat.insertMany(seats);
    console.log("✅ Seats seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
