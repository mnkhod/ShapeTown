import api from "./axiosInstance.js";

export const connectWallet = async ({ walletAddress, signature, message }) => {
    const response = await api.post("/auth/connect", {
        walletAddress,
        signature,
        message,
    });
    return response.data;
};

export const refreshToken = async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
};
