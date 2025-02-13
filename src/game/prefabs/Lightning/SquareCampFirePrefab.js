
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SquareCampFirePrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 345, y ?? 372);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// campfire_V010
		const campfire_V010 = scene.add.image(0, 33, "Campfire_V01", 0);
		this.add(campfire_V010);

		scene.add.existing(this);
        scene.physics.add.existing(this, true);

		// squareCampFire
		const squareCampFire = scene.add.sprite(0, 32, "CampFireFireSheet", 0);
		squareCampFire.play("SquareCampFire");
		this.add(squareCampFire);

		/* START-USER-CTR-CODE */

		scene.add.existing(this);
        scene.physics.add.existing(this, true);

     
        this.body.allowGravity = false;
        this.body.setSize(70, 50);  
        this.body.setOffset(-5, 40); 
        this.body.moves = false;
        this.body.immovable = true;
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

		setupCollision(player) {
        if (!this.scene || !player) return;

        this.scene.physics.add.collider(player, this, null, null, this);
        this.player = player;
        }

        destroy() {
        super.destroy();
        }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
