import * as theaterService from "./theater.service.js";


/**
 * Create new theater
 */
export const createTheater = async (req, res, next) => {
  try {
    const theater = await theaterService.createTheater(req.body);

    return res.status(201).json({
      success: true,
      message: "Theater created successfully",
      data: theater
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all theaters (with search & filter)
 */
export const getTheaters = async (req, res, next) => {
  try {
    console.log("🚀 CORRECT CONTROLLER FILE RUNNING");
    const theaters = await theaterService.getTheaters(req.query);

    return res.json({
      success: true,
      message: "Theaters fetched successfully",
      data: theaters
    });
  } catch (error) {
    next(error);
  }
};



/**
 * Update theater details
 */
export const updateTheater = async (req, res, next) => {
  try {
    const { theaterId } = req.params;

    const updatedTheater = await theaterService.updateTheater(
      theaterId,
      req.body
    );

    return res.json({
      success: true,
      message: "Theater updated successfully",
      data: updatedTheater
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Activate / Deactivate theater
 */
export const toggleTheaterStatus = async (req, res, next) => {
  try {
    const { theaterId } = req.params;

    const theater = await theaterService.toggleTheaterStatus(theaterId);

    return res.json({
      success: true,
      message: "Theater status updated",
      data: theater
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTheater = async (req, res, next) => {
  try {
    const { theaterId } = req.params;

    const deleted = await theaterService.deleteTheater(theaterId);

    return res.json({
      success: true,
      message: "Theater deleted successfully",
      data: deleted
    });
  } catch (error) {
    next(error);
  }
};
