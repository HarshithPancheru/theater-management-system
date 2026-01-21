import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    duration: { type: Number }, // minutes

    language: { type: String },

    genre: [{ type: String }],

    releaseDate: { type: Date },

    status: {
      type: String,
      enum: ["UPCOMING", "NOW_SHOWING", "ARCHIVED"],
      default: "UPCOMING"
    },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
