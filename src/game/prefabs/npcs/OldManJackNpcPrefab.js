
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
			}
		},
		{ msg: `Alright, I am giving you a Quest. Therefore, you may be spot on your Quest Book.` },
		{
			msg: `Alright, here’s your quest. You may see it in your quest book, good luck!`,
			onComplete: () => {
				alert("Quest Book Lights Up")
			}
		},
		{ msg: `You have to plant some seeds for me.` },
		{
			msg: `Take these.`,
			onComplete: () => {
				alert("Carrot Seeds Gets Added To Inventory")
			}
		},
		{
			msg: `Go to the Cropland. Start working on it!`,
			onComplete: () => {
				alert("Conversation Done")
			}
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
				alert("Too Far")
				return;
			}

			this.msgPrefab.conversation(this.dialogueLifeCycle)

			// if(this.lifeCycleStep >= this.dialogueLifeCycle.length){
			// 	let lastDialogue = this.dialogueLifeCycle[this.lifeCycleStep - 1]
			// 	let msg = lastDialogue.msgs[lastDialogue.msgs.length - 1]
			// 	alert(msg)
			// 	return;
			// }

			// this.dialogueLifeCycle.map((dialogue) => {
			// 	dialogue.msgs.map((msg) => {
			// 		alert(msg)
			// 	})

			// 	dialogue.onComplete()
			// 	this.lifeCycleStep += 1;
			// })
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
