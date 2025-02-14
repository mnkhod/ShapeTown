
// You can write more code here

/* START OF COMPILED CODE */

import PlayerPrefab from "../prefabs/PlayerPrefab";
import MineHousePrefab from "../prefabs/House/MineHousePrefab";
import MineTorchPrefab from "../prefabs/Lightning/MineTorchPrefab";
import MineWatchTowerPrefab from "../prefabs/House/MineWatchTowerPrefab";
import RockMonster from "../prefabs/Mob/RockMonster";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ShapeTownMineMapScene extends Phaser.Scene {

	constructor() {
		super("ShapeTownMineMapScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// shapetownMineEntrance
		const shapetownMineEntrance = this.add.tilemap("ShapetownMineEntrance");
		shapetownMineEntrance.addTilesetImage("GroundTileset_V02", "GroundTileset_V02");
		shapetownMineEntrance.addTilesetImage("TreePatteren", "TreePatteren");
		shapetownMineEntrance.addTilesetImage("RockOnEmpty_V01", "RockOnEmpty_V01");
		shapetownMineEntrance.addTilesetImage("GuardPostTower_V01", "GuardPostTower_V01");
		shapetownMineEntrance.addTilesetImage("BridgeRobe", "BridgeRobe");
		shapetownMineEntrance.addTilesetImage("MineEntrance", "MineEntrance");
		shapetownMineEntrance.addTilesetImage("WatchtowerFrontRegular_V01", "WatchtowerBackRegular_V01");
		shapetownMineEntrance.addTilesetImage("WatchtowerFront_01", "WatchtowerFront_01");
		shapetownMineEntrance.addTilesetImage("Miner'stower", "Miner'stower");
		shapetownMineEntrance.addTilesetImage("TreeNaked_V03", "TreeNaked_V03");
		shapetownMineEntrance.addTilesetImage("TreeNaked_V01", "TreeNaked_V01");
		shapetownMineEntrance.addTilesetImage("TreeNaked_V02", "TreeNaked_V02");
		shapetownMineEntrance.addTilesetImage("TorchBowlRegular_V01", "TorchBowlRegular_V01");
		shapetownMineEntrance.addTilesetImage("AncientScript_V01", "AncientScript_V01");
		shapetownMineEntrance.addTilesetImage("CampFireFireSheet_V02", "CampFireFireSheet_V02");

		// bg_1
		const bg_1 = shapetownMineEntrance.createLayer("bg", ["GroundTileset_V02"], 0, 0);

		// cliffs_1
		const cliffs_1 = shapetownMineEntrance.createLayer("cliffs", ["GroundTileset_V02"], 0, 0);

		// mine_entrance_1
		const mine_entrance_1 = shapetownMineEntrance.createLayer("Mine entrance", ["MineEntrance"], 0, 0);

		// rocks_1
		const rocks_1 = shapetownMineEntrance.createLayer("rocks", ["RockOnEmpty_V01"], 0, 0);

		// hole_Bridge_Hole_1
		const hole_Bridge_Hole_1 = shapetownMineEntrance.createLayer("Hole Bridge/Hole", ["GroundTileset_V02"], 0, 0);

		// hole_Bridge_Brigde_1
		const hole_Bridge_Brigde_1 = shapetownMineEntrance.createLayer("Hole Bridge/Brigde", ["BridgeRobe"], 0, 0);

		// hole_Bridge_Bridge
		const hole_Bridge_Bridge = shapetownMineEntrance.createLayer("Hole Bridge/Bridge2", ["BridgeRobe"], 0, 0);

		// hole_Bridge_Bridge_1
		const hole_Bridge_Bridge_1 = shapetownMineEntrance.createLayer("Hole Bridge/Bridge3", ["BridgeRobe"], 0, 0);

		// tree_1
		const tree_1 = shapetownMineEntrance.createLayer("Tree", ["TreeNaked_V01","TreeNaked_V02","TreeNaked_V03"], 0, 0);

		// guard_post_Post_1
		const guard_post_Post_1 = shapetownMineEntrance.createLayer("Guard post/Post", ["GuardPostTower_V01"], 0, 0);

		// guard_post_Post_L
		const guard_post_Post_L = shapetownMineEntrance.createLayer("Guard post/Post L2", ["GuardPostTower_V01"], 0, 0);

		// decoration_1
		const decoration_1 = shapetownMineEntrance.createLayer("Decoration", ["AncientScript_V01"], 0, 0);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 990, 793);
		this.add.existing(playerPrefab);

		// mineHousePrefab
		const mineHousePrefab = new MineHousePrefab(this, 1680, 607);
		this.add.existing(mineHousePrefab);

		// mineTorchPrefab
		const mineTorchPrefab = new MineTorchPrefab(this, 1118, 477);
		this.add.existing(mineTorchPrefab);

		// mineTorchPrefab_1
		const mineTorchPrefab_1 = new MineTorchPrefab(this, 1215, 477);
		this.add.existing(mineTorchPrefab_1);

		// mineTorchPrefab_2
		const mineTorchPrefab_2 = new MineTorchPrefab(this, 573, 408);
		this.add.existing(mineTorchPrefab_2);

		// mineTorchPrefab_3
		const mineTorchPrefab_3 = new MineTorchPrefab(this, 576, 911);
		this.add.existing(mineTorchPrefab_3);

		// mineTorchPrefab_4
		const mineTorchPrefab_4 = new MineTorchPrefab(this, 1134, 991);
		this.add.existing(mineTorchPrefab_4);

		// mineWatchTowerPrefab
		const mineWatchTowerPrefab = new MineWatchTowerPrefab(this, 1002, 940);
		this.add.existing(mineWatchTowerPrefab);

		// rockMonster
		const rockMonster = new RockMonster(this, 1110, 480);
		this.add.existing(rockMonster);

		this.bg_1 = bg_1;
		this.cliffs_1 = cliffs_1;
		this.mine_entrance_1 = mine_entrance_1;
		this.rocks_1 = rocks_1;
		this.hole_Bridge_Hole_1 = hole_Bridge_Hole_1;
		this.hole_Bridge_Brigde_1 = hole_Bridge_Brigde_1;
		this.hole_Bridge_Bridge = hole_Bridge_Bridge;
		this.hole_Bridge_Bridge_1 = hole_Bridge_Bridge_1;
		this.tree_1 = tree_1;
		this.guard_post_Post_1 = guard_post_Post_1;
		this.guard_post_Post_L = guard_post_Post_L;
		this.decoration_1 = decoration_1;
		this.playerPrefab = playerPrefab;
		this.mineHousePrefab = mineHousePrefab;
		this.mineTorchPrefab = mineTorchPrefab;
		this.mineTorchPrefab_1 = mineTorchPrefab_1;
		this.mineTorchPrefab_2 = mineTorchPrefab_2;
		this.mineTorchPrefab_3 = mineTorchPrefab_3;
		this.mineWatchTowerPrefab = mineWatchTowerPrefab;
		this.rockMonster = rockMonster;
		this.shapetownMineEntrance = shapetownMineEntrance;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	bg_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	cliffs_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	mine_entrance_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	rocks_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	hole_Bridge_Hole_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	hole_Bridge_Brigde_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	hole_Bridge_Bridge;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	hole_Bridge_Bridge_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	guard_post_Post_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	guard_post_Post_L;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	decoration_1;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {MineHousePrefab} */
	mineHousePrefab;
	/** @type {MineTorchPrefab} */
	mineTorchPrefab;
	/** @type {MineTorchPrefab} */
	mineTorchPrefab_1;
	/** @type {MineTorchPrefab} */
	mineTorchPrefab_2;
	/** @type {MineTorchPrefab} */
	mineTorchPrefab_3;
	/** @type {MineWatchTowerPrefab} */
	mineWatchTowerPrefab;
	/** @type {RockMonster} */
	rockMonster;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownMineEntrance;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.cameras.main.setBounds(0, 0, 2240, 1440);
        this.physics.world.bounds.width = 1000;
        this.physics.world.bounds.height = 800;

		this.editorCreate();

		this.mineHousePrefab.setupCollision(this.playerPrefab)
		this.mineWatchTowerPrefab.setupCollision(this.playerPrefab)

		this.physics.add.collider(this.playerPrefab, this.cliffs_1);
	    this.cliffs_1.setCollisionBetween(0,10000);
	    // this.cliffs_1.renderDebug(this.add.graphics());
		this.physics.add.collider(this.playerPrefab, this.guard_post_Post_1);
	    this.guard_post_Post_1.setCollisionBetween(0,10000);
	    // this.guard_post_Post_1.renderDebug(this.add.graphics());
		this.physics.add.collider(this.playerPrefab, this.guard_post_Post_L);
	    this.guard_post_Post_L.setCollisionBetween(0,10000);
	    // this.guard_post_Post_L.renderDebug(this.add.graphics());
		this.physics.add.collider(this.playerPrefab, this.mine_entrance_1);
	    this.mine_entrance_1.setCollisionBetween(0,10000);
	    // this.mine_entrance_1.renderDebug(this.add.graphics());

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
