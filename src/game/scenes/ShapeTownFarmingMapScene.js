// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import ShapeFarmingHousePrefab from "../prefabs/House/ShapeFarmingHousePrefab";
import OldManJackNpcPrefab from "../prefabs/npcs/OldManJackNpcPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
import StonePrefab_4 from "../prefabs/stone/StonePrefab_4";
import StonePrefab_3 from "../prefabs/stone/StonePrefab_3";
import StonePrefab_1 from "../prefabs/stone/StonePrefab_1";
import OpenInventory from "../prefabs/hud/OpenInventory";
import OpenMapPrefab from "../prefabs/hud/OpenMapPrefab";
import ProfilePrefab from "../prefabs/hud/ProfilePrefab";
import OptionsListPrefab from "../prefabs/hud/OptionsListPrefab";
import MinimapPrefab from "../prefabs/hud/MinimapPrefab";
import OpenQuest from "../prefabs/hud/OpenQuest";
import FarmingTree1 from "../prefabs/Trees/FarmingTree1";
import FarmingTree2 from "../prefabs/Trees/FarmingTree2";
import StonePrefab_2 from "../prefabs/stone/StonePrefab_2";
import WaterwellPrefab from "../prefabs/Fountan/WaterwellPrefab";
import DeadTree2 from "../prefabs/Trees/DeadTree2";
import DeadTree1 from "../prefabs/Trees/DeadTree1";
/* START-USER-IMPORTS */
import questSystem from "../../components/QuestSystem";
import { extendSceneWithQuests } from "../../components/QuestSystem"; 
import { extendHarvestPrefab } from "../../components/QuestSystem";
import { extendJackNpc } from "../../components/QuestSystem";
import initInventoryBridge from "../../components/phaser-react-bridge";
import { EventBus } from '../../game/EventBus';
import HarvestPrefab from "../prefabs/objects/HarvestPrefab";
/* END-USER-IMPORTS */

export default class ShapeTownFarmingMapScene extends Phaser.Scene {

