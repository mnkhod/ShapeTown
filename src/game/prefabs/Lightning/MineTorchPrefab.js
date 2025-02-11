
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MineTorchPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 270, y ?? 302);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// torchBowlRegular_V010
		const torchBowlRegular_V010 = scene.add.image(0, 7, "TorchBowlRegular_V01", 0);
		this.add(torchBowlRegular_V010);

		// mineFire
		const mineFire = scene.add.sprite(17, 20, "CampFireFireSheet_V02", 0);
		mineFire.play("MineFire");
		this.add(mineFire);

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
