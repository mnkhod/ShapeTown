import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getQuests,
    getActiveQuests,
    getCompletedQuests,
    getSystemQuests,
    getAvailableQuests,
    startQuest,
    updateQuestTask,
} from "../lib/query-helper";
import { useAuth } from "../contexts/AuthContext";

export const QUEST_KEYS = {
    all: ["quests"],
    lists: () => [...QUEST_KEYS.all, "list"],
    list: (filters) => [...QUEST_KEYS.lists(), { filters }],
    details: () => [...QUEST_KEYS.all, "detail"],
    detail: (id) => [...QUEST_KEYS.details(), id],
    active: () => [...QUEST_KEYS.all, "active"],
    completed: () => [...QUEST_KEYS.all, "completed"],
    system: () => [...QUEST_KEYS.all, "system"],
    available: () => [...QUEST_KEYS.all, "available"],
};

export function useQuests() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: QUEST_KEYS.lists(),
        queryFn: getQuests,
        staleTime: 10 * 60 * 1000, // 10 minutes - longer cache for faster loading
        gcTime: 30 * 60 * 1000, // 30 minutes - keep in memory longer
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useActiveQuests() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: QUEST_KEYS.active(),
        queryFn: getActiveQuests,
        staleTime: 0, // Always consider stale - instant updates
        gcTime: 30 * 1000, // Keep in cache for 30 seconds
        refetchOnWindowFocus: true, // Refetch when user returns to tab
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useCompletedQuests() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: QUEST_KEYS.completed(),
        queryFn: getCompletedQuests,
        staleTime: 0, // Always fresh - instant updates when quest completes
        gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
        refetchOnWindowFocus: false, // Don't refetch completed quests on window focus
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useSystemQuests() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: QUEST_KEYS.system(),
        queryFn: getSystemQuests,
        staleTime: 5 * 60 * 1000, // 5 minutes - system quests are fairly static
        gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
        refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds (less aggressive)
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useStartQuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (questId) => startQuest(questId),
        onSuccess: async (data, questId) => {
            console.log("✅ Quest started successfully:", data);
            // Force immediate refetch (not just invalidate) for instant UI update
            await Promise.all([
                queryClient.refetchQueries({ queryKey: QUEST_KEYS.active() }),
                queryClient.refetchQueries({ queryKey: QUEST_KEYS.available() }),
            ]);
            console.log("🔄 Quest data refreshed instantly");
        },
        onError: (error, questId) => {
            console.error("❌ Failed to start quest:", error);
            console.error("Quest ID:", questId);
        },
    });
}

export function useAvailableQuests() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: QUEST_KEYS.available(),
        queryFn: getAvailableQuests,
        staleTime: 2 * 60 * 1000, // 2 minutes - available quests change moderately
        gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useUpdateQuestTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateQuestTask,
        onSuccess: async (data, variables) => {
            console.log("✅ Quest task updated successfully:", data);

            // Force immediate refetch for instant UI updates
            const refetchPromises = [
                queryClient.refetchQueries({ queryKey: QUEST_KEYS.active() }),
                queryClient.refetchQueries({ queryKey: QUEST_KEYS.system() }),
            ];

            // If quest was completed, also refetch completed quests immediately
            if (data?.data?.questCompleted || data?.questCompleted) {
                console.log("🎉 Quest completed! Refreshing completed quests...");
                refetchPromises.push(
                    queryClient.refetchQueries({ queryKey: QUEST_KEYS.completed() })
                );
                refetchPromises.push(
                    queryClient.refetchQueries({ queryKey: QUEST_KEYS.available() })
                );
            }

            await Promise.all(refetchPromises);
            console.log("🔄 All quest data refreshed instantly");
        },
        onError: (error, variables) => {
            console.error("❌ Failed to update quest task:", error);
            console.error("Variables:", variables);
        },
    });
}
