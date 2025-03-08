
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
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ShapeTownSquareMapScene extends Phaser.Scene {

	constructor() {
		super("ShapeTownSquareMapScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
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

		// npcBlackSmithRight
		const npcBlackSmithRight = this.add.sprite(1662, 1920, "NpcBlaksmith", 0);
		npcBlackSmithRight.play("NpcBlackSmithRight");

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

		// nPC_NPC_Lily_1
		const nPC_NPC_Lily_1 = shapetownSquare.createLayer("NPC/NPC Lily", ["NPCShopStandMaerchant"], 0, 0);

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
		const playerPrefab = new PlayerPrefab(this, 2450, 2752);
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

		this.bG_grass_1 = bG_grass_1;
		this.bG_stone_road_1 = bG_stone_road_1;
		this.bG_tallgrass_1 = bG_tallgrass_1;
		this.npcBlackSmithRight = npcBlackSmithRight;
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
		this.nPC_NPC_Lily_1 = nPC_NPC_Lily_1;
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
		this.shapetownSquare = shapetownSquare;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_stone_road_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bG_tallgrass_1;
	/** @type {Phaser.GameObjects.Sprite} */
	npcBlackSmithRight;
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
	nPC_NPC_Lily_1;
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
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownSquare;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.cameras.main.setBounds(0, 0, 3840, 2880);
        this.physics.world.bounds.width = 1000;
        this.physics.world.bounds.height = 800;

		this.squareFountanPrefab.setupCollision(this.playerPrefab)
		this.squareCampFirePrefab_1.setupCollision(this.playerPrefab)
		this.squareCampFirePrefab_2.setupCollision(this.playerPrefab)
		this.squareCampFirePrefab_3.setupCollision(this.playerPrefab)
		this.squareCampFirePrefab.setupCollision(this.playerPrefab)
		this.mineWatchTowerPrefab.setupCollision(this.playerPrefab)
		this.squareDragonHousePrefab.setupCollision(this.playerPrefab)
		this.squareTownPrefab.setupCollision(this.playerPrefab)
		this.stoneBridgeDownPrefab.setDepth(10)
		this.stoneBridgeRightPrefab.setDepth(10)
		this.tree_left_side.setDepth(10)
		this.playerPrefab.setDepth(100)

		this.physics.add.collider(this.playerPrefab, this.collution_WoodenFence_1);
	    this.collution_WoodenFence_1.setCollisionBetween(0,10000);
	    // this.collution_WoodenFence_1.renderDebug(this.add.graphics())

		this.physics.add.collider(this.playerPrefab, this.tree_left_side_3);
	    this.tree_left_side_3.setCollisionBetween(0,10000);
	    // this.tree_left_side_3.renderDebug(this.add.graphics())

		this.physics.add.collider(this.playerPrefab, this.collution_StoneFence_1);
	    this.collution_StoneFence_1.setCollisionBetween(0,10000);
	    // this.collution_StoneFence_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_left_side_4);
	    this.tree_left_side_4.setCollisionBetween(0,10000);
	    // this.tree_left_side_4.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.decoration_);
	    this.decoration_.setCollisionBetween(0,10000);
	    // this.decoration_.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_left_side_2);
	    this.tree_left_side_2.setCollisionBetween(0,10000);
	    // this.tree_left_side_2.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_left_side_);
	    this.tree_left_side_.setCollisionBetween(0,10000);
	    // this.tree_left_side_.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_left_side);
	    this.tree_left_side.setCollisionBetween(0,10000);
	    // this.tree_left_side.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.river_River_1);
	    this.river_River_1.setCollisionBetween(0,10000);
	    // this.river_River_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.collution_Cliff_1);
	    this.collution_Cliff_1.setCollisionBetween(0,10000);
	    // this.collution_Cliff_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.barracks_Barricade_2);
	    this.barracks_Barricade_2.setCollisionBetween(0,10000);
	    // this.barracks_Barricade_2.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.decoration_Log_1);
	    this.decoration_Log_1.setCollisionBetween(0,10000);
	    // this.decoration_Log_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.forager_home_Basket_of_apple_1);
        this.forager_home_Basket_of_apple_1.setCollisionBetween(0, 10000);
		// this.forager_home_Basket_of_apple_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.barracks_Tents_1);
	    this.barracks_Tents_1.setCollisionBetween(0,10000);
	    // this.barracks_Tents_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_left_side_1);
	    this.tree_left_side_1.setCollisionBetween(0,10000);
	    // this.tree_left_side_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.tree_left_side);
	    this.tree_left_side.setCollisionBetween(0,10000);
	    // this.tree_left_side.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.decoration_Rock_2);
	    this.decoration_Rock_2.setCollisionBetween(0,10000);
	    // this.decoration_Rock_2.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.decoration_Rock_1);
	    this.decoration_Rock_1.setCollisionBetween(0,10000);
	    // this.decoration_Rock_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.mechant_merchant_1);
	    this.mechant_merchant_1.setCollisionBetween(0,10000);
	    // this.mechant_merchant_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.mechant_MerchantCarriage_1);
	    this.mechant_MerchantCarriage_1.setCollisionBetween(0,10000);
	    // this.mechant_MerchantCarriage_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.foodStand_Basket_1);
	    this.foodStand_Basket_1.setCollisionBetween(0,10000);
	    // this.foodStand_Basket_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.foodStand_stall_1);
	    this.foodStand_stall_1.setCollisionBetween(0,10000);
	    // this.foodStand_stall_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.foodStand_Fishbarrel_1);
	    this.foodStand_Fishbarrel_1.setCollisionBetween(0,10000);
	    // this.foodStand_Fishbarrel_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.decoration_Rock_3);
	    this.decoration_Rock_3.setCollisionBetween(0,10000);
	    // this.decoration_Rock_3.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.forager_home_Baket_of_mushrooms_1);
	    this.forager_home_Baket_of_mushrooms_1.setCollisionBetween(0,10000);
	    // this.forager_home_Baket_of_mushrooms_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.forager_home_Tent_1);
	    this.forager_home_Tent_1.setCollisionBetween(0,10000);
	    // this.forager_home_Tent_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.blacksmith_Blacksmith_stall_1);
	    this.blacksmith_Blacksmith_stall_1.setCollisionBetween(0,10000);
	    // this.blacksmith_Blacksmith_stall_1.renderDebug(this.add.graphics());

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
		// if (tile && tile.index === 0) {
        // const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        // sprite.play('RiverLeft_1');
        // }
		// if (tile && tile.index === 5192) {
        // const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        // sprite.play('RiverRight_1');
        // }
		// if (tile && tile.index === 5225) {
        // const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        // sprite.play('RiverLeftDown_1');
        // }
		// if (tile && tile.index === 5255) {
        // const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        // sprite.play('RiverLeft_2');
        // }
		// if (tile && tile.index === 5254) {
        // const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        // sprite.play('RiverDown');
        // }
		// if (tile && tile.index === 5134) {
        // const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        // sprite.play('RiverUp');
        // }

        });

		this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
		    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
			}

		    this.scene.switch("ShapeTownBeachMapScene");
		    this.playerPrefab.y -= 30;
		    this.cameras.main.fadeIn(2000, 0, 0, 0);
		});

		this.physics.add.overlap(this.sceneTile_1, this.playerPrefab, () => {
		    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
			}

		    this.scene.switch("ShapeTownFarmingMapScene");
		    this.playerPrefab.x += 30;
		    this.cameras.main.fadeIn(2000, 0, 0, 0);
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
