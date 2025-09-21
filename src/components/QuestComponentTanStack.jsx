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
    const [activeTab, setActiveTab] = useState("Main");
    const [expandedQuests, setExpandedQuests] = useState(new Set());

    const { user } = useAuth();

    // Always load all quest types in parallel for instant tab switching
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
                // Add a flag to prevent repeated attempts for the same quest
                if (!window.attemptedAutoStart) {
                    window.attemptedAutoStart = new Set();
                }

                if (window.attemptedAutoStart.has(firstAvailableQuest.quest.id)) {
                    console.log("Already attempted to auto-start this quest, skipping");
                    return;
                }

                console.log(
                    "Auto-starting quest:",
                    firstAvailableQuest.quest.name,
                    "ID:",
                    firstAvailableQuest.quest.id
                );

                window.attemptedAutoStart.add(firstAvailableQuest.quest.id);
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
        // Combine all quest sources with their status information
        const allActiveQuests = (activeQuests?.data || []).map((q) => ({
            ...q.quest,
            status: q.status,
            taskProgress: q.taskProgress,
            overallProgress: q.overallProgress,
            startedAt: q.startedAt,
            completedAt: q.completedAt,
        }));

        const allCompletedQuests = (completedQuests?.data || []).map((q) => ({
            ...q.quest,
            status: q.status,
            startedAt: q.startedAt,
            completedAt: q.completedAt,
        }));

        const allSystemQuests = (systemQuests?.data || []).map((q) => ({
            ...q.quest,
            status: q.status,
            taskProgress: q.taskProgress,
            overallProgress: q.overallProgress,
            startedAt: q.startedAt,
            completedAt: q.completedAt,
        }));

        const allAvailableQuests = (availableQuests?.data || []).map((q) => ({
            ...q.quest,
            status: 'AVAILABLE',
            startedAt: null,
            completedAt: null,
        }));

        const generalQuests = (allQuests?.data || []).map((q) => ({
            ...q,
            status: 'NOT_STARTED',
            startedAt: null,
            completedAt: null,
        }));

        // Combine all quest types and remove duplicates by quest ID
        const allQuestsCombined = [...allActiveQuests, ...allCompletedQuests, ...allSystemQuests, ...allAvailableQuests, ...generalQuests];
        const uniqueQuests = allQuestsCombined.filter((quest, index, self) =>
            index === self.findIndex(q => q.id === quest.id)
        );

        // Filter by quest type based on active tab
        switch (activeTab) {
            case "Main":
                return uniqueQuests.filter(quest => quest.questType === 'MAIN_QUEST');
            case "Daily":
                return uniqueQuests.filter(quest => quest.questType === 'DAILY_QUEST');
            case "Side":
                return uniqueQuests.filter(quest => quest.questType === 'SIDE_QUEST');
            case "Future":
                // Show placeholder future quests for discussion
                return getFutureQuestIdeas();
            default:
                return [];
        }
    };

    // Future quest ideas for discussion
    const getFutureQuestIdeas = () => {
        return [
            {
                id: "future-1",
                name: "Mining Expedition",
                description: "Discover rare minerals deep underground",
                questType: "MAIN_QUEST",
                status: "FUTURE",
                questGiver: { name: "To be determined" },
                tasks: [
                    { description: "Build mining equipment" },
                    { description: "Explore underground caves" },
                    { description: "Find rare gems and metals" }
                ],
                rewards: []
            },
            {
                id: "future-2",
                name: "Fishing Master",
                description: "Master the art of fishing and catch legendary fish",
                questType: "SIDE_QUEST",
                status: "FUTURE",
                questGiver: { name: "Fisher NPC (new)" },
                tasks: [
                    { description: "Learn basic fishing techniques" },
                    { description: "Catch 10 different fish species" },
                    { description: "Catch a legendary fish" }
                ],
                rewards: []
            },
            {
                id: "future-3",
                name: "Weekly Tournament",
                description: "Compete in weekly farming competitions",
                questType: "DAILY_QUEST",
                status: "FUTURE",
                questGiver: { name: "Tournament Organizer (new)" },
                tasks: [
                    { description: "Submit your best crops" },
                    { description: "Compete against other players" },
                    { description: "Win tournament prizes" }
                ],
                rewards: []
            },
            {
                id: "future-4",
                name: "Magic & Alchemy",
                description: "Learn to craft magical potions and enchantments",
                questType: "SIDE_QUEST",
                status: "FUTURE",
                questGiver: { name: "Wizard NPC (new)" },
                tasks: [
                    { description: "Gather magical herbs" },
                    { description: "Learn potion recipes" },
                    { description: "Craft powerful enchantments" }
                ],
                rewards: []
            },
            {
                id: "future-5",
                name: "Town Builder",
                description: "Help expand ShapeTown with new buildings",
                questType: "MAIN_QUEST",
                status: "FUTURE",
                questGiver: { name: "Mayor (new)" },
                tasks: [
                    { description: "Gather building materials" },
                    { description: "Design new structures" },
                    { description: "Construct town improvements" }
                ],
                rewards: []
            }
        ];
    };

    // Only show loading if ALL quest data is loading (unlikely with prefetching)
    const isLoading = activeQuestsLoading && completedQuestsLoading && systemQuestsLoading && availableQuestsLoading && allQuestsLoading;

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
                    {["Main", "Daily", "Side", "Future"].map((tab) => (
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

                {/* Loading State - Show skeleton instead of full screen loading */}
                {isLoading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border border-gray-700 rounded-lg p-4 animate-pulse">
                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-gray-700 rounded w-full"></div>
                                    <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
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
                                                ✅ COMPLETED
                                            </span>
                                        ) : quest.status === "IN_PROGRESS" ? (
                                            <div>
                                                <span className="text-sm font-bold text-yellow-400">
                                                    🔄 IN PROGRESS
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
                                        ) : quest.status === "AVAILABLE" ? (
                                            <span className="text-sm font-bold text-blue-400">
                                                📋 AVAILABLE
                                            </span>
                                        ) : quest.status === "NOT_STARTED" ? (
                                            <span className="text-sm font-bold text-purple-400">
                                                👁️ VISIBLE
                                            </span>
                                        ) : quest.status === "FUTURE" ? (
                                            <span className="text-sm font-bold text-cyan-400">
                                                💭 CONCEPT
                                            </span>
                                        ) : quest.questGiverType === "GAME_SYSTEM" ? (
                                            <span className="text-sm font-bold text-orange-400">
                                                ⚙️ SYSTEM
                                            </span>
                                        ) : (
                                            <span className="text-sm font-bold text-gray-400">
                                                🔒 LOCKED
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
                                <div className="text-lg mb-2">No {activeTab.toLowerCase()} quests available</div>
                                <div className="text-sm">
                                    {activeTab === "Main" && "Complete previous main quests to unlock new ones"}
                                    {activeTab === "Daily" && "Daily quests reset every 24 hours"}
                                    {activeTab === "Side" && "Side quests are optional adventures for extra rewards"}
                                    {activeTab === "Future" && "These are concept ideas for future development"}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Status Legend */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <h4 className="text-yellow-400 font-bold mb-2 text-center">Quest Status Guide</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-green-400">✅ COMPLETED</span> - Quest finished</div>
                        <div><span className="text-yellow-400">🔄 IN PROGRESS</span> - Currently active</div>
                        <div><span className="text-blue-400">📋 AVAILABLE</span> - Ready to start</div>
                        <div><span className="text-purple-400">👁️ VISIBLE</span> - Can see but not start yet</div>
                        <div><span className="text-cyan-400">💭 CONCEPT</span> - Future idea for discussion</div>
                        <div><span className="text-orange-400">⚙️ SYSTEM</span> - Auto-unlocked quest</div>
                        <div><span className="text-gray-400">🔒 LOCKED</span> - Prerequisites needed</div>
                    </div>
                    <div className="text-center text-gray-400 mt-3 text-xs">
                        Quest tasks update automatically as you play the game
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestComponentTanStack;
