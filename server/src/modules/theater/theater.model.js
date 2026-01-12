import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    location: { type: String, required: true },

    amenities: [{ type: String }],

    contactNumber: { type: String },

    openingTime: { type: String }, // HH:mm
    closingTime: { type: String }, // HH:mm

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Theater", theaterSchema);
