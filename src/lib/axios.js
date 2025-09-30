import axios from "axios";

const api = axios.create({
    baseURL: "https://shape-town-staging-36635880ccdb.herokuapp.com/api",
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

