// You can write more code here
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

         // Add nameBox sprite with debug options
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
	itemHud;
	/** @type {Phaser.GameObjects.GameObject} */
	bookHud;
	/** @type {Phaser.GameObjects.GameObject} */
	profilePrefab;

	/* START-USER-CODE */

    firstHarvestDialogueLifeCycle = [
        { msg: "Welcome aboard to Shaper Town! I'm Jack, your friendly conductor. This is my charming train station." },
        { msg: "I see you haven't chosen your 'Travel Class' yet. Let me help you pick one today. Ready to begin?"},
        { msg: "To start your journey, here are your travel essentials - they'll be quite useful along the way." },
        {
            msg: "These tools will make your adventure much smoother.",
            onComplete: () => {
                this.itemHud.visible = true;
                this.itemHud.addItem("WATERING_CAN", "IconBaseTools", 0)
                this.itemHud.addItem("HOE", "IconBaseTools", 1)
                this.itemHud.addItem("PICK_AXE", "IconBaseTools", 2)
            }
        },
        { msg: "Now, I have a special travel mission for you. You can track it in your Journey Log." },
        {
            msg: "Here's your first adventure quest. Check your travel log for details. Safe travels!",
            onComplete: () => {
                this.bookHud.visible = true;
                this.scene.profilePrefab.visible = true;
                this.bookHud.play("bookLightingUpAnim")
            }
        },
        { msg: "Your first task is to prepare the station platform." },
        {
            msg: "Here are your platform passes.",
            onComplete: () => {
                this.itemHud.addItem("CARROT_SEED", "SeedBag", 0, 5)
            }
        },
        {
            msg: "Head to Platform One and begin your railway adventure!",
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
        // Log when the cycle starts
        console.log('Prefab create cycle started');

        // Mouse over event - Show name and glow
        this.npc.on('pointerover', function (_pointer) {
            console.log('Mouse over NPC');  // Debug log
            this.preFX.addGlow(16777215, 4, 0, false);
            this.parentContainer.nameBox.setVisible(true);
        });

        // Mouse out event - Hide name and remove glow
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
                if (this.itemHud.checkItem("FISH")) {
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

                                this.itemHud.removeItemByKey("FISH")
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
                if (this.itemHud.checkItem("APPLE")) {
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

                                this.itemHud.removeItemByKey("APPLE")
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

            if (this.itemHud.checkItem("CARROT")) {
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
                            this.itemHud.removeItemByKey("CARROT")
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