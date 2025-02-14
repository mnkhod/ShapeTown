// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MessagePrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? -0.04645841657811656, y ?? -0.002866411641057276);

		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.setSize(100, 89, false);

		// bg
		const bg = scene.add.image(150, 45, "MessageBox3");
		bg.scaleX = 0.35945619789439076;
		bg.scaleY = 0.35945619789439076;
		this.add(bg);

		// msg
		const msg = scene.add.text(150, 45, "", {});
		msg.scaleX = 1.0077466928617544;
		msg.scaleY = 1.0077466928617544;
		msg.setOrigin(0.5, 0.5);
		msg.text = "New text";
		msg.setStyle({ "align": "center", "color": "#000", "fixedWidth": 200, "fontFamily": "Little Malio 8-Bit", "fontSize": "20px", "maxLines": 3, "stroke": "#000" });
		msg.setLineSpacing(3);
		msg.setWordWrapWidth(200, true);
		this.add(msg);

		this.bg = bg;
		this.msg = msg;

		/* START-USER-CTR-CODE */
        this.isTyping = false;
        this.typeTimer = null;
        this.typingSpeed = 30;
        this.dialogue = null;
        this.isConversationStarted = false;
        this.conversationIndex = 0;
        this.conversationMaxIndex = 0;

        this.visible = false;
        this.scene.events.on('update', this.onSceneUpdate, this);
        bg.setInteractive({ useHandCursor: true });

        bg.on('pointerdown', this.handlePointerDown, this);

        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.isTyping) {
                this.skipTyping();
            }
        });
        /* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	bg;
	/** @type {Phaser.GameObjects.Text} */
	msg;

	/* START-USER-CODE */

    handlePointerDown(_pointer) {
        if (this.isConversationStarted == false) return;
        if (this.dialogue == null) return;

        if (this.isTyping) {
            this.skipTyping();
            return;
        }

        this.conversationIndex += 1;
        if (this.conversationIndex >= this.conversationMaxIndex) {
            this.hide();
            return;
        }

        let dialogue = this.dialogue[this.conversationIndex];
        this.typeText(dialogue.msg, () => {
            if (dialogue.onComplete != null) {
                dialogue.onComplete();
            }
        });
    }

    onSceneUpdate() {
        if (this.visible) {
            const cam = this.scene.cameras.main;
            let fullWidth = Math.floor(this.getBounds().width);
            let fullHeight = Math.floor(this.getBounds().height);
            let newX = cam.worldView.centerX - (fullWidth / 2) + 10;
            let newY = cam.worldView.centerY + fullHeight-10;

            this.setPosition(
                Phaser.Math.Linear(this.x, newX, 0.08),
                Phaser.Math.Linear(this.y, newY, 0.08),
            );
        }
    }

    typeText(text, onComplete) {
        this.isTyping = true;
        this.msg.setText('');

        let currentChar = 0;

        this.typeTimer = this.scene.time.addEvent({
            delay: this.typingSpeed,
            callback: () => {
                if (currentChar < text.length) {
                    this.msg.text += text[currentChar];
                    currentChar++;
                } else {
                    this.typeTimer.destroy();
                    this.isTyping = false;
                    if (onComplete) onComplete();
                }
            },
            repeat: text.length - 1
        });
    }

    skipTyping() {
        if (this.typeTimer) {
            this.typeTimer.destroy();
            this.msg.setText(this.dialogue[this.conversationIndex].msg);
            this.isTyping = false;
            if (this.dialogue[this.conversationIndex].onComplete) {
                this.dialogue[this.conversationIndex].onComplete();
            }
        }
    }

    conversation(conversationData) {
        if (this.isConversationStarted) return;

        this.visible = true;
        this.dialogue = conversationData;
        this.isConversationStarted = true;
        this.conversationMaxIndex = conversationData.length;
        this.conversationIndex = 0;

        let dialogue = conversationData[this.conversationIndex];
        this.typeText(dialogue.msg, () => {
            if (dialogue.onComplete != null) {
                dialogue.onComplete();
            }
        });
    }

    show() {
        this.visible = true;
    }

    hide() {
        if (this.typeTimer) {
            this.typeTimer.destroy();
        }
        this.visible = false;
        this.isConversationStarted = false;
        this.conversationIndex = 0;
        this.dialogue = null;
        this.isTyping = false;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here