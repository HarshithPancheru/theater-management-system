// src/pages/super-admin/MovieList.jsx
import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import { toast, showSuccess, showError, showLoading } from "../../utils/toast";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../api/movie.api";

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
    image: "",
  });

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getMovies();
      setMovies(res.data.data || []);
    } catch (err) {
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("poster", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload/poster", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data?.url) {
        handleChange("image", data.url);
        showSuccess("Poster uploaded");
      } else {
        showError("Upload failed");
      }
    } catch {
      showError("Upload error");
    }
  };

  const handleSave = async () => {
    const toastId = showLoading("Saving movie...");
    try {
      if (editingMovie) {
        await updateMovie(editingMovie._id, formData);
        showSuccess("Movie updated successfully");
      } else {
        await createMovie(formData);
        showSuccess("Movie created successfully");
      }
      setModalOpen(false);
      fetchMovies();
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

  const columns = [
    { key: "title", label: "Title" },
    { key: "duration", label: "Duration (min)" },
    { key: "language", label: "Language", render: (row) => row.language?.join(", ") },
    { key: "genre", label: "Genre", render: (row) => row.genre?.join(", ") },
    { key: "releaseDate", label: "Release Date" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge
          status={
            row.status === "NOW_SHOWING"
              ? "success"
              : row.status === "UPCOMING"
              ? "info"
              : "error"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "image",
      label: "Poster",
      render: (row) =>
        row.image ? (
          <img
            src={`http://localhost:5000${row.image}`}
            alt={row.title}
            style={{ width: "80px", height: "120px", objectFit: "cover", borderRadius: "4px" }}
          />
        ) : (
          "No Poster"
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <>
          <Button
            size="sm"
            onClick={() => {
              setEditingMovie(row);
              setFormData({
                title: row.title,
                description: row.description,
                duration: row.duration,
                language: row.language,
                genre: row.genre,
                releaseDate: row.releaseDate?.split("T")[0] || "",
                status: row.status,
                image: row.image,
              });
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

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
              image: "",
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
                image: "",
              });
              setModalOpen(true);
            }}
          >
            Add Movie
          </Button>
          <Table columns={columns} data={movies} />
        </>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        open={modalOpen}
        title={editingMovie ? "Edit Movie" : "Add Movie"}
        onClose={() => setModalOpen(false)}
      >
        <div className="form-group">
          <label>Title</label>
          <Input value={formData.title} onChange={(val) => handleChange("title", val)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <Input value={formData.description} onChange={(val) => handleChange("description", val)} />
        </div>
        <div className="form-group">
          <label>Duration (minutes)</label>
          <Input type="number" value={formData.duration} onChange={(val) => handleChange("duration", val)} />
        </div>
        <div className="form-group">
          <label>Language (comma separated)</label>
          <Input
            value={formData.language?.join(", ") || ""}
            onChange={(val) =>
              handleChange("language", val.split(",").map((lang) => lang.trim()))
            }
          />
        </div>
        <div className="form-group">
          <label>Genre (comma separated)</label>
          <Input
            value={formData.genre?.join(", ") || ""}
            onChange={(val) =>
              handleChange("genre", val.split(",").map((g) => g.trim()))
            }
          />
        </div>
        <div className="form-group">
          <label>Release Date</label>
          <Input type="date" value={formData.releaseDate} onChange={(val) => handleChange("releaseDate", val)} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Poster</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
        <Button onClick={handleSave}>
          {editingMovie ? "Update" : "Save"}
        </Button>
      </Modal>
    </div>
  );
};

export default MovieList;

