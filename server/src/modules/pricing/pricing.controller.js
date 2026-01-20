import * as pricingService from "./pricing.service.js";

/* Get pricing for a show */
export const getPricing = async (req, res, next) => {
  try {
    const { showId } = req.params;

    if (!showId) {
      return res.status(400).json({
        success: false,
        message: "showId is required"
      });
    }

    const pricing = await pricingService.getPricing(showId);

    res.json({
      success: true,
      data: pricing
    });
  } catch (error) {
    next(error);
  }
};

/* Apply coupon */
export const applyCoupon = async (req, res, next) => {
  try {
    const { showId, category, couponCode } = req.body;

    if (!showId || !category || !couponCode) {
      return res.status(400).json({
        success: false,
        message: "showId, category, and couponCode are required"
      });
    }

    const result = await pricingService.applyCoupon(showId, category, couponCode);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
