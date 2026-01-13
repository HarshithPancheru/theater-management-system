export const createShow = async (req, res, next) => {
  try {
    // TODO: showService.createShow(...)
    return res.json({
      success: true,
      message: "Create show controller reached"
    });
  } catch (err) {
    next(err);
  }
};

export const getShowsByMovie = async (req, res, next) => {
  try {
    // TODO: showService.getShowsByMovie(...)
    return res.json({
      success: true,
      message: "Get shows by movie controller reached",
      data: []
    });
  } catch (err) {
    next(err);
  }
};
