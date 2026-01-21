import dotenv from "dotenv";
import mongoose from "mongoose";
import Movie from "../src/modules/movie/movie.model.js";

dotenv.config();

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    const movies = [
      {
        title: "Inception",
        description: "A mind-bending thriller about dreams within dreams.",
        duration: 148,
        language: "English",   // ✅ single string
        genre: ["Sci-Fi", "Thriller"],
        releaseDate: new Date("2010-07-16"),
        status: "ARCHIVED",
        image: "/uploads/movies/Inception.webp",
      },
      {
        title: "RRR",
        description: "An epic action drama set in 1920s India.",
        duration: 182,
        language: "Telugu",    // ✅ pick one main language
        genre: ["Action", "Drama"],
        releaseDate: new Date("2022-03-25"),
        status: "NOW_SHOWING",
        image: "/uploads/movies/RRR.webp",
      },
      {
        title: "Avatar 3",
        description: "The next chapter in Pandora’s saga.",
        duration: 165,
        language: "English",
        genre: ["Sci-Fi", "Adventure"],
        releaseDate: new Date("2028-12-20"),
        status: "UPCOMING",
        image: "/uploads/movies/Avatar 3.webp",
      },
      {
        title: "Interstellar",
        description: "Explorers travel through a wormhole in space.",
        duration: 169,
        language: "English",
        genre: ["Sci-Fi", "Drama"],
        releaseDate: new Date("2014-11-07"),
        status: "ARCHIVED",
        image: "/uploads/movies/Interstellar.webp",
      },
      {
        title: "Baahubali",
        description: "A legendary tale of warriors and kingdoms.",
        duration: 159,
        language: "Telugu",    // ✅ single string
        genre: ["Action", "Fantasy"],
        releaseDate: new Date("2015-07-10"),
        status: "ARCHIVED",
        image: "/uploads/movies/baahuba conc.jpeg",
      },
      {
        title: "The Dark Knight",
        description: "Batman faces the Joker in Gotham City.",
        duration: 152,
        language: "English",
        genre: ["Action", "Crime"],
        releaseDate: new Date("2008-07-18"),
        status: "ARCHIVED",
        image: "/uploads/movies/The dark night.webp",
      },
      {
        title: "Pushpa",
        description: "A story of red sandalwood smuggling in India.",
        duration: 179,
        language: "Telugu",
        genre: ["Action", "Drama"],
        releaseDate: new Date("2021-12-17"),
        status: "NOW_SHOWING",
        image: "/uploads/movies/pushpa.webp",
      },
      {
        title: "Titanic",
        description: "A romance set against the ill-fated ship.",
        duration: 195,
        language: "English",
        genre: ["Romance", "Drama"],
        releaseDate: new Date("1997-12-19"),
        status: "ARCHIVED",
        image: "/uploads/movies/titanic.webp",
      },
      {
        title: "KGF Chapter 2",
        description: "Rocky continues his rise in the underworld.",
        duration: 168,
        language: "Kannada",   // ✅ single string
        genre: ["Action", "Drama"],
        releaseDate: new Date("2022-04-14"),
        status: "NOW_SHOWING",
        image: "/uploads/movies/kgf2.webp",
      },
      {
        title: "Spider-Man: No Way Home",
        description: "Spider-Man faces villains from multiple universes.",
        duration: 148,
        language: "English",
        genre: ["Action", "Superhero"],
        releaseDate: new Date("2021-12-17"),
        status: "ARCHIVED",
        image: "/uploads/movies/spidermannowayhome.webp",
      },
    ];

    await Movie.insertMany(movies);
    console.log("✅ Seed movies inserted");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedMovies();
