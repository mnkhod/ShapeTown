// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenAchievements extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// trophy_icon (base)
		const trophy_icon = scene.add.image(12, 12, "TrophyIcon");
		trophy_icon.scaleX = 0.5;
		trophy_icon.scaleY = 0.5;
		this.add(trophy_icon);

		this.trophy_icon = trophy_icon;

		/* START-USER-CTR-CODE */
        this.setSize(trophy_icon.width, trophy_icon.height);
        this.setInteractive({ useHandCursor: true });

        this.isKeyPressed = false;
        this.isAchievementsOpen = false;

        this.on('pointerover', this.handlePointerOver, this);
        this.on('pointerout', this.handlePointerOut, this);
        this.on('pointerdown', this.handleAchievementsOpen, this);

        this.scene.events.on('update', this.onSceneUpdate, this);

        if (this.scene.reactEvent) {
            this.scene.reactEvent.on('achievements-closed', () => {
                this.isAchievementsOpen = false;
            });
        }

        // Set high depth to prevent icon from disappearing under trees/objects
        this.setDepth(10000);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	trophy_icon;

	/* START-USER-CODE */
    handlePointerOver() {
        this.trophy_icon.setTint(0xffff00); // Yellow tint on hover
    }

    handlePointerOut() {
        this.trophy_icon.clearTint();
    }

    handleAchievementsOpen() {
        if (!this.scene.reactEvent) return;

        console.log('Opening achievements');

        this.scene.reactEvent.emit("show-achievements-modal");
        this.isAchievementsOpen = true;
    }

    handleAchievementsClose() {
        if (!this.scene.reactEvent) return;

        this.isAchievementsOpen = false;
        this.scene.reactEvent.emit("close-achievements-modal");
    }

    onSceneUpdate() {
        if (!this.visible) return;

        const cam = this.scene.cameras.main;
        // Position next to quest button (quest is at x+20, this will be at x+60)
        let newX = cam.worldView.left + 60;
        let newY = cam.worldView.bottom - 48;

        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 1),
            Phaser.Math.Linear(this.y, newY, 1)
        );
    }

    destroy() {
        if (this.scene.reactEvent) {
            this.scene.reactEvent.off('achievements-closed');
        }
        this.scene.events.off('update', this.onSceneUpdate, this);
        super.destroy();
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here