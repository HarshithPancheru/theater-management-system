import express from "express";
import {
  addMovie,
  getMovies,
  getMovieDetails
} from "../modules/movie/movie.controller.js";

const router = express.Router();

router.post("/", addMovie);
router.get("/", getMovies);
router.get("/:movieId", getMovieDetails);
router.post("/", movieUpload.single("image"), addMovie);
export default router;
