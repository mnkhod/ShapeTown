import api from "./axios";

export const connectAuth = async (payload: any) => {
    try {
        const res = await api.post("/auth/connect", payload);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async () => {
    const res = await api.get("/users");
    return res.data;
};

export const createUser = async (payload: any) => {
    const res = await api.post("/users", payload);
    return res.data;
};

export const getUser = async (id: string) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

export const getUserInventory = async (id: string) => {
    const res = await api.get(`/user/${id}/inventory`);
    return res.data;
};

export const getUserQuests = async (id: string) => {
    const res = await api.get(`/user/${id}/quests`);
    return res.data;
};

export const getUserAchievements = async (id: string) => {
    const res = await api.get(`/user/${id}/achievements`);
    return res.data;
};

export const getCustomizationOptions = async () => {
    const res = await api.get("/customization/options");
    return res.data;
};

//////////////////////
// Profile (requires AuthMiddleware)
//////////////////////
export const getMe = async () => {
    const res = await api.get("/me");
    return res.data;
};

export const getProfile = async () => {
    const res = await api.get("/profile");
    return res.data;
};

export const updateProfile = async (payload: any) => {
    const res = await api.patch("/profile/update", payload);
    return res.data;
};

export const getMyInventory = async () => {
    const res = await api.get("/my/inventory");
    return res.data;
};

export const getMyQuests = async () => {
    const res = await api.get("/my/quests");
    return res.data;
};

export const getMyAchievements = async () => {
    const res = await api.get("/my/achievements");
    return res.data;
};

//////////////////////
// Maps (no token needed)
//////////////////////
export const getMaps = async () => {
    const res = await api.get("/maps");
    return res.data;
};

export const getMap = async (id: string) => {
    const res = await api.get(`/maps/${id}`);
    return res.data;
};

//////////////////////
// Quests (requires AuthMiddleware + PlayerOwnershipMiddleware)
//////////////////////
export const getQuests = async () => {
    const res = await api.get("/quests");
    return res.data;
};

export const getAvailableQuests = async () => {
    const res = await api.get("/quests/available");
    return res.data;
};

export const getActiveQuests = async () => {
    const res = await api.get("/quests/active");
    return res.data;
};

export const getCompletedQuests = async () => {
    const res = await api.get("/quests/completed");
    return res.data;
};

export const startQuest = async (id: string) => {
    const res = await api.post(`/quests/${id}/start`, {});
    return res.data;
};

export const getQuest = async (id: string) => {
    const res = await api.get(`/quests/${id}`);
    return res.data;
};

export const getQuestProgress = async (id: string) => {
    const res = await api.get(`/quests/${id}/progress`);
    return res.data;
};

export const updateQuestTask = async (payload: any) => {
    const res = await api.post("/quests/update-task", payload);
    return res.data;
};

//////////////////////
// NFT (requires AuthMiddleware + PlayerOwnershipMiddleware)
//////////////////////
export const getUserNfts = async (userId: string) => {
    const res = await api.get(`/nft/user/${userId}`);
    return res.data;
};

export const getUserMintableNfts = async (userId: string) => {
    const res = await api.get(`/nft/user/${userId}/mintable`);
    return res.data;
};

export const getNftMetadata = async (achievementId: string) => {
    const res = await api.get(`/nft/metadata/${achievementId}`);
    return res.data;
};

export const mintNft = async (userAchievementId: string) => {
    const res = await api.post(`/nft/mint/${userAchievementId}`, {});
    return res.data;
};

export const canMintNft = async (userAchievementId: string) => {
    const res = await api.get(`/nft/can-mint/${userAchievementId}`);
    return res.data;
};

//////////////////////
// Sessions (requires AuthMiddleware + PlayerOwnershipMiddleware)
//////////////////////
export const createSession = async (payload: any) => {
    const res = await api.post("/session", payload);
    return res.data;
};

export const getSession = async () => {
    const res = await api.get("/session");
    return res.data;
};

export const updateSessionMap = async (payload: any) => {
    const res = await api.put("/session/map", payload);
    return res.data;
};

export const incrementDeath = async () => {
    const res = await api.post("/session/death", {});
    return res.data;
};

export const gainRewards = async (payload: any) => {
    const res = await api.post("/session/gain-rewards", payload);
    return res.data;
};

export const respawn = async () => {
    const res = await api.post("/session/respawn", {});
    return res.data;
};

export const createCheckpoint = async (payload: any) => {
    const res = await api.post("/session/checkpoint", payload);
    return res.data;
};

export const saveProgress = async (payload: any) => {
    const res = await api.post("/session/save-progress", payload);
    return res.data;
};

export const getLatestCheckpoint = async () => {
    const res = await api.get("/session/checkpoint/latest");
    return res.data;
};

export const getCheckpointStats = async () => {
    const res = await api.get("/session/checkpoint/stats");
    return res.data;
};

export const autoSave = async () => {
    const res = await api.post("/session/auto-save", {});
    return res.data;
};

