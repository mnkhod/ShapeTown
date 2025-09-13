import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const isAuthEndpoint = config.url?.includes("/auth/");
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && !isAuthEndpoint) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;

