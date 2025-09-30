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

                if (
                    window.attemptedAutoStart.has(firstAvailableQuest.quest.id)
                ) {
                    console.log(
                        "Already attempted to auto-start this quest, skipping"
                    );
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
            status: "AVAILABLE",
            startedAt: null,
            completedAt: null,
        }));

        const generalQuests = (allQuests?.data || []).map((q) => ({
            ...q,
            status: "NOT_STARTED",
            startedAt: null,
            completedAt: null,
        }));

        // Combine all quest types and remove duplicates by quest ID
        const allQuestsCombined = [
            ...allActiveQuests,
            ...allCompletedQuests,
            ...allSystemQuests,
            ...allAvailableQuests,
            ...generalQuests,
        ];
        const uniqueQuests = allQuestsCombined.filter(
            (quest, index, self) =>
                index === self.findIndex((q) => q.id === quest.id)
        );

        // Filter by quest type based on active tab
        switch (activeTab) {
            case "Main":
                return uniqueQuests.filter(
                    (quest) => quest.questType === "MAIN_QUEST"
                );
            case "Daily":
                return uniqueQuests.filter(
                    (quest) => quest.questType === "DAILY_QUEST"
                );
            case "Side":
                return uniqueQuests.filter(
                    (quest) => quest.questType === "SIDE_QUEST"
                );
            default:
                return [];
        }
    };

    // Only show loading if ALL quest data is loading (unlikely with prefetching)
    const isLoading =
        activeQuestsLoading &&
        completedQuestsLoading &&
        systemQuestsLoading &&
        availableQuestsLoading &&
        allQuestsLoading;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="relative">
                <img
                    src="/assets/hud/Tasksframe.png"
                    alt="Frame"
                    className="w-auto h-auto"
                />

                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 -right-2 cursor-pointer"
                        onClick={onClose}
                    >
                        <img
                            src="/assets/files/image%2035.png"
                            alt="Close"
                            className="w-10 h-10 mr-4 mt-2 hover:opacity-80 transition-opacity"
                        />
                    </div>

                    <div className="pt-16 pb-3">
                        <h2 className="text-base font-malio text-center text-gray-800">
                            QUESTS
                        </h2>
                        <p className="text-xs font-malio text-center text-gray-600 mt-2">
                            Complete quests to improve your equipment
                            <br />
                            and earn achievements
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-2 px-16 mb-3">
                        {["Main", "Daily", "Side"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-xs font-malio rounded-md transition-colors ${
                                    activeTab === tab
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                {tab} Quests
                            </button>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="w-2/3 mx-auto mb-3 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                                width: `${
                                    getQuestsByTab().length > 0
                                        ? Math.round(
                                              (getQuestsByTab().filter(
                                                  (q) =>
                                                      q.status === "COMPLETED"
                                              ).length /
                                                  getQuestsByTab().length) *
                                                  100
                                          )
                                        : 0
                                }%`,
                            }}
                        ></div>
                    </div>
                    <p className="text-xs text-center mb-3 text-gray-700">
                        {
                            getQuestsByTab().filter(
                                (q) => q.status === "COMPLETED"
                            ).length
                        }
                        /{getQuestsByTab().length} completed
                    </p>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="px-16 pb-16 h-[calc(100%-16rem)] flex items-center justify-center">
                            <p className="text-gray-500 text-sm">
                                Loading quests...
                            </p>
                        </div>
                    )}

                    {/* Quest List */}
                    {!isLoading && (
                        <div className="px-16 pb-16 h-[calc(100%-16rem)] overflow-y-auto overflow-hidden scrollbar-hidden">
                            <div className="space-y-4">
                                {getQuestsByTab().length > 0 ? (
                                    getQuestsByTab().map((quest, index) => (
                                        <div key={quest.id} className="group">
                                            <div
                                                className="flex gap-4 items-start cursor-pointer"
                                                onClick={() =>
                                                    toggleQuestExpansion(
                                                        quest.id
                                                    )
                                                }
                                            >
                                                <img
                                                    src={
                                                        quest.status ===
                                                        "COMPLETED"
                                                            ? "/assets/hud/Taskscheckon.png"
                                                            : "/assets/hud/Taskscheckoff.png"
                                                    }
                                                    alt="Task checkbox"
                                                    className="w-4 h-4 mt-1 flex-shrink-0 object-contain"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p
                                                                className={`text-sm font-bold font-malio ${
                                                                    quest.status ===
                                                                    "COMPLETED"
                                                                        ? "text-green-600"
                                                                        : "text-gray-900/90"
                                                                }`}
                                                            >
                                                                {quest.name}
                                                            </p>
                                                            <p className="text-xs font-malio text-gray-600 mt-1">
                                                                {
                                                                    quest.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <img
                                                            src={
                                                                expandedQuests.has(
                                                                    quest.id
                                                                )
                                                                    ? "/assets/hud/accordionUp.png"
                                                                    : "/assets/hud/accordionDown.png"
                                                            }
                                                            alt={
                                                                expandedQuests.has(
                                                                    quest.id
                                                                )
                                                                    ? "Collapse"
                                                                    : "Expand"
                                                            }
                                                            className="w-4 h-4 ml-2 transition-transform duration-200"
                                                        />
                                                    </div>
                                                    {expandedQuests.has(
                                                        quest.id
                                                    ) && (
                                                        <div className="mt-3 space-y-3 ml-2 transition-all duration-200">
                                                            <div className="bg-gray-100 p-2 rounded-md text-xs font-malio">
                                                                <p>
                                                                    <span className="font-semibold">
                                                                        Quest
                                                                        Giver:
                                                                    </span>{" "}
                                                                    {quest
                                                                        .questGiver
                                                                        ?.name ||
                                                                        "Game System"}
                                                                </p>
                                                                {quest.map
                                                                    ?.name && (
                                                                    <p>
                                                                        <span className="font-semibold">
                                                                            Location:
                                                                        </span>{" "}
                                                                        {
                                                                            quest
                                                                                .map
                                                                                .name
                                                                        }
                                                                    </p>
                                                                )}
                                                                <p>
                                                                    <span className="font-semibold">
                                                                        Type:
                                                                    </span>{" "}
                                                                    {quest.questType?.replace(
                                                                        "_",
                                                                        " "
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="mt-2">
                                                                <p className="text-xs font-semibold mb-2">
                                                                    Tasks:
                                                                </p>
                                                                {quest.tasks?.map(
                                                                    (
                                                                        task,
                                                                        index
                                                                    ) => {
                                                                        const progress =
                                                                            quest.taskProgress?.find(
                                                                                (
                                                                                    tp
                                                                                ) =>
                                                                                    tp.taskIndex ===
                                                                                    index
                                                                            );
                                                                        const isCompleted =
                                                                            progress?.isCompleted ||
                                                                            false;

                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex items-start gap-2 mb-2"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        isCompleted
                                                                                            ? "/assets/hud/Taskscheckon.png"
                                                                                            : "/assets/hud/Taskscheckoff.png"
                                                                                    }
                                                                                    alt="Subtask checkbox"
                                                                                    className="w-3 h-3 mt-1 flex-shrink-0 object-contain"
                                                                                />
                                                                                <p
                                                                                    className={`text-xs font-malio ${
                                                                                        isCompleted
                                                                                            ? "text-green-600"
                                                                                            : "text-gray-700"
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        task.description
                                                                                    }
                                                                                    {progress &&
                                                                                        progress.progress >
                                                                                            0 && (
                                                                                            <span className="ml-2 text-blue-600">
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
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>

                                                            {quest.rewards
                                                                ?.length >
                                                                0 && (
                                                                <div className="bg-gray-100 p-2 rounded-md mt-2">
                                                                    <p className="text-xs font-malio text-gray-700">
                                                                        <span className="font-bold">
                                                                            Reward:
                                                                        </span>{" "}
                                                                        {quest.rewards
                                                                            .map(
                                                                                (
                                                                                    reward,
                                                                                    idx
                                                                                ) => {
                                                                                    if (
                                                                                        reward.rewardType ===
                                                                                        "GOLD"
                                                                                    ) {
                                                                                        return `${reward.goldAmount} gold`;
                                                                                    } else if (
                                                                                        reward.rewardType ===
                                                                                            "ITEM" &&
                                                                                        reward.item
                                                                                    ) {
                                                                                        return `${reward.item.name} x${reward.itemQuantity}`;
                                                                                    } else if (
                                                                                        reward.rewardType ===
                                                                                            "ACHIEVEMENT" &&
                                                                                        reward.achievement
                                                                                    ) {
                                                                                        return reward
                                                                                            .achievement
                                                                                            .name;
                                                                                    }
                                                                                    return "";
                                                                                }
                                                                            )
                                                                            .filter(
                                                                                Boolean
                                                                            )
                                                                            .join(
                                                                                ", "
                                                                            )}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {quest.id !==
                                                getQuestsByTab()[
                                                    getQuestsByTab().length - 1
                                                ].id && (
                                                <div className="h-px bg-gray-900/10 mt-4" />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 text-sm">
                                            No {activeTab.toLowerCase()} quests
                                            available.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestComponentTanStack;
