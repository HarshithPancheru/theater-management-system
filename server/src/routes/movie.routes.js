import express from "express";
import {
  addMovie,
  getMovies,
  getMovieDetails
} from "../modules/movie/movie.controller.js";
import { movieUpload } from "../middleware/upload.middleware.js"; // <-- named import
const router = express.Router();

// Add movie with image upload
router.post("/", movieUpload.single("image"), addMovie);

// Get all movies
router.get("/", getMovies);

// Get movie details by ID
router.get("/:movieId", getMovieDetails);

export default router;
