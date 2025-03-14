export default class DeadTree1 extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 33, y ?? 47, texture || "Tree_v08", frame ?? 0);

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        // Configure physics body
        this.body.allowGravity = false;
        this.body.setSize(50, 20, false);
        this.body.setOffset(20, 100);
        this.body.moves = false;
        this.body.immovable = true;

        // Track transparency states
        this.isTreeInvisible = false;
        this.isPlayerInvisible = false;

       
        this.treeTop = this.y - 80;  
        this.treeBottom = this.y + 20;  

        // Add update listener for transparency
        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearTreeX = Math.abs(this.player.x - this.x + 25) < 40;
          
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
    }

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
}