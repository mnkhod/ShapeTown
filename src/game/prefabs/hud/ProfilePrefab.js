// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ProfilePrefab extends Phaser.GameObjects.Image {

    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 56.5, y ?? 22.25, texture || "ProfileBackground", frame);

        this.scaleX = 0.5;
        this.scaleY = 0.5;

        /* START-USER-CTR-CODE */
        // Write your code here.
        this.scene.events.on('update', this.onSceneUpdate, this);
        this.scene.events.on('create', this.onSceneCreate, this);
        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */

    // Write your code here.
    onSceneCreate() {
        this.visible = false;
        
        this.setInteractive({ useHandCursor: true });
        
        this.on('pointerdown', () => {
            if (this.scene.reactEvent == undefined) throw Error("REACT EVENT BUS NOT HOOKED IN");
            this.scene.reactEvent.emit("show-achievements-modal", this);
        }, this);
    }

    onSceneUpdate() {
        if (this.visible == false) return;

        const cam = this.scene.cameras.main;

        // Position in top-left corner with some padding
        let newX = cam.worldView.left + this.width/2 + 10;
        let newY = cam.worldView.top + this.height/2 + 10;

        // Smooth movement to new position
        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 0.03),
            Phaser.Math.Linear(this.y, newY, 0.03)
        );
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here