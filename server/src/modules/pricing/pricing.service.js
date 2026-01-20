import Pricing from "./pricing.model.js";
import Coupon from "./coupon.model.js";

/**
 * Get pricing for a given show
 * @param {String} showId - The ID of the show
 * @returns {Object} pricing data
 */
export const getPricing = async (showId) => {
  const pricing = await Pricing.findOne({ showId });
  if (!pricing) {
    throw new Error("Pricing not found for this show");
  }

  // Return consistent JSON contract
  return {
    showId: pricing.showId,
    prices: pricing.prices,
    currency: "INR"
  };
};

/**
 * Apply coupon to a given seat category price
 * @param {String} showId - The ID of the show
 * @param {String} category - Seat category (PREMIUM, GOLD, SILVER, BALCONY)
 * @param {String} couponCode - Coupon code to apply
 * @returns {Object} final price computation
 */
export const applyCoupon = async (showId, category, couponCode) => {
  // Get base price
  const pricing = await Pricing.findOne({ showId });
  if (!pricing || !pricing.prices[category]) {
    throw new Error("Invalid show or category");
  }
  const basePrice = pricing.prices[category];

  // Validate coupon
  const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
  if (!coupon) {
    return {
      basePrice,
      discountApplied: 0,
      finalPrice: basePrice,
      currency: "INR",
      message: "Coupon invalid or inactive"
    };
  }

  // Apply discount
  const discountApplied = coupon.discountAmount;
  const finalPrice = Math.max(basePrice - discountApplied, 0);

  return {
    basePrice,
    discountApplied,
    finalPrice,
    currency: "INR",
    message: "Coupon applied successfully",
    couponCode: coupon.code // extra clarity
  };
};
