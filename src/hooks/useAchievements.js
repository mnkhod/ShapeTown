import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getMyAchievements,
    getAllAchievements,
    getMintableAchievements,
    mintAchievementNFT,
} from "../lib/queries";
import { useAuth } from "../contexts/AuthContext";

// Get all available achievements
export const useAllAchievements = () => {
    return useQuery({
        queryKey: ["achievements", "all"],
        queryFn: getAllAchievements,
        staleTime: 1000 * 60 * 10, // 10 minutes - rarely changes
        gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchOnMount: false, // Don't refetch on component mount if data exists
    });
};

// Get user's achievements (unlocked)
export const useMyAchievements = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["achievements", "my", user?.id],
        queryFn: getMyAchievements,
        enabled: !!user?.id,
        staleTime: 0, // Always consider data stale for immediate updates
        gcTime: 1000 * 60 * 15, // Keep in cache for 15 minutes
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Always refetch when component mounts
    });
};

// Get mintable achievements (unlocked but not minted)
export const useMintableAchievements = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["achievements", "mintable", user?.id],
        queryFn: () => getMintableAchievements(user?.id),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

// Mint achievement as NFT
export const useMintAchievement = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: ({ userAchievementId, options }) =>
            mintAchievementNFT(userAchievementId, options),
        onSuccess: async () => {
            console.log("🎉 Mint successful - invalidating and refetching cache...");
            // Invalidate and FORCE refetch achievement queries
            await queryClient.invalidateQueries({
                queryKey: ["achievements", "my", user?.id],
            });
            await queryClient.refetchQueries({
                queryKey: ["achievements", "my", user?.id],
            });
            await queryClient.invalidateQueries({
                queryKey: ["achievements", "mintable", user?.id],
            });
            console.log("✅ Cache refreshed after minting");
        },
        onError: (error) => {
            console.error("❌ Mint mutation failed:", error);
        },
    });
};
