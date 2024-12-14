
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MarketScene extends Phaser.Scene {

	constructor() {
		super("MarketScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// marketMap
		const marketMap = this.add.tilemap("MarketMap");
		marketMap.addTilesetImage("GroundTileset", "GroundTileset");
		marketMap.addTilesetImage("RoadStone", "RoadStone");
		marketMap.addTilesetImage("TreePatteren", "TreePatteren");
		marketMap.addTilesetImage("StoneFance.", "StoneFance.");
		marketMap.addTilesetImage("BeachWaterAni_V01", "BeachWaterAni_V01");
		marketMap.addTilesetImage("DeckOnTheBeach", "DeckOnTheBeach");
		marketMap.addTilesetImage("FishingBoat_V01R", "FishingBoat_V01R");
		marketMap.addTilesetImage("BeachStairs_V01R", "BeachStairs_V01R");
		marketMap.addTilesetImage("BeachTree_V1", "BeachTree_V1");
		marketMap.addTilesetImage("Ship_V01-Sheet", "Ship_V01-Sheet");
		marketMap.addTilesetImage("SeaLevelBuildingLighthouse_v01", "SeaLevelBuildingLighthouse_v01");
		marketMap.addTilesetImage("Campfire_2_32x32", "Campfire_2_32x32");
		marketMap.addTilesetImage("ShopInteriorObjects_", "ShopInteriorObjects_");
		marketMap.addTilesetImage("NPCGuardian_V01", "NPCGuardian_V01");
		marketMap.addTilesetImage("NpcBlaksmith", "NpcBlaksmith");
		marketMap.addTilesetImage("Campfire_32x32", "Campfire_32x32");
		marketMap.addTilesetImage("NPCOldManJack", "NPCOldManJack");
		marketMap.addTilesetImage("DecorationWeaponStand", "DecorationWeaponStand");
		marketMap.addTilesetImage("DecorationOnBeach", "DecorationOnBeach");
		marketMap.addTilesetImage("DecorationMarketplace", "DecorationMarketplace");
		marketMap.addTilesetImage("NPCMerchant", "NPCMerchant");
		marketMap.addTilesetImage("DecorationAngelStatue", "DecorationAngelStatue");
		marketMap.addTilesetImage("Apple", "Apple");
		marketMap.addTilesetImage("LakeFloatingRock_V03", "LakeFloatingRock_V03");
		marketMap.addTilesetImage("DecorationBeachSeagull", "DecorationBeachSeagull");
		marketMap.addTilesetImage("Tent", "Tent");

		// must_Background_grass_1
		marketMap.createLayer("Must Background/grass", ["GroundTileset"], -768, -416);

		// must_Background_DecorationOnGrass_1
		marketMap.createLayer("Must Background/DecorationOnGrass", ["RoadStone","Apple"], -768, -416);

		// must_Background_Beach_1
		marketMap.createLayer("Must Background/Beach", ["RoadStone","GroundTileset"], -768, -416);

		// must_Background_SeaBorder_1
		const must_Background_SeaBorder_1 = marketMap.createLayer("Must Background/SeaBorder", ["BeachWaterAni_V01"], -768, -416);

		// must_Background_StoneRoad_1
		marketMap.createLayer("Must Background/StoneRoad", ["RoadStone"], -768, -416);

		// must_Background_Fence_1
		const must_Background_Fence_1 = marketMap.createLayer("Must Background/Fence", ["StoneFance."], -768, -416);

		// tree_TreeBorder
		const tree_TreeBorder = marketMap.createLayer("Tree/TreeBorder4", ["TreePatteren"], -768, -416);

		// tree_TreeBorder_1
		const tree_TreeBorder_1 = marketMap.createLayer("Tree/TreeBorder3", [], -768, -416);

		// tree_treeborder
		const tree_treeborder = marketMap.createLayer("Tree/treeborder2", ["TreePatteren"], -768, -416);

		// tree_TreeBorder_2
		const tree_TreeBorder_2 = marketMap.createLayer("Tree/TreeBorder1", ["TreePatteren","BeachTree_V1"], -768, -416);

		// beachSide_FishingBoat_1
		const beachSide_FishingBoat_1 = marketMap.createLayer("BeachSide/FishingBoat", ["FishingBoat_V01R"], -768, -416);

		// beachSide_BeachDeck_1
		const beachSide_BeachDeck_1 = marketMap.createLayer("BeachSide/BeachDeck", ["RoadStone","DeckOnTheBeach"], -768, -416);

		// beachSide_Stairs_1
		const beachSide_Stairs_1 = marketMap.createLayer("BeachSide/Stairs", ["BeachStairs_V01R"], -768, -416);

		// beachSide_Ship_1
		const beachSide_Ship_1 = marketMap.createLayer("BeachSide/Ship", ["Ship_V01-Sheet"], -768, -416);

		// decoration_SpearStand_1
		const decoration_SpearStand_1 = marketMap.createLayer("Decoration/SpearStand", ["DecorationWeaponStand"], -768, -416);

		// decoration_ClockTower_1
		const decoration_ClockTower_1 = marketMap.createLayer("Decoration/ClockTower", ["SeaLevelBuildingLighthouse_v01"], -768, -416);

		// decoration_Tent_1
		const decoration_Tent_1 = marketMap.createLayer("Decoration/Tent", ["Tent"], -768, -416);

		// decoration_DecorationFountian_1
		const decoration_DecorationFountian_1 = marketMap.createLayer("Decoration/DecorationFountian", ["DecorationAngelStatue"], -768, -416);

		// decoration_Campfire_1
		const decoration_Campfire_1 = marketMap.createLayer("Decoration/Campfire", ["Campfire_2_32x32"], -768, -416);

		// decoration_Decoration_1
		const decoration_Decoration_1 = marketMap.createLayer("Decoration/Decoration", ["ShopInteriorObjects_","Campfire_32x32"], -768, -416);

		// decoration_Decoration
		const decoration_Decoration = marketMap.createLayer("Decoration/Decoration2", ["DecorationMarketplace","ShopInteriorObjects_"], -768, -416);

		// decoration_InfomationBoard_1
		const decoration_InfomationBoard_1 = marketMap.createLayer("Decoration/InfomationBoard", ["DecorationMarketplace"], -768, -416);

		// decoration_DecorationBeachside_1
		const decoration_DecorationBeachside_1 = marketMap.createLayer("Decoration/DecorationBeachside", ["DecorationOnBeach","LakeFloatingRock_V03"], -768, -416);

		// decoration_DecorartionSunScreen_1
		const decoration_DecorartionSunScreen_1 = marketMap.createLayer("Decoration/DecorartionSunScreen", ["DecorationOnBeach"], -768, -416);

		// nPC_NPCMerchant_1
		marketMap.createLayer("NPC/NPCMerchant", ["NPCMerchant"], -768, -416);

		// nPC_NPCCapitan_1
		marketMap.createLayer("NPC/NPCCapitan", ["NPCOldManJack"], -768, -416);

		// nPC_NPCBlackSmith_1
		marketMap.createLayer("NPC/NPCBlackSmith", ["NpcBlaksmith"], -768, -416);

		// nPC_NPCGarda_1
		marketMap.createLayer("NPC/NPCGarda", ["NPCGuardian_V01"], -768, -416);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 497.4684991457542, 356.6812745568676);
		this.add.existing(playerPrefab);

		// tree_TreeBorder_3
		const tree_TreeBorder_3 = marketMap.createLayer("Tree/TreeBorder4", ["TreePatteren"], -768, -416);

		this.must_Background_SeaBorder_1 = must_Background_SeaBorder_1;
		this.must_Background_Fence_1 = must_Background_Fence_1;
		this.tree_TreeBorder = tree_TreeBorder;
		this.tree_TreeBorder_1 = tree_TreeBorder_1;
		this.tree_treeborder = tree_treeborder;
		this.tree_TreeBorder_2 = tree_TreeBorder_2;
		this.beachSide_FishingBoat_1 = beachSide_FishingBoat_1;
		this.beachSide_BeachDeck_1 = beachSide_BeachDeck_1;
		this.beachSide_Stairs_1 = beachSide_Stairs_1;
		this.beachSide_Ship_1 = beachSide_Ship_1;
		this.decoration_SpearStand_1 = decoration_SpearStand_1;
		this.decoration_ClockTower_1 = decoration_ClockTower_1;
		this.decoration_Tent_1 = decoration_Tent_1;
		this.decoration_DecorationFountian_1 = decoration_DecorationFountian_1;
		this.decoration_Campfire_1 = decoration_Campfire_1;
		this.decoration_Decoration_1 = decoration_Decoration_1;
		this.decoration_Decoration = decoration_Decoration;
		this.decoration_InfomationBoard_1 = decoration_InfomationBoard_1;
		this.decoration_DecorationBeachside_1 = decoration_DecorationBeachside_1;
		this.decoration_DecorartionSunScreen_1 = decoration_DecorartionSunScreen_1;
		this.playerPrefab = playerPrefab;
		this.tree_TreeBorder_3 = tree_TreeBorder_3;
		this.marketMap = marketMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_SeaBorder_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_Fence_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_TreeBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_TreeBorder_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_treeborder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_TreeBorder_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_FishingBoat_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_BeachDeck_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_Stairs_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_Ship_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_SpearStand_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_ClockTower_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Tent_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_DecorationFountian_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Campfire_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Decoration_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Decoration;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_InfomationBoard_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_DecorationBeachside_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_DecorartionSunScreen_1;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_TreeBorder_3;
	/** @type {Phaser.Tilemaps.Tilemap} */
	marketMap;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorartionSunScreen_1);
    	this.decoration_DecorartionSunScreen_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorartionSunScreen_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorationBeachside_1);
    	this.decoration_DecorationBeachside_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorationBeachside_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorationFountian_1);
    	this.decoration_DecorationFountian_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorationFountian_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration_1);
    	this.decoration_Decoration_1.setCollisionBetween(0, 10000);
		// this.decoration_Decoration_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration);
    	this.decoration_Decoration.setCollisionBetween(0, 10000);
		// this.decoration_Decoration.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Campfire_1);
    	this.decoration_Campfire_1.setCollisionBetween(0, 10000);
		// this.decoration_Campfire_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_ClockTower_1);
    	this.decoration_ClockTower_1.setCollisionBetween(0, 10000);
		// this.decoration_ClockTower_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_InfomationBoard_1);
    	this.decoration_InfomationBoard_1.setCollisionBetween(0, 10000);
		// this.decoration_InfomationBoard_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_SpearStand_1);
    	this.decoration_SpearStand_1.setCollisionBetween(0, 10000);
		// this.decoration_SpearStand_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Tent_1);
    	this.decoration_Tent_1.setCollisionBetween(0, 10000);
		// this.decoration_Tent_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.beachSide_FishingBoat_1);
    	this.beachSide_FishingBoat_1.setCollisionBetween(0, 10000);
		// this.beachSide_FishingBoat_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.tree_TreeBorder);
    	this.tree_TreeBorder.setCollisionBetween(0, 10000);
		// this.tree_TreeBorder.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.tree_TreeBorder_1);
    	this.tree_TreeBorder_1.setCollisionBetween(0, 10000);
		// this.tree_TreeBorder_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.tree_TreeBorder_2);
    	this.tree_TreeBorder_2.setCollisionBetween(0, 10000);
		// this.tree_TreeBorder_2.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.tree_treeborder);
    	this.tree_treeborder.setCollisionBetween(0, 10000);
		this.tree_treeborder.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.must_Background_SeaBorder_1);
    	this.must_Background_SeaBorder_1.setCollisionBetween(0, 10000);
		// this.must_Background_SeaBorder_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.must_Background_Fence_1);
    	this.must_Background_Fence_1.setCollisionBetween(0, 10000);
		// this.must_Background_Fence_1.renderDebug(this.add.graphics());


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
