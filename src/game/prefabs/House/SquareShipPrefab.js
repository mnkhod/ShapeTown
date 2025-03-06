// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SquareShipPrefab extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 459, y ?? 266, texture || "ShipStranded_01", frame ?? 0);

		/* START-USER-CTR-CODE */
		// Setup physics
		scene.add.existing(this);
		scene.physics.add.existing(this, false);
		
		this.body.allowGravity = false;
		this.body.setSize(346, 130);
		this.body.setOffset(130, 155);
		this.body.moves = false;
		this.body.immovable = true;
		
		this.isShipInvisible = false;
		this.isPlayerInvisible = false;
		
		this.shipTop = this.y - 135;
		this.shipBottom = this.y + 25;
		
		scene.events.on('update', () => {
			if (!this.player) return;
			
			const playerNearShipX = Math.abs(this.player.x - (this.x + this.body.offset.x + 5)) < 95;
			
			const playerBehindShip = this.player.y > this.shipTop &&
									this.player.y < this.shipBottom - 25 &&
									playerNearShipX;
			
			if (playerBehindShip) {
				if (!this.isShipInvisible) {
					scene.tweens.add({
						targets: this,
						alpha: 0.4,
						duration: 200,
						ease: 'Power1',
						onComplete: () => {
							this.isShipInvisible = true;
						}
					});
				}
				if (!this.isPlayerInvisible) {
					scene.tweens.add({
						targets: this.player,
						alpha: 0.3,
						duration: 200,
						ease: 'Power1',
						onComplete: () => {
							this.isPlayerInvisible = true;
						}
					});
				}
			} else {
				if (this.isShipInvisible) {
					scene.tweens.add({
						targets: this,
						alpha: 1,
						duration: 200,
						ease: 'Power1',
						onComplete: () => {
							this.isShipInvisible = false;
						}
					});
				}
				if (this.isPlayerInvisible) {
					scene.tweens.add({
						targets: this.player,
						alpha: 1,
						duration: 200,
						ease: 'Power1',
						onComplete: () => {
							this.isPlayerInvisible = false;
						}
					});
				}
			}
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	setupCollision(player) {
		if (!this.scene || !player) return;
		
		this.scene.physics.add.collider(player, this, null, null, this);
		this.player = player;
	}
	
	destroy() {
		if (this.scene) {
			this.scene.events.off('update');
		}
		super.destroy();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here