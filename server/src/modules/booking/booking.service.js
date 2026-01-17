import Booking from "./booking.model.js";
import ShowSeat from "./showSeat.model.js";
import Pricing from "../pricing/pricing.model.js";

const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/* Lock seats for a show */
export const lockSeats = async (showId, seatIds) => {
  const now = new Date();
  const lockUntil = new Date(now.getTime() + LOCK_DURATION_MS);

  // Check if any seat is already locked or booked
  const unavailableSeat = await ShowSeat.findOne({
    showId,
    seatId: { $in: seatIds },
    status: { $in: ["LOCKED", "BOOKED"] }
  });

  if (unavailableSeat) {
    throw new Error("One or more seats are not available");
  }

  // Lock seats
  await ShowSeat.updateMany(
    { showId, seatId: { $in: seatIds } },
    {
      status: "LOCKED",
      lockedUntil: lockUntil
    }
  );

  return {
    expiresInSeconds: LOCK_DURATION_MS / 1000
  };
};

/* Create booking */
export const createBooking = async (
  userId,
  showId,
  seatIds,
  paymentMethod
) => {
  const now = new Date();

  // Verify seats are locked by user and not expired
  const lockedSeats = await ShowSeat.find({
    showId,
    seatId: { $in: seatIds },
    status: "LOCKED",
    lockedUntil: { $gt: now }
  });

  if (lockedSeats.length !== seatIds.length) {
    throw new Error("Seat lock expired or invalid");
  }

  // Get pricing
  const pricing = await Pricing.findOne({ showId });
  if (!pricing) {
    throw new Error("Pricing not configured for this show");
  }

  // Calculate total amount
  let totalAmount = 0;
  for (const seat of lockedSeats) {
    const categoryPrice = pricing.prices[seat.category];
    if (!categoryPrice) {
      throw new Error("Seat pricing missing");
    }
    totalAmount += categoryPrice;
  }

  // Create booking
  const booking = await Booking.create({
    userId,
    showId,
    seatIds,
    paymentMethod,
    totalAmount,
    status: "CONFIRMED"
  });

  // Mark seats as booked
  await ShowSeat.updateMany(
    { showId, seatId: { $in: seatIds } },
    {
      status: "BOOKED",
      lockedUntil: null
    }
  );

  return booking;
};

/* Get bookings for logged-in user */
export const getMyBookings = async (userId) => {
  return Booking.find({ userId }).sort({ createdAt: -1 });
};

/* Get booking details */
export const getBookingDetails = async (bookingId, userId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    userId
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

/* Cancel booking */
export const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    userId
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("Booking already cancelled");
  }

  booking.status = "CANCELLED";
  await booking.save();

  // Free seats
  await ShowSeat.updateMany(
    { showId: booking.showId, seatId: { $in: booking.seatIds } },
    {
      status: "AVAILABLE",
      lockedUntil: null
    }
  );

  return booking;
};
