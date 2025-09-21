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
            function (_pointer) {
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

                // Update backend quest task for "Taste of Gold" if active
                if (this.isQuestActiveByName("Taste of Gold")) {
                    this.updateTasteOfGoldProgress();
                }

                // Update backend quest task for "Making Friends" if active
                if (this.isQuestActiveByName("Making Friends")) {
                    this.updateMakingFriendsProgress();
                }

                const currentGreeting =
                    this.greetings[this.currentDialogueIndex];
                this.currentDialogueIndex =
                    (this.currentDialogueIndex + 1) % this.greetings.length;

                let hasIronBars = false;
                let ironItemId = null;
                let isQuestActive = false;

                try {
                    if (
                        this.scene.newItemHudPrefab &&
                        this.scene.newItemHudPrefab.checkItem
                    ) {
                        if (
                            this.scene.newItemHudPrefab.checkItem("IronIngot")
                        ) {
                            hasIronBars = true;
                            ironItemId = "IronIngot";
                        }
                    }

                    if (
                        this.scene.questSystem &&
                        this.scene.questSystem.isQuestActive
                    ) {
                        isQuestActive =
                            this.isQuestActiveByName("Taste of Gold");
                    }
                } catch (error) {
                    console.error("Error checking quest status:", error);
                }

                let dialogueLines;

                // Check if Taste of Gold was just completed (has iron bars but quest just finished)
                const tasteOfGoldCompleted = this.isQuestCompletedByName("Taste of Gold");
                const makingFriendsActive = this.isQuestActiveByName("Making Friends");
                const makingFriendsCompleted = this.isQuestCompletedByName("Making Friends");

                if (tasteOfGoldCompleted && !makingFriendsActive && !makingFriendsCompleted) {
                    // Start Making Friends quest
                    dialogueLines = [
                        {
                            msg: "Thank you for selling those iron bars! You've proven yourself to be quite capable.",
                        },
                        {
                            msg: "Now that you're familiar with ShapeTown's trading system, I have another opportunity for you.",
                        },
                        {
                            msg: "To truly become part of our community, you should meet all the townspeople.",
                        },
                        {
                            msg: "Would you like to take on the quest to make friends with everyone in ShapeTown?",
                            onComplete: () => {
                                // Start the Making Friends quest
                                this.startMakingFriendsQuest();
                            }
                        },
                        {
                            msg: "Visit each NPC in town and introduce yourself. They all have interesting stories to share!",
                        }
                    ];
                } else if (hasIronBars && isQuestActive) {
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

    isQuestActiveByName(questName) {
        try {
            const activeQuests = this.scene.questProvider?.activeQuests?.data;
            if (!activeQuests) return false;

            return activeQuests.some(questEntry =>
                questEntry.quest.name === questName
            );
        } catch (error) {
            console.error("Error checking active quest by name:", error);
            return false;
        }
    }

    isQuestCompletedByName(questName) {
        try {
            const completedQuests = this.scene.questProvider?.completedQuests?.data;
            if (!completedQuests) return false;

            return completedQuests.some(questEntry =>
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

            // Get available quests to find the "Making Friends" quest ID
            const availableQuests = await this.scene.questProvider?.availableQuests?.data;
            if (!availableQuests) {
                console.error("❌ No available quests data found");
                return;
            }

            const makingFriendsQuest = availableQuests.find(questEntry =>
                questEntry.quest.name === "Making Friends"
            );

            if (!makingFriendsQuest) {
                console.error("❌ 'Making Friends' quest not found in available quests");
                return;
            }

            console.log("✅ Found 'Making Friends' quest:", makingFriendsQuest.quest.id);

            // Start the quest using backend API
            await startQuest(makingFriendsQuest.quest.id);

            // Show success message
            if (this.scene.alertPrefab) {
                this.scene.alertPrefab.alert("New Main Quest: Making Friends");
            }

            // Refresh quest data from backend
            if (this.scene.questProvider?.refreshQuests) {
                this.scene.questProvider.refreshQuests();
            }

            console.log("✅ 'Making Friends' quest started successfully");
        } catch (error) {
            console.error("❌ Failed to start 'Making Friends' quest:", error);

            // Fallback: Show alert even if backend call fails
            if (this.scene.alertPrefab) {
                this.scene.alertPrefab.alert("New Main Quest: Making Friends");
            }
        }
    }

    async updateMakingFriendsProgress() {
        try {
            console.log("🤝 Updating 'Making Friends' quest progress for Lady Lydia");

            // Get active quests to find the "Making Friends" quest
            const activeQuests = this.scene.questProvider?.activeQuests?.data;
            if (!activeQuests) {
                console.error("❌ No active quests data found");
                return;
            }

            const makingFriendsQuest = activeQuests.find(questEntry =>
                questEntry.quest.name === "Making Friends"
            );

            if (!makingFriendsQuest) {
                console.error("❌ 'Making Friends' quest not found in active quests");
                return;
            }

            console.log("✅ Found 'Making Friends' quest:", makingFriendsQuest.quest.id);

            // Update the TALK_TO_ALL_NPCS task
            await updateQuestTask({
                questId: makingFriendsQuest.quest.id,
                taskIndex: 0, // First task: TALK_TO_ALL_NPCS
                progressData: {
                    npcId: "09a59f2a-aac8-4336-9eff-50711546b7a0", // Lady Lydia ID from backend
                    action: "talked_to_npc"
                }
            });

            // Refresh quest data from backend
            if (this.scene.questProvider?.refreshQuests) {
                this.scene.questProvider.refreshQuests();
            }

            console.log("✅ 'Making Friends' quest progress updated for Lady Lydia");
        } catch (error) {
            console.error("❌ Failed to update 'Making Friends' quest progress:", error);
        }
    }

    async updateTasteOfGoldProgress() {
        try {
            console.log("🥇 Updating 'Taste of Gold' quest progress for Lady Lydia interaction");

            // Get active quests to find the "Taste of Gold" quest
            const activeQuests = this.scene.questProvider?.activeQuests?.data;
            if (!activeQuests) {
                console.error("❌ No active quests data found");
                return;
            }

            const tasteOfGoldQuest = activeQuests.find(questEntry =>
                questEntry.quest.name === "Taste of Gold"
            );

            if (!tasteOfGoldQuest) {
                console.error("❌ 'Taste of Gold' quest not found in active quests");
                return;
            }

            console.log("✅ Found 'Taste of Gold' quest:", tasteOfGoldQuest.quest.id);

            // Update the TALK_TO_NPC task (should be task index 1)
            await updateQuestTask({
                questId: tasteOfGoldQuest.quest.id,
                taskIndex: 1, // Second task: TALK_TO_NPC (Lady Lydia)
                progressData: {
                    npcId: "09a59f2a-aac8-4336-9eff-50711546b7a0", // Lady Lydia ID from backend
                    action: "talked_to_npc"
                }
            });

            // Refresh quest data from backend
            if (this.scene.questProvider?.refreshQuests) {
                this.scene.questProvider.refreshQuests();
            }

            console.log("✅ 'Taste of Gold' quest progress updated for Lady Lydia");
        } catch (error) {
            console.error("❌ Failed to update 'Taste of Gold' quest progress:", error);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
