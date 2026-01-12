import mongoose from "mongoose";

const showSeatSchema = new mongoose.Schema(
  {
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },

    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "LOCKED", "BOOKED"],
      default: "AVAILABLE"
    },

    lockedUntil: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("ShowSeat", showSeatSchema);
