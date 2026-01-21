import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

// ➡️ Get all movies
export const getMovies = () => axios.get(API_URL);

// ➡️ Get movie by ID
export const getMovieById = (id) => axios.get(`${API_URL}/${id}`);

// ➡️ Create a new movie
export const createMovie = (data) => axios.post(API_URL, data);

// ➡️ Update movie by ID
export const updateMovie = (id, data) => axios.put(`${API_URL}/${id}`, data);

// ➡️ Delete movie by ID
export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);
