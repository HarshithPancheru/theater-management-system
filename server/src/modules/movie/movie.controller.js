export const addMovie = async (req, res, next) => {
  try {
    // TODO: movieService.addMovie(...)
    return res.json({
      success: true,
      message: "Add movie controller reached"
    });
  } catch (err) {
    next(err);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    // TODO: movieService.getMovies(...)
    return res.json({
      success: true,
      message: "Get movies controller reached",
      data: []
    });
  } catch (err) {
    next(err);
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    // TODO: movieService.getMovieDetails(...)
    return res.json({
      success: true,
      message: "Movie details controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
