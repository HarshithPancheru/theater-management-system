import * as bookingService from "./booking.service.js";
import User from "../auth/auth.model.js"

/* Lock seats */
export const lockSeats = async (req, res, next) => {
  try {
    const { showId, seatIds } = req.body;

    if (!showId || !seatIds || seatIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "showId and seatIds are required"
      });
    }

    const result = await bookingService.lockSeats(showId, seatIds);

    res.json({
      success: true,
      message: "Seats locked successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/* Create booking */
export const createBooking = async (req, res, next) => {
  try {
    const { showId, seatIds, paymentMethod, couponCode } = req.body;
    const userId = req.user.id;

    if (!showId || !seatIds || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const booking = await bookingService.createBooking(
      userId,
      showId,
      seatIds,
      paymentMethod,
      couponCode // pass coupon
    );

    res.json({
      success: true,
      message: "Booking confirmed",
      data: { bookingId: booking._id, status: booking.status }
    });
  } catch (error) {
    next(error);
  }
};

/* Get my bookings */
export const getMyBookings = async (req, res, next) => {


  try {
    const bookings = await bookingService.getMyBookings(req.user.id);

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

/* Get booking details */
export const getBookingDetails = async (req, res, next) => {


  try {
    const booking = await bookingService.getBookingDetails(
      req.params.bookingId,
      req.user.id
    );

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

/* Cancel booking */
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(
      req.params.bookingId,
      req.user.id
    );

    res.json({
      success: true,
      message: "Booking cancelled",
      data: {
        bookingId: booking._id,
        status: booking.status
      }
    });
  } catch (error) {
    next(error);
  }
};



export const getAllBookings = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      sort,
      isShowOver
    } = req.query;
    
    let theaterId;
    
    if(req.user.role=="THEATER_MANAGER" || req.user.role== "STAFF"){
      const user = await User.findById(req.user.id, {theaterId:1});
      theaterId = user.theaterId;
      
      if(!theaterId) throw new Error("theaterId not found for role "+`\"${req.user.role}\"`)
    }

    const data = await bookingService.getAllBookings({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
      sort,
      isShowOver,
      theaterId
    });

    res.json({
      success: true,
      data: data.bookings,
      meta: data.meta
    });
  } catch (error) {
    next(error);
  }
};





