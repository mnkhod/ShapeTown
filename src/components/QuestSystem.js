import { EventEmitter } from "events";
import { QueryClient } from "@tanstack/react-query";
import {
    getQuests,
    getNpcs,
    getActiveQuests,
    getCompletedQuests,
    saveGameState,
} from "../lib/query-helper";
import { QUEST_KEYS } from "../hooks/useQuests";

// Default NPC list as fallback
const defaultNpcsToGreet = [
    { id: "8a357e7c-ae42-4121-9636-258e4443c2a5", name: "Captain Valor" },
    { id: "09a59f2a-aac8-4336-9eff-50711546b7a0", name: "Lady Lydia" },
    { id: "52c3c3e4-c1fe-4e47-b161-89670078ccb5", name: "Master Smith" },
    { id: "933dd35a-748e-4a86-8c44-8d6d95fba093", name: "Merchant Maya" },
    { id: "39a66baf-120b-4f1d-894e-f8e6725cb24d", name: "Old Man Jack" },
];

export let npcsToGreet = [...defaultNpcsToGreet];

class QuestSystem extends EventEmitter {
    constructor() {
        super();

        if (!QuestSystem.instance) {
            this.initializeSystem();
            QuestSystem.instance = this;
        }

        return QuestSystem.instance;
    }

    initializeSystem() {
        this.quests = {};
        this.activeQuests = new Set();
        this.completedQuests = new Set();
        this.playerProgress = {};
        this.questsLoaded = false;
        this.queryClient = null;
        this.authInitialized = false;

        // Don't initialize quest data immediately - wait for auth
    }

    setQueryClient(queryClient) {
        this.queryClient = queryClient;
    }

    async initializeWithAuth() {
        if (this.authInitialized) return;

        console.log("Initializing quest system with authentication...");
        this.authInitialized = true;

        // Load NPCs from backend first
        await this.loadNPCs();

        // Then initialize quest data
        await this.initializeQuestData();
    }

    async loadNPCs() {
        try {
            console.log("Loading NPCs from backend...");
            const npcData = await getNpcs();

            if (npcData && npcData.success && npcData.data) {
                const backendNpcs = npcData.data;
                console.log(
                    "Successfully loaded NPCs from backend:",
                    backendNpcs.length
                );

                // Update the global npcsToGreet array
                npcsToGreet.length = 0; // Clear existing
                npcsToGreet.push(
                    ...backendNpcs.map((npc) => ({
                        id: npc.id,
                        name: npc.name,
                    }))
                );

                console.log("Updated npcsToGreet:", npcsToGreet);

                this.emit("npcs:loaded", { npcs: npcsToGreet });
            } else {
                console.warn("Invalid NPC data format, using defaults");
            }
        } catch (error) {
            console.error("Failed to load NPCs from backend:", error);
            console.log("Using default NPC data");
        }
    }
    resetDailyQuest(questId) {
        const quest = this.quests[questId];
        if (!quest) return;

        console.log(`Resetting daily quest ${questId} for tomorrow`);

        quest.completed = false;

        Object.values(quest.subtasks).forEach((subtask) => {
            subtask.completed = false;
        });

        this.activeQuests.add(questId);

        this.completedQuests.delete(questId);

        this.emit("quest:reset", { questId });
        console.log(
            `Daily quest ${questId} has been reset and is ready for tomorrow`
        );
    }

