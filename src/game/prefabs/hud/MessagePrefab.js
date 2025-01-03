
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MessagePrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? -0.04645841657811656, y ?? -0.002866411641057276);

		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.setSize(100, 89, false);

		// bg
		const bg = scene.add.image(150, 45, "MessageBox_1");
		bg.scaleX = 0.46457169907734824;
		bg.scaleY = 0.46457169907734824;
		this.add(bg);

		// msg
		const msg = scene.add.text(150, 45, "", {});
		msg.scaleX = 1.0077466928617544;
		msg.scaleY = 1.0077466928617544;
		msg.setOrigin(0.5, 0.5);
		msg.text = "New text";
		msg.setStyle({ "align": "center", "color": "#000", "fixedWidth": 200, "fontFamily": "Little Malio 8-Bit", "fontSize": "20px", "maxLines": 3, "stroke": "#000" });
		msg.setLineSpacing(3);
		msg.setWordWrapWidth(200, true);
		this.add(msg);

		this.bg = bg;
		this.msg = msg;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.visible = false

		this.scene.events.on('update', this.onSceneUpdate, this);
		bg.setInteractive({ useHandCursor: true });

		bg.on('pointerdown', function (_pointer) {
			if(this.isConversationStarted == false) return;
			if(this.dialogue == null) return;

			this.conversationIndex += 1;
			if(this.conversationIndex >= this.conversationMaxIndex){
				this.hide()
				return;
			}

			let dialogue = this.dialogue[this.conversationIndex]
			this.msg.text = dialogue.msg
			if(dialogue.onComplete != null){
				dialogue.onComplete()
			}
		},this)

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	bg;
	/** @type {Phaser.GameObjects.Text} */
	msg;

	/* START-USER-CODE */

	dialogue = null;
	isConversationStarted = false;
	conversationIndex = 0;
	conversationMaxIndex = 0;

	// Write your code here.

	onSceneUpdate(){
		if(this.visible){
			const cam = this.scene.cameras.main;

			let fullWidth = Math.floor(this.getBounds().width)
			let fullHeight = Math.floor(this.getBounds().height)

			let newX = cam.worldView.centerX - ( fullWidth / 2) + 10
			let newY = cam.worldView.centerY + fullHeight

			this.setPosition(
				Phaser.Math.Linear(this.x, newX, 0.03),
				Phaser.Math.Linear(this.y, newY, 0.03),
			);
		}
	}

	conversation(conversationData){
		if(this.isConversationStarted) return;

		this.visible = true;
		this.dialogue = conversationData;
		this.isConversationStarted = true;
		this.conversationMaxIndex = conversationData.length

		let index = this.conversationIndex;

		let dialogue = conversationData[index]
		this.msg.text = dialogue.msg
	}

	show(){
		this.visible = true
	}

	hide(){
		this.visible = false
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
