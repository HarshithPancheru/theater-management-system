import axios from "axios";

const API_BASE = "http://localhost:5000/api/shows";

// ➡️ Create a new show
export const createShow = (showData) => {
  return axios.post(API_BASE, showData);
};

// ➡️ Get all shows for a movie
export const getShowsByMovie = (movieId) => {
  return axios.get(`${API_BASE}/movie/${movieId}`);
};

// ➡️ Get single show by ID
export const getShowById = (showId) => {
  return axios.get(`${API_BASE}/${showId}`);
};

// ➡️ Update show by ID
export const updateShow = (showId, updateData) => {
  return axios.put(`${API_BASE}/${showId}`, updateData);
};

// ➡️ Delete show by ID
export const deleteShow = (showId) => {
  return axios.delete(`${API_BASE}/${showId}`);
};
