import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Important for refresh token cookie
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Notify all subscribers when token is refreshed
const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

// Add failed request to queue
const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

// Request interceptor - Add access token to requests
api.interceptors.request.use((config) => {
    const isAuthEndpoint = config.url?.includes("/auth/");
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && !isAuthEndpoint) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

// Response interceptor - Handle 401 errors and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                console.log("🔄 Access token expired, refreshing...");

                // Call refresh endpoint (uses httpOnly cookie)
                const response = await api.post("/auth/refresh");
                const { accessToken } = response.data;

                if (accessToken) {
                    console.log("✅ Token refreshed successfully");
                    localStorage.setItem("accessToken", accessToken);

                    // Update authorization header
                    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                    // Notify all queued requests
                    onRefreshed(accessToken);

                    isRefreshing = false;

                    // Retry the original request
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("❌ Token refresh failed:", refreshError);
                isRefreshing = false;

                // Clear auth data and redirect to login
                localStorage.clear();
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

