import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from "../utils/constants";

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
