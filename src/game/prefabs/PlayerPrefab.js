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
        this.isUsingTool = false;
        this.selectedTool = null;

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

        // Watering tool
        const wateringTool = scene.add.sprite(14, 27, "FarmingToolsWatering", 0);
        wateringTool.scaleX = 1.5;
        wateringTool.scaleY = 1.5;
        wateringTool.visible = false;
        this.add(wateringTool);

        // Axe tool
        const axeTool = scene.add.sprite(14, 27, "FarmingToolsHoe_1", 0);
        axeTool.scaleX = 1.5;
        axeTool.scaleY = 1.5;
        axeTool.visible = false;
        this.add(axeTool);

        // Pickaxe tool
        const pickaxeTool = scene.add.sprite(14, 27, "MiningToolPickaxe_V01", 0);
        pickaxeTool.scaleX = 1.5;
        pickaxeTool.scaleY = 1.5;
        pickaxeTool.visible = false;
        this.add(pickaxeTool);

        // Sword tool
        const swordTool = scene.add.sprite(14, 27, "NPCRowan_Sword_Draw", 0);
        swordTool.scaleX = 1.5;
        swordTool.scaleY = 1.5;
        swordTool.visible = false;
        this.add(swordTool);

        this.skin = skin;
        this.hair = hair;
        this.outfit = outfit;
        this.wateringTool = wateringTool;
        this.axeTool = axeTool;
        this.pickaxeTool = pickaxeTool;
        this.swordTool = swordTool

        /* START-USER-CTR-CODE */
        // Write your code here.

        const cam = scene.cameras.main;

        cam.startFollow(this, true, 0.1, 0.1);
        cam.setZoom(1);
        cam.fadeIn(1000);

        this.player = this;

        scene.events.on('update', this.prefabUpdateCycle, this);
        scene.events.on('create', this.prefabCreateCycle, this);
        
        // Mouse click to use the selected tool
        scene.input.on('pointerdown', () => {
            this.useSelectedTool();
        });
        /* END-USER-CTR-CODE */
    }


    /** @type {Phaser.GameObjects.Sprite} */
    skin;
    /** @type {Phaser.GameObjects.Sprite} */
    hair;
    /** @type {Phaser.GameObjects.Sprite} */
    outfit;
    /** @type {Phaser.GameObjects.Sprite} */
    wateringTool;
    /** @type {Phaser.GameObjects.Sprite} */
    axeTool;
    /** @type {Phaser.GameObjects.Sprite} */
    pickaxeTool;
    /** @type {Phaser.GameObjects.Sprite} */
    swordTool;

    /* START-USER-CODE */

    // Write your code here.

    /** @type {Phaser.Physics.Arcade.Container} */
    player;

    lastDirection = 'down';
    moveSpeed = 500;

    prefabCreateCycle() {
        this.loadCustomization();
        this.settingUpAnimations();
    }

    prefabUpdateCycle() {
        this.playerMovement();
        this.updateToolFromInventory();
    }

    setupFollow() {
        this.lerpX = 0.1;
        this.lerpY = 0.1;
        this.camera.stopFollow();
    }

    playerMovement() {
        if (this.isUsingTool) return;
        
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

    updateToolFromInventory() {
        if (this.scene.newItemHudPrefab && this.scene.newItemHudPrefab.selectedItem) {
            const item = this.scene.newItemHudPrefab.selectedItem;
            if (item === "ToolWateringCan") {
                if (this.selectedTool !== 'watering') {
                    this.selectTool('watering');
                }
            } else if (item === "ToolHoe") {
                if (this.selectedTool !== 'axe') {
                    this.selectTool('axe');
                }
            } else if (item === "ToolPickaxe") {
                if (this.selectedTool !== 'pickaxe') {
                    this.selectTool('pickaxe');
                }
            } else if (item === "ToolIronSword") {
                if (this.selectedTool !== 'Sword') {
                    this.selectTool('sword');
                }
            }
             else {
                if (this.selectedTool !== null) {
                    this.selectTool(null);
                }
            }
        } else {
            if (this.selectedTool !== null) {
                this.selectTool(null);
            }
        }
    }

    loadCustomization() {
        const savedCustomization = localStorage.getItem('playerCustomization'); 
        if (savedCustomization) {
            const customization = JSON.parse(savedCustomization);

            const skinKey = `PlayerWalking_${customization.skin}`;
            const hairKey = `PlayerHairWalking_${customization.hair}`;
            const outfitKey = `CharacterOutfit_${customization.clothing}`;

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

    selectTool(toolId) {
        this.selectedTool = toolId;
        console.log(`Selected tool: ${toolId}`);
    }

    useSelectedTool() {
        if (!this.selectedTool || this.isUsingTool) return;
        
        switch (this.selectedTool) {
            case 'watering':
                this.startWatering();
                break;
            case 'axe':
                this.startAxe();
                break;
            case 'pickaxe':
                this.startPickaxe();
                break;
            case 'sword':
                this.startSword();
                break;
            default:
                console.log(`Tool ${this.selectedTool} has no action`);
                break;
        }
    }

    // WATERING TOOL FUNCTIONS
    startWatering() {
        if (this.isUsingTool) return;
        this.isUsingTool = true;
        this.playToolAnimation(this.wateringTool, 'watering');
    }

    // AXE TOOL FUNCTIONS
    startAxe() {
        if (this.isUsingTool) return;
        this.isUsingTool = true;
        this.playToolAnimation(this.axeTool, 'axe');
    }

    // PICKAXE TOOL FUNCTIONS
    startPickaxe() {
        if (this.isUsingTool) return;
        this.isUsingTool = true;
        this.playToolAnimation(this.pickaxeTool, 'pickaxe');
    }

    // SWORD TOOL FUNCTIONS
    startSword() {
        if (this.isUsingTool) return;
        this.isUsingTool = true;
        this.playToolAnimation(this.swordTool, 'sword');
    }

    // Generic method to play tool animations
    playToolAnimation(toolSprite, toolType) {
        // Stop any current movement
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        const directionCap = this.capitalizeFirstLetter(this.lastDirection);
        this.positionTool(toolSprite);

        toolSprite.visible = true;
        
        // Play the player idle animation
        this.hair.play(`hair${'idle' + directionCap}`, true);
        this.skin.play(`walk${'idle' + directionCap}`, true);
        this.outfit.play(`outfit${'idle' + directionCap}`, true);
        
        // Play the tool animation
        try {
            toolSprite.play(`${toolType}${directionCap}`, true);
        } catch (error) {
            console.warn(`${toolType} animation not found: ${error}`);
            toolSprite.setFrame(this.getToolFrame(toolType));
        }
        
        // Duration of animation
        this.scene.time.delayedCall(400, () => {
            this.stopToolAnimation(toolSprite);
        });
    }

    // Position tool based on direction
    positionTool(toolSprite) {
        switch (this.lastDirection) {
            case 'right':
                toolSprite.setPosition(24, 27);
                toolSprite.setDepth(1.5);
                break;
            case 'left':
                toolSprite.setPosition(4, 27);
                toolSprite.setDepth(1.5);
                break;
            case 'up':
                toolSprite.setPosition(14, 17);
                toolSprite.setDepth(0.5); 
                break;
            case 'down':
                toolSprite.setPosition(14, 37);
                toolSprite.setDepth(2);
                break;
        }
    }

    getToolFrame(toolType) {
        const baseFrame = {
            'watering': 0,
            'axe': 0,
            'pickaxe': 0,
            'sword': 0
        }[toolType] || 0;
        
        const offset = {
            'right': 8,
            'left': 12,
            'up': 4,
            'down': 0
        }[this.lastDirection] || 0;
        
        return baseFrame + offset;
    }

    // Stop the tool animation
    stopToolAnimation(toolSprite) {
        this.isUsingTool = false;
        toolSprite.visible = false;
        
        // Return to idle animation
        const directionCap = this.capitalizeFirstLetter(this.lastDirection);
        this.moveInDirection(`idle${directionCap}`);
    }

    // Setup all tool animations
    setupToolAnimations() {
        if (!this.scene || !this.scene.anims) return;
    
        // Animation frame ranges for all tools
        const toolAnimFrames = {
            watering: {
                down: { start: 0, end: 3 },
                up: { start: 4, end: 7 },
                right: { start: 8, end: 11 },
                left: { start: 12, end: 15 }
            },
            axe: {
                down: { start: 0, end: 3 },
                up: { start: 4, end: 7 },
                right: { start: 8, end: 11 },
                left: { start: 12, end: 15 }
            },
            pickaxe: {
                down: { start: 0, end: 3 },
                up: { start: 4, end: 7 },
                right: { start: 8, end: 11 },
                left: { start: 12, end: 15 }
            },
            sword: {
                down: { start: 0, end: 2 },
                up: { start: 3, end: 5 },
                right: { start: 6, end: 8 },
                left: { start: 9, end: 11 }
            }
        };
        
        // Tool sprite sheet keys
        const toolSpriteSheets = {
            watering: "FarmingToolsWatering",
            axe: "FarmingToolsHoe_1",
            pickaxe: "MiningToolPickaxe_V01",
            sword: "NPCRowan_Sword_Draw"
        };
        
        // Create animations for each tool and direction
        Object.keys(toolAnimFrames).forEach(tool => {
            ["right", "left", "up", "down"].forEach(direction => {
                const animKey = `${tool}${this.capitalizeFirstLetter(direction)}`;
                
                if (this.scene.anims.exists(animKey)) {
                    this.scene.anims.remove(animKey);
                }
                
                try {
                    this.scene.anims.create({
                        key: animKey,
                        frames: this.scene.anims.generateFrameNumbers(toolSpriteSheets[tool], {
                            start: toolAnimFrames[tool][direction].start,
                            end: toolAnimFrames[tool][direction].end
                        }),
                        frameRate: 10,
                        repeat: 0 
                    });
                } catch (error) {
                    console.warn(`Failed to create ${tool} animation ${animKey}: ${error}`);
                }
            });
        });
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
        
        // Setup tool animations
        this.setupToolAnimations();
    }

    capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

