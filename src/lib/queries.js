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

// Achievement APIs
export const getMyAchievements = async () => {
    const res = await api.get("/my/achievements");
    return res.data;
};

export const getAllAchievements = async () => {
    const res = await api.get("/achievements");
    return res.data;
};

export const getMintableAchievements = async (userId) => {
    const res = await api.get(`/nft/mintable/${userId}`);
    return res.data;
};

export const mintAchievementNFT = async (userAchievementId, options = {}) => {
    const res = await api.post(`/nft/mint/${userAchievementId}`, options);
    return res.data;
};

// Manually unlock achievement (workaround for missing quest rewards)
export const unlockAchievement = async (achievementId) => {
    const res = await api.post(`/achievements/${achievementId}/unlock`);
    return res.data;
};

