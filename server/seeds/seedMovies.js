import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Movie from "../src/modules/movie/movie.model.js";

const seedMovies = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear old movies
    await Movie.deleteMany({});

    // Sample movies
    const movies = [
      {
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology.",
        duration: 148,
        language: ["English"],
        genre: ["Sci-Fi", "Thriller"],
        releaseDate: new Date("2010-07-16"),
        status: "ARCHIVED"
      },
      {
        title: "Interstellar",
        description: "Explorers travel through a wormhole in space to ensure humanity's survival.",
        duration: 169,
        language: ["English"],
        genre: ["Sci-Fi", "Adventure"],
        releaseDate: new Date("2014-11-07"),
        status: "ARCHIVED"
      }
    ];

    await Movie.insertMany(movies);
    console.log("✅ Movies seeded successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Movie seeding failed:", err.message);
    process.exit(1);
  }
};

seedMovies();
