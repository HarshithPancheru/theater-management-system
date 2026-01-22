import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      reqletired: true
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // HH:mm
    endTime: { type: String, required: true },   // HH:mm
    priceMultiplier: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model("Show", showSchema);
