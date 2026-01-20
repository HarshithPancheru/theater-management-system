import axios from "axios";

const BASE_URL = "http://localhost:5000/pricing";

/**
 * Fetch pricing details for a given show
 */
export const fetchPricing = async (showId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${showId}`);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching pricing:", err);
    throw err;
  }
};

/**
 * Apply a coupon to a category for a given show
 */
export const applyCoupon = async (showId, category, couponCode) => {
  try {
    const res = await axios.post(`${BASE_URL}/apply`, {
      showId,
      category,
      couponCode,
    });
    return res.data.data;
  } catch (err) {
    console.error("Error applying coupon:", err);
    throw err;
  }
};
