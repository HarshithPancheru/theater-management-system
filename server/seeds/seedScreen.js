import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Screen from "../src/modules/screen/screen.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace theaterId with actual ObjectId from your Theaters collection
    const screens = [
      {
        theaterId: "67890abcdef1234567890123", // Example Theater _id
        name: "Screen 1",
        capacity: 200,
        type: "IMAX"
      },
      {
        theaterId: "67890abcdef1234567890456", // Example Theater _id
        name: "Screen 2",
        capacity: 150,
        type: "3D"
      },
      {
        theaterId: "67890abcdef1234567890789", // Example Theater _id
        name: "Screen 3",
        capacity: 100,
        type: "2D"
      }
    ];

    await Screen.insertMany(screens);
    console.log("✅ Screens seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
