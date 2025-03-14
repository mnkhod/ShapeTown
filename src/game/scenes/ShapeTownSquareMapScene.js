// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import SquareFountanPrefab from "../prefabs/Fountan/SquareFountanPrefab";
import SquareCampFirePrefab from "../prefabs/Lightning/SquareCampFirePrefab";
import SquareFirePrefab from "../prefabs/Lightning/SquareFirePrefab";
import MineWatchTowerPrefab from "../prefabs/House/MineWatchTowerPrefab";
import SquareDragonHousePrefab from "../prefabs/House/SquareDragonHousePrefab";
import SquareTownPrefab from "../prefabs/House/SquareTownPrefab";
import StoneBridgeDownPrefab from "../prefabs/deck/StoneBridgeDownPrefab";
import StoneBridgeRightPrefab from "../prefabs/deck/StoneBridgeRightPrefab";
import BlackSmithPrefab from "../prefabs/npcs/BlackSmithPrefab";
import OpenMapPrefab from "../prefabs/hud/OpenMapPrefab";
import OpenInventory from "../prefabs/hud/OpenInventory";
import ProfilePrefab from "../prefabs/hud/ProfilePrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
import MinimapPrefab from "../prefabs/hud/MinimapPrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
import OptionsListPrefab from "../prefabs/hud/OptionsListPrefab";
import FoodMerchant from "../prefabs/npcs/FoodMerchant";
import MerchantPrefab from "../prefabs/npcs/MerchantPrefab";
import OpenQuest from "../prefabs/hud/OpenQuest";
import MerchantCabinPrefab from "../prefabs/House/MerchantCabinPrefab";
import BlacksmithPrefab from "../prefabs/House/BlacksmithPrefab";
import WaterwellPrefab from "../prefabs/Fountan/WaterwellPrefab";
import NPCVictoria from "../prefabs/npcs/NPCVictoria";
/* START-USER-IMPORTS */
import questSystem from "../../components/QuestSystem";
import { extendSceneWithQuests } from "../../components/QuestSystem";
import initInventoryBridge from "../../components/phaser-react-bridge";
import { EventBus } from '../../game/EventBus';
import { initMerchantBridge } from '../../components/merchant-bridge';
import { MERCHANT_TYPES } from '../../components/merchant-manager';
/* END-USER-IMPORTS */

export default class ShapeTownSquareMapScene extends Phaser.Scene {

