import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Show from "../src/modules/show/show.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace movieId and screenId with actual ObjectIds from your Movies and Screens collections
    const shows = [
      {
        movieId: "67890abcdef1234567890123", // Example Movie _id
        screenId: "12345abcdef1234567890123", // Example Screen _id
        date: new Date("2026-01-15"),
        startTime: "18:30",
        priceMultiplier: 1.2
      },
      {
        movieId: "67890abcdef1234567890456",
        screenId: "12345abcdef1234567890456",
        date: new Date("2026-01-16"),
        startTime: "21:00",
        priceMultiplier: 1.0
      },
      {
        movieId: "67890abcdef1234567890789",
        screenId: "12345abcdef1234567890789",
        date: new Date("2026-01-17"),
        startTime: "14:00",
        priceMultiplier: 0.9
      }
    ];

    await Show.insertMany(shows);
    console.log("✅ Shows seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
