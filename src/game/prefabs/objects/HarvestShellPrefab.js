
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HarvestShellPrefab extends Phaser.GameObjects.Sprite {

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
        }

        this.infoText = null;
        this.textBackground = null;
        this.respawnTimer = null;
        
        this.on('destroy', () => {
            if (this.infoText && this.infoText.destroy) {
                this.infoText.destroy();
            }
            if (this.textBackground && this.textBackground.destroy) {
                this.textBackground.destroy();
            }
            if (this.respawnTimer) {
                this.scene.time.removeEvent(this.respawnTimer);
            }
        });
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	state = "SHELL";

	/* START-USER-CODE */

	// Write your code here.
	prefabCreateCycle() {
        this.setupBasedOnState();

        this.on('pointerover', () => {
            this.preFX.addGlow(16777215, 4, 0, false);
            this.showInfo();
        }, this);

        this.on('pointerout', () => {
            this.preFX.clear();
            this.hideInfo();
        }, this);

        this.on('pointerdown', function (_pointer) {
            if (!this.scene.playerPrefab) throw Error("Scene doesn't have playerPrefab");

            let distance = this.getDistance(this.scene.playerPrefab, this);

            if (distance > 80) {
                this.scene.alertPrefab.alert("Too Far");
                return;
            }

            if (this.state === "COLLECTED") {
                this.scene.alertPrefab.alert("Already Collected");
                return;
            }

            this.collectShell();
        }, this);
    }

    setupBasedOnState() {
        switch (this.state) {
            case "SHELL":
                this.setTexture("ShellBeach_V01", this.getRandomInt(0, 7));
                this.setVisible(true);
                if (this.physicsBody) {
                    this.physicsBody.enable = true;
                }
                break;
                
            case "COLLECTED":
                this.setVisible(false);
                if (this.physicsBody) {
                    this.physicsBody.enable = false;
                }
                break;
                
            case "RESPAWNING":
                this.setVisible(false);
                if (this.physicsBody) {
                    this.physicsBody.enable = false;
                }
                break;
        }
    }

    collectShell() {
        if (this.state !== "SHELL") return;
        
        this.hideInfo();
        
        const shellItem = "SHELL";
        const shellAsset = "ShellBeach_Icon";
        
        this.scene.newItemHudPrefab.addItem(shellItem, shellAsset, 0, 1, true);
        
        console.log("Collecting shell");
        
        if (this.scene.triggerQuestEvent) {
            console.log("Triggering shell collection quest event");
            this.scene.triggerQuestEvent('collect:shellCollected', { 
                shellType: "SHELL",
                shell: this 
            });
        }
        
        this.state = "COLLECTED";
        this.setupBasedOnState();

        const respawnTime = Phaser.Math.Between(50000, 100000); 
        
        this.state = "RESPAWNING";
        this.respawnTimer = this.scene.time.delayedCall(respawnTime, () => {
            this.state = "SHELL";
            this.setupBasedOnState();
        });
    }

    showInfo() {
        this.hideInfo();
        
        let textContent = 'Shell\nClick to collect';
        let textColor = '#ffffff';
        
        this.textBackground = this.scene.add.graphics();
        this.textBackground.setDepth(100);
        
        this.infoText = this.scene.add.text(this.x, this.y - 40, textContent, {
            fontSize: '12px',
            color: textColor,
            stroke: '#000000',
            strokeThickness: 0.5,
            align: 'center',
            padding: { x: 6, y: 4 }
        });
        this.infoText.setDepth(101);
        this.infoText.setOrigin(0.5, 1);

        const bounds = this.infoText.getBounds();
        const padding = 10;
        const cornerRadius = 8;

        this.textBackground.clear();
        this.textBackground.fillStyle(0x000000, 0.6);
        this.textBackground.lineStyle(1, 0xffffff, 0.2);
        
        this.textBackground.fillRoundedRect(
            bounds.x - padding,
            bounds.y - padding,
            bounds.width + (padding * 2),
            bounds.height + (padding * 2),
            cornerRadius
        );
        
        this.textBackground.strokeRoundedRect(
            bounds.x - padding,
            bounds.y - padding,
            bounds.width + (padding * 2),
            bounds.height + (padding * 2),
            cornerRadius
        );
    }

    hideInfo() {
        if (this.textBackground) {
            this.textBackground.destroy();
            this.textBackground = null;
        }
        if (this.infoText) {
            this.infoText.destroy();
            this.infoText = null;
        }
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
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
