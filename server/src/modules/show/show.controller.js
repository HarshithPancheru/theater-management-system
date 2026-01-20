import * as showService from "./show.service.js";

// ➡️ Create a new show
export const createShow = async (req, res, next) => {
  try {
    const show = await showService.createShow(req.body);
    res.json({ success: true, data: show });
  } catch (err) {
    // Example: conflict error if same screen/time
    res.status(400).json({ success: false, message: err.message });
  }
};

// ➡️ Get all shows for a movie
export const getShowsByMovie = async (req, res, next) => {
  try {
    const shows = await showService.getShowsByMovie(req.params.movieId);
    res.json({ success: true, data: shows });
  } catch (err) {
    next(err);
  }
};

// ➡️ Update show by ID
export const updateShow = async (req, res, next) => {
  try {
    const show = await showService.updateShow(req.params.id, req.body);
    if (!show) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }
    res.json({ success: true, data: show });
  } catch (err) {
    next(err);
  }
};

// ➡️ Delete show by ID
export const deleteShow = async (req, res, next) => {
  try {
    const deleted = await showService.deleteShow(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }
    res.json({ success: true, message: "Show deleted" });
  } catch (err) {
    next(err);
  }
};
