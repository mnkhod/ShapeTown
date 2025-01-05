
// You can write more code here
import { mintFirstHarvestAchievement,mintGiftFromNatureAchievement,mintFirstFishAchievement } from "../../utility";


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

		this.npc = npc;

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
	
	/** @type {Phaser.GameObjects.Sprite} */
	questMark;
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
		{ msg : "Hello there… Welcome to Shaper Town. I’m Jack. This is my humble farm." },
		{ msg: `You haven’t chosen your ‘Profession’ yet. I will help you choose one today. So we shall start?` },
		{ msg: `First thing first, take these tools, those coming in handy, any time soon.` },
		{
			msg: `Those will be handy soon.`,
			onComplete: () => {
				// alert("Add Tools Icon to Inventory")
				this.itemHud.visible = true;
				this.itemHud.addItem("WATERING_CAN","IconBaseTools",0)
				this.itemHud.addItem("HOE","IconBaseTools",1)
				this.itemHud.addItem("PICK_AXE","IconBaseTools",2)
			}
		},
		{ msg: `Alright, I am giving you a Quest. Therefore, you may be spot on your Quest Book.` },
		{
			msg: `Alright, here’s your quest. You may see it in your quest book, good luck!`,
			onComplete: () => {
				this.bookHud.visible = true;
				this.scene.profilePrefab.visible = true;

				this.bookHud.play("bookLightingUpAnim")
			}
		},
		{ msg: `You have to plant some seeds for me.` },
		{
			msg: `Take these.`,
			onComplete: () => {
				this.itemHud.addItem("CARROT_SEED","SeedBag",0,5)
			}
		},
		{
			msg: `Go to the Cropland. Start working on it!`,
			onComplete: () => { }
		},
	]

	giftFromNatureDialogueLifeCycle = [
		{ msg : "Ho ho ho! Good job!" },
		{ msg: `So easy, wasn’t it?` },
		{ msg: `Ready for a new quest?` },
		{ msg: `Do you see those trees?` },
		{ msg: `That is an apple tree.` },
		{ msg: `My Quest is you have to bring something from all those trees.` },
	]

	firstFishDialogueLifeCycle = [
		{ msg : "Alright mate! Well done!" },
		{ msg: `I hope you are not tired already. Cause you have not completed my last Quest yet!` },
		{ msg: `Go to the Fishing Pond and catch 1 Blue Fin Salmon for me.` },
	]

	questEndDialogueLifeCycle = [
		{ msg : "I am glad i helped you, now our path going to split." },
		{ msg : "Good luck mate!" },
	]

	lifeCycleStep = 0;

	// Write your code here.

	prefabCreateCycle(){
		this.npc.on('pointerover', function (_pointer) {
			this.preFX.addGlow(16777215, 4, 0, false);
		});


		this.npc.on('pointerdown', async function (_pointer) {
			let distance = this.getDistance(this.player,this)

			if(distance > 60){
				this.scene.alertPrefab.alert("Too Far")
				return;
			}

			if(this.isMinting){
				this.scene.alertPrefab.alert("Minting")
				return;
			}

			if(!this.scene.achievements) return;

			let hasFirstFishNFT = this.scene.achievements.firstFishAchievement

			if(hasFirstFishNFT){
				this.msgPrefab.conversation(this.questEndDialogueLifeCycle)
				return;
			}

			let hasGiftFromNatureNFT = this.scene.achievements.giftFromNatureAchievement
			if(hasGiftFromNatureNFT){
				if(this.itemHud.checkItem("FISH")){
					this.questMark.play("AfterQuest");

					let hasNFT = this.scene.achievements.firstFishAchievement
					if(hasNFT){
						this.scene.alertPrefab.alert("Already Has Achievement NFT")
					}else{
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
			if(hasFirstHarvestNFT){
				if(this.itemHud.checkItem("APPLE")){
					this.questMark.play("AfterQuest");

					let hasNFT = this.scene.achievements.giftFromNatureAchievement
					if(hasNFT){
						this.scene.alertPrefab.alert("Already Has Achievement NFT")
					}else{
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


			if(this.itemHud.checkItem("CARROT")){
    			this.questMark.play("AfterQuest");

				let hasNFT = this.scene.achievements.firstHarvestAchievement
				if(hasNFT){
					this.scene.alertPrefab.alert("Already Has Achievement NFT")
				}else{
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
			}else{
				this.msgPrefab.conversation(this.firstHarvestDialogueLifeCycle)
			}

		},this);

		this.npc.on('pointerout', function (_pointer) {
			this.preFX.clear();
		});
	}



	getDistance(texture1, texture2) {
		return Phaser.Math.Distance.Between(
			texture1.x,
			texture1.y,
			texture2.x,
			texture2.y
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here