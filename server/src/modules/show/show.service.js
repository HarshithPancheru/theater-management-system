import Show from "./show.model.js";

// ➡️ Create a new show
export const createShow = async (showData) => {
  const show = new Show(showData);
  return await show.save();
};

// ➡️ Get shows by movieId
export const getShowsByMovie = async (movieId) => {
  return await Show.find({ movieId })
    .populate("screenId")
    .populate("movieId");
};

// ➡️ Get show by showId (optional, if you want single show fetch)
export const getShowById = async (showId) => {
  return await Show.findById(showId)
    .populate("screenId")
    .populate("movieId");
};

// ➡️ Update show by showId
export const updateShow = async (showId, updateData) => {
  return await Show.findByIdAndUpdate(showId, updateData, {
    new: true, // return updated doc
    runValidators: true // enforce schema validation
  })
    .populate("screenId")
    .populate("movieId");
};

// ➡️ Delete show by showId
export const deleteShow = async (showId) => {
  return await Show.findByIdAndDelete(showId);
};
