/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MinimapPrefab extends Phaser.GameObjects.Rectangle {

	constructor(scene, x, y, width, height) {
		super(scene, x ?? 68, y ?? 66, width ?? 128, height ?? 128);

		this.visible = false;
		this.strokeColor = 0;

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	/** @type {} */
	player = "";

	/* START-USER-CODE */

    // Configuration
    config = {
        zoom: 0.2,
        backgroundColor: 0x000000
    };

    setPlayer(player) {
        this.player = player;
        if (this.player) {
            if (!this.minimapCamera) {
                this.minimapCamera = this.scene.cameras.add(
                    0, 
                    200, 
                    300, 
                    300
                );
                this.minimapCamera.zoom = this.config.zoom;
                this.minimapCamera.setBackgroundColor(this.config.backgroundColor);
                if (this.minimapCamera.postFX) {
                    this.minimapCamera.postFX.addPixelate(0.1);
                    this.minimapCamera.postFX.addShadow(0,0,0,100,0x000,100,10);
                    this.minimapCamera.postFX.addBloom(0xfff,10,10,0,2,0);
                    // this.minimapCamera.postFX.addCircle(10,0x00e,0xfff,3,1); Shunu gshs ahhahahhah
                }
                this.scene.children.list.forEach(gameObject => {
                    const uiPrefabs = [
                        'QuestBookPrefab',
                        'MessagePrefab',
                        'AlertPrefab',
                        'ProfilePrefab',
                        'NewItemHudPrefab',
                        'OpenInventory',
                        'OpenMapPrefab',
                        'OptionsListPrefab',
                        'FishingComponentPrefab',
                        'MinimapPrefab'
                    ];

                    if (gameObject.depth >= 99 || 
                        (gameObject.constructor && uiPrefabs.includes(gameObject.constructor.name))) {
                        this.minimapCamera.ignore(gameObject);
                    }
                });
            }

            this.minimapCamera.startFollow(this.player, true, 0.1, 0.1);

            if (!this.updateListener) {
                this.updateListener = this.scene.events.on('update', this.update, this);
            }

            this.setScrollFactor(0);
        }
    }

    update() {
        if (this.player && this.minimapCamera) {
            this.minimapCamera.centerOn(this.player.x, this.player.y);
        }
    }

    toggle() {
        this.visible = !this.visible;
        if (this.minimapCamera) {
            this.minimapCamera.visible = this.visible;
        }
    }

    destroy(fromScene) {
        try {
            if (this.updateListener) {
                try {
                    if (typeof this.updateListener.remove === 'function') {
                        this.updateListener.remove();
                    } else if (typeof this.updateListener === 'function') {
                        // If it's an event listener function, try to remove it from the scene
                        if (this.scene && this.scene.events) {
                            this.scene.events.off('update', this.updateListener);
                        }
                    }
                } catch (error) {
                    console.warn('Could not remove update listener:', error);
                }
                this.updateListener = null;
            }

            if (this.minimapCamera) {
                try {
                    // Remove camera from scene cameras manager safely
                    if (this.scene && this.scene.cameras && this.scene.cameras.cameras) {
                        const cameraIndex = this.scene.cameras.cameras.indexOf(this.minimapCamera);
                        if (cameraIndex > -1) {
                            this.scene.cameras.remove(this.minimapCamera);
                        }
                    }
                } catch (error) {
                    console.warn('Could not remove minimap camera properly:', error);
                }
                this.minimapCamera = null;
            }

            super.destroy(fromScene);
        } catch (error) {
            console.error('Error in MinimapPrefab destroy:', error);
        }
    }


    /* END-USER-CODE */
}

/* END OF COMPILED CODE */