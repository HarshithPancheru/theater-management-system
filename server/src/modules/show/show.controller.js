import * as showService from "./show.service.js";

// ➡️ Create a new show
export const createShow = async (req, res, next) => {
  try {
    const showData = req.body;
    const show = await showService.createShow(showData);
    res.status(201).json({ success: true, data: show });
  } catch (err) {
    next(err);
  }
};

// ➡️ Get all shows for a movie
export const getShowsByMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const shows = await showService.getShowsByMovie(movieId);

    if (!shows || shows.length === 0) {
      return res.status(404).json({ success: false, message: "No shows found for this movie" });
    }

    res.json({ success: true, data: shows });
  } catch (err) {
    next(err);
  }
};

// ➡️ Get show by ID
export const getShowById = async (req, res, next) => {
  try {
    const show = await showService.getShowById(req.params.showId);
    if (!show) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }
    res.json({ success: true, data: show });
  } catch (err) {
    next(err);
  }
};

// ➡️ Update show
export const updateShow = async (req, res, next) => {
  try {
    const show = await showService.updateShow(req.params.showId, req.body);
    if (!show) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }
    res.json({ success: true, data: show });
  } catch (err) {
    next(err);
  }
};

// ➡️ Delete show
export const deleteShow = async (req, res, next) => {
  try {
    const deleted = await showService.deleteShow(req.params.showId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }
    res.json({ success: true, message: "Show deleted successfully" });
  } catch (err) {
    next(err);
  }
};
