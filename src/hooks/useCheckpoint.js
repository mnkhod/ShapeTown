import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { syncCheckpoint, saveCheckpoint } from "../lib/query-helper";
import { useAuth } from "../contexts/AuthContext";

export const CHECKPOINT_KEYS = {
    all: ["checkpoint"],
    latest: () => [...CHECKPOINT_KEYS.all, "latest"],
};

export function useCheckpointSync() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: CHECKPOINT_KEYS.latest(),
        queryFn: syncCheckpoint,
        staleTime: 30 * 1000, // 30 seconds
        enabled: isAuthenticated,
        refetchInterval: 60 * 1000, // Auto-sync every minute
    });
}

export function useSaveCheckpoint() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveCheckpoint,
        onSuccess: (data) => {
            console.log("Checkpoint saved successfully:", data);
            // Invalidate and refetch checkpoint data
            queryClient.invalidateQueries({ queryKey: CHECKPOINT_KEYS.all });
        },
        onError: (error) => {
            console.error("Failed to save checkpoint:", error);
        },
    });
}

// Hook to automatically sync checkpoints when the component mounts
export function useAutoCheckpointSync() {
    const checkpointQuery = useCheckpointSync();

    // Return checkpoint data and sync status
    return {
        checkpointData: checkpointQuery.data,
        isLoading: checkpointQuery.isLoading,
        isError: checkpointQuery.isError,
        lastSynced: checkpointQuery.dataUpdatedAt,
    };
}