	constructor() {
		super("ShapeTownSquareMapScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.reactEvent = EventBus;
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// shapetownSquare
		const shapetownSquare = this.add.tilemap("ShapetownSquare");
		shapetownSquare.addTilesetImage("GroundTileset_V02", "GroundTileset_V02");
		shapetownSquare.addTilesetImage("TreePatteren", "TreePatteren");
		shapetownSquare.addTilesetImage("Fence_V01", "Fence_V01");
		shapetownSquare.addTilesetImage("Blacksmith", "Blacksmith");
		shapetownSquare.addTilesetImage("NpcBlaksmith", "NpcBlaksmith");
		shapetownSquare.addTilesetImage("Foodstand_Busket", "Foodstand_Busket");
		shapetownSquare.addTilesetImage("FoodstandBarrel_V01", "FoodstandBarrel_V01");
		shapetownSquare.addTilesetImage("FoodstandStall_V01", "FoodstandStall_V01");
		shapetownSquare.addTilesetImage("Foodstand", "Foodstand");
		shapetownSquare.addTilesetImage("MerchantCabin_v01", "MerchantCabin_v01");
		shapetownSquare.addTilesetImage("MerchentanCarriege", "MerchentanCarriege");
		shapetownSquare.addTilesetImage("WaterwellRoof", "WaterwellRoof");
		shapetownSquare.addTilesetImage("Waterwell", "Waterwell");
		shapetownSquare.addTilesetImage("WaterFountain", "WaterFountain");
		shapetownSquare.addTilesetImage("RiverShallowSheet_v01", "RiverShallowSheet_v01");
		shapetownSquare.addTilesetImage("StoneBridgeHorizontal_V01", "StoneBridgeHorizontal_V01");
		shapetownSquare.addTilesetImage("StoneBridgeVertical_V01", "StoneBridgeVertical_V01");
		shapetownSquare.addTilesetImage("Tent_V02", "Tent_V02");
		shapetownSquare.addTilesetImage("CampfireSmoke", "CampfireSmoke");
		shapetownSquare.addTilesetImage("Campfire_V01", "Campfire_V01");
		shapetownSquare.addTilesetImage("CampFireFireSheet", "CampFireFireSheet");
		shapetownSquare.addTilesetImage("Apple", "Apple");
		shapetownSquare.addTilesetImage("CarriageBroken_01", "CarriageBroken_01");
		shapetownSquare.addTilesetImage("bush", "bush");
		shapetownSquare.addTilesetImage("BarricadeSpikes_V03", "BarricadeSpikes_V03");
		shapetownSquare.addTilesetImage("BarricadeSpikes_V01", "BarricadeSpikes_V01");
		shapetownSquare.addTilesetImage("BarricadeSpikes_V02", "BarricadeSpikes_V02");
		shapetownSquare.addTilesetImage("Tent_V03", "Tent_V03");
		shapetownSquare.addTilesetImage("Tent_V04", "Tent_V04");
		shapetownSquare.addTilesetImage("Tree_v014", "Tree_v014");
		shapetownSquare.addTilesetImage("Tree_v02", "Tree_v02");
		shapetownSquare.addTilesetImage("Tree_v09", "Tree_v09");
		shapetownSquare.addTilesetImage("Tree_v08", "Tree_v08");
		shapetownSquare.addTilesetImage("Tree_v01", "Tree_v01");
		shapetownSquare.addTilesetImage("Tree_v03", "Tree_v03");
		shapetownSquare.addTilesetImage("Tree_v05", "Tree_v05");
		shapetownSquare.addTilesetImage("Tree_v06", "Tree_v06");
		shapetownSquare.addTilesetImage("MerchantIcon", "MerchantIcon");
		shapetownSquare.addTilesetImage("FoodstandIcon", "FoodstandIcon");
		shapetownSquare.addTilesetImage("Log_V01", "Log_V01");
		shapetownSquare.addTilesetImage("DecorationWeaponStand", "DecorationWeaponStand");
		shapetownSquare.addTilesetImage("TorchBowl_V01", "TorchBowl_V01");
		shapetownSquare.addTilesetImage("WatchtowerBack_01", "WatchtowerBack_01");
		shapetownSquare.addTilesetImage("WatchtowerFront_01", "WatchtowerFront_01");
		shapetownSquare.addTilesetImage("Barricade_V01", "BarricadeSpikes_V01");
		shapetownSquare.addTilesetImage("dragon fossil - complete - with grass");
		shapetownSquare.addTilesetImage("AdventureGuildBuilding", "AdventureGuildBuilding");
		shapetownSquare.addTilesetImage("NPCSoilderSpearAttack_V01", "NPCSoilderSpearAttack_V01");
		shapetownSquare.addTilesetImage("NPCGuardian_V01", "NPCGuardian_V01");
		shapetownSquare.addTilesetImage("NPCSoildersFullsetWalking_V01", "NPCSoildersFullsetWalking_V01");
		shapetownSquare.addTilesetImage("TownHall", "TownHall");
		shapetownSquare.addTilesetImage("RockOnGrass_V04", "RockOnGrass_V04");
		shapetownSquare.addTilesetImage("RockOnGrass_V01", "RockOnGrass_V01");
		shapetownSquare.addTilesetImage("RockOnGrass_V02", "RockOnGrass_V02");
		shapetownSquare.addTilesetImage("RockOnGrass_V03", "RockOnGrass_V03");
		shapetownSquare.addTilesetImage("NPCMarcus_Mining_Fullset", "NPCMarcus_Mining_Fullset");
		shapetownSquare.addTilesetImage("NPCRowan_Fullset_Walk_V01", "NPCRowan_Fullset_Walk_V01");
		shapetownSquare.addTilesetImage("NPCShopStandMaerchant", "NPCShopStandMaerchant");
		shapetownSquare.addTilesetImage("NPCGuardian_V01", "NPCGuardian_V01");

		// bG_grass_1
		const bG_grass_1 = shapetownSquare.createLayer("BG/grass", ["GroundTileset_V02"], 0, 0);

		// bG_stone_road_1
		const bG_stone_road_1 = shapetownSquare.createLayer("BG/stone road", ["GroundTileset_V02"], 0, 0);

		// bG_tallgrass_1
		const bG_tallgrass_1 = shapetownSquare.createLayer("BG/tallgrass", ["GroundTileset_V02"], 0, 0);

		// collution_Cliff_1
		const collution_Cliff_1 = shapetownSquare.createLayer("Collution/Cliff", ["GroundTileset_V02"], 0, 0);

		// collution_WoodenFence_1
		const collution_WoodenFence_1 = shapetownSquare.createLayer("Collution/WoodenFence", ["Fence_V01"], 0, 0);

		// collution_StoneFence_1
		const collution_StoneFence_1 = shapetownSquare.createLayer("Collution/StoneFence", ["GroundTileset_V02"], 0, 0);

		// river_River_1
		const river_River_1 = shapetownSquare.createLayer("River/River", ["RiverShallowSheet_v01","GroundTileset_V02"], 0, 0);

		// decoration_
		const decoration_ = shapetownSquare.createLayer("Decoration/9", ["TreePatteren"], 0, 0);

		// decoration_Decoration_1
		const decoration_Decoration_1 = shapetownSquare.createLayer("Decoration/Decoration", ["CarriageBroken_01"], 0, 0);

		// decoration_Tree_1
		const decoration_Tree_1 = shapetownSquare.createLayer("Decoration/Tree", [], 0, 0);

		// decoration_Log_1
		const decoration_Log_1 = shapetownSquare.createLayer("Decoration/Log", ["Log_V01"], 0, 0);

		// decoration_bush_1
		const decoration_bush_1 = shapetownSquare.createLayer("Decoration/bush", ["bush"], 0, 0);

		// tree_left_side_
		const tree_left_side_ = shapetownSquare.createLayer("Tree left side/8", ["TreePatteren"], 0, 0);

		// tree_left_side_1
		const tree_left_side_1 = shapetownSquare.createLayer("Tree left side/6", ["TreePatteren"], 0, 0);

		// tree_left_side_2
		const tree_left_side_2 = shapetownSquare.createLayer("Tree left side/5", ["TreePatteren"], 0, 0);

		// tree_left_side_3
		const tree_left_side_3 = shapetownSquare.createLayer("Tree left side/4", ["TreePatteren"], 0, 0);

		// tree_left_side_4
		const tree_left_side_4 = shapetownSquare.createLayer("Tree left side/3", ["TreePatteren"], 0, 0);

		// tree_left_side_5
		const tree_left_side_5 = shapetownSquare.createLayer("Tree left side/2", ["TreePatteren"], 0, 0);

		// forager_home_Tent_1
		const forager_home_Tent_1 = shapetownSquare.createLayer("Forager home/Tent", ["Tent_V02"], 0, 0);

		// tree_left_side_6
		const tree_left_side_6 = shapetownSquare.createLayer("Tree left side/1", ["TreePatteren"], 0, 0);

		// forager_home_Baket_of_mushrooms_1
		const forager_home_Baket_of_mushrooms_1 = shapetownSquare.createLayer("Forager home/Baket of mushrooms", ["Apple"], 0, 0);

		// forager_home_Basket_of_apple_1
		const forager_home_Basket_of_apple_1 = shapetownSquare.createLayer("Forager home/Basket of apple", ["Apple"], 0, 0);

		// foodStand_Foodstand_1
		const foodStand_Foodstand_1 = shapetownSquare.createLayer("FoodStand/Foodstand", [], 0, 0);

		// foodStand_Fishbarrel_1
		const foodStand_Fishbarrel_1 = shapetownSquare.createLayer("FoodStand/Fishbarrel", ["FoodstandBarrel_V01"], 0, 0);

		// foodStand_stall_1
		const foodStand_stall_1 = shapetownSquare.createLayer("FoodStand/stall", ["FoodstandStall_V01"], 0, 0);

		// foodStand_Foodstand
		const foodStand_Foodstand = shapetownSquare.createLayer("FoodStand/Foodstand", [], 0, 0);

		// foodStand_Fishbarrel
		const foodStand_Fishbarrel = shapetownSquare.createLayer("FoodStand/Fishbarrel", ["FoodstandBarrel_V01"], 0, 0);

		// foodStand_stall
		const foodStand_stall = shapetownSquare.createLayer("FoodStand/stall", ["FoodstandStall_V01"], 0, 2);

		// foodStand_Basket_1
		const foodStand_Basket_1 = shapetownSquare.createLayer("FoodStand/Basket", ["Foodstand_Busket"], 0, 0);

		// mechant_MerchantCarriage_1
		const mechant_MerchantCarriage_1 = shapetownSquare.createLayer("Mechant/MerchantCarriage", ["MerchentanCarriege"], 0, 0);

		// barracks_Barricade
		const barracks_Barricade = shapetownSquare.createLayer("Barracks/Barricade3", ["BarricadeSpikes_V02","BarricadeSpikes_V03","BarricadeSpikes_V01"], 0, 0);

		// barracks_Barricade_1
		const barracks_Barricade_1 = shapetownSquare.createLayer("Barracks/Barricade2", ["BarricadeSpikes_V03","BarricadeSpikes_V02","BarricadeSpikes_V01"], 0, 0);

		// barracks_Barricade_2
		const barracks_Barricade_2 = shapetownSquare.createLayer("Barracks/Barricade1", ["Barricade_V01","BarricadeSpikes_V02","BarricadeSpikes_V03","BarricadeSpikes_V01"], 0, 0);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 1630, 1988);
		this.add.existing(playerPrefab);

		// squareFountanPrefab
		const squareFountanPrefab = new SquareFountanPrefab(this, 2256, 1800);
		this.add.existing(squareFountanPrefab);

		// squareCampFirePrefab
		const squareCampFirePrefab = new SquareCampFirePrefab(this, 2440, 420);
		this.add.existing(squareCampFirePrefab);

		// squareCampFirePrefab_1
		const squareCampFirePrefab_1 = new SquareCampFirePrefab(this, 1910, 420);
		this.add.existing(squareCampFirePrefab_1);

		// squareCampFirePrefab_2
		const squareCampFirePrefab_2 = new SquareCampFirePrefab(this, 2190, 220);
		this.add.existing(squareCampFirePrefab_2);

		// squareFirePrefab
		const squareFirePrefab = new SquareFirePrefab(this, 2723, 742);
		this.add.existing(squareFirePrefab);

		// squareFirePrefab_1
		const squareFirePrefab_1 = new SquareFirePrefab(this, 2630, 742);
		this.add.existing(squareFirePrefab_1);

		// mineWatchTowerPrefab
		const mineWatchTowerPrefab = new MineWatchTowerPrefab(this, 2565, 655);
		this.add.existing(mineWatchTowerPrefab);

		// mineWatchTowerPrefab_1
		const mineWatchTowerPrefab_1 = new MineWatchTowerPrefab(this, 1609, 130);
		this.add.existing(mineWatchTowerPrefab_1);

		// barracks_Tents_1
		const barracks_Tents_1 = shapetownSquare.createLayer("Barracks/Tents", ["Tent_V04","Tent_V03"], 0, 0);

		// squareDragonHousePrefab
		const squareDragonHousePrefab = new SquareDragonHousePrefab(this, 2800, 1269);
		this.add.existing(squareDragonHousePrefab);

		// squareTownPrefab
		const squareTownPrefab = new SquareTownPrefab(this, 2270, 1424);
		this.add.existing(squareTownPrefab);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(2400, 2860, "Fruitbushes_V01", 23);
		sceneTile.scaleX = 6;
		this.physics.add.existing(sceneTile, false);
		sceneTile.body.allowGravity = false;
		sceneTile.body.setSize(32, 200, false);

		// squareCampFirePrefab_3
		const squareCampFirePrefab_3 = new SquareCampFirePrefab(this, 2800, 2700);
		this.add.existing(squareCampFirePrefab_3);

		// stoneBridgeDownPrefab
		const stoneBridgeDownPrefab = new StoneBridgeDownPrefab(this, 2408, 2536);
		this.add.existing(stoneBridgeDownPrefab);

		// stoneBridgeRightPrefab
		const stoneBridgeRightPrefab = new StoneBridgeRightPrefab(this, 3183, 1757);
		this.add.existing(stoneBridgeRightPrefab);

		// decoration_Rock
		const decoration_Rock = shapetownSquare.createLayer("Decoration/Rock1", ["RockOnGrass_V02"], 0, 0);

		// decoration_Rock_1
		const decoration_Rock_1 = shapetownSquare.createLayer("Decoration/Rock4", ["RockOnGrass_V04"], 0, 0);

		// decoration_Rock_2
		const decoration_Rock_2 = shapetownSquare.createLayer("Decoration/Rock3", ["RockOnGrass_V04","RockOnGrass_V03"], 0, 0);

		// decoration_Rock_3
		const decoration_Rock_3 = shapetownSquare.createLayer("Decoration/Rock2", ["RockOnGrass_V01","RockOnGrass_V04","RockOnGrass_V03","RockOnGrass_V02"], 0, 0);

		// nPC_NPC_Rowan_Capitian_1
		const nPC_NPC_Rowan_Capitian_1 = shapetownSquare.createLayer("NPC/NPC Rowan Capitian", ["NPCRowan_Fullset_Walk_V01"], 0, 0);

		// npcmarcus
		const npcmarcus = this.add.sprite(3695, 1150, "NPCMarcus_Mining_Fullset", 8);
		npcmarcus.play("npcmarcus");

		// tree_left_side
		const tree_left_side = shapetownSquare.createLayer("Tree left side/7", ["TreePatteren"], 0, 0);

		// barricade_V010
		const barricade_V010 = this.add.image(1183, 426, "Barricade_V01", 0);

		// barricade_V
		const barricade_V = this.add.image(1248, 426, "Barricade_V01", 0);

		// barricade_V_1
		const barricade_V_1 = this.add.image(1312, 426, "Barricade_V01", 0);

		// barricade_V_2
		const barricade_V_2 = this.add.image(1375, 426, "Barricade_V01", 0);

		// npcRowan
		const npcRowan = this.add.sprite(2000, 592, "NPCRowan_Fullset_Attack", 0);
		npcRowan.play("NpcRowan");

		// npcRowan_1
		const npcRowan_1 = this.add.sprite(1999, 658, "NPCRowan_Fullset_Attack", 0);
		npcRowan_1.play("NpcRowan");

		// npcRowan_2
		const npcRowan_2 = this.add.sprite(1998, 720, "NPCRowan_Fullset_Attack", 0);
		npcRowan_2.play("NpcRowan");

		// npcRowan_3
		const npcRowan_3 = this.add.sprite(2064, 720, "NPCRowan_Fullset_Attack", 0);
		npcRowan_3.play("NpcRowan");

		// npcRowan_4
		const npcRowan_4 = this.add.sprite(2064, 656, "NPCRowan_Fullset_Attack", 0);
		npcRowan_4.play("NpcRowan");

		// npcRowan_5
		const npcRowan_5 = this.add.sprite(2064, 592, "NPCRowan_Fullset_Attack", 0);
		npcRowan_5.play("NpcRowan");

		// npcRowan_6
		const npcRowan_6 = this.add.sprite(2128, 717, "NPCRowan_Fullset_Attack", 0);
		npcRowan_6.play("NpcRowan");

		// npcRowan_7
		const npcRowan_7 = this.add.sprite(2129, 654, "NPCRowan_Fullset_Attack", 0);
		npcRowan_7.play("NpcRowan");

		// npcRowan_8
		const npcRowan_8 = this.add.sprite(2127, 591, "NPCRowan_Fullset_Attack", 0);
		npcRowan_8.play("NpcRowan");

		// npcRowan_9
		const npcRowan_9 = this.add.sprite(2191, 656, "NPCRowan_Fullset_Attack", 0);
		npcRowan_9.play("NpcRowan");

		// barricade_V_3
		const barricade_V_3 = this.add.image(2677.604054921068, 742.8488833372835, "Barricade_V01", 0);

		// sceneTile_1
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile_1 = this.add.sprite(240.4704012575195, 1552.3873203812645, "Fruitbushes_V01", 23);
		sceneTile_1.scaleY = 3.586085054631967;
		this.physics.add.existing(sceneTile_1, false);
		sceneTile_1.body.allowGravity = false;
		sceneTile_1.body.setSize(32, 200, false);

		// blackSmithPrefab
		const blackSmithPrefab = new BlackSmithPrefab(this, 1648, 1944);
		this.add.existing(blackSmithPrefab);

		// openMapPrefab
		const openMapPrefab = new OpenMapPrefab(this, 3354, 2730);
		this.add.existing(openMapPrefab);

		// openInventory
		const openInventory = new OpenInventory(this, 3595, 2710);
		this.add.existing(openInventory);

		// profilePrefab
		const profilePrefab = new ProfilePrefab(this, 92, 1248);
		this.add.existing(profilePrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 3334, 1166);
		this.add.existing(messagePrefab);

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, 3370, 801);
		this.add.existing(alertPrefab);

