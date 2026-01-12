import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true
    },

    seatLabel: { type: String, required: true }, // A1, A2

    rowLabel: { type: String, required: true },

    category: {
      type: String,
      enum: ["PREMIUM", "GOLD", "SILVER", "BALCONY"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Seat", seatSchema);