	constructor() {
		super("ShapeTownFarmingMapScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.reactEvent = EventBus
		this.achievements = {};

		const counter = 0;
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// shapetownFarmingMap
		const shapetownFarmingMap = this.add.tilemap("ShapetownFarmingMap");
		shapetownFarmingMap.addTilesetImage("GroundTileset", "GroundTileset");
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
		shapetownFarmingMap.addTilesetImage("GroundTileset_V02", "GroundTileset_V02");
		shapetownFarmingMap.addTilesetImage("RocksOnGrass_V01", "RocksOnGrass_V01");
		shapetownFarmingMap.addTilesetImage("RockOnGrass_V02", "RockOnGrass_V02");
		shapetownFarmingMap.addTilesetImage("RoadStone", "RoadStone");
		shapetownFarmingMap.addTilesetImage("Fence_V01", "Fence_V01");
		shapetownFarmingMap.addTilesetImage("Farming_Soil_Tile_V01", "Farming_Soil_Tile_V01");
		shapetownFarmingMap.addTilesetImage("Swan_Sheet_V01", "Swan_Sheet_V01");
		shapetownFarmingMap.addTilesetImage("Frog_Sheet_V01", "Frog_Sheet_V01");

		// bG_Grass_1
		const bG_Grass_1 = shapetownFarmingMap.createLayer("BG/Grass", ["GroundTileset_V02"], 0, 0);

		// bG_Cliff_1
		const bG_Cliff_1 = shapetownFarmingMap.createLayer("BG/Cliff", ["GroundTileset_V02","RockOnGrass_V02"], 0, 0);

		// bG_tall_grass_1
		const bG_tall_grass_1 = shapetownFarmingMap.createLayer("BG/tall grass", ["GroundTileset_V02"], 0, 0);

		// bG_Rock_On_Cliff_1
		const bG_Rock_On_Cliff_1 = shapetownFarmingMap.createLayer("BG/Rock On Cliff", ["RocksOnGrass_V01"], 0, 0);

		// bG_ramp_1
		const bG_ramp_1 = shapetownFarmingMap.createLayer("BG/ramp", [], 0, 0);

		// lake_lake_1
		const lake_lake_1 = shapetownFarmingMap.createLayer("Lake/lake", ["LakeBorderAni","LakeBorderCornerAni","Fishes_3_32x32"], 0, 0);

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

		// farm_Fence_1
		const farm_Fence_1 = shapetownFarmingMap.createLayer("Farm Fence", ["Fence_V01"], 0, 0);

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

		// tree_border_7
		const tree_border_7 = shapetownFarmingMap.createLayer("tree border/7", ["TreePatteren"], 0, 0);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(2520, 1112, "Fruitbushes_V01", 23);
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

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, 2560, 0);
		this.add.existing(alertPrefab);

		// stonePrefab_4
		const stonePrefab_4 = new StonePrefab_4(this, 1289, 130);
		this.add.existing(stonePrefab_4);

		// stonePrefab_3
		const stonePrefab_3 = new StonePrefab_3(this, 1323, 100);
		this.add.existing(stonePrefab_3);

		// stonePrefab_1
		const stonePrefab_1 = new StonePrefab_1(this, 1385, 136);
		this.add.existing(stonePrefab_1);

		// stonePrefab
		const stonePrefab = new StonePrefab_3(this, 1375, 98);
		this.add.existing(stonePrefab);

		// openInventory
		const openInventory = new OpenInventory(this, 2337, 1617);
		this.add.existing(openInventory);

		// openMapPrefab
		const openMapPrefab = new OpenMapPrefab(this, 2293, 1612);
		this.add.existing(openMapPrefab);

		// profilePrefab
		const profilePrefab = new ProfilePrefab(this, 1188, 901);
		this.add.existing(profilePrefab);

		// optionsListPrefab
		const optionsListPrefab = new OptionsListPrefab(this, 2398, 758);
		this.add.existing(optionsListPrefab);

		// frogFrog_Sheet
		const frogFrog_Sheet = this.add.sprite(190, 1585, "Frog_Sheet_V01", 0);
		frogFrog_Sheet.flipX = true;
		frogFrog_Sheet.play("FrogFrog_Sheet");

		// minimapPrefab
		const minimapPrefab = new MinimapPrefab(this, 926, 934);
		this.add.existing(minimapPrefab);

		// openQuest
		const openQuest = new OpenQuest(this, 307, 1317);
		this.add.existing(openQuest);

		// farmingLakeStone_1LakeFloatingRock
		const farmingLakeStone_1LakeFloatingRock = this.add.sprite(491, 1790, "LakeFloatingRock_V01", 0);
		farmingLakeStone_1LakeFloatingRock.play("FarmingLakeStone_1LakeFloatingRock");

		// farmingLakeStone_2LakeFloatingRock
		const farmingLakeStone_2LakeFloatingRock = this.add.sprite(322, 1712, "LakeFloatingRock_V02", 0);
		farmingLakeStone_2LakeFloatingRock.play("FarmingLakeStone_2LakeFloatingRock");

		// farmingLakeStone_1LakeFloatingRock_1
		const farmingLakeStone_1LakeFloatingRock_1 = this.add.sprite(233, 1773, "LakeFloatingRock_V01", 0);
		farmingLakeStone_1LakeFloatingRock_1.play("FarmingLakeStone_1LakeFloatingRock");

		// farmingLakeStone_2LakeFloatingRock_1
		const farmingLakeStone_2LakeFloatingRock_1 = this.add.sprite(593, 1592, "LakeFloatingRock_V02", 0);
		farmingLakeStone_2LakeFloatingRock_1.play("FarmingLakeStone_2LakeFloatingRock");

		// farmingLakeStone_3LakeFloatingRock
		const farmingLakeStone_3LakeFloatingRock = this.add.sprite(435, 1677, "LakeFloatingRock_V03", 0);
		farmingLakeStone_3LakeFloatingRock.play("FarmingLakeStone_3LakeFloatingRock");

		// harvest_1
		const harvest_1 = shapetownFarmingMap.createLayer("harvest", ["GroundTileset_V02"], 0, 0);

		// farmingLakeFishFishes_3_32x
		const farmingLakeFishFishes_3_32x = this.add.sprite(611, 1682, "Fishes_3_32x32", 0);
		farmingLakeFishFishes_3_32x.play("FarmingLakeFishFishes_3_32x");

		// farmingLakeFish_1Fishes_1_32x32gif
		const farmingLakeFish_1Fishes_1_32x32gif = this.add.sprite(297, 1624, "Fishes_1_32x32gif", 0);
		farmingLakeFish_1Fishes_1_32x32gif.play("FarmingLakeFish_1Fishes_1_32x32gif");

		// swanSwan_Sheet
		const swanSwan_Sheet = this.add.sprite(441, 1595, "Swan_Sheet_V01", 0);
		swanSwan_Sheet.flipX = true;
		swanSwan_Sheet.play("SwanSwan_Sheet");

		// swanSwan_Sheet_1
		const swanSwan_Sheet_1 = this.add.sprite(482, 1595, "Swan_Sheet_V01", 0);
		swanSwan_Sheet_1.play("SwanSwan_Sheet");

		// farmingTree1
		const farmingTree1 = new FarmingTree1(this, 441, 975);
		this.add.existing(farmingTree1);
		farmingTree1.flipX = true;
		farmingTree1.flipY = false;

		// farmingTree2
		const farmingTree2 = new FarmingTree2(this, 445, 774);
		this.add.existing(farmingTree2);

		// farmingTree_1
		const farmingTree_1 = new FarmingTree1(this, 930, 746);
		this.add.existing(farmingTree_1);

		// farmingTree
		const farmingTree = new FarmingTree2(this, 838, 763);
		this.add.existing(farmingTree);
		farmingTree.flipX = true;
		farmingTree.flipY = false;

		// farmingTree_2
		const farmingTree_2 = new FarmingTree2(this, 853, 843);
		this.add.existing(farmingTree_2);

		// stonePrefab_2
		const stonePrefab_2 = new StonePrefab_2(this, 541, 929);
		this.add.existing(stonePrefab_2);

		// farmingTree_3
		const farmingTree_3 = new FarmingTree2(this, 948, 948);
		this.add.existing(farmingTree_3);
		farmingTree_3.flipX = true;
		farmingTree_3.flipY = false;

		// farmingTree_5
		const farmingTree_5 = new FarmingTree1(this, 1191, 787);
		this.add.existing(farmingTree_5);

		// stonePrefab_5
		const stonePrefab_5 = new StonePrefab_1(this, 1502, 641);
		this.add.existing(stonePrefab_5);

		// farmingTree_6
		const farmingTree_6 = new FarmingTree1(this, 1832, 1191);
		this.add.existing(farmingTree_6);

		// farmingTree_7
		const farmingTree_7 = new FarmingTree2(this, 2006, 1072);
		this.add.existing(farmingTree_7);

		// farmingTree_8
		const farmingTree_8 = new FarmingTree2(this, 1599, 887);
		this.add.existing(farmingTree_8);

		// stonePrefab_6
		const stonePrefab_6 = new StonePrefab_4(this, 2288, 1203);
		this.add.existing(stonePrefab_6);

		// stonePrefab_7
		const stonePrefab_7 = new StonePrefab_2(this, 1152, 385);
		this.add.existing(stonePrefab_7);

		// farmingTree_4
		const farmingTree_4 = new FarmingTree2(this, 950, 454);
		this.add.existing(farmingTree_4);

		// stonePrefab_8
		const stonePrefab_8 = new StonePrefab_2(this, 1299, 577);
		this.add.existing(stonePrefab_8);

		// farmingTree_9
		const farmingTree_9 = new FarmingTree2(this, 1479, 383);
		this.add.existing(farmingTree_9);

		// waterwellPrefab
		const waterwellPrefab = new WaterwellPrefab(this, 1542, 501);
		this.add.existing(waterwellPrefab);

		// stonePrefab_9
		const stonePrefab_9 = new StonePrefab_2(this, 2008, 1441);
		this.add.existing(stonePrefab_9);

		// stonePrefab_10
		const stonePrefab_10 = new StonePrefab_3(this, 1776, 1553);
		this.add.existing(stonePrefab_10);

		// farmingTree_10
		const farmingTree_10 = new FarmingTree2(this, 2151, 864);
		this.add.existing(farmingTree_10);
		farmingTree_10.flipX = true;
		farmingTree_10.flipY = false;

		// farmingTree_11
		const farmingTree_11 = new FarmingTree2(this, 1399, 563);
		this.add.existing(farmingTree_11);

		// farmingTree_12
		const farmingTree_12 = new FarmingTree1(this, 1066, 1201);
		this.add.existing(farmingTree_12);
		farmingTree_12.flipX = true;
		farmingTree_12.flipY = false;

		// farmingTree_13
		const farmingTree_13 = new FarmingTree2(this, 1365, 1167);
		this.add.existing(farmingTree_13);
		farmingTree_13.flipX = true;
		farmingTree_13.flipY = false;

		// farmingTree_14
		const farmingTree_14 = new FarmingTree2(this, 1410, 893);
		this.add.existing(farmingTree_14);

		// farmingTree_15
		const farmingTree_15 = new FarmingTree2(this, 2175, 1354);
		this.add.existing(farmingTree_15);

		// farmingTree_16
		const farmingTree_16 = new FarmingTree1(this, 1797, 1006);
		this.add.existing(farmingTree_16);
		farmingTree_16.flipX = true;
		farmingTree_16.flipY = false;

		// farmingTree_17
		const farmingTree_17 = new FarmingTree1(this, 608, 1273);
		this.add.existing(farmingTree_17);

		// farmingTree_18
		const farmingTree_18 = new FarmingTree1(this, 1930, 1569);
		this.add.existing(farmingTree_18);

		// deadTree2
		const deadTree2 = new DeadTree2(this, 1113, 1030);
		this.add.existing(deadTree2);
		deadTree2.flipX = true;
		deadTree2.flipY = false;

		// deadTree_1
		const deadTree_1 = new DeadTree2(this, 1048, 791);
		this.add.existing(deadTree_1);

		// deadTree1
		const deadTree1 = new DeadTree1(this, 1614, 1585);
		this.add.existing(deadTree1);

		// deadTree
		const deadTree = new DeadTree1(this, 383, 1148);
		this.add.existing(deadTree);

		// deadTree_2
		const deadTree_2 = new DeadTree1(this, 917, 1424);
		this.add.existing(deadTree_2);
		deadTree_2.flipX = true;
		deadTree_2.flipY = false;

		// oldManJackNpcPrefab (prefab fields)
		oldManJackNpcPrefab.player = playerPrefab;
		oldManJackNpcPrefab.msgPrefab = messagePrefab;
		oldManJackNpcPrefab.newItemHud = newItemHudPrefab;

		this.bG_Grass_1 = bG_Grass_1;
		this.bG_Cliff_1 = bG_Cliff_1;
		this.bG_tall_grass_1 = bG_tall_grass_1;
		this.bG_Rock_On_Cliff_1 = bG_Rock_On_Cliff_1;
		this.bG_ramp_1 = bG_ramp_1;
		this.lake_lake_1 = lake_lake_1;
		this.tree_border_Fence_1 = tree_border_Fence_1;
		this.tree_border_ = tree_border_;
		this.tree_border = tree_border;
		this.tree_border_1 = tree_border_1;
		this.tree_border_2 = tree_border_2;
		this.tree_border_3 = tree_border_3;
		this.tree_border_4 = tree_border_4;
		this.farm_Fence_1 = farm_Fence_1;
		this.tree_border_5 = tree_border_5;
		this.tree_border_6 = tree_border_6;
		this.playerPrefab = playerPrefab;
		this.shapeFarmingHousePrefab = shapeFarmingHousePrefab;
		this.tree_border_7 = tree_border_7;
		this.sceneTile = sceneTile;
		this.oldManJackNpcPrefab = oldManJackNpcPrefab;
		this.messagePrefab = messagePrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.alertPrefab = alertPrefab;
		this.stonePrefab_4 = stonePrefab_4;
		this.stonePrefab_3 = stonePrefab_3;
		this.stonePrefab_1 = stonePrefab_1;
		this.stonePrefab = stonePrefab;
		this.openInventory = openInventory;
		this.openMapPrefab = openMapPrefab;
		this.profilePrefab = profilePrefab;
		this.optionsListPrefab = optionsListPrefab;
		this.frogFrog_Sheet = frogFrog_Sheet;
		this.minimapPrefab = minimapPrefab;
		this.harvest_1 = harvest_1;
		this.swanSwan_Sheet = swanSwan_Sheet;
		this.swanSwan_Sheet_1 = swanSwan_Sheet_1;
		this.farmingTree1 = farmingTree1;
		this.farmingTree2 = farmingTree2;
		this.farmingTree_1 = farmingTree_1;
		this.farmingTree = farmingTree;
		this.farmingTree_2 = farmingTree_2;
		this.stonePrefab_2 = stonePrefab_2;
		this.farmingTree_3 = farmingTree_3;
		this.farmingTree_5 = farmingTree_5;
		this.stonePrefab_5 = stonePrefab_5;
		this.farmingTree_6 = farmingTree_6;
		this.farmingTree_7 = farmingTree_7;
		this.farmingTree_8 = farmingTree_8;
		this.stonePrefab_6 = stonePrefab_6;
		this.stonePrefab_7 = stonePrefab_7;
		this.farmingTree_4 = farmingTree_4;
		this.stonePrefab_8 = stonePrefab_8;
		this.farmingTree_9 = farmingTree_9;
		this.waterwellPrefab = waterwellPrefab;
		this.stonePrefab_9 = stonePrefab_9;
		this.stonePrefab_10 = stonePrefab_10;
		this.farmingTree_10 = farmingTree_10;
		this.farmingTree_11 = farmingTree_11;
		this.farmingTree_12 = farmingTree_12;
		this.farmingTree_13 = farmingTree_13;
		this.farmingTree_14 = farmingTree_14;
		this.farmingTree_15 = farmingTree_15;
		this.farmingTree_16 = farmingTree_16;
		this.farmingTree_17 = farmingTree_17;
		this.farmingTree_18 = farmingTree_18;
		this.deadTree2 = deadTree2;
		this.deadTree_1 = deadTree_1;
		this.deadTree1 = deadTree1;
		this.deadTree = deadTree;
		this.deadTree_2 = deadTree_2;
		this.shapetownFarmingMap = shapetownFarmingMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Cliff_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_tall_grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_Rock_On_Cliff_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_ramp_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_lake_1;
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
	farm_Fence_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_5;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_border_6;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {ShapeFarmingHousePrefab} */
	shapeFarmingHousePrefab;
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
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {StonePrefab_4} */
	stonePrefab_4;
	/** @type {StonePrefab_3} */
	stonePrefab_3;
	/** @type {StonePrefab_1} */
	stonePrefab_1;
	/** @type {StonePrefab_3} */
	stonePrefab;
	/** @type {OpenInventory} */
	openInventory;
	/** @type {OpenMapPrefab} */
	openMapPrefab;
	/** @type {ProfilePrefab} */
	profilePrefab;
	/** @type {OptionsListPrefab} */
	optionsListPrefab;
	/** @type {Phaser.GameObjects.Sprite} */
	frogFrog_Sheet;
	/** @type {MinimapPrefab} */
	minimapPrefab;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	harvest_1;
	/** @type {Phaser.GameObjects.Sprite} */
	swanSwan_Sheet;
	/** @type {Phaser.GameObjects.Sprite} */
	swanSwan_Sheet_1;
	/** @type {FarmingTree1} */
	farmingTree1;
	/** @type {FarmingTree2} */
	farmingTree2;
	/** @type {FarmingTree1} */
	farmingTree_1;
	/** @type {FarmingTree2} */
	farmingTree;
	/** @type {FarmingTree2} */
	farmingTree_2;
	/** @type {StonePrefab_2} */
	stonePrefab_2;
	/** @type {FarmingTree2} */
	farmingTree_3;
	/** @type {FarmingTree1} */
	farmingTree_5;
	/** @type {StonePrefab_1} */
	stonePrefab_5;
	/** @type {FarmingTree1} */
	farmingTree_6;
	/** @type {FarmingTree2} */
	farmingTree_7;
	/** @type {FarmingTree2} */
	farmingTree_8;
	/** @type {StonePrefab_4} */
	stonePrefab_6;
	/** @type {StonePrefab_2} */
	stonePrefab_7;
	/** @type {FarmingTree2} */
	farmingTree_4;
	/** @type {StonePrefab_2} */
	stonePrefab_8;
	/** @type {FarmingTree2} */
	farmingTree_9;
	/** @type {WaterwellPrefab} */
	waterwellPrefab;
	/** @type {StonePrefab_2} */
	stonePrefab_9;
	/** @type {StonePrefab_3} */
	stonePrefab_10;
	/** @type {FarmingTree2} */
	farmingTree_10;
	/** @type {FarmingTree2} */
	farmingTree_11;
	/** @type {FarmingTree1} */
	farmingTree_12;
	/** @type {FarmingTree2} */
	farmingTree_13;
	/** @type {FarmingTree2} */
	farmingTree_14;
	/** @type {FarmingTree2} */
	farmingTree_15;
	/** @type {FarmingTree1} */
	farmingTree_16;
	/** @type {FarmingTree1} */
	farmingTree_17;
	/** @type {FarmingTree1} */
	farmingTree_18;
	/** @type {DeadTree2} */
	deadTree2;
	/** @type {DeadTree2} */
	deadTree_1;
	/** @type {DeadTree1} */
	deadTree1;
	/** @type {DeadTree1} */
	deadTree;
	/** @type {DeadTree1} */
	deadTree_2;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownFarmingMap;

	/* START-USER-CODE */

	// Write your code here



	setupHarvestTiles() {
		const soilLayer = this.harvest_1;
		const width = soilLayer.width;
		const height = soilLayer.height;

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const tile = soilLayer.getTileAt(x, y);

				if (tile && tile.index === 2177) {
					const worldX = tile.pixelX + soilLayer.x + (tile.width / 2);
					const worldY = tile.pixelY + soilLayer.y + (tile.height / 2);

					const harvestTile = new HarvestPrefab(this, worldX, worldY);
					this.add.existing(harvestTile);
					harvestTile.state = "GROUND"; 
					harvestTile.setupBasedOnState();
					harvestTile.setDepth(5);
					if (!this.harvestTiles) {
						this.harvestTiles = [];
					}
					this.harvestTiles.push(harvestTile);
				}
			}
		}
	}
