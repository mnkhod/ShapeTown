
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class QuestBookPrefab extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 35, y ?? 35, texture || "Book", frame ?? 1);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.setInteractive({ useHandCursor: true });
		this.on('pointerdown', () => {
			if(this.scene.reactEvent == undefined) throw Error("REACT EVENT BUS NOT HOOKED IN")
			this.scene.reactEvent.emit("show-quest-modal", this.scene);
		},this)
		this.scene.events.on('update', this.onSceneUpdate, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	onSceneUpdate() {
		// if(this.visible == false) return;

		const cam = this.scene.cameras.main;

		let fullWidth = Math.floor(this.getBounds().width)
		let fullHeight = Math.floor(this.getBounds().height)

		let newX = cam.worldView.left + fullWidth - 15
		let newY = cam.worldView.bottom - fullHeight + 20

		this.setPosition(
			Phaser.Math.Linear(this.x, newX, 1),
			Phaser.Math.Linear(this.y, newY, 1),
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
