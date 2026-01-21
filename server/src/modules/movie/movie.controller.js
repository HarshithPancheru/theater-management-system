import * as movieService from "./movie.service.js";

// ➡️ Add a new movie
export const addMovie = async (req, res) => {
  try {
    console.log("===== DEBUG START =====");
    console.log("req.body:", req.body); // all text fields from FormData
    console.log("req.file:", req.file); // file info from Multer
    const movieData = { ...req.body };

    // Handle file upload
    if (req.file) {
      movieData.image = `/uploads/movies/${req.file.filename}`;
    } else if (req.body.image) {
      movieData.image = req.body.image; // fallback if frontend sends URL
    }

    // ✅ Ensure language is a single string
    if (movieData.language && typeof movieData.language !== "string") {
      return res.status(400).json({ success: false, error: "Language must be a string" });
    }

    const movie = await movieService.addMovie(movieData);
    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    console.error("Error adding movie:", err.message);
    res.status(500).json({ success: false, error: err.message });
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
export const updateMovie = async (req, res) => {
  try {
    const movieData = { ...req.body };

    // ✅ Keep language atomic
    if (movieData.language && typeof movieData.language !== "string") {
      return res.status(400).json({ success: false, error: "Language must be a string" });
    }

    // Normalize genre if passed as comma-separated string
    if (typeof movieData.genre === "string") {
      movieData.genre = movieData.genre.split(",").map((g) => g.trim());
    }

    // Handle poster upload
    if (req.file) {
      movieData.image = `/uploads/movies/${req.file.filename}`;
    }

    const updated = await movieService.updateMovie(req.params.movieId, movieData);

    if (!updated) {
      return res.status(404).json({ success: false, error: "Movie not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, error: err.message });
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
