import * as screenService from "./screen.service.js";

/**
 * Add screen to a theater
 */
export const addScreen = async (req, res, next) => {
  try {
    const { theaterId } = req.params;

    const screen = await screenService.addScreen(theaterId, req.body);

    return res.status(201).json({
      success: true,
      message: "Screen added successfully",
      data: screen
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all screens for a theater
 */
export const getScreensByTheater = async (req, res, next) => {
  try {
    const { theaterId } = req.params;

    const screens = await screenService.getScreensByTheater(theaterId);

    return res.json({
      success: true,
      message: "Screens fetched successfully",
      data: screens
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Activate / Deactivate screen
 */
export const toggleScreenStatus = async (req, res, next) => {
  try {
    const { screenId } = req.params;

    const screen = await screenService.toggleScreenStatus(screenId);

    return res.json({
      success: true,
      message: "Screen status updated",
      data: screen
    });
  } catch (error) {
    next(error);
  }
};
