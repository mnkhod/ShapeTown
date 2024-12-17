
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import ItemHudPrefab from "../prefabs/hud/ItemHudPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FarmingScene extends Phaser.Scene {

	constructor() {
		super("FarmingScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// farmingMap
		const farmingMap = this.add.tilemap("FarmingMap");
		farmingMap.addTilesetImage("GroundTileset", "GroundTileset");
		farmingMap.addTilesetImage("TiletTreePattern", "TreePatteren");
		farmingMap.addTilesetImage("GroundTilestSoil", "GroundTilestSoil");
		farmingMap.addTilesetImage("CityHouses_v02", "CityHouses_v02");
		farmingMap.addTilesetImage("FarmHorseStable", "FarmHorseStable");
		farmingMap.addTilesetImage("LakeFloatingRock_V03", "LakeFloatingRock_V03");
		farmingMap.addTilesetImage("LakeFloatingRock_V01", "LakeFloatingRock_V01");
		farmingMap.addTilesetImage("LakeFloatingRock_V02", "LakeFloatingRock_V02");
		farmingMap.addTilesetImage("Flower_v05", "Flower_v05");
		farmingMap.addTilesetImage("Flower_v01", "Flower_v01");
		farmingMap.addTilesetImage("Flower_v02", "Flower_v02");
		farmingMap.addTilesetImage("Flower_v03", "Flower_v03");
		farmingMap.addTilesetImage("Flower_v04", "Flower_v04");
		farmingMap.addTilesetImage("LakeAccessor", "LakeAccessor");
		farmingMap.addTilesetImage("GroundAccessor", "GroundAccessor");
		farmingMap.addTilesetImage("RoadStone", "RoadStone");
		farmingMap.addTilesetImage("Tree_v09", "Tree_v09");
		farmingMap.addTilesetImage("Tree_v08", "Tree_v08");
		farmingMap.addTilesetImage("DecorationClouthHangger", "DecorationClouthHangger");
		farmingMap.addTilesetImage("Tree_v02", "Tree_v02");
		farmingMap.addTilesetImage("Tree_v014", "Tree_v014");
		farmingMap.addTilesetImage("Fruitbushes_V01", "Fruitbushes_V01");
		farmingMap.addTilesetImage("NPCShopStandMaerchant", "NPCShopStandMaerchant");
		farmingMap.addTilesetImage("ShopInteriorObjects_", "ShopInteriorObjects_");
		farmingMap.addTilesetImage("StoneFance.", "StoneFance.");

		// render_BackGround_1
		const render_BackGround_1 = farmingMap.createLayer("Render/BackGround", ["GroundTileset","RoadStone"], -864, -496);

		// render_RoadStone_JustRender__1
		const render_RoadStone_JustRender__1 = farmingMap.createLayer("Render/RoadStone[JustRender]", ["RoadStone"], -864, -496);

		// render_FenceWooden_Make_a_Collider__1
		const render_FenceWooden_Make_a_Collider__1 = farmingMap.createLayer("Render/FenceWooden[Make a Collider]", ["RoadStone"], -864, -496);

		// dEVS_IMPORTANT____Soil_Are_which_can_plain_crop_on_top__1
		const dEVS_IMPORTANT____Soil_Are_which_can_plain_crop_on_top__1 = farmingMap.createLayer("DEVS IMPORTANT!!!/Soil[Are which can plain crop on top]", ["GroundTilestSoil"], -864, -496);

		// dEVS_IMPORTANT____Removeable_Assets_1
		const dEVS_IMPORTANT____Removeable_Assets_1 = farmingMap.createLayer("DEVS IMPORTANT!!!/Removeable Assets", ["Flower_v02","Flower_v01","Flower_v03","Flower_v04","GroundAccessor","CityHouses_v02","RoadStone","Flower_v05"], -864, -496);

		// treeBorder_TreeL
		const treeBorder_TreeL = farmingMap.createLayer("TreeBorder/TreeL7", ["TiletTreePattern"], -864, -496);

		// treeBorder_TreeL_1
		const treeBorder_TreeL_1 = farmingMap.createLayer("TreeBorder/TreeL6", ["TiletTreePattern"], -864, -496);

		// treeBorder_StoneFance_1
		const treeBorder_StoneFance_1 = farmingMap.createLayer("TreeBorder/StoneFance", ["StoneFance."], -864, -496);

		// treeBorder_TreeL_2
		const treeBorder_TreeL_2 = farmingMap.createLayer("TreeBorder/TreeL4", ["TiletTreePattern"], -864, -496);

		// treeBorder_TreeL_3
		const treeBorder_TreeL_3 = farmingMap.createLayer("TreeBorder/TreeL3", ["TiletTreePattern"], -864, -496);

		// treeBorder_TreeL_4
		const treeBorder_TreeL_4 = farmingMap.createLayer("TreeBorder/TreeL2", ["TiletTreePattern"], -864, -496);

		// treeBorder_TreeL_5
		const treeBorder_TreeL_5 = farmingMap.createLayer("TreeBorder/TreeL1", ["TiletTreePattern"], -864, -496);

		// house_area_HouseUnderGround_1
		const house_area_HouseUnderGround_1 = farmingMap.createLayer("House area/HouseUnderGround", ["GroundTileset"], -864, -496);

		// house_area_House_1
		const house_area_House_1 = farmingMap.createLayer("House area/House", ["CityHouses_v02"], -864, -496);

		// house_area_chest_1
		const house_area_chest_1 = farmingMap.createLayer("House area/chest", ["ShopInteriorObjects_"], -864, -496);

		// group_5_Decoration_1
		const group_5_Decoration_1 = farmingMap.createLayer("Group 5/Decoration", ["DecorationClouthHangger"], -864, -496);

		// group_5_Dead_treee_1
		const group_5_Dead_treee_1 = farmingMap.createLayer("Group 5/Dead treee", ["Tree_v09","Tree_v02","Tree_v08","Tree_v014"], -864, -496);

		// group_5_StrawberryBush_1
		const group_5_StrawberryBush_1 = farmingMap.createLayer("Group 5/StrawberryBush", ["Fruitbushes_V01"], -864, -496);

		// merchant_shopStand_1
		const merchant_shopStand_1 = farmingMap.createLayer("Merchant/shopStand", ["FarmHorseStable"], -864, -496);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, -302, 506);
		this.add.existing(playerPrefab);

		// sceneTilePrev
		const sceneTilePrev = this.physics.add.sprite(-401, 532, "CityHouses_v02", 0);
		sceneTilePrev.scaleY = 10;
		sceneTilePrev.body.allowGravity = false;
		sceneTilePrev.body.setSize(32, 200, false);

		// sceneTileNext
		const sceneTileNext = this.physics.add.sprite(1486, 517, "CityHouses_v02", 0);
		sceneTileNext.scaleY = 10;
		sceneTileNext.body.allowGravity = false;
		sceneTileNext.body.setSize(32, 200, false);

		// questBookPrefab
		const questBookPrefab = new QuestBookPrefab(this, 32, 736);
		this.add.existing(questBookPrefab);

		// itemHudPrefab
		const itemHudPrefab = new ItemHudPrefab(this, 624.0380088210627, 714.0380069435164);
		this.add.existing(itemHudPrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 723.2936950522075, -0.19542285335897702);
		this.add.existing(messagePrefab);

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, -0.06503853301296658, 0.012522237048884222);
		this.add.existing(alertPrefab);

		// itemHudPrefab (prefab fields)
		itemHudPrefab.player = playerPrefab;

		this.render_BackGround_1 = render_BackGround_1;
		this.render_RoadStone_JustRender__1 = render_RoadStone_JustRender__1;
		this.render_FenceWooden_Make_a_Collider__1 = render_FenceWooden_Make_a_Collider__1;
		this.dEVS_IMPORTANT____Soil_Are_which_can_plain_crop_on_top__1 = dEVS_IMPORTANT____Soil_Are_which_can_plain_crop_on_top__1;
		this.dEVS_IMPORTANT____Removeable_Assets_1 = dEVS_IMPORTANT____Removeable_Assets_1;
		this.treeBorder_TreeL = treeBorder_TreeL;
		this.treeBorder_TreeL_1 = treeBorder_TreeL_1;
		this.treeBorder_StoneFance_1 = treeBorder_StoneFance_1;
		this.treeBorder_TreeL_2 = treeBorder_TreeL_2;
		this.treeBorder_TreeL_3 = treeBorder_TreeL_3;
		this.treeBorder_TreeL_4 = treeBorder_TreeL_4;
		this.treeBorder_TreeL_5 = treeBorder_TreeL_5;
		this.house_area_HouseUnderGround_1 = house_area_HouseUnderGround_1;
		this.house_area_House_1 = house_area_House_1;
		this.house_area_chest_1 = house_area_chest_1;
		this.group_5_Decoration_1 = group_5_Decoration_1;
		this.group_5_Dead_treee_1 = group_5_Dead_treee_1;
		this.group_5_StrawberryBush_1 = group_5_StrawberryBush_1;
		this.merchant_shopStand_1 = merchant_shopStand_1;
		this.playerPrefab = playerPrefab;
		this.sceneTilePrev = sceneTilePrev;
		this.sceneTileNext = sceneTileNext;
		this.questBookPrefab = questBookPrefab;
		this.itemHudPrefab = itemHudPrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.farmingMap = farmingMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	render_BackGround_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	render_RoadStone_JustRender__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	render_FenceWooden_Make_a_Collider__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	dEVS_IMPORTANT____Soil_Are_which_can_plain_crop_on_top__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	dEVS_IMPORTANT____Removeable_Assets_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeL;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeL_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_StoneFance_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeL_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeL_3;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeL_4;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeL_5;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	house_area_HouseUnderGround_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	house_area_House_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	house_area_chest_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	group_5_Decoration_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	group_5_Dead_treee_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	group_5_StrawberryBush_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	merchant_shopStand_1;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	sceneTilePrev;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	sceneTileNext;
	/** @type {QuestBookPrefab} */
	questBookPrefab;
	/** @type {ItemHudPrefab} */
	itemHudPrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	farmingMap;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

    	this.physics.add.collider(this.playerPrefab, this.merchant_shopStand_1);
    	this.merchant_shopStand_1.setCollisionBetween(0, 10000);
		// this.merchant_shopStand_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.group_5_StrawberryBush_1);
    	this.group_5_StrawberryBush_1.setCollisionBetween(0, 10000);
		// this.group_5_StrawberryBush_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.group_5_Dead_treee_1);
    	this.group_5_Dead_treee_1.setCollisionBetween(0, 10000);
		// this.group_5_Dead_treee_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.group_5_Decoration_1);
    	this.group_5_Decoration_1.setCollisionBetween(0, 10000);
		// this.group_5_Decoration_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.house_area_chest_1);
    	this.house_area_chest_1.setCollisionBetween(0, 10000);
		// this.house_area_chest_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.house_area_House_1);
    	this.house_area_House_1.setCollisionBetween(0, 10000);
		// this.house_area_House_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_StoneFance_1);
    	this.treeBorder_StoneFance_1.setCollisionBetween(0, 10000);
		// this.treeBorder_StoneFance_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeL);
    	this.treeBorder_TreeL.setCollisionBetween(0, 10000);
		// this.treeBorder_TreeL.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeL_1);
    	this.treeBorder_TreeL_1.setCollisionBetween(0, 10000);
		// this.treeBorder_TreeL_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeL_2);
    	this.treeBorder_TreeL_2.setCollisionBetween(0, 10000);
		// this.treeBorder_TreeL_2.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeL_3);
    	this.treeBorder_TreeL_3.setCollisionBetween(0, 10000);
		// this.treeBorder_TreeL_3.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeL_4);
    	this.treeBorder_TreeL_4.setCollisionBetween(0, 10000);
		// this.treeBorder_TreeL_4.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeL_5);
    	this.treeBorder_TreeL_5.setCollisionBetween(0, 10000);
		// this.treeBorder_TreeL_5.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.render_FenceWooden_Make_a_Collider__1);
    	this.render_FenceWooden_Make_a_Collider__1.setCollisionBetween(0, 10000);
		// this.render_FenceWooden_Make_a_Collider__1.renderDebug(this.add.graphics());


		this.physics.add.overlap(this.sceneTilePrev, this.playerPrefab, () => {
			this.playerPrefab.x += 50
            this.scene.switch("TutorialScene");
        });

		this.physics.add.overlap(this.sceneTileNext, this.playerPrefab, () => {
			this.playerPrefab.x -= 50
            this.scene.switch("MarketScene");
        });


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
