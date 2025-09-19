import { useQuery } from "@tanstack/react-query";
import { getNpcs } from "../lib/query-helper";

export const NPC_KEYS = {
    all: ["npcs"],
    lists: () => [...NPC_KEYS.all, "list"],
    list: (filters) => [...NPC_KEYS.lists(), { filters }],
    details: () => [...NPC_KEYS.all, "detail"],
    detail: (id) => [...NPC_KEYS.details(), id],
};

export const useNpcs = () => {
    return useQuery({
        queryKey: NPC_KEYS.lists(),
        queryFn: getNpcs,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 15 * 60 * 1000, // 15 minutes
    });
};