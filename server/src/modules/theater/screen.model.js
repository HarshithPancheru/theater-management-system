import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["2D", "3D", "IMAX", "4DX"],
      required: true
    },

    capacity: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Screen", screenSchema);
