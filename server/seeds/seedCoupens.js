import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Coupon from "../src/modules/pricing/coupon.model.js"; // adjust path if needed

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const coupons = [
      {
        code: "WELCOME50",
        discountAmount: 50,
        isActive: true
      },
      {
        code: "NEWYEAR2026",
        discountAmount: 100,
        isActive: true
      },
      {
        code: "EXPIRED10",
        discountAmount: 10,
        isActive: false
      }
    ];

    await Coupon.insertMany(coupons);
    console.log("✅ Coupons seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
