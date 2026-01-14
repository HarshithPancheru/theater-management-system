import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Pricing from "../src/modules/pricing/pricing.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace showId with actual ObjectId from your Shows collection
    const pricing = [
      {
        showId: "78901abcdef1234567890123", // Example Show _id
        prices: {
          PREMIUM: 400,
          GOLD: 300,
          SILVER: 200,
          BALCONY: 150
        }
      },
      {
        showId: "78901abcdef1234567890456",
        prices: {
          PREMIUM: 500,
          GOLD: 350,
          SILVER: 250,
          BALCONY: 180
        }
      }
    ];

    await Pricing.insertMany(pricing);
    console.log("✅ Pricing seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
