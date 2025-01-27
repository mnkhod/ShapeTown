// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenInventory extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// openInventory
		const openInventory = scene.add.image(24, 24, "OpenInventory");
		this.add(openInventory);

		// hoveredOpenInventory
		const hoveredOpenInventory = scene.add.image(24, 24, "HoveredOpenInventory");
		hoveredOpenInventory.visible = false;
		this.add(hoveredOpenInventory);

		// hotkey
		const hotkey = scene.add.image(47, 49, "Hotkey");
		this.add(hotkey);

		// keyboard_key
		const keyboard_key = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

		// keyboard_key_1
		const keyboard_key_1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		this.keyboard_key = keyboard_key;
		this.keyboard_key_1 = keyboard_key_1;

		/* START-USER-CTR-CODE */
        this.setSize(openInventory.width, openInventory.height);
        this.setInteractive({ useHandCursor: true });

        this.openInventory = openInventory;
        this.hoveredOpenInventory = hoveredOpenInventory;
        this.isKeyPressed = false;
        this.isInventoryOpen = false;

        this.on('pointerover', this.handlePointerOver, this);
        this.on('pointerout', this.handlePointerOut, this);

        this.on('pointerdown', this.handleInventoryOpen, this);

        this.scene.events.on('update', this.onSceneUpdate, this);

        if (this.scene.reactEvent) {
            this.scene.reactEvent.on('inventory-sync', this.handleInventorySync, this);
            this.scene.reactEvent.on('inventory-closed', () => {
                this.isInventoryOpen = false;
            });
        }
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_key;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_key_1;
	/** @type {Phaser.GameObjects.GameObject} */
	player;

	/* START-USER-CODE */
    handlePointerOver() {
        this.hoveredOpenInventory.visible = true;
        this.openInventory.visible = false;
    }

    handlePointerOut() {
        this.hoveredOpenInventory.visible = false;
        this.openInventory.visible = true;
    }

    handleInventoryOpen() {
        if (!this.scene.reactEvent || !this.scene.newItemHudPrefab) return;

        const prefab = this.scene.newItemHudPrefab;
        console.log('Opening inventory with prefab state:', prefab.itemData);

        this.scene.reactEvent.emit("show-inventory-modal", {
            phaserInstance: prefab
        });
    }
    handleInventoryClose() {
        if (!this.scene.reactEvent) return;
        
        this.isInventoryOpen = false;
        this.scene.reactEvent.emit("close-inventory-modal");
    }

    handleInventorySync(data) {
        const { quickItems } = data;
        const prefab = this.scene.newItemHudPrefab;

        if (!prefab || !quickItems) return;

        const existingItems = prefab.itemData.map((key, index) => ({
            key,
            visible: prefab.items[index].visible,
            text: prefab.itemCounters[index].text
        }));

        quickItems.forEach((item, index) => {
            if (!item) return;
            if (existingItems[index].key === item.id) return;

            prefab.addItem(
                item.id,
                item.textureKey,
                item.textureId,
                item.quantity,
                true
            );
        });
    }

    onSceneUpdate() {
        if (!this.visible) return;

        const cam = this.scene.cameras.main;
        let newX = cam.worldView.right - 100; 
        let newY = cam.worldView.bottom - 50;

        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 1),
            Phaser.Math.Linear(this.y, newY, 1)
        );

        if (this.keyboard_key.isDown) {
            if (!this.isKeyPressed) {
                this.isKeyPressed = true;
                if (this.isInventoryOpen) {
                    this.handleInventoryClose();
                } else {
                    this.handleInventoryOpen();
                }
            }
        } else {
            this.isKeyPressed = false;
        }

        if (this.keyboard_key_1.isDown) {
            if (this.isInventoryOpen) {
                this.handleInventoryClose();
            }
        }
    }

    destroy() {
        if (this.scene.reactEvent) {
            this.scene.reactEvent.off('inventory-sync', this.handleInventorySync, this);
        }
        this.scene.events.off('update', this.onSceneUpdate, this);
        super.destroy();
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here