		// minimapPrefab
		const minimapPrefab = new MinimapPrefab(this, 3457, 955);
		this.add.existing(minimapPrefab);

		// newItemHudPrefab
		const newItemHudPrefab = new NewItemHudPrefab(this, 3503, 1484);
		this.add.existing(newItemHudPrefab);

		// optionsListPrefab
		const optionsListPrefab = new OptionsListPrefab(this, 3647, 237);
		this.add.existing(optionsListPrefab);

		// foodMerchant
		const foodMerchant = new FoodMerchant(this, 2808, 1959);
		this.add.existing(foodMerchant);

		// merchantPrefab
		const merchantPrefab = new MerchantPrefab(this, 1795, 2163);
		this.add.existing(merchantPrefab);

		// openQuest
		const openQuest = new OpenQuest(this, 2801, 1640);
		this.add.existing(openQuest);

		// merchantCabinPrefab
		const merchantCabinPrefab = new MerchantCabinPrefab(this, 1936, 2070);
		this.add.existing(merchantCabinPrefab);

		// blacksmithPrefab
		const blacksmithPrefab = new BlacksmithPrefab(this, 1590, 1860);
		this.add.existing(blacksmithPrefab);

		// waterwellPrefab_1
		const waterwellPrefab_1 = new WaterwellPrefab(this, 2778, 1545);
		this.add.existing(waterwellPrefab_1);

