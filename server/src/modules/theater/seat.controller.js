import * as seatService from "./seat.service.js";

/**
 * Bulk create seats for a screen
 */
export const createSeatsForScreen = async (req, res, next) => {
  try {
    const { screenId } = req.params;
    const { layout } = req.body;

    const seats = await seatService.createSeatsForScreen(screenId, layout);

    return res.status(201).json({
      success: true,
      message: "Seats created successfully",
      data: seats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all seats for a screen
 */
export const getSeatsByScreen = async (req, res, next) => {
  try {
    const { screenId } = req.params;

    const seats = await seatService.getSeatsByScreen(screenId);

    return res.json({
      success: true,
      message: "Seats fetched successfully",
      data: seats
    });
  } catch (error) {
    next(error);
  }
};
