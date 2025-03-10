// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { MERCHANT_TYPES, getMerchantInventory } from '../../../components/merchant-manager';
import questSystem from '../../../components/QuestSystem';
/* END-USER-IMPORTS */

export default class FoodMerchant extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 32, y ?? 32);

        const npc = scene.add.sprite(0, 0, "GameNpcs1", 18);
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
        
        this.npc = npc;
        this.questMark = questMark;

        /* START-USER-CTR-CODE */
        scene.events.on('create', this.prefabCreateCycle, this);
        npc.setInteractive({ useHandCursor: true });
        this.merchantType = MERCHANT_TYPES.FOOD;
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

    /* START-USER-CODE */

    prefabCreateCycle() {
        this.npc.on('pointerover', function (_pointer) {
            this.preFX.addGlow(16777215, 4, 0, false);
        });

        this.npc.on('pointerdown', function (_pointer) {
            let distance = this.getDistance(this.player, this);

            if (distance > 100) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }
            
            // Mark Lily as greeted for Quest #003
            if (this.scene.markNPCGreeted) {
                this.scene.markNPCGreeted("Lily");
            }
            
            // Trigger Lily interaction for Quest #008
            if (this.scene.triggerQuestEvent) {
                this.scene.triggerQuestEvent('npc:lilyInteraction', { npc: this });
                
                // Check if we're in the right state for starting Quest #008
                if (questSystem && questSystem.isQuestCompleted("001") && 
                    !questSystem.isQuestActive("008") && !questSystem.isQuestCompleted("008")) {
                    // Start the Yam, Yam quest
                    this.scene.triggerQuestEvent('npc:lilyRecipeQuest', { npc: this });
                }
                
                // Check if we have cooked Carrot Soup for Quest #008
                if (questSystem && questSystem.isQuestActive("008") && 
                    this.scene.registry.get('carrotSoupCooked')) {
                    // Complete the quest
                    this.scene.triggerQuestEvent('cooking:recipeCooked', { 
                        recipeName: 'Carrot Soup',
                        success: true,
                        npc: this
                    });
                    
                    // Reset the flag
                    this.scene.registry.set('carrotSoupCooked', false);
                }
            }
            
            // Standard dialogue
            const dialogueLines = [
                { 
                    msg: "Welcome to my food stall! Fresh and delicious meals ready for you!",
                    options: [
                        { 
                            text: "I want to buy food", 
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
                                    this.scene.reactEvent.emit("show-shop-sell-modal", this);
                                }
                            },
                            nextDialogue: 1
                        },
                        { 
                            text: "Just looking around", 
                            nextDialogue: [
                                { msg: "Take your time! My food isn't going anywhere... well, except into someone's belly!" }
                            ]
                        }
                    ]
                },
                { msg: "Enjoy your meal! Come back for seconds!" }
            ];

            this.msgPrefab.conversation(dialogueLines);
        }, this);

        this.npc.on('pointerout', function (_pointer) {
            this.preFX.clear();
        });
        
        // Set up listener for cooking events
        if (this.scene.events) {
            this.scene.events.on('carrot-soup-cooked', this.handleCarrotSoupCooked, this);
        }
    }
    
    // Handler for when Carrot Soup is cooked
    handleCarrotSoupCooked() {
        console.log("Carrot Soup cooked event received");
        
        // Set a flag that can be checked when talking to Lily
        this.scene.registry.set('carrotSoupCooked', true);
        
        // Show notification
        if (this.scene.alertPrefab) {
            this.scene.alertPrefab.alert("You've cooked Carrot Soup! Return to Lily to complete the quest.");
        }
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

    // Method to get merchant-specific inventory
    getInventory() {
        // Get base inventory
        const inventory = getMerchantInventory(this.merchantType);
        
        // Make sure the Carrot Soup Recipe is properly set up for Quest #008
        const carrotSoupRecipeIndex = inventory.findIndex(item => item.id === 'recipe_carrot_soup');
        
        if (carrotSoupRecipeIndex >= 0) {
            // Update the item
            inventory[carrotSoupRecipeIndex] = {
                ...inventory[carrotSoupRecipeIndex],
                name: 'Carrot Soup Recipe',
                description: 'Recipe for delicious Carrot Soup. Required for Lily\'s quest.',
                category: 'recipe',
                buyPrice: 50,
                sellPrice: 0  
            };
        }
        
        return inventory;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here