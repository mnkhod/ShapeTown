// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MerchantCabinPrefab extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 275, y ?? 198, texture || "MerchantCabin_v01", frame ?? 0);

		/* START-USER-CTR-CODE */
		// Setup physics
		scene.add.existing(this);
		scene.physics.add.existing(this, false);
		
		this.body.allowGravity = false;
		this.body.setSize(165, 120);
		this.body.setOffset(10, 120);
		this.body.moves = false;
		this.body.immovable = true;
		
		this.isHouseInvisible = false;
		this.isPlayerInvisible = false;
		
		this.cabinTop = this.y - 160;
		this.cabinBottom = this.y - 30;
		
		scene.events.on('update', () => {
			if (!this.player) return;
			
			const playerNearCabinX = Math.abs(this.player.x - (this.x + this.body.offset.x - 15)) < 90;
			
			const playerBehindCabin = this.player.y > this.cabinTop &&
								  this.player.y < this.cabinBottom - 25 &&
								  playerNearCabinX;
			
			if (playerBehindCabin) {
				if (!this.isHouseInvisible) {
					scene.tweens.add({
						targets: this,
						alpha: 0.4,
						duration: 200,
						ease: 'Power1',
						onComplete: () => {
							this.isHouseInvisible = true;
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
				if (this.isHouseInvisible) {
					scene.tweens.add({
						targets: this,
						alpha: 1,
						duration: 200,
						ease: 'Power1',
						onComplete: () => {
							this.isHouseInvisible = false;
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