    async initializeQuestData() {
        try {
            console.log("Fetching quests using TanStack Query...");

            // Check if we have a token
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.warn(
                    "No auth token available, loading fallback quests"
                );
                this.loadFallbackQuests();
                return;
            }

            // Try to get cached data first, then fetch if needed
            let questData;

            if (this.queryClient) {
                questData = await this.queryClient.fetchQuery({
                    queryKey: QUEST_KEYS.lists(),
                    queryFn: getQuests,
                    staleTime: 5 * 60 * 1000, // 5 minutes
                });
            } else {
                // Fallback to direct API call if queryClient not available
                questData = await getQuests();
            }

            if (questData && questData.success && questData.data) {
                const backendQuests = questData.data;
                console.log(
                    "Successfully fetched quests from backend:",
                    backendQuests.length
                );

                // Sync frontend quest progress with backend state
                await this.syncQuestProgress();
                this.processQuestData(backendQuests);

                // Sync inventory from backend on startup (disabled - causes errors)
                // setTimeout(() => {
                //     this.syncInventoryFromBackend();
                // }, 2000);
            } else {
                console.error(
                    "Invalid quest data format received from backend"
                );
                this.loadFallbackQuests();
            }
        } catch (error) {
            console.error("Failed to fetch quests from backend:", error);

            // Log more detailed error info
            if (error.response) {
                console.error("Backend error response:", {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                    headers: error.response.headers,
                });
            }

            this.loadFallbackQuests();
        }
    }

    async syncQuestProgress() {
        try {
            console.log("Syncing quest progress with backend...");

            // Fetch active and completed quests from backend
            const [activeQuestsResponse, completedQuestsResponse] =
                await Promise.all([getActiveQuests(), getCompletedQuests()]);

            // Initialize quest progress tracking
            this.activeQuestIds = new Set();
            this.completedQuestIds = new Set();
            this.questTaskProgress = new Map(); // questId -> taskProgress array

            // Process active quests
            if (
                activeQuestsResponse &&
                activeQuestsResponse.success &&
                activeQuestsResponse.data
            ) {
                activeQuestsResponse.data.forEach((userQuest) => {
                    if (userQuest.quest) {
                        this.activeQuestIds.add(userQuest.quest.id);
                        if (userQuest.taskProgress) {
                            this.questTaskProgress.set(
                                userQuest.quest.id,
                                userQuest.taskProgress
                            );
                        }
                        console.log(
                            `Active quest: ${userQuest.quest.name} (${userQuest.quest.id})`
                        );
                    }
                });
            }

            // Process completed quests
            if (
                completedQuestsResponse &&
                completedQuestsResponse.success &&
                completedQuestsResponse.data
            ) {
                completedQuestsResponse.data.forEach((userQuest) => {
                    if (userQuest.quest) {
                        this.completedQuestIds.add(userQuest.quest.id);
                        console.log(
                            `Completed quest: ${userQuest.quest.name} (${userQuest.quest.id})`
                        );
                    }
                });
            }

            console.log("Quest progress sync completed:");
            console.log("- Active quests:", this.activeQuestIds.size);
            console.log("- Completed quests:", this.completedQuestIds.size);
        } catch (error) {
            console.error("Failed to sync quest progress:", error);
        }
    }

    async syncInventoryFromBackend() {
        try {
            console.log("🎒 Syncing inventory from backend...");

            // Fetch user inventory from correct endpoint
            const inventoryResponse = await fetch("http://localhost:3333/api/my/inventory", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!inventoryResponse.ok) {
                console.error("Failed to fetch inventory from backend");
                return;
            }

            const inventoryData = await inventoryResponse.json();
            console.log("📦 Inventory data received:", inventoryData);

            if (inventoryData.success && inventoryData.data) {
                this.mapBackendInventoryToFrontend(inventoryData.data);
            }

        } catch (error) {
            console.error("Failed to sync inventory from backend:", error);
        }
    }

    mapBackendInventoryToFrontend(inventorySlots) {
        console.log("🗺️ Mapping backend inventory to frontend...");
        console.log("Debug: this.scene =", this.scene);
        console.log("Debug: this.game =", this.game);
        console.log("Debug: window.phaserGame =", window.phaserGame);

        // Item name mapping: Backend → Frontend
        const itemMapping = {
            'Iron Hoe': { key: 'ToolHoe', texture: 'IconToolHoe' },
            'Watering Can': { key: 'ToolWateringCan', texture: 'IconToolWateringCan' },
            'Steel Pickaxe': { key: 'ToolPickaxe', texture: 'IconToolPickaxe' },
            'Carrot Seeds': { key: 'seed_carrot', texture: 'crops-seed bags-carrot' },
            'Carrot': { key: 'CARROT', texture: 'crops-carrot' },
            'Potato': { key: 'POTATO', texture: 'crops-potato' },
            'Iron Sword': { key: 'ToolSword', texture: 'IconToolSword' },
            'Steel Axe': { key: 'ToolAxe', texture: 'IconToolAxe' },
        };

        // Find scene with newItemHud
        let scene = null;

        // Try to find the scene with newItemHud
        if (this.scene && this.scene.newItemHud) {
            scene = this.scene;
        } else if (this.game && this.game.scene && this.game.scene.scenes) {
            scene = Object.values(this.game.scene.scenes).find(s => s.newItemHud);
        } else {
            // Try global quest system's game reference
            if (window.questSystem && window.questSystem.game && window.questSystem.game.scene) {
                scene = Object.values(window.questSystem.game.scene.scenes).find(s => s.newItemHud);
            } else if (window.phaserGame && window.phaserGame.scene) {
                scene = Object.values(window.phaserGame.scene.scenes).find(s => s.newItemHud);
            }
        }

        if (!scene || !scene.newItemHud) {
            console.warn("⚠️ newItemHud not found, cannot sync inventory. Available scenes:");
            if (window.questSystem && window.questSystem.game && window.questSystem.game.scene) {
                const scenes = window.questSystem.game.scene.scenes;
                console.warn("Scenes:", Object.keys(scenes));
                console.warn("Scenes with newItemHud:", Object.keys(scenes).filter(key => scenes[key].newItemHud));
            }

            // Retry up to 3 times only
            if (!this.inventorySyncRetries) this.inventorySyncRetries = 0;
            if (this.inventorySyncRetries < 3) {
                this.inventorySyncRetries++;
                console.warn(`Will retry inventory sync in 3 seconds (attempt ${this.inventorySyncRetries}/3)...`);
                setTimeout(() => {
                    this.syncInventoryFromBackend();
                }, 3000);
            } else {
                console.error("❌ Failed to sync inventory after 3 attempts. newItemHud not available.");
            }
            return;
        }

        // Clear existing inventory (optional)
        // scene.newItemHud.clearAllItems();

        // Add items from backend inventory
        inventorySlots.forEach(slot => {
            const backendItem = slot.item;
            const mapping = itemMapping[backendItem.name];

            if (mapping) {
                console.log(`➕ Adding ${slot.quantity}x ${backendItem.name} as ${mapping.key}`);
                scene.newItemHud.addItem(mapping.key, mapping.texture, 0, slot.quantity);
            } else {
                console.warn(`⚠️ No mapping found for backend item: ${backendItem.name}`);
            }
        });

        console.log("✅ Inventory sync completed");
    }

    processQuestData(backendQuests) {
        // Transform backend quest data to internal format
        this.quests = {};
        backendQuests.forEach((quest, index) => {
            const legacyId = String(index + 1).padStart(3, "0");

            // Create subtasks from tasks
            const subtasks = {};
            quest.tasks.forEach((task, taskIndex) => {
                const subtaskId = `${legacyId}-${taskIndex + 1}`;

                // Check if this task is completed based on backend progress
                let isTaskCompleted = false;
                const questTaskProgress = this.questTaskProgress?.get(quest.id);
                if (questTaskProgress) {
                    const taskProgress = questTaskProgress.find(
                        (tp) => tp.taskIndex === taskIndex
                    );
                    isTaskCompleted = taskProgress?.isCompleted || false;
                }

                subtasks[subtaskId] = {
                    id: subtaskId,
                    text: task.description,
                    completed: isTaskCompleted,
                    type: task.type,
                    ...(task.npcId && { npcId: task.npcId }),
                    ...(task.mapId && { mapId: task.mapId }),
                    ...(task.amount && { amount: task.amount }),
                    ...(task.itemType && { itemType: task.itemType }),
                    ...(task.recipe && { recipe: task.recipe }),
                };
            });

            // Map quest type to category
            const categoryMap = {
                MAIN_QUEST: "Main Quest",
                SIDE_QUEST: "Side Quest",
                DAILY_QUEST: "Daily Quest",
            };

            // Build reward string
            let rewardString = "";
            if (quest.rewards && quest.rewards.length > 0) {
                const rewardParts = quest.rewards
                    .map((reward) => {
                        if (reward.rewardType === "GOLD") {
                            return `${reward.goldAmount} gold`;
                        } else if (reward.rewardType === "ITEM") {
                            return `${reward.item.name} x${reward.itemQuantity}`;
                        } else if (reward.rewardType === "ACHIEVEMENT") {
                            return reward.achievement.name;
                        }
                        return "";
                    })
                    .filter(Boolean);
                rewardString = rewardParts.join(", ");
            }

            // Determine prerequisites
            let prerequisites = "none";
            if (quest.prerequisites && quest.prerequisites.length > 0) {
                const prereqQuest = backendQuests.find(
                    (q) => q.id === quest.prerequisites[0].prerequisiteId
                );
                if (prereqQuest) {
                    const prereqIndex = backendQuests.indexOf(prereqQuest);
                    prerequisites = `#${String(prereqIndex + 1).padStart(
                        3,
                        "0"
                    )}`;
                }
            }

            this.quests[legacyId] = {
                id: legacyId,
                backendId: quest.id,
                title: quest.name,
                description: quest.description,
                category: categoryMap[quest.questType] || quest.questType,
                location: quest.mapId ? "Various locations" : "Unknown",
                prerequisites,
                questGiver: quest.questGiver
                    ? quest.questGiver.name
                    : "Unknown",
                completed: this.completedQuestIds?.has(quest.id) || false,
                active: this.activeQuestIds?.has(quest.id) || false,
                subtasks,
                reward: rewardString,
                questData: quest, // Keep original data for reference
            };
        });

        // Find and activate "The First Harvest" quest
        const firstHarvestQuest = Object.values(this.quests).find(
            (quest) => quest.title === "The First Harvest"
        );

        if (firstHarvestQuest) {
            firstHarvestQuest.active = true;
            this.activeQuests.add(firstHarvestQuest.id);
            console.log(
                `Activated quest: ${firstHarvestQuest.title} (${firstHarvestQuest.id})`
            );
        }

        this.questsLoaded = true;
        this.emit("quests:loaded", { quests: this.quests });
    }

    loadFallbackQuests() {
        console.log("Loading fallback quest data...");

        // Fallback quest data (minimal set)
        const fallbackQuests = [
            {
                id: "fallback-001",
                name: "The First Harvest",
                description: "Learn the basics of farming",
                questType: "MAIN_QUEST",
                tasks: [
                    {
                        type: "CLEAR_AREA",
                        description:
                            "Clean up the highlighted area using a Pickaxe to remove rocks",
                    },
                    {
                        type: "PREPARE_SOIL",
                        description:
                            "Use a Hoe tool to prepare the soil for planting",
                    },
                    {
                        type: "PLANT_SEEDS",
                        description: "Plant carrot seeds in the prepared soil",
                    },
                    {
                        type: "WATER_PLANTS",
                        description:
                            "Water the planted seeds with the watering can",
                    },
                    {
                        type: "HARVEST_CROP",
                        description: "Harvest the grown carrots",
                    },
                    {
                        type: "RETURN_TO_NPC",
                        description: "Return to Old Man Jack",
                    },
                ],
                questGiver: { name: "Old Man Jack" },
                rewards: [
                    {
                        rewardType: "ITEM",
                        item: { name: "Watering Can" },
                        itemQuantity: 1,
                    },
                ],
                prerequisites: [],
            },
        ];

        this.processQuestData(fallbackQuests);
    }

    async waitForQuestsLoaded() {
        if (this.questsLoaded) return;

        return new Promise((resolve) => {
            this.once("quests:loaded", resolve);
        });
    }

    async getQuestProgress() {
        await this.waitForQuestsLoaded();

        const progress = {};

        Object.values(this.quests).forEach((quest) => {
            progress[quest.id] = {
                completed: quest.completed,
                subtasks: {},
            };

            Object.values(quest.subtasks).forEach((subtask) => {
                progress[quest.id].subtasks[subtask.id] = subtask.completed;
            });
        });

        return progress;
    }

    updateQuestProgress(update) {
        const questId = Object.keys(update)[0];
        const quest = this.quests[questId];

        if (!quest) return;

        if (update[questId].subtasks) {
            Object.entries(update[questId].subtasks).forEach(
                ([subtaskId, completed]) => {
                    this.updateSubtask(questId, subtaskId, completed);
                }
            );
        }
    }

    updateSubtask(questId, subtaskId, completed = true) {
        console.log(
            `Attempting to update subtask ${questId}-${subtaskId} to ${completed}`
        );

        if (!this.isQuestActive(questId)) {
            console.warn(
                `Cannot update subtask: Quest ${questId} is not active`
            );
            return;
        }

        const quest = this.quests[questId];
        if (!quest) {
            console.warn(`Cannot update subtask: Quest ${questId} not found`);
            return;
        }

        const subtask = quest.subtasks[subtaskId];
        if (!subtask) {
            console.warn(
                `Cannot update subtask: Subtask ${subtaskId} not found in quest ${questId}`
            );
            return;
        }

        subtask.completed = completed;
        console.log(`Updated subtask ${questId}-${subtaskId} to ${completed}`);

        const allCompleted = Object.values(quest.subtasks).every(
            (st) => st.completed
        );

        if (allCompleted) {
            this.completeQuest(questId);
        }

        this.emit("quest:updated", {
            questId,
            subtaskId,
            completed: subtask.completed,
            questCompleted: allCompleted,
        });

        return allCompleted;
    }

    completeQuest(questId) {
        const quest = this.quests[questId];
        if (!quest) return;

        quest.completed = true;
        this.activeQuests.delete(questId);
        this.completedQuests.add(questId);

        console.log(`Quest ${questId} completed!`);

        this.checkQuestPrerequisites();

        this.emit("quest:completed", { questId });

        // Invalidate TanStack Query cache
        this.invalidateQuestCache();

        // Save checkpoint after quest completion - non-blocking
        setTimeout(
            () =>
                this.saveQuestProgressCheckpoint(`Quest ${questId} completed`),
            0
        );
    }

    async saveQuestProgressCheckpoint(notes = "Quest progress saved") {
        try {
            console.log("🔄 Starting quest progress checkpoint save...");

            // Collect current quest state
            const questState = {
                quests: this.quests,
                activeQuests: Array.from(this.activeQuests),
                completedQuests: Array.from(this.completedQuests),
                playerProgress: this.playerProgress,
            };

            console.log("📋 Quest state to save:", {
                totalQuests: Object.keys(this.quests).length,
                activeQuests: questState.activeQuests,
                completedQuests: questState.completedQuests,
            });

            // Collect NPC progress from localStorage
            const npcProgress = {
                jackLifeCycleStep: localStorage.getItem("jackLifeCycleStep"),
                gameAchievements: localStorage.getItem("gameAchievements"),
                greetedNPCs: localStorage.getItem("greetedNPCs"),
            };

            console.log("🧙 NPC progress to save:", npcProgress);

            // Collect inventory from localStorage
            let inventory = null;
            try {
                inventory = JSON.parse(
                    localStorage.getItem("gameInventory") || "{}"
                );
                console.log("🎒 Inventory to save:", inventory);
            } catch (e) {
                console.warn("Failed to parse inventory from localStorage:", e);
            }

            const checkpointData = {
                questProgress: questState,
                npcProgress,
                inventory,
            };

            console.log("💾 Sending checkpoint data to backend...");
            const result = await saveGameState(checkpointData);

            console.log(
                "✅ Quest progress checkpoint saved successfully:",
                result
            );
        } catch (error) {
            console.error(
                "❌ Failed to save quest progress checkpoint:",
                error
            );
        }
    }

    restoreFromCheckpoint(checkpointQuestData) {
        try {
            console.log(
                "Restoring quest system from checkpoint:",
                checkpointQuestData
            );

            if (checkpointQuestData.quests) {
                // Restore quest states
                Object.keys(checkpointQuestData.quests).forEach((questId) => {
                    if (this.quests[questId]) {
                        const savedQuest = checkpointQuestData.quests[questId];
                        this.quests[questId].completed = savedQuest.completed;
                        this.quests[questId].active = savedQuest.active;

                        // Restore subtask completion states
                        if (
                            savedQuest.subtasks &&
                            this.quests[questId].subtasks
                        ) {
                            Object.keys(savedQuest.subtasks).forEach(
                                (subtaskId) => {
                                    if (
                                        this.quests[questId].subtasks[subtaskId]
                                    ) {
                                        this.quests[questId].subtasks[
                                            subtaskId
                                        ].completed =
                                            savedQuest.subtasks[
                                                subtaskId
                                            ].completed;
                                    }
                                }
                            );
                        }
                    }
                });
            }

            if (checkpointQuestData.activeQuests) {
                this.activeQuests = new Set(checkpointQuestData.activeQuests);
            }

            if (checkpointQuestData.completedQuests) {
                this.completedQuests = new Set(
                    checkpointQuestData.completedQuests
                );
            }

            if (checkpointQuestData.playerProgress) {
                this.playerProgress = {
                    ...this.playerProgress,
                    ...checkpointQuestData.playerProgress,
                };
            }

            console.log("Quest system restored from checkpoint successfully");
            console.log("Active quests:", Array.from(this.activeQuests));
            console.log("Completed quests:", Array.from(this.completedQuests));

            // Emit restoration event
            this.emit("quest:restored", {
                activeQuests: Array.from(this.activeQuests),
                completedQuests: Array.from(this.completedQuests),
            });
        } catch (error) {
            console.error(
                "Failed to restore quest system from checkpoint:",
                error
            );
        }
    }

    invalidateQuestCache() {
        if (this.queryClient) {
            this.queryClient.invalidateQueries({ queryKey: QUEST_KEYS.all });
        }
    }

    activateQuest(questId) {
        const quest = this.quests[questId];
        if (!quest) return;

        quest.active = true;
        this.activeQuests.add(questId);

        console.log(`Quest ${questId} activated!`);

        Object.values(quest.subtasks).forEach((subtask) => {
            if (!subtask.completed) {
                subtask.completed = false;
            }
        });

        if (questId === "003") {
            if (this.scenes) {
                const sceneArray = Array.isArray(this.scenes)
                    ? this.scenes
                    : [this.scenes];
                sceneArray.forEach((scene) => {
                    const questData =
                        scene.game?.registry?.get("questData") || {};
                    if (questData.metNPCs && Array.isArray(questData.metNPCs)) {
                        if (!scene.greetedNPCs) {
                            scene.greetedNPCs = new Set();
                        }
                        questData.metNPCs.forEach((npc) => {
                            scene.greetedNPCs.add(npc);
                            console.log(
                                `Retroactively marked ${npc} as greeted for Quest #003`
                            );
                        });
                    }
                });
            }
        }

        this.emit("quest:activated", { questId });

        // Invalidate TanStack Query cache
        this.invalidateQuestCache();
    }

    checkQuestPrerequisites() {
        Object.values(this.quests).forEach((quest) => {
            if (quest.completed || quest.active) return;

            const prereq = quest.prerequisites;
            if (prereq === "none") {
                this.activateQuest(quest.id);
                return;
            }

            if (prereq.startsWith("#")) {
                const prereqId = prereq.substring(1);
                if (this.isQuestCompleted(prereqId)) {
                    this.activateQuest(quest.id);
                }
            }
        });
    }

    isQuestActive(questId) {
        // Check backend state first if available
        const quest = this.quests[questId];
        if (quest && quest.backendId) {
            return this.activeQuestIds?.has(quest.backendId) || false;
        }
        // Fallback to legacy system
        return this.activeQuests.has(questId);
    }

    isQuestCompleted(questId) {
        // Check backend state first if available
        const quest = this.quests[questId];
        if (quest && quest.backendId) {
            return this.completedQuestIds?.has(quest.backendId) || false;
        }
        // Fallback to legacy system
        return this.completedQuests.has(questId);
    }

    async getActiveQuests() {
        await this.waitForQuestsLoaded();
        return Array.from(this.activeQuests).map((id) => this.quests[id]);
    }

    async getCompletedQuests() {
        await this.waitForQuestsLoaded();
        return Array.from(this.completedQuests).map((id) => this.quests[id]);
    }

    async getAllQuests() {
        await this.waitForQuestsLoaded();
        return Object.values(this.quests);
    }

    registerScenes(scenes) {
        this.scenes = scenes;
    }

    handleEvent(eventName, params) {
        console.log("Quest event received:", eventName, params);

        switch (eventName) {
            case "harvest:rockRemoved":
                this.updateSubtask("001", "001-1");
                // Update backend: taskIndex 0 (CLEAR_AREA) - non-blocking
                setTimeout(async () => {
                    const questId1 = await this.getFirstHarvestQuestId();
                    if (questId1)
                        await this.updateBackendTaskProgress(questId1, 0);
                }, 0);
                break;

            case "harvest:groundHoed":
                this.updateSubtask("001", "001-2");
                // Update backend: taskIndex 1 (PREPARE_SOIL) - non-blocking
                setTimeout(async () => {
                    const questId2 = await this.getFirstHarvestQuestId();
                    if (questId2)
                        await this.updateBackendTaskProgress(questId2, 1);
                }, 0);
                break;

            case "harvest:seedPlanted":
                if (params.crop === "CARROT" || params.seed === "CARROT") {
                    this.updateSubtask("001", "001-3");
                    // Update backend: taskIndex 2 (PLANT_SEEDS) - non-blocking
                    setTimeout(async () => {
                        const questId3 = await this.getFirstHarvestQuestId();
                        if (questId3)
                            await this.updateBackendTaskProgress(questId3, 2);
                    }, 0);
                }
                break;

            case "harvest:cropWatered":
                this.updateSubtask("001", "001-4");
                // Update backend: taskIndex 3 (WATER_PLANTS) - non-blocking
                setTimeout(async () => {
                    const questId4 = await this.getFirstHarvestQuestId();
                    if (questId4)
                        await this.updateBackendTaskProgress(questId4, 3);
                }, 0);
                break;

            case "harvest:cropHarvested":
                if (params.crop === "CARROT") {
                    this.updateSubtask("001", "001-5");
                    // Update backend: taskIndex 4 (HARVEST_CROP) - non-blocking
                    setTimeout(async () => {
                        const questId5 = await this.getFirstHarvestQuestId();
                        if (questId5)
                            await this.updateBackendTaskProgress(questId5, 4);
                    }, 0);
                }
                break;

            case "npc:jackInteraction":
                // Check if "The First Harvest" quest should be started - non-blocking
                setTimeout(() => this.tryStartFirstHarvestQuest(), 0);

                console.log("🔍 Jack Interaction Debug:");
                console.log("  - Quest 001 exists?", !!this.quests["001"]);
                console.log("  - Quest 001 data:", this.quests["001"]);
                console.log("  - Is quest 001 completed in backend?", this.isQuestCompleted("001"));

                const harvestStep = this.quests["001"]?.subtasks["001-5"];
                console.log("  - Harvest step (001-5):", harvestStep);

                if (harvestStep && harvestStep.completed) {
                    console.log("✅ Harvest step completed, updating Return to NPC step");
                    this.updateSubtask("001", "001-6");
                    // Update backend: taskIndex 5 (RETURN_TO_NPC) - non-blocking
                    setTimeout(async () => {
                        const questId6 = await this.getFirstHarvestQuestId();
                        if (questId6)
                            await this.updateBackendTaskProgress(questId6, 5);
                    }, 0);
                } else {
                    console.log("❌ Harvest step not completed yet or doesn't exist");
                }

                // Check if quest should be completed after return to NPC
                const returnStep = this.quests["001"]?.subtasks["001-6"];
                if (returnStep && returnStep.completed) {
                    console.log("✅ Return to NPC completed - Quest should be finished!");
                    this.completeQuest("001");
                }

                if (
                    this.isQuestActive("002") &&
                    !this.quests["002"].subtasks["002-1"].completed
                ) {
                    console.log("Completing subtask 002-1: Go meet NPC Jack");
                    this.updateSubtask("002", "002-1");
                }
                break;

            // --- Quest #002: Taste of Gold ---
            case "quest:taste-of-gold-activated":
                if (
                    !this.isQuestActive("002") &&
                    !this.isQuestCompleted("002")
                ) {
                    console.log("Activating Taste of Gold quest");
                    this.activateQuest("002");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "New Quest: Taste of Gold"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "New Quest: Taste of Gold"
                        );
                    }
                }
                break;

            case "player:enteredTown":
                if (this.isQuestActive("002")) {
                    console.log("Completing subtask 002-2: Go to Shape Town");
                    this.updateSubtask("002", "002-2");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Entered Town"
                        );
                    }
                }
                break;

            case "npc:lydiaInteraction":
                if (this.isQuestActive("002")) {
                    console.log("Completing subtask 002-3: Meet Lady Lydia");
                    this.updateSubtask("002", "002-3");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Met Lady Lydia"
                        );
                    }
                }
                if (this.isQuestActive("003")) {
                    if (!params.scene.greetedNPCs)
                        params.scene.greetedNPCs = new Set();
                    // params.scene.greetedNPCs.add("Lydia");

                    const lydiaNpc = npcsToGreet.find(
                        (n) => n.name === "Lady Lydia"
                    );
                    if (lydiaNpc) {
                        params.scene.greetedNPCs.add(lydiaNpc.id);
                    }

                    const requiredNpcIds = npcsToGreet.map((n) => n.id);
                    const allGreeted = requiredNpcIds.every((id) =>
                        params.scene.greetedNPCs.has(id)
                    );
                    if (allGreeted) {
                        this.updateSubtask("003", "003-1", true);
                    }
                }
                break;

            case "quest:sold-items-to-lydia":
                if (
                    this.isQuestActive("002") &&
                    !this.quests["002"].subtasks["002-4"].completed
                ) {
                    console.log(
                        "Completing subtask 002-4: Sell items from NPC Jack"
                    );
                    this.updateSubtask("002", "002-4", true);

                    if (params.scene && params.scene.gold !== undefined) {
                        params.scene.gold += 1000;
                        console.log("Added 1000 gold reward");
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.gold !== undefined
                    ) {
                        params.npc.scene.gold += 1000;
                        console.log("Added 1000 gold reward");
                    }

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Complete: Taste of Gold"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "Quest Complete: Taste of Gold"
                        );
                    }

                    if (this.isQuestCompleted("002")) {
                        // Activate Quest #003
                        this.activateQuest("003");
                        console.log("Quest #003 activated: Good Invitation");

                        if (params.scene && params.scene.alertPrefab) {
                            setTimeout(() => {
                                params.scene.alertPrefab.alert(
                                    "New Quest: Good Invitation - Meet everyone in town!"
                                );
                            }, 3000);
                        } else if (
                            params.npc &&
                            params.npc.scene &&
                            params.npc.scene.alertPrefab
                        ) {
                            setTimeout(() => {
                                params.npc.scene.alertPrefab.alert(
                                    "New Quest: Good Invitation - Meet everyone in town!"
                                );
                            }, 3000);
                        }
                    }
                }
                break;

            // --- Quest #003: Good Invitation ---
            case "npc:allGreeted":
                if (this.isQuestActive("003")) {
                    console.log(
                        "Quest 003: Completing 'All NPCs greeted' subtask"
                    );
                    const completed = this.updateSubtask("003", "003-1");

                    if (completed) {
                        console.log(
                            "Quest 003: All NPCs greeted, quest completed!"
                        );

                        if (params.scene && params.scene.alertPrefab) {
                            params.scene.alertPrefab.alert(
                                "Quest Complete: Good Invitation"
                            );
                        } else if (
                            params.npc &&
                            params.npc.scene &&
                            params.npc.scene.alertPrefab
                        ) {
                            params.npc.scene.alertPrefab.alert(
                                "Quest Complete: Good Invitation"
                            );
                        }
                    }
                }
                break;
            // --- Quest #007: Treasure From Sea ---
            case "npc:lydiaSeashellQuest":
                if (
                    !this.isQuestActive("007") &&
                    !this.isQuestCompleted("007") &&
                    this.isQuestCompleted("002")
                ) {
                    console.log("Activating Treasure From Sea quest");
                    this.activateQuest("007");

                    // Show notification
                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "New Quest: Treasure From Sea"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "New Quest: Treasure From Sea"
                        );
                    }
                }
                if (
                    this.isQuestActive("007") &&
                    !this.quests["007"].subtasks["007-1"].completed
                ) {
                    this.updateSubtask("007", "007-1");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Met Lydia"
                        );
                    }
                }
                break;

            case "player:enteredBeach":
                if (
                    this.isQuestActive("007") &&
                    !this.quests["007"].subtasks["007-2"].completed
                ) {
                    console.log("Completing subtask 007-2: Go to the beach");
                    this.updateSubtask("007", "007-2");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Updated: Arrived at Beach"
                        );
                    }
                }
                break;

            case "item:seashellCollected":
                if (
                    this.isQuestActive("007") &&
                    this.quests["007"].subtasks["007-2"].completed
                ) {
                    if (!this.quests["007"].subtasks["007-3"].completed) {
                        if (!params.scene.collectedSeashells) {
                            params.scene.collectedSeashells = 0;
                        }

                        params.scene.collectedSeashells++;

                        if (params.scene && params.scene.alertPrefab) {
                            params.scene.alertPrefab.alert(
                                `Seashell Collected (${params.scene.collectedSeashells}/5)`
                            );
                        }

                        if (params.scene.collectedSeashells >= 5) {
                            console.log(
                                "Completing subtask 007-3: Collect the seashells from the beach"
                            );
                            this.updateSubtask("007", "007-3");

                            if (params.scene && params.scene.alertPrefab) {
                                params.scene.alertPrefab.alert(
                                    "Quest Updated: All Seashells Collected"
                                );
                            }
                        }
                    }
                }
                break;

            case "npc:lydiaSeashellDelivery":
                if (
                    this.isQuestActive("007") &&
                    this.quests["007"].subtasks["007-3"].completed &&
                    !this.quests["007"].subtasks["007-4"].completed
                ) {
                    console.log(
                        "Completing subtask 007-4: Back to meet NPC Lydia"
                    );
                    this.updateSubtask("007", "007-4");

                    const seashellCount = params.scene.collectedSeashells || 5;
                    const goldReward = seashellCount * 15;

                    if (params.scene && params.scene.gold !== undefined) {
                        params.scene.gold += goldReward;
                        console.log(
                            `Added ${goldReward} gold reward for ${seashellCount} seashells`
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.gold !== undefined
                    ) {
                        params.npc.scene.gold += goldReward;
                        console.log(
                            `Added ${goldReward} gold reward for ${seashellCount} seashells`
                        );
                    }

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            `Quest Complete: Treasure From Sea (Reward: ${goldReward} gold)`
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            `Quest Complete: Treasure From Sea (Reward: ${goldReward} gold)`
                        );
                    }
                }
                break;

            // --- Quest #008: Yam, Yam ---
            case "npc:lilyRecipeQuest":
                if (
                    !this.isQuestActive("008") &&
                    !this.isQuestCompleted("008") &&
                    this.isQuestCompleted("002")
                ) {
                    console.log("Activating Yam, Yam quest");
                    this.activateQuest("008");

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "New Quest: Yam, Yam - Learn to cook with carrots"
                        );
                    } else if (
                        params.npc &&
                        params.npc.scene &&
                        params.npc.scene.alertPrefab
                    ) {
                        params.npc.scene.alertPrefab.alert(
                            "New Quest: Yam, Yam - Learn to cook with carrots"
                        );
                    }

                    params.scene.receivedCarrotSoupRecipe = true;
                }
                break;

            case "cooking:recipeCooked":
                if (
                    this.isQuestActive("008") &&
                    params.recipeName &&
                    params.recipeName.toLowerCase().includes("carrot soup")
                ) {
                    console.log("Completing subtask 008-1: Cook Carrot Soup");
                    this.updateSubtask("008", "008-1");

                    if (params.scene && params.scene.playerInventory) {
                        params.scene.playerInventory.addRecipe(
                            "Steamed Carrot"
                        );
                        console.log("Added Steamed Carrot recipe to inventory");
                    }

                    if (params.scene && params.scene.alertPrefab) {
                        params.scene.alertPrefab.alert(
                            "Quest Complete: Yam, Yam! Learned Steamed Carrot recipe"
                        );
                    }
                }
                break;

            // --- Quest #012: Every Day! ---
            case "harvest:carrotsGivenToJack":
                if (this.isQuestActive("012")) {
                    const carrotsGiven = params.carrotCount || 0;

                    if (!this.quests["012"].subtasks["012-1"].completed) {
                        if (!params.scene.carrotsGivenToJack) {
                            params.scene.carrotsGivenToJack = 0;
                        }

                        params.scene.carrotsGivenToJack += carrotsGiven;
                        console.log(
                            `Carrots given to Jack: ${params.scene.carrotsGivenToJack}/5`
                        );

                        if (params.scene && params.scene.alertPrefab) {
                            params.scene.alertPrefab.alert(
                                `Gave carrots to Jack (${params.scene.carrotsGivenToJack}/5)`
                            );
                        }

                        if (params.scene.carrotsGivenToJack >= 5) {
                            console.log(
                                "Completing subtask 012-1: Give 5 carrots to NPC Jack"
                            );
                            this.updateSubtask("012", "012-1");

                            if (params.scene && params.scene.playerInventory) {
                                params.scene.playerInventory.addItem(
                                    "CARROT_SEED",
                                    5
                                );
                                console.log(
                                    "Added 5 carrot seeds to inventory"
                                );
                            }

                            if (params.scene && params.scene.alertPrefab) {
                                params.scene.alertPrefab.alert(
                                    "Quest Complete: Every Day! Received 5 carrot seeds"
                                );
                            }

                            setTimeout(() => {
                                this.resetDailyQuest("012");
                            }, 5000);
                        }
                    }
                }
                break;
            case "npc:greetedByName":
                if (this.isQuestActive("003") && params.npcName) {
                    const npc = npcsToGreet.find(
                        (n) => n.name === params.npcName
                    );
                    if (npc) {
                        console.log(`NPC greeted by name: ${params.npcName}`);
                        if (params.scene && params.scene.markNPCGreeted) {
                            params.scene.markNPCGreeted(params.npcName);
                        }
                    }
                }
                break;

            default:
                console.log(`No specific handling for event: ${eventName}`);
                break;
        }
    }

    async tryStartFirstHarvestQuest() {
        try {
            // Check if quest is already completed first
            if (this.isQuestCompleted("001")) {
                console.log(
                    "The First Harvest quest is already completed, not starting again"
                );
                return;
            }

            // Check if quest is already active
            if (this.isQuestActive("001")) {
                console.log("The First Harvest quest is already active");
                return;
            }

            // Also check backend directly for safety
            const [activeResponse, completedResponse] = await Promise.all([
                fetch("http://localhost:3333/api/quests/active", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }),
                fetch("http://localhost:3333/api/quests/completed", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }),
            ]);

            // Check if already completed
            if (completedResponse.ok) {
                const completedData = await completedResponse.json();
                const completedQuests = completedData.data || [];
                const firstHarvestCompleted = completedQuests.find(
                    (quest) =>
                        quest.quest && quest.quest.name === "The First Harvest"
                );
                if (firstHarvestCompleted) {
                    console.log(
                        "The First Harvest quest is already completed in backend"
                    );
                    return;
                }
            }

            // Check if already active
            if (activeResponse.ok) {
                const activeData = await activeResponse.json();
                const activeQuests = activeData.data || [];
                const firstHarvestActive = activeQuests.find(
                    (quest) =>
                        quest.quest && quest.quest.name === "The First Harvest"
                );
                if (firstHarvestActive) {
                    console.log(
                        "The First Harvest quest is already active in backend"
                    );
                    return;
                }
            }

            // Get the actual quest ID dynamically
            const questsResponse = await fetch(
                "http://localhost:3333/api/quests",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            let firstHarvestQuestId = null;
            if (questsResponse.ok) {
                const questsData = await questsResponse.json();
                const firstHarvestQuest = questsData.data?.find(
                    (q) => q.name === "The First Harvest"
                );
                firstHarvestQuestId = firstHarvestQuest?.id;
            }

            if (!firstHarvestQuestId) {
                console.error("Could not find The First Harvest quest ID");
                return;
            }

            // Only start the quest if it's not active AND not completed
            // Start "The First Harvest" quest
            console.log("Starting The First Harvest quest via backend API...");
            console.log("Using quest ID:", firstHarvestQuestId);
            const startResponse = await fetch(
                `http://localhost:3333/api/quests/${firstHarvestQuestId}/start`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (startResponse.ok) {
                const startData = await startResponse.json();
                console.log(
                    "Successfully started The First Harvest quest:",
                    startData
                );

                // CRITICAL: Add quest to activeQuestIds so frontend knows it's active
                this.activeQuestIds.add(firstHarvestQuestId);
                console.log("Added quest to activeQuestIds. Active quests now:", this.activeQuestIds.size);

                // Also activate the quest in the frontend quest system
                this.activateQuest("001");

                // Sync inventory to show the tools given by backend
                setTimeout(() => {
                    this.syncInventoryFromBackend();
                }, 1000);
            } else {
                console.error("Failed to start quest:", startResponse.status);
            }
        } catch (error) {
            console.error(
                "Error checking/starting First Harvest quest:",
                error
            );
        }
    }

    async getFirstHarvestQuestId() {
        // Return cached ID immediately if available
        if (this._firstHarvestQuestId) {
            return this._firstHarvestQuestId;
        }

        // If already fetching, return the promise to avoid duplicate requests
        if (this._fetchingQuestId) {
            return this._fetchingQuestId;
        }

        // Start fetching and cache the promise
        this._fetchingQuestId = this._doFetchFirstHarvestQuestId();
        const result = await this._fetchingQuestId;

        // Clear the fetching promise
        this._fetchingQuestId = null;

        return result;
    }

    async _doFetchFirstHarvestQuestId() {
        try {
            console.log("🔍 Fetching First Harvest quest ID from backend...");
            const questsResponse = await fetch(
                "http://localhost:3333/api/quests",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (questsResponse.ok) {
                const questsData = await questsResponse.json();
                const firstHarvestQuest = questsData.data?.find(
                    (q) => q.name === "The First Harvest"
                );
                if (firstHarvestQuest) {
                    this._firstHarvestQuestId = firstHarvestQuest.id;
                    console.log(
                        "✅ Cached First Harvest quest ID:",
                        this._firstHarvestQuestId
                    );
                    return this._firstHarvestQuestId;
                }
            }
        } catch (error) {
            console.error("❌ Error fetching First Harvest quest ID:", error);
        }
        return null;
    }

    async updateBackendTaskProgress(questId, taskIndex, progressIncrement = 1) {
        try {
            console.log(
                `Updating backend task progress: Quest ${questId}, Task ${taskIndex}`
            );

            // Get userId from token
            const token = localStorage.getItem("accessToken");
            let userId = null;

            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    userId = payload.userId;
                } catch (error) {
                    console.error("Failed to decode JWT token:", error);
                    return;
                }
            }

            const requestData = {
                questId,
                taskIndex,
                progress: progressIncrement || 1,
            };

            console.log("🔄 Sending task update request:", requestData);

            const response = await fetch(
                "http://localhost:3333/api/quests/update-task",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(
                    "Successfully updated backend task progress:",
                    data
                );
            } else {
                const errorData = await response.text();
                console.error(
                    "Failed to update backend task progress:",
                    response.status,
                    errorData
                );
                console.error("Request data that failed:", requestData);

                // Debug: Check if quest is actually active in frontend
                console.error("🔍 DEBUG: Is quest active in frontend?", this.isQuestActive("001"));
                console.error("🔍 DEBUG: Frontend activeQuestIds:", Array.from(this.activeQuestIds || []));

                // If error is "Quest not found or not in progress", re-sync quest state
                if (errorData.includes("Quest not found or not in progress")) {
                    console.warn("🔄 Quest sync issue detected. Re-syncing quest progress...");
                    setTimeout(() => {
                        this.syncQuestProgress();
                    }, 1000);
                }
            }
        } catch (error) {
            console.error("Error updating backend task progress:", error);
        }
    }
}

