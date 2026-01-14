import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Review from "../src/modules/review/review.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // ⚠️ Replace movieId and userId with actual ObjectIds from your Movies and Users collections
    const reviews = [
      {
        movieId: "67890abcdef1234567890123", // Example Movie _id
        userId: "12345abcdef1234567890123", // Example User _id
        rating: 5,
        comment: "Absolutely mind-blowing visuals and story!"
      },
      {
        movieId: "67890abcdef1234567890456",
        userId: "12345abcdef1234567890456",
        rating: 4,
        comment: "Great movie, but a bit long."
      },
      {
        movieId: "67890abcdef1234567890789",
        userId: "12345abcdef1234567890789",
        rating: 3,
        comment: "Good performances, but average plot."
      }
    ];

    await Review.insertMany(reviews);
    console.log("✅ Reviews seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