		// nPCVictoria
		const nPCVictoria = new NPCVictoria(this, 2733, 1457);
		this.add.existing(nPCVictoria);

		this.bG_grass_1 = bG_grass_1;
		this.bG_stone_road_1 = bG_stone_road_1;
		this.bG_tallgrass_1 = bG_tallgrass_1;
		this.collution_Cliff_1 = collution_Cliff_1;
		this.collution_WoodenFence_1 = collution_WoodenFence_1;
		this.collution_StoneFence_1 = collution_StoneFence_1;
		this.river_River_1 = river_River_1;
		this.decoration_ = decoration_;
		this.decoration_Decoration_1 = decoration_Decoration_1;
		this.decoration_Tree_1 = decoration_Tree_1;
		this.decoration_Log_1 = decoration_Log_1;
		this.decoration_bush_1 = decoration_bush_1;
		this.tree_left_side_ = tree_left_side_;
		this.tree_left_side_1 = tree_left_side_1;
		this.tree_left_side_2 = tree_left_side_2;
		this.tree_left_side_3 = tree_left_side_3;
		this.tree_left_side_4 = tree_left_side_4;
		this.tree_left_side_5 = tree_left_side_5;
		this.forager_home_Tent_1 = forager_home_Tent_1;
		this.tree_left_side_6 = tree_left_side_6;
		this.forager_home_Baket_of_mushrooms_1 = forager_home_Baket_of_mushrooms_1;
		this.forager_home_Basket_of_apple_1 = forager_home_Basket_of_apple_1;
		this.foodStand_Foodstand_1 = foodStand_Foodstand_1;
		this.foodStand_Fishbarrel_1 = foodStand_Fishbarrel_1;
		this.foodStand_stall_1 = foodStand_stall_1;
		this.foodStand_Foodstand = foodStand_Foodstand;
		this.foodStand_Fishbarrel = foodStand_Fishbarrel;
		this.foodStand_stall = foodStand_stall;
		this.foodStand_Basket_1 = foodStand_Basket_1;
		this.mechant_MerchantCarriage_1 = mechant_MerchantCarriage_1;
		this.barracks_Barricade = barracks_Barricade;
		this.barracks_Barricade_1 = barracks_Barricade_1;
		this.barracks_Barricade_2 = barracks_Barricade_2;
		this.playerPrefab = playerPrefab;
		this.squareFountanPrefab = squareFountanPrefab;
		this.squareCampFirePrefab = squareCampFirePrefab;
		this.squareCampFirePrefab_1 = squareCampFirePrefab_1;
		this.squareCampFirePrefab_2 = squareCampFirePrefab_2;
		this.squareFirePrefab = squareFirePrefab;
		this.squareFirePrefab_1 = squareFirePrefab_1;
		this.mineWatchTowerPrefab = mineWatchTowerPrefab;
		this.mineWatchTowerPrefab_1 = mineWatchTowerPrefab_1;
		this.barracks_Tents_1 = barracks_Tents_1;
		this.squareDragonHousePrefab = squareDragonHousePrefab;
		this.squareTownPrefab = squareTownPrefab;
		this.sceneTile = sceneTile;
		this.squareCampFirePrefab_3 = squareCampFirePrefab_3;
		this.stoneBridgeDownPrefab = stoneBridgeDownPrefab;
		this.stoneBridgeRightPrefab = stoneBridgeRightPrefab;
		this.decoration_Rock = decoration_Rock;
		this.decoration_Rock_1 = decoration_Rock_1;
		this.decoration_Rock_2 = decoration_Rock_2;
		this.decoration_Rock_3 = decoration_Rock_3;
		this.nPC_NPC_Rowan_Capitian_1 = nPC_NPC_Rowan_Capitian_1;
		this.npcmarcus = npcmarcus;
		this.tree_left_side = tree_left_side;
		this.barricade_V010 = barricade_V010;
		this.barricade_V = barricade_V;
		this.barricade_V_1 = barricade_V_1;
		this.barricade_V_2 = barricade_V_2;
		this.barricade_V_3 = barricade_V_3;
		this.sceneTile_1 = sceneTile_1;
		this.blackSmithPrefab = blackSmithPrefab;
		this.openMapPrefab = openMapPrefab;
		this.openInventory = openInventory;
		this.profilePrefab = profilePrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.minimapPrefab = minimapPrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.optionsListPrefab = optionsListPrefab;
		this.foodMerchant = foodMerchant;
		this.merchantPrefab = merchantPrefab;
		this.openQuest = openQuest;
		this.merchantCabinPrefab = merchantCabinPrefab;
		this.blacksmithPrefab = blacksmithPrefab;
		this.waterwellPrefab_1 = waterwellPrefab_1;
		this.shapetownSquare = shapetownSquare;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_stone_road_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_tallgrass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	collution_Cliff_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	collution_WoodenFence_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	collution_StoneFence_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	river_River_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Decoration_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Tree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Log_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_bush_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_3;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_4;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_5;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	forager_home_Tent_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side_6;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	forager_home_Baket_of_mushrooms_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	forager_home_Basket_of_apple_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_Foodstand_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_Fishbarrel_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_stall_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_Foodstand;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_Fishbarrel;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_stall;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_Basket_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	mechant_MerchantCarriage_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	barracks_Barricade;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	barracks_Barricade_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	barracks_Barricade_2;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {SquareFountanPrefab} */
	squareFountanPrefab;
	/** @type {SquareCampFirePrefab} */
	squareCampFirePrefab;
	/** @type {SquareCampFirePrefab} */
	squareCampFirePrefab_1;
	/** @type {SquareCampFirePrefab} */
	squareCampFirePrefab_2;
	/** @type {SquareFirePrefab} */
	squareFirePrefab;
	/** @type {SquareFirePrefab} */
	squareFirePrefab_1;
	/** @type {MineWatchTowerPrefab} */
	mineWatchTowerPrefab;
	/** @type {MineWatchTowerPrefab} */
	mineWatchTowerPrefab_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	barracks_Tents_1;
	/** @type {SquareDragonHousePrefab} */
	squareDragonHousePrefab;
	/** @type {SquareTownPrefab} */
	squareTownPrefab;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	sceneTile;
	/** @type {SquareCampFirePrefab} */
	squareCampFirePrefab_3;
	/** @type {StoneBridgeDownPrefab} */
	stoneBridgeDownPrefab;
	/** @type {StoneBridgeRightPrefab} */
	stoneBridgeRightPrefab;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Rock;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Rock_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Rock_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_Rock_3;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	nPC_NPC_Rowan_Capitian_1;
	/** @type {Phaser.GameObjects.Sprite} */
	npcmarcus;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_left_side;
	/** @type {Phaser.GameObjects.Image} */
	barricade_V010;
	/** @type {Phaser.GameObjects.Image} */
	barricade_V;
	/** @type {Phaser.GameObjects.Image} */
	barricade_V_1;
	/** @type {Phaser.GameObjects.Image} */
	barricade_V_2;
	/** @type {Phaser.GameObjects.Image} */
	barricade_V_3;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	sceneTile_1;
	/** @type {BlackSmithPrefab} */
	blackSmithPrefab;
	/** @type {OpenMapPrefab} */
	openMapPrefab;
	/** @type {OpenInventory} */
	openInventory;
	/** @type {ProfilePrefab} */
	profilePrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {MinimapPrefab} */
	minimapPrefab;
	/** @type {NewItemHudPrefab} */
	newItemHudPrefab;
	/** @type {OptionsListPrefab} */
	optionsListPrefab;
	/** @type {FoodMerchant} */
	foodMerchant;
	/** @type {MerchantPrefab} */
	merchantPrefab;
	/** @type {OpenQuest} */
	openQuest;
	/** @type {MerchantCabinPrefab} */
	merchantCabinPrefab;
	/** @type {BlacksmithPrefab} */
	blacksmithPrefab;
	/** @type {WaterwellPrefab} */
	waterwellPrefab_1;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownSquare;

