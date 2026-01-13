export const getPricing = async (req, res, next) => {
  try {
    // TODO: pricingService.getPricing(...)
    return res.json({
      success: true,
      message: "Get pricing controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const applyCoupon = async (req, res, next) => {
  try {
    // TODO: pricingService.applyCoupon(...)
    return res.json({
      success: true,
      message: "Apply coupon controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
