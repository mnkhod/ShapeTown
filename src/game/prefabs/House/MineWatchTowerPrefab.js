// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MineWatchTowerPrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 282, y ?? 247, texture || "WatchtowerBack_01", frame ?? 0);

        /* START-USER-CTR-CODE */
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.setSize(100, 80); 
        this.body.setOffset(15, 140);
        this.body.moves = false;
        this.body.immovable = true;

        this.isWatchtowerInvisible = false;
        this.isPlayerInvisible = false;

    
        this.towerTop = this.y - 132;   
        this.towerBottom = this.y - 10;

        scene.events.on('update', () => {
            if (!this.player) return;
   
            const playerNearTowerX = Math.abs(this.player.x - (this.x + this.body.offset.x - 20)) < 65;
 
            const playerBehindTower = this.player.y > this.towerTop && 
                                    this.player.y < this.towerBottom && 
                                    playerNearTowerX;
            if (playerBehindTower) {
                if (!this.isWatchtowerInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 0.4,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isWatchtowerInvisible = true;
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
                if (this.isWatchtowerInvisible) {
                    scene.tweens.add({
                        targets: this,
                        alpha: 1,
                        duration: 200,
                        ease: 'Power1',
                        onComplete: () => {
                            this.isWatchtowerInvisible = false;
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