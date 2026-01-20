// server/seeds/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../src/modules/auth/auth.model.js";
import Theater from "../src/modules/theater/theater.model.js";
import Screen from "../src/modules/theater/screen.model.js";
import Seat from "../src/modules/theater/seat.model.js";
import Movie from "../src/modules/movie/movie.model.js";
import Show from "../src/modules/show/show.model.js";
import ShowSeat from "../src/modules/booking/showSeat.model.js";
import Pricing from "../src/modules/pricing/pricing.model.js";
import Booking from "../src/modules/booking/booking.model.js";
import Coupon from "../src/modules/pricing/coupon.model.js";
import Review from "../src/modules/review/review.model.js";
import Notification from "../src/modules/notification/notification.model.js";

dotenv.config({ path: ".env" });

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    // ----- CLEAN DATABASE -----
    await Promise.all([
      User.deleteMany({}),
      Theater.deleteMany({}),
      Screen.deleteMany({}),
      Seat.deleteMany({}),
      Movie.deleteMany({}),
      Show.deleteMany({}),
      ShowSeat.deleteMany({}),
      Pricing.deleteMany({}),
      Booking.deleteMany({}),
      Coupon.deleteMany({}),
      Review.deleteMany({}),
      Notification.deleteMany({})
    ]);

    console.log("Cleared existing data");

    // ----- 1) USERS -----
    const users = await User.create([
      {
        name: "Super Admin",
        email: "admin@pvr.com",
        passwordHash: "hashed_dummy_123",
        role: "SUPER_ADMIN",
        status: "ACTIVE"
      },
      {
        name: "Theater Manager",
        email: "manager@pvr.com",
        passwordHash: "hashed_dummy_123",
        role: "THEATER_MANAGER",
        status: "ACTIVE"
      },
      {
        name: "Customer One",
        email: "user1@test.com",
        passwordHash: "hashed_dummy_123",
        role: "USER",
        status: "ACTIVE"
      }
    ]);

    const customer = users[2];

    // ----- 2) THEATER -----
    const theater = await Theater.create({
      name: "PVR Orion Mall",
      location: "Bangalore",
      amenities: ["Parking", "Food Court", "Recliner Seats"],
      contactNumber: "9999999999",
      openingTime: "09:00",
      closingTime: "23:00",
      status: "ACTIVE"
    });

    // ----- 3) SCREEN -----
    const screen = await Screen.create({
      theaterId: theater._id,
      name: "Screen 1",
      capacity: 20,
      type: "2D"
    });

    // ----- 4) SEATS (A1–A10, B1–B10) -----
    const seatDocs = [];

    for (let i = 1; i <= 10; i++) {
      seatDocs.push({
        screenId: screen._id,
        seatLabel: `A${i}`,
        rowLabel: "A",
        category: i <= 5 ? "GOLD" : "SILVER"
      });
    }

    for (let i = 1; i <= 10; i++) {
      seatDocs.push({
        screenId: screen._id,
        seatLabel: `B${i}`,
        rowLabel: "B",
        category: i <= 5 ? "PREMIUM" : "BALCONY"
      });
    }

    const seats = await Seat.create(seatDocs);

    // ----- 5) MOVIE -----
    const movie = await Movie.create({
      title: "Pathaan",
      description: "Action thriller",
      duration: 150,
      language: ["Hindi", "English"],
      genre: ["Action", "Thriller"],
      releaseDate: new Date("2026-01-01"),
      status: "NOW_SHOWING"
    });

    // ----- 6) SHOW -----
    const show = await Show.create({
      movieId: movie._id,
      screenId: screen._id,
      date: new Date(), // today
      startTime: "18:30",
      priceMultiplier: 1.2
    });

    // ----- 7) SHOWSEATS (initially AVAILABLE) -----
    const showSeatDocs = seats.map(seat => ({
      showId: show._id,
      seatId: seat._id,
      status: "AVAILABLE",
      lockedUntil: null
    }));

    await ShowSeat.create(showSeatDocs);

    // ----- 8) PRICING -----
    await Pricing.create({
      showId: show._id,
      prices: {
        PREMIUM: 350,
        GOLD: 250,
        SILVER: 180,
        BALCONY: 150
      }
    });

    // ----- 9) COUPON -----
    await Coupon.create({
      code: "NEWUSER",
      discountAmount: 50,
      isActive: true
    });

    // ----- 10) SAMPLE BOOKING (2 seats booked) -----
    const bookedSeats = seats.slice(0, 2); // A1, A2

    await Booking.create({
      userId: customer._id,
      showId: show._id,
      seatIds: bookedSeats.map(s => s._id),
      paymentMethod: "UPI",
      totalAmount: 500,
      status: "CONFIRMED"
    });

    // Mark those seats as BOOKED
    await ShowSeat.updateMany(
      { showId: show._id, seatId: { $in: bookedSeats.map(s => s._id) } },
      { status: "BOOKED", lockedUntil: null }
    );

    // ----- 11) REVIEW -----
    await Review.create({
      movieId: movie._id,
      userId: customer._id,
      rating: 4,
      comment: "Good action movie"
    });

    // ----- 12) NOTIFICATION -----
    await Notification.create({
      userId: customer._id,
      type: "BOOKING",
      message: "Your booking for Pathaan is confirmed",
      isRead: false
    });

    console.log("Seeding completed successfully ✅");
    console.log({
      theaterId: theater._id.toString(),
      screenId: screen._id.toString(),
      movieId: movie._id.toString(),
      showId: show._id.toString(),
      sampleSeats: bookedSeats.map(s => s.seatLabel)
    });

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

runSeed();
