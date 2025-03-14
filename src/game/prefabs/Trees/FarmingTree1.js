// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FarmingTree1 extends Phaser.GameObjects.Image {

    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 431, y ?? 342, texture || "Tree_v06", frame ?? 0);

        /* START-USER-CTR-CODE */
        // Setup physics
        
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.allowGravity = false;
        this.body.setSize(20, 10); 
        this.body.setOffset(32, 110); 
        this.body.moves = false;
        this.body.immovable = true;

        this.isTreeInvisible = false;
        this.isPlayerInvisible = false;

        this.treeTop = this.y - 80;  
        this.treeBottom = this.y + 20;   

        scene.events.on('update', () => {
            if (!this.player) return;

            const playerNearTreeX = Math.abs(this.player.x - (this.x + this.body.offset.x - 50)) < 55;

            const playerBehindTree = this.player.y > this.treeTop && 
                                   this.player.y < this.treeBottom - 15 && 
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