import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuests, getActiveQuests, getCompletedQuests, startQuest, updateQuestTask } from '../lib/query-helper';
import { useAuth } from '../contexts/AuthContext';

export const QUEST_KEYS = {
    all: ['quests'],
    lists: () => [...QUEST_KEYS.all, 'list'],
    list: (filters) => [...QUEST_KEYS.lists(), { filters }],
    details: () => [...QUEST_KEYS.all, 'detail'],
    detail: (id) => [...QUEST_KEYS.details(), id],
    active: () => [...QUEST_KEYS.all, 'active'],
    completed: () => [...QUEST_KEYS.all, 'completed'],
};

export function useQuests() {
    const { isAuthenticated } = useAuth();
    
    return useQuery({
        queryKey: QUEST_KEYS.lists(),
        queryFn: getQuests,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useActiveQuests() {
    const { isAuthenticated } = useAuth();
    
    return useQuery({
        queryKey: QUEST_KEYS.active(),
        queryFn: getActiveQuests,
        staleTime: 1 * 60 * 1000, // 1 minute
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useCompletedQuests() {
    const { isAuthenticated } = useAuth();
    
    return useQuery({
        queryKey: QUEST_KEYS.completed(),
        queryFn: getCompletedQuests,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: isAuthenticated, // Only fetch when authenticated
    });
}

export function useStartQuest() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (questId) => startQuest(questId),
        onSuccess: (data, questId) => {
            console.log('Quest started successfully:', data);
            // Invalidate and refetch quest data
            queryClient.invalidateQueries({ queryKey: QUEST_KEYS.all });
        },
        onError: (error, questId) => {
            console.error('Failed to start quest:', error);
            console.error('Quest ID:', questId);
        },
    });
}

export function useUpdateQuestTask() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: updateQuestTask,
        onSuccess: (data, variables) => {
            console.log('Quest task updated successfully:', data);
            // Invalidate and refetch quest data
            queryClient.invalidateQueries({ queryKey: QUEST_KEYS.all });
        },
        onError: (error, variables) => {
            console.error('Failed to update quest task:', error);
            console.error('Variables:', variables);
        },
    });
}