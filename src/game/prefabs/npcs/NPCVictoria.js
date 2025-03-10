// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
// Quest-related imports
/* END-USER-IMPORTS */

export default class NPCVictoria extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 48, y ?? 48, texture || "NPC Victoria", frame ?? 0);

		this.scaleX = 1.5;
		this.scaleY = 1.5;

		/* START-USER-CTR-CODE */
		// Setup quest properties
		// this.questId = "005"; // Adventure Quest ID
		// this.name = "Victoria";
		// this.questIndicator = null;
		
		// Initialize with scene events
		scene.events.on('create', this.prefabCreateCycle, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	// Quest-related properties
	questDialogues = {
		default: "Hello there! I've been having trouble with monsters at the beach. Can you help me?",
		questActive: "Those monsters have been scaring away visitors. Please help clear the beach!",
		questCompleted: "Thank you for clearing out those monsters! The beach is safe again.",
		reward: "Here's your reward: 50 gold coins. Come back tomorrow for more work!"
	};

	// Initialize the NPC functionality
	prefabCreateCycle() {
		console.log("Victoria NPC create cycle started");
		
		// Make the NPC interactive
		this.setInteractive({ useHandCursor: true });
		
		// Link player reference
		this.player = this.scene.playerPrefab;
		
		// Link message prefab
		this.msgPrefab = this.scene.messagePrefab;
		
		// Setup hover effect
		this.on('pointerover', function (_pointer) {
			this.preFX.addGlow(16777215, 4, 0, false);
		});
		
		this.on('pointerout', function (_pointer) {
			this.preFX.clear();
		});
		
		// Setup click interaction
		this.on('pointerdown', function (_pointer) {
			console.log("Victoria NPC clicked");
			
			// Check distance to player
			// Use this.player first (from prefab), then try scene.playerPrefab as backup
			const playerRef = this.player || this.scene.playerPrefab;
			
			console.log("Player reference:", playerRef ? "Found" : "Not found");
			console.log("Victoria position:", this.x, this.y);
			if (playerRef) {
				console.log("Player position:", playerRef.x, playerRef.y);
			}
			
			const distance = this.getDistance(playerRef, this);
			console.log("Distance to player:", distance);
			
			// Use a larger interaction distance to be safe
			if (distance > 200) {
				if (this.scene.alertPrefab) {
					this.scene.alertPrefab.alert("Too Far");
				}
				return;
			}
			
			// Get quest system reference
			const questSystem = this.scene.game.questSystem || window.questSystem;
			if (!questSystem) {
				console.error("Quest system not found");
				this.showSimpleDialogue("Sorry, I'm having trouble with my quests right now.");
				return;
			}
			
			// Check quest status
			const isQuestActive = questSystem.isQuestActive(this.questId);
			const isQuestCompleted = questSystem.isQuestCompleted(this.questId);
			const quest = questSystem.quests[this.questId];
			
			// Determine dialogue based on quest status
			let dialogueMessage = "";
			let questActionRequired = false;
			
			if (isQuestCompleted) {
				dialogueMessage = this.questDialogues.questCompleted;
			} else if (!isQuestActive) {
				// Check if quest can be activated (prerequisites met)
				const prereqId = "002"; // Based on your quest data
				if (questSystem.isQuestCompleted(prereqId)) {
					dialogueMessage = this.questDialogues.default;
					questActionRequired = true;
				} else {
					// Prerequisites not met
					dialogueMessage = "I have something for you to do, but you should speak with Jack first.";
				}
			} else if (quest) {
				const allMonsterSubtaskCompleted = quest.subtasks["005-3"] ? quest.subtasks["005-3"].completed : false;
				const reportedBack = quest.subtasks["005-4"] ? quest.subtasks["005-4"].completed : false;
				
				if (allMonsterSubtaskCompleted && !reportedBack) {
					// Player has killed all monsters but hasn't reported back
					dialogueMessage = this.questDialogues.reward;
					questActionRequired = true;
				} else {
					// Quest in progress, show active dialogue
					dialogueMessage = this.questDialogues.questActive;
					
					// Mark "Meet Victoria" subtask as completed if it's not
					if (quest.subtasks["005-1"] && !quest.subtasks["005-1"].completed) {
						questSystem.updateSubtask(this.questId, "005-1", true);
					}
				}
			}
			
			// Create dialogue structure
			const dialogueLines = this.createDialogueLines(dialogueMessage, questActionRequired, questSystem, isQuestActive);
			
			// Show dialogue using conversation system
			// First try this.msgPrefab (from prefab)
			if (this.msgPrefab && this.msgPrefab.conversation) {
				this.msgPrefab.conversation(dialogueLines);
			} 
			// Then try scene.messagePrefab
			else if (this.scene.messagePrefab && this.scene.messagePrefab.conversation) {
				this.scene.messagePrefab.conversation(dialogueLines);
			} 
			else {
				console.error("No conversation system found");
				// Fallback to simple text display
				this.showSimpleDialogue(dialogueMessage);
			}
			if (this.scene.markNPCGreeted) {
				this.scene.markNPCGreeted("Victoria");
			}
		}, this);
		
		// Add quest indicator
		this.setupQuestIndicator();
		
		// Connect to quest system events
		this.scene.events.on('quest:updated', this.handleQuestUpdated, this);
		this.scene.events.on('quest:completed', this.handleQuestCompleted, this);
	}
	
	// Create dialogue structure for conversation system
	createDialogueLines(mainMessage, questActionRequired, questSystem, isQuestActive) {
		if (questActionRequired) {
			// Special dialogue with quest action
			return [
				{
					msg: mainMessage,
					options: [
						{
							text: isQuestActive ? "I've cleared the monsters" : "I'll help with those monsters",
							onSelect: () => {
								// Handle quest action
								if (isQuestActive) {
									this.completeQuest(questSystem);
								} else {
									this.activateQuest(questSystem);
								}
							},
							nextDialogue: 1
						},
						{
							text: "Not right now",
							nextDialogue: [
								{ msg: "Alright then, come back when you're ready." }
							]
						}
					]
				},
				{ msg: "Thank you for your help with the beach monsters!" }
			];
		} else {
			// Simple dialogue without quest action
			return [
				{
					msg: mainMessage,
					options: [
						{
							text: "Goodbye",
							nextDialogue: [
								{ msg: "See you around!" }
							]
						}
					]
				}
			];
		}
	}
	
	// Setup quest indicator
	setupQuestIndicator() {
		if (this.questIndicator) return;
		
		// Add quest indicator above NPC
		this.questIndicator = this.scene.add.image(
			this.x, 
			this.y - 60, 
			'NPCDialoguePopUpMainQuestSheet'
		).setVisible(false).setDepth(100);
		
		// Update indicator state
		this.updateQuestIndicator();
	}
	
	// Update quest marker when quest status changes
	handleQuestUpdated(data) {
		if (data.questId === this.questId) {
			this.updateQuestIndicator();
		}
	}
	
	// Update when quest is completed
	handleQuestCompleted(data) {
		if (data.questId === this.questId) {
			this.updateQuestIndicator();
		}
	}
	
	// Activate the quest
	activateQuest(questSystem) {
		// Activate the quest in the quest system
		questSystem.activateQuest(this.questId);
		
		// Show alert for quest activation
		if (this.scene.alertPrefab) {
			this.scene.alertPrefab.alert("New Quest: Adventure Quest");
		}
		
		// Update the quest indicator
		this.updateQuestIndicator();
	}
	
	// Complete the quest
	completeQuest(questSystem) {
		// Mark the "Report Back" subtask as completed
		questSystem.updateSubtask(this.questId, "005-4", true);
		
		// Add gold reward
		if (this.scene.gold !== undefined) {
			this.scene.gold += 50; // Daily reward of 50g
			
			// Update UI if needed
			if (this.scene.newItemHudPrefab && this.scene.newItemHudPrefab.updateGold) {
				this.scene.newItemHudPrefab.updateGold(this.scene.gold);
			}
		}
		
		// Show alert for quest completion
		if (this.scene.alertPrefab) {
			this.scene.alertPrefab.alert("Quest Completed: Adventure Quest");
		}
		
		// Update the quest indicator
		this.updateQuestIndicator();
	}
	
	// Fallback simple dialogue method
	showSimpleDialogue(text) {
		if (this.scene.messagePrefab) {
			this.scene.messagePrefab.setText(`Victoria: ${text}`);
			this.scene.messagePrefab.setVisible(true);
		} else {
			console.log(`Victoria: ${text}`);
		}
	}
	
	// Update quest indicator appearance
	updateQuestIndicator() {
		if (!this.questIndicator) return;
		
		const questSystem = this.scene.game.questSystem || window.questSystem;
		if (!questSystem) return;
		
		const isQuestActive = questSystem.isQuestActive(this.questId);
		const isQuestCompleted = questSystem.isQuestCompleted(this.questId);
		const quest = questSystem.quests[this.questId];
		
		// Quest is active and "Report Back" subtask is ready to be completed
		if (isQuestActive && quest && 
			quest.subtasks["005-3"] && quest.subtasks["005-3"].completed && 
			quest.subtasks["005-4"] && !quest.subtasks["005-4"].completed) {
		} 
		else {
			this.questIndicator.setVisible(false);
		}
	}
	
	// Check if prerequisites are met to activate quest
	canActivateQuest(questSystem) {
		const prereqId = "002"; // Based on your quest data
		return questSystem.isQuestCompleted(prereqId);
	}
	
	// Calculate distance between two game objects
	getDistance(texture1, texture2) {
		if (!texture1 || !texture2) return Infinity;
		
		return Phaser.Math.Distance.Between(
			texture1.x,
			texture1.y,
			texture2.x,
			texture2.y
		);
	}
	
	// Override update method to keep quest indicator in sync
	update() {
		// Update quest indicator position
		if (this.questIndicator) {
			this.questIndicator.x = this.x;
			this.questIndicator.y = this.y - 60;
		}
	}
	
	// Clean up when being destroyed
	destroy(fromScene) {
		// Remove event listeners
		if (this.scene) {
			this.scene.events.off('quest:updated', this.handleQuestUpdated, this);
			this.scene.events.off('quest:completed', this.handleQuestCompleted, this);
		}
		
		// Clean up quest indicator
		if (this.questIndicator) {
			this.questIndicator.destroy();
		}
		
		// Call parent destroy
		super.destroy(fromScene);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here