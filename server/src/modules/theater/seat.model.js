import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true
    },

    rowLabel: {
      type: String,
      required: true
    },

    seatLabel: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["GOLD", "SILVER", "RECLINER", "WHEELCHAIR"],
      required: true
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED", "BLOCKED"],
      default: "AVAILABLE"
    }
  },
  { timestamps: true }
);

/* Ensure no duplicate seat labels per screen */
seatSchema.index(
  { screenId: 1, seatLabel: 1 },
  { unique: true }
);

export default mongoose.model("Seat", seatSchema);
