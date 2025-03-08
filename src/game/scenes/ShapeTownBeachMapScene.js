// You can write more code here

/* START OF COMPILED CODE */

import BeachDeckPrefab from "../prefabs/deck/BeachDeckPrefab";
import BeachHousePrefab from "../prefabs/House/BeachHousePrefab";
import PlayerPrefab from "../prefabs/PlayerPrefab";
import SeaLevelBuildingLighthousePrefab from "../prefabs/House/SeaLevelBuildingLighthousePrefab";
import BeachTree1Prefab from "../prefabs/Trees/BeachTree1Prefab";
import BeachTree3Prefab from "../prefabs/Trees/BeachTree3Prefab";
import BeachTree2Prefab from "../prefabs/Trees/BeachTree2Prefab";
import SquareShipPrefab from "../prefabs/House/SquareShipPrefab";
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

		// beachDeckPrefab
		const beachDeckPrefab = new BeachDeckPrefab(this, 1508, 952);
		this.add.existing(beachDeckPrefab);

		// boat_stranded_1
		const boat_stranded_1 = shapetownBeach.createLayer("boat stranded", ["BoatStranded"], 0, 0);

		// cabin_1
		const cabin_1 = shapetownBeach.createLayer("Cabin", [], 0, 0);

		// grass_1
		const grass_1 = shapetownBeach.createLayer("grass", ["BeachDeckSheet"], 0, 0);

		// tree_1
		const tree_1 = shapetownBeach.createLayer("tree", ["PalmTreePattern"], 0, 0);

		// stonesoad_1
		const stonesoad_1 = shapetownBeach.createLayer("stonesoad", ["BeachDeckSheet"], 0, 0);

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

		// beachHousePrefab
		const beachHousePrefab = new BeachHousePrefab(this, 1415, 435);
		this.add.existing(beachHousePrefab);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 1500, 229);
		this.add.existing(playerPrefab);

		// seaLevelBuildingLighthousePrefab
		const seaLevelBuildingLighthousePrefab = new SeaLevelBuildingLighthousePrefab(this, 800, 1130);
		this.add.existing(seaLevelBuildingLighthousePrefab);

		// beachTree1Prefab_1
		const beachTree1Prefab_1 = new BeachTree1Prefab(this, 636, 138);
		this.add.existing(beachTree1Prefab_1);

		// beachTree1Prefab_2
		const beachTree1Prefab_2 = new BeachTree1Prefab(this, 1049, 123);
		this.add.existing(beachTree1Prefab_2);

		// beachTree1Prefab_3
		const beachTree1Prefab_3 = new BeachTree1Prefab(this, 2044, 116);
		this.add.existing(beachTree1Prefab_3);

		// beachTree3Prefab_1
		const beachTree3Prefab_1 = new BeachTree3Prefab(this, 1874, 155);
		this.add.existing(beachTree3Prefab_1);

		// beachTree3Prefab_2
		const beachTree3Prefab_2 = new BeachTree3Prefab(this, 2184, 144);
		this.add.existing(beachTree3Prefab_2);

		// beachTree3Prefab_3
		const beachTree3Prefab_3 = new BeachTree3Prefab(this, 1399, 165);
		this.add.existing(beachTree3Prefab_3);

		// beachTree2Prefab_1
		const beachTree2Prefab_1 = new BeachTree2Prefab(this, 423, 110);
		this.add.existing(beachTree2Prefab_1);

		// beachTree2Prefab_2
		const beachTree2Prefab_2 = new BeachTree2Prefab(this, 502, 180);
		this.add.existing(beachTree2Prefab_2);

		// beachTree2Prefab_3
		const beachTree2Prefab_3 = new BeachTree2Prefab(this, 706, 131);
		this.add.existing(beachTree2Prefab_3);

		// beachTree2Prefab_4
		const beachTree2Prefab_4 = new BeachTree2Prefab(this, 1208, 150);
		this.add.existing(beachTree2Prefab_4);

		// beachTree2Prefab_5
		const beachTree2Prefab_5 = new BeachTree2Prefab(this, 922, 161);
		this.add.existing(beachTree2Prefab_5);

		// beachTree2Prefab_6
		const beachTree2Prefab_6 = new BeachTree2Prefab(this, 774, 158);
		this.add.existing(beachTree2Prefab_6);

		// beachTree1Prefab_4
		const beachTree1Prefab_4 = new BeachTree1Prefab(this, 851, 176);
		this.add.existing(beachTree1Prefab_4);

		// squareShipPrefab
		const squareShipPrefab = new SquareShipPrefab(this, 300, 389);
		this.add.existing(squareShipPrefab);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(1600, 20, "Fruitbushes_V01", 23);
		sceneTile.scaleX = 10.306994636480235;
		sceneTile.scaleY = 1;
		this.physics.add.existing(sceneTile, false);
		sceneTile.body.allowGravity = false;
		sceneTile.body.setSize(32, 200, false);

		this.sand_1 = sand_1;
		this.beachDeckPrefab = beachDeckPrefab;
		this.boat_stranded_1 = boat_stranded_1;
		this.cabin_1 = cabin_1;
		this.grass_1 = grass_1;
		this.tree_1 = tree_1;
		this.stonesoad_1 = stonesoad_1;
		this.rock_decor_1 = rock_decor_1;
		this.shell_Decor_1 = shell_Decor_1;
		this.blocker = blocker;
		this.blocker_1 = blocker_1;
		this.blocker_2 = blocker_2;
		this.blocker_3 = blocker_3;
		this.beachHousePrefab = beachHousePrefab;
		this.playerPrefab = playerPrefab;
		this.seaLevelBuildingLighthousePrefab = seaLevelBuildingLighthousePrefab;
		this.beachTree1Prefab_1 = beachTree1Prefab_1;
		this.beachTree1Prefab_2 = beachTree1Prefab_2;
		this.beachTree1Prefab_3 = beachTree1Prefab_3;
		this.beachTree3Prefab_1 = beachTree3Prefab_1;
		this.beachTree3Prefab_2 = beachTree3Prefab_2;
		this.beachTree3Prefab_3 = beachTree3Prefab_3;
		this.beachTree2Prefab_1 = beachTree2Prefab_1;
		this.beachTree2Prefab_2 = beachTree2Prefab_2;
		this.beachTree2Prefab_3 = beachTree2Prefab_3;
		this.beachTree2Prefab_4 = beachTree2Prefab_4;
		this.beachTree2Prefab_5 = beachTree2Prefab_5;
		this.beachTree2Prefab_6 = beachTree2Prefab_6;
		this.beachTree1Prefab_4 = beachTree1Prefab_4;
		this.squareShipPrefab = squareShipPrefab;
		this.sceneTile = sceneTile;
		this.shapetownBeach = shapetownBeach;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	sand_1;
	/** @type {BeachDeckPrefab} */
	beachDeckPrefab;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	boat_stranded_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	cabin_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	grass_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	tree_1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	stonesoad_1;
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
	/** @type {BeachHousePrefab} */
	beachHousePrefab;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {SeaLevelBuildingLighthousePrefab} */
	seaLevelBuildingLighthousePrefab;
	/** @type {BeachTree1Prefab} */
	beachTree1Prefab_1;
	/** @type {BeachTree1Prefab} */
	beachTree1Prefab_2;
	/** @type {BeachTree1Prefab} */
	beachTree1Prefab_3;
	/** @type {BeachTree3Prefab} */
	beachTree3Prefab_1;
	/** @type {BeachTree3Prefab} */
	beachTree3Prefab_2;
	/** @type {BeachTree3Prefab} */
	beachTree3Prefab_3;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab_1;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab_2;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab_3;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab_4;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab_5;
	/** @type {BeachTree2Prefab} */
	beachTree2Prefab_6;
	/** @type {BeachTree1Prefab} */
	beachTree1Prefab_4;
	/** @type {SquareShipPrefab} */
	squareShipPrefab;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	sceneTile;
	/** @type {Phaser.Tilemaps.Tilemap} */
	shapetownBeach;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.beachTree1Prefab_1.setupCollision(this.playerPrefab)
		this.beachTree1Prefab_2.setupCollision(this.playerPrefab)
		this.beachTree1Prefab_3.setupCollision(this.playerPrefab)
		this.beachTree1Prefab_4.setupCollision(this.playerPrefab)
		this.beachTree2Prefab_1.setupCollision(this.playerPrefab)
		this.beachTree2Prefab_2.setupCollision(this.playerPrefab)
		this.beachTree2Prefab_3.setupCollision(this.playerPrefab)
		this.beachTree2Prefab_4.setupCollision(this.playerPrefab)
		this.beachTree2Prefab_5.setupCollision(this.playerPrefab)
		this.beachTree2Prefab_6.setupCollision(this.playerPrefab)
		this.beachTree3Prefab_2.setupCollision(this.playerPrefab)
		this.beachTree3Prefab_1.setupCollision(this.playerPrefab)
		this.beachTree3Prefab_3.setupCollision(this.playerPrefab)    
		this.beachHousePrefab.setupCollision(this.playerPrefab)
		this.squareShipPrefab.setupCollision(this.playerPrefab)

		this.seaLevelBuildingLighthousePrefab.setupCollision(this.playerPrefab)
		this.cameras.main.setBounds(0, 0, 2560, 1650);
        this.physics.world.bounds.width = 1000;
        this.physics.world.bounds.height = 800;
		this.beachDeckPrefab.setDepth(1)
		this.seaLevelBuildingLighthousePrefab.setDepth(2)

		const waterTiles = this.sand_1.getTilesWithin();
        waterTiles.forEach(tile => {
        if (tile && tile.index === 13) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWaterCenter');
        }
		if (tile && tile.index === 140) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_1');
        }
		if ([137, 172].includes(tile.index)) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_2');
        }
		if (tile && tile.index === 138) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_3');
        }
		if (tile && tile.index === 173) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_4');
        }
		if ([141, 174].includes(tile.index)) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_5');
        }
		if (tile && tile.index === 107) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_6');
        }
		if (tile && tile.index === 37) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_7');
        }
		if (tile && tile.index === 103) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_8');
        }
		if (tile && tile.index === 69) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_9');
        }
		if (tile && tile.index === 38) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_10');
        }
		if (tile && tile.index === 70) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_13');
        }
		if (tile && tile.index === 72) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_12');
        }
		if (tile && tile.index === 73) {
        const sprite = this.add.sprite(tile.pixelX + tile.width/2, tile.pixelY + tile.height/2, 'BeachWaterSheet_v01');
        sprite.play('BeachWater_15');
        }
        });

		this.physics.add.collider(this.playerPrefab, this.blocker);
        this.blocker.setCollisionBetween(0, 10000);

        this.physics.add.collider(this.playerPrefab, this.blocker_1);
        this.blocker_1.setCollisionBetween(0, 10000);

        this.physics.add.collider(this.playerPrefab, this.blocker_2);
        this.blocker_2.setCollisionBetween(0, 10000);

        this.physics.add.collider(this.playerPrefab, this.blocker_3);
        this.blocker_3.setCollisionBetween(0, 10000);

	    this.physics.add.collider(this.playerPrefab, this.tree_1);
	    this.tree_1.setCollisionBetween(0,1592);
	    // this.tree_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.sand_1);
	    this.sand_1.setCollision([172, 173, 137, 174, 141, 107]);
	    // this.sand_1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.sand_1);
	    this.sand_1.setCollision(13);
		//  this.sand_1.renderDebug(this.add.graphics())

		this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
		    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
			}

		    this.scene.switch("ShapeTownSquareMapScene");
		    this.playerPrefab.y += 30;
		    this.cameras.main.fadeIn(2000, 0, 0, 0);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here