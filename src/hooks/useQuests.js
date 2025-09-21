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
        staleTime: 2 * 1000, // 2 seconds - very fresh data
        gcTime: 30 * 1000, // Keep in cache for 30 seconds
        refetchInterval: 3 * 1000, // Auto-refetch every 3 seconds during active gameplay
        refetchOnWindowFocus: true, // Refetch when user returns to tab
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useCompletedQuests() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: QUEST_KEYS.completed(),
        queryFn: getCompletedQuests,
        staleTime: 10 * 60 * 1000, // 10 minutes - completed quests rarely change
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
        onSuccess: (data, questId) => {
            console.log("Quest started successfully:", data);
            // Immediately invalidate only the relevant queries for faster UI updates
            queryClient.invalidateQueries({ queryKey: QUEST_KEYS.active() });
            queryClient.invalidateQueries({ queryKey: QUEST_KEYS.available() });
            // Don't invalidate completed quests as they don't change when starting new quests
        },
        onError: (error, questId) => {
            console.error("Failed to start quest:", error);
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
        onSuccess: (data, variables) => {
            console.log("Quest task updated successfully:", data);
            // Only invalidate active quests instead of all quest data for better performance
            queryClient.invalidateQueries({ queryKey: QUEST_KEYS.active() });
            queryClient.invalidateQueries({ queryKey: QUEST_KEYS.system() });
        },
        onError: (error, variables) => {
            console.error("Failed to update quest task:", error);
            console.error("Variables:", variables);
        },
    });
}
