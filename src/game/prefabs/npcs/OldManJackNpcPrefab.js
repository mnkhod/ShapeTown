
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OldManJackNpcPrefab extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 24, y ?? 26, texture || "GameNpcs1", frame ?? 0);

		this.scaleX = 1.5;
		this.scaleY = 1.5;
		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.setSize(32, 32, false);
		this.play("npcHarvestStandingAnim");

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.events.on('create', this.prefabCreateCycle, this);
		this.setInteractive({ useHandCursor: true });

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.GameObject} */
	player;

	/* START-USER-CODE */

	dialogueLifeCycle = [
		{
			msgs: [
				 "Hello there… Welcome to Shaper Town. I’m Jack. This is my humble farm.",
				 `You haven’t chosen your ‘Profession’ yet. I will help you choose one today. So we shall start?`
			],
			onComplete: () => {
				alert("Conversation Done")
			}
		},
		{
			msgs: [
				 `First thing first, take these tools, those coming in handy, any time soon.`,
				 `Those will be handy soon.`
			],
			onComplete: () => {
				alert("Add Tools Icon to Inventory")
			}
		},
		{
			msgs: [
				 `Alright, I am giving you a Quest. Therefore, you may be spot on your Quest Book.`,
				 `Alright, here’s your quest. You may see it in your quest book, good luck!`
			],
			onComplete: () => {
				alert("Quest Book Lights Up")
			}
		},
		{
			msgs: [
				 `You have to plant some seeds for me.`,
				 `Take these.`
			],
			onComplete: () => {
				alert("Carrot Seeds Gets Added To Inventory")
			}
		},
		{
			msgs: [
				 `Go to the Cropland. Start working on it!`
			],
			onComplete: () => {},
		},
	]

	lifeCycleStep = 0;

	// Write your code here.

	prefabCreateCycle(){
		this.on('pointerover', function (_pointer) {
			this.preFX.addGlow(16777215, 4, 0, false);
		});

		this.on('pointerdown', function (_pointer) {
			let distance = this.getDistance(this.player,this)

			if(distance > 60){
				alert("Too Far")
				return;
			}

			if(this.lifeCycleStep >= this.dialogueLifeCycle.length){
				let lastDialogue = this.dialogueLifeCycle[this.lifeCycleStep - 1]
				let msg = lastDialogue.msgs[lastDialogue.msgs.length - 1]
				alert(msg)
				return;
			}

			this.dialogueLifeCycle.map((dialogue) => {
				dialogue.msgs.map((msg) => {
					alert(msg)
				})

				dialogue.onComplete()
				this.lifeCycleStep += 1;
			})
		});

		this.on('pointerout', function (_pointer) {
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
