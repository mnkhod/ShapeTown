
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import ShapeFarmingHousePrefab from "../prefabs/House/ShapeFarmingHousePrefab";
/* START-USER-IMPORTS */
import { extendSceneWithQuests } from '../../components/QuestSystem';
import { extendHarvestPrefab } from "../../components/QuestSystem";
/* END-USER-IMPORTS */

class ShapeFarmingScene extends Phaser.Scene {

	constructor() {
		super("ShapeFarmingScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// shapetownFarmingMap
		const shapetownFarmingMap = this.add.tilemap("ShapetownFarmingMap");
		shapetownFarmingMap.addTilesetImage("GroundTileset", "GroundTileset");
		shapetownFarmingMap.addTilesetImage("ForrestLadge", "ForrestLadge");
		shapetownFarmingMap.addTilesetImage("TreePatteren", "TreePatteren");
		shapetownFarmingMap.addTilesetImage("CityHouses_v02", "CityHouses_v02");
		shapetownFarmingMap.addTilesetImage("Building_5_Door_32x32_2", "Building_5_Door_32x32_2");
		shapetownFarmingMap.addTilesetImage("LakeBorderCornerAni", "LakeBorderCornerAni");
		shapetownFarmingMap.addTilesetImage("LakeBorderAni", "LakeBorderAni");
		shapetownFarmingMap.addTilesetImage("Fishes_3_32x32", "Fishes_3_32x32");
		shapetownFarmingMap.addTilesetImage("LakeDecoration", "LakeAccessor");
		shapetownFarmingMap.addTilesetImage("LakeFloatingRock_V03", "LakeFloatingRock_V03");
		shapetownFarmingMap.addTilesetImage("LakeFloatingRock_V01", "LakeFloatingRock_V01");
		shapetownFarmingMap.addTilesetImage("LakeFloatingRock_V02", "LakeFloatingRock_V02");
		shapetownFarmingMap.addTilesetImage("GroundAccessor", "GroundAccessor");

		// bG_Ground_1
		const bG_Ground_1 = shapetownFarmingMap.createLayer("BG/Ground", ["GroundTileset"], -768, -576);

		// bG_Grass_1
		const bG_Grass_1 = shapetownFarmingMap.createLayer("BG/Grass", ["GroundTileset"], -765, -576);

		// bG_Cliff_1
		const bG_Cliff_1 = shapetownFarmingMap.createLayer("BG/Cliff", ["ForrestLadge"], -768, -576);

		// bG_Stairs_1
		const bG_Stairs_1 = shapetownFarmingMap.createLayer("BG/Stairs", ["ForrestLadge"], -768, -576);

		// lake_lake_1
		const lake_lake_1 = shapetownFarmingMap.createLayer("Lake/lake", ["LakeBorderAni","LakeBorderCornerAni","Fishes_3_32x32"], -768, -576);

		// lake_Lake_Decoration_1
		const lake_Lake_Decoration_1 = shapetownFarmingMap.createLayer("Lake/Lake Decoration", ["LakeFloatingRock_V03","LakeDecoration","LakeFloatingRock_V01","LakeFloatingRock_V02"], -768, -576);

		// tree_border_
		const tree_border_ = shapetownFarmingMap.createLayer("tree border/7", ["TreePatteren"], -768, -576);

		// tree_border
		const tree_border = shapetownFarmingMap.createLayer("tree border/6", ["TreePatteren"], -768, -576);

		// tree_border_1
		const tree_border_1 = shapetownFarmingMap.createLayer("tree border/5", ["TreePatteren"], -768, -576);

		// tree_border_2
		const tree_border_2 = shapetownFarmingMap.createLayer("tree border/5", ["TreePatteren"], -768, -576);

		// tree_border_3
		const tree_border_3 = shapetownFarmingMap.createLayer("tree border/4", ["TreePatteren"], -768, -576);

		// tree_border_4
		const tree_border_4 = shapetownFarmingMap.createLayer("tree border/3", ["TreePatteren"], -768, -576);

		// tree_border_5
		const tree_border_5 = shapetownFarmingMap.createLayer("tree border/2", ["TreePatteren"], -768, -576);

		// tree_border_6
		const tree_border_6 = shapetownFarmingMap.createLayer("tree border/1", ["TreePatteren"], -768, -576);

		// tile_Layer
		const tile_Layer = shapetownFarmingMap.createLayer("Tile Layer 15", [], -768, -576);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, -414, -208);
		this.add.existing(playerPrefab);

		// shapeFarmingHousePrefab
		const shapeFarmingHousePrefab = new ShapeFarmingHousePrefab(this, -188, -209);
		this.add.existing(shapeFarmingHousePrefab);

		this.bG_Ground_1 = bG_Ground_1;
		this.bG_Grass_1 = bG_Grass_1;
		this.bG_Cliff_1 = bG_Cliff_1;
		this.bG_Stairs_1 = bG_Stairs_1;
		this.lake_lake_1 = lake_lake_1;
		this.lake_Lake_Decoration_1 = lake_Lake_Decoration_1;
		this.tree_border_ = tree_border_;
		this.tree_border = tree_border;
		this.tree_border_1 = tree_border_1;
		this.tree_border_2 = tree_border_2;
		this.tree_border_3 = tree_border_3;
		this.tree_border_4 = tree_border_4;
		this.tree_border_5 = tree_border_5;
		this.tree_border_6 = tree_border_6;
		this.tile_Layer = tile_Layer;
		this.playerPrefab = playerPrefab;
		this.shapeFarmingHousePrefab = shapeFarmingHousePrefab;
		this.shapetownFarmingMap = shapetownFarmingMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Ground_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Cliff_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Stairs_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_lake_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_Lake_Decoration_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_3;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_4;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_5;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_6;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tile_Layer;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {ShapeFarmingHousePrefab} */
	shapeFarmingHousePrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownFarmingMap;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.cameras.main.setBounds(-768, -568, 2540, 1880);
		this.physics.world.bounds.width = 1000;
		this.physics.world.bounds.height = 800;

		this.shapeFarmingHousePrefab.setupCollision(this.playerPrefab);

		this.setupSimpleAlertSystem();
		
		this.triggerQuestEvent('player:enteredFarm');
		
		this.createFarmingPlots();
	}
	
