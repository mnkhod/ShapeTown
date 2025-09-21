// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ProfilePrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 56.5, y ?? 16);

		// image_1
		const image_1 = scene.add.image(0, 6.25, "ProfileBackground");
		image_1.scaleX = 0.5;
		image_1.scaleY = 0.5;
		this.add(image_1);

		// nickname
		const nickname = scene.add.text(-52, 31, "", {});
		nickname.text = "New text";
		nickname.setStyle({ "fontFamily": "courier", "fontSize": "12px" });
		this.add(nickname);

		this.nickname = nickname;

		/* START-USER-CTR-CODE */
        // Write your code here.
        this.scene.events.on('update', this.onSceneUpdate, this);
        this.scene.events.on('create', this.onSceneCreate, this);
        /* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	nickname;
	/** @type {string} */
	nickname = "";

	/* START-USER-CODE */

    // Write your code here.
    loadCustomization() {
        try {
            const savedData = JSON.parse(localStorage.getItem('playerCustomization'));
            if (savedData && savedData.playerName) {
                this.nickname.setText(savedData.playerName);
            }
        } catch (error) {
            console.error("Error loading player name:", error);
        }
    }

onSceneCreate() {
    // Add safety check and delay to ensure proper initialization
    if (!this.scene || !this.scene.sys) {
        console.warn('⚠️ ProfilePrefab: Scene not ready, delaying interactive setup');
        if (this.scene && this.scene.time) {
            this.scene.time.delayedCall(100, () => this.onSceneCreate());
        }
        return;
    }

    try {
        this.setInteractive({
            useHandCursor: true,
            hitArea: new Phaser.Geom.Rectangle(-60, -20, 120, 70),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains
        });
    } catch (error) {
        console.error('❌ Error setting ProfilePrefab interactive:', error);
        // Retry after a delay
        if (this.scene && this.scene.time) {
            this.scene.time.delayedCall(200, () => this.onSceneCreate());
        }
    }

    // Add event handler with safety check
    try {
        this.on('pointerdown', () => {
            if (!this.scene || !this.scene.reactEvent) {
                console.warn("⚠️ React event bus not available");
                return;
            }
            this.scene.reactEvent.emit("show-achievements-modal", this);
        }, this);
    } catch (error) {
        console.error('❌ Error setting up ProfilePrefab pointerdown event:', error);
    }

    // Load customization with safety check
    try {
        this.loadCustomization();
    } catch (error) {
        console.error('❌ Error loading ProfilePrefab customization:', error);
    }
}

onSceneUpdate() {
    if (this.visible == false) return;

    const cam = this.scene.cameras.main;

    let newX = cam.worldView.left + 64;
    let newY = cam.worldView.top + 20;

    this.setPosition(newX, newY);
}

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here