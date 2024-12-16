
// You can write more code here

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
		scene.events.on('create', this.prefabCreateCycle, this);
		npc.setInteractive({ useHandCursor: true });

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

	/* START-USER-CODE */

	dialogueLifeCycle = [
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
				this.bookHud.visible = true
				this.bookHud.play("bookLightingUpAnim")
			}
		},
		{ msg: `You have to plant some seeds for me.` },
		{
			msg: `Take these.`,
			onComplete: () => {
				this.itemHud.addItem("CARROT_SEED","SeedBag",0)
			}
		},
		{
			msg: `Go to the Cropland. Start working on it!`,
			onComplete: () => { }
		},
	]

	lifeCycleStep = 0;

	// Write your code here.

	prefabCreateCycle(){
		this.npc.on('pointerover', function (_pointer) {
			this.preFX.addGlow(16777215, 4, 0, false);
		});


		this.npc.on('pointerdown', function (_pointer) {
			let distance = this.getDistance(this.player,this)

			if(distance > 60){
				this.scene.alertPrefab.alert("Too Far")
				return;
			}

			if(this.itemHud.checkItem("CARROT")){
				this.scene.alertPrefab.alert("First Harvest Achievement")
			}else{
				this.msgPrefab.conversation(this.dialogueLifeCycle)
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
