// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class NewItemHudPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// Inventory_background
		const inventory_background = scene.add.image(310.5, 24.75, "InGameInventoryBackground");
		inventory_background.scaleX = 0.5;
		inventory_background.scaleY = 0.5;
		inventory_background.setOrigin(1, 0.5);
		this.add(inventory_background);

		// ItemBox1
		const itemBox1 = scene.add.container(0, 0);
		itemBox1.scaleX = 0.5;
		itemBox1.scaleY = 0.5;
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
		const itemBox2 = scene.add.container(-444, -17);
		itemBox2.scaleX = 0.5;
		itemBox2.scaleY = 0.5;
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
		const itemBox3 = scene.add.container(-444, -17);
		itemBox3.scaleX = 0.5;
		itemBox3.scaleY = 0.5;
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
		const itemBox4 = scene.add.container(-444, -17);
		itemBox4.scaleX = 0.5;
		itemBox4.scaleY = 0.5;
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
		const itemBox5 = scene.add.container(-444, -17);
		itemBox5.scaleX = 0.5;
		itemBox5.scaleY = 0.5;
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
		const itemBox6 = scene.add.container(-444, -17);
		itemBox6.scaleX = 0.5;
		itemBox6.scaleY = 0.5;
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
		const itemBox7 = scene.add.container(-444, -17);
		itemBox7.scaleX = 0.5;
		itemBox7.scaleY = 0.5;
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
		const itemBox8 = scene.add.container(-441.5, 111);
		itemBox8.scaleX = 0.5;
		itemBox8.scaleY = 0.5;
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

		// keyboard_1
		const keyboard_1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

		// keyboard_2
		const keyboard_2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

		// keyboard_3
		const keyboard_3 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

		// keyboard_4
		const keyboard_4 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

		// keyboard_5
		const keyboard_5 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

		// keyboard_6
		const keyboard_6 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);

		// keyboard_7
		const keyboard_7 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);

		// keyboard_8
		const keyboard_8 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);

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
		this.keyboard_1 = keyboard_1;
		this.keyboard_2 = keyboard_2;
		this.keyboard_3 = keyboard_3;
		this.keyboard_4 = keyboard_4;
		this.keyboard_5 = keyboard_5;
		this.keyboard_6 = keyboard_6;
		this.keyboard_7 = keyboard_7;
		this.keyboard_8 = keyboard_8;
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
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_1;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_2;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_3;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_4;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_5;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_6;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_7;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_8;
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
	activeIndex = -1;
	selectedItem = null;
	itemData = [null, null, null, null, null, null, null, null];
	mainInventoryData = Array(24).fill(null);

	onSceneCreate() {

	    this.items.forEach(item => {
	        if (item) item.visible = false;
	    });

	    this.itemCounters.forEach(counter => {
	        if (counter) counter.visible = false;
	    });

	    this.setupSlotHandlers();

	    this.setupKeyboardHandlers();

	    this.scene.events.on('update', this.validateSelectionState, this);

	}

	setupSlotHandlers() {
		this.passiveItemSlots.forEach((slot, index) => {
			if (!slot) return;

			slot.setInteractive({ useHandCursor: true });

			slot.off('pointerdown');

			slot.on('pointerdown', () => {
				this.activeIndex = index;

				this.selectedItem = this.itemData[index];

				this.activeItemSlots.forEach((activeSlot, i) => {
					if (activeSlot) {
						activeSlot.visible = (i === index);
					}
				});

				if (this.cursorIcon) {
					this.cursorIcon.destroy();
					this.cursorIcon = null;
				}

				if (this.itemData[index] && this.items[index].visible) {
					const texture = this.items[index].texture.key;
					const frame = this.items[index].frame.name;

					this.cursorIcon = this.scene.add.sprite(0, 0, texture, frame);
					this.cursorIcon.setScale(0.6);
					this.cursorIcon.setDepth(1000);
					this.cursorIcon.setScrollFactor(0);
				}
			});
		});
	}


	setupKeyboardHandlers() {
	    const hotkeyMap = [
	        this.keyboard_1,
	        this.keyboard_2,
	        this.keyboard_3,
	        this.keyboard_4,
	        this.keyboard_5,
	        this.keyboard_6,
	        this.keyboard_7,
	        this.keyboard_8
	    ];

	    hotkeyMap.forEach((key, index) => {
	        if (!key) return;

	        key.removeAllListeners();

	        key.on('down', () => {

	            if (this.itemData[index]) {
	                this.activeIndex = index;
	                this.selectedItem = this.itemData[index];

	                this.activeItemSlots.forEach((activeSlot, i) => {
	                    if (activeSlot) activeSlot.visible = (i === index);
	                });

	                if (this.items[index] && this.items[index].visible) {
	                    this.updateCursorIcon(index);
	                } else if (this.cursorIcon) {
	                    this.cursorIcon.destroy();
	                    this.cursorIcon = null;
	                }

	                if (this.scene.reactEvent) {
	                    this.scene.reactEvent.emit('inventory-slot-selected', {
	                        index,
	                        item: this.selectedItem
	                    });
	                }
	            }
	        });
	    });
	}

	updateCursorIcon(slotIndex) {
	    const selectedTexture = this.items[slotIndex].texture.key;
	    const selectedFrame = this.items[slotIndex].frame.name;

	    if (this.cursorIcon) {
	        this.cursorIcon.destroy();
	    }

	    this.cursorIcon = this.scene.add.sprite(0, 0, selectedTexture, selectedFrame);
	    this.cursorIcon.setScale(0.6);
	    this.cursorIcon.setDepth(1000);
	    this.cursorIcon.setScrollFactor(0);
	}

	validateSelectionState() {
	    if (this.activeIndex >= 0 && this.activeIndex < 8 && !this.selectedItem && this.itemData[this.activeIndex]) {
	        this.selectedItem = this.itemData[this.activeIndex];
	    }

	    if (this.selectedItem && this.activeIndex === -1) {
	        const index = this.itemData.indexOf(this.selectedItem);
	        if (index !== -1) {
	            this.activeIndex = index;
	        }
	    }

	    if (this.activeIndex >= 0 && this.activeIndex < 8) {
	        this.activeItemSlots.forEach((slot, i) => {
	            if (slot && slot.visible !== (i === this.activeIndex)) {
	                slot.visible = (i === this.activeIndex);
	            }
	        });
	    }

	    if (this.cursorIcon) {
	        const pointer = this.scene.input.activePointer;
	        const scale = 0.5;
	        const offsetX = 500; 
	        const offsetY = 300; 

	        this.cursorIcon.x = (pointer.x * scale) + offsetX;
	        this.cursorIcon.y = (pointer.y * scale) + offsetY;
	    }
	}

	onSceneUpdate() {
		if (!this.visible) return;

		const hotkeyMap = [
			this.keyboard_1,
			this.keyboard_2,
			this.keyboard_3,
			this.keyboard_4,
			this.keyboard_5,
			this.keyboard_6,
			this.keyboard_7,
			this.keyboard_8
		];

		hotkeyMap.forEach((key, index) => {
			if (key && Phaser.Input.Keyboard.JustDown(key)) {
				this.activeIndex = index;

				this.selectedItem = this.itemData[index];

				this.activeItemSlots.forEach((activeSlot, i) => {
					if (activeSlot) {
						activeSlot.visible = (i === index);
					}
				});

				if (this.cursorIcon) {
					this.cursorIcon.destroy();
					this.cursorIcon = null;
				}

				if (this.itemData[index] && this.items[index].visible) {
					const texture = this.items[index].texture.key;
					const frame = this.items[index].frame.name;

					this.cursorIcon = this.scene.add.sprite(0, 0, texture, frame);
					this.cursorIcon.setScale(0.6);
					this.cursorIcon.setDepth(1000);
					this.cursorIcon.setScrollFactor(0);
				}
			}
		});

		const cam = this.scene.cameras.main;
		if (!cam) return;

		let fullWidth = Math.floor(this.getBounds().width);
		let fullHeight = Math.floor(this.getBounds().height);

		let newX = cam.midPoint.x - (fullWidth / 2);
		let newY = cam.worldView.bottom - fullHeight - 20;

		this.setPosition(
			Phaser.Math.Linear(this.x, newX, 1),
			Phaser.Math.Linear(this.y, newY, 1)
		);

		if (this.cursorIcon) {
			const pointer = this.scene.input.activePointer;
			const scale = 0.5;
			const offsetX = 500; 
			const offsetY = 300; 

			this.cursorIcon.x = (pointer.x * scale) + offsetX;
			this.cursorIcon.y = (pointer.y * scale) + offsetY;
		}
	}

	checkItem(key) {
	    return this.itemData.includes(key) || this.mainInventoryData.some(item => item && item.id === key);
	}

	getItemCount(key) {
	    if (!key) return 0;

	    let totalCount = 0;

	    const quickIndex = this.itemData.findIndex(item => item === key);
	    if (quickIndex !== -1) {
	        totalCount += parseInt(this.itemCounters[quickIndex].text || '0');
	    }

	    this.mainInventoryData.forEach(item => {
	        if (item && item.id === key) {
	            totalCount += item.quantity || 0;
	        }
	    });

	    return totalCount;
	}

	findEmptyMainSlot() {
	    return this.mainInventoryData.findIndex(item => item === null);
	}

	hasInventorySpace() {
	    const hasQuickSlotSpace = this.itemData.includes(null);
	    const hasMainSlotSpace = this.mainInventoryData.includes(null);
	    return hasQuickSlotSpace || hasMainSlotSpace;
	}

	cleanupInventory() {
	  	this.itemData.forEach((itemId, index) => {
	  	  if (!itemId && this.items[index]) {
	  	    this.items[index].visible = false;
	  	    if (this.itemCounters[index]) {
	  	      this.itemCounters[index].visible = false;
	  	    }
	  	  }
	  	});

	  	if (typeof this.updateGlobalInventory === 'function') {
	  	  this.updateGlobalInventory();
	  	}

	  	if (this.scene.reactEvent) {
	  	  this.scene.reactEvent.emit('inventory-changed', this.scene);
	  	}
	}

	addItem(key, textureName, textureId, amount = 1, isAddable = true) {
	    const existingItemIndex = this.itemData.findIndex(id => id === key);
	    if (existingItemIndex !== -1 && isAddable) {
	        const currentAmount = parseInt(this.itemCounters[existingItemIndex].text || "0");
	        this.itemCounters[existingItemIndex].text = (currentAmount + amount).toString();
	        this.itemCounters[existingItemIndex].visible = true;

	        this.items[existingItemIndex].visible = true;

	        return true;
	    }

	    const existingMainIndex = this.mainInventoryData.findIndex(item => item && item.id === key);
	    if (existingMainIndex !== -1 && isAddable) {
	        const currentItem = this.mainInventoryData[existingMainIndex];
	        this.mainInventoryData[existingMainIndex] = {
	            ...currentItem,
	            quantity: (currentItem.quantity || 1) + amount
	        };

	        return true;
	    }

	    const emptySlotIndex = this.itemData.findIndex(x => x === null);
	    if (emptySlotIndex !== -1) {
	        this.itemData[emptySlotIndex] = key;
	        this.items[emptySlotIndex].visible = true;
	        this.items[emptySlotIndex].setTexture(textureName, textureId);
	        this.itemCounters[emptySlotIndex].visible = true;
	        this.itemCounters[emptySlotIndex].text = amount.toString();

	        if (this.selectedItem === null && this.activeIndex === -1) {
	            this.selectedItem = key;
	            this.activeIndex = emptySlotIndex;
	            this.activeItemSlots[emptySlotIndex].visible = true;
	        }

	        return true;
	    }

	    const emptyMainIndex = this.findEmptyMainSlot();
	    if (emptyMainIndex !== -1) {
	        this.mainInventoryData[emptyMainIndex] = {
	            id: key,
	            icon: textureName,
	            frame: textureId,
	            textureKey: textureName,
	            frameName: textureId,
	            quantity: amount,
	            name: key
	        };

	        return true;
	    }

	    this.scene.alertPrefab?.alert("Inventory Full");
	    return false;
	}

	useItem(key) {
	    const itemIndex = this.itemData.findIndex(id => id === key);
	    if (itemIndex !== -1) {
	        const amount = parseInt(this.itemCounters[itemIndex].text || "0");
	        if (amount <= 1) {
	            this.removeItemByKey(key);
	        } else {
	            this.itemCounters[itemIndex].text = (amount - 1).toString();
	        }

	        if (this.scene.reactEvent) {
	            this.scene.reactEvent.emit('inventory-changed', this.scene);
	        }

	        return true;
	    }

	    const mainIndex = this.mainInventoryData.findIndex(item => item && item.id === key);
	    if (mainIndex !== -1) {
	        const item = this.mainInventoryData[mainIndex];
	        if (item.quantity <= 1) {
	            this.mainInventoryData[mainIndex] = null;
	        } else {
	            this.mainInventoryData[mainIndex] = {
	                ...item,
	                quantity: item.quantity - 1
	            };
	        }

	        if (this.scene.reactEvent) {
	            this.scene.reactEvent.emit('inventory-changed', this.scene);
	        }

	        return true;
	    }

	    this.scene.alertPrefab?.alert("Doesn't Have Item");
	    return false;
	}

	removeItemByKey(key) {
	    const index = this.itemData.findIndex(item => item === key);
	    if (index !== -1) {
	        this.itemData[index] = null;

	        if (this.items[index]) {
	            this.items[index].visible = false;
	            this.items[index].setTexture("_MISSING");
	        }

	        if (this.itemCounters[index]) {
	            this.itemCounters[index].text = "0";
	            this.itemCounters[index].visible = false;
	        }

	        if (this.activeItemSlots[index]) {
	            this.activeItemSlots[index].visible = false;
	        }

	        if (index === this.activeIndex) {
	            if (this.cursorIcon) {
	                this.cursorIcon.destroy();
	                this.cursorIcon = null;
	            }
	            this.selectedItem = null;
	            this.activeIndex = -1;

	            const nextItemIndex = this.itemData.findIndex(item => item !== null);
	            if (nextItemIndex !== -1) {
	                this.selectedItem = this.itemData[nextItemIndex];
	                this.activeIndex = nextItemIndex;
	                this.activeItemSlots[nextItemIndex].visible = true;
	            }
	        }
	    }

	    const mainIndices = [];
	    this.mainInventoryData.forEach((item, idx) => {
	        if (item && item.id === key) {
	            mainIndices.push(idx);
	        }
	    });

	    mainIndices.forEach(idx => {
	        this.mainInventoryData[idx] = null;
	    });

	    if (this.scene.reactEvent) {
	        this.scene.reactEvent.emit('inventory-changed', this.scene);
	    }
	}

	moveToQuickSlot(mainIndex) {
	    const item = this.mainInventoryData[mainIndex];
	    if (!item) {
	        return false;
	    }

	    const emptyQuickIndex = this.itemData.findIndex(x => x === null);
	    if (emptyQuickIndex === -1) {
	        return false;
	    }

	    this.itemData[emptyQuickIndex] = item.id;
	    this.items[emptyQuickIndex].visible = true;
	    this.items[emptyQuickIndex].setTexture(item.textureKey || item.icon);
	    if (item.frameName !== undefined) {
	        this.items[emptyQuickIndex].setFrame(item.frameName);
	    }
	    this.itemCounters[emptyQuickIndex].visible = true;
	    this.itemCounters[emptyQuickIndex].text = item.quantity.toString();

	    this.mainInventoryData[mainIndex] = null;

	    if (this.scene.reactEvent) {
	        this.scene.reactEvent.emit('inventory-changed', this.scene);
	    }
	    return true;
	}

	forceSelectTool(toolId) {
	    const toolIndex = this.itemData.findIndex(id => id === toolId);
	    if (toolIndex === -1) {
	        return false;
	    }

	    this.activeIndex = toolIndex;
	    this.selectedItem = toolId;

	    this.activeItemSlots.forEach((slot, i) => {
	        if (slot) {
	            slot.visible = i === toolIndex;
	        }
	    });

	    if (this.items[toolIndex] && this.items[toolIndex].visible) {
	        this.updateCursorIcon(toolIndex);
	    }

	    if (this.scene.reactEvent) {
	        this.scene.reactEvent.emit('inventory-slot-selected', {
	            index: toolIndex,
	            item: toolId
	        });
	    }

	    return true;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here