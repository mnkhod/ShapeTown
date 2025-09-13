import api from "./axios"; // your axios instance

// Get the latest checkpoint for a user/session
export const getLatestCheckpoint = async () => {
    const res = await api.get("/session/checkpoint/latest");
    return res.data;
};

// Trigger an auto-save checkpoint
export const autoSaveCheckpoint = async () => {
    const res = await api.post("/session/auto-save", {});
    return res.data;
};

// Gain rewards / create smart checkpoint (optional)
export const gainRewardsCheckpoint = async (payload) => {
    const res = await api.post("/session/gain-rewards", payload);
    return res.data;
};

