import Booking from "./booking.model.js";
import ShowSeat from "./showSeat.model.js";
import Pricing from "../pricing/pricing.model.js";
import Show from "../show/show.model.js";
import Movie from "../movie/movie.model.js";
import Screen from "../theater/screen.model.js";
import Theater from "../theater/theater.model.js";

const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/* Lock seats for a show */
export const lockSeats = async (showId, seatIds) => {
  const now = new Date();
  const lockUntil = new Date(now.getTime() + LOCK_DURATION_MS);

  // Check if any seat is already locked or booked
  const unavailableSeat = await ShowSeat.findOne({
    showId,
    seatId: { $in: seatIds },
    status: { $in: ["LOCKED", "BOOKED"] }
  });

  if (unavailableSeat) {
    throw new Error("One or more seats are not available");
  }

  // Lock seats
  await ShowSeat.updateMany(
    { showId, seatId: { $in: seatIds } },
    {
      status: "LOCKED",
      lockedUntil: lockUntil
    }
  );

  return {
    expiresInSeconds: LOCK_DURATION_MS / 1000
  };
};

/* Create booking */
export const createBooking = async (
  userId,
  showId,
  seatIds,
  paymentMethod
) => {
  const now = new Date();

  // Verify seats are locked by user and not expired
  const lockedSeats = await ShowSeat.find({
    showId,
    seatId: { $in: seatIds },
    status: "LOCKED",
    lockedUntil: { $gt: now }
  });

  if (lockedSeats.length !== seatIds.length) {
    throw new Error("Seat lock expired or invalid");
  }

  // Get pricing
  const pricing = await Pricing.findOne({ showId });
  if (!pricing) {
    throw new Error("Pricing not configured for this show");
  }

  // Calculate total amount
  let totalAmount = 0;
  for (const seat of lockedSeats) {
    const categoryPrice = pricing.prices[seat.category];
    if (!categoryPrice) {
      throw new Error("Seat pricing missing");
    }
    totalAmount += categoryPrice;
  }

  // Create booking
  const booking = await Booking.create({
    userId,
    showId,
    seatIds,
    paymentMethod,
    totalAmount,
    status: "CONFIRMED"
  });

  // Mark seats as booked
  await ShowSeat.updateMany(
    { showId, seatId: { $in: seatIds } },
    {
      status: "BOOKED",
      lockedUntil: null
    }
  );

  return booking;
};

/* Get bookings for logged-in user */
export const getMyBookings = async (userId) => {
  const bookings = await Booking.find({ userId }, { _id: 1, showId: 1 })
    .select("status")
    .sort({ createdAt: -1 })
    .populate({
      path: "showId",
      select: "startTime date",
      populate: [
        { path: "movieId", select: "title" },
        {
          path: "screenId", select: "_id type",
          populate: { path: "theaterId", select: "name location" }
        }
      ]
    });

  return bookings.map(b => ({
    bookingId: b._id,
    movieTitle: b.showId.movieId.title,
    startTime: b.showId.startTime,
    date: b.showId.date,
    theaterName: b.showId.screenId.theaterId.name,
    location: b.showId.screenId.theaterId.location,
    screenType: b.showId.screenId.type,
    status: b.status
  }));

};


/* Get booking details */
export const getBookingDetails = async (bookingId, userId) => {
  const booking = await Booking.findOne({ _id: bookingId, userId })
    .select("totalAmount paymentMethod status")
    .populate([
      {
        path: "seatIds",
        select: "seatLabel rowLabel category"
      },
      {
        path: "showId",
        select: "startTime date",
        populate: [
          {
            path: "movieId",
            select: "title duration language"
          },
          {
            path: "screenId",
            select: "name type",
            populate:
            {
              path: "theaterId",
              select: "name location amenities contactNumber"
            }
          }]
      }
    ]);

  if (!booking) {
    throw new Error("Booking not found");
  }

  return {
    bookingId: booking._id,
    movieId: booking.showId.movieId._id,
    title: booking.showId.movieId.title,
    duration: booking.showId.movieId.duration,
    language: booking.showId.movieId.language,
    theater: booking.showId.screenId.theaterId.name,
    location: booking.showId.screenId.theaterId.location,
    amenities: booking.showId.screenId.theaterId.amenities,
    contactNumber: booking.showId.screenId.theaterId.contactNumber,
    screen: booking.showId.screenId.name,
    screenType: booking.showId.screenId.type,
    date: booking.showId.date,
    time: booking.showId.startTime,
    seats: booking.seatIds.map((seat) => `${seat.seatLabel}[${seat.category}]`),
    amount: booking.totalAmount,
    paymentMethod: booking.paymentMethod,
    status: booking.status
  };
};