initInventorySystem() {
	if (!this.newItemHudPrefab) return;

	this.newItemHudPrefab.visible = true;

	const inventoryBridge = initInventoryBridge(this.newItemHudPrefab, this.reactEvent);

	this.inventoryBridge = inventoryBridge;

	this.time.delayedCall(200, () => {
	  import('../../components/GlobalInvetoryManager').then(({ globalInventory }) => {
		if (globalInventory.quickItems.every(item => item === null) && 
			globalInventory.mainItems.every(item => item === null)) {
				this.setupStartingItems();

		  		if (this.newItemHudPrefab.updateGlobalInventory) {
					this.newItemHudPrefab.updateGlobalInventory();
		  		}
			}
			if (this.inventoryBridge) {
			  this.inventoryBridge.fixSelection();
			}

			this.reactEvent.emit('scene-switched', this);
	  	});
	});
	this.events.on('shutdown', this.onSceneShutdown, this);
	this.events.on('sleep', this.onSceneShutdown, this);
  }

  onSceneShutdown() {
	if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
	  this.newItemHudPrefab.updateGlobalInventory();
	}

	if (this.inventoryBridge) {
	  this.inventoryBridge.update();
	}
  }

  setupStartingItems() {
	if (!this.newItemHudPrefab) return;

	this.newItemHudPrefab.visible = true;
	if (this.questBookPrefab) this.questBookPrefab.visible = true;

	if (this.newItemHudPrefab.itemBoxs) {
	  	this.newItemHudPrefab.itemBoxs.forEach((box, index) => {
			if (!box.input || !box.input.enabled) {
		  		box.setInteractive({ useHandCursor: true });
		  		box.on('pointerdown', () => {
					if 	(box.frame.name === 0) {
			  			this.newItemHudPrefab.itemBoxs.forEach((otherBox) => {
							if (otherBox !== box) {
				  				otherBox.setTexture("HudItemSlot", 0);
							}
			  			});
			  			box.setTexture("HudItemSlot", 1);
			  			this.newItemHudPrefab.selectedItem = this.newItemHudPrefab.itemData[index];
			  			this.newItemHudPrefab.activeIndex = index;
			  			if (this.reactEvent) {
							this.reactEvent.emit('inventory-slot-selected', { 
				 				index, 
				  				item: this.newItemHudPrefab.itemData[index] 
							});
			  			}
					}
		  		}, this);
			}
	  	});
	}

	if (this.newItemHudPrefab.activeItemSlots && this.newItemHudPrefab.activeItemSlots[0]) {
	  	this.newItemHudPrefab.activeItemSlots[0].visible = true;
	  	this.newItemHudPrefab.activeIndex = 0;
	  	this.newItemHudPrefab.selectedItem = this.newItemHudPrefab.itemData[0];
	}
  }

	setupLayerDepths() {
		this.profilePrefab?.setDepth(90);
		this.openInventory?.setDepth(90);
	    this.questBookPrefab?.setDepth(90);
	    this.newItemHudPrefab?.setDepth(90);
	    this.messagePrefab?.setDepth(90);
	    this.alertPrefab?.setDepth(90);
		this.openMapPrefab?.setDepth(90);
		this.optionsListPrefab?.setDepth(90);
		this.playerPrefab?.setDepth(90);
	}
	create() {


		var counter = 0;
		this.editorCreate();
		window.questBookPrefab = null;
		this.cameras.main.setBounds(0, 0, 2550, 1920);
		this.physics.world.bounds.width = 1000;
		this.physics.world.bounds.height = 800;

		if (!this.game.questSystem) {
			this.game.questSystem = questSystem;
		}
		this.events.on('create', () => {
			if (this.newItemHudPrefab) {
			  import('../../components/GlobalInvetoryManager').then(({ globalInventory }) => {
				if (globalInventory.syncInventoryToScene) {
				  	globalInventory.syncInventoryToScene(this);
				}
			  });
			}

			this.cameras.main.fadeIn(500, 0, 0, 0);
		});

		extendSceneWithQuests(this);
		extendHarvestPrefab(HarvestPrefab);
		extendJackNpc(OldManJackNpcPrefab);

		window.getQuestProgress = () => {
			if (this.game && this.game.questSystem) {
				return this.game.questSystem.getQuestProgress();
			}
			return {};
		};

		window.updateQuestProgress = (update) => {
			if (this.game && this.game.questSystem) {
				this.game.questSystem.updateQuestProgress(update);
			}
		};

		this.events.on('wake', () => {
			this.cameras.main.fadeIn(300);

			if (this.newItemHudPrefab) {
				this.time.delayedCall(200, () => {
					import('../../components/GlobalInvetoryManager').then(({ globalInventory }) => {
						if (globalInventory.syncInventoryToScene) {
							globalInventory.syncInventoryToScene(this);
						}
					});
				});
			}
		});
		this.events.on('shutdown', () => {
			if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
				this.newItemHudPrefab.updateGlobalInventory();
			}
		});

		this.events.on('sleep', () => {
			if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
				this.newItemHudPrefab.updateGlobalInventory();
			}
		});

		this.shapeFarmingHousePrefab.setupCollision(this.playerPrefab);
		this.setupAllTreesCollision();
		this.setupAllStonesCollision();
		this.deadTree2.setupCollision(this.playerPrefab)

		this.setupHarvestTiles();
		this.setupLayerDepths();
		this.achievements = {
			firstHarvestAchievement: false,
			giftFromNatureAchievement: false,
			firstFishAchievement: false
		};
		if (this.minimapPrefab && this.playerPrefab) {
            this.minimapPrefab.setPlayer(this.playerPrefab);
            this.minimapPrefab.visible = false;
            if (this.minimapPrefab.minimapCamera) {
                this.minimapPrefab.minimapCamera.visible = false;
            }
        }
	  	this.oldManJackNpcPrefab.player = this.playerPrefab;
	  	this.oldManJackNpcPrefab.msgPrefab = this.messagePrefab;
	  	this.oldManJackNpcPrefab.alertPrefab = this.alertPrefab;
	  	this.oldManJackNpcPrefab.itemHud = this.newItemHudPrefab;
	  	this.oldManJackNpcPrefab.profilePrefab = null;

	  	this.newItemHudPrefab.visible = true;

	  	this.shapeFarmingHousePrefab.setupCollision(this.playerPrefab);
		this.farmingTree1.setupCollision(this.playerPrefab)
		this.farmingTree2.setupCollision(this.playerPrefab)
		this.deadTree_1.setupCollision(this.playerPrefab)
		this.deadTree2.setupCollision(this.playerPrefab)

		this.deadTree.setupCollision(this.playerPrefab)
		this.deadTree1.setupCollision(this.playerPrefab)
		this.deadTree_2.setupCollision(this.playerPrefab)


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

	  	this.physics.add.collider(this.playerPrefab, this.farm_Fence_1);
	  	this.farm_Fence_1.setCollisionBetween(0, 10000);
	  	// this.farm_Fence_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_border_Fence_1);
	  	this.tree_border_Fence_1.setCollisionBetween(0, 10000);
	  	// this.tree_border_Fence_1.renderDebug(this.add.graphics());

		this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
		    // Access questSystem from this.game instead of this.scene
		    if (this.game && this.game.questSystem && this.game.questSystem.isQuestCompleted("001")) {
		        if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
		            this.newItemHudPrefab.updateGlobalInventory();
		        }

		        const playerX = this.playerPrefab.x;

		        this.scene.switch("ShapeTownSquareMapScene");
		        const targetScene = this.scene.get("ShapeTownSquareMapScene");
		        if (targetScene && targetScene.playerPrefab) {
		            targetScene.playerPrefab.x = 304;
		        }

		        this.cameras.main.fadeIn(2000, 0, 0, 0);
		    } else {
		        this.playerPrefab.x -= 200;
		        this.alertPrefab.alert("First Quest is not over, please finish your quest and try again");
		        counter++;
		    }
		});
		this.initInventorySystem();

	const waterTile = this.lake_lake_1.getTilesWithin();
	    waterTile.forEach(tile => {
	    if (tile && tile.index === 1909) {
	    	const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'LakeBorderAni');
	    	sprite.play('FarmingMapWaterAniRightUp');
	    } 
		if (tile && tile.index === 1910) {
	    	const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'LakeBorderAni');
	    	sprite.play('FarmingMapWaterAniUp');
	    } 
		if (tile && tile.index === 1894 ) {
	    	const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'LakeBorderAni');
	    	sprite.play('FarmingMapWaterAniLeftUp');
		}
		if (tile && tile.index === 1935) {
	    	const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'LakeBorderAni');
	    	sprite.play('FarmingMapWaterAniRight');
	    } 
		if (tile && tile.index === 1911) {
	    	const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'LakeBorderAni');
	    	sprite.play('FarmingMapWaterAniRUp');
	    } 
		if (tile && tile.index === 1893) {
	    	const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'LakeBorderAni');
	    	sprite.play('FarmingMapWaterAniRDown');
	    }
	});



      this.physics.add.existing(this.stonePrefab, true);
      this.physics.add.existing(this.stonePrefab_1, true);	
      this.physics.add.existing(this.stonePrefab_3, true);
      this.physics.add.existing(this.stonePrefab_4, true);
	  this.physics.add.existing(this.stonePrefab_5, true);
      this.physics.add.existing(this.stonePrefab_6, true);	
      this.physics.add.existing(this.stonePrefab_7, true);
      this.physics.add.existing(this.stonePrefab_8, true);
	  this.physics.add.existing(this.stonePrefab_9, true);
      this.physics.add.existing(this.stonePrefab_10, true);	

      this.physics.add.collider(this.playerPrefab, this.stonePrefab);
      this.physics.add.collider(this.playerPrefab, this.stonePrefab_1);
      this.physics.add.collider(this.playerPrefab, this.stonePrefab_3);
      this.physics.add.collider(this.playerPrefab, this.stonePrefab_4);
	  this.physics.add.collider(this.playerPrefab, this.stonePrefab_5);
      this.physics.add.collider(this.playerPrefab, this.stonePrefab_6);
	  this.physics.add.collider(this.playerPrefab, this.stonePrefab_7);
      this.physics.add.collider(this.playerPrefab, this.stonePrefab_8);
	  this.physics.add.collider(this.playerPrefab, this.stonePrefab_9);
      this.physics.add.collider(this.playerPrefab, this.stonePrefab_10);


	}
	setupAllTreesCollision() {
    // Regular trees
    const farmingTrees = [
        this.farmingTree1,
        this.farmingTree2,
        this.farmingTree_1,
        this.farmingTree,
        this.farmingTree_2,
        this.farmingTree_3,
        this.farmingTree_5,
        this.farmingTree_6, 
        this.farmingTree_7,
        this.farmingTree_8,
        this.farmingTree_4,
        this.farmingTree_9,
        this.farmingTree_10,
		this.farmingTree_12,
		this.farmingTree_11,
		this.farmingTree_13,
		this.farmingTree_14,
		this.farmingTree_15,
		this.farmingTree_16,
		this.farmingTree_17,
		this.farmingTree_18
    ];

    farmingTrees.forEach(tree => {
        if (tree && typeof tree.setupCollision === 'function') {
            tree.setupCollision(this.playerPrefab);
        }
    });

    if (this.waterwellPrefab && typeof this.waterwellPrefab.setupCollision === 'function') {
        this.waterwellPrefab.setupCollision(this.playerPrefab);
    }
}

setupAllStonesCollision() {
    const stones = [
        this.stonePrefab,
        this.stonePrefab_1,
        this.stonePrefab_2,
        this.stonePrefab_3,
        this.stonePrefab_4,
        this.stonePrefab_5,
        this.stonePrefab_6,
        this.stonePrefab_7,
        this.stonePrefab_8,
        this.stonePrefab_9,
        this.stonePrefab_10
    ];

    stones.forEach(stone => {
        if (stone) {
            this.physics.add.existing(stone, true);
            this.physics.add.collider(this.playerPrefab, stone);
        }
    });
}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here