
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class AppleTreePrefab extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 64, y ?? 64, texture || "Tree_v014", frame ?? 0);

		/* START-USER-CTR-CODE */
        // Set up physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.isHarvastable = false
        
        let bounds = this.getBounds()
        let newX = bounds.x + bounds.width - 15
        let newY = bounds.y + 10
		const questMark = scene.add.sprite(0, -40, "NPCDialoguePopUpMainQuestSheet", 7);
    	questMark.setScale(1.5);
    	this.questMark = questMark;
        this.questMark.setPosition(newX,newY)
        scene.physics.add.existing(this.questMark, false);
        this.questMark.visible = false;

		scene.events.on('create', this.prefabCreateCycle, this);
		scene.events.on('update', this.prefabUpdateCycle, this);

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

	prefabCreateCycle(){
		this.on('pointerover', function (_pointer) {
            if(!this.isHarvastable) return;
			this.preFX.addGlow(16777215, 4, 0, false);
		});

		this.on('pointerdown', async function (_pointer) {
            if(!this.isHarvastable) return;

			let distance = this.getDistance(this.player,this)

			if(distance > 100){
				this.scene.alertPrefab.alert("Too Far")
				return;
			}

			this.scene.newItemHudPrefab.addItem("APPLE","apple",0,1,true)

            this.isHarvastable = false
			this.preFX.clear();
    	    this.questMark.visible = false;
		    this.setTexture("Tree_v014", 0);
		},this);

		this.on('pointerout', function (_pointer) {
            if(!this.isHarvastable) return;
			this.preFX.clear();
		});

        this.scene.time.delayedCall(30 * 1000, () => {
			this.setTexture("Tree_v014", 1);
            this.isHarvastable = true
            this.setInteractive({ useHandCursor: true });

    	    this.questMark.visible = true;
    	    this.questMark.play("AfterQuest");
        }, {}, this);
	}

    prefabUpdateCycle(){
    }

    destroy() {
        if (this.scene) {
            this.scene.events.off('update');
        }
        super.destroy();
    }


    harvestReady(){
		this.setTexture("Tree_v014", 1);
    }

	getDistance(texture1, texture2) {
		return Phaser.Math.Distance.Between(
			texture1.x,
			texture1.y,
			texture2.x,
			texture2.y
		);
	}

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
