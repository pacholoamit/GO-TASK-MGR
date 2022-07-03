import axios from "axios";

const apiUrl = process.env.API_URL || "http://localhost:8081";

const apiInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8081",
});
export { apiUrl, apiInstance };
