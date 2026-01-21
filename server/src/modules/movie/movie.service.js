import Movie from "./movie.model.js";

// ➡️ Add a new movie
export const addMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return await movie.save();
};

// ➡️ Get all movies
export const getMovies = async () => {
  return await Movie.find();
};

// ➡️ Get movie details by ID
export const getMovieDetails = async (id) => {
  return await Movie.findById(id);
};

// ➡️ Update movie by ID
export const updateMovie = async (id, updateData) => {
  return await Movie.findByIdAndUpdate(id, updateData, { new: true });
};

// ➡️ Delete movie by ID
export const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};