	/* START-USER-CODE */

	// Write your code here
	setupLayerDepths() {
	    this.profilePrefab?.setDepth(90);
	    this.openInventory?.setDepth(90);
	    this.questBookPrefab?.setDepth(90);
	    this.newItemHudPrefab?.setDepth(90);
	    this.messagePrefab?.setDepth(90);
	    this.alertPrefab?.setDepth(90);
	    this.openMapPrefab?.setDepth(90);
	    this.optionsListPrefab?.setDepth(90);
	    this.minimapPrefab?.setDepth(90);
		this.blackSmithPrefab.setDepth(2);
		this.openQuest?.setDepth(90);

	    this.playerPrefab?.setDepth(90);

	    this.stoneBridgeDownPrefab?.setDepth(10);
	    this.stoneBridgeRightPrefab?.setDepth(10);
	    this.tree_left_side?.setDepth(10);
	    this.tree_left_side_1?.setDepth(11);
	}

	initInventorySystem() {
		if (!this.newItemHudPrefab) return;

		this.newItemHudPrefab.visible = true;

		initInventoryBridge(this.newItemHudPrefab, this.reactEvent);

		this.time.delayedCall(100, () => {
		  import('../../components/GlobalInvetoryManager').then(({ globalInventory }) => {
			this.newItemHudPrefab.syncWithGlobalInventory = function() {
			  globalInventory.quickItems.forEach((itemData, index) => {
				if (!itemData) return;

				this.itemData[index] = itemData.id;

				if (this.items[index]) {
				  this.items[index].visible = true;
				  this.items[index].setTexture(itemData.textureKey || itemData.icon);
				  if (itemData.frameName !== undefined) {
					this.items[index].setFrame(itemData.frameName);
				  }
				}

				if (this.itemCounters[index]) {
				  this.itemCounters[index].visible = true;
				  this.itemCounters[index].text = itemData.quantity.toString();
				}
			  });

			  this.mainInventoryData = [...globalInventory.mainItems];

			  if (this.reactEvent) {
				this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
			  }
			};

			this.newItemHudPrefab.updateGlobalInventory = function() {
			  const updatedQuickItems = this.itemData.map((id, index) => {
				if (!id) return null;

				const item = this.items[index];
				if (!item || !item.visible) return null;

				return {
				  id: id,
				  icon: item.texture.key,
				  frame: item.frame.name,
				  textureKey: item.texture.key,
				  frameName: item.frame.name,
				  quantity: parseInt(this.itemCounters[index].text) || 1,
				  name: id
				};
			  });

			  globalInventory.quickItems = updatedQuickItems;
			  globalInventory.mainItems = [...this.mainInventoryData];

			  if (this.reactEvent) {
				this.reactEvent.emit('global-inventory-changed', globalInventory);
			  }
			};

			this.newItemHudPrefab.syncWithGlobalInventory();

			if (globalInventory.quickItems.every(item => item === null) && 
				globalInventory.mainItems.every(item => item === null)) {
			  this.setupStartingItems();
			}

			this.reactEvent.emit('scene-switched', this);

			this.time.delayedCall(500, () => {
			  if (this.newItemHudPrefab.selectedItem === null) {
				for (let i = 0; i < this.newItemHudPrefab.itemData.length; i++) {
				  if (this.newItemHudPrefab.itemData[i]) {
					this.newItemHudPrefab.selectedItem = this.newItemHudPrefab.itemData[i];
					this.newItemHudPrefab.activeIndex = i;

					if (this.newItemHudPrefab.activeItemSlots) {
					  this.newItemHudPrefab.activeItemSlots.forEach(slot => {
						if (slot) slot.visible = false;
					  });
					  if (this.newItemHudPrefab.activeItemSlots[i]) {
						this.newItemHudPrefab.activeItemSlots[i].visible = true;
					  }
					}

					break;
				  }
				}
			  }
			});
		  });
		});

		this.events.on('shutdown', this.onSceneShutdown, this);
	}
	setupTownDetection() {
		this.townCenterX = this.squareTownPrefab?.x || 2270;
		this.townCenterY = this.squareTownPrefab?.y || 1424;

		const townZone = this.add.zone(
		  this.townCenterX,
		  this.townCenterY,
		  1600,
		  2200 
		);

		this.physics.world.enable(townZone);
		townZone.body.setAllowGravity(false);
		townZone.body.moves = false;

		this.physics.add.overlap(
		  this.playerPrefab, 
		  townZone, 
		  () => {
			if (!this.playerEnteredTown) {
			  this.playerEnteredTown = true;

			  if (this.triggerQuestEvent) {
				console.log("Player entered town - triggering quest event");
				this.triggerQuestEvent('player:enteredTown');

				if (this.alertPrefab) {
				  this.alertPrefab.alert("Quest Updated: Entered Town");
				}
			  } else {
				console.warn("triggerQuestEvent not available on scene");
			  }
			}
		  },
		  null,
		  this
		);

		// Store the zone for reference
		this.townZone = townZone;

		// Debug visualization - only enable during development
		// if (process.env.NODE_ENV !== 'production') {
		//   const debugGraphics = this.add.graphics().setAlpha(0.3);
		//   debugGraphics.lineStyle(2, 0x00ff00);
		//   debugGraphics.strokeRect(
		//     townZone.x - townZone.width / 2, 
		//     townZone.y - townZone.height / 2, 
		//     townZone.width, 
		//     townZone.height
		//   );
		// }

		return townZone;
	  }

