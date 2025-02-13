
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SquareFirePrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 422, y ?? 379);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// torchBowl_V010
		const torchBowl_V010 = scene.add.image(0, 2, "TorchBowl_V01", 0);
		this.add(torchBowl_V010);

		// squareCampFire
		const squareCampFire = scene.add.sprite(3, -9, "CampFireFireSheet", 0);
		squareCampFire.play("SquareCampFire");
		this.add(squareCampFire);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
