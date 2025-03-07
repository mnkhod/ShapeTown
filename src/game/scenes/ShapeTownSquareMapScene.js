
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import SquareFountanPrefab from "../prefabs/Fountan/SquareFountanPrefab";
import SquareCampFirePrefab from "../prefabs/Lightning/SquareCampFirePrefab";
import SquareFirePrefab from "../prefabs/Lightning/SquareFirePrefab";
import MineWatchTowerPrefab from "../prefabs/House/MineWatchTowerPrefab";
import SquareDragonHousePrefab from "../prefabs/House/SquareDragonHousePrefab";
import SquareTownPrefab from "../prefabs/House/SquareTownPrefab";
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
		shapetownSquare.addTilesetImage("TownHall", "TownHall");
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

		// river_Bridge
		const river_Bridge = shapetownSquare.createLayer("River/Bridge1", ["StoneBridgeHorizontal_V01"], 0, 0);

		// river_Bridge_1
		const river_Bridge_1 = shapetownSquare.createLayer("River/Bridge 2", ["StoneBridgeVertical_V01"], 0, 0);

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

		// tree_left_side
		const tree_left_side = shapetownSquare.createLayer("Tree left side/7", ["TreePatteren"], 0, 0);

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

		// tree_left_side_6
		const tree_left_side_6 = shapetownSquare.createLayer("Tree left side/1", ["TreePatteren"], 0, 0);

		// forager_home_Baket_of_mushrooms_1
		const forager_home_Baket_of_mushrooms_1 = shapetownSquare.createLayer("Forager home/Baket of mushrooms", ["Apple"], 0, 0);

		// forager_home_Basket_of_apple_1
		const forager_home_Basket_of_apple_1 = shapetownSquare.createLayer("Forager home/Basket of apple", ["Apple"], 0, 0);

		// foodStand_FoodstandStall_1
		const foodStand_FoodstandStall_1 = shapetownSquare.createLayer("FoodStand/FoodstandStall", ["Foodstand"], 0, 0);

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
		const foodStand_stall = shapetownSquare.createLayer("FoodStand/stall", ["FoodstandStall_V01"], 0, 0);

		// foodStand_Logo_Foodstand_1
		const foodStand_Logo_Foodstand_1 = shapetownSquare.createLayer("FoodStand/Logo Foodstand", ["FoodstandIcon"], 0, 0);

		// foodStand_Basket_1
		const foodStand_Basket_1 = shapetownSquare.createLayer("FoodStand/Basket", ["Foodstand_Busket"], 0, 0);

		// blacksmith_Blacksmith_1
		const blacksmith_Blacksmith_1 = shapetownSquare.createLayer("Blacksmith/Blacksmith", ["NpcBlaksmith"], 0, 0);

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
		const barracks_Barricade_2 = shapetownSquare.createLayer("Barracks/Barricade1", ["Barricade_V01","BarricadeSpikes_V02","BarricadeSpikes_V03","BarricadeSpikes_V01"], 0, 0);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 2420, 2652);
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

		// barracks_Tents_3
		const barracks_Tents_3 = shapetownSquare.createLayer("Barracks/Tents1", ["Tent_V04"], 0, 0);

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
		const squareTownPrefab = new SquareTownPrefab(this, 2240, 1425);
		this.add.existing(squareTownPrefab);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(2440, 2820, "Fruitbushes_V01", 23);
		sceneTile.scaleX = 10.306994636480235;
		sceneTile.scaleY = 1.586085054631967;
		this.physics.add.existing(sceneTile, false);
		sceneTile.body.allowGravity = false;
		sceneTile.body.setSize(32, 200, false);

		// squareCampFirePrefab_3
		const squareCampFirePrefab_3 = new SquareCampFirePrefab(this, 2800, 2700);
		this.add.existing(squareCampFirePrefab_3);

		this.bG_grass_1 = bG_grass_1;
		this.bG_stone_road_1 = bG_stone_road_1;
		this.bG_tallgrass_1 = bG_tallgrass_1;
		this.collution_Cliff_1 = collution_Cliff_1;
		this.collution_WoodenFence_1 = collution_WoodenFence_1;
		this.collution_StoneFence_1 = collution_StoneFence_1;
		this.river_River_1 = river_River_1;
		this.river_Bridge = river_Bridge;
		this.river_Bridge_1 = river_Bridge_1;
		this.decoration_ = decoration_;
		this.decoration_Waterwell_1 = decoration_Waterwell_1;
		this.decoration_WaterwellRoof_1 = decoration_WaterwellRoof_1;
		this.decoration_Decoration_1 = decoration_Decoration_1;
		this.decoration_Tree_1 = decoration_Tree_1;
		this.decoration_Log_1 = decoration_Log_1;
		this.decoration_bush_1 = decoration_bush_1;
		this.tree_left_side_ = tree_left_side_;
		this.tree_left_side = tree_left_side;
		this.tree_left_side_1 = tree_left_side_1;
		this.tree_left_side_2 = tree_left_side_2;
		this.tree_left_side_3 = tree_left_side_3;
		this.tree_left_side_4 = tree_left_side_4;
		this.tree_left_side_5 = tree_left_side_5;
		this.tree_left_side_6 = tree_left_side_6;
		this.forager_home_Baket_of_mushrooms_1 = forager_home_Baket_of_mushrooms_1;
		this.forager_home_Basket_of_apple_1 = forager_home_Basket_of_apple_1;
		this.foodStand_FoodstandStall_1 = foodStand_FoodstandStall_1;
		this.foodStand_Foodstand_1 = foodStand_Foodstand_1;
		this.foodStand_Fishbarrel_1 = foodStand_Fishbarrel_1;
		this.foodStand_stall_1 = foodStand_stall_1;
		this.foodStand_Foodstand = foodStand_Foodstand;
		this.foodStand_Fishbarrel = foodStand_Fishbarrel;
		this.foodStand_stall = foodStand_stall;
		this.foodStand_Logo_Foodstand_1 = foodStand_Logo_Foodstand_1;
		this.foodStand_Basket_1 = foodStand_Basket_1;
		this.blacksmith_Blacksmith_1 = blacksmith_Blacksmith_1;
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
		this.barracks_Tents_3 = barracks_Tents_3;
		this.mineWatchTowerPrefab = mineWatchTowerPrefab;
		this.mineWatchTowerPrefab_1 = mineWatchTowerPrefab_1;
		this.barracks_Tents_1 = barracks_Tents_1;
		this.squareDragonHousePrefab = squareDragonHousePrefab;
		this.squareTownPrefab = squareTownPrefab;
		this.sceneTile = sceneTile;
		this.squareCampFirePrefab_3 = squareCampFirePrefab_3;
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
	river_Bridge;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	river_Bridge_1;
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
	tree_left_side;
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
	tree_left_side_6;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	forager_home_Baket_of_mushrooms_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	forager_home_Basket_of_apple_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_FoodstandStall_1;
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
	foodStand_Logo_Foodstand_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foodStand_Basket_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	blacksmith_Blacksmith_1;
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
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	barracks_Tents_3;
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

		this.physics.add.collider(this.playerPrefab, this.collution_WoodenFence_1);
	    this.collution_WoodenFence_1.setCollisionBetween(0,10000);
	    // this.collution_WoodenFence_1.renderDebug(this.add.graphics())

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

		this.physics.add.collider(this.playerPrefab, this.barracks_Tents_3);
	    this.barracks_Tents_3.setCollisionBetween(0,10000);
	    // this.barracks_Tents_3.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.barracks_Tents_1);
	    this.barracks_Tents_1.setCollisionBetween(0,10000);
	    // this.barracks_Tents_1.renderDebug(this.add.graphics());

		const waterTiles = this.river_River_1.getTilesWithin();
        waterTiles.forEach(tile => {
        if (tile && tile.index === 5573) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverMiddle');
        }
		  if (tile && tile.index === 5603) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverMiddle_1');
        }
		  if (tile && tile.index === 5693) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverMiddle_2');
        }
		if (tile && tile.index === 5663) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverMiddle_3');
        }
		if (tile && tile.index === 5196) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverLeft_1');
        }
		if (tile && tile.index === 5192) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverRight_1');
        }
		if (tile && tile.index === 5225) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverLeftDown_1');
        }
		if (tile && tile.index === 5255) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverLeft_2');
        }
		if (tile && tile.index === 5254) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverDown');
        }
		if (tile && tile.index === 5134) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'river_River_1');
        sprite.play('RiverUp');
        }

        });

		this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
		    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
			}

		    this.scene.switch("ShapeTownBeachMapScene");
		    this.playerPrefab.y -= 30;
		    this.cameras.main.fadeIn(2000, 0, 0, 0);
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
