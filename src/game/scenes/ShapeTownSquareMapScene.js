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
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import ProfilePrefab from "../prefabs/hud/ProfilePrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
import MinimapPrefab from "../prefabs/hud/MinimapPrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
import OptionsListPrefab from "../prefabs/hud/OptionsListPrefab";
import FoodMerchant from "../prefabs/npcs/FoodMerchant";
import MerchantPrefab from "../prefabs/npcs/MerchantPrefab";
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
		const river_River_1 = shapetownSquare.createLayer("River/River", ["RiverShallowSheet_v01"], 0, 0);

		// decoration_
		const decoration_ = shapetownSquare.createLayer("Decoration/9", ["TreePatteren"], 0, 0);

		// decoration_Waterwell_1
		const decoration_Waterwell_1 = shapetownSquare.createLayer("Decoration/Waterwell", ["Waterwell"], 0, 0);

		// decoration_WaterwellRoof_1
		const decoration_WaterwellRoof_1 = shapetownSquare.createLayer("Decoration/WaterwellRoof", ["WaterwellRoof"], 0, 0);

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

		// blacksmith_Blacksmith_stall_1
		const blacksmith_Blacksmith_stall_1 = shapetownSquare.createLayer("Blacksmith/Blacksmith stall", ["Blacksmith"], 0, 0);

		// mechant_merchant_1
		const mechant_merchant_1 = shapetownSquare.createLayer("Mechant/merchant", ["MerchantCabin_v01"], 0, 0);

		// mechant_MerchantCarriage_1
		const mechant_MerchantCarriage_1 = shapetownSquare.createLayer("Mechant/MerchantCarriage", ["MerchentanCarriege"], 0, 0);

		// mechant_Merchant_logo_1
		const mechant_Merchant_logo_1 = shapetownSquare.createLayer("Mechant/Merchant logo", ["MerchantIcon"], 0, 0);

		// barracks_Barricade
		const barracks_Barricade = shapetownSquare.createLayer("Barracks/Barricade3", ["BarricadeSpikes_V02","BarricadeSpikes_V03","BarricadeSpikes_V01"], 0, 0);

		// barracks_Barricade_1
		const barracks_Barricade_1 = shapetownSquare.createLayer("Barracks/Barricade2", ["BarricadeSpikes_V03","BarricadeSpikes_V02","BarricadeSpikes_V01"], 0, 0);

		// barracks_Barricade_2
		const barracks_Barricade_2 = shapetownSquare.createLayer("Barracks/Barricade1", ["BarricadeSpikes_V02","BarricadeSpikes_V03","BarricadeSpikes_V01"], 0, 0);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 2435, 2468);
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
		const stoneBridgeDownPrefab = new StoneBridgeDownPrefab(this, 2434, 2536);
		this.add.existing(stoneBridgeDownPrefab);

		// stoneBridgeRightPrefab
		const stoneBridgeRightPrefab = new StoneBridgeRightPrefab(this, 3183, 1731);
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

		// nPC_NPC_Soilder_1
		shapetownSquare.createLayer("NPC/NPC Soilder", ["NPCSoilderSpearAttack_V01","NPCGuardian_V01"], 0, 0);

		// blackSmithPrefab
		const blackSmithPrefab = new BlackSmithPrefab(this, 1734, 1918);
		this.add.existing(blackSmithPrefab);

		// openMapPrefab
		const openMapPrefab = new OpenMapPrefab(this, 3354, 2730);
		this.add.existing(openMapPrefab);

		// openInventory
		const openInventory = new OpenInventory(this, 3595, 2710);
		this.add.existing(openInventory);

		// questBookPrefab
		const questBookPrefab = new QuestBookPrefab(this, 3221, 2787);
		this.add.existing(questBookPrefab);

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
		const merchantPrefab = new MerchantPrefab(this, 1821, 2178);
		this.add.existing(merchantPrefab);

		this.bG_grass_1 = bG_grass_1;
		this.bG_stone_road_1 = bG_stone_road_1;
		this.bG_tallgrass_1 = bG_tallgrass_1;
		this.collution_Cliff_1 = collution_Cliff_1;
		this.collution_WoodenFence_1 = collution_WoodenFence_1;
		this.collution_StoneFence_1 = collution_StoneFence_1;
		this.river_River_1 = river_River_1;
		this.decoration_ = decoration_;
		this.decoration_Waterwell_1 = decoration_Waterwell_1;
		this.decoration_WaterwellRoof_1 = decoration_WaterwellRoof_1;
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
		this.blacksmith_Blacksmith_stall_1 = blacksmith_Blacksmith_stall_1;
		this.mechant_merchant_1 = mechant_merchant_1;
		this.mechant_MerchantCarriage_1 = mechant_MerchantCarriage_1;
		this.mechant_Merchant_logo_1 = mechant_Merchant_logo_1;
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
		this.questBookPrefab = questBookPrefab;
		this.profilePrefab = profilePrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.minimapPrefab = minimapPrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.optionsListPrefab = optionsListPrefab;
		this.foodMerchant = foodMerchant;
		this.merchantPrefab = merchantPrefab;
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
	decoration_Waterwell_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_WaterwellRoof_1;
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
	blacksmith_Blacksmith_stall_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	mechant_merchant_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	mechant_MerchantCarriage_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	mechant_Merchant_logo_1;
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
	/** @type {QuestBookPrefab} */
	questBookPrefab;
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

	    this.playerPrefab?.setDepth(90);

	    this.stoneBridgeDownPrefab?.setDepth(10);
	    this.stoneBridgeRightPrefab?.setDepth(10);
	    this.tree_left_side?.setDepth(10);
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
  setupStartingItems() {
	if (!this.newItemHudPrefab || !this.newItemHudPrefab.itemBoxs) return;

	this.newItemHudPrefab.visible = true;
	this.questBookPrefab.visible = true;

	this.newItemHudPrefab.itemBoxs.forEach((box, index) => {
	  box.setInteractive({ useHandCursor: true });
	  box.on('pointerdown', () => {
		// Only proceed if this is an inactive box
		if (box.frame.name === 0) {
		  // Reset all other boxes
		  this.newItemHudPrefab.itemBoxs.forEach((otherBox) => {
			if (otherBox !== box) {
			  otherBox.setTexture("HudItemSlot", 0);
			}
		  });

		  // Set this box as active
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

    if (!this.game.questSystem) {
        this.game.questSystem = questSystem;
    }

    extendSceneWithQuests(this);

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
    this.achievements = {
        firstMarketVisit: false,
        townSquareExplorer: false,
        meetTheBlacksmith: false
    };

    this.initInventorySystem();

    this.setupLayerDepths();

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

    this.squareFountanPrefab.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab_1.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab_2.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab_3.setupCollision(this.playerPrefab);
    this.squareCampFirePrefab.setupCollision(this.playerPrefab);
    this.mineWatchTowerPrefab.setupCollision(this.playerPrefab);
    this.squareDragonHousePrefab.setupCollision(this.playerPrefab);
    this.squareTownPrefab.setupCollision(this.playerPrefab);

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

    this.physics.add.collider(this.playerPrefab, this.mechant_merchant_1);
    this.mechant_merchant_1.setCollisionBetween(0, 10000);

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

    this.physics.add.collider(this.playerPrefab, this.blacksmith_Blacksmith_stall_1);
    this.blacksmith_Blacksmith_stall_1.setCollisionBetween(0, 10000);

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

    this.setupInteractionZones();
}

/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
