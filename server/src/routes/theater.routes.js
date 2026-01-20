import express from "express";

import {
  createTheater,
  getTheaters,
  updateTheater,
  toggleTheaterStatus
} from "../modules/theater/theater.controller.js";

import {
  addScreen,
  getScreensByTheater,
  toggleScreenStatus
} from "../modules/theater/screen.controller.js";

import {
  createSeatsForScreen,
  getSeatsByScreen
} from "../modules/theater/seat.controller.js";

const router = express.Router();

/* Theater routes */
router.post("/", createTheater);
router.get("/", getTheaters);
router.put("/:theaterId", updateTheater);
router.patch("/:theaterId/status", toggleTheaterStatus);

/* Screen routes */
router.post("/:theaterId/screens/add", addScreen);
router.get("/:theaterId/screens", getScreensByTheater);
router.patch("/screens/:screenId/status", toggleScreenStatus);

/* Seat routes */
router.post("/screens/:screenId/seats", createSeatsForScreen);
router.get("/screens/:screenId/seats", getSeatsByScreen);

export default router;
