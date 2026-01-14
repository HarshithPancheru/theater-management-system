import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Notification from "../src/modules/notification/notification.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace userId with actual ObjectId from your Users collection
    const notifications = [
      {
        userId: "67890abcdef1234567890123", // Example User _id
        type: "BOOKING",
        message: "Your booking for Inception is confirmed.",
        isRead: false
      },
      {
        userId: "67890abcdef1234567890456",
        type: "OFFER",
        message: "Get 20% off on your next booking!",
        isRead: false
      },
      {
        userId: "67890abcdef1234567890789",
        type: "SYSTEM",
        message: "System maintenance scheduled for tonight.",
        isRead: true
      }
    ];

    await Notification.insertMany(notifications);
    console.log("✅ Notifications seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
