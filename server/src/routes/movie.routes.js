import express from "express";
import {
  addMovie,
  getMovies,
  getMovieDetails,
  updateMovie,
  deleteMovie,
} from "../modules/movie/movie.controller.js";
import { movieUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Add movie with image upload
// 👇 make sure field name matches frontend: "poster"
router.post("/", movieUpload.single("poster"), addMovie);

// Get all movies
router.get("/", getMovies);

// Get movie details by ID
router.get("/:movieId", getMovieDetails);

// Update movie
router.put("/:movieId", movieUpload.single("poster"), updateMovie);

// Delete movie
router.delete("/:movieId", deleteMovie);

export default router;
