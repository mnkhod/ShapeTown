// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlayerPrefab extends Phaser.GameObjects.Container {
    

	constructor(scene, x, y) {
		super(scene, x ?? 33.46849927902156, y ?? 20.681273293494687);

		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.setSize(24, 12, false);
        this.body.setOffset(0, 36);
      

        this.setDepth(1);

		// skin
		const skin = scene.add.sprite(14, 27, "PlayerWalking_V01", 0);
		skin.scaleX = 1.5;
		skin.scaleY = 1.5;
		this.add(skin);

		// hair
		const hair = scene.add.sprite(14, 27, "PlayerHairWalking_01", 0);
		hair.scaleX = 1.5;
		hair.scaleY = 1.5;
		this.add(hair);

		// outfit
		const outfit = scene.add.sprite(14, 27, "CharacterOutfit_1", 0);
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

	lastDirection = 'down';
	moveSpeed = 150;

	prefabCreateCycle() {
        this.loadCustomization();
        this.settingUpAnimations();
    }

	prefabUpdateCycle() {
		this.playerMovement();
	}

    setupFollow() {
        // Set initial lerp (smooth follow) values
        this.lerpX = 0.1;
        this.lerpY = 0.1;
        
        // Stop the default camera follow
        this.camera.stopFollow();
    }

    playerMovement() {
		let input = this.scene.input;

		const upKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		const downKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		const leftKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		const rightKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (rightKey.isDown) {
            this.lastDirection = 'right';
            this.moveInDirection('right');
        } else if (leftKey.isDown) {
            this.lastDirection = 'left';
            this.moveInDirection('left');
        } else if (upKey.isDown) {
            this.lastDirection = 'up';
            this.moveInDirection('up');
        } else if (downKey.isDown) {
            this.lastDirection = 'down';
            this.moveInDirection('down');
        } else {
            this.moveInDirection(`idle${this.capitalizeFirstLetter(this.lastDirection)}`);
        }
    }

    loadCustomization() {
        const savedCustomization = localStorage.getItem('characterCustomization');
        if (savedCustomization) {
            const customization = JSON.parse(savedCustomization);

            const skinKey = customization.skin.replace('.png', '');
            const hairKey = customization.hair.replace('.png', '');
            const outfitKey = customization.clothing.replace('.png', '');

            this.skin.setTexture(skinKey);
            this.hair.setTexture(hairKey);
            this.outfit.setTexture(outfitKey);

            this.settingUpAnimations();
        }
    }

    moveInDirection(direction) {
        try {
            switch (direction) {
                case 'right':
                    this.player.body.velocity.x = this.moveSpeed;
                    this.player.body.velocity.y = 0;
                    this.playAnimations('Right');
                    break;
                case 'left':
                    this.player.body.velocity.x = -this.moveSpeed;
                    this.player.body.velocity.y = 0;
                    this.playAnimations('Left');
                    break;
                case 'up':
                    this.player.body.velocity.y = -this.moveSpeed;
                    this.player.body.velocity.x = 0;
                    this.playAnimations('Up');
                    break;
                case 'down':
                    this.player.body.velocity.y = this.moveSpeed;
                    this.player.body.velocity.x = 0;
                    this.playAnimations('Down');
                    break;
                case 'idleRight':
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.playAnimations('IdleRight');
                    break;
                case 'idleLeft':
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.playAnimations('IdleLeft');
                    break;
                case 'idleUp':
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.playAnimations('IdleUp');
                    break;
                case 'idleDown':
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    this.playAnimations('IdleDown');
                    this.playAnimations(this.capitalizeFirstLetter(direction));
                    break;
            }
        } catch (error) {
            console.warn(`Animation error in moveDirection: ${error}`);
        }
    }

    playAnimations(direction) {
        try {
            this.hair.play(`hair${direction}`, true);
            this.skin.play(`walk${direction}`, true);
            this.outfit.play(`outfit${direction}`, true);
        } catch (error) {
            console.warn(`Failed to play animations for direction ${direction}: ${error}`);
        }
    }

    settingUpAnimations() {
        if (!this.scene || !this.scene.anims) return;

        let movementAnimKeys = {
            right: { start: 15, end: 20 },
            left: { start: 22, end: 27 },
            up: { start: 8, end: 13 },
            down: { start: 1, end: 6 },
            idleRight: { start: 14, end: 14 },
            idleLeft: { start: 21, end: 21 },
            idleUp: { start: 7, end: 7 },
            idleDown: { start: 0, end: 0 }
        };
    
        const skinKey = this.skin.texture.key;
        const hairKey = this.hair.texture.key;
        const outfitKey = this.outfit.texture.key;

        ["right", "left", "up", "down", "idleRight", "idleLeft", "idleUp", "idleDown"].forEach((i) => {
            const animKey = `walk${this.capitalizeFirstLetter(i)}`;
            if (this.scene.anims.exists(animKey)) {
                this.scene.anims.remove(animKey);
            }
            this.scene.anims.create({
                key: animKey,
                frames: this.scene.anims.generateFrameNumbers(skinKey, {
                    start: movementAnimKeys[i].start,
                    end: movementAnimKeys[i].end
                }),
                frameRate: 10,
                repeat: -1,
            });
        });

        let anims = [
            { key: "hair", assetKey: hairKey },
            { key: "outfit", assetKey: outfitKey },
        ];

        anims.forEach((anim) => {
            ["right", "left", "up", "down", "idleRight", "idleLeft", "idleUp", "idleDown"].forEach((i) => {
                const animKey = `${anim.key}${this.capitalizeFirstLetter(i)}`;
                if (this.scene.anims.exists(animKey)) {
                    this.scene.anims.remove(animKey);
                }
                this.scene.anims.create({
                    key: animKey,
                    frames: this.scene.anims.generateFrameNumbers(anim.assetKey, {
                        start: movementAnimKeys[i].start,
                        end: movementAnimKeys[i].end
                    }),
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