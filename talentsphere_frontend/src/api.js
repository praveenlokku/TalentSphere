import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
});

// Add token to request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("No token found in localStorage. Please log in.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;