/* Cancel booking */
export const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    userId
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("Booking already cancelled");
  }

  booking.status = "CANCELLED";
  await booking.save();

  // Free seats
  await ShowSeat.updateMany(
    { showId: booking.showId, seatId: { $in: booking.seatIds } },
    {
      status: "AVAILABLE",
      lockedUntil: null
    }
  );

  return booking;
};

export const getAllBookings = async ({
  page = 1,
  limit = 20,
  search,
  status,
  sort,
  isShowOver
}) => {
  const pipeline = [
    /* ================= BOOKINGS → USERS ================= */
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },

    /* ================= BOOKINGS → SHOWS ================= */
    {
      $lookup: {
        from: "shows",
        localField: "showId",
        foreignField: "_id",
        as: "show"
      }
    },
    { $unwind: "$show" },

    /* ================= SHOWS → MOVIES ================= */
    {
      $lookup: {
        from: "movies",
        localField: "show.movieId",
        foreignField: "_id",
        as: "movie"
      }
    },
    { $unwind: "$movie" },

    /* ================= SHOWS → SCREENS ================= */
    {
      $lookup: {
        from: "screens",
        localField: "show.screenId",
        foreignField: "_id",
        as: "screen"
      }
    },
    { $unwind: "$screen" },

    /* ================= SCREENS → THEATERS ================= */
    {
      $lookup: {
        from: "theaters",
        localField: "screen.theaterId",
        foreignField: "_id",
        as: "theater"
      }
    },
    { $unwind: "$theater" }
  ];

  /* ================= SEARCH ================= */
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { bookingId: search },
          { "user.name": { $regex: search, $options: "i" } },
          { "user.email": { $regex: search, $options: "i" } },
          { "movie.title": { $regex: search, $options: "i" } },
          { "theater.name": { $regex: search, $options: "i" } }
        ]
      }
    });
  }

  /* ================= STATUS FILTER ================= */
  if (status) {
    pipeline.push({ $match: { status } });
  }

  /* ================= FIX DATE STRING → DATE ================= */
  pipeline.push({
    $addFields: {
      showDateObj: {
        $toDate: "$show.date"   // converts ISO string → Date
      }
    }
  });

  /* ================= BUILD SHOW START DATETIME ================= */
  pipeline.push({
    $addFields: {
      showStartDateTime: {
        $dateFromString: {
          dateString: {
            $concat: [
              { $dateToString: { format: "%Y-%m-%d", date: "$showDateObj" } },
              "T",
              "$show.startTime",
              ":00"
            ]
          }
        }
      }
    }
  });

  /* ================= BUILD SHOW END DATETIME ================= */
  pipeline.push({
    $addFields: {
      showEndTime: {
        $dateAdd: {
          startDate: "$showStartDateTime",
          unit: "minute",
          amount: "$movie.duration"
        }
      }
    }
  });

  /* ================= SHOW OVER FILTER ================= */
  if (isShowOver !== undefined) {
    pipeline.push({
      $match: {
        showEndTime:
          isShowOver === "true"
            ? { $lt: new Date() }
            : { $gte: new Date() }
      }
    });
  }

  /* ================= SORT ================= */
  const sortMap = {
    booking_datetime_desc: { createdAt: -1 },
    booking_datetime_asc: { createdAt: 1 },
    show_datetime_desc: { showStartDateTime: -1 },
    show_datetime_asc: { showStartDateTime: 1 }
  };

  pipeline.push({
    $sort: sortMap[sort] || { createdAt: -1 }
  });

  /* ================= PAGINATION ================= */
  pipeline.push(
    { $skip: (page - 1) * limit },
    { $limit: limit }
  );

  /* ================= FINAL SHAPE ================= */
  pipeline.push({
    $project: {
      bookingId: 1,
      status: 1,
      amount: 1,
      createdAt: 1,

      username: "$user.name",
        email: "$user.email",

      movieTitle: "$movie.title",

      showStartDateTime: 1,
      showEndTime: 1,

      theaterName: "$theater.name",
      location: "$theater.location"
    }
  });

  /* ================= EXECUTE MAIN QUERY ================= */
  const bookings = await Booking.aggregate(pipeline);

  /* ================= TOTAL COUNT (NO PAGINATION) ================= */
  const countPipeline = pipeline.filter(
    stage =>
      !("$skip" in stage) &&
      !("$limit" in stage) &&
      !("$project" in stage)
  );

  countPipeline.push({ $count: "total" });

  const totalResult = await Booking.aggregate(countPipeline);
  return {
    bookings,
    meta: {
      page,
      limit,
      total: totalResult[0]?.total || 0
    }
  };
};
