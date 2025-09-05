import api from "./axios";

//////////////////////
// Auth (no token needed)
//////////////////////
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
// Helper to get token headers
//////////////////////
const authHeaders = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("User not authenticated");
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};

//////////////////////
// Profile (requires AuthMiddleware)
//////////////////////
export const getMe = async () => {
    const res = await api.get("/me", authHeaders());
    return res.data;
};

export const getProfile = async () => {
    const res = await api.get("/profile", authHeaders());
    return res.data;
};

export const updateProfile = async (payload: any) => {
    const res = await api.patch("/profile/update", payload, authHeaders());
    return res.data;
};

export const getMyInventory = async () => {
    const res = await api.get("/my/inventory", authHeaders());
    return res.data;
};

export const getMyQuests = async () => {
    const res = await api.get("/my/quests", authHeaders());
    return res.data;
};

export const getMyAchievements = async () => {
    const res = await api.get("/my/achievements", authHeaders());
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
    const res = await api.get("/quests", authHeaders());
    return res.data;
};

export const getAvailableQuests = async () => {
    const res = await api.get("/quests/available", authHeaders());
    return res.data;
};

export const getActiveQuests = async () => {
    const res = await api.get("/quests/active", authHeaders());
    return res.data;
};

export const getCompletedQuests = async () => {
    const res = await api.get("/quests/completed", authHeaders());
    return res.data;
};

export const startQuest = async (id: string) => {
    const res = await api.post(`/quests/${id}/start`, {}, authHeaders());
    return res.data;
};

export const getQuest = async (id: string) => {
    const res = await api.get(`/quests/${id}`, authHeaders());
    return res.data;
};

export const getQuestProgress = async (id: string) => {
    const res = await api.get(`/quests/${id}/progress`, authHeaders());
    return res.data;
};

export const updateQuestTask = async (payload: any) => {
    const res = await api.post("/quests/update-task", payload, authHeaders());
    return res.data;
};

//////////////////////
// NFT (requires AuthMiddleware + PlayerOwnershipMiddleware)
//////////////////////
export const getUserNfts = async (userId: string) => {
    const res = await api.get(`/nft/user/${userId}`, authHeaders());
    return res.data;
};

export const getUserMintableNfts = async (userId: string) => {
    const res = await api.get(`/nft/user/${userId}/mintable`, authHeaders());
    return res.data;
};

export const getNftMetadata = async (achievementId: string) => {
    const res = await api.get(`/nft/metadata/${achievementId}`, authHeaders());
    return res.data;
};

export const mintNft = async (userAchievementId: string) => {
    const res = await api.post(
        `/nft/mint/${userAchievementId}`,
        {},
        authHeaders()
    );
    return res.data;
};

export const canMintNft = async (userAchievementId: string) => {
    const res = await api.get(
        `/nft/can-mint/${userAchievementId}`,
        authHeaders()
    );
    return res.data;
};

//////////////////////
// Sessions (requires AuthMiddleware + PlayerOwnershipMiddleware)
//////////////////////
export const createSession = async (payload: any) => {
    const res = await api.post("/session", payload, authHeaders());
    return res.data;
};

export const getSession = async () => {
    const res = await api.get("/session", authHeaders());
    return res.data;
};

export const updateSessionMap = async (payload: any) => {
    const res = await api.put("/session/map", payload, authHeaders());
    return res.data;
};

export const incrementDeath = async () => {
    const res = await api.post("/session/death", {}, authHeaders());
    return res.data;
};

export const gainRewards = async (payload: any) => {
    const res = await api.post("/session/gain-rewards", payload, authHeaders());
    return res.data;
};

export const respawn = async () => {
    const res = await api.post("/session/respawn", {}, authHeaders());
    return res.data;
};

export const createCheckpoint = async (payload: any) => {
    const res = await api.post("/session/checkpoint", payload, authHeaders());
    return res.data;
};

export const saveProgress = async (payload: any) => {
    const res = await api.post(
        "/session/save-progress",
        payload,
        authHeaders()
    );
    return res.data;
};

export const getLatestCheckpoint = async () => {
    const res = await api.get("/session/checkpoint/latest", authHeaders());
    return res.data;
};

export const getCheckpointStats = async () => {
    const res = await api.get("/session/checkpoint/stats", authHeaders());
    return res.data;
};

export const autoSave = async () => {
    const res = await api.post("/session/auto-save", {}, authHeaders());
    return res.data;
};
