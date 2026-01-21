import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    passwordHash: { type: String, required: true },

    profilePhoto: { type: String },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "THEATER_MANAGER", "STAFF", "USER"],
      default: "USER"
    },

    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE"
    },

    // 🔑 Add this field to link managers/staff to a theater
    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: function () {
        return this.role === "THEATER_MANAGER" || this.role === "STAFF";
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