	setupSimpleAlertSystem() {
		this.alertPrefab = {
			alert: (message) => {
				const alertText = this.add.text(
					this.cameras.main.centerX, 
					100, 
					message, 
					{ 
						backgroundColor: '#000000', 
						padding: { x: 15, y: 10 }, 
						borderRadius: 5,
						color: '#ffffff',
						fontSize: '20px'
					}
				).setOrigin(0.5);
				
				alertText.setDepth(1000);
				
				this.tweens.add({
					targets: alertText,
					alpha: 0,
					duration: 2000,
					delay: 2000,
					onComplete: () => alertText.destroy()
				});
			}
		};
	}
	
	createFarmingPlots() {
		if (typeof HarvestPrefab !== 'undefined') {
			extendHarvestPrefab(HarvestPrefab);
			
			this.farmingPlots = [];
			
			const farmStartX = -300;
			const farmStartY = -100;
			const plotSize = 32;
			
			for (let y = 0; y < 4; y++) {
				for (let x = 0; x < 5; x++) {
					const plot = new HarvestPrefab(
						this, 
						farmStartX + (x * plotSize), 
						farmStartY + (y * plotSize)
					);
					
					plot.state = "ROCK";
					plot.setupBasedOnState();
					
					this.farmingPlots.push(plot);
				}
			}
		}
	}

	/* END-USER-CODE */
}

export default extendSceneWithQuests(ShapeFarmingScene);

/* END OF COMPILED CODE */

// You can write more code here