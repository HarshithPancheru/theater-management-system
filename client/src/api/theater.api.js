import axios from "axios";

/**
 * Axios instance
 * (Use existing instance if your project already has one)
 */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Get all theaters
 */
export const getTheaters = async () => {
  const response = await api.get("/theaters");
  return response.data;
};

/**
 * Create new theater
 */
export const addTheater = async (data) => {
  const response = await api.post("/theaters", data);
  return response.data;
};

/**
 * Update theater
 */
export const editTheater = async (theaterId, data) => {
  const response = await api.put(`/theaters/${theaterId}`, data);
  return response.data;
};

export const deleteTheater = async (theaterId) => {
  const response = await api.delete(`/theaters/${theaterId}`);
  return response.data;
};