const questSystem = new QuestSystem();
// Make quest system globally available for checkpoint restoration
window.questSystem = questSystem;

export default questSystem;

// Helper function to initialize with QueryClient
export function initializeQuestSystemWithQuery(queryClient) {
    questSystem.setQueryClient(queryClient);
    return questSystem;
}

// Helper function to initialize with auth
export function initializeQuestSystemWithAuth() {
    return questSystem.initializeWithAuth();
}

export function extendSceneWithQuests(scene) {
    if (typeof scene === "function") {
        const SceneClass = scene;
        const originalCreate = SceneClass.prototype.create;
        const originalUpdate = SceneClass.prototype.update;

        SceneClass.prototype.create = function () {
            if (originalCreate) {
                originalCreate.call(this);
            }

            setupQuestFunctionalityForScene(this);
            setupDirectNPCGreetingHooks(this);
        };

        SceneClass.prototype.update = function (time, delta) {
            if (originalUpdate) {
                originalUpdate.call(this, time, delta);
            }

            if (this.updateQuestUI) {
                this.updateQuestUI();
            }
        };

        SceneClass.prototype.setupQuestUI = function () {
            // Implementation as before...
        };

        SceneClass.prototype.updateQuestUI = function () {
            // Implementation as before...
        };

        SceneClass.prototype.showQuestNotification = function (message) {
            // Implementation as before...
        };

        SceneClass.prototype.triggerQuestEvent = function (
            eventName,
            params = {}
        ) {
            // Implementation as before...
        };

        return SceneClass;
    } else {
        const instance = scene;

        setupQuestFunctionalityForScene(instance);
        setupDirectNPCGreetingHooks(instance);
        instance.setupQuestUI = function () {
            // Implementation as before...
        };

        instance.updateQuestUI = function () {
            // Implementation as before...
        };

        instance.showQuestNotification = function (message) {
            console.log(`QUEST NOTIFICATION: ${message}`);

            if (this.alertPrefab && this.alertPrefab.alert) {
                this.alertPrefab.alert(message);
            }
        };

        instance.triggerQuestEvent = function (eventName, params = {}) {
            console.log(`Triggering quest event: ${eventName}`, params);
            params.scene = this;
            questSystem.handleEvent(eventName, params);
        };

        return instance;
    }
}

