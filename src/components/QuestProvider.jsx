import React, { createContext, useContext, useEffect } from 'react';
import { useQuests, useActiveQuests, useCompletedQuests, useUpdateQuestTask } from '../hooks/useQuests';
import questSystem from './QuestSystem';

const QuestContext = createContext();

export function QuestProvider({ children }) {
    const allQuests = useQuests();
    const activeQuests = useActiveQuests();
    const completedQuests = useCompletedQuests();
    const updateQuestTask = useUpdateQuestTask();

    // Sync TanStack Query data with quest system
    useEffect(() => {
        if (allQuests.data?.success && allQuests.data?.data) {
            questSystem.processQuestData(allQuests.data.data);
        }
    }, [allQuests.data]);

    const contextValue = {
        // Data
        allQuests,
        activeQuests,
        completedQuests,
        
        // Mutations
        updateQuestTask: updateQuestTask.mutate,
        isUpdatingTask: updateQuestTask.isPending,
        
        // Quest system methods
        getQuestById: (id) => questSystem.quests[id],
        isQuestActive: (id) => questSystem.isQuestActive(id),
        isQuestCompleted: (id) => questSystem.isQuestCompleted(id),
        
        // Loading states
        isLoading: allQuests.isLoading || activeQuests.isLoading,
        isError: allQuests.isError || activeQuests.isError,
        error: allQuests.error || activeQuests.error
    };

    return (
        <QuestContext.Provider value={contextValue}>
            {children}
        </QuestContext.Provider>
    );
}

export function useQuestContext() {
    const context = useContext(QuestContext);
    if (!context) {
        throw new Error('useQuestContext must be used within a QuestProvider');
    }
    return context;
}