// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import {
    MERCHANT_TYPES,
    getMerchantInventory,
} from "../../../components/merchant-manager";
import { startQuest, updateQuestTask } from "../../../lib/query-helper";
/* END-USER-IMPORTS */

export default class MerchantPrefab extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 32, y ?? 32);

        const npc = scene.add.sprite(32, 32, "NPCMerchant", 0);
        npc.scaleX = 1.5;
        npc.scaleY = 1.5;
        scene.physics.add.existing(npc, false);
        npc.body.allowGravity = false;
        npc.body.setSize(32, 32, false);
        this.add(npc);

        const questMark = scene.add.sprite(30, -20, "GameNpcs1", 6);
        questMark.setScale(1.5);
        questMark.play("BeforeQuest");
        this.add(questMark);

        // Add name box for Lydia
        const nameBox = scene.add.sprite(0, 33, "MerchantLydiaName");
        nameBox.setVisible(false);
        nameBox.setOrigin(0.5, 0.5);
        nameBox.setScale(0.4);
        this.add(nameBox);

        this.npc = npc;
        this.questMark = questMark;
        this.nameBox = nameBox;
        scene.events.on("create", this.prefabCreateCycle, this);
        npc.setInteractive({ useHandCursor: true });
        this.merchantType = MERCHANT_TYPES.FARMER;
        this.hasCompletedSellQuest = false;
        this.currentDialogueIndex = 0;
        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Sprite} */
    sprite_1;
    /** @type {Phaser.GameObjects.Sprite} */
    questMark;
    /** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
    npc;
    /** @type {Phaser.GameObjects.GameObject} */
    player;
    /** @type {Phaser.GameObjects.GameObject} */
    msgPrefab;
    /** @type {string} */
    merchantType;
    /** @type {boolean} */
    hasCompletedSellQuest;

    /* START-USER-CODE */

    greetings = [
        "Welcome to my shop! How can I help you today?",
        "Hello there! Looking for farm supplies?",
        "Good day! Need seeds or tools for your farm?",
    ];

    prefabCreateCycle() {
        console.log("MerchantPrefab create cycle started");

        this.npc.on("pointerover", function (_pointer) {
            this.preFX.addGlow(16777215, 4, 0, false);
        });

        this.npc.on(
            "pointerdown",
            async function (_pointer) {
                console.log("Lydia NPC clicked");

                let distance = this.getDistance(this.player, this);

                if (distance > 100) {
                    this.scene.alertPrefab.alert("Too Far");
                    return;
                }

                if (this.scene.triggerQuestEvent) {
                    this.scene.triggerQuestEvent("npc:lydiaInteraction", {
                        npc: this,
                    });
                }

                if (this.scene.markNPCGreeted) {
                    this.scene.markNPCGreeted("Lady Lydia");
                }

                // Batch all quest status checks into one API call
                const { getActiveQuests, getCompletedQuests } = await import("../../../lib/query-helper");

                let tasteOfGoldActive = false;
                let makingFriendsActive = false;
                let tasteOfGoldCompleted = false;
                let makingFriendsCompleted = false;

                try {
                    const [activeQuestsResponse, completedQuestsResponse] = await Promise.all([
                        getActiveQuests(),
                        getCompletedQuests()
                    ]);

                    if (activeQuestsResponse?.success && activeQuestsResponse?.data) {
                        tasteOfGoldActive = activeQuestsResponse.data.some(q => q.quest.name === "Taste of Gold");
                        makingFriendsActive = activeQuestsResponse.data.some(q => q.quest.name === "Making Friends");
                    }

                    if (completedQuestsResponse?.success && completedQuestsResponse?.data) {
                        tasteOfGoldCompleted = completedQuestsResponse.data.some(q => q.quest.name === "Taste of Gold");
                        makingFriendsCompleted = completedQuestsResponse.data.some(q => q.quest.name === "Making Friends");
                    }
                } catch (error) {
                    console.error("Error fetching quest status:", error);
                }

                // Update quest progress if active
                if (tasteOfGoldActive) {
                    console.log("🥇 Taste of Gold quest is active, updating progress...");
                    this.updateTasteOfGoldProgress();
                }

                if (makingFriendsActive) {
                    console.log("🤝 Making Friends quest is active, updating progress...");
                    this.updateMakingFriendsProgress();
                }

                const currentGreeting = this.greetings[this.currentDialogueIndex];
                this.currentDialogueIndex = (this.currentDialogueIndex + 1) % this.greetings.length;

                let hasIronBars = false;
                let ironItemId = null;

                if (
                    this.scene.newItemHudPrefab &&
                    this.scene.newItemHudPrefab.checkItem
                ) {
                    if (this.scene.newItemHudPrefab.checkItem("IronIngot")) {
                        hasIronBars = true;
                        ironItemId = "IronIngot";
                    }
                }

                let dialogueLines;

                if (tasteOfGoldCompleted && !makingFriendsActive && !makingFriendsCompleted) {
                    // Check if we've already shown this dialogue
                    if (!this.hasShownMakingFriendsDialogue) {
                        this.hasShownMakingFriendsDialogue = true;

                        // Auto-start Making Friends quest immediately
                        this.startMakingFriendsQuest();

                        // Show dialogue
                        dialogueLines = [
                            {
                                msg: "Thank you for selling those iron ingots! You've proven yourself to be quite capable.",
                            },
                            {
                                msg: "Now that you're familiar with Harvestyn's trading system, I have another opportunity for you.",
                            },
                            {
                                msg: "To truly become part of our community, you should meet all the townspeople.",
                            },
                            {
                                msg: "I've started a new quest for you - make friends with everyone in Harvestyn!",
                            },
                            {
                                msg: "Visit each NPC in town and introduce yourself. They all have interesting stories to share!",
                            }
                        ];
                    } else {
                        // After quest has been given, show regular dialogue
                        dialogueLines = [
                            {
                                msg: currentGreeting,
                                options: [
                                    {
                                        text: "I want to buy seeds and supplies",
                                        onSelect: () => {
                                            console.log(
                                                "Emitting show-shop-buy-modal event"
                                            );
                                            if (this.scene.reactEvent) {
                                                this.scene.reactEvent.emit(
                                                    "show-shop-buy-modal",
                                                    this
                                                );
                                            }
                                        },
                                        nextDialogue: 1,
                                    },
                                    {
                                        text: "I want to sell items",
                                        onSelect: () => {
                                            console.log(
                                                "Emitting show-shop-sell-modal event"
                                            );
                                            if (this.scene.reactEvent) {
                                                this.scene.reactEvent.emit(
                                                    "show-shop-sell-modal",
                                                    this
                                                );
                                            }
                                        },
                                        nextDialogue: 1,
                                    },
                                    {
                                        text: "Just browsing",
                                        nextDialogue: [
                                            {
                                                msg: "Feel free to look around. Let me know if you need anything.",
                                            },
                                        ],
                                    },
                                ],
                            },
                            { msg: "Thank you for your business! Come back soon!" },
                        ];
                    }
                } else if (hasIronBars && tasteOfGoldActive) {
                    dialogueLines = [
                        {
                            msg: currentGreeting,
                            options: [
                                {
                                    text: "I want to buy seeds and supplies",
                                    onSelect: () => {
                                        console.log(
                                            "Emitting show-shop-buy-modal event"
                                        );
                                        if (this.scene.reactEvent) {
                                            this.scene.reactEvent.emit(
                                                "show-shop-buy-modal",
                                                this
                                            );
                                        }
                                    },
                                    nextDialogue: 1,
                                },
                                {
                                    text: "I need to sell some items",
                                    onSelect: () => {
                                        if (this.scene.reactEvent) {
                                            this.scene.reactEvent.emit(
                                                "show-shop-sell-modal",
                                                this
                                            );
                                        }
                                    },
                                    nextDialogue: 1,
                                },
                                {
                                    text: "Just browsing",
                                    nextDialogue: [
                                        {
                                            msg: "Feel free to look around. Let me know if you need anything.",
                                        },
                                    ],
                                },
                            ],
                        },
                        { msg: "Thank you for your business! Come back soon!" },
                    ];
                } else {
                    dialogueLines = [
                        {
                            msg: currentGreeting,
                            options: [
                                {
                                    text: "I want to buy seeds and supplies",
                                    onSelect: () => {
                                        console.log(
                                            "Emitting show-shop-buy-modal event"
                                        );
                                        if (this.scene.reactEvent) {
                                            this.scene.reactEvent.emit(
                                                "show-shop-buy-modal",
                                                this
                                            );
                                        }
                                    },
                                    nextDialogue: 1,
                                },
                                {
                                    text: "I want to sell items",
                                    onSelect: () => {
                                        console.log(
                                            "Emitting show-shop-sell-modal event"
                                        );
                                        if (this.scene.reactEvent) {
                                            this.scene.reactEvent.emit(
                                                "show-shop-sell-modal",
                                                this
                                            );
                                        }
                                    },
                                    nextDialogue: 1,
                                },
                                {
                                    text: "Just browsing",
                                    nextDialogue: [
                                        {
                                            msg: "Feel free to look around. Let me know if you need anything.",
                                        },
                                    ],
                                },
                            ],
                        },
                        { msg: "Thank you for your business! Come back soon!" },
                    ];
                }

                this.msgPrefab.conversation(dialogueLines);
            },
            this
        );

        this.npc.on("pointerout", function (_pointer) {
            this.preFX.clear();
        });
    }

    getDistance(texture1, texture2) {
        if (!texture1 || !texture2) return Infinity;

        return Phaser.Math.Distance.Between(
            texture1.x,
            texture1.y,
            texture2.x,
            texture2.y
        );
    }

    getInventory() {
        return getMerchantInventory(this.merchantType);
    }

    async isQuestActiveByName(questName) {
        try {
            const { getActiveQuests } = await import("../../../lib/query-helper");
            const response = await getActiveQuests();

            if (!response?.success || !response?.data) return false;

            return response.data.some(questEntry =>
                questEntry.quest.name === questName
            );
        } catch (error) {
            console.error("Error checking active quest by name:", error);
            return false;
        }
    }

    async isQuestCompletedByName(questName) {
        try {
            const { getCompletedQuests } = await import("../../../lib/query-helper");
            const response = await getCompletedQuests();

            if (!response?.success || !response?.data) return false;

            return response.data.some(questEntry =>
                questEntry.quest.name === questName
            );
        } catch (error) {
            console.error("Error checking completed quest by name:", error);
            return false;
        }
    }

    async startMakingFriendsQuest() {
        try {
            console.log("🎯 Starting 'Making Friends' quest through backend");

            // Import API helpers
            const { getAvailableQuests, updateQuestTask } = await import("../../../lib/query-helper");

            // Fetch available quests from backend API
            const availableQuestsResponse = await getAvailableQuests();

            if (!availableQuestsResponse?.success || !availableQuestsResponse?.data) {
                console.error("❌ No available quests data found");
                return;
            }

            const makingFriendsQuest = availableQuestsResponse.data.find(questEntry =>
                questEntry.quest.name === "Making Friends"
            );

            if (!makingFriendsQuest) {
                console.error("❌ 'Making Friends' quest not found in available quests");
                return;
            }

            console.log("✅ Found 'Making Friends' quest:", makingFriendsQuest.quest.id);

            // Start the quest using backend API
            await startQuest(makingFriendsQuest.quest.id);

            // Immediately update progress to 1 (Lydia herself counts as first NPC greeted)
            console.log("🎯 Setting initial progress to 1 (Lydia already greeted)");
            await updateQuestTask({
                questId: makingFriendsQuest.quest.id,
                taskIndex: 0,
                progress: 1
            });

            // Show success message
            if (this.scene.alertPrefab) {
                this.scene.alertPrefab.alert("New Main Quest: Making Friends (1/4)");
            }

            // Emit event to refresh quest UI
            if (this.scene.reactEvent) {
                this.scene.reactEvent.emit("quest-updated", {
                    questId: makingFriendsQuest.quest.id,
                    taskIndex: 0,
                });
            }

            console.log("✅ 'Making Friends' quest started successfully with initial progress");
        } catch (error) {
            console.error("❌ Failed to start 'Making Friends' quest:", error);
            console.error("Error details:", error.response?.data || error.message);

            // Fallback: Show alert even if backend call fails
            if (this.scene.alertPrefab) {
                this.scene.alertPrefab.alert("New Main Quest: Making Friends");
            }
        }
    }

    async updateMakingFriendsProgress() {
        try {
            console.log("🤝 Updating 'Making Friends' quest progress for Lady Lydia");

            // Import getActiveQuests dynamically
            const { getActiveQuests } = await import("../../../lib/query-helper");

            // Fetch active quests from backend
            const activeQuestsResponse = await getActiveQuests();

            if (!activeQuestsResponse?.success || !activeQuestsResponse?.data) {
                console.error("❌ No active quests data found");
                return;
            }

            const activeQuests = activeQuestsResponse.data;
            const makingFriendsQuest = activeQuests.find(questEntry =>
                questEntry.quest.name === "Making Friends"
            );

            if (!makingFriendsQuest) {
                console.error("❌ 'Making Friends' quest not found in active quests");
                return;
            }

            console.log("✅ Found 'Making Friends' quest:", makingFriendsQuest.quest.id);

            // Update the TALK_TO_ALL_NPCS task
            const result = await updateQuestTask({
                questId: makingFriendsQuest.quest.id,
                taskIndex: 0, // First task: TALK_TO_ALL_NPCS
                progress: 1 // Increment progress by 1 (backend handles TALK_TO_ALL_NPCS counting)
            });

            console.log("✅ Backend response:", result);

            // Emit event to React to refresh quest data
            if (this.scene.reactEvent) {
                this.scene.reactEvent.emit("quest-updated", {
                    questId: makingFriendsQuest.quest.id,
                    taskIndex: 0,
                    questCompleted: result?.questCompleted || false
                });
            }

            console.log("✅ 'Making Friends' quest progress updated for Lady Lydia");
        } catch (error) {
            console.error("❌ Failed to update 'Making Friends' quest progress:", error);
            console.error("Error details:", error.response?.data || error.message);
        }
    }

    async updateTasteOfGoldProgress() {
        try {
            console.log("🥇 Updating 'Taste of Gold' quest progress for Lady Lydia interaction");

            // Import getActiveQuests dynamically
            const { getActiveQuests } = await import("../../../lib/query-helper");

            // Fetch active quests from backend
            const activeQuestsResponse = await getActiveQuests();

            if (!activeQuestsResponse?.success || !activeQuestsResponse?.data) {
                console.error("❌ No active quests data found");
                return;
            }

            const activeQuests = activeQuestsResponse.data;
            const tasteOfGoldQuest = activeQuests.find(questEntry =>
                questEntry.quest.name === "Taste of Gold"
            );

            if (!tasteOfGoldQuest) {
                console.error("❌ 'Taste of Gold' quest not found in active quests");
                return;
            }

            console.log("✅ Found 'Taste of Gold' quest:", tasteOfGoldQuest.quest.id);

            // Update the TALK_TO_NPC task (should be task index 1)
            const result = await updateQuestTask({
                questId: tasteOfGoldQuest.quest.id,
                taskIndex: 1, // Second task: TALK_TO_NPC (Lady Lydia)
                progress: 1 // Mark as completed (backend checks progress >= 1 for TALK_TO_NPC)
            });

            console.log("✅ Backend response:", result);

            // Emit event to React to refresh quest data
            if (this.scene.reactEvent) {
                this.scene.reactEvent.emit("quest-updated", {
                    questId: tasteOfGoldQuest.quest.id,
                    taskIndex: 1,
                    questCompleted: result?.questCompleted || false
                });
            }

            console.log("✅ 'Taste of Gold' quest progress updated for Lady Lydia");
        } catch (error) {
            console.error("❌ Failed to update 'Taste of Gold' quest progress:", error);
            console.error("Error details:", error.response?.data || error.message);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