	  // Add this function to ShapeTownSquareMapScene

setupQuestSystem() {
	// Make sure questSystem is available
	if (!this.questSystem) {
	  console.warn("Quest system not available");
	  return;
	}

	// Set up the quest event handler if not already present
	if (!this.triggerQuestEvent) {
	  this.triggerQuestEvent = function(eventName, params = {}) {
		console.log(`Triggering quest event: ${eventName}`, params);

		// Add scene reference to params
		params.scene = this;

		// Call quest system's event handler
		if (this.questSystem && this.questSystem.handleEvent) {
		  this.questSystem.handleEvent(eventName, params);
		} else {
		  console.warn("questSystem or handleEvent not available");
		}
	  };
	}

	// Add quest UI setup if not already present
	if (!this.showQuestNotification) {
	  this.showQuestNotification = function(message, duration = 3000) {
		console.log(`QUEST NOTIFICATION: ${message}`);

		if (this.alertPrefab && this.alertPrefab.alert) {
		  this.alertPrefab.alert(message);

		  // Auto-hide after duration
		  this.time.delayedCall(duration, () => {
			this.alertPrefab.hide();
		  });
		}
	  };
	}

	// Register NPCs with quest system
	this.setupQuestNPCs();

	// Check for quest progress window methods
	if (!window.getQuestProgress || !window.updateQuestProgress) {
	  window.getQuestProgress = () => {
		if (this.questSystem) {
		  return this.questSystem.getQuestProgress();
		}
		return {};
	  };

	  window.updateQuestProgress = (update) => {
		if (this.questSystem) {
		  this.questSystem.updateQuestProgress(update);
		  return true;
		}
		return false;
	  };
	}

	// Log active quests for debugging
	console.log("Active quests:", this.questSystem.getActiveQuests());

	// Set up town detection for quest #002
	this.setupTownDetection();

	// Set up NPC greeting tracking for quest #003
	this.setupNPCGreetingTracking();
  }

  // Add this function to handle NPC greeting tracking for Quest #003
  setupNPCGreetingTracking() {
	console.log("Setting up NPC greeting tracking for Quest #003");

	// List of NPCs that need to be greeted
	const npcsToGreet = [
	  "Lydia", "Victoria", "Rowan", "Lily" 
	];

	// Create a Set to track which NPCs have been greeted
	this.greetedNPCs = new Set();

	// Method to mark an NPC as greeted
	this.markNPCGreeted = function(npcName) {
	  console.log(`Attempting to mark ${npcName} as greeted`);

	  // Make sure the NPC name is one we care about
	  if (!npcsToGreet.includes(npcName)) {
		console.warn(`${npcName} is not in the list of required NPCs`);
		return false;
	  }

	  // Add to the Set
	  this.greetedNPCs.add(npcName);
	  console.log(`Successfully marked ${npcName} as greeted`);
	  console.log(`Progress: ${this.greetedNPCs.size}/${npcsToGreet.length} NPCs greeted`);

	  // Show notification
	  if (this.alertPrefab) {
		this.alertPrefab.alert(`Greeted ${npcName} (${this.greetedNPCs.size}/${npcsToGreet.length})`);
	  }

	  // Check if all NPCs have been greeted
	  this.checkAllNPCsGreeted();

	  return true;
	};

	// Method to check if all NPCs have been greeted
	this.checkAllNPCsGreeted = function() {
	  console.log("Checking if all NPCs have been greeted");
	  console.log("Currently greeted NPCs:", Array.from(this.greetedNPCs));

	  // Check if all required NPCs have been greeted
	  if (npcsToGreet.every(npc => this.greetedNPCs.has(npc))) {
		console.log("All NPCs have been greeted! Completing Quest #003");

		// All NPCs have been greeted, trigger quest completion
		if (this.triggerQuestEvent) {
		  this.triggerQuestEvent('npc:allGreeted');

		  // Show notification
		  if (this.alertPrefab) {
			this.alertPrefab.alert("Quest Completed: Good Invitation");
		  }
		}
		return true;
	  }

	  return false;
	};

  }

