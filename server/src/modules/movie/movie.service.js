import Movie from "./movie.model.js";

// Add a new movie
export const addMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return await movie.save();
};

// Get all movies (with optional filters)
export const getMovies = async (filters = {}) => {
  // Example: filter by status, language, genre
  return await Movie.find(filters).sort({ releaseDate: -1 });
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  return await Movie.findById(movieId);
};

// Update movie
export const updateMovie = async (movieId, updateData) => {
  return await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
};

// Delete movie
export const deleteMovie = async (movieId) => {
  return await Movie.findByIdAndDelete(movieId);
};
