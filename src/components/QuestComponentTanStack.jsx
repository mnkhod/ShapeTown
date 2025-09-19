import React, { useState, useEffect } from "react";
import {
    useQuests,
    useActiveQuests,
    useCompletedQuests,
    useSystemQuests,
    useAvailableQuests,
    useStartQuest,
} from "../hooks/useQuests";
import { useAuth } from "../contexts/AuthContext";

const QuestComponentTanStack = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("Active");
    const [expandedQuests, setExpandedQuests] = useState(new Set());

    const { user } = useAuth();
    const { data: allQuests, isLoading: allQuestsLoading } = useQuests();
    const { data: activeQuests, isLoading: activeQuestsLoading } =
        useActiveQuests();
    const { data: completedQuests, isLoading: completedQuestsLoading } =
        useCompletedQuests();
    const { data: systemQuests, isLoading: systemQuestsLoading } =
        useSystemQuests();
    const { data: availableQuests, isLoading: availableQuestsLoading } =
        useAvailableQuests();
    const startQuest = useStartQuest();

    // Auto-start available quests
    useEffect(() => {
        if (availableQuests?.data && availableQuests.data.length > 0) {
            console.log("Available quests found:", availableQuests.data);

            // Don't auto-start if we're already starting a quest
            if (startQuest.isPending) {
                console.log(
                    "Quest start already in progress, skipping auto-start"
                );
                return;
            }

            // Only auto-start if no active quests exist
            if (activeQuests?.data && activeQuests.data.length > 0) {
                console.log("Active quests exist, not auto-starting new quest");
                return;
            }

            // Auto-start the first available quest
            const firstAvailableQuest = availableQuests.data[0];
            if (firstAvailableQuest && firstAvailableQuest.quest) {
                console.log(
                    "Auto-starting quest:",
                    firstAvailableQuest.quest.name,
                    "ID:",
                    firstAvailableQuest.quest.id
                );
                startQuest.mutate(firstAvailableQuest.quest.id);
            }
        }
    }, [availableQuests?.data, activeQuests?.data, startQuest]);

    const toggleQuestExpansion = (questId) => {
        const newExpanded = new Set(expandedQuests);
        if (newExpanded.has(questId)) {
            newExpanded.delete(questId);
        } else {
            newExpanded.add(questId);
        }
        setExpandedQuests(newExpanded);
    };

    // Tasks are now automatically updated by game actions, no manual completion needed

    const getQuestsByTab = () => {
        switch (activeTab) {
            case "Active": {
                // Combine both NPC and system active quests
                const npcQuests = (activeQuests?.data || []).map((q) => ({
                    ...q.quest, // flatten quest object
                    status: q.status,
                    taskProgress: q.taskProgress,
                    overallProgress: q.overallProgress,
                    startedAt: q.startedAt,
                    completedAt: q.completedAt,
                }));

                const activeSystemQuests = (systemQuests?.data || []).map(
                    (q) => ({
                        ...q.quest, // flatten quest object
                        status: q.status,
                        taskProgress: q.taskProgress,
                        overallProgress: q.overallProgress,
                        startedAt: q.startedAt,
                        completedAt: q.completedAt,
                    })
                );

                return [...npcQuests, ...activeSystemQuests];
            }

            case "Completed":
                return (completedQuests?.data || []).map((q) => ({
                    ...q.quest, // flatten quest object
                    status: q.status,
                    startedAt: q.startedAt,
                    completedAt: q.completedAt,
                }));

            case "System":
                return (systemQuests?.data || []).map((q) => ({
                    ...q.quest, // flatten quest object
                    status: q.status,
                    taskProgress: q.taskProgress,
                    overallProgress: q.overallProgress,
                    startedAt: q.startedAt,
                    completedAt: q.completedAt,
                }));

            default:
                return [];
        }
    };
    const isLoading =
        allQuestsLoading ||
        activeQuestsLoading ||
        completedQuestsLoading ||
        systemQuestsLoading ||
        availableQuestsLoading;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-11/12 max-w-4xl max-h-5/6 overflow-auto border-2 border-yellow-500">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-yellow-400">
                        Quest Journal
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex mb-4 border-b border-gray-700">
                    {["Active", "Completed", "System"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 mr-2 rounded-t-lg transition-colors ${
                                activeTab === tab
                                    ? "bg-yellow-500 text-black font-bold"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            {tab} Quests
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-8">
                        <div className="text-yellow-400 text-lg">
                            Loading quests...
                        </div>
                    </div>
                )}

                {/* Quest List */}
                {!isLoading && (
                    <div className="space-y-4">
                        {getQuestsByTab().map((quest) => (
                            <div
                                key={quest.id}
                                className={`border rounded-lg p-4 ${
                                    quest.completed
                                        ? "border-green-500 bg-green-900 bg-opacity-20"
                                        : "border-yellow-500 bg-gray-800"
                                }`}
                            >
                                {/* Quest Header */}
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() =>
                                        toggleQuestExpansion(quest.id)
                                    }
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-yellow-400">
                                            {quest.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {quest.description}
                                        </p>
                                        <div className="text-xs text-gray-400 mt-1">
                                            <span className="bg-blue-600 px-2 py-1 rounded mr-2">
                                                {quest.questType?.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </span>
                                            {quest.questGiver?.name && (
                                                <span>
                                                    Given by:{" "}
                                                    {quest.questGiver.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {quest.status === "COMPLETED" ? (
                                            <span className="text-sm font-bold text-green-400">
                                                COMPLETED
                                            </span>
                                        ) : quest.status === "IN_PROGRESS" ? (
                                            <div>
                                                <span className="text-sm font-bold text-yellow-400">
                                                    IN PROGRESS
                                                </span>
                                                {quest.overallProgress && (
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {
                                                            quest
                                                                .overallProgress
                                                                .completedTasks
                                                        }
                                                        /
                                                        {
                                                            quest
                                                                .overallProgress
                                                                .totalTasks
                                                        }{" "}
                                                        tasks (
                                                        {
                                                            quest
                                                                .overallProgress
                                                                .percentage
                                                        }
                                                        %)
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-sm font-bold text-blue-400">
                                                {quest.questGiverType ===
                                                "GAME_SYSTEM"
                                                    ? "SYSTEM QUEST"
                                                    : "AVAILABLE"}
                                            </span>
                                        )}
                                        <div className="text-gray-400 text-xs mt-1">
                                            {expandedQuests.has(quest.id)
                                                ? "▼"
                                                : "▶"}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Quest Details */}
                                {expandedQuests.has(quest.id) && (
                                    <div className="mt-4 border-t border-gray-700 pt-4">
                                        {/* Tasks */}
                                        <h4 className="text-yellow-400 font-bold mb-2">
                                            Tasks:
                                        </h4>
                                        <div className="space-y-2 mb-4">
                                            {quest.tasks?.map((task, index) => {
                                                const progress =
                                                    quest.taskProgress?.find(
                                                        (tp) =>
                                                            tp.taskIndex ===
                                                            index
                                                    );
                                                const isCompleted =
                                                    progress?.isCompleted ||
                                                    false;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`flex items-center p-2 rounded ${
                                                            isCompleted
                                                                ? "bg-green-800 bg-opacity-50"
                                                                : "bg-gray-700"
                                                        }`}
                                                    >
                                                        {/* Visual status indicator instead of interactive checkbox */}
                                                        <div
                                                            className={`w-4 h-4 mr-3 rounded border-2 flex items-center justify-center ${
                                                                isCompleted
                                                                    ? "bg-green-500 border-green-500"
                                                                    : "border-gray-400"
                                                            }`}
                                                        >
                                                            {isCompleted && (
                                                                <svg
                                                                    className="w-3 h-3 text-white"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span
                                                            className={
                                                                isCompleted
                                                                    ? "line-through text-gray-400"
                                                                    : "text-white"
                                                            }
                                                        >
                                                            {task.description}
                                                        </span>
                                                        {progress &&
                                                            progress.progress >
                                                                0 && (
                                                                <span className="ml-auto text-sm text-blue-300">
                                                                    (
                                                                    {
                                                                        progress.progress
                                                                    }
                                                                    /
                                                                    {task.amount ||
                                                                        1}
                                                                    )
                                                                </span>
                                                            )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Rewards */}
                                        {quest.rewards?.length > 0 && (
                                            <div>
                                                <h4 className="text-yellow-400 font-bold mb-2">
                                                    {quest.status ===
                                                    "COMPLETED"
                                                        ? "Rewards Claimed:"
                                                        : "Rewards:"}
                                                </h4>
                                                <div className="text-sm text-gray-300">
                                                    {quest.rewards.map(
                                                        (reward, index) => (
                                                            <div
                                                                key={index}
                                                                className={`mb-1 ${
                                                                    quest.status ===
                                                                    "COMPLETED"
                                                                        ? "opacity-75"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {reward.rewardType ===
                                                                    "GOLD" && (
                                                                    <span className="text-yellow-300">
                                                                        💰{" "}
                                                                        {
                                                                            reward.goldAmount
                                                                        }{" "}
                                                                        Gold
                                                                        {quest.status ===
                                                                            "COMPLETED" &&
                                                                            " ✓"}
                                                                    </span>
                                                                )}
                                                                {reward.rewardType ===
                                                                    "ITEM" &&
                                                                    reward.item && (
                                                                        <span className="text-blue-300">
                                                                            📦{" "}
                                                                            {
                                                                                reward
                                                                                    .item
                                                                                    .name
                                                                            }{" "}
                                                                            x
                                                                            {
                                                                                reward.itemQuantity
                                                                            }
                                                                            {quest.status ===
                                                                                "COMPLETED" &&
                                                                                " ✓"}
                                                                        </span>
                                                                    )}
                                                                {reward.rewardType ===
                                                                    "ACHIEVEMENT" &&
                                                                    reward.achievement && (
                                                                        <span className="text-purple-300">
                                                                            🏆{" "}
                                                                            {
                                                                                reward
                                                                                    .achievement
                                                                                    .name
                                                                            }
                                                                            {quest.status ===
                                                                                "COMPLETED" &&
                                                                                " ✓"}
                                                                        </span>
                                                                    )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {getQuestsByTab().length === 0 && !isLoading && (
                            <div className="text-center py-8 text-gray-400">
                                No {activeTab.toLowerCase()} quests available
                            </div>
                        )}
                    </div>
                )}

                {/* Status messages for quest auto-updates */}
                <div className="text-center text-sm text-gray-400 mt-4">
                    Quest tasks update automatically as you play the game
                </div>
            </div>
        </div>
    );
};

export default QuestComponentTanStack;
