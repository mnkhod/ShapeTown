import api from "./axios.js";

export const connectWallet = async ({
    walletAddress,
    signature,
    message,
    timestamp,
}) => {
    console.log("Connecting with:", {
        walletAddress,
        signature,
        message,
        timestamp,
    });

    try {
        const response = await api.post("/auth/connect", {
            walletAddress,
            signature,
            message,
            timestamp,
        });
        return response.data;
    } catch (error) {
        console.error("API Error Details:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error(
            "Error details:",
            JSON.stringify(error.response?.data, null, 2)
        ); // This will show the full error
        console.error("Headers:", error.response?.headers);
        console.error("Request headers:", error.config?.headers);
        throw error;
    }
};

