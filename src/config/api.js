import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + ":" + process.env.REACT_APP_API_PORT,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
