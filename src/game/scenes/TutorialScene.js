// You can write more code here

/* START OF COMPILED CODE */

import HarvestPrefab from "../prefabs/objects/HarvestPrefab";
import OldManJackNpcPrefab from "../prefabs/npcs/OldManJackNpcPrefab";
import PlayerPrefab from "../prefabs/PlayerPrefab";
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
import AppleTreePrefab from "../prefabs/Trees/AppleTreePrefab";
import PineTreePrefab from "../prefabs/Trees/PineTreePrefab";
import MapleTreePrefab from "../prefabs/Trees/MapleTreePrefab";
import TutorealHousePrefab from "../prefabs/House/TutorealHousePrefab";
import DeadTree2 from "../prefabs/Trees/DeadTree2";
import FishingComponentPrefab from "../prefabs/hud/FishingComponentPrefab";
import ProfilePrefab from "../prefabs/hud/ProfilePrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
import OpenInventory from "../prefabs/hud/OpenInventory";
/* START-USER-IMPORTS */
import { checkFirstHarvestAchievement,checkGiftFromNatureAchievement,checkFirstFishAchievement } from "../utility";
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

export default class TutorialScene extends Phaser.Scene {

	constructor() {
		super("TutorialScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.reactEvent = EventBus
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// TutorialMap
		const tutorialMap = this.add.tilemap("TutorialMap");
		tutorialMap.addTilesetImage("GroundTileset", "GroundTileset");
		tutorialMap.addTilesetImage("RoadStone", "RoadStone");
		tutorialMap.addTilesetImage("TreePatteren", "TreePatteren");
		tutorialMap.addTilesetImage("GroundTilestSoil", "GroundTilestSoil");
		tutorialMap.addTilesetImage("GroundAccessor", "GroundAccessor");
		tutorialMap.addTilesetImage("LakeAccessor", "LakeAccessor");
		tutorialMap.addTilesetImage("Fishes_1_32x32gif", "Fishes_1_32x32gif");
		tutorialMap.addTilesetImage("Fishes_2_32x32", "Fishes_2_32x32");
		tutorialMap.addTilesetImage("Fishes_3_32x32", "Fishes_3_32x32");
		tutorialMap.addTilesetImage("LakeFloatingRock_V02", "LakeFloatingRock_V02");
		tutorialMap.addTilesetImage("LakeFloatingRock_V01", "LakeFloatingRock_V01");
		tutorialMap.addTilesetImage("TutorliarNPCHouse", "TutorliarNPCHouse");
		tutorialMap.addTilesetImage("Apple", "Apple");
		tutorialMap.addTilesetImage("Tree_v014", "Tree_v014");
		tutorialMap.addTilesetImage("Tree_v02", "Tree_v02");
		tutorialMap.addTilesetImage("Tree_v04", "Tree_v");
		tutorialMap.addTilesetImage("Tree_v08", "Tree_v08");
		tutorialMap.addTilesetImage("Tree_v09", "Tree_v09");
		tutorialMap.addTilesetImage("FarmingCropsVer2", "FarmingCropsVer2");
		tutorialMap.addTilesetImage("NPCOldManJack X2", "NPCOldManJack");
		tutorialMap.addTilesetImage("LakeBorderCornerAni", "LakeBorderCornerAni");
		tutorialMap.addTilesetImage("LakeBorderAni", "LakeBorderAni");

		// map_environment_Background_Just_Render__1
		tutorialMap.createLayer("Map environment/Background[Just Render]", ["GroundTileset"], -768, -416);

		// map_environment_Ground_just_render__1
		const map_environment_Ground_just_render__1 = tutorialMap.createLayer("Map environment/Ground[just render]", ["RoadStone"], -767, -416);

		// map_environment_Road_Just_render__1
		tutorialMap.createLayer("Map environment/Road[Just render]", ["RoadStone"], -768, -416);

		// layerFence
		const layerFence = tutorialMap.createLayer("Map environment/Fence[Make it collision]", ["RoadStone"], -768, -416);

		// farmingAreaFarmingTile
		const farmingAreaFarmingTile = tutorialMap.createLayer("Farming Area/FarmingTile[Use SEED to grow crops]", ["RoadStone"], -768, -416);

		// layerFishingPondBorder
		const layerFishingPondBorder = tutorialMap.createLayer("FishingPond/FishingPondBOrder[Make it Collision]", ["LakeBorderAni","LakeBorderCornerAni","GroundTileset"], -768, -416);

		// fishingPond_FishingPondWater_Anywhere_can_be_fishing_action_start__1
		tutorialMap.createLayer("FishingPond/FishingPondWater[Anywhere can be fishing action start]", ["GroundTileset","LakeAccessor","Fishes_3_32x32"], -768, -416);

		// fishingPond_FishingPondAccessor__just_render__1
		tutorialMap.createLayer("FishingPond/FishingPondAccessor[]just render]", ["LakeAccessor","LakeFloatingRock_V02","LakeFloatingRock_V01"], -768, -416);

		// layerTreeBorder1
		const layerTreeBorder1 = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder", ["TreePatteren"], -768, -416);

		// layerTreeBorder
		const layerTreeBorder = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder1", ["TreePatteren"], -768, -416);

		// layerTreeBorder2
		const layerTreeBorder2 = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder2", ["TreePatteren"], -768, -416);

		// layerHouseGround
		const layerHouseGround = tutorialMap.createLayer("House/HouseGround", ["GroundTileset"], -768, -416);

		// layerPine
		const layerPine = tutorialMap.createLayer("Tree/PineTree", ["Apple"], -768, -416);

		// farming_Area_Crops_Make_it_Collision_popup_to_not_able_to_HARVET__1
		const farming_Area_Crops_Make_it_Collision_popup_to_not_able_to_HARVET__1 = tutorialMap.createLayer("Farming Area/Crops[Make it Collision/popup to not able to HARVET]", ["FarmingCropsVer2"], -768, -416);

		// farming_Area_DeadCrops_Make_it_Collision_Can_be_HARVEST_but_noting_drops__1
		const farming_Area_DeadCrops_Make_it_Collision_Can_be_HARVEST_but_noting_drops__1 = tutorialMap.createLayer("Farming Area/DeadCrops[Make it Collision/Can be HARVEST but noting drops]", ["FarmingCropsVer2"], -768, -416);

		// mapLayers
		this.add.container(0, 0);

		// sceneTile
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
		const sceneTile = this.add.sprite(1259, 382, "Fruitbushes_V01", 23);
		sceneTile.scaleX = 1.3069946364802347;
		sceneTile.scaleY = 10.586085054631967;
		this.physics.add.existing(sceneTile, false);
		sceneTile.body.allowGravity = false;
		sceneTile.body.setSize(32, 200, false);

		// harvestPrefab
		const harvestPrefab = new HarvestPrefab(this, 207, 592);
		this.add.existing(harvestPrefab);

		// harvestPrefab_1
		const harvestPrefab_1 = new HarvestPrefab(this, 239, 592);
		this.add.existing(harvestPrefab_1);

		// harvestPrefab_2
		const harvestPrefab_2 = new HarvestPrefab(this, 271, 592);
		this.add.existing(harvestPrefab_2);

		// harvestPrefab_3
		const harvestPrefab_3 = new HarvestPrefab(this, 303, 592);
		this.add.existing(harvestPrefab_3);

		// oldManJackNpcPrefab
		const oldManJackNpcPrefab = new OldManJackNpcPrefab(this, 375, 234);
		this.add.existing(oldManJackNpcPrefab);

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 353, 288);
		this.add.existing(playerPrefab);

		// questBookPrefab
		const questBookPrefab = new QuestBookPrefab(this, 32, 736);
		this.add.existing(questBookPrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 0.706304947792546, 0.8045771466410088);
		this.add.existing(messagePrefab);

		// alertPrefab
		const alertPrefab = new AlertPrefab(this, 721.70328457044, 0.0215605880291605);
		this.add.existing(alertPrefab);

		// harvestPrefab_4
		const harvestPrefab_4 = new HarvestPrefab(this, 207, 560);
		this.add.existing(harvestPrefab_4);

		// harvestPrefab_5
		const harvestPrefab_5 = new HarvestPrefab(this, 239, 560);
		this.add.existing(harvestPrefab_5);

		// harvestPrefab_6
		const harvestPrefab_6 = new HarvestPrefab(this, 271, 560);
		this.add.existing(harvestPrefab_6);

		// harvestPrefab_7
		const harvestPrefab_7 = new HarvestPrefab(this, 303, 560);
		this.add.existing(harvestPrefab_7);

		// appleTreePrefab
		const appleTreePrefab = new AppleTreePrefab(this, 496, 156);
		this.add.existing(appleTreePrefab);

		// pineTreePrefab
		const pineTreePrefab = new PineTreePrefab(this, 620, 342);
		this.add.existing(pineTreePrefab);

		// mapleTreePrefab
		const mapleTreePrefab = new MapleTreePrefab(this, 162, 325);
		this.add.existing(mapleTreePrefab);

		// tutorealHousePrefab
		const tutorealHousePrefab = new TutorealHousePrefab(this, 256, 90);
		this.add.existing(tutorealHousePrefab);

		// deadTree2
		const deadTree2 = new DeadTree2(this, 540, 473);
		this.add.existing(deadTree2);

		// fishingArea
		const fishingArea = this.add.sprite(852, 714, "LakeAccessor", 0);

		// fishingComponentPrefab
		const fishingComponentPrefab = new FishingComponentPrefab(this, 64, 640);
		this.add.existing(fishingComponentPrefab);

		// profilePrefab
		const profilePrefab = new ProfilePrefab(this, 56.5, 23);
		this.add.existing(profilePrefab);

		// newItemHudPrefab
		const newItemHudPrefab = new NewItemHudPrefab(this, 0, 0);
		this.add.existing(newItemHudPrefab);
		newItemHudPrefab.scaleX = 0.5;
		newItemHudPrefab.scaleY = 0.5;

		// openInventory
		const openInventory = new OpenInventory(this, 267, 478);
		this.add.existing(openInventory);
		openInventory.scaleX = 0.5;
		openInventory.scaleY = 0.5;

		// oldManJackNpcPrefab (prefab fields)
		oldManJackNpcPrefab.player = playerPrefab;
		oldManJackNpcPrefab.msgPrefab = messagePrefab;
		oldManJackNpcPrefab.itemHud = newItemHudPrefab;
		oldManJackNpcPrefab.bookHud = questBookPrefab;

		this.map_environment_Ground_just_render__1 = map_environment_Ground_just_render__1;
		this.layerFence = layerFence;
		this.farmingAreaFarmingTile = farmingAreaFarmingTile;
		this.layerFishingPondBorder = layerFishingPondBorder;
		this.layerTreeBorder1 = layerTreeBorder1;
		this.layerTreeBorder = layerTreeBorder;
		this.layerTreeBorder2 = layerTreeBorder2;
		this.layerHouseGround = layerHouseGround;
		this.layerPine = layerPine;
		this.farming_Area_Crops_Make_it_Collision_popup_to_not_able_to_HARVET__1 = farming_Area_Crops_Make_it_Collision_popup_to_not_able_to_HARVET__1;
		this.farming_Area_DeadCrops_Make_it_Collision_Can_be_HARVEST_but_noting_drops__1 = farming_Area_DeadCrops_Make_it_Collision_Can_be_HARVEST_but_noting_drops__1;
		this.sceneTile = sceneTile;
		this.playerPrefab = playerPrefab;
		this.questBookPrefab = questBookPrefab;
		this.messagePrefab = messagePrefab;
		this.alertPrefab = alertPrefab;
		this.appleTreePrefab = appleTreePrefab;
		this.pineTreePrefab = pineTreePrefab;
		this.mapleTreePrefab = mapleTreePrefab;
		this.tutorealHousePrefab = tutorealHousePrefab;
		this.deadTree2 = deadTree2;
		this.fishingArea = fishingArea;
		this.fishingComponentPrefab = fishingComponentPrefab;
		this.profilePrefab = profilePrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.openInventory = openInventory;
		this.tutorialMap = tutorialMap;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	map_environment_Ground_just_render__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerFence;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	farmingAreaFarmingTile;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerFishingPondBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerTreeBorder1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerTreeBorder;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerTreeBorder2;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerHouseGround;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layerPine;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	farming_Area_Crops_Make_it_Collision_popup_to_not_able_to_HARVET__1;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	farming_Area_DeadCrops_Make_it_Collision_Can_be_HARVEST_but_noting_drops__1;
	/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body }} */
	sceneTile;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {QuestBookPrefab} */
	questBookPrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {AlertPrefab} */
	alertPrefab;
	/** @type {AppleTreePrefab} */
	appleTreePrefab;
	/** @type {PineTreePrefab} */
	pineTreePrefab;
	/** @type {MapleTreePrefab} */
	mapleTreePrefab;
	/** @type {TutorealHousePrefab} */
	tutorealHousePrefab;
	/** @type {DeadTree2} */
	deadTree2;
	/** @type {Phaser.GameObjects.Sprite} */
	fishingArea;
	/** @type {FishingComponentPrefab} */
	fishingComponentPrefab;
	/** @type {ProfilePrefab} */
	profilePrefab;
	/** @type {NewItemHudPrefab} */
	newItemHudPrefab;
	/** @type {OpenInventory} */
	openInventory;
	/** @type {Phaser.Tilemaps.Tilemap} */
	tutorialMap;

	/* START-USER-CODE */

	// Write your code here
	achievements = {};


	create() {
		this.editorCreate();


		this.fishingArea.setInteractive({ useHandCursor: true });
		this.fishingArea.on('pointerdown', function (_pointer) {
			this.fishingComponentPrefab.play(() => {
				this.newItemHudPrefab.addItem("FISH","FishIcon",0,1,true)
			})
		},this)

		this.questBookPrefab.setDepth(100)
    	this.messagePrefab.setDepth(100)
    	this.alertPrefab.setDepth(100)
    	this.profilePrefab.setDepth(100)
		this.newItemHudPrefab.setDepth(100)
		this.openInventory.setDepth(100)

		this.profilePrefab.visible = true;
		this.appleTreePrefab.setupCollision(this.playerPrefab)
		this.pineTreePrefab.setupCollision(this.playerPrefab)
		this.mapleTreePrefab.setupCollision(this.playerPrefab)
		this.tutorealHousePrefab.setupCollision(this.playerPrefab)

		this.physics.add.collider(this.playerPrefab, this.layerTreeBorder);
		this.layerTreeBorder.setCollisionBetween(0,10000);
		// this.layerTreeBorder.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerTreeBorder1);
		this.layerTreeBorder1.setCollisionBetween(0,10000);
		// this.layerTreeBorder1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerTreeBorder2);
		this.layerTreeBorder2.setCollisionBetween(0,10000);
		// this.layerTreeBorder2.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerPine);
		this.layerPine.setCollision(1955);
		// this.layerPine.renderDebug(this.add.graphics());


		// this.physics.add.collider(this.playerPrefab, this.layerHouse1);
		// this.layerHouse1.setCollisionBetween(0,10000);
		// this.layerHouse1.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerHouseGround);
		this.layerHouseGround.setCollisionBetween(0,10000);
		// this.layerHouseGround.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFishingPondAccessor);
		// this.layerFishingPondAccessor.setCollisionBetween(0,10000);
		// this.layerFishingPondAccessor.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFishingPondWaterForFishing);
		// this.layerFishingPondWaterForFishing.setCollisionBetween(0,10000);
		// this.layerFishingPondWaterForFishing.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFishingPondBorder);
		this.layerFishingPondBorder.setCollisionBetween(0,10000);
		// this.layerFishingPondBorder.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.layerFence);
		this.layerFence.setCollisionBetween(0,10000);
		// this.layerFence.renderDebug(this.add.graphics());

		this.physics.add.collider(this.playerPrefab, this.farmingAreaFarmingTile);
		// this.farmingAreaFarmingTile.setCollisionBetween(0,10000);
		// this.farmingAreaFarmingTile.renderDebug(this.add.graphics());

		this.physics.add.overlap(this.sceneTile, this.playerPrefab, () => {
            this.scene.switch("FarmingScene");
			this.playerPrefab.x -= 50
        	this.cameras.main.fadeIn(2000, 0, 0, 0);
        });
		if (this.questBookPrefab) {
            this.questBookPrefab.visible = false;
        }
        if (this.newItemHudPrefab) {
            this.newItemHudPrefab.visible = false;
        }
        if (this.profilePrefab) {
            this.profilePrefab.visible = false;
        }

		// this.time.delayedCall(100, () => {
		// 	this.questBookPrefab.visible = true
		// 	this.newItemHudPrefab.visible = true;
		// 	this.profilePrefab.visible = true;

		// 	this.newItemHudPrefab.addItem("WATERING_CAN","IconBaseTools",0)
		// 	this.newItemHudPrefab.addItem("HOE","IconBaseTools",1)
		// 	this.newItemHudPrefab.addItem("PICK_AXE","IconBaseTools",2)
		// 	this.newItemHudPrefab.addItem("CARROT_SEED","SeedBag",0,5)
		// 	// this.newItemHudPrefab.addItem("CARROT","FarmingCropsVer2",6,1)

		// 	this.newItemHudPrefab.addItem("FISH","FishIcon",0,1,true)
		// }, {}, this)

		// this.reactEvent.on('blockchain-account', (address) => {
        //     console.log(address);
        // });

        let bounds = this.fishingArea.getBounds()
        let newX = bounds.x + bounds.width
        let newY = bounds.y - 10
		let questMark = this.add.sprite(0, -40, "NPCDialoguePopUpMainQuestSheet", 7);
    	questMark.setScale(1.5);
    	this.questMark = questMark;
        this.questMark.setPosition(newX,newY)
        this.physics.add.existing(this.questMark, false);

		this.setupSceneAchievementNftsData()
	}



	async setupSceneAchievementNftsData(){
		this.achievements.firstHarvestAchievement = await checkFirstHarvestAchievement();
		this.achievements.giftFromNatureAchievement = await checkGiftFromNatureAchievement();
		this.achievements.firstFishAchievement = await checkFirstFishAchievement();

		if(this.achievements.firstHarvestAchievement){
			this.questBookPrefab.visible = true
			this.newItemHudPrefab.visible = true;
			this.profilePrefab.visible = true;
		}

		if(this.achievements.giftFromNatureAchievement){
        	this.questMark.visible = true;
		}

		console.log(this.achievements);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
