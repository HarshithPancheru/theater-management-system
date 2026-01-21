import Review from "./review.model.js";
import {
  canUserReviewMovie,
  hasUserAlreadyReviewed
} from "./review.service.js";

/**
 * POST /reviews
 * Add review & rating for a movie
 * Rule: Only USER role + only after CONFIRMED booking
 */
export const addReview = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { movieId, rating, comment } = req.body;

    // Basic validation
    if (!movieId || !rating) {
      return res.status(400).json({
        success: false,
        message: "movieId and rating are required"
      });
    }

    // Check if user has watched the movie
    const hasWatched = await canUserReviewMovie(userId, movieId);
    if (!hasWatched) {
      return res.status(403).json({
        success: false,
        message: "You can review only after watching the movie"
      });
    }

    // Prevent duplicate reviews (one review per user per movie)
    const alreadyReviewed = await hasUserAlreadyReviewed(userId, movieId);
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this movie"
      });
    }

    // Create review
    const review = await Review.create({
      movieId,
      userId,
      rating,
      comment
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: {
        reviewId: review._id,
        createdAt: review.createdAt
      }
    });
  } catch (error) {
    console.error("Add Review Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/**
 * GET /reviews/movie/:movieId
 * Get all reviews for a movie
 */
export const getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movieId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const formattedReviews = reviews.map((review) => ({
      userName: review.userId.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt
    }));

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: formattedReviews
    });
  } catch (error) {
    console.error("Get Reviews Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
