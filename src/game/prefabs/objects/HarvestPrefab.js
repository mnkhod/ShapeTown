// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HarvestPrefab extends Phaser.GameObjects.Sprite {
constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 16, y ?? 16, texture || "__DEFAULT", frame);

        /* START-USER-CTR-CODE */
        // Write your code here.
        scene.events.on('create', this.prefabCreateCycle, this);
        this.setInteractive({ useHandCursor: true });

        scene.physics.world.enable(this);
        this.physicsBody = this.body;
        
        if (this.physicsBody) {
            this.physicsBody.setImmovable(true);
            this.physicsBody.enable = false;
        }

        // Initialize additional properties
        this.previousState = null;
        this.tileId = null;
        /* END-USER-CTR-CODE */
    }

    /** @type {string} */
    state = "ROCK";
    seed = "CARROT";
    isReadyForHarvest = false;
    isWatered = false;

    /* START-USER-CODE */

    prefabCreateCycle() {
        this.setupBasedOnState()

        this.on('pointerover', () => this.preFX.addGlow(16777215, 4, 0, false), this);

        this.on('pointerout', () => this.preFX.clear(), this);

        this.on('pointerdown', function (_pointer) {
            if (!this.scene.playerPrefab) throw Error("Scene doesnt have playerPrefab")

            let distance = this.getDistance(this.scene.playerPrefab, this)

            if (distance > 80) {
                this.scene.alertPrefab.alert("Too Far")
                return;
            }

            if (this.isWatered && this.isReadyForHarvest == false) {
                this.scene.alertPrefab.alert("Already Watered")
                return;
            }

            if (this.isReadyForHarvest) {
                this.scene.itemHudPrefab.addItem("CARROT", "FarmingCropsVer2", 6, 1, true)
                this.destroy();
                return;
            }

            this.changeState()
        }, this);
    }

    setupBasedOnState() {
        let timer = this.scene.time;

        switch (this.state) {
            case "ROCK":
                this.setTexture("GroundAccessor", this.getRandomInt(12, 21));
                if (this.physicsBody) {
                    this.physicsBody.enable = true;
                    this.physicsBody.setSize(32, 32);
                    if (this.scene.playerPrefab && !this.hasPlayerCollider) {
                        this.scene.physics.add.collider(this, this.scene.playerPrefab);
                        this.hasPlayerCollider = true;
                    }
                }
                break;
            case "GROUND":
    if (this.previousState === "ROCK") {
        this.tileId = 83;
    } else {
        const roll = Phaser.Math.RND.frac();
        if (roll < 0.05) {
            this.state = "ROCK";
            this.setupBasedOnState();
            return;
        } else if (roll < 0.7) {
            this.tileId = 34;
        } else if (roll < 0.9) {
            this.tileId = 83;
        } else {
            this.tileId = 89;
        }
    }
    
    this.setTexture("RoadStone", this.tileId);
    if (this.physicsBody) {
        this.physicsBody.enable = false;
    }
    break;
            case "SOIL":
                this.setTexture("GroundTilestSoil", 3)
                break;
            case "PLANTED":
                this.setTexture("FarmingCropsVer2", 0)
                break;
            case "WATERED":
                timer.delayedCall(1000, () => {
                    this.state = "CARROT_LEVEL_1"
                    this.isWatered = true;
                    this.setupBasedOnState();
                }, {}, this);
                break;
            case "CARROT_LEVEL_1":
                this.setTexture("FarmingCropsVer2", 1)
                timer.delayedCall(1000, () => {
                    this.state = "CARROT_LEVEL_2"
                    this.setupBasedOnState();
                }, {}, this);
                break;
            case "CARROT_LEVEL_2":
                this.setTexture("FarmingCropsVer2", 2)
                timer.delayedCall(1000, () => {
                    this.state = "CARROT_LEVEL_3"
                    this.setupBasedOnState();
                }, {}, this);
                break;
            case "CARROT_LEVEL_3":
                this.setTexture("FarmingCropsVer2", 3)
                timer.delayedCall(1000, () => {
                    this.state = "CARROT_LEVEL_4"
                    this.setupBasedOnState();
                }, {}, this);
                break;
            case "CARROT_LEVEL_4":
                this.setTexture("FarmingCropsVer2", 4)
                this.isReadyForHarvest = true;
                break;
            default:
                break;
        }
    }

    changeState() {
        let item = this.scene.itemHudPrefab.selectedItem
        if (item == null) {
            this.scene.alertPrefab.alert("No Selected Item")
            return;
        }

        switch (this.state) {
            case "ROCK":
                if (item != "PICK_AXE") {
                    this.scene.alertPrefab.alert("Select Pick Axe")
                    break;
                }
                this.previousState = "ROCK";
                this.state = "GROUND"
                this.setupBasedOnState()
                break;
            case "GROUND":
                if (item != "HOE") {
                    this.scene.alertPrefab.alert("Select Hoe")
                    break;
                }
                if (this.tileId !== 83) {
                    this.scene.alertPrefab.alert("Can't sow this ground!")
                    break;
                }
                this.state = "SOIL"
                this.setupBasedOnState()
                break;
            case "SOIL":
                if (item != "CARROT_SEED") {
                    this.scene.alertPrefab.alert("Select Seed")
                    break;
                }
                this.scene.itemHudPrefab.useItem("CARROT_SEED")

                this.state = "PLANTED"
                this.setupBasedOnState()
                break;
            case "PLANTED":
                if (item != "WATERING_CAN") {
                    this.scene.alertPrefab.alert("Select Watering Can")
                    break;
                }

                this.state = "WATERED"
                this.setupBasedOnState()
                break;
            default:
                break;
        }
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    getDistance(texture1, texture2) {
        return Phaser.Math.Distance.Between(
            texture1.x,
            texture1.y,
            texture2.x,
            texture2.y
        );
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here