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
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	state = "ROCK";

	/* START-USER-CODE */

	prefabCreateCycle(){
		this.setupBasedOnState()

		this.on('pointerover', () => this.preFX.addGlow(16777215, 4, 0, false),this);

		this.on('pointerout', () => this.preFX.clear(),this);


		this.on('pointerdown', function (_pointer) {
			if(!this.scene.playerPrefab) throw Error("Scene doesnt have playerPrefab")

			let distance = this.getDistance(this.scene.playerPrefab,this)

			if(distance > 60){
				alert("Too Far")
				return;
			}

			this.changeState()
		},this); 

	}

	setupBasedOnState(){
		switch (this.state) {
			case "ROCK":
				this.setTexture("GroundAccessor", this.getRandomInt(12,21))
				break;
			case "GROUND":
				this.setTexture("RoadStone",83)
				break;
			case "SOIL":
				this.setTexture("GroundTilestSoil",3)
				break;
			case "PLANTED":
				this.setTexture("FarmingCropsVer2",0)
				break;
			default:
				break;
		}
	}

	changeState(){
		let item = this.scene.itemHudPrefab.selectedItem
		if(item == null){
			alert("No Selected Item")
			return;
		}

		switch (this.state) {
			case "ROCK":
				if(item != "PICK_AXE"){
					alert("Select Pick Axe");
					break;
				}

				this.state = "GROUND"
				this.setupBasedOnState()
				break;
			case "GROUND":
				if(item != "HOE"){
					alert("Select Hoe");
					break;
				}

				this.state = "SOIL"
				this.setupBasedOnState()
				break;
			case "SOIL":
				if(item != "CARROT_SEED"){
					alert("Select Seed");
					break;
				}

				this.state = "PLANTED"
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
