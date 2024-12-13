
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
		forestMap.createLayer("Ground/Cliff[Make Collutin]", ["ForrestLadge"], -2048, -896);

		// ground_Stairs_Staircase_1
		forestMap.createLayer("Ground/Stairs/Staircase", ["ForrestLadge"], -2048, -896);

		// ground_TopLevel_1
		forestMap.createLayer("Ground/TopLevel", ["RoadStone"], -2048, -896);

		// ground_Path_1
		forestMap.createLayer("Ground/Path", ["RoadStone"], -2048, -896);

		// lake_LakeBorder_Make_Collution__1
		forestMap.createLayer("Lake/LakeBorder[Make Collution]", ["LakeBorderAni","LakeBorderCornerAni","GroundTileset"], -2048, -896);

		// lake_LakeWater_Fishing_anywhere__1
		forestMap.createLayer("Lake/LakeWater[Fishing anywhere]", ["GroundTileset","LakeAccessor","Fishes_2_32x32","Fishes_1_32x32gif"], -2048, -896);

		// lake_LakeAccessor_Just_Generate__1
		forestMap.createLayer("Lake/LakeAccessor[Just Generate]", ["LakeAccessor"], -2048, -896);

		// lake_FloatingStones_Animated__1
		forestMap.createLayer("Lake/FloatingStones[Animated]", ["LakeFloatingRock_V01","LakeFloatingRock_V02","LakeFloatingRock_V03"], -2048, -896);

		// lake_WaterFall_1
		forestMap.createLayer("Lake/WaterFall", ["GroundTileset","Waterfall_V01","LakeBorderAni","LakeBorderCornerAni"], -2048, -896);

		// road_RoadStone_1
		forestMap.createLayer("Road/RoadStone", ["RoadStone"], -2048, -896);

		// road_Fence_1
		forestMap.createLayer("Road/Fence", [], -2048, -896);

		// road_Fence
		forestMap.createLayer("Road/Fence", [], -2048, -896);

		// treeBorder_TreeBordertop_1
		forestMap.createLayer("TreeBorder/TreeBordertop", ["TreePatteren"], -2048, -896);

		// treeBorder_TreeBorder
		forestMap.createLayer("TreeBorder/TreeBorder2", ["TreePatteren"], -2048, -896);

		// treeBorder_TreeBorder_1
		forestMap.createLayer("TreeBorder/TreeBorder1", ["TreePatteren"], -2048, -896);

		// treeBorder_TreeBorder_2
		forestMap.createLayer("TreeBorder/TreeBorder3", ["TreePatteren"], -2048, -896);

		// harvert_Own_Time_cycle__PineTrees_1
		forestMap.createLayer("Harvert[Own Time cycle]/PineTrees", ["Tree_v02"], -2048, -896);

		// harvert_Own_Time_cycle__Maple_tree_1
		forestMap.createLayer("Harvert[Own Time cycle]/Maple tree", ["Tree_v014","Tree_v04"], -2048, -896);

		// harvert_Own_Time_cycle__AppleTree_1
		forestMap.createLayer("Harvert[Own Time cycle]/AppleTree", ["Tree_v014"], -2048, -896);

		// assets_Become_Tree_DeadTree_1
		forestMap.createLayer("Assets Become Tree/DeadTree", ["Tree_v08","Tree_v09"], -2048, -896);

		// assets_Become_Tree_Branches_1
		forestMap.createLayer("Assets Become Tree/Branches", ["GroundAccessor"], -2048, -896);

		// usePickaxe_to_remove_Stone_1
		forestMap.createLayer("UsePickaxe to remove/Stone", ["GroundAccessor"], -2048, -896);

		// harvet_Respawn_randomly_around_Trees__Mushrooms_1
		forestMap.createLayer("Harvet[Respawn randomly around Trees]/Mushrooms", ["GroundAccessor"], -2048, -896);

		// treeHouseFence_Make_collusion__1
		forestMap.createLayer("TreeHouseFence[Make collusion]", ["RoadStone"], -2048, -896);

		// treeHouse_1
		forestMap.createLayer("TreeHouse", ["TreeHouse"], -2048, -896);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 606, 362);
		this.add.existing(playerPrefab);

		this.forestMap = forestMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.Tilemap} */
	forestMap;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
