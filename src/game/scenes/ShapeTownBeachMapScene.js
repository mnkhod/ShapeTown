
// You can write more code here

/* START OF COMPILED CODE */

import BeachHousePrefab from "../prefabs/House/BeachHousePrefab";
import BeachTree1Prefab from "../prefabs/Trees/BeachTree1Prefab";
import BeachTree2Prefab from "../prefabs/Trees/BeachTree2Prefab";
import BeachTree3Prefab from "../prefabs/Trees/BeachTree3Prefab";
import PlayerPrefab from "../prefabs/PlayerPrefab";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ShapeTownBeachMapScene extends Phaser.Scene {

	constructor() {
		super("ShapeTownBeachMapScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// shapetownBeach
		const shapetownBeach = this.add.tilemap("ShapetownBeach");
		shapetownBeach.addTilesetImage("BeachWaterSheet_v01", "BeachWaterSheet_v01");
		shapetownBeach.addTilesetImage("BeachDeckSheet", "BeachDeckSheet");
		shapetownBeach.addTilesetImage("Lighthouse_v01", "Lighthouse_v01");
		shapetownBeach.addTilesetImage("ShipStranded_01", "ShipStranded_01");
		shapetownBeach.addTilesetImage("BoatStranded", "BoatStranded");
		shapetownBeach.addTilesetImage("PalmTreePattern", "PalmTreePattern");
		shapetownBeach.addTilesetImage("TreePalmSheet_01", "TreePalmSheet_01");
		shapetownBeach.addTilesetImage("TreePalmSheet_03", "TreePalmSheet_03");
		shapetownBeach.addTilesetImage("TreePalmSheet_02", "TreePalmSheet_02");
		shapetownBeach.addTilesetImage("CapitansCabin", "CapitansCabin");
		shapetownBeach.addTilesetImage("RockOnSand_V01", "RockOnSand_V01");
		shapetownBeach.addTilesetImage("ShellBeach_V01", "ShellBeach_V01");

		// sand_1
		const sand_1 = shapetownBeach.createLayer("Sand", ["BeachWaterSheet_v01"], 0, 0);

		// ship_stranded_1
		const ship_stranded_1 = shapetownBeach.createLayer("ship stranded", ["ShipStranded_01"], 0, 0);

		// boat_stranded_1
		const boat_stranded_1 = shapetownBeach.createLayer("boat stranded", ["BoatStranded"], 0, 0);

		// grass_1
		const grass_1 = shapetownBeach.createLayer("grass", ["BeachDeckSheet"], 0, 0);

		// cabin_1
		const cabin_1 = shapetownBeach.createLayer("Cabin", [], 0, 0);

		// tree_1
		const tree_1 = shapetownBeach.createLayer("tree", ["PalmTreePattern"], 0, 0);

		// stonesoad_1
		const stonesoad_1 = shapetownBeach.createLayer("stonesoad", ["BeachDeckSheet"], 0, 0);

		// deck_1
		const deck_1 = shapetownBeach.createLayer("deck", ["BeachDeckSheet","CapitansCabin"], 0, 0);

		// rock_decor_1
		const rock_decor_1 = shapetownBeach.createLayer("Rock decor", ["RockOnSand_V01"], 0, 0);

		// shell_Decor_1
		const shell_Decor_1 = shapetownBeach.createLayer("Shell Decor", ["ShellBeach_V01"], 0, 0);

		// blocker
		const blocker = shapetownBeach.createLayer("blocker1", ["RockOnSand_V01"], 0, 0);

		// blocker_1
		const blocker_1 = shapetownBeach.createLayer("blocker2", ["RockOnSand_V01"], 0, 0);

		// blocker_2
		const blocker_2 = shapetownBeach.createLayer("blocker3", ["RockOnSand_V01"], 0, 0);

		// blocker_3
		const blocker_3 = shapetownBeach.createLayer("blocker4", ["RockOnSand_V01"], 0, 0);

		// ligthhouse_1
		const ligthhouse_1 = shapetownBeach.createLayer("ligthhouse", ["Lighthouse_v01"], 0, 0);

		// beachHousePrefab
		const beachHousePrefab = new BeachHousePrefab(this, 1415, 435);
		this.add.existing(beachHousePrefab);

		// beachTree1Prefab
		const beachTree1Prefab = new BeachTree1Prefab(this, 1182, 350);
		this.add.existing(beachTree1Prefab);

		// beachTree2Prefab
		const beachTree2Prefab = new BeachTree2Prefab(this, 1135, 620);
		this.add.existing(beachTree2Prefab);

		// beachTree3Prefab
		const beachTree3Prefab = new BeachTree3Prefab(this, 1665, 416);
		this.add.existing(beachTree3Prefab);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 1257, 679);
		this.add.existing(playerPrefab);

		this.sand_1 = sand_1;
		this.ship_stranded_1 = ship_stranded_1;
		this.boat_stranded_1 = boat_stranded_1;
		this.grass_1 = grass_1;
		this.cabin_1 = cabin_1;
		this.tree_1 = tree_1;
		this.stonesoad_1 = stonesoad_1;
		this.deck_1 = deck_1;
		this.rock_decor_1 = rock_decor_1;
		this.shell_Decor_1 = shell_Decor_1;
		this.blocker = blocker;
		this.blocker_1 = blocker_1;
		this.blocker_2 = blocker_2;
		this.blocker_3 = blocker_3;
		this.ligthhouse_1 = ligthhouse_1;
		this.beachHousePrefab = beachHousePrefab;
		this.beachTree1Prefab = beachTree1Prefab;
		this.beachTree2Prefab = beachTree2Prefab;
		this.beachTree3Prefab = beachTree3Prefab;
		this.playerPrefab = playerPrefab;
		this.shapetownBeach = shapetownBeach;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	sand_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	ship_stranded_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	boat_stranded_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	cabin_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	stonesoad_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	deck_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	rock_decor_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	shell_Decor_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	blocker;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	blocker_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	blocker_2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	blocker_3;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	ligthhouse_1;
	/** @type {BeachHousePrefab} */
	beachHousePrefab;
	/** @type {BeachTree1Prefab} */
	beachTree1Prefab;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab;
	/** @type {BeachTree3Prefab} */
	beachTree3Prefab;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownBeach;

	/* START-USER-CODE */

	// Write your code here

	

	create() {

	const TILE_IDS = {
    BeachWaterCenter: 13
    };

	this.anims.create({
    key: 'harvest_ground',
    frames: this.anims.generateFrameNumbers('BeachWaterCenter', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
    });

		this.editorCreate();

		this.beachHousePrefab.setupCollision(this.playerPrefab)
		this.beachTree1Prefab.setupCollision(this.playerPrefab)
		this.beachTree2Prefab.setupCollision(this.playerPrefab)
		this.beachTree3Prefab.setupCollision(this.playerPrefab)

		this.cameras.main.setBounds(0, 0, 2560, 1650);
        this.physics.world.bounds.width = 1000;
        this.physics.world.bounds.height = 800;

	    // this.shapeFarmingHousePrefab.setupCollision(this.playerPrefab)

	    this.physics.add.collider(this.playerPrefab, this.tree_1);
	    this.tree_1.setCollisionBetween(0,1592);
	    // this.tree_1.renderDebug(this.add.graphics());

		 this.physics.add.collider(this.playerPrefab, this.sand_1);
	    this.sand_1.setCollisionBetween(0,13);
	    // this.sand_1.renderDebug(this.add.graphics());



	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