  // Method to set up NPCs for quest interactions
  setupQuestNPCs() {
	console.log("Setting up NPCs for quest interactions");

	// Set up Victoria for Quest #003 and #005
	if (this.nPCVictoria) {
	  console.log("Setting up Victoria NPC for quest interactions");

	  // Make sure Victoria is marked as greeted for Quest #003 when clicked
	  const originalVictoriaPointerDown = this.nPCVictoria.listeners('pointerdown')[0];

	  if (originalVictoriaPointerDown) {
		this.nPCVictoria.off('pointerdown', originalVictoriaPointerDown);

		this.nPCVictoria.on('pointerdown', function (_pointer) {
		  console.log("Victoria NPC clicked directly");

		  // Mark Victoria as greeted for Quest #003
		  if (this.scene.markNPCGreeted) {
			console.log("Marking Victoria as greeted");
			this.scene.markNPCGreeted("Victoria");
		  }

		  // Call the original handler to maintain other functionality
		  originalVictoriaPointerDown.call(this, _pointer);
		}, this.nPCVictoria);
	  }
	}

	// Set up Lydia (Merchant) for Quest #002, #003, and #007
	if (this.merchantPrefab && this.merchantPrefab.npc) {
	  console.log("Setting up Lydia (Merchant) for quest interactions");

	  // Make sure Lydia triggers the quest event and is marked as greeted
	  const originalLydiaPointerDown = this.merchantPrefab.npc.listeners('pointerdown')[0];

	  if (originalLydiaPointerDown) {
		this.merchantPrefab.npc.off('pointerdown', originalLydiaPointerDown);

		this.merchantPrefab.npc.on('pointerdown', function (_pointer) {
		  console.log("Lydia NPC clicked directly");

		  let distance = this.getDistance(this.player, this);
		  if (distance > 100) {
			this.scene.alertPrefab.alert("Too Far");
			return;
		  }

		  // Mark Lydia as greeted for Quest #003
		  if (this.scene.markNPCGreeted) {
			console.log("Marking Lydia as greeted");
			this.scene.markNPCGreeted("Lydia");
		  }

		  // Trigger quest event for meeting Lydia
		  if (this.scene.triggerQuestEvent) {
			this.scene.triggerQuestEvent('npc:lydiaInteraction', { npc: this });
		  }

		  // Call the original handler to maintain other functionality
		  originalLydiaPointerDown.call(this, _pointer);
		}, this.merchantPrefab.npc);
	  }
	}

	// Set up Food Merchant (Lily) for Quest #003 and #008
	if (this.foodMerchant && this.foodMerchant.npc) {
	  console.log("Setting up Lily (Food Merchant) for quest interactions");

	  const originalFoodMerchantPointerDown = this.foodMerchant.npc.listeners('pointerdown')[0];

	  if (originalFoodMerchantPointerDown) {
		this.foodMerchant.npc.off('pointerdown', originalFoodMerchantPointerDown);

		this.foodMerchant.npc.on('pointerdown', function (_pointer) {
		  console.log("Lily NPC clicked directly");

		  // Distance check
		  let distance = this.getDistance(this.player, this);
		  if (distance > 100) {
			this.scene.alertPrefab.alert("Too Far");
			return;
		  }

		  // Mark as greeted for Quest #003
		  if (this.scene.markNPCGreeted) {
			console.log("Marking Lily as greeted");
			this.scene.markNPCGreeted("Lily");
		  }

		  // Continue with original handler
		  originalFoodMerchantPointerDown.call(this, _pointer);
		}, this.foodMerchant.npc);
	  }
	}

	// Set up Blacksmith (Rowan) for Quest #003 and #006
	if (this.blackSmithPrefab && this.blackSmithPrefab.npc) {
	  console.log("Setting up Rowan (Blacksmith) for quest interactions");

	  const originalBlacksmithPointerDown = this.blackSmithPrefab.npc.listeners('pointerdown')[0];

	  if (originalBlacksmithPointerDown) {
		this.blackSmithPrefab.npc.off('pointerdown', originalBlacksmithPointerDown);

		this.blackSmithPrefab.npc.on('pointerdown', function (_pointer) {
		  console.log("Rowan NPC clicked directly");

		  // Distance check
		  let distance = this.getDistance(this.player, this);
		  if (distance > 100) {
			this.scene.alertPrefab.alert("Too Far");
			return;
		  }

		  // Mark as greeted for Quest #003
		  if (this.scene.markNPCGreeted) {
			console.log("Marking Rowan as greeted");
			this.scene.markNPCGreeted("Rowan");
		  }

		  // Continue with original handler
		  originalBlacksmithPointerDown.call(this, _pointer);
		}, this.blackSmithPrefab.npc);
	  }
	}
  }

  setupStartingItems() {
	if (!this.newItemHudPrefab || !this.newItemHudPrefab.itemBoxs) return;

	this.newItemHudPrefab.visible = true;
	this.questBookPrefab.visible = true;

	this.newItemHudPrefab.itemBoxs.forEach((box, index) => {
	  box.setInteractive({ useHandCursor: true });
	  box.on('pointerdown', () => {
		if (box.frame.name === 0) {
		  this.newItemHudPrefab.itemBoxs.forEach((otherBox) => {
			if (otherBox !== box) {
			  otherBox.setTexture("HudItemSlot", 0);
			}
		  });
		  box.setTexture("HudItemSlot", 1);
		  this.newItemHudPrefab.selectedItem = this.newItemHudPrefab.itemData[index];
		  this.newItemHudPrefab.activeIndex = index;
		}
	  }, this);
	});
  }

onSceneShutdown() {
    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
        this.newItemHudPrefab.updateGlobalInventory();
    }
}

setupInteractionZones() {
    const blacksmithZone = this.add.zone(1736, 1932, 100, 100);
    this.physics.world.enable(blacksmithZone);
    this.physics.add.overlap(this.playerPrefab, blacksmithZone, this.handleBlacksmithInteraction, null, this);

    const townHallZone = this.add.zone(2270, 1424, 150, 150);
    this.physics.world.enable(townHallZone);
    this.physics.add.overlap(this.playerPrefab, townHallZone, this.handleTownHallInteraction, null, this);
}

handleBlacksmithInteraction() {
    if (!this.achievements.meetTheBlacksmith) {
        this.achievements.meetTheBlacksmith = true;

        if (window.updateQuestProgress) {
            window.updateQuestProgress({
                townExploration: {
                    visitedBlacksmith: true
                }
            });
        }

        if (this.alertPrefab) {
            this.alertPrefab.alert("You've discovered the blacksmith!");

            this.time.delayedCall(3000, () => {
                this.alertPrefab.hide();
            });
        }
    }
}

