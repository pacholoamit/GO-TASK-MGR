import axios from "axios";

const apiUrl = process.env.API_URL || "http://localhost:8081";

// For useSWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const apiInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8081",
});
export { apiUrl, fetcher, apiInstance };
