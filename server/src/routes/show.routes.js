import express from "express";
import {
  createShow,
  getShowsByMovie,
  updateShow,
  deleteShow
} from "../modules/show/show.controller.js";

const router = express.Router();

router.post("/", createShow);
router.get("/:movieId", getShowsByMovie);
router.put("/:id", updateShow);
router.delete("/:id", deleteShow);

export default router;
