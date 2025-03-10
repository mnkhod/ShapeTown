// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { MERCHANT_TYPES, getMerchantInventory } from '../../../components/merchant-manager';
/* END-USER-IMPORTS */

export default class BlackSmithPrefab extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x ?? 32, y ?? 32);

        const npc = scene.add.sprite(0, 0, "NpcBlaksmith", 0);
        npc.scaleX = 0.75;
        npc.scaleY = 0.75;
        scene.physics.add.existing(npc, false);
        npc.body.allowGravity = false;
        npc.body.setSize(32, 32, false);
        npc.play("NpcBlackSmithRight");
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
        this.currentDialogueIndex = 0;
        this.merchantType = MERCHANT_TYPES.BLACKSMITH;
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

    greetings = [
        "No gold No Blade. What do you want?",
        "Are you Blind? I am busy here. Tell me what you want from me.",
        "No time to chit-chat! What do you want? Name it!"
    ];

    prefabCreateCycle() {
        this.npc.on('pointerover', function (_pointer) {
            this.preFX.addGlow(16777215, 4, 0, false);
        });

        this.npc.on('pointerdown', function (_pointer) {
            let distance = this.getDistance(this.player, this);

            if (distance > 60) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }
            if (this.scene.markNPCGreeted) {
                this.scene.markNPCGreeted("Rowan");
            }
            const currentGreeting = this.greetings[this.currentDialogueIndex];
            
            this.currentDialogueIndex = (this.currentDialogueIndex + 1) % this.greetings.length;
            
            const dialogueLines = [
                { 
                    msg: currentGreeting,
                    options: [
                        { 
                            text: "I want to buy weapons and tools", 
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
                            text: "Just looking at your craftsmanship", 
                            nextDialogue: [
                                { msg: "Fine, look all you want. Don't touch anything unless you're buying it!" }
                            ]
                        }
                    ]
                },
                { msg: "Deal done. Now get out of my way, I have work to do!" }
            ];

            this.msgPrefab.conversation(dialogueLines);

        }, this);

        this.npc.on('pointerout', function (_pointer) {
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

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here