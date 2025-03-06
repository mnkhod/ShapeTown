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

    giftFromNatureDialogueLifeCycle = [
        { msg: "Ho ho ho! Good job!" },
        { msg: `So easy, wasn't it?` },
        { msg: `Ready for a new quest?` },
        { msg: `Do you see those trees?` },
        { msg: `That is an apple tree.` },
        { msg: `My Quest is you have to bring something from all those trees.` },
    ]

    firstFishDialogueLifeCycle = [
        { msg: "Alright mate! Well done!" },
        { msg: `I hope you are not tired already. Cause you have not completed my last Quest yet!` },
        { msg: `Go to the Fishing Pond and catch 1 Blue Fin Salmon for me.` },
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
                        await mintFirstFishAchievement({
                            onSuccess: () => {
                                this.scene.alertPrefab.alert("First Fish Achievement")
                                this.scene.achievements.firstFishAchievement = true;

                                this.newItemHud.removeItemByKey("FISH")
                            },
                            onError: () => this.scene.alertPrefab.alert("Contract Error Occurred"),
                        })
                        this.isMinting = false;
                    }

                    return;
                }

                this.msgPrefab.conversation(this.firstFishDialogueLifeCycle)
                return;
            }

            let hasFirstHarvestNFT = this.scene.achievements.firstHarvestAchievement
            if (hasFirstHarvestNFT) {
                if (this.newItemHud.checkItem("APPLE")) {
                    this.questMark.play("AfterQuest");

                    let hasNFT = this.scene.achievements.giftFromNatureAchievement
                    if (hasNFT) {
                        this.scene.alertPrefab.alert("Already Has Achievement NFT")
                    } else {
                        this.isMinting = true;
                        this.scene.alertPrefab.alert("Minting Has Started")
                        await mintGiftFromNatureAchievement({
                            onSuccess: () => {
                                this.scene.alertPrefab.alert("Gift From Nature Achievement")
                                this.scene.achievements.giftFromNatureAchievement = true;

                                this.newItemHud.removeItemByKey("APPLE")
                            },
                            onError: () => this.scene.alertPrefab.alert("Contract Error Occurred"),
                        })
                        this.isMinting = false;
                    }

                    return;
                }

                this.msgPrefab.conversation(this.giftFromNatureDialogueLifeCycle)
                return;
            }

            if (this.newItemHud.checkItem("CARROT")) {
                this.questMark.play("AfterQuest");

                let hasNFT = this.scene.achievements.firstHarvestAchievement
                if (hasNFT) {
                    this.scene.alertPrefab.alert("Already Has Achievement NFT")
                } else {
                    this.isMinting = true;
                    this.scene.alertPrefab.alert("Minting Has Started")
                    await mintFirstHarvestAchievement({
                        onSuccess: () => {
                            this.scene.alertPrefab.alert("First Harvest Achievement")

                            this.scene.achievements.firstHarvestAchievement = true;
                            this.newItemHud.removeItemByKey("CARROT")
                        },
                        onError: () => this.scene.alertPrefab.alert("Contract Error Occurred"),
                    })
                    this.isMinting = false;
                }
                return
            } else {
                this.msgPrefab.conversation(this.firstHarvestDialogueLifeCycle)
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