import { useState, useEffect, useRef } from "react";
import { getSession, saveProgress } from "../lib/query-helper";
import { useAuth } from "../contexts/AuthContext";

export const useCheckpoint = (userId) => {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    // Ref to store last saved XP/Gold to avoid unnecessary saves
    const lastSavedRef = useRef({ xp: 0, gold: 0 });

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
            const session = await getSession();

            setPlayer({
                mapId: session?.mapId || "e1342d21-3995-403f-866d-08381bc0303c",
                positionX: session?.positionX || 0,
                positionY: session?.positionY || 0,
                xp: session?.xp || 0,
                gold: session?.gold || 0,
                level: session?.level || 1,
            });

            lastSavedRef.current = {
                xp: session?.xp || 0,
                gold: session?.gold || 0,
            };

            console.log("Session loaded:", session);
        } catch (err) {
            console.error("Failed to load session", err);
            // Set default values if loading fails
            setPlayer({
                mapId: "e1342d21-3995-403f-866d-08381bc0303c",
                positionX: 0,
                positionY: 0,
                xp: 0,
                gold: 0,
                level: 1,
            });
        } finally {
            setLoading(false);
        }
    };

    const autoSaveCheckpoint = async () => {
        if (!userId || !player || !isAuthenticated) return;

        try {
            await saveProgress({
                mapId: player.mapId,
                positionX: player.positionX,
                positionY: player.positionY,
                xp: player.xp,
                gold: player.gold,
                level: player.level,
            });

            console.log("Auto-saved checkpoint");
        } catch (err) {
            console.error("Auto-save failed", err);
        }
    };

    // Auto-save every 1 minute if there is progress
    useEffect(() => {
        if (!userId || !isAuthenticated) return;

        const interval = setInterval(async () => {
            if (!player) return;

            // Only save if XP or Gold has changed
            if (
                player.xp !== lastSavedRef.current.xp ||
                player.gold !== lastSavedRef.current.gold
            ) {
                try {
                    await autoSaveCheckpoint();
                    lastSavedRef.current = { xp: player.xp, gold: player.gold };
                    console.log("Auto-saved checkpoint");
                } catch (err) {
                    console.error("Auto-save failed", err);
                }
            }
        }, 60 * 1000); // 1 minute

        return () => clearInterval(interval);
    }, [player, userId, isAuthenticated]);

    return {
        player,
        loading,
        setPlayer,
        loadLastCheckpoint,
        autoSaveCheckpoint,
    };
};

