
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlayerPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 33.46849927902156, y ?? 20.681273293494687);

		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.setSize(28, 55, false);

		// skin
		const skin = scene.add.sprite(14.53150085424582, 27.318725443132376, "player", 0);
		skin.scaleX = 1.5;
		skin.scaleY = 1.5;
		this.add(skin);

		// hair
		const hair = scene.add.sprite(14.53150085424582, 27.318725443132376, "PlayerHair02", 0);
		hair.scaleX = 1.5;
		hair.scaleY = 1.5;
		this.add(hair);

		// outfit
		const outfit = scene.add.sprite(14.53150085424582, 27.318725443132376, "PlayerOutfit01", 0);
		outfit.scaleX = 1.5;
		outfit.scaleY = 1.5;
		this.add(outfit);

		this.skin = skin;
		this.hair = hair;
		this.outfit = outfit;

		/* START-USER-CTR-CODE */
		// Write your code here.		

		const cam = scene.cameras.main;
		cam.startFollow(this, true, 0.1, 0.1);
		cam.setZoom(2);
		cam.fadeIn(1000);

		this.player = this;

		scene.events.on('update', this.prefabUpdateCycle, this);
		scene.events.on('create', this.prefabCreateCycle, this);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	skin;
	/** @type {Phaser.GameObjects.Sprite} */
	hair;
	/** @type {Phaser.GameObjects.Sprite} */
	outfit;

	/* START-USER-CODE */

	// Write your code here.

	/** @type {Phaser.Physics.Arcade.Container} */
	player;


	// Lifecycle Functions

	prefabCreateCycle() {
		this.settingUpAnimations();
	}

	prefabUpdateCycle() {
		this.playerMovement()
	}

	// Helper Functions

    playerMovement() {
		let input = this.scene.input;

		const upKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		const downKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		const leftKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		const rightKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (rightKey.isDown) {
            this.moveInDirection('right');
        } else if (leftKey.isDown) {
            this.moveInDirection('left');
        } else if (upKey.isDown) {
            this.moveInDirection('up');
        } else if (downKey.isDown) {
            this.moveInDirection('down');
        } else {
            this.moveInDirection('idle');
        }

        // Keep sprites aligned
        // this.playerOutfit.setPosition(0, 0);
        // this.playerHair.setPosition(0, 0);
    }

    moveInDirection(direction) {
		this.moveSpeed = 150;

        try {
            switch (direction) {
                case 'right':
                    this.player.body.velocity.x = this.moveSpeed;

                    this.playAnimations('Right');
                    break;
                case 'left':
					this.player.body.velocity.x = -this.moveSpeed;

                    this.playAnimations('Left');
                    break;
                case 'up':
                    this.player.body.velocity.y = -this.moveSpeed;

                    this.playAnimations('Up');
                    break;
                case 'down':
                    this.player.body.velocity.y = this.moveSpeed;

                    this.playAnimations('Down');
                    break;
                case 'idle':
					this.player.body.velocity.x = 0;
					this.player.body.velocity.y = 0;

                    this.playAnimations('Idle');
                    break;
            }
        } catch (error) {
            console.warn(`Animation error in moveDirection: ${error}`);
        }
    }

    playAnimations(direction) {
        try {
            this.hair.play(`hair${direction}`, true);
            this.skin.play(`body${direction}`, true);
            this.outfit.play(`outfit${direction}`, true);
        } catch (error) {
            console.warn(`Failed to play animations for direction ${direction}: ${error}`);
        }
    }

	settingUpAnimations() {
		let movementAnimKeys = {
			right: { start: 13, end: 17 },
			left: { start: 19, end: 23 },
			idle: { start: 0, end: 0 },
			up: { start: 7, end: 9 },
			down: { start: 1, end: 5 }
		};

		let anims = [
			{ key: "hair", assetKey: "PlayerHair01" },
			{ key: "outfit", assetKey: "PlayerOutfit01" },
		];

		anims.map((anim) => {
			["right", "left", "idle", "up", "down"].map((i) => {
				this.scene.anims.create({
					key: `${anim.key}${this.capitalizeFirstLetter(i)}`,
					frames: this.scene.anims.generateFrameNumbers(anim.assetKey, { start: movementAnimKeys[i].start, end: movementAnimKeys[i].end }),
					frameRate: 10,
					repeat: -1,
				});
			});
		});
	}

	capitalizeFirstLetter(val) {
		return String(val).charAt(0).toUpperCase() + String(val).slice(1);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