function setupQuestFunctionalityForScene(scene) {
    if (scene.setupQuestUI) {
        scene.setupQuestUI();
    }

    questSystem.registerScenes(scene);
    scene.questSystem = questSystem;
}

export function setupTownDetection(scene) {
    console.log("Setting up town detection for quest progress");

    const townZone = scene.add.zone(
        scene.townCenterX || 500,
        scene.townCenterY || 500,
        scene.townWidth || 600,
        scene.townHeight || 400
    );

    scene.physics.world.enable(townZone);
    townZone.body.setAllowGravity(false);
    townZone.body.moves = false;

    scene.physics.add.overlap(
        scene.playerPrefab,
        townZone,
        () => {
            if (!scene.playerEnteredTown) {
                scene.playerEnteredTown = true;

                if (scene.triggerQuestEvent) {
                    console.log("Player entered town - triggering quest event");
                    scene.triggerQuestEvent("player:enteredTown");
                } else {
                    console.warn("triggerQuestEvent not available on scene");
                }
            }
        },
        null,
        scene
    );

    return townZone;
}

export function setupNPCGreetingTracking(scene) {
    console.log("### SETTING UP IMPROVED NPC TRACKING SYSTEM ###");
    scene.greetedNPCs = new Set();
    console.log("Reset greetedNPCs to empty set");

    const npcsToGreet = ["Lydia", "Victoria", "Rowan", "Lily"];

    scene.createGreetingCounter = function () {
        console.log("Creating greeting counter UI");

        if (this.greetingCounterBg) {
            this.greetingCounterBg.destroy();
            this.greetingCounterTitle?.destroy();
            this.greetingCounterProgress?.destroy();
            if (this.npcTextObjects) {
                Object.values(this.npcTextObjects).forEach((text) =>
                    text.destroy()
                );
            }
        }

        this.greetingCounterBg = this.add
            .rectangle(10, 10, 200, 130, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(100);

        this.greetingCounterTitle = this.add
            .text(20, 15, "Quest #003: Good Invitation", {
                fontFamily: "malio",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#ffffff",
            })
            .setScrollFactor(0)
            .setDepth(101);

        this.greetingCounterProgress = this.add
            .text(20, 35, `Progress: 0/${npcsToGreet.length} NPCs`, {
                fontFamily: "malio",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setScrollFactor(0)
            .setDepth(101);

        this.npcTextObjects = {};
        npcsToGreet.forEach((npc, index) => {
            this.npcTextObjects[npc] = this.add
                .text(30, 55 + index * 15, `□ ${npc}`, {
                    fontFamily: "malio",
                    fontSize: "12px",
                    color: "#aaaaaa",
                })
                .setScrollFactor(0)
                .setDepth(101);
        });

        this.updateGreetingCounterVisibility();

        return this.greetingCounterBg;
    };

    scene.updateGreetingCounterVisibility = function () {
        const questSystem = this.questSystem || window.questSystem;
        if (!questSystem) return;

        const isQuestActive = questSystem.isQuestActive("003");
        const isQuestCompleted = questSystem.isQuestCompleted("003");

        const shouldShow = isQuestActive && !isQuestCompleted;

        console.log(`Counter visibility: ${shouldShow ? "visible" : "hidden"}`);
        console.log(
            `Quest #003 active: ${isQuestActive}, completed: ${isQuestCompleted}`
        );

        if (this.greetingCounterBg) {
            this.greetingCounterBg.setVisible(shouldShow);
        }

        if (this.greetingCounterTitle) {
            this.greetingCounterTitle.setVisible(shouldShow);
        }

        if (this.greetingCounterProgress) {
            this.greetingCounterProgress.setVisible(shouldShow);
        }

        if (this.npcTextObjects) {
            Object.values(this.npcTextObjects).forEach((text) => {
                text.setVisible(shouldShow);
            });
        }
    };
    scene.updateGreetingCounter = function () {
        if (!this.greetingCounterProgress) return;

        if (!this.greetedNPCs) {
            this.greetedNPCs = new Set();
        }

        const greetedCount = this.greetedNPCs.size;

        console.log(
            `Currently greeted NPCs (${greetedCount}):`,
            Array.from(this.greetedNPCs)
        );

        this.greetingCounterProgress.setText(
            `Progress: ${greetedCount}/${npcsToGreet.length} NPCs`
        );

        npcsToGreet.forEach((npc) => {
            if (this.npcTextObjects[npc]) {
                if (this.greetedNPCs.has(npc)) {
                    this.npcTextObjects[npc].setText(`✓ ${npc}`);
                    this.npcTextObjects[npc].setColor("#00ff00");
                } else {
                    this.npcTextObjects[npc].setText(`□ ${npc}`);
                    this.npcTextObjects[npc].setColor("#aaaaaa");
                }
            }
        });

        if (greetedCount === npcsToGreet.length && this.greetingCounterTitle) {
            this.greetingCounterTitle.setColor("#00ff00");
        }
    };

    scene.checkAllNPCsGreeted = function () {
        console.log("=== CHECKING IF ALL NPCS GREETED ===");
        console.log("Required NPCs:", npcsToGreet);
        console.log(
            "Currently greeted NPCs:",
            Array.from(this.greetedNPCs || [])
        );

        if (!this.greetedNPCs) {
            console.log("Creating missing greetedNPCs Set");
            this.greetedNPCs = new Set();
            return false;
        }

        const allGreeted = npcsToGreet.every((npc) =>
            this.greetedNPCs.has(npc)
        );

        if (allGreeted) {
            console.log("✓ ALL REQUIRED NPCS HAVE BEEN GREETED!");

            if (this.triggerQuestEvent) {
                this.triggerQuestEvent("npc:allGreeted");
                console.log("✓ Triggered 'npc:allGreeted' event");

                if (this.alertPrefab) {
                    this.alertPrefab.alert("Quest Completed: Good Invitation");
                }
            } else {
                console.warn(
                    "❌ No triggerQuestEvent function found on scene!"
                );
            }

            this.updateGreetingCounter();

            this.time.delayedCall(3000, () => {
                this.updateGreetingCounterVisibility();
            });
        }

        return allGreeted;
    };

    scene.markNPCGreeted = function (npcName) {
        console.log(`Attempting to mark NPC '${npcName}' as greeted`);

        if (!npcsToGreet.includes(npcName)) {
            console.warn(
                `Attempted to mark NPC '${npcName}' as greeted - not in required list.`
            );
            return false;
        }

        if (!this.greetedNPCs) {
            this.greetedNPCs = new Set();
            console.log("Created missing greetedNPCs Set");
        }

        this.greetedNPCs.add(npcName);
        console.log(`✓ Marked NPC '${npcName}' as greeted`);
        console.log(
            `Current progress: ${this.greetedNPCs.size}/${npcsToGreet.length}`
        );

        if (this.alertPrefab) {
            this.alertPrefab.alert(
                `Greeted ${npcName} (${this.greetedNPCs.size}/${npcsToGreet.length})`
            );
        }

        this.updateGreetingCounter();

        const allGreeted = this.checkAllNPCsGreeted();

        return allGreeted;
    };

    scene.createDebugButton = function () {
        const debugBtn = this.add
            .rectangle(
                this.game.config.width - 100,
                this.game.config.height - 50,
                150,
                40,
                0xff0000,
                0.7
            )
            .setScrollFactor(0)
            .setDepth(200)
            .setInteractive();

        const debugText = this.add
            .text(
                this.game.config.width - 100,
                this.game.config.height - 50,
                "Debug Quest #003",
                {
                    fontFamily: "Arial",
                    fontSize: "12px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(201)
            .setOrigin(0.5);

        debugBtn.on("pointerdown", () => {
            console.log("=== DEBUG QUEST #003 ===");
            console.log(
                "Currently greeted NPCs:",
                Array.from(this.greetedNPCs || [])
            );

            // Add a menu of options
            const menuBg = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2,
                    300,
                    250,
                    0x000000,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(300);

            const menuTitle = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 - 100,
                    "DEBUG QUEST #003",
                    {
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#ffffff",
                        fontWeight: "bold",
                    }
                )
                .setScrollFactor(0)
                .setDepth(301)
                .setOrigin(0.5);

            npcsToGreet.forEach((npc, index) => {
                const npcBtn = this.add
                    .rectangle(
                        this.game.config.width / 2,
                        this.game.config.height / 2 - 50 + index * 40,
                        200,
                        30,
                        0x444444,
                        0.9
                    )
                    .setScrollFactor(0)
                    .setDepth(301)
                    .setInteractive();

                const npcText = this.add
                    .text(
                        this.game.config.width / 2,
                        this.game.config.height / 2 - 50 + index * 40,
                        `Mark ${npc} as greeted`,
                        {
                            fontFamily: "Arial",
                            fontSize: "12px",
                            color: "#ffffff",
                        }
                    )
                    .setScrollFactor(0)
                    .setDepth(302)
                    .setOrigin(0.5);

                npcBtn.on("pointerdown", () => {
                    this.markNPCGreeted(npc);
                    npcBtn.fillColor = 0x00aa00;
                });
            });

            const forceBtn = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 50,
                    200,
                    30,
                    0x008800,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(301)
                .setInteractive();

            const forceText = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 50,
                    "Force Complete Quest",
                    {
                        fontFamily: "Arial",
                        fontSize: "12px",
                        color: "#ffffff",
                    }
                )
                .setScrollFactor(0)
                .setDepth(302)
                .setOrigin(0.5);

            forceBtn.on("pointerdown", () => {
                npcsToGreet.forEach((npc) => {
                    this.greetedNPCs.add(npc);
                });
                this.updateGreetingCounter();
                this.checkAllNPCsGreeted();
            });

            const closeBtn = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 100,
                    200,
                    30,
                    0xaa0000,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(301)
                .setInteractive();

            const closeText = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 + 100,
                    "Close Debug Menu",
                    {
                        fontFamily: "Arial",
                        fontSize: "12px",
                        color: "#ffffff",
                    }
                )
                .setScrollFactor(0)
                .setDepth(302)
                .setOrigin(0.5);

            closeBtn.on("pointerdown", () => {
                this.children.list
                    .filter((child) => child.depth >= 300 && child.depth <= 302)
                    .forEach((child) => child.destroy());
            });
        });

        return debugBtn;
    };

    const initGreetingSystem = function () {
        const questSystem = scene.questSystem || window.questSystem;

        if (questSystem && questSystem.isQuestActive("003")) {
            console.log("Quest #003 is active, initializing greeting counter");
            scene.createGreetingCounter();
            scene.updateGreetingCounter();
        } else {
            console.log("Quest #003 is not active yet");
        }

        scene.createDebugButton();
    };

    scene.events.on("quest:activated", ({ questId }) => {
        if (questId === "003") {
            console.log("Quest #003 activated!");
            scene.createGreetingCounter();
            scene.updateGreetingCounter();
        }
    });

    scene.events.on("quest:completed", ({ questId }) => {
        if (questId === "003") {
            console.log("Quest #003 completed!");
            scene.updateGreetingCounterVisibility();
        }
    });

    initGreetingSystem();

    return {
        markNPCGreeted: (npcName) => scene.markNPCGreeted(npcName),
        checkAllNPCsGreeted: () => scene.checkAllNPCsGreeted(),
        getGreetedNPCs: () => Array.from(scene.greetedNPCs || []),
        getRequiredNPCs: () => [...npcsToGreet],
    };
}

export function setupDirectNPCGreetingHooks(scene) {
    console.log("Setting up direct NPC greeting hooks");

    const hookNPCGreeting = (npcObject, npcName) => {
        if (!npcObject) return;

        const events = npcObject.listeners("pointerdown");

        if (events && events.length > 0) {
            console.log(
                `NPC ${npcName} already has pointerdown events, adding greeting hook`
            );

            const originalHandler = events[0];

            npcObject.off("pointerdown", originalHandler);

            npcObject.on("pointerdown", function (pointer) {
                if (scene.markNPCGreeted) {
                    console.log(`Direct hook: Marking ${npcName} as greeted`);
                    scene.markNPCGreeted(npcName);
                }

                originalHandler.call(this, pointer);
            });
        } else {
            console.log(
                `NPC ${npcName} has no pointerdown events, adding simple greeting`
            );

            npcObject.on("pointerdown", function () {
                if (scene.markNPCGreeted) {
                    console.log(`Simple hook: Marking ${npcName} as greeted`);
                    scene.markNPCGreeted(npcName);
                }
            });
        }
    };
    if (scene.children && scene.children.list) {
        const npcs = {
            Victoria: ["NPCVictoria", "npcVictoria", "victoriaContainer"],
            Lily: ["NPCLily", "npcLily", "foodMerchant", "lilyContainer"],
            Rowan: [
                "NPCRowan",
                "npcRowan",
                "blackSmith",
                "blackSmithContainer",
            ],
            Lydia: ["NPCLydia", "npcLydia", "merchant", "merchantContainer"],
        };

        scene.children.list.forEach((child) => {
            Object.entries(npcs).forEach(([npcName, possibleKeys]) => {
                if (
                    possibleKeys.some(
                        (key) =>
                            child.name === key ||
                            (child.texture && child.texture.key === key) ||
                            (typeof child.name === "string" &&
                                child.name.includes(npcName))
                    )
                ) {
                    console.log(
                        `Found ${npcName} NPC, setting up direct greeting hook`
                    );

                    if (child.type === "Container") {
                        if (child.npc && child.npc.setInteractive) {
                            hookNPCGreeting(child.npc, npcName);
                        } else if (child.list && child.list.length > 0) {
                            const interactiveChild = child.list.find(
                                (c) => c.setInteractive
                            );
                            if (interactiveChild) {
                                hookNPCGreeting(interactiveChild, npcName);
                            }
                        }
                    } else if (child.setInteractive) {
                        hookNPCGreeting(child, npcName);
                    }
                }
            });
        });
    }

    return true;
}

export function extendHarvestPrefab(HarvestPrefab) {
    const originalChangeState = HarvestPrefab.prototype.changeState;

    HarvestPrefab.prototype.changeState = function () {
        const prevState = this.state;

        originalChangeState.call(this);

        if (prevState !== this.state) {
            switch (this.state) {
                case "GROUND":
                    if (prevState === "ROCK") {
                        this.scene.triggerQuestEvent("harvest:rockRemoved", {
                            harvest: this,
                        });
                    }
                    break;
                case "SOIL":
                    if (prevState === "GROUND") {
                        this.scene.triggerQuestEvent("harvest:groundHoed", {
                            harvest: this,
                        });
                    }
                    break;
                case "PLANTED":
                    this.scene.triggerQuestEvent("harvest:seedPlanted", {
                        seed: this.seed,
                        harvest: this,
                    });
                    break;
                case "WATERED":
                    this.scene.triggerQuestEvent("harvest:cropWatered", {
                        seed: this.seed,
                        harvest: this,
                    });
                    break;
            }
        }
    };

    const originalPrefabCreateCycle = HarvestPrefab.prototype.prefabCreateCycle;

    HarvestPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        const originalPointerDown = this.listeners("pointerdown")[0];

        if (originalPointerDown) {
            this.off("pointerdown", originalPointerDown);

            this.on(
                "pointerdown",
                function (_pointer) {
                    if (this.isReadyForHarvest) {
                        const cropType = this.seed;

                        originalPointerDown.call(this, _pointer);

                        if (this.scene.triggerQuestEvent) {
                            this.scene.triggerQuestEvent(
                                "harvest:cropHarvested",
                                { crop: cropType, harvest: this }
                            );
                        }
                        return;
                    }

                    originalPointerDown.call(this, _pointer);
                },
                this
            );
        }
    };

    return HarvestPrefab;
}

export function extendJackNpc(OldManJackNpcPrefab) {
    const originalPrefabCreateCycle =
        OldManJackNpcPrefab.prototype.prefabCreateCycle;

    OldManJackNpcPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        if (this.npc) {
            // Assign unique ID from loaded NPCs
            const jackNpc = npcsToGreet.find(
                (npc) => npc.name === "Old Man Jack"
            );
            this.npc.id = jackNpc
                ? jackNpc.id
                : "39a66baf-120b-4f1d-894e-f8e6725cb24d";

            const originalPointerDown = this.npc.listeners("pointerdown")[0];
            if (originalPointerDown) {
                this.npc.off("pointerdown", originalPointerDown);

                this.npc.on(
                    "pointerdown",
                    async function (_pointer) {
                        if (this.scene.triggerQuestEvent) {
                            this.scene.triggerQuestEvent(
                                "npc:jackInteraction",
                                { npc: this.npc }
                            );
                        }

                        if (this.scene.markNPCGreeted) {
                            this.scene.markNPCGreeted(this.npc.id);
                        }

                        await originalPointerDown.call(this, _pointer);
                    },
                    this
                );
            }
        }
    };

    return OldManJackNpcPrefab;
}
export function setupBeachDetection(scene) {
    console.log("Setting up beach detection for quest progress");

    const beachZone = scene.add.zone(
        scene.beachCenterX || 800,
        scene.beachCenterY || 700,
        scene.beachWidth || 500,
        scene.beachHeight || 300
    );

    scene.physics.world.enable(beachZone);
    beachZone.body.setAllowGravity(false);
    beachZone.body.moves = false;

    scene.physics.add.overlap(
        scene.playerPrefab,
        beachZone,
        () => {
            if (!scene.playerEnteredBeach) {
                scene.playerEnteredBeach = true;

                if (scene.triggerQuestEvent) {
                    console.log(
                        "Player entered beach - triggering quest event"
                    );
                    scene.triggerQuestEvent("player:enteredBeach");
                } else {
                    console.warn("triggerQuestEvent not available on scene");
                }
            }
        },
        null,
        scene
    );

    return beachZone;
}

