
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MessagePrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? -0.04645841657811656, y ?? -0.002866411641057276);

		// bg
		const bg = scene.add.image(150, 45, "MessageBox");
		bg.scaleX = 0.5091429221209207;
		bg.scaleY = 0.5091429221209207;
		this.add(bg);

		// msg
		const msg = scene.add.text(150, 45, "", {});
		msg.setOrigin(0.5, 0.5);
		msg.text = "New text";
		msg.setStyle({ "fontSize": "12px" });
		this.add(msg);

		this.bg = bg;
		this.msg = msg;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	bg;
	/** @type {Phaser.GameObjects.Text} */
	msg;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
