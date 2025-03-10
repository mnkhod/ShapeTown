// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { MERCHANT_TYPES, getMerchantInventory } from '../../../components/merchant-manager';
/* END-USER-IMPORTS */

export default class MerchantPrefab extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 32, y ?? 32);

        const npc = scene.add.sprite(0, 0, "NPCMerchant", 3);
        npc.scaleX = 1.5;
        npc.scaleY = 1.5;
        scene.physics.add.existing(npc, false);
        npc.body.allowGravity = false;
        npc.body.setSize(32, 32, false);
        this.add(npc);

        const questMark = scene.add.sprite(0, -40, "GameNpcs1", 6);
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

        /* START-USER-CTR-CODE */
        scene.events.on('create', this.prefabCreateCycle, this);
        npc.setInteractive({ useHandCursor: true });
        this.merchantType = MERCHANT_TYPES.FARMER;
        this.hasCompletedSellQuest = false;
        this.currentDialogueIndex = 0;
        /* END-USER-CTR-CODE */
    }

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
        "Good day! Need seeds or tools for your farm?"
    ];

    prefabCreateCycle() {
        console.log("MerchantPrefab create cycle started");
        
        this.npc.on('pointerover', function (_pointer) {
            this.preFX.addGlow(16777215, 4, 0, false);
            if (this.parentContainer && this.parentContainer.nameBox) {
                this.parentContainer.nameBox.setVisible(true);
            }
        });

        this.npc.on('pointerdown', function (_pointer) {
            console.log("Lydia NPC clicked");
            
            let distance = this.getDistance(this.player, this);

            if (distance > 100) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }

            // Trigger quest event for meeting Lydia
            if (this.scene.triggerQuestEvent) {
                console.log("Triggering npc:lydiaInteraction event");
                this.scene.triggerQuestEvent('npc:lydiaInteraction', { npc: this });
                
                // Mark Lydia as greeted for Quest #003
                if (this.scene.markNPCGreeted) {
                    this.scene.markNPCGreeted("Lydia");
                }
            }
            
            // Prepare dialogue
            const currentGreeting = this.greetings[this.currentDialogueIndex];
            this.currentDialogueIndex = (this.currentDialogueIndex + 1) % this.greetings.length;

            // Check for BOTH possible item IDs
            let hasIronBars = false;
            let ironItemId = null;
            let isQuestActive = false;
            
            try {
                if (this.scene.newItemHudPrefab && this.scene.newItemHudPrefab.checkItem) {
                    if (this.scene.newItemHudPrefab.checkItem("IronIngot")) {
                        hasIronBars = true;
                        ironItemId = "IronIngot";
                    }
                }
                
                if (this.scene.questSystem && this.scene.questSystem.isQuestActive) {
                    isQuestActive = this.scene.questSystem.isQuestActive("002");
                }
                
                console.log(`Has iron bars: ${hasIronBars} (${ironItemId}), Quest active: ${isQuestActive}`);
            } catch (error) {
                console.error("Error checking quest status:", error);
            }
            
            // Build dialogue options - matching BlackSmith format, but handling quest items specially
            let dialogueLines;
            
            if (hasIronBars && isQuestActive) {
                // When player has iron bars for quest, show special dialogue options
                dialogueLines = [
                    { 
                        msg: currentGreeting,
                        options: [
                            { 
                                text: "I want to buy seeds and supplies", 
                                onSelect: () => {
                                    console.log("Emitting show-shop-buy-modal event");
                                    if (this.scene.reactEvent) {
                                        this.scene.reactEvent.emit("show-shop-buy-modal", this);
                                    }
                                },
                                nextDialogue: 1
                            },
                            { 
                                text: "I need to sell some items", 
                                onSelect: () => {
                                    console.log("Opening sell UI for regular items");
                                    if (this.scene.reactEvent) {
                                        this.scene.reactEvent.emit("show-shop-sell-modal", this);
                                    }
                                },
                                nextDialogue: 1
                            },
                            { 
                                text: "Just browsing", 
                                nextDialogue: [
                                    { msg: "Feel free to look around. Let me know if you need anything." }
                                ]
                            }
                        ]
                    },
                    { msg: "Thank you for your business! Come back soon!" }
                ];
            } else {
                // Regular dialogue without quest options
                dialogueLines = [
                    { 
                        msg: currentGreeting,
                        options: [
                            { 
                                text: "I want to buy seeds and supplies", 
                                onSelect: () => {
                                    console.log("Emitting show-shop-buy-modal event");
                                    if (this.scene.reactEvent) {
                                        this.scene.reactEvent.emit("show-shop-buy-modal", this);
                                    }
                                },
                                nextDialogue: 1
                            },
                            { 
                                text: "I want to sell items", 
                                onSelect: () => {
                                    console.log("Emitting show-shop-sell-modal event");
                                    if (this.scene.reactEvent) {
                                        this.scene.reactEvent.emit("show-shop-sell-modal", this);
                                    }
                                },
                                nextDialogue: 1
                            },
                            { 
                                text: "Just browsing", 
                                nextDialogue: [
                                    { msg: "Feel free to look around. Let me know if you need anything." }
                                ]
                            }
                        ]
                    },
                    { msg: "Thank you for your business! Come back soon!" }
                ];
            }
            
            this.msgPrefab.conversation(dialogueLines);

        }, this);

        this.npc.on('pointerout', function (_pointer) {
            this.preFX.clear();
            if (this.parentContainer && this.parentContainer.nameBox) {
                this.parentContainer.nameBox.setVisible(false);
            }
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

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here