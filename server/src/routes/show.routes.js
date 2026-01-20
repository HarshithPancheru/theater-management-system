import express from "express";
import {
  createShow,
  getShowsByMovie,updateShow,deleteShow,getShowById
} from "../modules/show/show.controller.js";

const router = express.Router();

router.post("/", createShow);
router.get("/movie/:movieId", getShowsByMovie);
router.put("/:showId", updateShow); 
router.delete("/:showId", deleteShow);
router.get("/:showId", getShowById);
export default router;
