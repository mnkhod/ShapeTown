
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ItemHudPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 18, y ?? 25);

		// backpack
		const backpack = scene.add.sprite(361, 15, "Backpack", 0);
		backpack.scaleX = 1.21756203248934;
		backpack.scaleY = 1.21756203248934;
		this.add(backpack);

		// itemBox1
		const itemBox1 = scene.add.container(-18, -17);
		this.add(itemBox1);

		// itemSlotBox1
		const itemSlotBox1 = scene.add.sprite(0, 0, "HudItemSlot", 0);
		itemSlotBox1.setOrigin(0, 0);
		itemBox1.add(itemSlotBox1);

		// item1
		const item1 = scene.add.sprite(32, 32, "_MISSING");
		itemBox1.add(item1);

		// itemCounter1
		const itemCounter1 = scene.add.text(44, 49, "", {});
		itemCounter1.text = "10";
		itemCounter1.setStyle({ "align": "right", "fontSize": "10px" });
		itemBox1.add(itemCounter1);

		// itemBox2
		const itemBox2 = scene.add.container(50, -17);
		this.add(itemBox2);

		// itemSlotBox2
		const itemSlotBox2 = scene.add.sprite(0, 0, "HudItemSlot", 0);
		itemSlotBox2.setOrigin(0, 0);
		itemBox2.add(itemSlotBox2);

		// item2
		const item2 = scene.add.sprite(32, 32, "_MISSING");
		itemBox2.add(item2);

		// itemCounter2
		const itemCounter2 = scene.add.text(44, 48, "", {});
		itemCounter2.text = "10";
		itemCounter2.setStyle({ "align": "right", "fontSize": "10px" });
		itemBox2.add(itemCounter2);

		// itemBox3
		const itemBox3 = scene.add.container(118, -17);
		this.add(itemBox3);

		// itemSlotBox3
		const itemSlotBox3 = scene.add.sprite(0, 0, "HudItemSlot", 0);
		itemSlotBox3.setOrigin(0, 0);
		itemBox3.add(itemSlotBox3);

		// item3
		const item3 = scene.add.sprite(32, 32, "_MISSING");
		itemBox3.add(item3);

		// itemCounter3
		const itemCounter3 = scene.add.text(44, 48, "", {});
		itemCounter3.text = "10";
		itemCounter3.setStyle({ "align": "right", "fontSize": "10px" });
		itemBox3.add(itemCounter3);

		// itemBox4
		const itemBox4 = scene.add.container(187, -17);
		this.add(itemBox4);

		// itemSlotBox4
		const itemSlotBox4 = scene.add.sprite(0, 0, "HudItemSlot", 0);
		itemSlotBox4.setOrigin(0, 0);
		itemBox4.add(itemSlotBox4);

		// item4
		const item4 = scene.add.sprite(32, 32, "_MISSING");
		itemBox4.add(item4);

		// itemCounter4
		const itemCounter4 = scene.add.text(44, 48, "", {});
		itemCounter4.text = "10";
		itemCounter4.setStyle({ "align": "right", "fontSize": "10px" });
		itemBox4.add(itemCounter4);

		// itemBox5
		const itemBox5 = scene.add.container(254, -17);
		this.add(itemBox5);

		// itemSlotBox5
		const itemSlotBox5 = scene.add.sprite(0, 0, "HudItemSlot", 0);
		itemSlotBox5.setOrigin(0, 0);
		itemBox5.add(itemSlotBox5);

		// item5
		const item5 = scene.add.sprite(32, 32, "_MISSING");
		itemBox5.add(item5);

		// itemCounter5
		const itemCounter5 = scene.add.text(44, 48, "", {});
		itemCounter5.text = "10";
		itemCounter5.setStyle({ "align": "right", "fontSize": "10px" });
		itemBox5.add(itemCounter5);

		// lists
		const items = [item1, item2, item3, item4, item5];
		const itemCounters = [itemCounter1, itemCounter2, itemCounter3, itemCounter4, itemCounter5];
		const itemBoxs = [itemSlotBox1, itemSlotBox2, itemSlotBox3, itemSlotBox4, itemSlotBox5];

		this.backpack = backpack;
		this.itemSlotBox1 = itemSlotBox1;
		this.item1 = item1;
		this.itemCounter1 = itemCounter1;
		this.itemSlotBox2 = itemSlotBox2;
		this.item2 = item2;
		this.itemCounter2 = itemCounter2;
		this.itemSlotBox3 = itemSlotBox3;
		this.item3 = item3;
		this.itemCounter3 = itemCounter3;
		this.itemSlotBox4 = itemSlotBox4;
		this.item4 = item4;
		this.itemCounter4 = itemCounter4;
		this.itemSlotBox5 = itemSlotBox5;
		this.item5 = item5;
		this.itemCounter5 = itemCounter5;
		this.items = items;
		this.itemCounters = itemCounters;
		this.itemBoxs = itemBoxs;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.on('update', this.onSceneUpdate, this);
		this.scene.events.on('create', this.onSceneCreate, this);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	backpack;
	/** @type {Phaser.GameObjects.Sprite} */
	itemSlotBox1;
	/** @type {Phaser.GameObjects.Sprite} */
	item1;
	/** @type {Phaser.GameObjects.Text} */
	itemCounter1;
	/** @type {Phaser.GameObjects.Sprite} */
	itemSlotBox2;
	/** @type {Phaser.GameObjects.Sprite} */
	item2;
	/** @type {Phaser.GameObjects.Text} */
	itemCounter2;
	/** @type {Phaser.GameObjects.Sprite} */
	itemSlotBox3;
	/** @type {Phaser.GameObjects.Sprite} */
	item3;
	/** @type {Phaser.GameObjects.Text} */
	itemCounter3;
	/** @type {Phaser.GameObjects.Sprite} */
	itemSlotBox4;
	/** @type {Phaser.GameObjects.Sprite} */
	item4;
	/** @type {Phaser.GameObjects.Text} */
	itemCounter4;
	/** @type {Phaser.GameObjects.Sprite} */
	itemSlotBox5;
	/** @type {Phaser.GameObjects.Sprite} */
	item5;
	/** @type {Phaser.GameObjects.Text} */
	itemCounter5;
	/** @type {Phaser.GameObjects.Sprite[]} */
	items;
	/** @type {Phaser.GameObjects.Text[]} */
	itemCounters;
	/** @type {Phaser.GameObjects.Sprite[]} */
	itemBoxs;

	/* START-USER-CODE */

	// Write your code here.

	activeIndex = -1;

	onSceneCreate(){
		this.items.map((item) => {
			item.visible = false;
			item.setInteractive({ useHandCursor: true });
		})

		this.itemCounters.map((counter) => {
			counter.visible = false;
		})

		this.itemBoxs.map((box,index) => {
			box.setInteractive({ useHandCursor: true });
			box.on('pointerdown', function (_pointer) {
				let otherBoxes = this.itemBoxs.filter((b) => b != box)
				if(box.frame.name == 0){
					otherBoxes.map((i) => i.setTexture("HudItemSlot", 0))
					box.setTexture("HudItemSlot", 1)
					this.activeIndex = index;
				}
			},this)
		})
	}

	onSceneUpdate() {
		if(this.visible == false) return;

		const cam = this.scene.cameras.main;

		let fullWidth = Math.floor(this.getBounds().width)
		let fullHeight = Math.floor(this.getBounds().height)

		let newX = cam.worldView.right - fullWidth - 20
		let newY = cam.worldView.bottom - fullHeight - 25

		this.setPosition(
			Phaser.Math.Linear(this.x, newX, 0.03),
			Phaser.Math.Linear(this.y, newY, 0.03),
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
