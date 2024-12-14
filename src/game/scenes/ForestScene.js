
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ForestScene extends Phaser.Scene {

	constructor() {
		super("ForestScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// forestMap
		const forestMap = this.add.tilemap("ForestMap");
		forestMap.addTilesetImage("RoadStone", "RoadStone");
		forestMap.addTilesetImage("ForrestLadge", "ForrestLadge");
		forestMap.addTilesetImage("GroundTileset", "GroundTileset");
		forestMap.addTilesetImage("Fishes_2_32x32", "Fishes_2_32x32");
		forestMap.addTilesetImage("Fishes_3_32x32", "Fishes_3_32x32");
		forestMap.addTilesetImage("Fishes_1_32x32gif", "Fishes_1_32x32gif");
		forestMap.addTilesetImage("Waterfall_V01", "Waterfall_V01");
		forestMap.addTilesetImage("GroundAccessor", "GroundAccessor");
		forestMap.addTilesetImage("LakeFloatingRock_V03", "LakeFloatingRock_V03");
		forestMap.addTilesetImage("LakeAccessor", "LakeAccessor");
		forestMap.addTilesetImage("LakeFloatingRock_V01", "LakeFloatingRock_V01");
		forestMap.addTilesetImage("LakeFloatingRock_V02", "LakeFloatingRock_V02");
		forestMap.addTilesetImage("TreePatteren", "TreePatteren");
		forestMap.addTilesetImage("Tree_v02", "Tree_v02");
		forestMap.addTilesetImage("Tree_v04", "Tree_v04");
		forestMap.addTilesetImage("Tree_v08", "Tree_v08");
		forestMap.addTilesetImage("Tree_v09", "Tree_v09");
		forestMap.addTilesetImage("Tree_v014", "Tree_v014");
		forestMap.addTilesetImage("LakeBorderAni", "LakeBorderAni");
		forestMap.addTilesetImage("LakeBorderCornerAni", "LakeBorderCornerAni");
		forestMap.addTilesetImage("TreeHouse", "TreeHouse");

		// backGround_1
		forestMap.createLayer("BackGround", ["RoadStone"], -2048, -896);

		// ground_LowerLevel_1
		forestMap.createLayer("Ground/LowerLevel", ["RoadStone"], -2048, -896);

		// ground_Cliff_Make_Collutin__1
		const ground_Cliff_Make_Collutin__1 = forestMap.createLayer("Ground/Cliff[Make Collutin]", ["ForrestLadge"], -2048, -896);

		// ground_Stairs_Staircase_1
		forestMap.createLayer("Ground/Stairs/Staircase", ["ForrestLadge"], -2048, -896);

		// ground_TopLevel_1
		const ground_TopLevel_1 = forestMap.createLayer("Ground/TopLevel", ["RoadStone"], -2048, -896);

		// ground_Path_1
		forestMap.createLayer("Ground/Path", ["RoadStone"], -2048, -896);

		// lake_LakeBorder_Make_Collution__1
		const lake_LakeBorder_Make_Collution__1 = forestMap.createLayer("Lake/LakeBorder[Make Collution]", ["LakeBorderAni","LakeBorderCornerAni","GroundTileset"], -2048, -896);

		// lake_LakeWater_Fishing_anywhere__1
		const lake_LakeWater_Fishing_anywhere__1 = forestMap.createLayer("Lake/LakeWater[Fishing anywhere]", ["GroundTileset","LakeAccessor","Fishes_2_32x32","Fishes_1_32x32gif"], -2048, -896);

		// lake_LakeAccessor_Just_Generate__1
		const lake_LakeAccessor_Just_Generate__1 = forestMap.createLayer("Lake/LakeAccessor[Just Generate]", ["LakeAccessor"], -2048, -896);

		// lake_FloatingStones_Animated__1
		const lake_FloatingStones_Animated__1 = forestMap.createLayer("Lake/FloatingStones[Animated]", ["LakeFloatingRock_V01","LakeFloatingRock_V02","LakeFloatingRock_V03"], -2048, -896);

		// lake_WaterFall_1
		const lake_WaterFall_1 = forestMap.createLayer("Lake/WaterFall", ["GroundTileset","Waterfall_V01","LakeBorderAni","LakeBorderCornerAni"], -2048, -896);

		// treeBorder_TreeBordertop_1
		const treeBorder_TreeBordertop_1 = forestMap.createLayer("TreeBorder/TreeBordertop", ["TreePatteren"], -2048, -896);

		// treeBorder_TreeBorder
		const treeBorder_TreeBorder = forestMap.createLayer("TreeBorder/TreeBorder2", ["TreePatteren"], -2048, -896);

		// treeBorder_TreeBorder_1
		const treeBorder_TreeBorder_1 = forestMap.createLayer("TreeBorder/TreeBorder1", ["TreePatteren"], -2048, -896);

		// treeBorder_TreeBorder_2
		const treeBorder_TreeBorder_2 = forestMap.createLayer("TreeBorder/TreeBorder3", ["TreePatteren"], -2048, -896);

		// harvert_Own_Time_cycle__PineTrees_1
		const harvert_Own_Time_cycle__PineTrees_1 = forestMap.createLayer("Harvert[Own Time cycle]/PineTrees", ["Tree_v02"], -2048, -896);

		// harvert_Own_Time_cycle__Maple_tree_1
		const harvert_Own_Time_cycle__Maple_tree_1 = forestMap.createLayer("Harvert[Own Time cycle]/Maple tree", ["Tree_v014","Tree_v04"], -2048, -896);

		// harvert_Own_Time_cycle__AppleTree_1
		const harvert_Own_Time_cycle__AppleTree_1 = forestMap.createLayer("Harvert[Own Time cycle]/AppleTree", ["Tree_v014"], -2048, -896);

		// assets_Become_Tree_DeadTree_1
		const assets_Become_Tree_DeadTree_1 = forestMap.createLayer("Assets Become Tree/DeadTree", ["Tree_v08","Tree_v09"], -2048, -896);

		// assets_Become_Tree_Branches_1
		const assets_Become_Tree_Branches_1 = forestMap.createLayer("Assets Become Tree/Branches", ["GroundAccessor"], -2048, -896);

		// usePickaxe_to_remove_Stone_1
		const usePickaxe_to_remove_Stone_1 = forestMap.createLayer("UsePickaxe to remove/Stone", ["GroundAccessor"], -2048, -896);

		// harvet_Respawn_randomly_around_Trees__Mushrooms_1
		const harvet_Respawn_randomly_around_Trees__Mushrooms_1 = forestMap.createLayer("Harvet[Respawn randomly around Trees]/Mushrooms", ["GroundAccessor"], -2048, -896);

		// treeHouseFence_Make_collusion__1
		const treeHouseFence_Make_collusion__1 = forestMap.createLayer("TreeHouseFence[Make collusion]", ["RoadStone"], -2048, -896);

		// treeHouse_1
		const treeHouse_1 = forestMap.createLayer("TreeHouse", ["TreeHouse"], -2048, -896);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 606, 362);
		this.add.existing(playerPrefab);

		this.ground_Cliff_Make_Collutin__1 = ground_Cliff_Make_Collutin__1;
		this.ground_TopLevel_1 = ground_TopLevel_1;
		this.lake_LakeBorder_Make_Collution__1 = lake_LakeBorder_Make_Collution__1;
		this.lake_LakeWater_Fishing_anywhere__1 = lake_LakeWater_Fishing_anywhere__1;
		this.lake_LakeAccessor_Just_Generate__1 = lake_LakeAccessor_Just_Generate__1;
		this.lake_FloatingStones_Animated__1 = lake_FloatingStones_Animated__1;
		this.lake_WaterFall_1 = lake_WaterFall_1;
		this.treeBorder_TreeBordertop_1 = treeBorder_TreeBordertop_1;
		this.treeBorder_TreeBorder = treeBorder_TreeBorder;
		this.treeBorder_TreeBorder_1 = treeBorder_TreeBorder_1;
		this.treeBorder_TreeBorder_2 = treeBorder_TreeBorder_2;
		this.harvert_Own_Time_cycle__PineTrees_1 = harvert_Own_Time_cycle__PineTrees_1;
		this.harvert_Own_Time_cycle__Maple_tree_1 = harvert_Own_Time_cycle__Maple_tree_1;
		this.harvert_Own_Time_cycle__AppleTree_1 = harvert_Own_Time_cycle__AppleTree_1;
		this.assets_Become_Tree_DeadTree_1 = assets_Become_Tree_DeadTree_1;
		this.assets_Become_Tree_Branches_1 = assets_Become_Tree_Branches_1;
		this.usePickaxe_to_remove_Stone_1 = usePickaxe_to_remove_Stone_1;
		this.harvet_Respawn_randomly_around_Trees__Mushrooms_1 = harvet_Respawn_randomly_around_Trees__Mushrooms_1;
		this.treeHouseFence_Make_collusion__1 = treeHouseFence_Make_collusion__1;
		this.treeHouse_1 = treeHouse_1;
		this.playerPrefab = playerPrefab;
		this.forestMap = forestMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	ground_Cliff_Make_Collutin__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	ground_TopLevel_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_LakeBorder_Make_Collution__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_LakeWater_Fishing_anywhere__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_LakeAccessor_Just_Generate__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_FloatingStones_Animated__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	lake_WaterFall_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeBordertop_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeBorder_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeBorder_TreeBorder_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	harvert_Own_Time_cycle__PineTrees_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	harvert_Own_Time_cycle__Maple_tree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	harvert_Own_Time_cycle__AppleTree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	assets_Become_Tree_DeadTree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	assets_Become_Tree_Branches_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	usePickaxe_to_remove_Stone_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	harvet_Respawn_randomly_around_Trees__Mushrooms_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeHouseFence_Make_collusion__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	treeHouse_1;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	forestMap;

	/* START-USER-CODE */

	// Write your code here

	create() {
    this.editorCreate();

    	this.physics.add.collider(this.playerPrefab, this.treeHouse_1);
    	this.treeHouse_1.setCollisionBetween(2300, 2800);
		// this.treeHouse_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeHouseFence_Make_collusion__1);
    	this.treeHouseFence_Make_collusion__1.setCollisionBetween(0, 3000);
		// this.treeHouseFence_Make_collusion__1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.harvet_Respawn_randomly_around_Trees__Mushrooms_1);
    	this.harvet_Respawn_randomly_around_Trees__Mushrooms_1.setCollisionBetween(0, 3000);
		// this.harvet_Respawn_randomly_around_Trees__Mushrooms_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.usePickaxe_to_remove_Stone_1);
    	// this.usePickaxe_to_remove_Stone_1.setCollisionBetween(0, 3000);
		// this.usePickaxe_to_remove_Stone_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.assets_Become_Tree_Branches_1);
    	// this.assets_Become_Tree_Branches_1.setCollisionBetween(0, 3000);
		// this.assets_Become_Tree_Branches_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.assets_Become_Tree_DeadTree_1);
    	this.assets_Become_Tree_DeadTree_1.setCollisionBetween(0, 3000);
		// this.assets_Become_Tree_DeadTree_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.harvert_Own_Time_cycle__AppleTree_1);
    	this.harvert_Own_Time_cycle__AppleTree_1.setCollisionBetween(0, 3000);
		// this.harvert_Own_Time_cycle__AppleTree_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.harvert_Own_Time_cycle__Maple_tree_1);
    	this.harvert_Own_Time_cycle__Maple_tree_1.setCollisionBetween(0, 3000);
		// this.harvert_Own_Time_cycle__Maple_tree_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.harvert_Own_Time_cycle__PineTrees_1);
    	this.harvert_Own_Time_cycle__PineTrees_1.setCollisionBetween(0, 3000);
		// this.harvert_Own_Time_cycle__PineTrees_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeBorder);
    	this.treeBorder_TreeBorder.setCollisionBetween(0, 3000);
		// this.treeBorder_TreeBorder.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeBorder_1);
    	this.treeBorder_TreeBorder_1.setCollisionBetween(0, 3000);
		// this.treeBorder_TreeBorder_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeBorder_2);
    	this.treeBorder_TreeBorder_2.setCollisionBetween(0, 3000);
		// this.treeBorder_TreeBorder_2.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.treeBorder_TreeBordertop_1);
    	this.treeBorder_TreeBordertop_1.setCollisionBetween(0, 3000);
		// this.treeBorder_TreeBordertop_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.lake_WaterFall_1);
    	this.lake_WaterFall_1.setCollisionBetween(0, 3000);
		// this.lake_WaterFall_1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.lake_FloatingStones_Animated__1);
    	this.lake_FloatingStones_Animated__1.setCollisionBetween(0, 3000);
		// this.lake_FloatingStones_Animated__1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.lake_LakeBorder_Make_Collution__1);
    	this.lake_LakeBorder_Make_Collution__1.setCollisionBetween(0, 3000);
		// this.lake_LakeBorder_Make_Collution__1.renderDebug(this.add.graphics());

    	this.physics.add.collider(this.playerPrefab, this.ground_Cliff_Make_Collutin__1);
    	this.ground_Cliff_Make_Collutin__1.setCollisionBetween(0, 3000);
		// this.ground_Cliff_Make_Collutin__1.renderDebug(this.add.graphics());



	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here