export function setupSeashellCollectibles(scene) {
    console.log("Setting up seashell collectibles for Quest #007");

    scene.seashells = scene.physics.add.group();

    const seashellPositions = [
        { x: 750, y: 650 },
        { x: 820, y: 700 },
        { x: 880, y: 710 },
        { x: 800, y: 750 },
        { x: 750, y: 780 },
        { x: 900, y: 650 },
        { x: 950, y: 700 },
    ];

    const shuffledPositions = seashellPositions.sort(() => Math.random() - 0.5);
    const selectedPositions = shuffledPositions.slice(0, 5); // Take 5 random positions

    selectedPositions.forEach((pos) => {
        const seashell = scene.seashells.create(pos.x, pos.y, "seashell");
        seashell.setInteractive();

        seashell.on("pointerdown", function () {
            console.log("Seashell collected");

            this.setTint(0xffff00);
            scene.tweens.add({
                targets: this,
                y: this.y - 50,
                alpha: 0,
                duration: 800,
                onComplete: () => {
                    this.destroy();

                    scene.triggerQuestEvent("item:seashellCollected", {
                        x: pos.x,
                        y: pos.y,
                    });
                },
            });
        });
    });

    if (scene.questSystem) {
        if (
            !scene.questSystem.isQuestActive("007") ||
            !scene.questSystem.quests["007"].subtasks["007-2"].completed
        ) {
            scene.seashells.setVisible(false);
        }

        scene.events.on("quest:updated", ({ questId, subtaskId }) => {
            if (questId === "007" && subtaskId === "007-2") {
                scene.seashells.setVisible(true);
            }
        });
    }

    return scene.seashells;
}

