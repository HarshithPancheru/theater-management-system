import express from "express";
import {
  createTheater,
  getTheaters,
  updateTheater,
  toggleTheaterStatus,
  addScreen
} from "../modules/theater/theater.controller.js";

const router = express.Router();

router.post("/", createTheater);
router.get("/", getTheaters);
router.put("/:theaterId", updateTheater);
router.patch("/:theaterId/status", toggleTheaterStatus);
router.post("/:theaterId/screens", addScreen);

export default router;
