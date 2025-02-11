// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MineHousePrefab extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 77, y ?? 128, texture || "Miner'stower", frame ?? 0);

        /* START-USER-CTR-CODE */

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.allowGravity = false;
        this.body.setSize(130, 90); 
        this.body.setOffset(15, 165);
        this.body.moves = false;
        this.body.immovable = true;

        this.isHouseInvisible = false;
        this.isPlayerInvisible = false;

        this.houseTop = this.y - 160;   
        this.houseBottom = this.y - 10;

        scene.events.on('update', () => {
            if (!this.player) return;

            const playerNearHouseX = Math.abs(this.player.x - (this.x + this.body.offset.x - 45)) < 90;

            const playerBehindHouse = this.player.y > this.houseTop && 
                                    this.player.y < this.houseBottom && 
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