import express from "express";
import {
  createShow,
  getShowsByMovie
} from "../modules/show/show.controller.js";

const router = express.Router();

router.post("/", createShow);
router.get("/movie/:movieId", getShowsByMovie);

export default router;
