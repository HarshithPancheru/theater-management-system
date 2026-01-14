import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";
import Theater from "../src/modules/theater/theater.model.js";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const theaters = [
      {
        name: "PVR Cinemas",
        location: "Bangalore",
        amenities: ["Dolby Atmos", "3D", "Snacks"],
        contactNumber: "9876543210",
        openingTime: "09:00",
        closingTime: "23:00",
        status: "ACTIVE"
      },
      {
        name: "INOX",
        location: "Mumbai",
        amenities: ["IMAX", "Luxury Recliners"],
        contactNumber: "9123456780",
        openingTime: "10:00",
        closingTime: "22:00",
        status: "ACTIVE"
      },
      {
        name: "Cinepolis",
        location: "Delhi",
        amenities: ["4DX", "Food Court"],
        contactNumber: "9988776655",
        openingTime: "08:30",
        closingTime: "23:30",
        status: "INACTIVE"
      }
    ];

    await Theater.insertMany(theaters);
    console.log("✅ Theaters seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
