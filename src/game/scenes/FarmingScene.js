
// You can write more code here

/* START OF COMPILED CODE */

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
		farmingMap.addTilesetImage("FarmHorseStable", "FarmHorseStable");
		farmingMap.addTilesetImage("NPCShopStandMaerchant", "NPCShopStandMaerchant");

		// render_BackGround_1
		farmingMap.createLayer("Render/BackGround", ["RoadStone"], -1130, -755);

		// render_RoadStone_JustRender__1
		farmingMap.createLayer("Render/RoadStone[JustRender]", ["RoadStone"], -1130, -755);

		// render_FenceWooden_Make_a_Collider__1
		farmingMap.createLayer("Render/FenceWooden[Make a Collider]", ["RoadStone"], -1130, -755);

		// dEVS_IMPORTANT____Soil_Are_which_can_plain_crop_on_top__1
		farmingMap.createLayer("DEVS IMPORTANT!!!/Soil[Are which can plain crop on top]", ["GroundTilestSoil"], -1130, -755);

		// dEVS_IMPORTANT____Removeable_Assets_1
		farmingMap.createLayer("DEVS IMPORTANT!!!/Removeable Assets", ["Flower_v02","Flower_v01","Flower_v03","GroundAccessor","Flower_v04","RoadStone","CityHouses_v02","Flower_v05"], -1130, -755);

		// treeBorder_TreeL
		farmingMap.createLayer("TreeBorder/TreeL7", ["TiletTreePattern"], -1130, -755);

		// treeBorder_TreeL_1
		farmingMap.createLayer("TreeBorder/TreeL6", ["TiletTreePattern"], -1130, -755);

		// treeBorder_TreeL_2
		farmingMap.createLayer("TreeBorder/TreeL5", ["TiletTreePattern"], -1130, -755);

		// treeBorder_TreeL_3
		farmingMap.createLayer("TreeBorder/TreeL4", ["TiletTreePattern"], -1130, -755);

		// treeBorder_TreeL_4
		farmingMap.createLayer("TreeBorder/TreeL3", ["TiletTreePattern"], -1130, -755);

		// treeBorder_TreeL_5
		farmingMap.createLayer("TreeBorder/TreeL2", ["TiletTreePattern"], -1130, -755);

		// treeBorder_TreeL_6
		farmingMap.createLayer("TreeBorder/TreeL1", ["TiletTreePattern"], -1130, -755);

		// house_area_HouseUnderGround_1
		farmingMap.createLayer("House area/HouseUnderGround", ["GroundTileset"], -1130, -755);

		// house_area_House_1
		farmingMap.createLayer("House area/House", ["CityHouses_v02"], -1130, -755);

		// group_5_Decoration_1
		farmingMap.createLayer("Group 5/Decoration", ["DecorationClouthHangger"], -1130, -755);

		// group_5_Dead_treee_1
		farmingMap.createLayer("Group 5/Dead treee", ["Tree_v09","Tree_v02","Tree_v08","Tree_v014"], -1130, -755);

		// group_5_StrawberryBush_1
		farmingMap.createLayer("Group 5/StrawberryBush", ["Fruitbushes_V01"], -1130, -755);

		// merchant_shopStand_1
		farmingMap.createLayer("Merchant/shopStand", ["FarmHorseStable"], -1130, -755);

		// merchant_NPCMerchant_1
		farmingMap.createLayer("Merchant/NPCMerchant", ["NPCShopStandMaerchant"], -1130, -755);

		this.farmingMap = farmingMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.Tilemap} */
	farmingMap;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