export function extendLydiaNpc(LydiaNpcPrefab) {
    const originalPrefabCreateCycle =
        LydiaNpcPrefab.prototype.prefabCreateCycle;

    LydiaNpcPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        if (this.npc) {
            // Assign unique ID from loaded NPCs
            const lydiaServerNpc = npcsToGreet.find(
                (npc) => npc.name === "Lady Lydia"
            );
            this.npc.id = lydiaServerNpc
                ? lydiaServerNpc.id
                : "09a59f2a-aac8-4336-9eff-50711546b7a0";

            const originalPointerDown = this.npc.listeners("pointerdown")[0];
            if (originalPointerDown) {
                this.npc.off("pointerdown", originalPointerDown);

                this.npc.on(
                    "pointerdown",
                    async function (_pointer) {
                        const questSystem =
                            this.scene.questSystem || window.questSystem;

                        if (this.scene.triggerQuestEvent) {
                            this.scene.triggerQuestEvent(
                                "npc:lydiaInteraction",
                                { npc: this.npc }
                            );
                        }

                        if (
                            questSystem &&
                            questSystem.isQuestCompleted("002")
                        ) {
                            if (
                                !questSystem.isQuestActive("007") &&
                                !questSystem.isQuestCompleted("007")
                            ) {
                                this.scene.triggerQuestEvent(
                                    "npc:lydiaSeashellQuest",
                                    { npc: this.npc }
                                );
                            } else if (
                                questSystem.isQuestActive("007") &&
                                questSystem.quests["007"].subtasks["007-3"]
                                    .completed &&
                                !questSystem.quests["007"].subtasks["007-4"]
                                    .completed
                            ) {
                                this.scene.triggerQuestEvent(
                                    "npc:lydiaSeashellDelivery",
                                    { npc: this.npc }
                                );
                            }
                        }

                        if (this.scene.markNPCGreeted) {
                            this.scene.markNPCGreeted(this.npc.id);
                        }

                        await originalPointerDown.call(this, _pointer);
                    },
                    this
                );
            }
        }
    };

    return LydiaNpcPrefab;
}

