import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true
    },

    name: { type: String, required: true },

    capacity: { type: Number, required: true },

    type: {
      type: String,
      enum: ["2D", "3D", "IMAX", "4DX"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Screen", screenSchema);
