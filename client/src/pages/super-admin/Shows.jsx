import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import Card from "../../components/Card/Card";
import { showError, showSuccess } from "../../utils/toast";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    movieId: "",
    screenId: "",
    date: "",
    startTime: "",
    endTime: "",
    priceMultiplier: 1
  });
  const [editingShow, setEditingShow] = useState(null);

  const fetchShows = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/shows");
      setShows(res.data.data || []);
    } catch {
      showError("Failed to fetch shows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingShow) {
        await axios.put(`/api/shows/${editingShow._id}`, formData);
        showSuccess("Show updated successfully");
      } else {
        await axios.post("/api/shows", formData);
        showSuccess("Show created successfully");
      }
      setFormData({
        movieId: "",
        screenId: "",
        date: "",
        startTime: "",
        endTime: "",
        priceMultiplier: 1
      });
      setEditingShow(null);
      fetchShows();
    } catch {
      showError("Failed to save show");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shows/${id}`);
      showSuccess("Show deleted successfully");
      fetchShows();
    } catch {
      showError("Failed to delete show");
    }
  };

  const handleEdit = (show) => {
    setEditingShow(show);
    setFormData({
      movieId: show.movieId?._id || "",
      screenId: show.screenId?._id || "",
      date: show.date.split("T")[0],
      startTime: show.startTime,
      endTime: show.endTime,
      priceMultiplier: show.priceMultiplier
    });
  };

  return (
    <div>
      <h1 className="page-title">Manage Shows (Super Admin)</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="movieId" placeholder="Movie ID" value={formData.movieId} onChange={handleChange} required />
        <input type="text" name="screenId" placeholder="Screen ID" value={formData.screenId} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="startTime" placeholder="Start Time (HH:mm)" value={formData.startTime} onChange={handleChange} required />
        <input type="text" name="endTime" placeholder="End Time (HH:mm)" value={formData.endTime} onChange={handleChange} required />
        <input type="number" name="priceMultiplier" placeholder="Price Multiplier" value={formData.priceMultiplier} onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          {editingShow ? "Update Show" : "Create Show"}
        </button>
        {editingShow && (
          <button type="button" className="btn btn-secondary" onClick={() => { setEditingShow(null); setFormData({ movieId:"", screenId:"", date:"", startTime:"", endTime:"", priceMultiplier:1 }); }}>
            Cancel
          </button>
        )}
      </form>

      {/* Show List */}
      {loading ? (
        <Loader />
      ) : shows.length === 0 ? (
        <EmptyState title="No Shows Found" description="Create shows to see them listed here." />
      ) : (
        <div className="card-grid">
          {shows.map((show) => (
            <Card key={show._id} size="md">
              <h3>{show.movieId?.title || "Movie ID: " + show.movieId}</h3>
              <p><strong>Screen:</strong> {show.screenId?.name || show.screenId}</p>
              <p><strong>Date:</strong> {new Date(show.date).toLocaleDateString()}</p>
              <p><strong>Start:</strong> {show.startTime}</p>
              <p><strong>End:</strong> {show.endTime}</p>
              <p><strong>Price Multiplier:</strong> {show.priceMultiplier}</p>
              <div className="btn-group">
                <button onClick={() => handleEdit(show)} className="btn btn-warning">
                  Edit
                </button>
                <button onClick={() => handleDelete(show._id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shows;
