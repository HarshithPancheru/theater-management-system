import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },

    prices: {
      PREMIUM: Number,
      GOLD: Number,
      SILVER: Number,
      BALCONY: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Pricing", pricingSchema);
