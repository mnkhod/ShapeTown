
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import ShapeFarmingHousePrefab from "../prefabs/House/ShapeFarmingHousePrefab";
import AppleTreePrefab from "../prefabs/Trees/AppleTreePrefab";
import OldManJackNpcPrefab from "../prefabs/npcs/OldManJackNpcPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ShapeTownFarmingMapScene extends Phaser.Scene {

	constructor() {
		super("ShapeTownFarmingMapScene");

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
		shapetownFarmingMap.addTilesetImage("GroundTileset_V02", "GroundTileset_V02");
		shapetownFarmingMap.addTilesetImage("SoilCorner_v02", "SoilCorner_v02");
		shapetownFarmingMap.addTilesetImage("RocksOnGrass_V01", "RocksOnGrass_V01");
		shapetownFarmingMap.addTilesetImage("RockOnGrass_V02", "RockOnGrass_V02");
		shapetownFarmingMap.addTilesetImage("RoadStone", "RoadStone");

		// bG_Grass_1
		const bG_Grass_1 = shapetownFarmingMap.createLayer("BG/Grass", ["GroundTileset_V02"], 0, 0);

		// bG_Cliff_1
		const bG_Cliff_1 = shapetownFarmingMap.createLayer("BG/Cliff", ["GroundTileset_V02","RockOnGrass_V02"], 0, 0);

		// bG_Rock_On_Cliff_1
		const bG_Rock_On_Cliff_1 = shapetownFarmingMap.createLayer("BG/Rock On Cliff", ["RocksOnGrass_V01"], 0, 0);

		// bG_ramp_1
		const bG_ramp_1 = shapetownFarmingMap.createLayer("BG/ramp", [], 0, 0);

		// lake_lake_1
		const lake_lake_1 = shapetownFarmingMap.createLayer("Lake/lake", ["LakeBorderAni","LakeBorderCornerAni","Fishes_3_32x32"], 0, 0);

		// lake_Lake_Decoration_1
		const lake_Lake_Decoration_1 = shapetownFarmingMap.createLayer("Lake/Lake Decoration", ["LakeFloatingRock_V03","LakeDecoration","LakeFloatingRock_V01","LakeFloatingRock_V02"], 0, 0);

		// tree_border_Fence_1
		const tree_border_Fence_1 = shapetownFarmingMap.createLayer("tree border/Fence", ["RoadStone"], 0, 0);

		// tree_border_
		const tree_border_ = shapetownFarmingMap.createLayer("tree border/7", ["TreePatteren"], 0, 0);

		// tree_border
		const tree_border = shapetownFarmingMap.createLayer("tree border/6", ["TreePatteren"], 0, 0);

		// tree_border_1
		const tree_border_1 = shapetownFarmingMap.createLayer("tree border/5", ["TreePatteren"], 0, 0);

		// tree_border_2
		const tree_border_2 = shapetownFarmingMap.createLayer("tree border/4", ["TreePatteren"], 0, 0);

		// tree_border_3
		const tree_border_3 = shapetownFarmingMap.createLayer("tree border/3", ["TreePatteren"], 0, 0);

		// tree_border_4
		const tree_border_4 = shapetownFarmingMap.createLayer("tree border/2", ["TreePatteren"], 0, 0);

		// tree_border_5
		const tree_border_5 = shapetownFarmingMap.createLayer("tree border/1", ["TreePatteren"], 0, 0);

		// tree_border_6
		const tree_border_6 = shapetownFarmingMap.createLayer("tree border/0", ["TreePatteren"], 0, 0);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 434, 633);
		this.add.existing(playerPrefab);

		// shapeFarmingHousePrefab
		const shapeFarmingHousePrefab = new ShapeFarmingHousePrefab(this, 576, 360);
		this.add.existing(shapeFarmingHousePrefab);

		// appleTreePrefab
		const appleTreePrefab = new AppleTreePrefab(this, 526, 967);
		this.add.existing(appleTreePrefab);

		// tree_border_7
		const tree_border_7 = shapetownFarmingMap.createLayer("tree border/7", ["TreePatteren"], 0, 0);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(2470, 1112, "Fruitbushes_V01", 23);
		sceneTile.scaleX = 1.3069946364802347;
		sceneTile.scaleY = 10.586085054631967;
		this.physics.add.existing(sceneTile, false);
		sceneTile.body.allowGravity = false;
		sceneTile.body.setSize(32, 200, false);

		// oldManJackNpcPrefab
		const oldManJackNpcPrefab = new OldManJackNpcPrefab(this, 650, 660);
		this.add.existing(oldManJackNpcPrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 2260, 0);
		this.add.existing(messagePrefab);

		// newItemHudPrefab
		const newItemHudPrefab = new NewItemHudPrefab(this, 422, 205);
		this.add.existing(newItemHudPrefab);

		// oldManJackNpcPrefab (prefab fields)
		oldManJackNpcPrefab.player = playerPrefab;
		oldManJackNpcPrefab.msgPrefab = messagePrefab;
		oldManJackNpcPrefab.itemHud = newItemHudPrefab;
		// oldManJackNpcPrefab.bookHud = questBookPrefab;

		this.bG_Grass_1 = bG_Grass_1;
		this.bG_Cliff_1 = bG_Cliff_1;
		this.bG_Rock_On_Cliff_1 = bG_Rock_On_Cliff_1;
		this.bG_ramp_1 = bG_ramp_1;
		this.lake_lake_1 = lake_lake_1;
		this.lake_Lake_Decoration_1 = lake_Lake_Decoration_1;
		this.tree_border_Fence_1 = tree_border_Fence_1;
		this.tree_border_ = tree_border_;
		this.tree_border = tree_border;
		this.tree_border_1 = tree_border_1;
		this.tree_border_2 = tree_border_2;
		this.tree_border_3 = tree_border_3;
		this.tree_border_4 = tree_border_4;
		this.tree_border_5 = tree_border_5;
		this.tree_border_6 = tree_border_6;
		this.playerPrefab = playerPrefab;
		this.shapeFarmingHousePrefab = shapeFarmingHousePrefab;
		this.appleTreePrefab = appleTreePrefab;
		this.tree_border_7 = tree_border_7;
		this.sceneTile = sceneTile;
		this.oldManJackNpcPrefab = oldManJackNpcPrefab;
		this.messagePrefab = messagePrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.shapetownFarmingMap = shapetownFarmingMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Cliff_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Rock_On_Cliff_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_ramp_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_lake_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_Lake_Decoration_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_Fence_1;
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
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {ShapeFarmingHousePrefab} */
	shapeFarmingHousePrefab;
	/** @type {AppleTreePrefab} */
	appleTreePrefab;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_7;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	sceneTile;
	/** @type {OldManJackNpcPrefab} */
	oldManJackNpcPrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {NewItemHudPrefab} */
	newItemHudPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownFarmingMap;

	/* START-USER-CODE */

	// Write your code here

	create() {
	  	this.editorCreate();

	  	this.cameras.main.setBounds(0, 0, 2550, 1920);
	  	this.physics.world.bounds.width = 1000;
	  	this.physics.world.bounds.height = 800;

	  	this.achievements = {
	  	  	firstHarvestAchievement: false,
	  	  	giftFromNatureAchievement: false,
	  	  	firstFishAchievement: false
	  	};

	  	this.oldManJackNpcPrefab.player = this.playerPrefab;
	  	this.oldManJackNpcPrefab.msgPrefab = this.messagePrefab;
	  	this.oldManJackNpcPrefab.alertPrefab = this.alertPrefab;
	  	this.oldManJackNpcPrefab.itemHud = this.newItemHudPrefab;
	  	this.oldManJackNpcPrefab.profilePrefab = null;

	  	this.newItemHudPrefab.visible = true;

	  	this.shapeFarmingHousePrefab.setupCollision(this.playerPrefab);

	  	this.physics.add.collider(this.playerPrefab, this.lake_lake_1);
	  	this.lake_lake_1.setCollisionBetween(0, 10000);
	  	// this.lake_lake_1.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border);
	  	this.tree_border.setCollisionBetween(0, 10000);
	  	// this.tree_border.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border_1);
	  	this.tree_border_1.setCollisionBetween(0, 10000);
	  	// this.tree_border_1.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border_2);
	  	this.tree_border_2.setCollisionBetween(0, 10000);
	  	// this.tree_border_2.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border_3);
	  	this.tree_border_3.setCollisionBetween(0, 10000);
	  	// this.tree_border_3.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border_4);
	  	this.tree_border_4.setCollisionBetween(0, 10000);
	  	// this.tree_border_4.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border_5);
	  	this.tree_border_5.setCollisionBetween(0, 10000);
	  	// this.tree_border_5.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.tree_border_6);
	  	this.tree_border_6.setCollisionBetween(0, 10000);
	  	// this.tree_border_6.renderDebug(this.add.graphics());

	  	this.physics.add.collider(this.playerPrefab, this.bG_Cliff_1);
	  	this.bG_Cliff_1.setCollisionBetween(0, 10000);
	  	// this.bG_Cliff_1.renderDebug(this.add.graphics());

	  	this.appleTreePrefab.setupCollision(this.playerPrefab);
	  	this.physics.add.collider(this.playerPrefab, this.appleTreePrefab);
	  	// this.appleTreePrefab.renderDebug(this.add.graphics());

				this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
		    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
			}

		    this.scene.switch("ShapeTownSquareMapScene");
		    this.playerPrefab.x -= 50;
		    this.cameras.main.fadeIn(2000, 0, 0, 0);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
