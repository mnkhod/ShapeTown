
// You can write more code here
import { EventBus } from '../EventBus';


/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import MarketNpcPrefab from "../prefabs/npcs/MarketNpcPrefab";
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
import AngelPrefab from "../prefabs/npcs/AngelPrefab";
import SeaLevelBuildingLighthousePrefab from "../prefabs/House/SeaLevelBuildingLighthousePrefab";
import ProfilePrefab from "../prefabs/hud/ProfilePrefab";
import BlackSmithPrefab from "../prefabs/npcs/BlackSmithPrefab";
import MerchantPrefab from "../prefabs/npcs/MerchantPrefab";
import CommanderPrefab from "../prefabs/npcs/CommanderPrefab";
import SoldierErikPrefab from "../prefabs/npcs/SoldierErikPrefab";
import SoldierKaiPrefab from "../prefabs/npcs/SoldierKaiPrefab";
import SoldierNolanPrefab from "../prefabs/npcs/SoldierNolanPrefab";
import SoldierWillemPrefab from "../prefabs/npcs/SoldierWillemPrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
import OpenInventory from "../prefabs/hud/OpenInventory";
import OpenMapPrefab from "../prefabs/hud/OpenMapPrefab";
import OptionsListPrefab from "../prefabs/hud/OptionsListPrefab";
import MinimapPrefab from "../prefabs/hud/MinimapPrefab";
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

		// decoration_Tent_1
		const decoration_Tent_1 = marketMap.createLayer("Decoration/Tent", ["Tent"], -928, -496);

		// decoration_Decoration_1
		const decoration_Decoration_1 = marketMap.createLayer("Decoration/Decoration", ["ShopInteriorObjects_"], -928, -496);

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

		// fishingShip
		const fishingShip = this.add.sprite(1708, 611, "FishingBoat_V01R", 0);
		fishingShip.play("fishingShip");

		// marketNpcPrefab
		const marketNpcPrefab = new MarketNpcPrefab(this, 829, 226);
		this.add.existing(marketNpcPrefab);

		// questBookPrefab
		const questBookPrefab = new QuestBookPrefab(this, 32, 736);
		this.add.existing(questBookPrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 0.706304947792546, -0.19542654884695307);
		this.add.existing(messagePrefab);

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, 848.4423149866814, 0.012521230289181062);
		this.add.existing(alertPrefab);

		// sceneTilePrev
		const sceneTilePrev = this.physics.add.sprite(-441, 458, "_MISSING");
		sceneTilePrev.scaleY = 10;
		sceneTilePrev.visible = false;
		sceneTilePrev.body.allowGravity = false;
		sceneTilePrev.body.setSize(32, 200, false);

		// angelPrefab
		const angelPrefab = new AngelPrefab(this, 508, 442);
		this.add.existing(angelPrefab);

		// seaLevelBuildingLighthousePrefab
		const seaLevelBuildingLighthousePrefab = new SeaLevelBuildingLighthousePrefab(this, 510, -119);
		this.add.existing(seaLevelBuildingLighthousePrefab);

		// profilePrefab
		const profilePrefab = new ProfilePrefab(this, -1, -17);
		this.add.existing(profilePrefab);

		// blackSmithPrefab
		const blackSmithPrefab = new BlackSmithPrefab(this, 192, 702);
		this.add.existing(blackSmithPrefab);
		blackSmithPrefab.scaleX = 1;
		blackSmithPrefab.scaleY = 1;

		// merchantPrefab
		const merchantPrefab = new MerchantPrefab(this, 813, 657);
		this.add.existing(merchantPrefab);
		merchantPrefab.scaleX = 1;
		merchantPrefab.scaleY = 1;

		// commanderPrefab
		const commanderPrefab = new CommanderPrefab(this, 938, 638);
		this.add.existing(commanderPrefab);

		// soldierErikPrefab
		const soldierErikPrefab = new SoldierErikPrefab(this, 1406, 453);
		this.add.existing(soldierErikPrefab);

		// soldierKaiPrefab
		const soldierKaiPrefab = new SoldierKaiPrefab(this, 1406, 515);
		this.add.existing(soldierKaiPrefab);

		// soldierNolanPrefab
		const soldierNolanPrefab = new SoldierNolanPrefab(this, -362, 284);
		this.add.existing(soldierNolanPrefab);

		// soldierWillemPrefab
		const soldierWillemPrefab = new SoldierWillemPrefab(this, -356, 598);
		this.add.existing(soldierWillemPrefab);

		// newItemHudPrefab
		const newItemHudPrefab = new NewItemHudPrefab(this, 350, 700);
		this.add.existing(newItemHudPrefab);
		newItemHudPrefab.scaleX = 1;
		newItemHudPrefab.scaleY = 1;

		// openInventory
		const openInventory = new OpenInventory(this, 929, 718);
		this.add.existing(openInventory);
		openInventory.scaleX = 1;
		openInventory.scaleY = 1;

		// openMapPrefab
		const openMapPrefab = new OpenMapPrefab(this, 969, 719);
		this.add.existing(openMapPrefab);

		// optionsListPrefab
		const optionsListPrefab = new OptionsListPrefab(this, 982, 28);
		this.add.existing(optionsListPrefab);

		// minimapPrefab
		const minimapPrefab = new MinimapPrefab(this, 844, 370);
		this.add.existing(minimapPrefab);

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
		this.decoration_Tent_1 = decoration_Tent_1;
		this.decoration_Decoration_1 = decoration_Decoration_1;
		this.decoration_DecorationBeachside_1 = decoration_DecorationBeachside_1;
		this.decoration_DecorartionSunScreen_1 = decoration_DecorartionSunScreen_1;
		this.playerPrefab = playerPrefab;
		this.bigShip = bigShip;
		this.floatingCliff = floatingCliff;
		this.campCauldron = campCauldron;
		this.campfire = campfire;
		this.fishingShip = fishingShip;
		this.marketNpcPrefab = marketNpcPrefab;
		this.questBookPrefab = questBookPrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.sceneTilePrev = sceneTilePrev;
		this.angelPrefab = angelPrefab;
		this.seaLevelBuildingLighthousePrefab = seaLevelBuildingLighthousePrefab;
		this.profilePrefab = profilePrefab;
		this.blackSmithPrefab = blackSmithPrefab;
		this.merchantPrefab = merchantPrefab;
		this.commanderPrefab = commanderPrefab;
		this.soldierErikPrefab = soldierErikPrefab;
		this.soldierKaiPrefab = soldierKaiPrefab;
		this.soldierNolanPrefab = soldierNolanPrefab;
		this.soldierWillemPrefab = soldierWillemPrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.openInventory = openInventory;
		this.openMapPrefab = openMapPrefab;
		this.optionsListPrefab = optionsListPrefab;
		this.minimapPrefab = minimapPrefab;
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
	decoration_Tent_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Decoration_1;
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
	fishingShip;
	/** @type {MarketNpcPrefab} */
	marketNpcPrefab;
	/** @type {QuestBookPrefab} */
	questBookPrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {Phaser.Physics.Arcade.Sprite} */
	sceneTilePrev;
	/** @type {AngelPrefab} */
	angelPrefab;
	/** @type {SeaLevelBuildingLighthousePrefab} */
	seaLevelBuildingLighthousePrefab;
	/** @type {ProfilePrefab} */
	profilePrefab;
	/** @type {BlackSmithPrefab} */
	blackSmithPrefab;
	/** @type {MerchantPrefab} */
	merchantPrefab;
	/** @type {CommanderPrefab} */
	commanderPrefab;
	/** @type {SoldierErikPrefab} */
	soldierErikPrefab;
	/** @type {SoldierKaiPrefab} */
	soldierKaiPrefab;
	/** @type {SoldierNolanPrefab} */
	soldierNolanPrefab;
	/** @type {SoldierWillemPrefab} */
	soldierWillemPrefab;
	/** @type {NewItemHudPrefab} */
	newItemHudPrefab;
	/** @type {OpenInventory} */
	openInventory;
	/** @type {OpenMapPrefab} */
	openMapPrefab;
	/** @type {OptionsListPrefab} */
	optionsListPrefab;
	/** @type {MinimapPrefab} */
	minimapPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	marketMap;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.optionsListPrefab.setDepth(100);
		this.openMapPrefab.setDepth(100);
		this.newItemHudPrefab.setDepth(100);
		this.questBookPrefab.setDepth(100);
		this.playerPrefab.setDepth(50);
		this.profilePrefab.visible = true;
    	this.profilePrefab.setDepth(100);
		this.alertPrefab.setDepth(100);
		this.messagePrefab.setDepth(100);


		const backgroundDepth = 0;
    	const waterDepth = 5;
		const treeDepth = 2;
    	const topLayerDepth = 10;
		const floatingCliffDepth = 15;
		const npcDepth = 16;
		const lighthouseDepth = 18;


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

    	this.treePatteren_TreeBorder.setDepth(treeDepth);
		this.treePatteren_TreeBorder_1.setDepth(treeDepth);
		this.treePatteren_TreeBorder_2.setDepth(treeDepth);
		this.treePatteren_TreeBorder_3.setDepth(treeDepth);
    	this.beachSide_BeachDeck_1.setDepth(topLayerDepth);
		this.bigShip.setDepth(topLayerDepth);
		this.floatingCliff.setDepth(floatingCliffDepth);
		this.fishingShip.setDepth(topLayerDepth);
		this.soldierErikPrefab.setDepth(npcDepth);
		this.soldierKaiPrefab.setDepth(npcDepth);
		this.soldierNolanPrefab.setDepth(npcDepth);
		this.soldierWillemPrefab.setDepth(npcDepth);
		this.seaLevelBuildingLighthousePrefab.setDepth(lighthouseDepth);
		this.decoration_Decoration_1.setDepth(topLayerDepth);

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
    	})

		this.angelPrefab.setupCollision(this.playerPrefab)
		this.seaLevelBuildingLighthousePrefab.setupCollision(this.playerPrefab)

    	this.physics.add.existing(this.campCauldron, true);
    	this.physics.add.collider(this.playerPrefab, this.campCauldron);

 		this.physics.add.existing(this.campfire, true);
    	this.physics.add.collider(this.playerPrefab, this.campfire);



 		// this.physics.add.existing(this.marketNpcPrefab, true);
    	// this.physics.add.collider(this.playerPrefab, this.marketNpcPrefab); 


    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorartionSunScreen_1);
    	this.decoration_DecorartionSunScreen_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorartionSunScreen_1.renderDebug(this.add.graphics());


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

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration_1);
    	this.decoration_Decoration_1.setCollisionBetween(0, 10000);
		// this.decoration_Decoration_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_Decoration_1);
    	this.decoration_Decoration_1.setCollisionBetween(0, 10000);
		// this.decoration_Decoration_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.decoration_DecorationBeachside_1);
    	this.decoration_DecorationBeachside_1.setCollisionBetween(0, 10000);
		// this.decoration_DecorationBeachside_1.renderDebug(this.add.graphics());

		if (this.minimapPrefab && this.playerPrefab) {
            this.minimapPrefab.setPlayer(this.playerPrefab);
            this.minimapPrefab.visible = false;
            if (this.minimapPrefab.minimapCamera) {
                this.minimapPrefab.minimapCamera.visible = false;
            }
        }

		this.blackSmithPrefab.player = this.playerPrefab;
	    this.blackSmithPrefab.msgPrefab = this.messagePrefab;
	    this.physics.add.existing(this.blackSmithPrefab, true);

		this.merchantPrefab.player = this.playerPrefab;
    	this.merchantPrefab.msgPrefab = this.messagePrefab;
    	this.physics.add.existing(this.merchantPrefab, true);

		this.commanderPrefab.player = this.playerPrefab;
		this.commanderPrefab.msgPrefab = this.messagePrefab;
		this.physics.add.existing(this.commanderPrefab, true);

		this.soldierErikPrefab.player = this.playerPrefab;
		this.soldierErikPrefab.msgPrefab = this.messagePrefab;
		this.physics.add.existing(this.soldierErikPrefab, true);

		this.soldierKaiPrefab.player = this.playerPrefab;
		this.soldierKaiPrefab.msgPrefab = this.messagePrefab;
		this.physics.add.existing(this.soldierKaiPrefab, true);

		this.soldierNolanPrefab.player = this.playerPrefab;
		this.soldierNolanPrefab.msgPrefab = this.messagePrefab;
		this.physics.add.existing(this.soldierNolanPrefab, true);

		this.soldierWillemPrefab.player = this.playerPrefab;
		this.soldierWillemPrefab.msgPrefab = this.messagePrefab;
		this.physics.add.existing(this.soldierWillemPrefab, true);

		this.physics.add.overlap(this.sceneTilePrev, this.playerPrefab, () => {
			this.playerPrefab.x += 50
            this.scene.switch("FarmingScene");
        	this.cameras.main.fadeIn(2000, 0, 0, 0);
        });

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
