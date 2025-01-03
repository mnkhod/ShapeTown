export default class AppleTreePrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 60, y ?? 60, texture || "Tree_v014", frame ?? 1);

        /* START-USER-CTR-CODE */
        // Set up physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
    
        this.body.allowGravity = false;
        this.body.setSize(50, 20, false);
        this.body.setOffset(38, 100);
        this.body.moves = false;

        // Track transparency states
        this.isTreeInvisible = false;
        this.isPlayerInvisible = false;

        // Define tree's visible area
        this.treeTop = this.y - 95;   
        this.treeBottom = this.y + 20;
	
        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearTreeX = Math.abs(this.player.x - this.x + 5) < 55;
          
            const playerBehindTree = this.player.y > this.treeTop && 
                                   this.player.y < this.treeBottom - 25 && 
                                   playerNearTreeX;

            if (playerBehindTree) {
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
        this.scene.physics.add.collider(player, this);
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