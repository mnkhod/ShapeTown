
// You can write more code here
import { EventBus } from '../EventBus';


/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import MarketNpcPrefab from "../prefabs/npcs/MarketNpcPrefab";
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import ItemHudPrefab from "../prefabs/hud/ItemHudPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MarketScene extends Phaser.Scene {

	constructor() {
		super("MarketScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.reactEvent = EventBus

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
		const must_Background_grass_1 = marketMap.createLayer("Must Background/grass", ["GroundTileset"], -928, -496);

		// must_Background_DecorationOnGrass_1
		const must_Background_DecorationOnGrass_1 = marketMap.createLayer("Must Background/DecorationOnGrass", ["RoadStone","Apple"], -928, -496);

		// must_Background_Beach_1
		const must_Background_Beach_1 = marketMap.createLayer("Must Background/Beach", ["RoadStone","GroundTileset"], -928, -496);

		// must_Background_SeaBorder_1
		const must_Background_SeaBorder_1 = marketMap.createLayer("Must Background/SeaBorder", ["BeachWaterAni_V01"], -928, -496);

		// must_Background_StoneRoad_1
		const must_Background_StoneRoad_1 = marketMap.createLayer("Must Background/StoneRoad", ["RoadStone"], -928, -496);

		// must_Background_Fence_1
		const must_Background_Fence_1 = marketMap.createLayer("Must Background/Fence", ["StoneFance."], -928, -496);

		// beachSide_BeachDeck_1
		const beachSide_BeachDeck_1 = marketMap.createLayer("BeachSide/BeachDeck", ["RoadStone","DeckOnTheBeach"], -928, -496);

		// beachSide_Stairs_1
		const beachSide_Stairs_1 = marketMap.createLayer("BeachSide/Stairs", ["BeachStairs_V01R"], -928, -496);

		// treePatteren_TreeBorder
		const treePatteren_TreeBorder = marketMap.createLayer("TreePatteren/TreeBorder3", ["TreePatteren"], -928, -496);

		// treePatteren_TreeBorder_1
		const treePatteren_TreeBorder_1 = marketMap.createLayer("TreePatteren/TreeBorder4", ["TreePatteren"], -928, -496);

		// treePatteren_TreeBorder_2
		const treePatteren_TreeBorder_2 = marketMap.createLayer("TreePatteren/TreeBorder5", ["TreePatteren"], -928, -496);

		// treePatteren_TreeBorder_3
		const treePatteren_TreeBorder_3 = marketMap.createLayer("TreePatteren/TreeBorder6", ["TreePatteren"], -928, -496);

		// decoration_SpearStand_1
		const decoration_SpearStand_1 = marketMap.createLayer("Decoration/SpearStand", ["DecorationWeaponStand"], -928, -496);

		// decoration_ClockTower_1
		const decoration_ClockTower_1 = marketMap.createLayer("Decoration/ClockTower", ["SeaLevelBuildingLighthouse_v01"], -928, -496);

		// decoration_Tent_1
		const decoration_Tent_1 = marketMap.createLayer("Decoration/Tent", ["Tent"], -928, -496);

		// decoration_Decoration_1
		const decoration_Decoration_1 = marketMap.createLayer("Decoration/Decoration", ["ShopInteriorObjects_"], -928, -496);

		// decoration_Decoration
		const decoration_Decoration = marketMap.createLayer("Decoration/Decoration2", ["DecorationMarketplace","ShopInteriorObjects_"], -928, -496);

		// decoration_InfomationBoard_1
		const decoration_InfomationBoard_1 = marketMap.createLayer("Decoration/InfomationBoard", ["DecorationMarketplace"], -928, -496);

		// decoration_DecorationBeachside_1
		const decoration_DecorationBeachside_1 = marketMap.createLayer("Decoration/DecorationBeachside", ["DecorationOnBeach","LakeFloatingRock_V03"], -928, -496);

		// decoration_DecorartionSunScreen_1
		const decoration_DecorartionSunScreen_1 = marketMap.createLayer("Decoration/DecorartionSunScreen", ["DecorationOnBeach"], -928, -496);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, -333, 439);
		this.add.existing(playerPrefab);

		// bigShip
		const bigShip = this.add.sprite(1829, 239, "Ship_V01-Sheet", 0);
		bigShip.play("BigShip");

		// floatingCliff
		const floatingCliff = this.add.sprite(1567, 1038, "LakeFloatingRock_V03", 0);
		floatingCliff.play("FloatingCliff");

		// campCauldron
		const campCauldron = this.add.sprite(945, 143, "Campfire_2_32x32", 0);
		campCauldron.play("CampCauldron");

		// campfire
		const campfire = this.add.sprite(142, 685, "Campfire_32x32", 0);
		campfire.play("Campfire");

		// npcBlackSmithRight
		const npcBlackSmithRight = this.add.sprite(193, 698, "NpcBlaksmith", 0);
		npcBlackSmithRight.scaleX = 1.5;
		npcBlackSmithRight.scaleY = 1.5;
		npcBlackSmithRight.play("NpcBlackSmithRight");

		// Npc_Merchant
		const npc_Merchant = this.add.image(807, 651, "NPCMerchant", 3);
		npc_Merchant.scaleX = 1.5;
		npc_Merchant.scaleY = 1.5;

		// fishingShip
		const fishingShip = this.add.sprite(1708, 611, "FishingBoat_V01R", 0);
		fishingShip.play("fishingShip");

		// Npc_Guard_2
		const npc_Guard_2 = this.add.image(-346, 296, "NPCGuardian_V01", 2);
		npc_Guard_2.scaleX = 1.5;
		npc_Guard_2.scaleY = 1.5;

		// Npc_Guard_1
		const npc_Guard_1 = this.add.image(-346, 622, "NPCGuardian_V01", 2);
		npc_Guard_1.scaleX = 1.5;
		npc_Guard_1.scaleY = 1.5;

		// Npc_Guard_5
		const npc_Guard_5 = this.add.image(984, 643, "NPCGuardian_V01", 1);
		npc_Guard_5.scaleX = 1.5;
		npc_Guard_5.scaleY = 1.5;

		// Npc_Guard_3
		const npc_Guard_3 = this.add.image(1395, 544, "NPCGuardian_V01", 3);
		npc_Guard_3.scaleX = 1.5;
		npc_Guard_3.scaleY = 1.5;

		// Npc_Guard_4
		const npc_Guard_4 = this.add.image(1395, 443, "NPCGuardian_V01", 3);
		npc_Guard_4.scaleX = 1.5;
		npc_Guard_4.scaleY = 1.5;

		// angelStatue
		const angelStatue = this.add.sprite(505, 382, "DecorationAngelStatue", 0);
		angelStatue.play("AngelStatue");

		// marketNpcPrefab
		const marketNpcPrefab = new MarketNpcPrefab(this, 829, 226);
		this.add.existing(marketNpcPrefab);

		// questBookPrefab
		const questBookPrefab = new QuestBookPrefab(this, 32, 736);
		this.add.existing(questBookPrefab);

		// itemHudPrefab
		const itemHudPrefab = new ItemHudPrefab(this, 624.0380145431086, 714.0379998207613);
		this.add.existing(itemHudPrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 0.706304947792546, -0.19542654884695307);
		this.add.existing(messagePrefab);

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, 848.4423149866814, 0.012521230289181062);
		this.add.existing(alertPrefab);

		// sceneTilePrev
		const sceneTilePrev = this.physics.add.sprite(-441, 458, "CityHouses_v02", 0);
		sceneTilePrev.scaleY = 10;
		sceneTilePrev.body.allowGravity = false;
		sceneTilePrev.body.setSize(32, 200, false);

		// itemHudPrefab (prefab fields)
		itemHudPrefab.player = playerPrefab;

		this.must_Background_grass_1 = must_Background_grass_1;
		this.must_Background_DecorationOnGrass_1 = must_Background_DecorationOnGrass_1;
		this.must_Background_Beach_1 = must_Background_Beach_1;
		this.must_Background_SeaBorder_1 = must_Background_SeaBorder_1;
		this.must_Background_StoneRoad_1 = must_Background_StoneRoad_1;
		this.must_Background_Fence_1 = must_Background_Fence_1;
		this.beachSide_BeachDeck_1 = beachSide_BeachDeck_1;
		this.beachSide_Stairs_1 = beachSide_Stairs_1;
		this.treePatteren_TreeBorder = treePatteren_TreeBorder;
		this.treePatteren_TreeBorder_1 = treePatteren_TreeBorder_1;
		this.treePatteren_TreeBorder_2 = treePatteren_TreeBorder_2;
		this.treePatteren_TreeBorder_3 = treePatteren_TreeBorder_3;
		this.decoration_SpearStand_1 = decoration_SpearStand_1;
		this.decoration_ClockTower_1 = decoration_ClockTower_1;
		this.decoration_Tent_1 = decoration_Tent_1;
		this.decoration_Decoration_1 = decoration_Decoration_1;
		this.decoration_Decoration = decoration_Decoration;
		this.decoration_InfomationBoard_1 = decoration_InfomationBoard_1;
		this.decoration_DecorationBeachside_1 = decoration_DecorationBeachside_1;
		this.decoration_DecorartionSunScreen_1 = decoration_DecorartionSunScreen_1;
		this.playerPrefab = playerPrefab;
		this.bigShip = bigShip;
		this.floatingCliff = floatingCliff;
		this.campCauldron = campCauldron;
		this.campfire = campfire;
		this.npcBlackSmithRight = npcBlackSmithRight;
		this.npc_Merchant = npc_Merchant;
		this.fishingShip = fishingShip;
		this.npc_Guard_2 = npc_Guard_2;
		this.npc_Guard_1 = npc_Guard_1;
		this.npc_Guard_5 = npc_Guard_5;
		this.npc_Guard_3 = npc_Guard_3;
		this.npc_Guard_4 = npc_Guard_4;
		this.angelStatue = angelStatue;
		this.marketNpcPrefab = marketNpcPrefab;
		this.questBookPrefab = questBookPrefab;
		this.itemHudPrefab = itemHudPrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.sceneTilePrev = sceneTilePrev;
		this.marketMap = marketMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_DecorationOnGrass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_Beach_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_SeaBorder_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_StoneRoad_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	must_Background_Fence_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_BeachDeck_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	beachSide_Stairs_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treePatteren_TreeBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treePatteren_TreeBorder_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treePatteren_TreeBorder_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treePatteren_TreeBorder_3;
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
	decoration_DecorationBeachside_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_DecorartionSunScreen_1;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {Phaser.GameObjects.Sprite} */
	bigShip;
	/** @type {Phaser.GameObjects.Sprite} */
	floatingCliff;
	/** @type {Phaser.GameObjects.Sprite} */
	campCauldron;
	/** @type {Phaser.GameObjects.Sprite} */
	campfire;
	/** @type {Phaser.GameObjects.Sprite} */
	npcBlackSmithRight;
	/** @type {Phaser.GameObjects.Image} */
	npc_Merchant;
	/** @type {Phaser.GameObjects.Sprite} */
	fishingShip;
	/** @type {Phaser.GameObjects.Image} */
	npc_Guard_2;
	/** @type {Phaser.GameObjects.Image} */
	npc_Guard_1;
	/** @type {Phaser.GameObjects.Image} */
	npc_Guard_5;
	/** @type {Phaser.GameObjects.Image} */
	npc_Guard_3;
	/** @type {Phaser.GameObjects.Image} */
	npc_Guard_4;
	/** @type {Phaser.GameObjects.Sprite} */
	angelStatue;
	/** @type {MarketNpcPrefab} */
	marketNpcPrefab;
	/** @type {QuestBookPrefab} */
	questBookPrefab;
	/** @type {ItemHudPrefab} */
	itemHudPrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	sceneTilePrev;
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
    	    464,
    	    32,
    	    1600,
    	    'BeachWaterAni_V01'
    	);
    	waterArea.setDepth(waterDepth);

    	const seaArea = this.add.tileSprite(
    	    1680,
    	    464,
    	    420,
    	    1600,
    	    'BeachWaterAni_V01'
    	);
    	seaArea.setDepth(waterDepth);

    	this.treePatteren_TreeBorder.setDepth(topLayerDepth);
		this.treePatteren_TreeBorder_1.setDepth(topLayerDepth);
		this.treePatteren_TreeBorder_2.setDepth(topLayerDepth);
		this.treePatteren_TreeBorder_3.setDepth(topLayerDepth);
		this.npc_Guard_5.setDepth(topLayerDepth);
    	this.beachSide_BeachDeck_1.setDepth(topLayerDepth);
		this.bigShip.setDepth(topLayerDepth);
		this.floatingCliff.setDepth(floatingCliffDepth);
		this.fishingShip.setDepth(topLayerDepth);
		this.decoration_ClockTower_1.setDepth(topLayerDepth);
		this.playerPrefab.setDepth(topLayerDepth);

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

    	this.physics.add.existing(this.campCauldron, true);
    	this.physics.add.collider(this.playerPrefab, this.campCauldron);

 		this.physics.add.existing(this.npc_Guard_1, true);
    	this.physics.add.collider(this.playerPrefab, this.npc_Guard_1);

 		this.physics.add.existing(this.npc_Guard_2, true);
    	this.physics.add.collider(this.playerPrefab, this.npc_Guard_2);

 		this.physics.add.existing(this.npc_Guard_3, true);
    	this.physics.add.collider(this.playerPrefab, this.npc_Guard_3);

 		this.physics.add.existing(this.npc_Guard_4, true);
    	this.physics.add.collider(this.playerPrefab, this.npc_Guard_4);

 		this.physics.add.existing(this.npc_Guard_5, true);
    	this.physics.add.collider(this.playerPrefab, this.npc_Guard_5);

 		this.physics.add.existing(this.campfire, true);
    	this.physics.add.collider(this.playerPrefab, this.campfire);

 		this.physics.add.existing(this.npc_Merchant, true);
    	this.physics.add.collider(this.playerPrefab, this.npc_Merchant);

 		this.physics.add.existing(this.npcBlackSmithRight, true);
    	this.physics.add.collider(this.playerPrefab, this.npcBlackSmithRight); 

 		this.physics.add.existing(this.angelStatue, true);
    	this.physics.add.collider(this.playerPrefab, this.angelStatue); 

 		// this.physics.add.existing(this.marketNpcPrefab, true);
    	// this.physics.add.collider(this.playerPrefab, this.marketNpcPrefab); 

    	this.physics.add.collider(this.playerPrefab, this.decoration_ClockTower_1);
    	this.decoration_ClockTower_1.setCollisionBetween(0, 10000);
		// this.decoration_ClockTower_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorartionSunScreen_1);
    	this.decoration_DecorartionSunScreen_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorartionSunScreen_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration);
    	this.decoration_Decoration.setCollisionBetween(0, 10000);
		// this.decoration_Decoration.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorationBeachside_1);
    	this.decoration_DecorationBeachside_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorationBeachside_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration_1);
    	this.decoration_Decoration_1.setCollisionBetween(0, 10000);
		// this.decoration_Decoration_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_InfomationBoard_1);
    	this.decoration_InfomationBoard_1.setCollisionBetween(0, 10000);
		// this.decoration_InfomationBoard_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_SpearStand_1);
    	this.decoration_SpearStand_1.setCollisionBetween(0, 10000);
		// this.decoration_SpearStand_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Tent_1);
    	this.decoration_Tent_1.setCollisionBetween(0, 10000);
		// this.decoration_Tent_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.must_Background_DecorationOnGrass_1);
    	// this.must_Background_DecorationOnGrass_1.setCollisionBetween(0, 10000);
		// this.must_Background_DecorationOnGrass_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treePatteren_TreeBorder);
    	this.treePatteren_TreeBorder.setCollisionBetween(0, 10000);
		// this.treePatteren_TreeBorder.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treePatteren_TreeBorder_1);
    	this.treePatteren_TreeBorder_1.setCollisionBetween(0, 10000);
		// this.treePatteren_TreeBorder_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treePatteren_TreeBorder_3);
    	this.treePatteren_TreeBorder_3.setCollisionBetween(0, 10000);
		// this.treePatteren_TreeBorder_3.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treePatteren_TreeBorder_2);
    	this.treePatteren_TreeBorder_2.setCollisionBetween(0, 10000);
		// this.treePatteren_TreeBorder_2.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.must_Background_SeaBorder_1);
    	this.must_Background_SeaBorder_1.setCollisionBetween(0, 10000);
		// this.must_Background_SeaBorder_1.renderDebug(this.add.graphics());

		this.physics.add.overlap(this.sceneTilePrev, this.playerPrefab, () => {
			this.playerPrefab.x += 50
            this.scene.switch("FarmingScene");
        });

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
