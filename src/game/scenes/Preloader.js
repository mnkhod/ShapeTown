// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Preloader extends Phaser.Scene {

	constructor() {
		super("Preloader");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// progressBar
		const progressBar = this.add.rectangle(512, 384, 468, 32);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;
		progressBar.isStroked = true;

		this.progressBar = progressBar;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	progressBar;

	/* START-USER-CODE */

	// Write your code here
    init ()
    {
        // Get actual screen dimensions
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create a black background rectangle first to cover any gaps
        const bgRect = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000);
        bgRect.setOrigin(0, 0);
        bgRect.setDepth(-2);

        // Create loading screen background
        const bg = this.add.image(width / 2, height / 2, 'loadingBackground');
        bg.setOrigin(0.5, 0.5);

        // Scale background to cover entire screen (even with some overflow)
        const scaleX = width / bg.width;
        const scaleY = height / bg.height;
        const scale = Math.max(scaleX, scaleY) * 1.1; // 10% extra to ensure full coverage
        bg.setScale(scale);
        bg.setScrollFactor(0);
        bg.setDepth(-1);

        // Create loading bar background (dark semi-transparent box)
        const barWidth = 600;
        const barHeight = 40;
        const barX = width / 2;
        const barY = height - 100;

        const barBg = this.add.rectangle(barX, barY, barWidth, barHeight, 0x000000, 0.5);
        const barBorder = this.add.rectangle(barX, barY, barWidth, barHeight);
        barBorder.setStrokeStyle(3, 0xffffff, 0.8);

        // Create the actual progress bar
        const progressBar = this.add.rectangle(
            barX - barWidth / 2 + 10,
            barY,
            10,
            barHeight - 10,
            0x4ade80
        );
        progressBar.setOrigin(0, 0.5);

        // Percentage text
        const percentText = this.add.text(barX, barY, '0%', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            //  Update the progress bar width
            progressBar.width = 10 + ((barWidth - 20) * progress);
            percentText.setText(Math.round(progress * 100) + '%');
        });
    }

    preload ()
    {
        // Use the 'pack' file to load in any assets you need for this scene
        this.load.pack('preload', 'assets/preload-asset-pack.json');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("ShapeTownFarmingMapScene");
    }
        /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
