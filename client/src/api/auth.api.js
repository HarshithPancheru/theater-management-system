import api from "./axios";

export const registerUser = (data) =>
  api.post("/auth/register", data).then(res => res.data);

export const loginUser = (data) =>
  api.post("/auth/login", data).then(res => res.data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const resetPassword = (token, data) =>
  api.post(`/auth/reset-password/${token}`, data);
