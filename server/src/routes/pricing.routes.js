import express from "express";
import { getPricing, applyCoupon } from "../modules/pricing/pricing.controller.js";

const router = express.Router();

// Get pricing for a show
router.get("/:showId", getPricing);

// Apply coupon
router.post("/apply", applyCoupon);

export default router;
