import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  lockSeats,
  createBooking,
  getMyBookings,
  getBookingDetails,
  cancelBooking,
  getAllBookings
} from "../modules/booking/booking.controller.js";

const router = express.Router();

router.post("/lock", authMiddleware, createBooking);
router.post("/", authMiddleware, createBooking);

router.get("/", authMiddleware, roleMiddleware(["SUPER_ADMIN"]), getAllBookings);
router.get("/my", authMiddleware, getMyBookings);

router.get("/:bookingId", authMiddleware, getBookingDetails);
router.post("/:bookingId/cancel", authMiddleware, cancelBooking);

export default router;
