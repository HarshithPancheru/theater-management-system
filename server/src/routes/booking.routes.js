import express from "express";
import {
  lockSeats,
  createBooking,
  getMyBookings,
  getBookingDetails,
  cancelBooking
} from "../modules/booking/booking.controller.js";

const router = express.Router();

router.post("/lock", lockSeats);
router.post("/", createBooking);
router.get("/my", getMyBookings);
router.get("/:bookingId", getBookingDetails);
router.post("/:bookingId/cancel", cancelBooking);

export default router;
