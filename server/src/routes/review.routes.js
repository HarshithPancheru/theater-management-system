import express from "express";
import {
  addReview,
  getReviewsByMovie
} from "../modules/review/review.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * POST /reviews
 * Only USER role
 * Add review & rating (only if watched)
 */
router.post(
  "/reviews",
  authMiddleware,
  roleMiddleware("USER"),
  addReview
);

/**
 * GET /reviews/movie/:movieId
 * Public (any logged-in user can view reviews)
 */
router.get(
  "/reviews/movie/:movieId",
  authMiddleware,
  getReviewsByMovie
);

export default router;
