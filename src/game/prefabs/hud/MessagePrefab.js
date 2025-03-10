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
        this.optionsContainer = scene.add.container(150, 0);
        this.add(this.optionsContainer);
        this.optionTexts = [];
        this.currentSelectedOption = -1;
        this.hasOptions = false;

        this.setDepth(1000);
        
        this.visible = false;
        this.scene.events.on('update', this.onSceneUpdate, this);
        bg.setInteractive({ useHandCursor: true });

        bg.on('pointerdown', this.handlePointerDown, this);

        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.isTyping) {
                this.skipTyping();
            }
        });
        
        this.scene.input.keyboard.on('keydown-DOWN', () => {
            if (this.hasOptions) {
                this.selectNextOption();
            }
        });

        this.scene.input.keyboard.on('keydown-UP', () => {
            if (this.hasOptions) {
                this.selectPreviousOption();
            }
        });

        this.scene.input.keyboard.on('keydown-ENTER', () => {
            if (this.hasOptions && this.currentSelectedOption >= 0) {
                this.selectOption(this.currentSelectedOption);
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
        if (!this.isConversationStarted || !this.dialogue) return;

        if (this.isTyping) {
            this.skipTyping();
            return;
        }
        
        if (this.hasOptions) return;

        this.conversationIndex++;
        if (this.conversationIndex >= this.conversationMaxIndex) {
            this.hide();
            return;
        }

        let dialogue = this.dialogue[this.conversationIndex];
        this.typeText(dialogue.msg, () => {
            if (dialogue.options) {
                this.showOptions(dialogue.options);
            }
            if (dialogue.onComplete) {
                dialogue.onComplete();
            }
        });
    }

    onSceneUpdate() {
        if (this.visible) {
            const cam = this.scene.cameras.main;
            let fullWidth = Math.floor(this.getBounds().width);
            let newX = cam.worldView.centerX - (fullWidth / 2) + 10;
            let newY = cam.worldView.centerY + 60;

            this.setPosition(
                Phaser.Math.Linear(this.x, newX, 0.08),
                Phaser.Math.Linear(this.y, newY, 0.08),
            );
        }
    }

    typeText(text, onComplete) {
        this.isTyping = true;
        this.msg.setText('');
        
        if (text.length > 100) {
            this.msg.setStyle({ 
                "align": "center", 
                "color": "#000", 
                "fixedWidth": 200, 
                "fontFamily": "Little Malio 8-Bit", 
                "fontSize": "16px", 
                "maxLines": 5, 
                "stroke": "#000" 
            });
        } else {
            this.msg.setStyle({ 
                "align": "center", 
                "color": "#000", 
                "fixedWidth": 200, 
                "fontFamily": "Little Malio 8-Bit", 
                "fontSize": "20px", 
                "maxLines": 3, 
                "stroke": "#000" 
            });
        }

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
            
            const dialogue = this.dialogue[this.conversationIndex];
            if (dialogue.options) {
                this.showOptions(dialogue.options);
            }
            if (dialogue.onComplete) {
                dialogue.onComplete();
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
        
        if (dialogue.msg === "" && dialogue.options) {
            this.msg.setText("");
            this.showOptions(dialogue.options);
            if (dialogue.onComplete) dialogue.onComplete();
        } else {
            this.typeText(dialogue.msg, () => {
                if (dialogue.options) {
                    this.showOptions(dialogue.options);
                }
                if (dialogue.onComplete) {
                    dialogue.onComplete();
                }
            });
        }
    }

    showOptions(options) {
        this.clearOptions();
        this.hasOptions = true;

        this.msg.setY(20);
        
        const optionStartY = 40;
        const spacing = 16;
        
        options.forEach((option, index) => {
            const optionText = this.scene.add.text(0, optionStartY + (index * spacing), `  ${option.text}`, {
                fontFamily: "Little Malio 8-Bit",
                fontSize: "14px", 
                color: "#fff",
                stroke: "#000",
                strokeThickness: 2,
                align: "center"
            });
            
            optionText.setOrigin(0.5, 0.5);
            optionText.setInteractive({ useHandCursor: true });
            
            optionText.on('pointerover', () => {
                this.highlightOption(index);
            });
            
            optionText.on('pointerout', () => {
                if (this.currentSelectedOption !== index) {
                    this.unhighlightOption(index);
                }
            });
            
            optionText.on('pointerdown', () => {
                this.selectOption(index);
            });
            
            optionText.optionData = option;
            
            this.optionsContainer.add(optionText);
            this.optionTexts.push({
                text: optionText,
                originalText: option.text
            });
        });
        
        if (this.optionTexts.length > 0) {
            this.currentSelectedOption = 0;
            this.highlightOption(0);
        }
    }
    
    clearOptions() {
        this.hasOptions = false;
        this.currentSelectedOption = -1;
        
        this.msg.setY(45);
        
        this.optionTexts.forEach(option => {
            if (option.text) {
                option.text.destroy();
            }
        });
        
        this.optionTexts = [];
        this.optionsContainer.removeAll();
    }
    
    highlightOption(index) {
        if (index >= 0 && index < this.optionTexts.length) {
            const option = this.optionTexts[index];
            if (option && option.text) {
                option.text.setText(`> ${option.originalText}`);
                option.text.setColor("#ffff00");
            }
        }
    }
    
    unhighlightOption(index) {
        if (index >= 0 && index < this.optionTexts.length) {
            const option = this.optionTexts[index];
            if (option && option.text) {
                option.text.setText(`  ${option.originalText}`);
                option.text.setColor("#fff");
            }
        }
    }
    
    selectNextOption() {
        if (this.optionTexts.length === 0) return;
        
        if (this.currentSelectedOption >= 0) {
            this.unhighlightOption(this.currentSelectedOption);
        }
        
        this.currentSelectedOption = (this.currentSelectedOption + 1) % this.optionTexts.length;
        this.highlightOption(this.currentSelectedOption);
    }
    
    selectPreviousOption() {
        if (this.optionTexts.length === 0) return;
        
        if (this.currentSelectedOption >= 0) {
            this.unhighlightOption(this.currentSelectedOption);
        }
        
        this.currentSelectedOption = (this.currentSelectedOption - 1 + this.optionTexts.length) % this.optionTexts.length;
        this.highlightOption(this.currentSelectedOption);
    }
    
    selectOption(index) {
        if (index >= 0 && index < this.optionTexts.length) {
            const option = this.optionTexts[index];
            
            option.text.setColor("#ffffff");
            
            this.scene.time.delayedCall(150, () => {
                const optionData = option.text.optionData;
                
                this.clearOptions();
                this.msg.setY(45);
                
                if (optionData.onSelect) {
                    optionData.onSelect();
                }
                
                if (optionData.nextDialogue !== undefined) {
                    if (typeof optionData.nextDialogue === 'number') {
                        this.conversationIndex = optionData.nextDialogue - 1;
                        this.handlePointerDown(null);
                    } 
                    else if (Array.isArray(optionData.nextDialogue)) {
                        this.dialogue = optionData.nextDialogue;
                        this.conversationMaxIndex = this.dialogue.length;
                        this.conversationIndex = 0;
                        
                        const dialogue = this.dialogue[this.conversationIndex];
                        this.typeText(dialogue.msg, () => {
                            if (dialogue.options) {
                                this.showOptions(dialogue.options);
                            }
                            if (dialogue.onComplete) {
                                dialogue.onComplete();
                            }
                        });
                    }
                }
            });
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        if (this.typeTimer) {
            this.typeTimer.destroy();
        }
        this.clearOptions();
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