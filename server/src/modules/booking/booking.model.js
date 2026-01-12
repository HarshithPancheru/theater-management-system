import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },

    seatIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat"
      }
    ],

    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "NET_BANKING", "WALLET"],
      required: true
    },

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
