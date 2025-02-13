
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SquareFountanPrefab extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 63, y ?? 81, texture || "WaterFountain", frame ?? 0);

		this.play("SquareFountan");

		/* START-USER-CTR-CODE */
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

     
        this.body.allowGravity = false;
        this.body.setSize(125, 130);  
        this.body.setOffset(0, 20); 
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
