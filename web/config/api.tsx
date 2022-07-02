import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8081",
});

export default api;
