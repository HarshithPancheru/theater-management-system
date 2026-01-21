import * as movieService from "./movie.service.js";

// ➡️ Add a new movie
export const addMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    if (req.file) {
      movieData.image = req.file.path; // ✅ store uploaded cover photo path
    }
    const movie = await movieService.addMovie(movieData);
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
};

// ➡️ Get all movies
export const getMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getMovies();
    res.json({ success: true, data: movies });
  } catch (err) {
    next(err);
  }
};

// ➡️ Get movie details by ID
export const getMovieDetails = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieDetails(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
};

// ➡️ Update movie by ID
export const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieService.updateMovie(req.params.movieId, req.body);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
};

// ➡️ Delete movie by ID
export const deleteMovie = async (req, res, next) => {
  try {
    const deleted = await movieService.deleteMovie(req.params.movieId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, message: "Movie deleted" });
  } catch (err) {
    next(err);
  }
};
