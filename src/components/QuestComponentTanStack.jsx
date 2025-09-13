import React, { useState } from "react";
import {
    useQuests,
    useActiveQuests,
    useCompletedQuests,
    useUpdateQuestTask,
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
    const updateQuestTask = useUpdateQuestTask();
    const startQuest = useStartQuest();

    const toggleQuestExpansion = (questId) => {
        const newExpanded = new Set(expandedQuests);
        if (newExpanded.has(questId)) {
            newExpanded.delete(questId);
        } else {
            newExpanded.add(questId);
        }
        setExpandedQuests(newExpanded);
    };

    const handleStartQuest = (questId) => {
        startQuest.mutate(questId);
    };

    const handleTaskComplete = (quest, taskIndex) => {
        // Check if quest is started - if not, start it first
        const isQuestStarted = activeQuests?.data?.some(
            (activeQuest) => activeQuest.id === quest.id
        );

        if (!isQuestStarted) {
            console.log("Quest not started, starting quest first...");
            handleStartQuest(quest.id);
            return;
        }

        // Get userId from JWT token
        const token = localStorage.getItem("token");
        let userId = null;

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                userId = payload.userId;
            } catch (error) {
                console.error("Failed to decode JWT token:", error);
            }
        }

        updateQuestTask.mutate({
            userId,
            questId: quest.id,
            taskIndex,
            progressIncrement: 1,
        });
    };

    const getQuestsByTab = () => {
        switch (activeTab) {
            case "Active":
                return (activeQuests?.data || []).map((q) => ({
                    ...q.quest, // flatten quest object
                    status: q.status,
                    taskProgress: q.taskProgress,
                    overallProgress: q.overallProgress,
                    startedAt: q.startedAt,
                    completedAt: q.completedAt,
                }));

            case "Completed":
                return completedQuests?.data || [];

            case "All":
                return (allQuests?.data || []).filter((quest) => {
                    // Find quest in active or completed quests
                    const isActive = activeQuests?.data?.some(
                        (aq) => aq.questId === quest.id
                    );
                    const isCompleted = completedQuests?.data?.some(
                        (cq) => cq.questId === quest.id
                    );

                    // Exclude if active or completed
                    if (isActive || isCompleted) return false;

                    // Optional: only show NPC-given quests for "Start" button
                    return quest.questGiverType === "NPC";
                });

            default:
                return [];
        }
    };
    const isLoading =
        allQuestsLoading || activeQuestsLoading || completedQuestsLoading;

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
                    {["Active", "Completed", "All"].map((tab) => (
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
                                        {(() => {
                                            const isActive =
                                                activeQuests?.data?.some(
                                                    (aq) => aq.id === quest.id
                                                );
                                            const isCompleted =
                                                completedQuests?.data?.some(
                                                    (cq) => cq.id === quest.id
                                                );

                                            if (isCompleted) {
                                                return (
                                                    <span className="text-sm font-bold text-green-400">
                                                        COMPLETED
                                                    </span>
                                                );
                                            } else if (isActive) {
                                                return (
                                                    <span className="text-sm font-bold text-yellow-400">
                                                        IN PROGRESS
                                                    </span>
                                                );
                                            } else {
                                                return (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStartQuest(
                                                                quest.id
                                                            );
                                                        }}
                                                        disabled={
                                                            startQuest.isPending
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
                                                    >
                                                        {startQuest.isPending
                                                            ? "Starting..."
                                                            : "Start Quest"}
                                                    </button>
                                                );
                                            }
                                        })()}
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
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                isCompleted
                                                            }
                                                            onChange={() =>
                                                                !isCompleted &&
                                                                handleTaskComplete(
                                                                    quest,
                                                                    index
                                                                )
                                                            }
                                                            className="mr-2"
                                                            disabled={
                                                                isCompleted ||
                                                                updateQuestTask.isPending
                                                            }
                                                        />
                                                        <span
                                                            className={
                                                                isCompleted
                                                                    ? "line-through text-gray-400"
                                                                    : "text-white"
                                                            }
                                                        >
                                                            {task.description}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Rewards */}
                                        {quest.rewards?.length > 0 && (
                                            <div>
                                                <h4 className="text-yellow-400 font-bold mb-2">
                                                    Rewards:
                                                </h4>
                                                <div className="text-sm text-gray-300">
                                                    {quest.rewards.map(
                                                        (reward, index) => (
                                                            <div
                                                                key={index}
                                                                className="mb-1"
                                                            >
                                                                {reward.rewardType ===
                                                                    "GOLD" && (
                                                                    <span className="text-yellow-300">
                                                                        💰{" "}
                                                                        {
                                                                            reward.goldAmount
                                                                        }{" "}
                                                                        Gold
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

                {/* Update Status */}
                {updateQuestTask.isPending && (
                    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded">
                        Updating quest...
                    </div>
                )}

                {updateQuestTask.isError && (
                    <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded">
                        Failed to update quest
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestComponentTanStack;
