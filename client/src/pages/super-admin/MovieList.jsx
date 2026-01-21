// src/pages/super-admin/MovieList.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import { toast, showSuccess, showError, showLoading } from "../../utils/toast";

import { getMovies, updateMovie, deleteMovie } from "../../api/movie.api";

const STATUS_OPTIONS = ["UPCOMING", "NOW_SHOWING", "ARCHIVED"];

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    language: [],
    genre: [],
    releaseDate: "",
    status: "UPCOMING",
    poster: null, // 👈 store file object here
  });

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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, poster: file }));
    }
  };

  const handleSave = async () => {
    const toastId = showLoading("Saving movie...");
    try {
      const form = new FormData();
      if (formData.poster) form.append("poster", formData.poster);
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("duration", formData.duration);
      form.append("language", formData.language);
      form.append("genre", formData.genre);
      form.append("releaseDate", formData.releaseDate);
      form.append("status", formData.status);

      let res;
      if (editingMovie) {
        res = await fetch(
          `http://localhost:5000/api/movies/${editingMovie._id}`,
          {
            method: "PUT",
            body: form,
          },
        );
      } else {
        res = await fetch("http://localhost:5000/api/movies", {
          method: "POST",
          body: form,
        });
      }

      const data = await res.json();
      if (data.success) {
        showSuccess(
          editingMovie
            ? "Movie updated successfully"
            : "Movie created successfully",
        );
        setModalOpen(false);
        fetchMovies();
      } else {
        showError(data.error || "Failed to save movie");
      }
    } catch {
      showError("Failed to save movie");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDelete = async (id) => {
    const toastId = showLoading("Deleting movie...");
    try {
      await deleteMovie(id);
      showSuccess("Movie deleted successfully");
      fetchMovies();
    } catch {
      showError("Failed to delete movie");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <h1 className="page-title">Movies</h1>
      {loading ? (
        <Loader />
      ) : movies.length === 0 ? (
        <EmptyState
          title="No Movies Found"
          description="Add a movie to get started."
          actionLabel="Add Movie"
          onAction={() => {
            setEditingMovie(null);
            setFormData({
              title: "",
              description: "",
              duration: "",
              language: [],
              genre: [],
              releaseDate: "",
              status: "UPCOMING",
              poster: null,
            });
            setModalOpen(true);
          }}
        />
      ) : (
        <>
          <Button
            onClick={() => {
              setEditingMovie(null);
              setFormData({
                title: "",
                description: "",
                duration: "",
                language: [],
                genre: [],
                releaseDate: "",
                status: "UPCOMING",
                poster: null,
              });
              setModalOpen(true);
            }}
          >
            Add Movie
          </Button>

          <div className="card-grid">
            {movies.map((movie) => (
              <Card key={movie._id} size="md">
                <img
                  src={`http://localhost:5000${movie.image}`}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>
                  <strong>Duration:</strong> {movie.duration} min
                </p>
                <p>
                  <strong>Language:</strong> {movie.language?.join(", ")}
                </p>
                <p>
                  <strong>Genre:</strong> {movie.genre?.join(", ")}
                </p>
                <p>
                  <strong>Status:</strong> {movie.status}
                </p>
                <p>
                  <strong>Release:</strong> {movie.releaseDate?.split("T")[0]}
                </p>
                <div className="card-actions">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingMovie(movie);
                      setFormData({
                        title: movie.title,
                        description: movie.description,
                        duration: movie.duration,
                        language: movie.language,
                        genre: movie.genre,
                        releaseDate: movie.releaseDate?.split("T")[0] || "",
                        status: movie.status,
                        poster: null, // file not preloaded
                      });
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(movie._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <Modal
        open={modalOpen}
        title={editingMovie ? "Edit Movie" : "Add Movie"}
        onClose={() => setModalOpen(false)}
      >
        <div className="form-group">
          <label>Title</label>
          <Input
            value={formData.title}
            onChange={(val) => handleChange("title", val)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <Input
            value={formData.description}
            onChange={(val) => handleChange("description", val)}
          />
        </div>
        <div className="form-group">
          <label>Duration (minutes)</label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(val) => handleChange("duration", val)}
          />
        </div>
        <div className="form-group">
          <label>Language (comma separated)</label>
          <Input
            value={formData.language?.join(", ") || ""}
            onChange={(val) =>
              handleChange(
                "language",
                val.split(",").map((lang) => lang.trim()),
              )
            }
          />
        </div>
        <div className="form-group">
          <label>Genre (comma separated)</label>
          <Input
            value={formData.genre?.join(", ") || ""}
            onChange={(val) =>
              handleChange(
                "genre",
                val.split(",").map((g) => g.trim()),
              )
            }
          />
        </div>
        <div className="form-group">
          <label>Release Date</label>
          <Input
            type="date"
            value={formData.releaseDate}
            onChange={(val) => handleChange("releaseDate", val)}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Poster</label>
          <input type="file" name="poster" accept="image/*" onChange={handleFileUpload} />
        </div>
        <Button onClick={handleSave}>{editingMovie ? "Update" : "Save"}</Button>
      </Modal>

      <style jsx>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .card-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .form-group {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
        }
        .form-group input,
        .form-group select {
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default MovieList;
