import Show from "./show.model.js";

// Create a new show
export const createShow = async (showData) => {
  // TODO: add conflict check logic here
  const show = new Show(showData);
  return await show.save();
};

// Get shows for a specific movie
export const getShowsByMovie = async (movieId) => {
  return await Show.find({ movieId }).populate("screenId").sort({ date: 1, startTime: 1 });
};

// Update show
export const updateShow = async (showId, updateData) => {
  return await Show.findByIdAndUpdate(showId, updateData, { new: true });
};

// Delete show
export const deleteShow = async (showId) => {
  return await Show.findByIdAndDelete(showId);
};
