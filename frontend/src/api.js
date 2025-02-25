import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
