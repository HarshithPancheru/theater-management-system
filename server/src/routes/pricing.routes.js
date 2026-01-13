import express from "express";
import {
  getPricing,
  applyCoupon
} from "../modules/pricing/pricing.controller.js";

const router = express.Router();

router.get("/:showId", getPricing);
router.post("/apply-coupon", applyCoupon);

export default router;