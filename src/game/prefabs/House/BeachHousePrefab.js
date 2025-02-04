// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BeachHousePrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 111, y ?? 136, texture || "CapitansCabin", frame ?? 0);

        /* START-USER-CTR-CODE */
        // Setup physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.allowGravity = false;
        this.body.setSize(170, 100);  // Increased height to extend to bottom
        this.body.setOffset(25, 180);  // Adjusted offset to align with bottom
        this.body.moves = false;
        this.body.immovable = true;

        this.isHouseInvisible = false;
        this.isPlayerInvisible = false;

        this.houseTop = this.y - 180;   
        this.houseBottom = this.y -10;

        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearHouseX = Math.abs(this.player.x - (this.x + this.body.offset.x - 45)) < 110;
            
            const playerBehindHouse = this.player.y > this.houseTop && 
                                    this.player.y < this.houseBottom && // Removed the -25 offset
                                    playerNearHouseX;

            if (playerBehindHouse) {
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

        // Debug collision box - uncomment to visualize the collision area
        // this.scene.physics.world.createDebugGraphic();
        // this.body.debugShowBody = true;
        // this.body.debugShowVelocity = true;
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