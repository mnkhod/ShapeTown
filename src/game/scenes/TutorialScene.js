// You can write more code here

/* START OF COMPILED CODE */

import HarvestPrefab from "../prefabs/objects/HarvestPrefab";
import OldManJackNpcPrefab from "../prefabs/npcs/OldManJackNpcPrefab";
import PlayerPrefab from "../prefabs/PlayerPrefab";
import QuestBookPrefab from "../prefabs/hud/QuestBookPrefab";
import AlertPrefab from "../prefabs/hud/AlertPrefab";
import AppleTreePrefab from "../prefabs/Trees/AppleTreePrefab";
import PineTreePrefab from "../prefabs/Trees/PineTreePrefab";
import MapleTreePrefab from "../prefabs/Trees/MapleTreePrefab";
import TutorealHousePrefab from "../prefabs/House/TutorealHousePrefab";
import FishingComponentPrefab from "../prefabs/hud/FishingComponentPrefab";
import ProfilePrefab from "../prefabs/hud/ProfilePrefab";
import MessagePrefab from "../prefabs/hud/MessagePrefab";
import NewItemHudPrefab from "../../../NewItemHudPrefab";
import OpenInventory from "../prefabs/hud/OpenInventory";
import OpenMapPrefab from "../prefabs/hud/OpenMapPrefab";
import MinimapPrefab from "../prefabs/hud/MinimapPrefab";
import OptionsListPrefab from "../prefabs/hud/OptionsListPrefab";
import RockMonster from "../prefabs/Mob/RockMonster";
import GoblinMonster from "../prefabs/Mob/GoblinMonster";
import MerchantPrefab from "../prefabs/npcs/MerchantPrefab";
import OrcMonster from "../prefabs/Mob/OrcMonster";
/* START-USER-IMPORTS */
import questSystem from "../../components/QuestSystem";
import { extendSceneWithQuests } from "../../components/QuestSystem"; 
import { extendJackNpc } from "../../components/QuestSystem";
import { EventBus } from '../../game/EventBus';
import initInventoryBridge from "../../components/phaser-react-bridge";
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
		const layerTreeBorder1 = tutorialMap.createLayer("Treeborder[Make it Collision]/TreeBorder", ["TreePatteren"], -767, -415);

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
		const sceneTile = this.add.sprite(1242, 382, "Fruitbushes_V01", 23);
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

		// fishingArea
		const fishingArea = this.add.sprite(852, 714, "LakeAccessor", 0);

		// fishingComponentPrefab
		const fishingComponentPrefab = new FishingComponentPrefab(this, 64, 640);
		this.add.existing(fishingComponentPrefab);

		// profilePrefab
		const profilePrefab = new ProfilePrefab(this, 57, 24);
		this.add.existing(profilePrefab);

		// messagePrefab
		const messagePrefab = new MessagePrefab(this, 0.706304947792546, 0.8045771466410088);
		this.add.existing(messagePrefab);

		// newItemHudPrefab
		const newItemHudPrefab = new NewItemHudPrefab(this, 0, 0);
		this.add.existing(newItemHudPrefab);
		newItemHudPrefab.scaleX = 1;
		newItemHudPrefab.scaleY = 1;

		// openInventory
		const openInventory = new OpenInventory(this, 267, 478);
		this.add.existing(openInventory);
		openInventory.scaleX = 1;
		openInventory.scaleY = 1;

		// openMapPrefab
		const openMapPrefab = new OpenMapPrefab(this, 346, 480);
		this.add.existing(openMapPrefab);

		// minimapPrefab
		const minimapPrefab = new MinimapPrefab(this, 65, 73);
		this.add.existing(minimapPrefab);
		minimapPrefab.scaleX = 1;
		minimapPrefab.scaleY = 1;
		minimapPrefab.visible = false;

		// OptionsListPrefab
		const optionsListPrefab = new OptionsListPrefab(this, 967, 30);
		this.add.existing(optionsListPrefab);

		// rockMonster
		const rockMonster = new RockMonster(this, 767, 153);
		this.add.existing(rockMonster);

		// goblinMonster
		const goblinMonster = new GoblinMonster(this, 809, 382);
		this.add.existing(goblinMonster);

		// merchantPrefab
		const merchantPrefab = new MerchantPrefab(this, 539, 438);
		this.add.existing(merchantPrefab);

		// rockMonster_1
		const rockMonster_1 = new RockMonster(this, 792, 238);
		this.add.existing(rockMonster_1);

		// orcMonster
		const orcMonster = new OrcMonster(this, 719, 270);
		this.add.existing(orcMonster);

		// oldManJackNpcPrefab (prefab fields)
		oldManJackNpcPrefab.player = playerPrefab;
		oldManJackNpcPrefab.msgPrefab = messagePrefab;
		oldManJackNpcPrefab.bookHud = questBookPrefab;
		oldManJackNpcPrefab.newItemHud = newItemHudPrefab;

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
		this.oldManJackNpcPrefab = oldManJackNpcPrefab;
		this.playerPrefab = playerPrefab;
		this.questBookPrefab = questBookPrefab;
		this.alertPrefab = alertPrefab;
		this.appleTreePrefab = appleTreePrefab;
		this.pineTreePrefab = pineTreePrefab;
		this.mapleTreePrefab = mapleTreePrefab;
		this.tutorealHousePrefab = tutorealHousePrefab;
		this.fishingArea = fishingArea;
		this.fishingComponentPrefab = fishingComponentPrefab;
		this.profilePrefab = profilePrefab;
		this.messagePrefab = messagePrefab;
		this.newItemHudPrefab = newItemHudPrefab;
		this.openInventory = openInventory;
		this.openMapPrefab = openMapPrefab;
		this.minimapPrefab = minimapPrefab;
		this.optionsListPrefab = optionsListPrefab;
		this.rockMonster = rockMonster;
		this.goblinMonster = goblinMonster;
		this.merchantPrefab = merchantPrefab;
		this.rockMonster_1 = rockMonster_1;
		this.orcMonster = orcMonster;
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
	/** @type {OldManJackNpcPrefab} */
	oldManJackNpcPrefab;
	/** @type {PlayerPrefab} */
	playerPrefab;
	/** @type {QuestBookPrefab} */
	questBookPrefab;
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
	/** @type {Phaser.GameObjects.Sprite} */
	fishingArea;
	/** @type {FishingComponentPrefab} */
	fishingComponentPrefab;
	/** @type {ProfilePrefab} */
	profilePrefab;
	/** @type {MessagePrefab} */
	messagePrefab;
	/** @type {NewItemHudPrefab} */
	newItemHudPrefab;
	/** @type {OpenInventory} */
	openInventory;
	/** @type {OpenMapPrefab} */
	openMapPrefab;
	/** @type {MinimapPrefab} */
	minimapPrefab;
	/** @type {OptionsListPrefab} */
	optionsListPrefab;
	/** @type {RockMonster} */
	rockMonster;
	/** @type {GoblinMonster} */
	goblinMonster;
	/** @type {MerchantPrefab} */
	merchantPrefab;
	/** @type {RockMonster} */
	rockMonster_1;
	/** @type {OrcMonster} */
	orcMonster;
	/** @type {Phaser.Tilemaps.Tilemap} */
	tutorialMap;

	/* START-USER-CODE */

	// Write your code here
	achievements = {};


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
	onSceneShutdown() {
	  if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
		this.newItemHudPrefab.updateGlobalInventory();
	  }
	}
	setupStartingItems() {
	  if (!this.newItemHudPrefab) return;

	  if (this.newItemHudPrefab.updateGlobalInventory) {
	    this.newItemHudPrefab.updateGlobalInventory();
	  }
	}
	create() {
		this.editorCreate();
		this.cameras.main.setBounds(-120, -130, 1344, 1792);
        this.physics.world.bounds.width = 1000;
        this.physics.world.bounds.height = 800;
		extendSceneWithQuests(this);


    	this.initInventorySystem();

		this.merchantPrefab.player = this.playerPrefab;
		this.merchantPrefab.inventoryHud = this.newItemHudPrefab;
    	this.merchantPrefab.msgPrefab = this.messagePrefab;
		this.merchantPrefab.itemHud = this.newItemHudPrefab;

		this.events.on('wake', (sys, data) => {
		  if (this.newItemHudPrefab) {
		    import('../../components/GlobalInvetoryManager').then(({ globalInventory }) => {
		      	globalInventory.syncInventoryToScene(this);
		    });
		  }
		});

		this.fishingArea.setInteractive({ useHandCursor: true });
		this.fishingArea.on('pointerdown', function (_pointer) {
			this.fishingComponentPrefab.play(() => {
				this.newItemHudPrefab.addItem("FISH","Salmon",1)
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
		    if (this.newItemHudPrefab && this.newItemHudPrefab.updateGlobalInventory) {
			this.newItemHudPrefab.updateGlobalInventory();
			}

		    this.scene.switch("FarmingScene");
		    this.playerPrefab.x -= 50;
		    this.cameras.main.fadeIn(2000, 0, 0, 0);
		});

		if (this.minimapPrefab && this.playerPrefab) {
            this.minimapPrefab.setPlayer(this.playerPrefab);
            this.minimapPrefab.visible = false;
            if (this.minimapPrefab.minimapCamera) {
                this.minimapPrefab.minimapCamera.visible = false;
            }
        }
		if (this.questBookPrefab) {
            this.questBookPrefab.visible = false;
        }
        if (this.newItemHudPrefab) {
            this.newItemHudPrefab.visible = false;
        }
        if (this.profilePrefab) {
            this.profilePrefab.visible = false;
        }

		if (!this.game.questSystem) {
			this.game.questSystem = questSystem;
		}

		window.getQuestProgress = () => {
			const progress = this.game.questSystem.getQuestProgress();
			return progress;
		};

		window.updateQuestProgress = (update) => {
			this.game.questSystem.updateQuestProgress(update);
		};

		extendSceneWithQuests(this);

		setTimeout(() => {
			this.questSystem.updateSubtask("001", "001-1", true);
		}, 2000);

		extendHarvestPrefab(HarvestPrefab);

		extendJackNpc(OldManJackNpcPrefab);
		
		extendHarvestPrefab(HarvestPrefab);
		
		extendJackNpc(OldManJackNpcPrefab);
		
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
			this.optionsListPrefab.visible = true;
		}

		if(this.achievements.giftFromNatureAchievement){
        	this.questMark.visible = true;
		}

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
