export default class MapleTreePrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 123, y ?? 119, texture || "Tree_v", frame ?? 2);

        /* START-USER-CTR-CODE */
        // Setup physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
		
        this.body.allowGravity = false;
        this.body.setSize(65, 37); 
        this.body.setOffset(94, 190); 
        this.body.moves = false;
        this.body.immovable = true; 

        this.isTreeInvisible = false;
        this.isPlayerInvisible = false;

        this.treeTop = this.y - 126;   
        this.treeBottom = this.y + 40;  

        scene.events.on('update', () => {
            if (!this.player) return;
            
            const playerNearTreeX = Math.abs(this.player.x - (this.x + this.body.offset.x - 113)) < 114;
          
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
    
        if (!this.scene || !player) return;
        
        this.scene.physics.add.collider(player, this, null, null, this);
        this.player = player;

        // Debug collision box - uncomment to see the collision box
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