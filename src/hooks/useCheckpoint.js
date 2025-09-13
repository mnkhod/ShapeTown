import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// API functions to connect with your backend
const sessionAPI = {
    async getSession() {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("/api/session", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to get session");
        return response.json();
    },

    async saveProgress(progressData) {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("/api/session/save-progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(progressData),
        });
        if (!response.ok) throw new Error("Failed to save progress");
        return response.json();
    },

    async createManualCheckpoint(positionData) {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("/api/session/checkpoint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(positionData),
        });
        if (!response.ok) throw new Error("Failed to create checkpoint");
        return response.json();
    },

    async respawnFromLastCheckpoint() {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("/api/session/respawn", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to respawn");
        return response.json();
    },
};

export const useCheckpoint = (userId) => {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    // Ref to store last saved data to avoid unnecessary saves
    const lastSavedRef = useRef({
        xp: 0,
        gold: 0,
        positionX: 0,
        positionY: 0,
        mapId: null,
    });

    // Load last checkpoint when user logs in
    const loadLastCheckpoint = async () => {
        if (!userId || !isAuthenticated) {
            console.log(
                "No user ID or not authenticated, skipping checkpoint load"
            );
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const session = await sessionAPI.getSession();

            // Handle the session data structure
            const sessionData = session.data || session;

            const playerData = {
                mapId:
                    sessionData?.mapId ||
                    "e1342d21-3995-403f-866d-08381bc0303c",
                positionX: sessionData?.positionX || 0,
                positionY: sessionData?.positionY || 0,
                xp: sessionData?.xp || 0,
                gold: sessionData?.gold || 0,
                level: sessionData?.level || 1,
            };

            setPlayer(playerData);

            // Update the last saved reference
            lastSavedRef.current = {
                xp: playerData.xp,
                gold: playerData.gold,
                positionX: playerData.positionX,
                positionY: playerData.positionY,
                mapId: playerData.mapId,
            };

            console.log("Session loaded:", sessionData);
        } catch (err) {
            console.error("Failed to load session", err);
            // Set default values if loading fails
            const defaultPlayer = {
                mapId: "e1342d21-3995-403f-866d-08381bc0303c",
                positionX: 0,
                positionY: 0,
                xp: 0,
                gold: 0,
                level: 1,
            };
            setPlayer(defaultPlayer);
            lastSavedRef.current = { ...defaultPlayer };
        } finally {
            setLoading(false);
        }
    };

    const autoSaveCheckpoint = async () => {
        if (!userId || !player || !isAuthenticated) return;

        // Check if any important data has changed
        const hasChanges =
            player.xp !== lastSavedRef.current.xp ||
            player.gold !== lastSavedRef.current.gold ||
            player.positionX !== lastSavedRef.current.positionX ||
            player.positionY !== lastSavedRef.current.positionY ||
            player.mapId !== lastSavedRef.current.mapId;

        if (!hasChanges) {
            console.log("No changes detected, skipping auto-save");
            return;
        }

        try {
            await sessionAPI.saveProgress({
                mapId: player.mapId,
                positionX: player.positionX,
                positionY: player.positionY,
                xp: player.xp,
                gold: player.gold,
                level: player.level,
            });

            // Update the last saved reference
            lastSavedRef.current = {
                xp: player.xp,
                gold: player.gold,
                positionX: player.positionX,
                positionY: player.positionY,
                mapId: player.mapId,
            };

            console.log("Auto-saved checkpoint");
        } catch (err) {
            console.error("Auto-save failed", err);
        }
    };

    // Manual save checkpoint (for important events)
    const saveManualCheckpoint = async (reason = "MANUAL") => {
        if (!userId || !player || !isAuthenticated) return;

        try {
            await sessionAPI.createManualCheckpoint({
                positionX: player.positionX,
                positionY: player.positionY,
                reason,
            });

            console.log(`Manual checkpoint saved: ${reason}`);
        } catch (err) {
            console.error("Manual checkpoint save failed", err);
        }
    };

    // Respawn from last checkpoint
    const respawnFromCheckpoint = async () => {
        if (!userId || !isAuthenticated) return;

        try {
            const respawnData = await sessionAPI.respawnFromLastCheckpoint();
            const playerData = respawnData.data || respawnData;

            setPlayer({
                mapId: playerData.mapId,
                positionX: playerData.positionX,
                positionY: playerData.positionY,
                xp: playerData.xp,
                gold: playerData.gold,
                level: playerData.level,
            });

            console.log("Respawned from checkpoint");
            return playerData;
        } catch (err) {
            console.error("Respawn failed", err);
            throw err;
        }
    };

    // Update player data (to be called from game scenes)
    const updatePlayer = (updates) => {
        setPlayer((prev) => ({ ...prev, ...updates }));
    };

    // Auto-save every 1 minute if there are changes
    useEffect(() => {
        if (!userId || !isAuthenticated) return;

        const interval = setInterval(autoSaveCheckpoint, 60 * 1000); // 1 minute

        return () => clearInterval(interval);
    }, [player, userId, isAuthenticated]);

    // Save on component unmount (when user leaves)
    useEffect(() => {
        return () => {
            if (userId && player && isAuthenticated) {
                // Fire-and-forget save on unmount
                autoSaveCheckpoint().catch(console.error);
            }
        };
    }, []);

    return {
        player,
        loading,
        setPlayer,
        updatePlayer,
        loadLastCheckpoint,
        autoSaveCheckpoint,
        saveManualCheckpoint,
        respawnFromCheckpoint,
    };
};
