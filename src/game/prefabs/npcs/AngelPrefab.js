export default class AngelPrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 77, y ?? 125, texture || "DecorationAngelStatue", frame ?? 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.allowGravity = false;
        this.body.setSize(85, 80, false);  
        this.body.setOffset(35, 140);      
        this.body.moves = false;

        this.isStatueInvisible = false;
        this.isPlayerInvisible = false;

 
        this.statueTop = this.y - 175;   
        this.statueBottom = this.y + 1;

        // Add update listener for transparency
        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearStatueX = Math.abs(this.player.x - this.x + 27) < 77;  // Smaller detection area
          
            const playerBehindStatue = this.player.y > this.statueTop && 
                                     this.player.y < this.statueBottom - 20 && 
                                     playerNearStatueX;

            if (playerBehindStatue) {
                if (!this.isStatueInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 0.4,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isStatueInvisible = true;
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
                if (this.isStatueInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 1,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isStatueInvisible = false;
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