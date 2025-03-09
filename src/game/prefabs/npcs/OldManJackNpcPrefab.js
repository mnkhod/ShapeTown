import { mintFirstHarvestAchievement, mintGiftFromNatureAchievement, mintFirstFishAchievement } from "../../utility";

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
        this.npc = npc
        this.nameBox = nameBox;

		/* START-USER-CTR-CODE */
        // Write your code here.

        const questMark = scene.add.sprite(0, -40, "GameNpcs1", 6);
        questMark.setScale(1.5);
        questMark.play("BeforeQuest");
        this.add(questMark);
        this.questMark = questMark;

        scene.events.on('create', this.prefabCreateCycle, this);
        npc.setInteractive({ useHandCursor: true });
        this.isMinting = false;

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
        { msg: "Hello there… Welcome to Shaper Town. I'm Jack. This is my humble farm." },
        { msg: "You haven't chosen your 'Profession' yet. I will help you choose one today. So we shall start?"},
        { msg: "First thing first, take these tools, those coming in handy, any time soon." },
        {
            msg: "Those will be handy soon.",
            onComplete: () => {
                this.newItemHud.visible = true;
                this.newItemHud.addItem("ToolPickaxe", "IconToolPickaxe", 0);
                this.newItemHud.addItem("ToolHoe", "IconToolHoe", 0);
                this.newItemHud.addItem("ToolWateringCan", "IconToolWateringCan", 0);
                this.newItemHud.addItem("ToolIronSword", "IconIronSword", 0);
                this.newItemHud.forceSelectTool("ToolPickaxe");
            }
        },
        { msg: "Alright, I am giving you a Quest. Therefore, you may be spot on your Quest Book." },
        {
            msg: "Alright, here's your quest. You may see it in your quest book, good luck!",
            onComplete: () => {
                this.bookHud.visible = true;
                this.scene.profilePrefab.visible = true;
                this.bookHud.play("bookLightingUpAnim")
            }
        },
        { msg: "You have to plant some seeds for me." },
        {
            msg: "Here are your platform passes.",
            onComplete: () => {
                this.newItemHud.addItem("seed_carrot", "crops-seed bags-carrot", 0, 5);
                this.newItemHud.addItem("seed_radish", "crops-seed bags-radish", 0, 2);
            }
        },
        {
            msg: "Go to the Cropland. Start working on it!",
            onComplete: () => { }
        },
    ]

    tasteOfGoldDialogueLifeCycle = [
        { msg: "Well done with the harvest! I'm impressed by your farming skills." },
        { msg: "Now that you've learned the basics of farming, it's time to learn about trading." },
        { msg: "There's a merchant named Lydia in Shape Town who can help you sell your goods." },
        { 
            msg: "I have some iron bars that need to be sold. Could you take them to Lydia for me?",
            onComplete: () => {
                // Check if iron bars were already given
                if (!this.newItemHud.checkItem("Ironbar")) {
                    this.newItemHud.addItem("Ironbar", "Icon_IronBar", 0, 3);
                }
                
                if (this.scene.alertPrefab) {
                    this.scene.alertPrefab.alert("New Quest: Taste of Gold");
                }
                
                this.questMark.play("BeforeQuest");
            }
        },
        { msg: "Head to Shape Town - it's northeast from here. Just follow the path." },
        { msg: "Find Lydia at her merchant stall and sell these goods to her." },
        { 
            msg: "She'll give you a good price. Come back when you're done!",
            onComplete: () => {
                // Activate Quest #002
                if (this.scene.triggerQuestEvent) {
                    this.scene.triggerQuestEvent('quest:taste-of-gold-activated', { npc: this });
                }
            }
        }
    ]

    questEndDialogueLifeCycle = [
        { msg: "I am glad i helped you, now our path going to split." },
        { msg: "Good luck mate!" },
    ]

    lifeCycleStep = 0;

    // Write your code here.

    prefabCreateCycle() {
        console.log('Prefab create cycle started');

        this.npc.on('pointerover', function (_pointer) {
            console.log('Mouse over NPC');  // Debug log
            this.preFX.addGlow(16777215, 4, 0, false);
            this.parentContainer.nameBox.setVisible(true);
        });

        this.npc.on('pointerout', function (_pointer) {
            console.log('Mouse out of NPC');  // Debug log
            this.preFX.clear();
            this.parentContainer.nameBox.setVisible(false);
        });

        this.npc.on('pointerdown', async function (_pointer) {
            console.log("Jack NPC clicked");
            
            if (this.scene.triggerQuestEvent) {
                console.log("Triggering Jack interaction quest event");
                this.scene.triggerQuestEvent('npc:jackInteraction', { npc: this });
            } else {
                console.log("triggerQuestEvent not available on scene");
            }
            
            let distance = this.getDistance(this.player, this)
        
            if (distance > 60) {
                this.scene.alertPrefab.alert("Too Far")
                return;
            }
        
            if (this.isMinting) {
                this.scene.alertPrefab.alert("Minting")
                return;
            }
        
            if (!this.scene.achievements) return;
        
            // ADD CONSOLE LOGS HERE TO DEBUG
            console.log("Achievements state:", this.scene.achievements);
            console.log("Has firstHarvestAchievement:", this.scene.achievements.firstHarvestAchievement);
            console.log("Quest 002 active:", this.scene.questSystem?.isQuestActive("002"));
            console.log("Quest 002 completed:", this.scene.questSystem?.isQuestCompleted("002"));
        
            // Check if player has completed the first quest but hasn't started the second
            if (this.scene.achievements.firstHarvestAchievement === true && 
                (!this.scene.questSystem?.isQuestActive("002")) && 
                (!this.scene.questSystem?.isQuestCompleted("002"))) {
                
                console.log("Starting Taste of Gold dialogue!");
                this.msgPrefab.conversation(this.tasteOfGoldDialogueLifeCycle);
                return;
            }
        
            let hasFirstFishNFT = this.scene.achievements.firstFishAchievement
        
            if (hasFirstFishNFT) {
                this.msgPrefab.conversation(this.questEndDialogueLifeCycle)
                return;
            }
        
            let hasGiftFromNatureNFT = this.scene.achievements.giftFromNatureAchievement
            if (hasGiftFromNatureNFT) {
                if (this.newItemHud.checkItem("FISH")) {
                    this.questMark.play("AfterQuest");
        
                    let hasNFT = this.scene.achievements.firstFishAchievement
                    if (hasNFT) {
                        this.scene.alertPrefab.alert("Already Has Achievement NFT")
                    } else {
                        this.isMinting = true;
                        this.scene.alertPrefab.alert("Minting Has Started")
                        /* 
                        await mintFirstFishAchievement({
                            onSuccess: () => {
                                this.scene.alertPrefab.alert("First Fish Achievement")
                                this.scene.achievements.firstFishAchievement = true;
        
                                this.newItemHud.removeItemByKey("FISH")
                            },
                            onError: () => this.scene.alertPrefab.alert("Contract Error Occurred"),
                        })
                        */
                        // Simulated minting
                        const prefab = this;
                        setTimeout(() => {
                            this.scene.alertPrefab.alert("First Fish Achievement");
                            this.scene.achievements.firstFishAchievement = true;
                            this.newItemHud.removeItemByKey("FISH");
                            this.isMinting = false;
                        }, 1500);
                    }
                    return;
                }
        
                this.msgPrefab.conversation(this.firstFishDialogueLifeCycle)
                return;
            }
        
            let hasFirstHarvestNFT = this.scene.achievements.firstHarvestAchievement
            if (hasFirstHarvestNFT) {
                if (!this.scene.questSystem?.isQuestActive("002") && 
                    !this.scene.questSystem?.isQuestCompleted("002")) {
                    
                    console.log("Starting Taste of Gold dialogue because Quest #002 isn't active yet!");
                    this.msgPrefab.conversation(this.tasteOfGoldDialogueLifeCycle);
                    return;
                }
                if (this.newItemHud.checkItem("APPLE")) {
                    this.questMark.play("AfterQuest");
        
                    let hasNFT = this.scene.achievements.giftFromNatureAchievement
                    if (hasNFT) {
                        this.scene.alertPrefab.alert("Already Has Achievement NFT")
                    } else {
                        this.isMinting = true;
                        this.scene.alertPrefab.alert("Minting Has Started")
                        /*
                        await mintGiftFromNatureAchievement({
                            onSuccess: () => {
                                this.scene.alertPrefab.alert("Gift From Nature Achievement")
                                this.scene.achievements.giftFromNatureAchievement = true;
        
                                this.newItemHud.removeItemByKey("APPLE")
                            },
                            onError: () => this.scene.alertPrefab.alert("Contract Error Occurred"),
                        })
                        */
                        // Simulated minting
                        const prefab = this;
                        setTimeout(() => {
                            this.scene.alertPrefab.alert("Gift From Nature Achievement");
                            this.scene.achievements.giftFromNatureAchievement = true;
                            this.newItemHud.removeItemByKey("APPLE");
                            this.isMinting = false;
                        }, 1500);
                    }
                    return;
                }
        
                // If they have the first harvest achievement but don't have an apple,
                // check if quest 002 is active
                if (this.scene.questSystem?.isQuestActive("002")) {
                    this.msgPrefab.conversation([{ msg: "Have you found Lydia yet? She's in town at the merchant stall." }]);
                    return;
                }
                const dialogue = this.giftFromNatureDialogueLifeCycle || [
                    { msg: "You've done well with farming. Now try to find some gifts from nature!" },
                    { msg: "Apple trees can be found around the farm. They're nature's gift!" }
                ];
                // this.msgPrefab.conversation(this.giftFromNatureDialogueLifeCycle)
                this.msgPrefab.conversation(dialogue);
                return;
            }
        
            // Check if they have a carrot to complete the first quest
            if (this.newItemHud.checkItem("CARROT")) {
                this.questMark.play("AfterQuest");
                
                let hasNFT = this.scene.achievements.firstHarvestAchievement;
                if (hasNFT) {
                    this.scene.alertPrefab.alert("Already Has Achievement NFT");
                } else {
                    this.isMinting = true;
                    this.scene.alertPrefab.alert("Minting Has Started");
                    
                    // Simulated minting
                    const prefab = this;
                    setTimeout(() => {
                        this.scene.alertPrefab.alert("First Harvest Achievement");
                        this.scene.achievements.firstHarvestAchievement = true;
                        this.newItemHud.removeItemByKey("CARROT");
                        this.isMinting = false;
                        
                        // Make sure Quest #001 is completed in the quest system
                        if (this.scene.questSystem && !this.scene.questSystem.isQuestCompleted("001")) {
                            // Force complete Quest #001
                            console.log("Forcing completion of Quest #001");
                            this.scene.questSystem.completeQuest("001");
                        }
                        
                        // Make sure Quest #002 is NOT active yet
                        if (this.scene.questSystem && this.scene.questSystem.isQuestActive("002")) {
                            console.log("Quest #002 is already active, deactivating it");
                            this.scene.questSystem.activeQuests.delete("002");
                        }
                        
                        // Show the Taste of Gold dialogue with a delay
                        setTimeout(() => {
                            console.log("Showing Taste of Gold dialogue");
                            // Give the player iron bars for the quest
                            prefab.newItemHud.addItem("Ironbar", "Icon_IronBar", 0, 3);
                            
                            // Show the Taste of Gold dialogue
                            prefab.msgPrefab.conversation(prefab.tasteOfGoldDialogueLifeCycle);
                            
                            // NOTE: Quest #002 will be activated at the end of the dialogue
                            // in the tasteOfGoldDialogueLifeCycle's last message onComplete callback
                        }, 2000);
                    }, 1500);
                }
                return;
            } else {
                // If they don't have a carrot and don't have the achievement,
                // show the first harvest dialogue
                if (!this.scene.achievements.firstHarvestAchievement) {
                    this.msgPrefab.conversation(this.firstHarvestDialogueLifeCycle);
                } else {
                    // Otherwise, show the appropriate dialogue based on quest status
                    if (this.scene.questSystem?.isQuestActive("002")) {
                        this.msgPrefab.conversation([{ msg: "Have you found Lydia yet? She's in town at the merchant stall." }]);
                    } else if (this.scene.questSystem?.isQuestCompleted("002")) {
                        this.msgPrefab.conversation([{ msg: "Great job selling those goods! You're becoming quite the trader." }]);
                    } else {
                        // Fallback to taste of gold dialogue
                        this.msgPrefab.conversation(this.tasteOfGoldDialogueLifeCycle);
                    }
                }
            }
        }, this);
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
        this.dialogueText.setText('');

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
            repeat: text.length - 1
        });
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here