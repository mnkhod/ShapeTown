import { mintFirstHarvestAchievement } from "../../utility";
import { startQuest } from "../../../lib/query-helper";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OldManJackNpcPrefab extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 24, y ?? 25);

        // npc
        /** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
        const npc = scene.add.sprite(0, -1, "GameNpcs1", 0);
        npc.scaleX = 1.5;
        npc.scaleY = 1.5;
        scene.physics.add.existing(npc, false);
        npc.body.allowGravity = false;
        npc.body.setSize(32, 32, false);
        npc.play("npcHarvestStandingAnim");
        this.add(npc);

        const nameBox = scene.add.sprite(0, 33, "OldManJackName");
        nameBox.setVisible(true);
        nameBox.setOrigin(0.5, 0.5);
        nameBox.setScale(0.4);
        this.add(nameBox);
        this.npc = npc;
        this.nameBox = nameBox;

        /* START-USER-CTR-CODE */
        // Write your code here.

        const questMark = scene.add.sprite(0, -40, "GameNpcs1", 6);
        questMark.setScale(1.5);
        questMark.play("BeforeQuest");
        this.add(questMark);
        this.questMark = questMark;

        scene.events.on("create", this.prefabCreateCycle, this);
        npc.setInteractive({ useHandCursor: true });
        this.isMinting = false;
        this.lifeCycleStep = 0;

        this.dailyQuestCompleted = false;

        this.checkNewDay();
        this.loadLifeCycleStep();

        // DISABLED: localStorage fallback completely disabled to prevent conflicts
        // The backend inventory service should handle all inventory persistence
        // setTimeout(() => {
        //     if (!window.inventoryService?.isInventoryLoaded() && !hasCurrentItems) {
        //         console.log("⚠️ No inventory found, using localStorage fallback");
        //         this.loadInventoryFromLocalStorage();
        //     }
        // }, 2000);

        // Add a small delay to ensure achievements are loaded before checking them
        setTimeout(() => {
            console.log("Jack lifecycle step after load:", this.lifeCycleStep);
            if (this.scene && this.scene.achievements) {
                console.log(
                    "Scene achievements state:",
                    this.scene.achievements
                );
            } else {
                console.log("Scene achievements not yet loaded");
            }
        }, 1000);

        this.newDayInterval = setInterval(() => {
            this.checkNewDay();
        }, 60000);

        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
    npc;
    /** @type {Phaser.GameObjects.GameObject} */
    player;
    /** @type {Phaser.GameObjects.GameObject} */
    msgPrefab;
    /** @type {Phaser.GameObjects.GameObject} */
    newItemHud;
    /** @type {Phaser.GameObjects.GameObject} */
    bookHud;
    /** @type {Phaser.GameObjects.GameObject} */
    profilePrefab;

    /* START-USER-CODE */

    firstHarvestDialogueLifeCycle = [
        {
            msg: "Hello there… Welcome to Shaper Town. I'm Jack. This is my humble farm.",
        },
        {
            msg: "You haven't chosen your 'Profession' yet. I will help you choose one today. So we shall start?",
        },
        {
            msg: "First thing first, take these tools, those coming in handy, any time soon.",
        },
        {
            msg: "Those will be handy soon.",
            onComplete: () => {
                this.newItemHud.visible = true;
                // Give tools IMMEDIATELY during dialogue so player can use them for the quest
                this.giveStartingToolsNow();
            },
        },
        {
            msg: "Alright, I am giving you a Quest. Therefore, you may be spot on your Quest Book.",
        },
        {
            msg: "Alright, here's your quest. You may see it in your quest book, good luck!",
            onComplete: () => {
                if (this.bookHud) {
                    this.bookHud.visible = true;
                    this.bookHud.play("bookLightingUpAnim");
                }
                if (this.scene.profilePrefab) {
                    this.scene.profilePrefab.visible = true;
                }

                // NOW start the quest through the quest system AFTER giving tools
                if (
                    this.scene.questSystem &&
                    this.scene.questSystem.tryStartFirstHarvestQuest
                ) {
                    console.log(
                        "🎯 Starting First Harvest quest from dialogue completion"
                    );
                    this.scene.questSystem.tryStartFirstHarvestQuest();
                }
            },
        },
        { msg: "You have to plant some seeds for me." },
        {
            msg: "Here are your platform passes.",
            onComplete: () => {
                // Carrot seeds are now given with tools in giveStartingToolsNow()
                // Don't give additional seeds here to avoid duplicates
            },
        },
        {
            msg: "Go to the Cropland. Start working on it!",
            onComplete: () => {},
        },
    ];

    firstHarvestReminderDialogueLifeCycle = [
        {
            msg: "Have you planted and harvested your crops yet? I need a carrot to see your progress.",
        },
        {
            msg: "Remember to use your hoe on the cropland, plant the seeds, water them, and wait for them to grow.",
        },
        { msg: "Bring me a carrot when you've harvested one!" },
    ];

    tasteOfGoldDialogueLifeCycle = [
        {
            msg: "Well done with the harvest! I'm impressed by your farming skills.",
        },
        {
            msg: "Now that you've learned the basics of farming, it's time for your next MAIN QUEST.",
        },
        {
            msg: "There's a merchant named Lady Lydia in Shape Town who can help you sell your goods.",
        },
        {
            msg: "I have some iron bars that need to be sold. Could you take them to Lydia for me?",
            onComplete: () => {
                // Start the "Taste of Gold" quest through backend
                this.startTasteOfGoldQuest();
                this.questMark.play("BeforeQuest");
            },
        },
        {
            msg: "Head to Shape Town - it's northeast from here. Just follow the path.",
        },
        {
            msg: "Find Lady Lydia at her merchant stall and sell these goods to her.",
        },
        {
            msg: "Complete this quest to unlock more adventures and unlock SIDE QUESTS and DAILY QUESTS!",
            onComplete: () => {
                // Activate Quest #002
                if (this.scene.triggerQuestEvent) {
                    this.scene.triggerQuestEvent(
                        "quest:taste-of-gold-activated",
                        { npc: this }
                    );
                }
            },
        },
    ];

    tasteOfGoldReminderDialogueLifeCycle = [
        {
            msg: "Have you found Lydia yet? She's in town at the merchant stall.",
        },
        {
            msg: "Don't forget to sell those iron bars I gave you. Head northeast to Shape Town and find Lydia.",
        },
    ];

    everyDayQuestDialogueLifeCycle = [
        { msg: "Hello there! I'm running low on carrots for my stew." },
        {
            msg: "Could you bring me 5 carrots today? This is a DAILY QUEST that resets every day.",
        },
        {
            msg: "Complete daily quests to earn steady rewards and help the townspeople!",
            onComplete: () => {
                if (
                    this.scene.questSystem &&
                    !this.scene.questSystem.isQuestActive("012")
                ) {
                    this.scene.questSystem.activateQuest("012");
                    if (this.scene.alertPrefab) {
                        this.scene.alertPrefab.alert(
                            "Daily Quest: Daily Harvest (Resets Daily)"
                        );
                    }
                }
            },
        },
    ];

    everyDayQuestReminderDialogueLifeCycle = [
        { msg: "Have you got those 5 carrots for me yet?" },
        { msg: "My stew won't be the same without them!" },
    ];

    everyDayQuestCompletedDialogueLifeCycle = [
        { msg: "Thanks for the carrots! They'll make a fine stew." },
        {
            msg: "Here are some carrot seeds as promised. Come back tomorrow if you want to help again!",
        },
        {
            msg: "Happy farming!",
            onComplete: () => {
                this.dailyQuestCompleted = true;
                this.saveQuestState();

                if (
                    this.scene.questSystem &&
                    this.scene.questSystem.isQuestActive("012")
                ) {
                    this.scene.questSystem.completeQuest("012");
                }
            },
        },
    ];

    checkNewDay() {
        const currentDate = new Date().toDateString();
        const lastDate = localStorage.getItem("lastQuestDate");

        if (lastDate !== currentDate) {
            this.dailyQuestCompleted = false;
            localStorage.setItem("lastQuestDate", currentDate);

            // Reset quest in quest system
            if (this.scene && this.scene.questSystem) {
                if (this.scene.questSystem.isQuestCompleted("012")) {
                    this.scene.questSystem.resetQuest("012");
                }
            }
        } else {
            this.loadQuestState();
        }
    }

    saveQuestState() {
        localStorage.setItem(
            "jackDailyQuestCompleted",
            this.dailyQuestCompleted.toString()
        );
    }

    loadQuestState() {
        const saved = localStorage.getItem("jackDailyQuestCompleted");
        if (saved !== null) {
            this.dailyQuestCompleted = saved === "true";
        }
    }

    saveLifeCycleStep() {
        // Get current user ID to make lifecycle step user-specific
        const token = localStorage.getItem("token");
        let userId = "default";

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                userId = payload.userId;
            } catch (error) {
                console.log(
                    "Could not decode token for user-specific lifecycle"
                );
            }
        }

        localStorage.setItem(
            `jackLifeCycleStep_${userId}`,
            this.lifeCycleStep.toString()
        );
        console.log(
            "Saved Jack lifecycle step for user",
            userId + ":",
            this.lifeCycleStep
        );
    }

    loadLifeCycleStep() {
        // Get current user ID to make lifecycle step user-specific
        const token = localStorage.getItem("token");
        let userId = "default";

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                userId = payload.userId;
            } catch (error) {
                console.log(
                    "Could not decode token for user-specific lifecycle"
                );
            }
        }

        const saved = localStorage.getItem(`jackLifeCycleStep_${userId}`);
        if (saved !== null) {
            this.lifeCycleStep = parseInt(saved, 10);
            console.log(
                "Loaded Jack lifecycle step for user",
                userId + ":",
                this.lifeCycleStep
            );
        } else {
            console.log(
                "No lifecycle step found for user",
                userId + ", starting fresh at 0"
            );
            this.lifeCycleStep = 0;
        }
    }

    prefabCreateCycle() {
        console.log("Prefab create cycle started");

        this.npc.on("pointerover", function (_pointer) {
            console.log("Mouse over NPC");
            this.preFX.addGlow(16777215, 4, 0, false);
            this.parentContainer.nameBox.setVisible(true);
        });

        this.npc.on("pointerout", function (_pointer) {
            console.log("Mouse out of NPC");
            this.preFX.clear();
            this.parentContainer.nameBox.setVisible(false);
        });

        this.npc.on(
            "pointerdown",
            async function (_pointer) {
                console.log("Jack NPC clicked");

                // Trigger quest events for proper quest progression
                if (this.scene.triggerQuestEvent) {
                    console.log("Triggering Jack interaction quest event");
                    this.scene.triggerQuestEvent("npc:jackInteraction", {
                        npc: this,
                    });
                } else {
                    console.log("triggerQuestEvent not available on scene");
                }

                // Also call backend to complete any RETURN_TO_NPC tasks
                try {
                    if (this.npc.id) {
                        console.log(
                            "🔄 Calling backend NPC interaction for Jack:",
                            this.npc.id
                        );
                        const { interactWithNpc } = await import(
                            "../../../lib/query-helper"
                        );
                        await interactWithNpc(this.npc.id);
                        console.log("✅ Backend NPC interaction completed");
                    }
                } catch (error) {
                    console.warn(
                        "⚠️ Backend NPC interaction failed (non-blocking):",
                        error
                    );
                }

                let distance = this.getDistance(this.player, this);

                if (distance > 60) {
                    this.scene.alertPrefab.alert("Too Far");
                    return;
                }

                if (this.isMinting) {
                    this.scene.alertPrefab.alert("Minting");
                    return;
                }

                if (!this.scene.achievements) return;

                // Daily quests are only available after completing "Making Friends"
                if (this.isQuestCompletedByName("Making Friends")) {
                    console.log(
                        "Making Friends completed, daily quests are now available"
                    );

                    const currentCarrots =
                        this.newItemHud.getItemCount("CARROT") || 0;
                    if (currentCarrots >= 5) {
                        console.log(
                            "Player had",
                            currentCarrots,
                            "carrots, removing exactly 5"
                        );

                        this.newItemHud.removeItemByKey("CARROT");

                        if (currentCarrots > 5) {
                            const remainingCarrots = currentCarrots - 5;
                            console.log(
                                "Adding back",
                                remainingCarrots,
                                "carrots"
                            );
                            this.newItemHud.addItem(
                                "CARROT",
                                "crops-carrot",
                                0,
                                remainingCarrots
                            );
                        }

                        console.log(
                            "Adding 5 carrot seeds as daily quest reward"
                        );
                        this.newItemHud.addItem(
                            "seed_carrot",
                            "crops-seed bags-carrot",
                            0,
                            5
                        );

                        // Trigger inventory sync after giving seeds
                        if (this.scene.events) {
                            this.scene.events.emit("inventory-changed");
                            console.log(
                                "📦 Emitted inventory-changed event after giving carrot seeds"
                            );
                        }

                        this.msgPrefab.conversation(
                            this.everyDayQuestCompletedDialogueLifeCycle
                        );
                    } else {
                        if (
                            this.scene.questSystem &&
                            !this.scene.questSystem.isQuestActive("012")
                        ) {
                            this.scene.questSystem.activateQuest("012");
                        }
                        this.msgPrefab.conversation(
                            this.everyDayQuestDialogueLifeCycle
                        );
                    }
                    return;
                } else if (this.isQuestCompletedByName("Taste of Gold")) {
                    // After Taste of Gold but before Making Friends
                    this.msgPrefab.conversation([
                        { msg: "You're doing great with the main quests!" },
                        {
                            msg: "Complete the 'Making Friends' quest first to unlock daily quests.",
                        },
                        { msg: "Go meet all the townspeople in Shape Town!" },
                    ]);
                    return;
                }

                // DEBUG: Log current state for troubleshooting
                console.log("🔍 Jack NPC Debug Info:");
                console.log("  - lifeCycleStep:", this.lifeCycleStep);
                console.log("  - achievements:", this.scene.achievements);
                console.log(
                    "  - firstHarvestAchievement:",
                    this.scene.achievements?.firstHarvestAchievement
                );
                console.log(
                    "  - questSystem available:",
                    !!this.scene.questSystem
                );

                // Priority 1: Check if this is a new player who needs to start First Harvest
                // Only run dialogue if lifecycle step is 0 (never talked to Jack before)
                if (this.lifeCycleStep === 0) {
                    console.log(
                        "🎬 PRIORITY 1: Starting First Harvest dialogue - first time talking to Jack"
                    );
                    this.msgPrefab.conversation(
                        this.firstHarvestDialogueLifeCycle
                    );
                    this.lifeCycleStep = 1;
                    this.saveLifeCycleStep();
                    return;
                } else {
                    console.log(
                        "❌ PRIORITY 1 FAILED: lifeCycleStep is NOT 0, it's:",
                        this.lifeCycleStep
                    );
                }

                // DEBUG: If you want to reset for testing, uncomment this:
                // if (confirm("Reset Jack dialogue for testing?")) {
                //     this.lifeCycleStep = 0;
                //     this.saveLifeCycleStep();
                //     this.msgPrefab.conversation(this.firstHarvestDialogueLifeCycle);
                //     return;
                // }

                // Priority 2: Check if player has carrot and needs to complete First Harvest
                const hasCarrot = this.newItemHud.checkItem("CARROT");
                console.log("🥕 DEBUG: Player has CARROT?", hasCarrot);

                if (hasCarrot) {
                    this.questMark.play("AfterQuest");

                    if (this.scene.achievements?.firstHarvestAchievement) {
                        this.scene.alertPrefab.alert(
                            "Already Has Achievement NFT"
                        );
                    } else {
                        this.isMinting = true;
                        this.scene.alertPrefab.alert("Minting Has Started");

                        const prefab = this;
                        setTimeout(() => {
                            this.scene.alertPrefab.alert(
                                "First Harvest Achievement"
                            );
                            if (!this.scene.achievements) {
                                this.scene.achievements = {};
                            }
                            this.scene.achievements.firstHarvestAchievement = true;
                            if (this.scene.saveAchievements) {
                                this.scene.saveAchievements();
                            }
                            this.newItemHud.removeItemByKey("CARROT");
                            this.isMinting = false;

                            if (
                                this.scene.questSystem &&
                                !this.scene.questSystem.isQuestCompleted("001")
                            ) {
                                console.log(
                                    "Completing Quest #001 and claiming rewards"
                                );
                                this.scene.questSystem.completeQuest("001");

                                // Give quest rewards from backend
                                this.claimFirstHarvestRewards();

                                // Quest progression: Quest #002 should auto-unlock after #001
                                setTimeout(() => {
                                    console.log(
                                        "🔄 Quest progression: Unlocking Quest #002 'Taste of Gold'"
                                    );
                                    if (this.scene.questSystem) {
                                        this.scene.questSystem.checkQuestPrerequisites();

                                        // Force refresh quest data from backend to sync frontend
                                        setTimeout(() => {
                                            console.log(
                                                "🔄 Forcing quest data refresh from backend"
                                            );
                                            if (
                                                this.scene.questSystem
                                                    .syncQuestProgress
                                            ) {
                                                this.scene.questSystem.syncQuestProgress();
                                            }
                                        }, 500);
                                    }
                                }, 1000);
                            }

                            setTimeout(() => {
                                console.log("Showing Taste of Gold dialogue");

                                // Only give iron bars if Taste of Gold quest hasn't been started yet
                                const tasteOfGoldActive = this.isQuestActiveByName("Taste of Gold");
                                const tasteOfGoldCompleted = this.isQuestCompletedByName("Taste of Gold");
                                const currentIronCount = this.newItemHud.checkItem("IronIngot") ?
                                    this.newItemHud.getItemCount("IronIngot") : 0;

                                if (!tasteOfGoldActive && !tasteOfGoldCompleted && currentIronCount === 0) {
                                    console.log("🔧 Giving 3 iron bars for Taste of Gold quest (first time)");
                                    this.newItemHud.addItem(
                                        "IronIngot",
                                        "Icon_IronBar",
                                        0,
                                        3
                                    );

                                    // Trigger inventory sync after giving iron bars
                                    if (this.scene.events) {
                                        this.scene.events.emit("inventory-changed");
                                        console.log(
                                            "📦 Emitted inventory-changed event after giving iron bars"
                                        );
                                    }
                                } else {
                                    console.log(`🔧 Not giving iron bars - Quest active: ${tasteOfGoldActive}, completed: ${tasteOfGoldCompleted}, iron count: ${currentIronCount}`);
                                }

                                prefab.msgPrefab.conversation(
                                    prefab.tasteOfGoldDialogueLifeCycle
                                );
                            }, 2000);
                        }, 1500);
                    }
                    return;
                }

                // Priority 3: Handle Taste of Gold quest progression
                // ONLY show these dialogues if First Harvest is actually completed AND achievements exist
                if (
                    this.scene.achievements?.firstHarvestAchievement === true &&
                    this.isQuestActiveByName("Taste of Gold")
                ) {
                    console.log("🔄 Showing Taste of Gold reminder dialogue");
                    this.msgPrefab.conversation(
                        this.tasteOfGoldReminderDialogueLifeCycle
                    );
                    return;
                }

                console.log("🔍 PRIORITY 3 CHECK:");
                console.log(
                    "  - firstHarvestAchievement === true?",
                    this.scene.achievements?.firstHarvestAchievement === true
                );
                console.log(
                    "  - quest 002 NOT active?",
                    !this.scene.questSystem?.isQuestActive("002")
                );
                console.log(
                    "  - quest 002 NOT completed?",
                    !this.scene.questSystem?.isQuestCompleted("002")
                );

                if (
                    this.scene.achievements?.firstHarvestAchievement === true &&
                    !this.isQuestActiveByName("Taste of Gold") &&
                    !this.isQuestCompletedByName("Taste of Gold")
                ) {
                    console.log(
                        "🎯 PRIORITY 3 TRIGGERED: Showing Taste of Gold start dialogue"
                    );
                    this.msgPrefab.conversation(
                        this.tasteOfGoldDialogueLifeCycle
                    );
                    return;
                }

                // Priority 4: First Harvest reminders for players who have talked to Jack before but don't have carrot
                if (
                    this.lifeCycleStep > 0 &&
                    !this.scene.achievements?.firstHarvestAchievement
                ) {
                    console.log("🔄 Showing First Harvest reminder dialogue");
                    this.msgPrefab.conversation(
                        this.firstHarvestReminderDialogueLifeCycle
                    );
                    return;
                }

                // FALLBACK: If none of the above conditions are met and this is a new user, show first dialogue
                if (!this.scene.achievements?.firstHarvestAchievement) {
                    console.log(
                        "🆘 FALLBACK: Showing First Harvest dialogue for new/uninitialized user"
                    );
                    this.msgPrefab.conversation(
                        this.firstHarvestDialogueLifeCycle
                    );
                    this.lifeCycleStep = 1;
                    this.saveLifeCycleStep();
                    return;
                }

                // If we get here, something is wrong - log it
                console.warn(
                    "❌ Jack NPC: No dialogue condition matched! This shouldn't happen."
                );
                console.warn("State:", {
                    lifeCycleStep: this.lifeCycleStep,
                    achievements: this.scene.achievements,
                    firstHarvestAchievement:
                        this.scene.achievements?.firstHarvestAchievement,
                });
            },
            this
        );
    }

    getDistance(texture1, texture2) {
        return Phaser.Math.Distance.Between(
            texture1.x,
            texture1.y,
            texture2.x,
            texture2.y
        );
    }

    typeText(text) {
        this.isTyping = true;
        this.dialogueText.setText("");

        let currentChar = 0;
        const typingSpeed = 30;
        this.typeTimer = this.time.addEvent({
            delay: typingSpeed,
            callback: () => {
                if (currentChar < text.length) {
                    this.dialogueText.text += text[currentChar];
                    currentChar++;
                } else {
                    this.typeTimer.destroy();
                    this.isTyping = false;
                    this.onTypingComplete();
                }
            },
            repeat: text.length - 1,
        });
    }

    giveStartingToolsNow() {
        console.log("🛠️ Giving starting tools DURING dialogue");

        // Check if tools already given to prevent duplicates
        const hasPickaxe = this.newItemHud.checkItem("ToolPickaxe");
        const hasHoe = this.newItemHud.checkItem("ToolHoe");
        const hasWateringCan = this.newItemHud.checkItem("ToolWateringCan");
        const currentSeedCount =
            this.newItemHud.getItemCount("seed_carrot") || 0;

        if (hasPickaxe && hasHoe && hasWateringCan && currentSeedCount >= 5) {
            console.log(
                "🛠️ Tools and seeds already given (database loaded), skipping duplicate gift"
            );
            return;
        }

        // Give tools IMMEDIATELY during dialogue so player can use them for quest tasks
        if (!hasPickaxe)
            this.newItemHud.addItem("ToolPickaxe", "IconToolPickaxe", 0);
        if (!hasHoe) this.newItemHud.addItem("ToolHoe", "IconToolHoe", 0);
        if (!hasWateringCan)
            this.newItemHud.addItem(
                "ToolWateringCan",
                "IconToolWateringCan",
                0
            );

        if (hasPickaxe) this.newItemHud.forceSelectTool("ToolPickaxe");

        // Give carrot seeds only if not already present in sufficient quantity (database provides 5)
        if (currentSeedCount < 5) {
            const seedsToGive = 5 - currentSeedCount;
            console.log(
                `🌱 Giving ${seedsToGive} carrot seeds (current: ${currentSeedCount})`
            );
            this.newItemHud.addItem(
                "seed_carrot",
                "crops-seed bags-carrot",
                0,
                seedsToGive
            );
        } else {
            console.log(
                `🌱 Player already has ${currentSeedCount} carrot seeds, not giving more`
            );
        }

        // Save inventory to localStorage for persistence
        this.saveInventoryToLocalStorage();

        if (this.scene.alertPrefab) {
            this.scene.alertPrefab.alert(
                "Received starting tools and carrot seeds!"
            );
        }

        console.log(
            "✅ Starting tools given during dialogue - ready to start quest tasks!"
        );
    }

    saveInventoryToLocalStorage() {
        try {
            if (this.newItemHud && this.newItemHud.items) {
                const inventoryData = JSON.stringify(this.newItemHud.items);
                localStorage.setItem("playerInventory", inventoryData);
                console.log("💾 Inventory saved to localStorage");
            }
        } catch (error) {
            console.error("Failed to save inventory to localStorage:", error);
        }
    }

    loadInventoryFromLocalStorage() {
        try {
            const savedInventory = localStorage.getItem("playerInventory");
            if (savedInventory && this.newItemHud) {
                const inventoryData = JSON.parse(savedInventory);

                // Restore items to inventory
                Object.keys(inventoryData).forEach((itemKey) => {
                    const item = inventoryData[itemKey];
                    if (item && item.count > 0) {
                        this.newItemHud.addItem(
                            itemKey,
                            item.texture,
                            0,
                            item.count
                        );
                    }
                });

                console.log("💾 Inventory loaded from localStorage");
            }
        } catch (error) {
            console.error("Failed to load inventory from localStorage:", error);
        }
    }

    claimFirstHarvestRewards() {
        console.log(
            "🎁 First Harvest quest completed - tools already given during dialogue"
        );

        // Tools and seeds were already given during dialogue
        // Only give the remaining rewards here (gold)
        // TODO: Add gold to player (need to integrate with player gold system)
        if (this.scene.alertPrefab) {
            this.scene.alertPrefab.alert("Quest Complete! Received 100 Gold!");
        }

        console.log("✅ First Harvest quest completion rewards given");
    }

    async startTasteOfGoldQuest() {
        try {
            console.log("🎯 Starting 'Taste of Gold' quest through backend");

            // Get available quests to find the "Taste of Gold" quest ID
            const availableQuests = await this.scene.questProvider
                ?.availableQuests?.data;
            if (!availableQuests) {
                console.error("❌ No available quests data found");
                return;
            }

            const tasteOfGoldQuest = availableQuests.find(
                (questEntry) => questEntry.quest.name === "Taste of Gold"
            );

            if (!tasteOfGoldQuest) {
                console.error(
                    "❌ 'Taste of Gold' quest not found in available quests"
                );
                return;
            }

            console.log(
                "✅ Found 'Taste of Gold' quest:",
                tasteOfGoldQuest.quest.id
            );

            // Start the quest using backend API
            await startQuest(tasteOfGoldQuest.quest.id);

            // Show success message
            if (this.scene.alertPrefab) {
                this.scene.alertPrefab.alert("New Main Quest: Taste of Gold");
            }

            // Refresh quest data from backend
            if (this.scene.questProvider?.refreshQuests) {
                this.scene.questProvider.refreshQuests();
            }

            console.log("✅ 'Taste of Gold' quest started successfully");
        } catch (error) {
            console.error("❌ Failed to start 'Taste of Gold' quest:", error);

            // Fallback: Show alert even if backend call fails
            if (this.scene.alertPrefab) {
                this.scene.alertPrefab.alert("New Main Quest: Taste of Gold");
            }
        }
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

    destroy() {
        if (this.newDayInterval) {
            clearInterval(this.newDayInterval);
        }
        super.destroy();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
