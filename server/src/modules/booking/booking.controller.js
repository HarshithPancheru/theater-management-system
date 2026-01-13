export const lockSeats = async (req, res, next) => {
  try {
    // TODO: bookingService.lockSeats(...)
    return res.json({
      success: true,
      message: "Lock seats controller reached",
      data: { expiresInSeconds: 300 }
    });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    // TODO: bookingService.createBooking(...)
    return res.json({
      success: true,
      message: "Create booking controller reached"
    });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    // TODO: bookingService.getMyBookings(...)
    return res.json({
      success: true,
      message: "Get my bookings controller reached",
      data: []
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingDetails = async (req, res, next) => {
  try {
    // TODO: bookingService.getBookingDetails(...)
    return res.json({
      success: true,
      message: "Get booking details controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    // TODO: bookingService.cancelBooking(...)
    return res.json({
      success: true,
      message: "Cancel booking controller reached"
    });
  } catch (err) {
    next(err);
  }
};
