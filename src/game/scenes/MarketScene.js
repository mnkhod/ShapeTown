
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import OldManJackNpcPrefab from "../prefabs/npcs/OldManJackNpcPrefab";
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

		// beachSide_BeachDeck_1
		const beachSide_BeachDeck_1 = marketMap.createLayer("BeachSide/BeachDeck", ["RoadStone","DeckOnTheBeach"], -768, -416);

		// beachSide_Stairs_1
		const beachSide_Stairs_1 = marketMap.createLayer("BeachSide/Stairs", ["BeachStairs_V01R"], -768, -416);

		// decoration_SpearStand_1
		const decoration_SpearStand_1 = marketMap.createLayer("Decoration/SpearStand", ["DecorationWeaponStand"], -768, -416);

		// decoration_ClockTower_1
		const decoration_ClockTower_1 = marketMap.createLayer("Decoration/ClockTower", ["SeaLevelBuildingLighthouse_v01"], -768, -416);

		// decoration_Tent_1
		const decoration_Tent_1 = marketMap.createLayer("Decoration/Tent", ["Tent"], -768, -416);

		// decoration_Decoration_1
		const decoration_Decoration_1 = marketMap.createLayer("Decoration/Decoration", ["ShopInteriorObjects_"], -768, -416);

		// decoration_Decoration
		const decoration_Decoration = marketMap.createLayer("Decoration/Decoration2", ["DecorationMarketplace","ShopInteriorObjects_"], -768, -416);

		// decoration_InfomationBoard_1
		const decoration_InfomationBoard_1 = marketMap.createLayer("Decoration/InfomationBoard", ["DecorationMarketplace"], -768, -416);

		// decoration_DecorartionSunScreen_1
		const decoration_DecorartionSunScreen_1 = marketMap.createLayer("Decoration/DecorartionSunScreen", ["DecorationOnBeach"], -768, -416);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 481, 451);
		this.add.existing(playerPrefab);

		// tree_TreeBorder_3
		const tree_TreeBorder_3 = marketMap.createLayer("Tree/TreeBorder4", ["TreePatteren"], -768, -416);

		// oldManJackNpcPrefab
		const oldManJackNpcPrefab = new OldManJackNpcPrefab(this, 386, 427);
		this.add.existing(oldManJackNpcPrefab);

		// npcBlackSmithRight
		const npcBlackSmithRight = this.add.sprite(196, 612, "NpcBlaksmith", 0);
		npcBlackSmithRight.scaleX = 1.5;
		npcBlackSmithRight.scaleY = 1.5;
		npcBlackSmithRight.play("NpcBlackSmithRight");

		// npcCapitan
		const npcCapitan = this.add.sprite(832, 160, "NPCOldManJack", 0);
		npcCapitan.play("NpcOldManJack");

		// NpcGuardian_2
		const npcGuardian_2 = this.add.image(-352, 544, "NPCGuardian_V01", 2);
		npcGuardian_2.scaleX = 1.5;
		npcGuardian_2.scaleY = 1.5;

		// NpcGuardian_3 
		const npcGuardian_3_ = this.add.image(960, 576, "NPCGuardian_V01", 1);
		npcGuardian_3_.scaleX = 1.5;
		npcGuardian_3_.scaleY = 1.5;

		// NpcGuardian_5
		const npcGuardian_5 = this.add.image(1413, 450, "NPCGuardian_V01", 3);
		npcGuardian_5.scaleX = 1.5;
		npcGuardian_5.scaleY = 1.5;

		// NpcGuardian_4
		const npcGuardian_4 = this.add.image(1413, 365, "NPCGuardian_V01", 3);
		npcGuardian_4.scaleX = 1.5;
		npcGuardian_4.scaleY = 1.5;

		// NpcMerchant
		const npcMerchant = this.add.image(801, 576, "NPCMerchant", 3);
		npcMerchant.scaleX = 1.5;
		npcMerchant.scaleY = 1.5;

		// campCauldron
		const campCauldron = this.add.sprite(945, 64, "Campfire_2_32x32", 0);
		campCauldron.play("CampCauldron");

		// campfire
		const campfire = this.add.sprite(144, 608, "Campfire_32x32", 0);
		campfire.play("Campfire");

		// NpcGuardian
		const npcGuardian = this.add.image(-352, 219, "NPCGuardian_V01", 2);
		npcGuardian.scaleX = 1.5;
		npcGuardian.scaleY = 1.5;

		// angelStatue
		const angelStatue = this.add.sprite(496, 326, "DecorationAngelStatue", 0);
		angelStatue.play("AngelStatue");

		// bigShip
		const bigShip = this.add.sprite(1800, 164, "Ship_V01-Sheet", 0);
		bigShip.play("BigShip");

		// floatingCliff
		const floatingCliff = this.add.sprite(1568, 958, "LakeFloatingRock_V03", 0);
		floatingCliff.play("FloatingCliff");

		// NpcGuardian_1
		const npcGuardian_1 = this.add.image(2560, 0, "NPCGuardian_V01", 3);
		npcGuardian_1.scaleX = 1.5;
		npcGuardian_1.scaleY = 1.5;

		// Deck
		const deck = this.add.image(1490, 416, "DeckOnTheBeach", 4);

		// Deck_1
		const deck_1 = this.add.image(1554, 416, "DeckOnTheBeach", 4);

		// Deck_2
		const deck_2 = this.add.image(1618, 416, "DeckOnTheBeach", 4);

		// Deck_3
		const deck_3 = this.add.image(1682, 416, "DeckOnTheBeach", 4);

		// fishingShip
		const fishingShip = this.add.sprite(1664, 542, "FishingBoat_V01R", 0);
		fishingShip.play("fishingShip");

		this.must_Background_SeaBorder_1 = must_Background_SeaBorder_1;
		this.must_Background_Fence_1 = must_Background_Fence_1;
		this.tree_TreeBorder = tree_TreeBorder;
		this.tree_TreeBorder_1 = tree_TreeBorder_1;
		this.tree_treeborder = tree_treeborder;
		this.tree_TreeBorder_2 = tree_TreeBorder_2;
		this.beachSide_BeachDeck_1 = beachSide_BeachDeck_1;
		this.beachSide_Stairs_1 = beachSide_Stairs_1;
		this.decoration_SpearStand_1 = decoration_SpearStand_1;
		this.decoration_ClockTower_1 = decoration_ClockTower_1;
		this.decoration_Tent_1 = decoration_Tent_1;
		this.decoration_Decoration_1 = decoration_Decoration_1;
		this.decoration_Decoration = decoration_Decoration;
		this.decoration_InfomationBoard_1 = decoration_InfomationBoard_1;
		this.decoration_DecorartionSunScreen_1 = decoration_DecorartionSunScreen_1;
		this.playerPrefab = playerPrefab;
		this.tree_TreeBorder_3 = tree_TreeBorder_3;
		this.oldManJackNpcPrefab = oldManJackNpcPrefab;
		this.npcBlackSmithRight = npcBlackSmithRight;
		this.npcCapitan = npcCapitan;
		this.npcGuardian_2 = npcGuardian_2;
		this.npcGuardian_3_ = npcGuardian_3_;
		this.npcGuardian_5 = npcGuardian_5;
		this.npcGuardian_4 = npcGuardian_4;
		this.npcMerchant = npcMerchant;
		this.campCauldron = campCauldron;
		this.campfire = campfire;
		this.npcGuardian = npcGuardian;
		this.angelStatue = angelStatue;
		this.bigShip = bigShip;
		this.floatingCliff = floatingCliff;
		this.npcGuardian_1 = npcGuardian_1;
		this.deck = deck;
		this.deck_1 = deck_1;
		this.deck_2 = deck_2;
		this.deck_3 = deck_3;
		this.fishingShip = fishingShip;
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
	beachSide_BeachDeck_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_Stairs_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_SpearStand_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_ClockTower_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Tent_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Decoration_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Decoration;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_InfomationBoard_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_DecorartionSunScreen_1;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_TreeBorder_3;
	/** @type {OldManJackNpcPrefab} */
	oldManJackNpcPrefab;
	/** @type {Phaser.GameObjects.Sprite} */
	npcBlackSmithRight;
	/** @type {Phaser.GameObjects.Sprite} */
	npcCapitan;
	/** @type {Phaser.GameObjects.Image} */
	npcGuardian_2;
	/** @type {Phaser.GameObjects.Image} */
	npcGuardian_3_;
	/** @type {Phaser.GameObjects.Image} */
	npcGuardian_5;
	/** @type {Phaser.GameObjects.Image} */
	npcGuardian_4;
	/** @type {Phaser.GameObjects.Image} */
	npcMerchant;
	/** @type {Phaser.GameObjects.Sprite} */
	campCauldron;
	/** @type {Phaser.GameObjects.Sprite} */
	campfire;
	/** @type {Phaser.GameObjects.Image} */
	npcGuardian;
	/** @type {Phaser.GameObjects.Sprite} */
	angelStatue;
	/** @type {Phaser.GameObjects.Sprite} */
	bigShip;
	/** @type {Phaser.GameObjects.Sprite} */
	floatingCliff;
	/** @type {Phaser.GameObjects.Image} */
	npcGuardian_1;
	/** @type {Phaser.GameObjects.Image} */
	deck;
	/** @type {Phaser.GameObjects.Image} */
	deck_1;
	/** @type {Phaser.GameObjects.Image} */
	deck_2;
	/** @type {Phaser.GameObjects.Image} */
	deck_3;
	/** @type {Phaser.GameObjects.Sprite} */
	fishingShip;
	/** @type {Phaser.Tilemaps.Tilemap} */
	marketMap;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

    	const backgroundDepth = 0;
    	const waterDepth = 5;
    	const topLayerDepth = 10;
		const floatingCliffDepth = 15;

    	this.must_Background_SeaBorder_1.setDepth(backgroundDepth);
    	this.must_Background_Fence_1.setDepth(backgroundDepth);

    	const waterArea = this.add.tileSprite(
    	    1454,
    	    384,
    	    32,
    	    1600,
    	    'BeachWaterAni_V01'
    	);
    	waterArea.setDepth(waterDepth);

    	const seaArea = this.add.tileSprite(
    	    1630,
    	    384,
    	    320,
    	    1600,
    	    'BeachWaterAni_V01'
    	);
    	seaArea.setDepth(waterDepth);

    	this.tree_TreeBorder.setDepth(topLayerDepth);
    	this.tree_TreeBorder_1.setDepth(topLayerDepth);
    	this.tree_treeborder.setDepth(topLayerDepth);
    	this.tree_TreeBorder_2.setDepth(topLayerDepth);
    	this.beachSide_BeachDeck_1.setDepth(topLayerDepth);
		this.bigShip.setDepth(topLayerDepth);
		this.floatingCliff.setDepth(floatingCliffDepth);
		this.npcGuardian_5.setDepth(topLayerDepth);
		this.fishingShip.setDepth(topLayerDepth)

    	const frames = [32, 36, 40, 44, 48, 52];
    	let currentFrameIndex = 0;
    	this.time.addEvent({
    	    delay: 150,
    	    callback: () => {
    	        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    	        waterArea.setFrame(frames[currentFrameIndex]);
    	    },
    	    loop: true
    	});

    	const frames1 = [33, 34, 37, 38, 41, 42];
    	let currentFrameIndex1 = 0;
    	this.time.addEvent({
    	    delay: 150,
    	    callback: () => {
    	        currentFrameIndex1 = (currentFrameIndex1 + 1) % frames1.length;
    	        seaArea.setFrame(frames1[currentFrameIndex1]);
    	    },
    	    loop: true
    	});

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorartionSunScreen_1);
    	this.decoration_DecorartionSunScreen_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorartionSunScreen_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration_1);
    	this.decoration_Decoration_1.setCollisionBetween(0, 10000);
		// this.decoration_Decoration_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration);
    	this.decoration_Decoration.setCollisionBetween(0, 10000);
		// this.decoration_Decoration.renderDebug(this.add.graphics());

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
		// this.tree_treeborder.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.must_Background_SeaBorder_1);
    	this.must_Background_SeaBorder_1.setCollisionBetween(0, 10000);
		// this.must_Background_SeaBorder_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.must_Background_Fence_1);
    	this.must_Background_Fence_1.setCollisionBetween(0, 10000);
		// this.must_Background_Fence_1.renderDebug(this.add.graphics());

 		this.physics.add.existing(this.campCauldron, true);
    	this.physics.add.collider(this.playerPrefab, this.campCauldron);

 		this.physics.add.existing(this.npcGuardian, true);
    	this.physics.add.collider(this.playerPrefab, this.npcGuardian);

 		this.physics.add.existing(this.npcGuardian_2, true);
    	this.physics.add.collider(this.playerPrefab, this.npcGuardian_2);

 		this.physics.add.existing(this.npcGuardian_3_, true);
    	this.physics.add.collider(this.playerPrefab, this.npcGuardian_3_);

 		this.physics.add.existing(this.npcGuardian_4, true);
    	this.physics.add.collider(this.playerPrefab, this.npcGuardian_4);

 		this.physics.add.existing(this.npcGuardian_5, true);
    	this.physics.add.collider(this.playerPrefab, this.npcGuardian_5);

 		this.physics.add.existing(this.campfire, true);
    	this.physics.add.collider(this.playerPrefab, this.campfire);

 		this.physics.add.existing(this.npcMerchant, true);
    	this.physics.add.collider(this.playerPrefab, this.npcMerchant);

 		this.physics.add.existing(this.npcBlackSmithRight, true);
    	this.physics.add.collider(this.playerPrefab, this.npcBlackSmithRight); 

 		this.physics.add.existing(this.npcCapitan, true);
    	this.physics.add.collider(this.playerPrefab, this.npcCapitan); 

 		this.physics.add.existing(this.oldManJackNpcPrefab, true);
    	this.physics.add.collider(this.playerPrefab, this.oldManJackNpcPrefab); 

 		this.physics.add.existing(this.angelStatue, true);
    	this.physics.add.collider(this.playerPrefab, this.angelStatue); 

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
