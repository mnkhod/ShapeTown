// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class WaterwellPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 63, y ?? 81);

		// Create the base well
		const waterwell = scene.add.sprite(0, 0, "Waterwell");
		waterwell.play("Waterwell"); // If there's an animation
		this.add(waterwell);
		this.wellBase = waterwell;

		// Create the roof
		const waterwellRoof = scene.add.sprite(0, -45, "WaterwellRoof");
		this.add(waterwellRoof);
		this.wellRoof = waterwellRoof;

		/* START-USER-CTR-CODE */
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.body.allowGravity = false;
        this.body.setSize(80, 115);  
        this.body.setOffset(0, -50); 
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