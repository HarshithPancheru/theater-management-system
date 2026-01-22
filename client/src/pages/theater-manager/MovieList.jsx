import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import { getMovies } from "../../api/movie.api";
import { showError } from "../../utils/toast";

const TheaterManagerMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getMovies();
      setMovies(res.data.data || []);
    } catch {
      showError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className="page-title">Available Movies</h1>
      {loading ? (
        <Loader />
      ) : movies.length === 0 ? (
        <EmptyState
          title="No Movies Found"
          description="Movies will appear here once added by Super Admin."
        />
      ) : (
        <div className="card-grid">
          {movies.map((movie) => (
            <Card key={movie._id} size="md">
              <h3>{movie.title}</h3>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Duration:</strong> {movie.duration} mins</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Release Date:</strong> {movie.releaseDate?.split("T")[0]}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TheaterManagerMovieList;
