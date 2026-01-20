import express from "express";
import {
  addMovie,
  getMovies,
  getMovieDetails,
  updateMovie,
  deleteMovie
} from "../modules/movie/movie.controller.js";

const router = express.Router();

router.post("/", addMovie);
router.get("/", getMovies);
router.get("/:id", getMovieDetails);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
