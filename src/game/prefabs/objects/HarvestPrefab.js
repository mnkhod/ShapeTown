// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
const CROP_DATA = {
    "CARROT": {
        type: "Vegetable",
        seedPrice: 10,
        sellingPrice: 25,
        growthDays: 2,
        growthMinutes: 32,
        tier: "common",
        spritesheet: "Crop_Cycle_Carrot",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-carrot",
        seedAsset: "crops-seed bags-carrot",
        displayName: "Carrot"
    },
    "BOK_CHOK": {
        type: "Vegetable",
        seedPrice: 40,
        sellingPrice: 80,
        growthDays: 3,
        growthMinutes: 48,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_BokChok",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-bokchok",
        seedAsset: "crops-seed bags-bokchok",
        displayName: "Bok Chok"
    },
    "BROCCOLI": {
        type: "Vegetable",
        seedPrice: 55,
        sellingPrice: 110,
        growthDays: 4,
        growthMinutes: 64,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Broccoli",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-broccoli",
        seedAsset: "crops-seed bags-broccoli",
        displayName: "Broccoli"
    },
    "WHEAT": {
        type: "Vegetable",
        seedPrice: 15,
        sellingPrice: 30,
        growthDays: 2,
        growthMinutes: 32,
        tier: "common",
        spritesheet: "Crop_Cycle_Wheat",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-wheat",
        seedAsset: "crops-seed bags-wheat",
        displayName: "Wheat"
    },
    "POTATO": {
        type: "Vegetable",
        seedPrice: 20,
        sellingPrice: 40,
        growthDays: 3,
        growthMinutes: 48,
        tier: "common",
        spritesheet: "Crop_Cycle_Potato",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-potato",
        seedAsset: "crops-seed bags-potato",
        displayName: "Potato"
    },
    "CAULIFLOWER": {
        type: "Vegetable",
        seedPrice: 30,
        sellingPrice: 60,
        growthDays: 3,
        growthMinutes: 48,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_Cauliflower",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-cauliflower",
        seedAsset: "crops-seed bags-cauliflower",
        displayName: "Cauliflower"
    },
    "CHILI": {
        type: "Vegetable",
        seedPrice: 70,
        sellingPrice: 140,
        growthDays: 3,
        growthMinutes: 48,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Chili",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-chili",
        seedAsset: "crops-seed bags-chili",
        displayName: "Chili"
    },
    "CORN": {
        type: "Vegetable",
        seedPrice: 50,
        sellingPrice: 100,
        growthDays: 5,
        growthMinutes: 80,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Corn",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-corn",
        seedAsset: "crops-seed bags-corn",
        displayName: "Corn"
    },
    "EGGPLANT": {
        type: "Vegetable",
        seedPrice: 65,
        sellingPrice: 130,
        growthDays: 5,
        growthMinutes: 80,
        tier: "Rare",
        spritesheet: "Crop_Cycle_Eggplant",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-eggplant",
        seedAsset: "crops-seed bags-eggplant",
        displayName: "Eggplant"
    },
    "GREENBEAN": {
        type: "Vegetable",
        seedPrice: 25,
        sellingPrice: 50,
        growthDays: 4,
        growthMinutes: 64,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_Greenbean",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-greenbean",
        seedAsset: "crops-seed bags-greenbean",
        displayName: "Green Bean"
    },
    "PARSNIP": {
        type: "Vegetable",
        seedPrice: 12,
        sellingPrice: 24,
        growthDays: 2,
        growthMinutes: 32,
        tier: "common",
        spritesheet: "Crop_Cycle_Parsnip",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-parsnip",
        seedAsset: "crops-seed bags-parsnip",
        displayName: "Parsnip"
    },
    "PUMPKIN": {
        type: "Vegetable",
        seedPrice: 125,
        sellingPrice: 250,
        growthDays: 6,
        growthMinutes: 96,
        tier: "Very Rare",
        spritesheet: "Crop_Cycle_Pumpkin",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-pumpkin",
        seedAsset: "crops-seed bags-pumpkin",
        displayName: "Pumpkin"
    },
    "RADISH": {
        type: "Vegetable",
        seedPrice: 15,
        sellingPrice: 30,
        growthDays: 1,
        growthMinutes: 16,
        tier: "common",
        spritesheet: "Crop_Cycle_Radish",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-radish",
        seedAsset: "crops-seed bags-radish",
        displayName: "Radish"
    },
    "RED_CABBAGE": {
        type: "Vegetable",
        seedPrice: 45,
        sellingPrice: 90,
        growthDays: 4,
        growthMinutes: 64,
        tier: "Uncommon",
        spritesheet: "Crop_Cycle_RedCabbage",
        seedFrame: 0,
        growthFrames: [1, 2, 3, 4],
        harvestFrame: 6,
        harvestAsset: "crops-redcabbage",
        seedAsset: "crops-seed bags-redcabbage",
        displayName: "Red Cabbage"
    }
};
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

        this.previousState = null;
        this.tileId = null;
        this.growthTimer = null;
        this.growthStage = 0;
        this.growthStartTime = null;
        this.growthText = null;
        
        this.on('destroy', () => {
            if (this.growthText && this.growthText.destroy) {
                this.growthText.destroy();
            }
        });
        /* END-USER-CTR-CODE */
    }

    /** @type {string} */
    state = "ROCK";
    seed = "CARROT";
    isReadyForHarvest = false;
    isWatered = false;

    /* START-USER-CODE */

    prefabCreateCycle() {
        this.setupBasedOnState();

        this.on('pointerover', () => {
            this.preFX.addGlow(16777215, 4, 0, false);
            this.showGrowthInfo();
        }, this);

        this.on('pointerout', () => {
            this.preFX.clear();
            this.hideGrowthInfo();
        }, this);

        this.on('pointerdown', function (_pointer) {
            if (!this.scene.playerPrefab) throw Error("Scene doesnt have playerPrefab");

            let distance = this.getDistance(this.scene.playerPrefab, this);

            if (distance > 80) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }

            if (this.isWatered && this.isReadyForHarvest == false) {
                this.scene.alertPrefab.alert("Already Watered");
                return;
            }

            if (this.isReadyForHarvest) {
                const cropData = CROP_DATA[this.seed];
                const harvestAsset = cropData ? cropData.harvestAsset : `crops-${this.seed.toLowerCase()}`;
                
                this.hideGrowthInfo();
                
                this.scene.newItemHudPrefab.addItem(this.seed, harvestAsset, 0, 1, true);
                
                this.isReadyForHarvest = false;
                this.isWatered = false;
                this.growthStage = 0;
                this.growthStartTime = null;
                this.state = "SOIL";
                this.setupBasedOnState();
                return;
            }

            this.changeState();
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
                this.setTexture("GroundTilestSoil", 3);
                break;
            case "PLANTED":
                if (CROP_DATA[this.seed]) {
                    this.setTexture(CROP_DATA[this.seed].spritesheet, CROP_DATA[this.seed].seedFrame);
                } else {
                    this.setTexture("FarmingCropsVer2", 0);
                }
                break;
            case "WATERED":
                this.isWatered = true;
                this.growthStartTime = Date.now();
                this.growthStage = 0;
                
                let growthTimeMs = this.calculateGrowthTimeMs();
                
                const stageTime = growthTimeMs / 4;
                
                this.scheduleGrowthStages(stageTime);
                break;
            default:
                if (this.state.startsWith(this.seed + "_LEVEL_")) {
                    const level = parseInt(this.state.split("_").pop());
                    const cropData = CROP_DATA[this.seed];
                    
                    if (cropData) {
                        if (level <= 4) {
                            this.setTexture(cropData.spritesheet, cropData.growthFrames[level-1]);
                            
                            if (level === 4) {
                                this.isReadyForHarvest = true;
                            }
                        }
                    }
                }
                break;
        }
    }

    calculateGrowthTimeMs() {
        if (!CROP_DATA[this.seed]) return 4000; // Default 4 seconds if data not found
        
        // For demo, we're scaling down the actual growth time
        // In a real game, you'd use the actual minutes/days
        // For testing, we'll use 1 second per "minute" in the data
        return CROP_DATA[this.seed].growthMinutes * 1000;
    }

    scheduleGrowthStages(stageTime) {
        let timer = this.scene.time;
        
        // First stage
        timer.delayedCall(stageTime, () => {
            this.state = `${this.seed}_LEVEL_1`;
            this.growthStage = 1;
            this.setupBasedOnState();
        }, {}, this);
        
        // Second stage
        timer.delayedCall(stageTime * 2, () => {
            this.state = `${this.seed}_LEVEL_2`;
            this.growthStage = 2;
            this.setupBasedOnState();
        }, {}, this);
        
        // Third stage
        timer.delayedCall(stageTime * 3, () => {
            this.state = `${this.seed}_LEVEL_3`;
            this.growthStage = 3;
            this.setupBasedOnState();
        }, {}, this);
        
        // Final stage
        timer.delayedCall(stageTime * 4, () => {
            this.state = `${this.seed}_LEVEL_4`;
            this.growthStage = 4;
            this.setupBasedOnState();
        }, {}, this);
    }

    showGrowthInfo() {
        this.hideGrowthInfo();
        
        const cropData = CROP_DATA[this.seed];
        if (!cropData && this.state !== "SOIL") return;
        
        const displayName = cropData ? cropData.displayName || this.seed : "";
        
        if (this.isWatered && !this.isReadyForHarvest && this.growthStartTime) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - this.growthStartTime;
            const totalGrowthTime = this.calculateGrowthTimeMs();
            const remainingTime = Math.max(0, totalGrowthTime - elapsedTime);
            
            // Format time for display
            const remainingSeconds = Math.ceil(remainingTime / 1000);
            
            // Calculate progress percent
            const progressPercent = Math.min(100, Math.floor((elapsedTime / totalGrowthTime) * 100));
            
            // Time formatting
            let timeDisplay;
            if (remainingSeconds > 60) {
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = remainingSeconds % 60;
                timeDisplay = `${minutes}m ${seconds}s`;
            } else {
                timeDisplay = `${remainingSeconds}s`;
            }
            
            const displayText = `${displayName}\n${progressPercent}% grown\n${timeDisplay} remaining`;
            
            //growth info
            this.growthText = this.scene.add.text(this.x, this.y - 40, displayText, {
                fontSize: '12px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center'
            }).setOrigin(0.5, 1);
        } else if (this.isReadyForHarvest) {
            //Ready to harvest
            const tierColors = {
                'common': '#ffffff',
                'Common': '#ffffff',
                'Uncommon': '#1eff00',
                'Rare': '#0070dd',
                'Very Rare': '#a335ee',
                'Special': '#ff8000'
            };
            
            const color = tierColors[cropData.tier] || '#00ff00';
            
            this.growthText = this.scene.add.text(this.x, this.y - 40, `${displayName}\nReady to harvest!\n(${cropData.tier})`, {
                fontSize: '12px',
                color: color,
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center'
            }).setOrigin(0.5, 1);
        } else if (this.state === "PLANTED") {
            // Needs water
            this.growthText = this.scene.add.text(this.x, this.y - 40, `${displayName}\nNeeds water`, {
                fontSize: '12px',
                color: '#87cefa',
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center'
            }).setOrigin(0.5, 1);
        } else if (this.state === "SOIL") {
            // Ready for planting
            this.growthText = this.scene.add.text(this.x, this.y - 40, `Tilled Soil\nReady for planting`, {
                fontSize: '12px',
                color: '#8B4513',
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center'
            }).setOrigin(0.5, 1);
        }
    }

    hideGrowthInfo() {
        if (this.growthText) {
            this.growthText.destroy();
            this.growthText = null;
        }
    }

    changeState() {
        let item = this.scene.newItemHudPrefab.selectedItem;
        if (item == null) {
            this.scene.alertPrefab.alert("No Selected Item");
            return;
        }

        switch (this.state) {
            case "ROCK":
                if (item != "PICK_AXE") {
                    this.scene.alertPrefab.alert("Select Pick Axe");
                    break;
                }
                this.previousState = "ROCK";
                this.state = "GROUND";
                this.setupBasedOnState();
                break;
            case "GROUND":
                if (item != "HOE") {
                    this.scene.alertPrefab.alert("Select Hoe");
                    break;
                }
                if (this.tileId !== 83) {
                    this.scene.alertPrefab.alert("Can't sow this ground!");
                    break;
                }
                this.state = "SOIL";
                this.setupBasedOnState();
                break;
            case "SOIL":
                if (!item.endsWith("_SEED")) {
                    this.scene.alertPrefab.alert("Select Seed");
                    break;
                }
                
                const seedType = item.replace("_SEED", "");
                
                if (!CROP_DATA[seedType]) {
                    this.scene.alertPrefab.alert("Unknown Seed Type");
                    break;
                }
                
                this.seed = seedType;
                this.scene.newItemHudPrefab.useItem(item);

                this.state = "PLANTED";
                this.setupBasedOnState();
                break;
            case "PLANTED":
                if (item != "WATERING_CAN") {
                    this.scene.alertPrefab.alert("Select Watering Can");
                    break;
                }

                this.state = "WATERED";
                this.setupBasedOnState();
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