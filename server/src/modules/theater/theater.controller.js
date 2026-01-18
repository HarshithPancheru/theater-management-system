export const createTheater = async (req, res, next) => {
  try {
    // TODO: theaterService.createTheater(...)
    return res.json({
      success: true,
      message: "Create theater controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const getTheaters = async (req, res, next) => {
  try {
    // TODO: theaterService.getTheaters(...)
    return res.json({
      success: true,
      message: "Get theaters controller reached",
      data: []
    });
  } catch (err) {
    next(err);
  }
};

export const updateTheater = async (req, res, next) => {
  try {
    // TODO: theaterService.updateTheater(...)
    return res.json({
      success: true,
      message: "Update theater controller reached"
    });
  } catch (err) {
    next(err);
  }
};

export const toggleTheaterStatus = async (req, res, next) => {
  try {
    // TODO: theaterService.toggleStatus(...)
    return res.json({
      success: true,
      message: "Toggle theater status controller reached"
    });
  } catch (err) {
    next(err);
  }
};

export const addScreen = async (req, res, next) => {
  try {
    // TODO: theaterService.addScreen(...)
    return res.json({
      success: true,
      message: "Add screen controller reached"
    });
  } catch (err) {
    next(err);
  }
};

