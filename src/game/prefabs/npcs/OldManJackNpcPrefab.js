import { mintFirstHarvestAchievement } from "../../utility";

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
        this.lifeCycleStep = 0;

        this.dailyQuestCompleted = false;
        
        this.checkNewDay();
        
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
                this.newItemHud.addItem("seed_carrot", "crops-seed bags-carrot", 0, 2);
            }
        },
        {
            msg: "Go to the Cropland. Start working on it!",
            onComplete: () => { }
        },
    ]

    firstHarvestReminderDialogueLifeCycle = [
        { msg: "Have you planted and harvested your crops yet? I need a carrot to see your progress." },
        { msg: "Remember to use your hoe on the cropland, plant the seeds, water them, and wait for them to grow." },
        { msg: "Bring me a carrot when you've harvested one!" }
    ]

    tasteOfGoldDialogueLifeCycle = [
        { msg: "Well done with the harvest! I'm impressed by your farming skills." },
        { msg: "Now that you've learned the basics of farming, it's time to learn about trading." },
        { msg: "There's a merchant named Lydia in Shape Town who can help you sell your goods." },
        { 
            msg: "I have some iron bars that need to be sold. Could you take them to Lydia for me?",
            onComplete: () => {
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

    tasteOfGoldReminderDialogueLifeCycle = [
        { msg: "Have you found Lydia yet? She's in town at the merchant stall." },
        { msg: "Don't forget to sell those iron bars I gave you. Head northeast to Shape Town and find Lydia." }
    ]

    everyDayQuestDialogueLifeCycle = [
        { msg: "Hello there! I'm running low on carrots for my stew." },
        { msg: "Could you bring me 5 carrots today? I'll reward you with some seeds." },
        { 
            msg: "It's a simple task, but it helps me out a lot!",
            onComplete: () => {
                if (this.scene.questSystem && !this.scene.questSystem.isQuestActive("012")) {
                    this.scene.questSystem.activateQuest("012");
                    if (this.scene.alertPrefab) {
                        this.scene.alertPrefab.alert("Daily Quest: Every day!");
                    }
                }
            }
        }
    ]

    everyDayQuestReminderDialogueLifeCycle = [
        { msg: "Have you got those 5 carrots for me yet?" },
        { msg: "My stew won't be the same without them!" }
    ]
    
    everyDayQuestCompletedDialogueLifeCycle = [
        { msg: "Thanks for the carrots! They'll make a fine stew." },
        { msg: "Here are some carrot seeds as promised. Come back tomorrow if you want to help again!" },
        {
            msg: "Happy farming!",
            onComplete: () => {
                this.dailyQuestCompleted = true;
                this.saveQuestState();
                
                if (this.scene.questSystem && this.scene.questSystem.isQuestActive("012")) {
                    this.scene.questSystem.completeQuest("012");
                }
            }
        }
    ]
    
    checkNewDay() {
        const currentDate = new Date().toDateString();
        const lastDate = localStorage.getItem('lastQuestDate');
        
        if (lastDate !== currentDate) {
            this.dailyQuestCompleted = false;
            localStorage.setItem('lastQuestDate', currentDate);
            
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
        localStorage.setItem('jackDailyQuestCompleted', this.dailyQuestCompleted.toString());
    }
    
    loadQuestState() {
        const saved = localStorage.getItem('jackDailyQuestCompleted');
        if (saved !== null) {
            this.dailyQuestCompleted = saved === 'true';
        }
    }

    prefabCreateCycle() {
        console.log('Prefab create cycle started');

        this.npc.on('pointerover', function (_pointer) {
            console.log('Mouse over NPC');
            this.preFX.addGlow(16777215, 4, 0, false);
            this.parentContainer.nameBox.setVisible(true);
        });

        this.npc.on('pointerout', function (_pointer) {
            console.log('Mouse out of NPC');
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
        
            if (this.scene.questSystem?.isQuestCompleted("002")) {
                console.log("Taste of Gold completed, handling daily quest");
                
                const currentCarrots = this.newItemHud.getItemCount("CARROT") || 0;
                if (currentCarrots >= 5) {
                    console.log("Player had", currentCarrots, "carrots, removing exactly 5");

                    this.newItemHud.removeItemByKey("CARROT");

                    if (currentCarrots > 5) {
                        const remainingCarrots = currentCarrots - 5;
                        console.log("Adding back", remainingCarrots, "carrots");
                        this.newItemHud.addItem("CARROT", "crops-carrot", 0, remainingCarrots);
                    }

                    console.log("Adding 5 carrot seeds");
                    this.newItemHud.addItem("seed_carrot", "crops-seed bags-carrot", 0, 5);

                    this.msgPrefab.conversation(this.everyDayQuestCompletedDialogueLifeCycle);
                } else {
                    if (this.scene.questSystem && !this.scene.questSystem.isQuestActive("012")) {
                        this.scene.questSystem.activateQuest("012");
                    }
                    this.msgPrefab.conversation(this.everyDayQuestDialogueLifeCycle);
                }
                return;
            }
            
            if (this.scene.achievements.firstHarvestAchievement && this.scene.questSystem?.isQuestActive("002")) {
                this.msgPrefab.conversation(this.tasteOfGoldReminderDialogueLifeCycle);
                return;
            }
            
            if (this.scene.achievements.firstHarvestAchievement && 
                !this.scene.questSystem?.isQuestActive("002") && 
                !this.scene.questSystem?.isQuestCompleted("002")) {
                
                this.msgPrefab.conversation(this.tasteOfGoldDialogueLifeCycle);
                return;
            }
            
            if (this.newItemHud.checkItem("CARROT")) {
                this.questMark.play("AfterQuest");
                
                if (this.scene.achievements.firstHarvestAchievement) {
                    this.scene.alertPrefab.alert("Already Has Achievement NFT");
                } else {
                    this.isMinting = true;
                    this.scene.alertPrefab.alert("Minting Has Started");
                    
                    const prefab = this;
                    setTimeout(() => {
                        this.scene.alertPrefab.alert("First Harvest Achievement");
                        this.scene.achievements.firstHarvestAchievement = true;
                        this.newItemHud.removeItemByKey("CARROT");
                        this.isMinting = false;
                        
                        if (this.scene.questSystem && !this.scene.questSystem.isQuestCompleted("001")) {
                            console.log("Forcing completion of Quest #001");
                            this.scene.questSystem.completeQuest("001");
                        }
                        
                        if (this.scene.questSystem && this.scene.questSystem.isQuestActive("002")) {
                            console.log("Quest #002 is already active, deactivating it");
                            this.scene.questSystem.activeQuests.delete("002");
                        }
                        
                        setTimeout(() => {
                            console.log("Showing Taste of Gold dialogue");
                            this.newItemHud.addItem("IronIngot", "Icon_IronBar", 0, 3);
                            
                            prefab.msgPrefab.conversation(prefab.tasteOfGoldDialogueLifeCycle);
                        }, 2000);
                    }, 1500);
                }
                return;
            }
            
            // If they don't have a carrot and don't have the achievement,
            // Check if this is their first time talking to Jack
            // or if they need a reminder
            if (this.lifeCycleStep === 0) {
                // First time talking to Jack
                this.msgPrefab.conversation(this.firstHarvestDialogueLifeCycle);
                this.lifeCycleStep = 1; // Mark that they've talked to Jack before
            } else {
                // They've talked to Jack before, show the reminder dialogue
                this.msgPrefab.conversation(this.firstHarvestReminderDialogueLifeCycle);
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