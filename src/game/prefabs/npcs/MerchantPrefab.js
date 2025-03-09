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

    dialogueLines = [
        {
            msg: "Hello, I'm Lydia. How can I help you today?",
            options: [
                {
                    text: "I want to buy seeds and supplies", 
                    onSelect: () => {
                        if (this.scene.reactEvent) {
                            this.scene.reactEvent.emit("show-shop-buy-modal", this);
                        }
                    },
                    nextDialogue: 1
                },
                {
                    text: "I want to sell items",
                    onSelect: () => {
                      if (this.scene.reactEvent) {
                        // Check if the player has iron bars and Quest #002 is active
                        const hasIronBars = this.scene.newItemHudPrefab && 
                                           this.scene.newItemHudPrefab.checkItem("Ironbar");
                        const isQuestActive = this.scene.questSystem && 
                                            this.scene.questSystem.isQuestActive("002");
                        
                        if (hasIronBars && isQuestActive) {
                          // Special dialogue for the quest
                          this.msgPrefab.conversation([
                            { msg: "Ah, those iron bars from Jack! I can definitely buy those from you." },
                            { 
                              msg: "Here's your payment - 1000 gold! Jack will be pleased with your trading skills.",
                              onComplete: () => {
                                // Remove iron bars from inventory
                                this.scene.newItemHudPrefab.removeItemByKey("Ironbar");
                                
                                // Trigger quest completion
                                if (this.scene.triggerQuestEvent) {
                                  console.log("Triggering quest:sold-items-to-lydia event");
                                  this.scene.triggerQuestEvent('quest:sold-items-to-lydia', { npc: this });
                                  
                                  // Show notification
                                  if (this.scene.alertPrefab) {
                                    this.scene.alertPrefab.alert("Quest Completed: Taste of Gold");
                                  }
                                }
                              }
                            }
                          ]);
                        } else {
                          // Regular selling
                          this.scene.reactEvent.emit("show-shop-sell-modal", this);
                        }
                      }
                    },
                    nextDialogue: 1,
                },
                {
                    text: "Jack sent me here",
                    nextDialogue: [
                        { 
                            msg: "Ah, Jack! He's a good friend. Welcome to my shop! Feel free to browse my goods or sell your items. I offer fair prices for quality goods.",
                            onComplete: () => {
                                // Trigger quest event for meeting Lydia
                                if (this.scene.triggerQuestEvent) {
                                    this.scene.triggerQuestEvent('npc:lydiaInteraction', { npc: this });
                                    
                                    // Show notification
                                    if (this.scene.alertPrefab) {
                                        this.scene.alertPrefab.alert("Quest Updated: Met Lady Lydia");
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    text: "Just browsing",
                    nextDialogue: [
                        { msg: "Feel free to look around. Let me know if you need anything." }
                    ],
                }
            ]
        },
        { msg: "Thank you. Have a nice day!" }
    ];

    prefabCreateCycle() {
        this.npc.on('pointerover', function (_pointer) {
            this.preFX.addGlow(16777215, 4, 0, false);
            if (this.parentContainer && this.parentContainer.nameBox) {
                this.parentContainer.nameBox.setVisible(true);
            }
        });

        this.npc.on('pointerdown', function (_pointer) {
            let distance = this.getDistance(this.player, this);

            if (distance > 100) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }

            this.msgPrefab.conversation(this.dialogueLines);
            
            // Trigger quest event for meeting Lydia
            if (this.scene.triggerQuestEvent) {
                this.scene.triggerQuestEvent('npc:lydiaInteraction', { npc: this });
            }

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