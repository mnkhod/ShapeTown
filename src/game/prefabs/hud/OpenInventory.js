// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenInventory extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 0.5;
		this.scaleY = 0.5;

		// openInventory
		const openInventory = scene.add.image(24, 24, "OpenInventory");
		this.add(openInventory);

		// hoveredOpenInventory
		const hoveredOpenInventory = scene.add.image(24, 24, "HoveredOpenInventory");
		hoveredOpenInventory.visible = false;
		this.add(hoveredOpenInventory);

		// hotkey
		const hotkey = scene.add.image(49, 46, "HotkeyTab");
		this.add(hotkey);

		// key_tab
		const key_tab = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

		// key_esc
		const key_esc = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		this.key_tab = key_tab;
		this.key_esc = key_esc;

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
	key_tab;
	/** @type {Phaser.Input.Keyboard.Key} */
	key_esc;
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
        let newX = cam.worldView.right - 90; 
        let newY = cam.worldView.bottom - 48;

        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 1),
            Phaser.Math.Linear(this.y, newY, 1)
        );

        if (this.key_tab.isDown) {
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

        if (this.key_esc.isDown) {
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