// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenQuest extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// quest_Book_Highligthed_V01
		const quest_Book_Highligthed_V01 = scene.add.image(12, 12, "Quest_Book_Highligthed_V01");
		quest_Book_Highligthed_V01.scaleX = 0.5;
		quest_Book_Highligthed_V01.scaleY = 0.5;
		this.add(quest_Book_Highligthed_V01);

		// quest_Book_V01
		const quest_Book_V01 = scene.add.image(12, 12, "Quest_Book_V01");
		quest_Book_V01.scaleX = 0.5;
		quest_Book_V01.scaleY = 0.5;
		this.add(quest_Book_V01);

		// q_ShortKeyLabel
		const q_ShortKeyLabel = scene.add.image(23, 23, "Q_ShortKeyLabel");
		q_ShortKeyLabel.scaleX = 0.5;
		q_ShortKeyLabel.scaleY = 0.5;
		this.add(q_ShortKeyLabel);

		// keyboard_q
		const keyboard_q = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

		this.quest_Book_Highligthed_V01 = quest_Book_Highligthed_V01;
		this.quest_Book_V01 = quest_Book_V01;
		this.q_ShortKeyLabel = q_ShortKeyLabel;
		this.keyboard_q = keyboard_q;

		/* START-USER-CTR-CODE */
        this.setSize(quest_Book_V01.width, quest_Book_V01.height);
        this.setInteractive({ useHandCursor: true });

        this.quest_Book_Highligthed_V01.visible = false;
        this.isKeyPressed = false;
        this.isQuestBookOpen = false;

        this.on('pointerover', this.handlePointerOver, this);
        this.on('pointerout', this.handlePointerOut, this);

        this.on('pointerdown', this.handleQuestBookOpen, this);

        this.scene.events.on('update', this.onSceneUpdate, this);

        if (this.scene.reactEvent) {
            this.scene.reactEvent.on('quest-sync', this.handleQuestSync, this);
            this.scene.reactEvent.on('quest-closed', () => {
                this.isQuestBookOpen = false;
            });
        }
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	quest_Book_Highligthed_V01;
	/** @type {Phaser.GameObjects.Image} */
	quest_Book_V01;
	/** @type {Phaser.GameObjects.Image} */
	q_ShortKeyLabel;
	/** @type {Phaser.Input.Keyboard.Key} */
	keyboard_q;
	/** @type {Phaser.GameObjects.GameObject} */
	player;

	/* START-USER-CODE */
    handlePointerOver() {
        this.quest_Book_Highligthed_V01.visible = true;
        this.quest_Book_V01.visible = false;
    }

    handlePointerOut() {
        this.quest_Book_Highligthed_V01.visible = false;
        this.quest_Book_V01.visible = true;
    }

    handleQuestBookOpen() {
        if (!this.scene.reactEvent) return;

        console.log('Opening quest book');

        this.scene.reactEvent.emit("show-quest-modal");
        this.isQuestBookOpen = true;
    }
    
    handleQuestBookClose() {
        if (!this.scene.reactEvent) return;

        this.isQuestBookOpen = false;
        this.scene.reactEvent.emit("close-quest-modal");
    }

    handleQuestSync(data) {
        if (!this.scene.reactEvent) return;

        console.log('Quest data synced:', data);
    }

    onSceneUpdate() {
        if (!this.visible) return;

        const cam = this.scene.cameras.main;
        let newX = cam.worldView.left + 20; 
        let newY = cam.worldView.bottom - 48;

        this.setPosition(
            Phaser.Math.Linear(this.x, newX, 1),
            Phaser.Math.Linear(this.y, newY, 1)
        );

        if (Phaser.Input.Keyboard.JustDown(this.keyboard_q)) {
            if (this.isQuestBookOpen) {
                this.handleQuestBookClose();
            } else {
                this.handleQuestBookOpen();
            }
        }
    }

    destroy() {
        if (this.scene.reactEvent) {
            this.scene.reactEvent.off('quest-sync', this.handleQuestSync, this);
        }
        this.scene.events.off('update', this.onSceneUpdate, this);
        super.destroy();
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here