// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class NewItemHudPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// Inventory_background
		const inventory_background = scene.add.image(310.5, 49.5, "InGameInventoryBackground");
		this.add(inventory_background);

		// ItemBox1
		const itemBox1 = scene.add.container(0, 0);
		this.add(itemBox1);

		// Slot_1
		const slot_1 = scene.add.image(48, 53, "InactiveSlot1");
		itemBox1.add(slot_1);

		// ActiveSlot_1
		const activeSlot_1 = scene.add.image(48, 53, "ActiveSlot1");
		activeSlot_1.visible = false;
		itemBox1.add(activeSlot_1);

		// item1
		const item1 = scene.add.sprite(48, 54, "_MISSING");
		itemBox1.add(item1);

		// text1
		const text1 = scene.add.text(65, 62, "", {});
		text1.scaleX = 1.5;
		text1.scaleY = 1.5;
		text1.text = "0\n";
		text1.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox1.add(text1);

		// ItemBox2
		const itemBox2 = scene.add.container(-888.3583374023438, -33.3109245300293);
		this.add(itemBox2);

		// Slot_2
		const slot_2 = scene.add.image(1011, 86, "InactiveSlot2");
		itemBox2.add(slot_2);

		// ActiveSlot_2
		const activeSlot_2 = scene.add.image(1011, 86, "ActiveSlot2");
		activeSlot_2.visible = false;
		itemBox2.add(activeSlot_2);

		// item2
		const item2 = scene.add.sprite(1012, 87, "_MISSING");
		itemBox2.add(item2);

		// text2
		const text2 = scene.add.text(1028, 96, "", {});
		text2.scaleX = 1.5;
		text2.scaleY = 1.5;
		text2.text = "0\n";
		text2.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox2.add(text2);

		// ItemBox3
		const itemBox3 = scene.add.container(-888.3583374023438, -33.3109245300293);
		this.add(itemBox3);

		// Slot_3
		const slot_3 = scene.add.image(1086, 86, "InactiveSlot3");
		itemBox3.add(slot_3);

		// ActiveSlot_3
		const activeSlot_3 = scene.add.image(1086, 86, "ActiveSlot3");
		activeSlot_3.visible = false;
		itemBox3.add(activeSlot_3);

		// item3
		const item3 = scene.add.sprite(1087, 87, "_MISSING");
		itemBox3.add(item3);

		// text3
		const text3 = scene.add.text(1103, 96, "", {});
		text3.scaleX = 1.5;
		text3.scaleY = 1.5;
		text3.text = "0\n";
		text3.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox3.add(text3);

		// ItemBox4
		const itemBox4 = scene.add.container(-888.3583374023438, -33.3109245300293);
		this.add(itemBox4);

		// Slot_4
		const slot_4 = scene.add.image(1161, 86, "InactiveSlot4");
		itemBox4.add(slot_4);

		// ActiveSlot_4
		const activeSlot_4 = scene.add.image(1161, 86, "ActiveSlot4");
		activeSlot_4.visible = false;
		itemBox4.add(activeSlot_4);

		// item4
		const item4 = scene.add.sprite(1162, 88, "_MISSING");
		itemBox4.add(item4);

		// text4
		const text4 = scene.add.text(1178, 96, "", {});
		text4.scaleX = 1.5;
		text4.scaleY = 1.5;
		text4.text = "0\n";
		text4.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox4.add(text4);

		// ItemBox5
		const itemBox5 = scene.add.container(-888.3583374023438, -33.3109245300293);
		this.add(itemBox5);

		// Slot_5
		const slot_5 = scene.add.image(1236, 86, "InactiveSlot5");
		itemBox5.add(slot_5);

		// ActiveSlot_5
		const activeSlot_5 = scene.add.image(1236, 86, "ActiveSlot5");
		activeSlot_5.visible = false;
		itemBox5.add(activeSlot_5);

		// item5
		const item5 = scene.add.sprite(1237, 88, "_MISSING");
		itemBox5.add(item5);

		// text5
		const text5 = scene.add.text(1252, 96, "", {});
		text5.scaleX = 1.5;
		text5.scaleY = 1.5;
		text5.text = "0\n";
		text5.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox5.add(text5);

		// ItemBox6
		const itemBox6 = scene.add.container(-888.3583374023438, -33.3109245300293);
		this.add(itemBox6);

		// Slot_6
		const slot_6 = scene.add.image(1311, 86, "InactiveSlot6");
		itemBox6.add(slot_6);

		// ActiveSlot_6
		const activeSlot_6 = scene.add.image(1311, 86, "ActiveSlot6");
		activeSlot_6.visible = false;
		itemBox6.add(activeSlot_6);

		// item6
		const item6 = scene.add.sprite(1312, 88, "_MISSING");
		itemBox6.add(item6);

		// text6
		const text6 = scene.add.text(1328, 96, "", {});
		text6.scaleX = 1.5;
		text6.scaleY = 1.5;
		text6.text = "0\n";
		text6.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox6.add(text6);

		// ItemBox7
		const itemBox7 = scene.add.container(-888.3583374023438, -33.3109245300293);
		this.add(itemBox7);

		// Slot_7
		const slot_7 = scene.add.image(1386, 86, "InactiveSlot7");
		itemBox7.add(slot_7);

		// ActiveSlot_7
		const activeSlot_7 = scene.add.image(1386, 86, "ActiveSlot7");
		activeSlot_7.visible = false;
		itemBox7.add(activeSlot_7);

		// item7
		const item7 = scene.add.sprite(1387, 88, "_MISSING");
		itemBox7.add(item7);

		// text7
		const text7 = scene.add.text(1402, 96, "", {});
		text7.scaleX = 1.5;
		text7.scaleY = 1.5;
		text7.text = "0\n";
		text7.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox7.add(text7);

		// ItemBox8
		const itemBox8 = scene.add.container(-883.4107055664062, 222.31504821777344);
		this.add(itemBox8);

		// Slot_8
		const slot_8 = scene.add.image(1456, -170, "InactiveSlot8");
		itemBox8.add(slot_8);

		// ActiveSlot_8
		const activeSlot_8 = scene.add.image(1456, -170, "ActiveSlot8");
		activeSlot_8.visible = false;
		itemBox8.add(activeSlot_8);

		// item8
		const item8 = scene.add.sprite(1457, -168, "_MISSING");
		itemBox8.add(item8);

		// text8
		const text8 = scene.add.text(1473, -160, "", {});
		text8.scaleX = 1.5;
		text8.scaleY = 1.5;
		text8.text = "0\n";
		text8.setStyle({ "align": "right", "color": "#000", "fontFamily": "Little Malio 8-Bit", "fontSize": "10px" });
		itemBox8.add(text8);

		// lists
		const items = [item1, item2, item3, item4, item5, item6, item7, item8];
		const itemCounters = [text1, text2, text3, text4, text5, text6, text7, text8];
		const activeItemSlots = [activeSlot_1, activeSlot_2, activeSlot_3, activeSlot_4, activeSlot_5, activeSlot_6, activeSlot_7, activeSlot_8];
		const passiveItemSlots = [slot_1, slot_2, slot_3, slot_4, slot_5, slot_6, slot_7, slot_8];

		this.inventory_background = inventory_background;
		this.slot_1 = slot_1;
		this.activeSlot_1 = activeSlot_1;
		this.item1 = item1;
		this.text1 = text1;
		this.slot_2 = slot_2;
		this.activeSlot_2 = activeSlot_2;
		this.item2 = item2;
		this.text2 = text2;
		this.slot_3 = slot_3;
		this.activeSlot_3 = activeSlot_3;
		this.item3 = item3;
		this.text3 = text3;
		this.slot_4 = slot_4;
		this.activeSlot_4 = activeSlot_4;
		this.item4 = item4;
		this.text4 = text4;
		this.slot_5 = slot_5;
		this.activeSlot_5 = activeSlot_5;
		this.item5 = item5;
		this.text5 = text5;
		this.slot_6 = slot_6;
		this.activeSlot_6 = activeSlot_6;
		this.item6 = item6;
		this.text6 = text6;
		this.slot_7 = slot_7;
		this.activeSlot_7 = activeSlot_7;
		this.item7 = item7;
		this.text7 = text7;
		this.slot_8 = slot_8;
		this.activeSlot_8 = activeSlot_8;
		this.item8 = item8;
		this.text8 = text8;
		this.items = items;
		this.itemCounters = itemCounters;
		this.activeItemSlots = activeItemSlots;
		this.passiveItemSlots = passiveItemSlots;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.on('create', this.onSceneCreate, this);
		this.scene.events.on('update', this.onSceneUpdate, this);
		
		this.activeIndex = -1;
		this.selectedItem = null;
		this.itemData = [null, null, null, null, null, null, null, null];

		this.setPosition(
		    this.scene.cameras.main.worldView.right - 200,
		    this.scene.cameras.main.worldView.bottom - 50
		);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	inventory_background;
	/** @type {Phaser.GameObjects.Image} */
	slot_1;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_1;
	/** @type {Phaser.GameObjects.Sprite} */
	item1;
	/** @type {Phaser.GameObjects.Text} */
	text1;
	/** @type {Phaser.GameObjects.Image} */
	slot_2;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_2;
	/** @type {Phaser.GameObjects.Sprite} */
	item2;
	/** @type {Phaser.GameObjects.Text} */
	text2;
	/** @type {Phaser.GameObjects.Image} */
	slot_3;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_3;
	/** @type {Phaser.GameObjects.Sprite} */
	item3;
	/** @type {Phaser.GameObjects.Text} */
	text3;
	/** @type {Phaser.GameObjects.Image} */
	slot_4;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_4;
	/** @type {Phaser.GameObjects.Sprite} */
	item4;
	/** @type {Phaser.GameObjects.Text} */
	text4;
	/** @type {Phaser.GameObjects.Image} */
	slot_5;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_5;
	/** @type {Phaser.GameObjects.Sprite} */
	item5;
	/** @type {Phaser.GameObjects.Text} */
	text5;
	/** @type {Phaser.GameObjects.Image} */
	slot_6;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_6;
	/** @type {Phaser.GameObjects.Sprite} */
	item6;
	/** @type {Phaser.GameObjects.Text} */
	text6;
	/** @type {Phaser.GameObjects.Image} */
	slot_7;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_7;
	/** @type {Phaser.GameObjects.Sprite} */
	item7;
	/** @type {Phaser.GameObjects.Text} */
	text7;
	/** @type {Phaser.GameObjects.Image} */
	slot_8;
	/** @type {Phaser.GameObjects.Image} */
	activeSlot_8;
	/** @type {Phaser.GameObjects.Sprite} */
	item8;
	/** @type {Phaser.GameObjects.Text} */
	text8;
	/** @type {Phaser.GameObjects.Sprite[]} */
	items;
	/** @type {Phaser.GameObjects.Text[]} */
	itemCounters;
	/** @type {Phaser.GameObjects.Image[]} */
	activeItemSlots;
	/** @type {Phaser.GameObjects.Image[]} */
	passiveItemSlots;
	/** @type {Phaser.GameObjects.GameObject} */
	player;

	/* START-USER-CODE */

	// Write your code here.
	activeIndex = -1;
	selectedItem = null;
	itemData = [null, null, null, null, null, null, null, null];

	onSceneCreate() {
	    this.items.forEach(item => {
	        item.visible = false;
	    });

	    this.itemCounters.forEach(counter => {
	        counter.visible = false;
	    });

	    this.passiveItemSlots.forEach((slot, index) => {
	        slot.setInteractive({ useHandCursor: true });
	        slot.on('pointerdown', () => {
	            this.activeItemSlots.forEach(activeSlot => activeSlot.visible = false);
	            this.activeItemSlots[index].visible = true;
	
	            this.selectedItem = this.itemData[index];
	            this.activeIndex = index;

	            if (this.scene.reactEvent) {
	                this.scene.reactEvent.emit('inventory-slot-selected', {
	                    index,
	                    item: this.selectedItem
	                });
	            }
	        });
	    });
	}

	onSceneUpdate() {
	    if (!this.visible) return;

	    const cam = this.scene.cameras.main;
	
	    let fullWidth = Math.floor(this.getBounds().width);
	    let fullHeight = Math.floor(this.getBounds().height);
	
	    let newX = cam.midPoint.x - (fullWidth / 2);
	    let newY = cam.worldView.bottom - fullHeight - 20;

	    this.setPosition(
	        Phaser.Math.Linear(this.x, newX, 1),
	        Phaser.Math.Linear(this.y, newY, 1)
	    );
	}

	addItem(key, textureName, textureId, amount = 1, isAddable = false) {
	    if (!isAddable) {
	        const hasEmptySlot = this.itemData.includes(null);
	        if (!hasEmptySlot) {
	            this.scene.alertPrefab?.alert("No Empty Slot");
	            return;
	        }
	    }

	    const existingItemIndex = this.itemData.findIndex(id => id === key);
	    if (existingItemIndex !== -1) {
	        if (!isAddable) {
	            this.scene.alertPrefab?.alert("Already Has Item");
	            return;
	        }

	        const currentAmount = parseInt(this.itemCounters[existingItemIndex].text);
	        this.itemCounters[existingItemIndex].text = (currentAmount + amount).toString();
	        this.itemCounters[existingItemIndex].visible = true;
	        return;
	    }

	    const emptySlotIndex = this.itemData.findIndex(x => x === null);
	    if (emptySlotIndex === -1) return;

	    this.itemData[emptySlotIndex] = key;
	
	    this.items[emptySlotIndex].visible = true;
	    this.items[emptySlotIndex].setTexture(textureName, textureId);

	    this.itemCounters[emptySlotIndex].visible = true;
	    this.itemCounters[emptySlotIndex].text = amount.toString();
	}

	useItem(key) {
	    const itemIndex = this.itemData.findIndex(id => id === key);
	    if (itemIndex === -1) {
	        this.scene.alertPrefab?.alert("Doesn't Have Item");
	        return;
	    }

	    const amount = parseInt(this.itemCounters[itemIndex].text);
	    if (amount <= 1) {
	        this.removeItemByKey(key);
	    } else {
	        this.itemCounters[itemIndex].text = (amount - 1).toString();
	    }
	}

	checkItem(key) {
	    return this.itemData.includes(key);
	}

	removeItemByKey(key) {
	    const index = this.itemData.findIndex(item => item === key);
	    if (index === -1) return;

	    this.itemData[index] = null;
	    this.items[index].visible = false;
	    this.items[index].setTexture("_MISSING");
	    this.itemCounters[index].text = "0";
	    this.itemCounters[index].visible = false;
	    this.activeItemSlots[index].visible = false;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