handleTownHallInteraction() {
    if (window.updateQuestProgress) {
        window.updateQuestProgress({
            townExploration: {
                visitedTownHall: true
            }
        });
    }
}
create() {
    this.editorCreate();

    window.questBookPrefab = null;
    initMerchantBridge(this);
    this.cameras.main.setBounds(0, 0, 3840, 2880);
    this.physics.world.bounds.width = 3840;
    this.physics.world.bounds.height = 2880;

    // Set up merchant references
    this.merchantPrefab.player = this.playerPrefab;
    this.merchantPrefab.inventoryHud = this.newItemHudPrefab;
    this.merchantPrefab.msgPrefab = this.messagePrefab;
    this.merchantPrefab.itemHud = this.newItemHudPrefab;
    this.merchantPrefab.merchantType = MERCHANT_TYPES.FARMER;

    this.foodMerchant.player = this.playerPrefab;
    this.foodMerchant.inventoryHud = this.newItemHudPrefab;
    this.foodMerchant.msgPrefab = this.messagePrefab;
    this.foodMerchant.merchantType = MERCHANT_TYPES.FOOD;

    this.blackSmithPrefab.player = this.playerPrefab;
    this.blackSmithPrefab.inventoryHud = this.newItemHudPrefab;
    this.blackSmithPrefab.msgPrefab = this.messagePrefab;
    this.blackSmithPrefab.itemHud = this.newItemHudPrefab;
    this.blackSmithPrefab.merchantType = MERCHANT_TYPES.BLACKSMITH;

    // Initialize quest system
    if (!this.game.questSystem) {
        this.game.questSystem = questSystem;
    }

    // Use the existing questSystem from your imports
    this.questSystem = questSystem;

    // Set up quest system with extended functionality
    extendSceneWithQuests(this);

    // Set up town detection and quest functionality
    this.setupQuestSystem();

    // Initialize window methods for quest tracking if not already present
    window.getQuestProgress = () => {
        if (this.questSystem) {
            return this.questSystem.getQuestProgress();
        }
        return {};
    };

    window.updateQuestProgress = (update) => {
        if (this.questSystem) {
            this.questSystem.updateQuestProgress(update);
            return true;
        }
        return false;
    };

    // Set up achievements tracking
    this.achievements = {
        firstMarketVisit: false,
        townSquareExplorer: false,
        meetTheBlacksmith: false,
        firstHarvestAchievement: false,
        giftFromNatureAchievement: false,
        firstFishAchievement: false
    };

    this.initInventorySystem();
    this.setupLayerDepths();

    // Handle scene wake events
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

    // Set up references between components
    if (this.blackSmithPrefab) {
        this.blackSmithPrefab.msgPrefab = this.messagePrefab;
        this.blackSmithPrefab.alertPrefab = this.alertPrefab;
        this.blackSmithPrefab.itemHud = this.newItemHudPrefab;
    }

    if (this.minimapPrefab && this.playerPrefab) {
        this.minimapPrefab.setPlayer(this.playerPrefab);
        this.minimapPrefab.visible = false;
        if (this.minimapPrefab.minimapCamera) {
            this.minimapPrefab.minimapCamera.visible = false;
        }
    }

    this.setupInteractionZones();

	this.squareFountanPrefab.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab_1.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab_2.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab_3.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab.setupCollision(this.playerPrefab);
    this.mineWatchTowerPrefab.setupCollision(this.playerPrefab);
    this.squareDragonHousePrefab.setupCollision(this.playerPrefab);
    this.squareTownPrefab.setupCollision(this.playerPrefab);
	this.waterwellPrefab_1.setupCollision(this.playerPrefab);
	this.merchantCabinPrefab.setupCollision(this.playerPrefab)
	this.blacksmithPrefab.setupCollision(this.playerPrefab)


    this.physics.add.collider(this.playerPrefab, this.collution_WoodenFence_1);
    this.collution_WoodenFence_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.tree_left_side_3);
    this.tree_left_side_3.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.collution_StoneFence_1);
    this.collution_StoneFence_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.tree_left_side_4);
    this.tree_left_side_4.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.decoration_);
    this.decoration_.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.tree_left_side_2);
    this.tree_left_side_2.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.tree_left_side_);
    this.tree_left_side_.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.tree_left_side);
    this.tree_left_side.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.river_River_1);
    this.river_River_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.collution_Cliff_1);
    this.collution_Cliff_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.barracks_Barricade_2);
    this.barracks_Barricade_2.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.decoration_Log_1);
    this.decoration_Log_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.forager_home_Basket_of_apple_1);
    this.forager_home_Basket_of_apple_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.barracks_Tents_1);
    this.barracks_Tents_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.tree_left_side_1);
    this.tree_left_side_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.decoration_Rock_2);
    this.decoration_Rock_2.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.decoration_Rock_1);
    this.decoration_Rock_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.mechant_MerchantCarriage_1);
    this.mechant_MerchantCarriage_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.foodStand_Basket_1);
    this.foodStand_Basket_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.foodStand_stall_1);
    this.foodStand_stall_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.foodStand_Fishbarrel_1);
    this.foodStand_Fishbarrel_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.decoration_Rock_3);
    this.decoration_Rock_3.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.forager_home_Baket_of_mushrooms_1);
    this.forager_home_Baket_of_mushrooms_1.setCollisionBetween(0, 10000);

    this.physics.add.collider(this.playerPrefab, this.forager_home_Tent_1);
    this.forager_home_Tent_1.setCollisionBetween(0, 10000);

	this.physics.add.collider(this.playerPrefab, this.tree_left_side_5);
    this.tree_left_side_5.setCollisionBetween(0, 10000);

    this.physics.add.existing(this.barricade_V_2, true);
    this.physics.add.existing(this.barricade_V_1, true);
    this.physics.add.existing(this.barricade_V, true);
    this.physics.add.existing(this.barricade_V010, true);
    this.physics.add.existing(this.barricade_V_3, true);

    this.physics.add.collider(this.playerPrefab, this.barricade_V_2);
    this.physics.add.collider(this.playerPrefab, this.barricade_V_1);
    this.physics.add.collider(this.playerPrefab, this.barricade_V);
    this.physics.add.collider(this.playerPrefab, this.barricade_V010);
    this.physics.add.collider(this.playerPrefab, this.barricade_V_3);

    const waterTiles = this.river_River_1.getTilesWithin();
    waterTiles.forEach(tile => {
        if (tile && tile.index === 5573) {
            const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
            sprite.play('RiverMiddle');
        }
        if (tile && tile.index === 5459) {
            const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
            sprite.play('RiverMiddle');
        }
        if (tile && tile.index === 5429) {
            const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
            sprite.play('RiverMiddle_1');
        }
        if (tile && tile.index === 5519) {
            const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
            sprite.play('RiverMiddle_2');
        }
        if (tile && tile.index === 5549) {
            const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
            sprite.play('RiverMiddle_3');
        }
    });

    this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
		if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
		}

		this.scene.switch("ShapeTownBeachMapScene");

		const targetScene_1 = this.scene.get("ShapeTownBeachMapScene");
		if (targetScene_1 && targetScene_1.playerPrefab) {
			targetScene_1.playerPrefab.y += 40;
		}

		this.cameras.main.fadeIn(2000, 0, 0, 0);
	});
	this.physics.add.overlap(this.sceneTile_1, this.playerPrefab, () => {
		if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
		}

		this.scene.switch("ShapeTownFarmingMapScene");

		const targetScene = this.scene.get("ShapeTownFarmingMapScene");
		if (targetScene && targetScene.playerPrefab) {
			targetScene.playerPrefab.x -= 40;
		}

		this.cameras.main.fadeIn(2000, 0, 0, 0);
	});
}

/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
