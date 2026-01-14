import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/env.js";   // go up one level from seeds/
import User from "../src/modules/auth/auth.model.js"; // adjust path if needed

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const users = [
      {
        name: "Adarsh Gogate",
        email: "adarsh@example.com",
        passwordHash: "hashedpassword123", // placeholder, normally bcrypt hash
        role: "SUPER_ADMIN",
        status: "ACTIVE"
      },
      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        passwordHash: "hashedpassword456",
        role: "THEATER_MANAGER",
        status: "ACTIVE"
      },
      {
        name: "Priya Singh",
        email: "priya@example.com",
        passwordHash: "hashedpassword789",
        role: "USER",
        status: "BLOCKED"
      }
    ];

    await User.insertMany(users);
    console.log("✅ Users seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
