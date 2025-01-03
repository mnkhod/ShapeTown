export default class TutorealHousePrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 63, y ?? 79, texture || "TutorliarNPCHouse", frame ?? 0);

        /* START-USER-CTR-CODE */
        // Setup physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        // Configure physics body with precise measurements
        this.body.allowGravity = false;
        this.body.setSize(123, 96); 
        this.body.setOffset(4, 60);  
        this.body.moves = false;
        this.body.immovable = true;

        // Track transparency state
        this.isTreeInvisible = false;
        this.isPlayerInvisible = false;

        // Define exact boundaries like the maple tree example
        this.houseTop = this.y - 105;   
        this.houseBottom = this.y + 80;  

        // Add update listener for transparency
        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearHouseX = Math.abs(this.player.x - (this.x + this.body.offset.x - 15)) < 70;
          
            const playerBehindHouse = this.player.y > this.houseTop && 
                                    this.player.y < this.houseBottom - 25 && 
                                    playerNearHouseX;

            if (playerBehindHouse) {
                if (!this.isTreeInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 0.4,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isTreeInvisible = true;
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
                if (this.isTreeInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 1,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isTreeInvisible = false;
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

        // Debug collision box - uncomment to see the collision area
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