export function extendLilyNpc(LilyNpcPrefab) {
    const originalPrefabCreateCycle = LilyNpcPrefab.prototype.prefabCreateCycle;

    LilyNpcPrefab.prototype.prefabCreateCycle = function () {
        originalPrefabCreateCycle.call(this);

        if (this.npc) {
            // Assign unique ID from loaded NPCs
            const merchantNpc = npcsToGreet.find(
                (npc) => npc.name === "Merchant Maya"
            );
            this.npc.id = merchantNpc
                ? merchantNpc.id
                : "933dd35a-748e-4a86-8c44-8d6d95fba093";

            const originalPointerDown = this.npc.listeners("pointerdown")[0];
            if (originalPointerDown) {
                this.npc.off("pointerdown", originalPointerDown);

                this.npc.on(
                    "pointerdown",
                    async function (_pointer) {
                        const questSystem =
                            this.scene.questSystem || window.questSystem;

                        if (
                            questSystem &&
                            questSystem.isQuestCompleted("002")
                        ) {
                            if (
                                !questSystem.isQuestActive("008") &&
                                !questSystem.isQuestCompleted("008")
                            ) {
                                this.scene.triggerQuestEvent(
                                    "npc:lilyRecipeQuest",
                                    { npc: this.npc }
                                );
                            }
                        }

                        if (this.scene.markNPCGreeted) {
                            this.scene.markNPCGreeted(this.npc.id);
                        }

                        await originalPointerDown.call(this, _pointer);
                    },
                    this
                );
            }
        }
    };

    return LilyNpcPrefab;
}

