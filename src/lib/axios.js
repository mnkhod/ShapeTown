import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333/api",
});

api.interceptors.request.use((config) => {
    const isAuthEndpoint = config.url?.includes("/auth/");
    const token = localStorage.getItem("token");

    if (token && !isAuthEndpoint) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default api;
