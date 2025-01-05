
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FishingComponentPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 64, y ?? 128);

		// captureHeightBox
		/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }} */
		const captureHeightBox = scene.add.rectangle(7, -2, 128, 128);
		captureHeightBox.scaleX = 0.17824140122640697;
		captureHeightBox.scaleY = 1.6;
		scene.physics.add.existing(captureHeightBox, false);
		captureHeightBox.body.allowGravity = false;
		captureHeightBox.body.setSize(128, 128, false);
		captureHeightBox.isFilled = true;
		this.add(captureHeightBox);

		// background
		const background = scene.add.image(-1, -1, "FishingHudBackground");
		background.scaleX = 0.8178296535035412;
		this.add(background);

		// fishHudProgressBar
		const fishHudProgressBar = scene.add.rectangle(38, 0, 128, 128);
		fishHudProgressBar.scaleX = 0.06401954832635304;
		fishHudProgressBar.scaleY = 1.6;
		fishHudProgressBar.angle = -180;
		fishHudProgressBar.isFilled = true;
		fishHudProgressBar.fillColor = 15781984;
		this.add(fishHudProgressBar);

		// fishCaptureContainer
		const fishCaptureContainer = scene.add.container(-0.13546639309143416, -97.52511934341945);
		this.add(fishCaptureContainer);

		// fishCaptureBodyBox
		/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }} */
		const fishCaptureBodyBox = scene.add.rectangle(8.135466393091434, 19.52511934341944, 128, 128);
		fishCaptureBodyBox.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), Phaser.Geom.Rectangle.Contains);
		fishCaptureBodyBox.scaleX = 0.126;
		fishCaptureBodyBox.scaleY = 0.3;
		scene.physics.add.existing(fishCaptureBodyBox, false);
		fishCaptureBodyBox.body.allowGravity = false;
		fishCaptureBodyBox.body.setSize(128, 128, false);
		fishCaptureBodyBox.isFilled = true;
		fishCaptureBodyBox.fillColor = 15466496;
		fishCaptureContainer.add(fishCaptureBodyBox);

		// fishCaptureSectionBox
		const fishCaptureSectionBox = scene.add.rectangle(8.135466393091434, 19.52511934341944, 128, 128);
		fishCaptureSectionBox.scaleX = 0.126;
		fishCaptureSectionBox.scaleY = 0.12;
		fishCaptureSectionBox.isFilled = true;
		fishCaptureContainer.add(fishCaptureSectionBox);

		// fishingHudBody
		const fishingHudBody = scene.add.image(0, 0, "FishingHud");
		this.add(fishingHudBody);

		// fish
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const fish = scene.add.sprite(8, 78, "FishIcon", 1);
		fish.scaleX = 0.5;
		fish.scaleY = 0.5;
		scene.physics.add.existing(fish, false);
		fish.body.allowGravity = false;
		fish.body.setSize(32, 32, false);
		this.add(fish);

		this.captureHeightBox = captureHeightBox;
		this.background = background;
		this.fishHudProgressBar = fishHudProgressBar;
		this.fishCaptureBodyBox = fishCaptureBodyBox;
		this.fishCaptureSectionBox = fishCaptureSectionBox;
		this.fishCaptureContainer = fishCaptureContainer;
		this.fishingHudBody = fishingHudBody;
		this.fish = fish;

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.scene = scene;
		this.container = this;
		this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		scene.events.on('create', this.onSceneCreate, this);
		scene.events.on('update', this.onSceneUpdate, this);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }} */
	captureHeightBox;
	/** @type {Phaser.GameObjects.Image} */
	background;
	/** @type {Phaser.GameObjects.Rectangle} */
	fishHudProgressBar;
	/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }} */
	fishCaptureBodyBox;
	/** @type {Phaser.GameObjects.Rectangle} */
	fishCaptureSectionBox;
	/** @type {Phaser.GameObjects.Container} */
	fishCaptureContainer;
	/** @type {Phaser.GameObjects.Image} */
	fishingHudBody;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	fish;

	/* START-USER-CODE */

	// Write your code here.
	progressMaxPercentage;
	isCapturingFish = false;
	wonFish = false;
	playing = false

	// Write your code here.
	onSceneCreate() {
		this.container.visible = false;
		this.progressMaxPercentage = this.fishHudProgressBar.height;

		this.scene.physics.add.overlap(this.fish, this.fishCaptureBodyBox, () => {
			this.isCapturingFish = true;
		});
	}

	play(successCallBack) {
		this.container.visible = true;
		this.playing = true;

		this.fishHudProgressBar.height = 0;

		this.fishUpDownLogic();

		this.scene.tweens.add({
			targets: this.fishHudProgressBar,
			height: this.progressMaxPercentage,
			duration: 3000,
			ease: 'Linear',
			onComplete: () => {
				this.playing = false;

				if (this.isCapturingFish) {
					this.scene.alertPrefab.alert("Won Fish")
					successCallBack(this.isCapturingFish)
				} else {
					this.scene.alertPrefab.alert("Lost Fish")
				}

				this.container.visible = false;
			}
		});
	}

	onSceneUpdate() {
		// let width = Math.floor(this.container.getBounds().width)
		// let height = Math.floor(this.container.getBounds().height)

		let newX = this.scene.playerPrefab.x - 80;
		let newY = this.scene.playerPrefab.y;

		this.container.setPosition(
			Phaser.Math.Linear(this.container.x, newX, 0.03),
			Phaser.Math.Linear(this.container.y, newY, 0.03),
		);

		this.captureBoxLogic();
		// this.checkIfStillOverlapping();
	}

	checkIfStillOverlapping() {
		if (Phaser.Geom.Intersects.RectangleToRectangle(
			this.fish.getBounds(),
			this.fishCaptureBodyBox.getBounds()
		) == false) {
			this.isCapturingFish = false;
		}
	}

	captureBoxLogic() {
		if (this.playing == false) return;

		let dropSpeed = 0.3;
		let topY = Math.round(this.captureHeightBox.y);
		let bottomY = Math.round(topY + this.captureHeightBox.height - 80);

		if (this.spaceKey.isDown) {
			let upSpeed = 0.3;
			if (this.fishCaptureContainer.y - upSpeed <= topY - 60) return;

			this.fishCaptureContainer.y -= upSpeed;
		} else {
			if (this.fishCaptureContainer.y + dropSpeed >= bottomY) return;

			this.fishCaptureContainer.y += dropSpeed;
		}
	}

	fishUpDownLogic() {
		// if (this.playing == false) return;

		let topY = Math.round(this.captureHeightBox.y);
		// let bottomY = Math.round(this.captureHeightBox.getBounds().height) + 10;
		let bottomY = Math.round(topY + this.captureHeightBox.height - 40);

		let randomY = Phaser.Math.Between(topY, bottomY);
		let randomSpeed = Phaser.Math.Between(1, 3)

		this.scene.tweens.add({
			targets: this.fish,
			y: randomY,
			duration: randomSpeed * 1000,
			ease: 'Linear',
			onComplete: () => {
				this.fishUpDownLogic()
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
