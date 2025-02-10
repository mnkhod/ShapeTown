export default class SeaLevelBuildingLighthousePrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 126, y ?? 317, texture || "SeaLevelBuildingLighthouse_v01", frame ?? 0);

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

		

        // Configure physics body - larger size for lighthouse
        this.body.allowGravity = false;
        this.body.setSize(255, 175, false); 
        this.body.setOffset(1, 415);     
        this.body.moves = false;

        // Track transparency states
        this.isLighthouseInvisible = false;
        this.isPlayerInvisible = false;

        // Define lighthouse's visible area - much taller than other objects
        this.lighthouseTop = this.y - 340;    // Adjusted for lighthouse height
        this.lighthouseBottom = this.y + 150;   // Adjusted for lighthouse base

        // Add update listener for transparency
        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearLighthouseX = Math.abs(this.player.x - this.x + 11) < 123;  // Wider detection area
          
            const playerBehindLighthouse = this.player.y > this.lighthouseTop && 
                                         this.player.y < this.lighthouseBottom - 25 && 
                                         playerNearLighthouseX;

            if (playerBehindLighthouse) {
                if (!this.isLighthouseInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 0.4,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isLighthouseInvisible = true;
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
                if (this.isLighthouseInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 1,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isLighthouseInvisible = false;
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
    }

    setupCollision(player) {
        this.scene.physics.add.collider(player, this);
        this.player = player;
    }

    destroy() {
        if (this.scene) {
            this.scene.events.off('update');
        }
        super.destroy();
    }
}