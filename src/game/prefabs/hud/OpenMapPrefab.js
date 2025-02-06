// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenMapPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// openMapIcon
		const openMapIcon = scene.add.image(24, 24, "OpenMapIcon");
		openMapIcon.scaleX = 0.5;
		openMapIcon.scaleY = 0.5;
		this.add(openMapIcon);

		// hoveredOpenMapIcon
		const hoveredOpenMapIcon = scene.add.image(24, 24, "HoveredOpenMapIcon");
		hoveredOpenMapIcon.scaleX = 0.5;
		hoveredOpenMapIcon.scaleY = 0.5;
		hoveredOpenMapIcon.visible = false;
		this.add(hoveredOpenMapIcon);

		// hotkey_m
		const hotkey_m = scene.add.image(38, 35, "HotkeyM");
		hotkey_m.scaleX = 0.5;
		hotkey_m.scaleY = 0.5;
		this.add(hotkey_m);

		// key_m
		const key_m = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

		// key_esc
		const key_esc = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		this.key_m = key_m;
		this.key_esc = key_esc;

		/* START-USER-CTR-CODE */
        this.setSize(openMapIcon.width, openMapIcon.height);
        this.setInteractive({ useHandCursor: true });

        this.openMapIcon = openMapIcon;
        this.hoveredOpenMapIcon = hoveredOpenMapIcon;
        this.isKeyPressed = false;
        this.isMapOpen = false;

        this.on('pointerover', this.handlePointerOver, this);
        this.on('pointerout', this.handlePointerOut, this);
        this.on('pointerdown', this.handleMapOpen, this);

        this.scene.events.on('update', this.onSceneUpdate, this);

        if (this.scene.reactEvent) {
            this.scene.reactEvent.on('map-closed', () => {
                this.isMapOpen = false;
            });
        }
        /* END-USER-CTR-CODE */
	}

	/** @type {Phaser.Input.Keyboard.Key} */
	key_m;
	/** @type {Phaser.Input.Keyboard.Key} */
	key_esc;
	/** @type {Phaser.GameObjects.GameObject} */
	player;

	/* START-USER-CODE */
    handlePointerOver() {
        this.hoveredOpenMapIcon.visible = true;
        this.openMapIcon.visible = false;
    }

    handlePointerOut() {
        this.hoveredOpenMapIcon.visible = false;
        this.openMapIcon.visible = true;
    }

    handleMapOpen() {
        if (!this.scene.reactEvent) return;
        this.isMapOpen = true;
        this.scene.reactEvent.emit("show-map-modal");
        
        if (this.scene.minimapPrefab) {
            this.scene.minimapPrefab.toggle();
        }
    }

    handleMapClose() {
        if (!this.scene.reactEvent) return;
        this.isMapOpen = false;
        this.scene.reactEvent.emit("close-map-modal");
        
        if (this.scene.minimapPrefab && this.scene.minimapPrefab.visible) {
            this.scene.minimapPrefab.toggle();
        }
    }

    onSceneUpdate() {
        if (!this.visible) return;

        const cam = this.scene.cameras.main;
        let newX = cam.worldView.right - 60;
        let newY = cam.worldView.bottom - 60;

        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 1),
            Phaser.Math.Linear(this.y, newY, 1)
        );

        if (this.key_m.isDown) {
            if (!this.isKeyPressed) {
                this.isKeyPressed = true;
                if (this.isMapOpen) {
                    this.handleMapClose();
                } else {
                    this.handleMapOpen();
                }
            }
        } else {
            this.isKeyPressed = false;
        }

        if (this.key_esc.isDown) {
            if (this.isMapOpen) {
                this.handleMapClose();
            }
        }
    }

    destroy() {
        if (this.scene.reactEvent) {
            this.scene.reactEvent.off('map-closed');
        }
        this.scene.events.off('update', this.onSceneUpdate, this);
        super.destroy();
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here