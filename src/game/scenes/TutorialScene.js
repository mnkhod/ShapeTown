
// You can write more code here
import { EventBus } from '../EventBus';

/* START OF COMPILED CODE */

import HarvestPrefab from "../prefabs/objects/HarvestPrefab";
import OldManJackNpcPrefab from "../prefabs/npcs/OldManJackNpcPrefab";
import PlayerPrefab from "../prefabs/PlayerPrefab";
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import ItemHudPrefab from "../prefabs/hud/ItemHudPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TutorialScene extends Phaser.Scene {

	constructor() {
		super("TutorialScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.reactEvent = EventBus
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// tutorialMap
		const tutorialMap = this.add.tilemap("TutorialMap");
		tutorialMap.addTilesetImage("GroundTileset", "GroundTileset");
		tutorialMap.addTilesetImage("RoadStone", "RoadStone");
		tutorialMap.addTilesetImage("TreePatteren", "TreePatteren");
		tutorialMap.addTilesetImage("GroundTilestSoil", "GroundTilestSoil");
		tutorialMap.addTilesetImage("GroundAccessor", "GroundAccessor");
		tutorialMap.addTilesetImage("LakeAccessor", "LakeAccessor");
		tutorialMap.addTilesetImage("Fishes_1_32x32gif", "Fishes_1_32x32gif");
		tutorialMap.addTilesetImage("Fishes_2_32x32", "Fishes_2_32x32");
		tutorialMap.addTilesetImage("Fishes_3_32x32", "Fishes_3_32x32");
		tutorialMap.addTilesetImage("LakeFloatingRock_V02", "LakeFloatingRock_V02");
		tutorialMap.addTilesetImage("LakeFloatingRock_V01", "LakeFloatingRock_V01");
		tutorialMap.addTilesetImage("TutorliarNPCHouse", "TutorliarNPCHouse");
		tutorialMap.addTilesetImage("Apple", "Apple");
		tutorialMap.addTilesetImage("Tree_v014", "Tree_v014");
		tutorialMap.addTilesetImage("Tree_v02", "Tree_v02");
		tutorialMap.addTilesetImage("Tree_v04", "Tree_v04");
		tutorialMap.addTilesetImage("Tree_v08", "Tree_v08");
		tutorialMap.addTilesetImage("Tree_v09", "Tree_v09");
		tutorialMap.addTilesetImage("FarmingCropsVer2", "FarmingCropsVer2");

		// map_environment_Background_Just_Render__1
		tutorialMap.createLayer("Map environment/Background[Just Render]", ["GroundTileset"], -768, -416);

		// map_environment_Ground_just_render__1
		tutorialMap.createLayer("Map environment/Ground[just render]", ["RoadStone"], -768, -416);

		// map_environment_Road_Just_render__1
		tutorialMap.createLayer("Map environment/Road[Just render]", ["RoadStone"], -768, -416);

		// layerFence
		const layerFence = tutorialMap.createLayer("Map environment/Fence[Make it collision]", ["RoadStone"], -768, -416);

		// farmingAreaFarmingTile
		const farmingAreaFarmingTile = tutorialMap.createLayer("Farming Area/FarmingTile[Use SEED to grow crops]", ["RoadStone"], -768, -416);

		// layerFishingPondBorder
		const layerFishingPondBorder = tutorialMap.createLayer("FishingPond/FishingPondBOrder[Make it Collision]", ["GroundTileset"], -768, -416);

		// fishingPond_FishingPondWater_Anywhere_can_be_fishing_action_start__1
		tutorialMap.createLayer("FishingPond/FishingPondWater[Anywhere can be fishing action start]", ["GroundTileset","LakeAccessor","Fishes_3_32x32"], -768, -416);

		// fishingPond_FishingPondAccessor__just_render__1
		tutorialMap.createLayer("FishingPond/FishingPondAccessor[]just render]", ["LakeAccessor","LakeFloatingRock_V02","LakeFloatingRock_V01"], -768, -416);

		// layerTreeBorder1
		const layerTreeBorder1 = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder", ["TreePatteren"], -768, -416);

		// layerTreeBorder
		const layerTreeBorder = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder1", ["TreePatteren"], -768, -416);

		// layerTreeBorder2
		const layerTreeBorder2 = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder2", ["TreePatteren"], -768, -416);

		// layerHouseGround
		const layerHouseGround = tutorialMap.createLayer("House/HouseGround", ["GroundTileset"], -768, -416);

		// layerHouse1
		const layerHouse1 = tutorialMap.createLayer("House/House", ["TutorliarNPCHouse","Apple"], -767, -415);

		// layerDeadTree
		const layerDeadTree = tutorialMap.createLayer("Tree/DeadTree", ["Tree_v08"], -768, -416);

		// layerAppleTree
		const layerAppleTree = tutorialMap.createLayer("Tree/AppleTree", ["Tree_v02","Tree_v014"], -768, -416);

		// layerPine
		const layerPine = tutorialMap.createLayer("Tree/PineTree", ["Apple"], -768, -416);

		// layerMapleTree
		const layerMapleTree = tutorialMap.createLayer("Tree/MapleTree", ["Tree_v04"], -768, -416);

		// mapLayers
		this.add.container(0, 0);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(1259, 382, "Fruitbushes_V01", 23);
		sceneTile.scaleX = 1.3069946364802347;
		sceneTile.scaleY = 10.586085054631967;
		this.physics.add.existing(sceneTile, false);
		sceneTile.body.allowGravity = false;
		sceneTile.body.setSize(32, 200, false);

		// harvestPrefab
		const harvestPrefab = new HarvestPrefab(this, 207, 592);
		this.add.existing(harvestPrefab);

		// harvestPrefab_1
		const harvestPrefab_1 = new HarvestPrefab(this, 240, 592);
		this.add.existing(harvestPrefab_1);

		// harvestPrefab_2
		const harvestPrefab_2 = new HarvestPrefab(this, 273, 592);
		this.add.existing(harvestPrefab_2);

		// harvestPrefab_3
		const harvestPrefab_3 = new HarvestPrefab(this, 306, 592);
		this.add.existing(harvestPrefab_3);

		// oldManJackNpcPrefab
		const oldManJackNpcPrefab = new OldManJackNpcPrefab(this, 361, 216);
		this.add.existing(oldManJackNpcPrefab);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 336, 429);
		this.add.existing(playerPrefab);

		// questBookPrefab
		const questBookPrefab = new QuestBookPrefab(this, 32, 736);
		this.add.existing(questBookPrefab);

		// itemHudPrefab
		const itemHudPrefab = new ItemHudPrefab(this, 624.0380149603411, 714.0380149603411);
		this.add.existing(itemHudPrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 0.706304947792546, 0.8045771466410088);
		this.add.existing(messagePrefab);

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, 721.70328457044, 0.0215605880291605);
		this.add.existing(alertPrefab);

		// oldManJackNpcPrefab (prefab fields)
		oldManJackNpcPrefab.player = playerPrefab;
		oldManJackNpcPrefab.msgPrefab = messagePrefab;
		oldManJackNpcPrefab.itemHud = itemHudPrefab;
		oldManJackNpcPrefab.bookHud = questBookPrefab;

		// itemHudPrefab (prefab fields)
		itemHudPrefab.player = playerPrefab;

		this.layerFence = layerFence;
		this.farmingAreaFarmingTile = farmingAreaFarmingTile;
		this.layerFishingPondBorder = layerFishingPondBorder;
		this.layerTreeBorder1 = layerTreeBorder1;
		this.layerTreeBorder = layerTreeBorder;
		this.layerTreeBorder2 = layerTreeBorder2;
		this.layerHouseGround = layerHouseGround;
		this.layerHouse1 = layerHouse1;
		this.layerDeadTree = layerDeadTree;
		this.layerAppleTree = layerAppleTree;
		this.layerPine = layerPine;
		this.layerMapleTree = layerMapleTree;
		this.sceneTile = sceneTile;
		this.playerPrefab = playerPrefab;
		this.questBookPrefab = questBookPrefab;
		this.itemHudPrefab = itemHudPrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.tutorialMap = tutorialMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerFence;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	farmingAreaFarmingTile;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerFishingPondBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerTreeBorder1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerTreeBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerTreeBorder2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerHouseGround;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerHouse1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerDeadTree;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerAppleTree;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerPine;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerMapleTree;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	sceneTile;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {QuestBookPrefab} */
	questBookPrefab;
	/** @type {ItemHudPrefab} */
	itemHudPrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	tutorialMap;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.physics.add.collider(this.playerPrefab, this.layerMapleTree);
		this.layerMapleTree.setCollisionBetween(2000,2200);
		// this.layerMapleTree.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerTreeBorder);
		this.layerTreeBorder.setCollisionBetween(1573,1724);
		// this.layerTreeBorder.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerTreeBorder1);
		this.layerTreeBorder1.setCollisionBetween(1361,1471);
		// this.layerTreeBorder1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerTreeBorder2);
		this.layerTreeBorder2.setCollisionBetween(1486,1551);
		// this.layerTreeBorder2.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerPine);
		this.layerPine.setCollision(1955);
		// this.layerPine.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerAppleTree);
		this.layerAppleTree.setCollisionBetween(1961,2004);
		// this.layerAppleTree.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerDeadTree);
		this.layerDeadTree.setCollisionBetween(2133,2144);
		// this.layerDeadTree.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerHouse1);
		this.layerHouse1.setCollisionBetween(1925,1948);
		// this.layerHouse1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerHouseGround);
		this.layerHouseGround.setCollisionBetween(633,672);
		// this.layerHouseGround.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFishingPondAccessor);
		// this.layerFishingPondAccessor.setCollisionBetween(1862,1917);
		// this.layerFishingPondAccessor.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFishingPondWaterForFishing);
		// this.layerFishingPondWaterForFishing.setCollisionBetween(130,1895);
		// this.layerFishingPondWaterForFishing.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFishingPondBorder);
		this.layerFishingPondBorder.setCollisionBetween(105,142);
		// this.layerFishingPondBorder.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFence);
		this.layerFence.setCollisionBetween(1252,1272);
		// this.layerFence.renderDebug(this.add.graphics());

		// this.physics.add.collider(this.playerPrefab, this.layerFarmingAreaRemoveable);
		// this.layerFarmingAreaRemoveable.setCollisionBetween(1292,1829);
		// this.layerFarmingAreaRemoveable.renderDebug(this.add.graphics());

		// this.physics.add.collider(this.playerPrefab, this.layerfarmingAreaDeadCrops);
		// this.layerfarmingAreaDeadCrops.setCollision(2226);
		// this.layerfarmingAreaDeadCrops.renderDebug(this.add.graphics());

		// this.physics.add.collider(this.playerPrefab, this.layerFarmingAreaCrops);
		// this.layerFarmingAreaCrops.setCollision(1282);
		// this.layerFarmingAreaCrops.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.farmingAreaFarmingTile);
		this.farmingAreaFarmingTile.setCollisionBetween(1282,1282);

		// this.farmingAreaFarmingTile.renderDebug(this.add.graphics());

		this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
            this.scene.switch("FarmingScene");
			this.playerPrefab.x -= 50
        });
		if (this.questBookPrefab) {
            this.questBookPrefab.visible = false;
        }
        if (this.itemHudPrefab) {
            this.itemHudPrefab.visible = false;
        }

		this.time.delayedCall(100, () => {
			this.questBookPrefab.visible = true

			this.itemHudPrefab.visible = true;
			this.itemHudPrefab.addItem("WATERING_CAN","IconBaseTools",0)
			this.itemHudPrefab.addItem("HOE","IconBaseTools",1)
			this.itemHudPrefab.addItem("PICK_AXE","IconBaseTools",2)
			this.itemHudPrefab.addItem("CARROT_SEED","SeedBag",0,5)
		}, {}, this)

		this.reactEvent.on('blockchain-account', (address) => {
            console.log(address);
        });
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
