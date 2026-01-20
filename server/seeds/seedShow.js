import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Show from "../src/modules/show/show.model.js";
import Movie from "../src/modules/movie/movie.model.js";

const seedShows = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear old shows
    await Show.deleteMany({});

    // Get movies (assumes movies are already seeded)
    const movies = await Movie.find({});
    if (movies.length === 0) {
      throw new Error("No movies found. Seed movies first!");
    }

    // Sample shows
    const shows = [
      {
        movieId: movies[0]._id,
        screenId: new mongoose.Types.ObjectId(), // replace with real screen IDs
        date: new Date("2026-01-21"),
        startTime: "18:00",
        priceMultiplier: 1.2
      },
      {
        movieId: movies[1]._id,
        screenId: new mongoose.Types.ObjectId(),
        date: new Date("2026-01-21"),
        startTime: "21:00",
        priceMultiplier: 1.0
      }
    ];

    await Show.insertMany(shows);
    console.log("✅ Shows seeded successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Show seeding failed:", err.message);
    process.exit(1);
  }
};

seedShows();