export function setupCookingSystem(scene) {
    console.log("Setting up cooking system for Quest #008");

    scene.cookRecipe = function (recipeName, ingredients) {
        console.log(`Cooking ${recipeName} with ingredients:`, ingredients);

        if (!recipeName) return false;

        let success = false;

        if (recipeName.toLowerCase() === "carrot soup") {
            const hasCarrots = ingredients.some(
                (i) => i.toLowerCase().includes("carrot") || i === "CARROT"
            );

            if (hasCarrots) {
                success = true;
                console.log("Successfully cooked Carrot Soup!");

                this.triggerQuestEvent("cooking:recipeCooked", {
                    recipeName: "Carrot Soup",
                    success: true,
                });

                if (this.alertPrefab) {
                    this.alertPrefab.alert("Cooked: Carrot Soup");
                }
            }
        }

        return success;
    };

    scene.showCookingUI = function () {
        console.log("Showing cooking UI");

        // Create simple cooking UI
        const uiBg = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2,
                400,
                300,
                0x000000,
                0.8
            )
            .setScrollFactor(0)
            .setDepth(900);

        const uiTitle = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 - 120,
                "COOKING",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffff",
                    fontWeight: "bold",
                }
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setOrigin(0.5);

        const recipeBtn = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 - 50,
                300,
                40,
                0x444444,
                0.9
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setInteractive();

        const recipeText = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 - 50,
                "Cook Carrot Soup",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(902)
            .setOrigin(0.5);

        if (!this.receivedCarrotSoupRecipe) {
            recipeBtn.setFillStyle(0x222222);
            recipeText.setColor("#888888");
            recipeText.setText("Cook Carrot Soup (Recipe Needed)");
        }

        recipeBtn.on("pointerdown", () => {
            if (this.receivedCarrotSoupRecipe) {
                this.cookRecipe("Carrot Soup", ["CARROT"]);
                recipeBtn.setFillStyle(0x008800);
            }
        });

        const closeBtn = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                200,
                40,
                0xaa0000,
                0.9
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setInteractive();

        const closeText = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                "Close",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(902)
            .setOrigin(0.5);

        closeBtn.on("pointerdown", () => {
            // Remove all UI elements
            uiBg.destroy();
            uiTitle.destroy();
            recipeBtn.destroy();
            recipeText.destroy();
            closeBtn.destroy();
            closeText.destroy();
        });
    };
    const cookingBtn = scene.add
        .rectangle(scene.game.config.width - 100, 50, 150, 40, 0x8b4513, 0.9)
        .setScrollFactor(0)
        .setDepth(100)
        .setInteractive();

    const cookingText = scene.add
        .text(scene.game.config.width - 100, 50, "Cooking", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#ffffff",
        })
        .setScrollFactor(0)
        .setDepth(101)
        .setOrigin(0.5);

    cookingBtn.on("pointerdown", () => {
        scene.showCookingUI();
    });

    return {
        cookRecipe: scene.cookRecipe.bind(scene),
        showCookingUI: scene.showCookingUI.bind(scene),
    };
}

export function extendJackNpcForCarrots(jackNpc) {
    if (jackNpc.handleCarrotGift) {
        return jackNpc;
    }

    jackNpc.handleCarrotGift = function (carrotCount) {
        console.log(`Jack received ${carrotCount} carrots!`);

        if (this.scene.triggerQuestEvent) {
            this.scene.triggerQuestEvent("harvest:carrotsGivenToJack", {
                npc: this,
                carrotCount: carrotCount,
            });
        }

        return true;
    };

    if (typeof jackNpc === "function") {
        const OldManJackNpcPrefab = jackNpc;
        const originalPrefabCreateCycle =
            OldManJackNpcPrefab.prototype.prefabCreateCycle;

        OldManJackNpcPrefab.prototype.prefabCreateCycle = function () {
            originalPrefabCreateCycle.call(this);

            if (this.npc) {
                this.npc.handleCarrotGift = this.handleCarrotGift.bind(this);
            }
        };

        return OldManJackNpcPrefab;
    }

    return jackNpc;
}
export function setupItemGiftSystem(scene) {
    console.log("Setting up item gift system for Quest #012");

    scene.showGiftDialog = function (npc) {
        console.log(`Showing gift dialog for ${npc.name || "NPC"}`);
        const uiBg = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2,
                400,
                300,
                0x000000,
                0.8
            )
            .setScrollFactor(0)
            .setDepth(900);

        const uiTitle = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 - 120,
                `Give items to ${npc.name || "NPC"}`,
                {
                    fontFamily: "Arial",
                    fontSize: "20px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setOrigin(0.5);

        const items = [
            { name: "Carrot", count: 5, id: "CARROT" },
            { name: "Apple", count: 3, id: "APPLE" },
            { name: "Fish", count: 2, id: "FISH" },
        ];

        items.forEach((item, index) => {
            const itemBtn = this.add
                .rectangle(
                    this.game.config.width / 2,
                    this.game.config.height / 2 - 70 + index * 50,
                    300,
                    40,
                    0x444444,
                    0.9
                )
                .setScrollFactor(0)
                .setDepth(901)
                .setInteractive();

            const itemText = this.add
                .text(
                    this.game.config.width / 2,
                    this.game.config.height / 2 - 70 + index * 50,
                    `${item.name} (${item.count})`,
                    {
                        fontFamily: "Arial",
                        fontSize: "16px",
                        color: "#ffffff",
                    }
                )
                .setScrollFactor(0)
                .setDepth(902)
                .setOrigin(0.5);

            itemBtn.on("pointerdown", () => {
                console.log(`Giving ${item.name} to NPC`);

                if (item.id === "CARROT" && npc.handleCarrotGift) {
                    npc.handleCarrotGift(item.count);
                    itemBtn.setFillStyle(0x008800);

                    items[index].count = 0;
                    itemText.setText(`${item.name} (${items[index].count})`);
                }
            });
        });

        // Close button
        const closeBtn = this.add
            .rectangle(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                200,
                40,
                0xaa0000,
                0.9
            )
            .setScrollFactor(0)
            .setDepth(901)
            .setInteractive();

        const closeText = this.add
            .text(
                this.game.config.width / 2,
                this.game.config.height / 2 + 100,
                "Close",
                {
                    fontFamily: "Arial",
                    fontSize: "16px",
                    color: "#ffffff",
                }
            )
            .setScrollFactor(0)
            .setDepth(902)
            .setOrigin(0.5);

        closeBtn.on("pointerdown", () => {
            this.children.list
                .filter((child) => child.depth >= 900 && child.depth <= 902)
                .forEach((child) => child.destroy());
        });
    };

    return scene.showGiftDialog.bind(scene);
}

