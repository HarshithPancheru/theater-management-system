import axios from "axios";

const API_URL = "http://localhost:5000/api/shows";

// ➡️ Get shows by movieId
export const getShowsByMovie = (movieId) =>
  axios.get(`${API_URL}/movie/${movieId}`);

// ➡️ Create a new show
export const createShow = (data) => axios.post(API_URL, data);

// ➡️ Update show by ID
export const updateShow = (id, data) => axios.put(`${API_URL}/${id}`, data);

// ➡️ Delete show by ID
export const deleteShow = (id) => axios.delete(`${API_URL}/${id}`);
