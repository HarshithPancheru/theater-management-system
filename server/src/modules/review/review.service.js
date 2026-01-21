import axios from "axios";
import Review from "./review.model.js";

/**
 * Check if user has already reviewed the movie
 * Rule: One review per user per movie
 */
export const hasUserAlreadyReviewed = async (userId, movieId) => {
  const review = await Review.findOne({ userId, movieId });
  return !!review;
};

/**
 * Check if user has watched the movie
 * Rule: User must have at least one CONFIRMED booking
 * for a show whose movieId matches
 *
 * IMPORTANT:
 * - Do NOT access booking DB directly
 * - Always use Booking API
 */
export const canUserReviewMovie = async (userId, movieId) => {
  try {
    const response = await axios.get(
      `${process.env.BOOKING_SERVICE_URL}/bookings/my`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERNAL_SERVICE_TOKEN}`
        }
      }
    );

    if (!response.data.success) return false;

    const bookings = response.data.data;

    // Check confirmed booking for the movie
    return bookings.some(
      (booking) =>
        booking.status === "CONFIRMED" &&
        booking.movieId?.toString() === movieId.toString()
    );
  } catch (error) {
    console.error("Booking validation failed:", error);
    return false;
  }
};
