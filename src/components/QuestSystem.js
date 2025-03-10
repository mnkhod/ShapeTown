import { EventEmitter } from 'events';

class QuestSystem extends EventEmitter {
  constructor() {
    super();
    
    if (!QuestSystem.instance) {
      this.initializeSystem();
      QuestSystem.instance = this;
    }
    
    return QuestSystem.instance;
  }
  
  initializeSystem() {
    this.quests = {};
    this.activeQuests = new Set();
    this.completedQuests = new Set();
    this.playerProgress = {};
    
    this.initializeQuestData();
  }
  
  initializeQuestData() {
    this.quests = {
      "001": {
        id: "001",
        title: "The First Harvest",
        description: "Learn the basics of farming",
        category: "Main Quest",
        location: "Farm area",
        prerequisites: "none",
        questGiver: "NPC Jack",
        completed: false,
        active: true,
        subtasks: {
          "001-1": { id: "001-1", text: "Use a Pickaxe to remove rocks.", completed: false },
          "001-2": { id: "001-2", text: "Prepare the ground to plant seeds. Use a Hoe tool to get Soil.", completed: false },
          "001-3": { id: "001-3", text: "Plant carrot seeds. Select a bag of seeds, click on already prepared soil.", completed: false },
          "001-4": { id: "001-4", text: "Water the planted seed. Select the watering can to water, click on soil planted with seed.", completed: false },
          "001-5": { id: "001-5", text: "Harvest the goods. Click on already grown carrot.", completed: false },
          "001-6": { id: "001-6", text: "Go back to meet Jack.", completed: false }
        },
        reward: "Pickaxe, Hoe, Watering Can, Carrot seeds x5"
      },
      "002": {
        id: "002",
        title: "Taste of Gold",
        description: "Learn about trading in Shape Town",
        category: "Main Quest",
        location: "Farm and Town area",
        prerequisites: "#001",
        questGiver: "NPC Jack",
        completed: false,
        active: false,
        subtasks: {
          "002-1": { id: "002-1", text: "Go meet NPC Jack", completed: false },
          "002-2": { id: "002-2", text: "Go to Shape Town", completed: false },
          "002-3": { id: "002-3", text: "Find and meet NPC Lady Lydia", completed: false },
          "002-4": { id: "002-4", text: "Sell items from NPC Jack", completed: false }
        },
        reward: "Taste of gold achievement + 1000 gold"
      },
      "003": {
        id: "003",
        title: "Good Invitation",
        description: "Get to know the townspeople",
        category: "Main Quest",
        location: "Farm, Town, Beach",
        prerequisites: "#002",
        questGiver: "Game System",
        completed: false,
        active: false,
        subtasks: {
          "003-1": { id: "003-1", text: "Go greeting with everyone in town NPCs", completed: false }
        },
        reward: "Good Invitation achievement"
      },
      "004": {
        id: "004",
        title: "Master of the Fields",
        description: "Become a farming expert",
        category: "Main Quest",
        location: "Farm area",
        prerequisites: "#002 Have to meet NPC Lily",
        questGiver: "Game System",
        completed: false,
        active: false,
        subtasks: {
          "004-1": { id: "004-1", text: "Successfully grow one of each crop type", completed: false }
        },
        reward: "Open next tier item on Farming"
      },
      "005": {
        id: "005",
        title: "Adventure Quest",
        description: "Help Victoria with a monster problem",
        category: "Daily Quest",
        location: "Beach area",
        prerequisites: "#002 Have to meet NPC Victoria",
        questGiver: "NPC Victoria",
        completed: false,
        active: false,
        subtasks: {
          "005-1": { id: "005-1", text: "Meet the NPC Victoria", completed: false },
          "005-2": { id: "005-2", text: "Go to the beach", completed: false },
          "005-3": { id: "005-3", text: "Kill all of the Monsters", completed: false },
          "005-4": { id: "005-4", text: "Report Back to NPC Victoria", completed: false }
        },
        reward: "Everyday 50g"
      },
      "006": {
        id: "006",
        title: "Goblin Slayer",
        description: "Clear the South Hill of goblins",
        category: "Daily Quest",
        location: "South Hill",
        prerequisites: "#002 Have to meet NPC Commander Rowan",
        questGiver: "NPC Rowan",
        completed: false,
        active: false,
        subtasks: {
          "006-1": { id: "006-1", text: "Meet the NPC Commander Rowan", completed: false },
          "006-2": { id: "006-2", text: "Go to the South Hill", completed: false },
          "006-3": { id: "006-3", text: "Kill all of the Goblins", completed: false },
          "006-4": { id: "006-4", text: "Report Back to NPC Commander Rowan", completed: false }
        },
        reward: "15g each Goblin ear"
      },
      "007": {
        id: "007",
        title: "Treasure From Sea",
        description: "Collect seashells for Lydia",
        category: "Daily Quest",
        location: "Beach area",
        prerequisites: "#002 Have to meet NPC Lydia",
        questGiver: "NPC Lydia",
        completed: false,
        active: false,
        subtasks: {
          "007-1": { id: "007-1", text: "Meet the NPC Lydia", completed: false },
          "007-2": { id: "007-2", text: "Go to the beach", completed: false },
          "007-3": { id: "007-3", text: "Collect the seashells from the beach", completed: false },
          "007-4": { id: "007-4", text: "Back to meet NPC Lydia", completed: false }
        },
        reward: "15g each seashell"
      },
      "008": {
        id: "008",
        title: "Yam, Yam",
        description: "Learn to cook with carrots",
        category: "Side Quest",
        location: "Town area",
        prerequisites: "#002",
        questGiver: "NPC Lily",
        completed: false,
        active: false,
        subtasks: {
          "008-1": { id: "008-1", text: "Cook \"Carrot Soup\" using a recipe from NPC Lily", completed: false }
        },
        reward: "Yam, Yam achievement, Recipe: Steamed Carrot"
      }
    };
    
    this.activeQuests.add("001");
  }
  
  getQuestProgress() {
    const progress = {};
    
    Object.values(this.quests).forEach(quest => {
      progress[quest.id] = {
        completed: quest.completed,
        subtasks: {}
      };
      
      Object.values(quest.subtasks).forEach(subtask => {
        progress[quest.id].subtasks[subtask.id] = subtask.completed;
      });
    });
    
    return progress;
  }
  
  updateQuestProgress(update) {
    const questId = Object.keys(update)[0];
    const quest = this.quests[questId];
    
    if (!quest) return;
    
    if (update[questId].subtasks) {
      Object.entries(update[questId].subtasks).forEach(([subtaskId, completed]) => {
        this.updateSubtask(questId, subtaskId, completed);
      });
    }
  }
  
  updateSubtask(questId, subtaskId, completed = true) {
    console.log(`Attempting to update subtask ${questId}-${subtaskId} to ${completed}`);
    
    if (!this.isQuestActive(questId)) {
      console.warn(`Cannot update subtask: Quest ${questId} is not active`);
      return;
    }
    
    const quest = this.quests[questId];
    if (!quest) {
      console.warn(`Cannot update subtask: Quest ${questId} not found`);
      return;
    }
    
    const subtask = quest.subtasks[subtaskId];
    if (!subtask) {
      console.warn(`Cannot update subtask: Subtask ${subtaskId} not found in quest ${questId}`);
      return;
    }
    
    subtask.completed = completed;
    console.log(`Updated subtask ${questId}-${subtaskId} to ${completed}`);
    
    const allCompleted = Object.values(quest.subtasks).every(st => st.completed);
    
    if (allCompleted) {
      this.completeQuest(questId);
    }
    
    this.emit('quest:updated', {
      questId,
      subtaskId,
      completed: subtask.completed,
      questCompleted: allCompleted
    });
    
    return allCompleted;
  }
  
  completeQuest(questId) {
    const quest = this.quests[questId];
    if (!quest) return;
    
    quest.completed = true;
    this.activeQuests.delete(questId);
    this.completedQuests.add(questId);
    
    console.log(`Quest ${questId} completed!`);
    
    this.checkQuestPrerequisites();
    
    this.emit('quest:completed', { questId });
  }
  
  activateQuest(questId) {
    const quest = this.quests[questId];
    if (!quest) return;
    
    quest.active = true;
    this.activeQuests.add(questId);
    
    console.log(`Quest ${questId} activated!`);
    
    // Reset any incomplete subtasks when activating the quest
    Object.values(quest.subtasks).forEach(subtask => {
      if (!subtask.completed) {
        subtask.completed = false;
      }
    });
    
    this.emit('quest:activated', { questId });
  }
  
  checkQuestPrerequisites() {
    Object.values(this.quests).forEach(quest => {
      if (quest.completed || quest.active) return;
      
      const prereq = quest.prerequisites;
      if (prereq === "none") {
        this.activateQuest(quest.id);
        return;
      }
      
      if (prereq.startsWith('#')) {
        const prereqId = prereq.substring(1);
        if (this.isQuestCompleted(prereqId)) {
          this.activateQuest(quest.id);
        }
      }
    });
  }
  
  isQuestActive(questId) {
    return this.activeQuests.has(questId);
  }
  
  isQuestCompleted(questId) {
    return this.completedQuests.has(questId);
  }
  
  getActiveQuests() {
    return Array.from(this.activeQuests).map(id => this.quests[id]);
  }
  
  getCompletedQuests() {
    return Array.from(this.completedQuests).map(id => this.quests[id]);
  }
  
  getAllQuests() {
    return Object.values(this.quests);
  }
  
  registerScenes(scenes) {
    this.scenes = scenes;
  }
  
  handleEvent(eventName, params) {
    console.log("Quest event received:", eventName, params);
    
    // Handle events based on event type
    switch (eventName) {
      // --- Quest #001: The First Harvest ---
      case 'harvest:rockRemoved':
        this.updateSubtask("001", "001-1");
        break;
        
      case 'harvest:groundHoed':
        this.updateSubtask("001", "001-2");
        break;
        
      case 'harvest:seedPlanted':
        if (params.crop === 'CARROT' || params.seed === 'CARROT') {
          this.updateSubtask("001", "001-3");
        }
        break;
        
      case 'harvest:cropWatered':
        this.updateSubtask("001", "001-4");
        break;
        
      case 'harvest:cropHarvested':
        if (params.crop === 'CARROT') {
          this.updateSubtask("001", "001-5");
        }
        break;
        
      case 'npc:jackInteraction':
        // Handle Jack interaction for Quest #001
        const harvestStep = this.quests["001"]?.subtasks["001-5"];
        if (harvestStep && harvestStep.completed) {
          this.updateSubtask("001", "001-6");
        }
        
        // Handle Jack interaction for Quest #002
        if (this.isQuestActive("002") && !this.quests["002"].subtasks["002-1"].completed) {
          console.log("Completing subtask 002-1: Go meet NPC Jack");
          this.updateSubtask("002", "002-1");
        }
        break;
        
      // --- Quest #002: Taste of Gold ---
      case 'quest:taste-of-gold-activated':
        if (!this.isQuestActive("002") && !this.isQuestCompleted("002")) {
          console.log("Activating Taste of Gold quest");
          this.activateQuest("002");
          
          // Show notification
          if (params.scene && params.scene.alertPrefab) {
            params.scene.alertPrefab.alert("New Quest: Taste of Gold");
          } else if (params.npc && params.npc.scene && params.npc.scene.alertPrefab) {
            params.npc.scene.alertPrefab.alert("New Quest: Taste of Gold");
          }
        }
        break;
        
      case 'player:enteredTown':
        if (this.isQuestActive("002")) {
          console.log("Completing subtask 002-2: Go to Shape Town");
          this.updateSubtask("002", "002-2");
          
          // Show notification
          if (params.scene && params.scene.alertPrefab) {
            params.scene.alertPrefab.alert("Quest Updated: Entered Town");
          }
        }
        break;
        
      case 'npc:lydiaInteraction':
        if (this.isQuestActive("002")) {
          console.log("Completing subtask 002-3: Meet Lady Lydia");
          this.updateSubtask("002", "002-3");
          
          // Show notification
          if (params.scene && params.scene.alertPrefab) {
            params.scene.alertPrefab.alert("Quest Updated: Met Lady Lydia");
          }
        }
        break;
        
      case 'quest:sold-items-to-lydia':
        if (this.isQuestActive("002") && !this.quests["002"].subtasks["002-4"].completed) {
          console.log("Completing subtask 002-4: Sell items from NPC Jack");
          this.updateSubtask("002", "002-4");
          
          // Add gold reward when quest is complete
          if (params.scene && params.scene.gold !== undefined) {
            params.scene.gold += 1000;
            console.log("Added 1000 gold reward");
          } else if (params.npc && params.npc.scene && params.npc.scene.gold !== undefined) {
            params.npc.scene.gold += 1000;
            console.log("Added 1000 gold reward");
          }
          
          // Show notification
          if (params.scene && params.scene.alertPrefab) {
            params.scene.alertPrefab.alert("Quest Complete: Taste of Gold");
          } else if (params.npc && params.npc.scene && params.npc.scene.alertPrefab) {
            params.npc.scene.alertPrefab.alert("Quest Complete: Taste of Gold");
          }
          
          // Activate Quest #003 after completing #002
          if (this.isQuestCompleted("002")) {
            this.activateQuest("003");
            console.log("Quest #003 activated: Good Invitation");
          }
        }
        break;
        
        
      // --- Quest #003: Good Invitation ---
      case 'npc:allGreeted':
        if (this.isQuestActive("003")) {
          this.updateSubtask("003", "003-1");
          console.log("Quest 003: Greeted all NPCs");
        }
        break;
        
      default:
        console.log(`No specific handling for event: ${eventName}`);
        break;
    }
  }
}

const questSystem = new QuestSystem();

export default questSystem;

export function extendSceneWithQuests(scene) {
  if (typeof scene === 'function') {
    const SceneClass = scene;
    const originalCreate = SceneClass.prototype.create;
    const originalUpdate = SceneClass.prototype.update;
    
    SceneClass.prototype.create = function() {
      if (originalCreate) {
        originalCreate.call(this);
      }
      
      setupQuestFunctionalityForScene(this);
    };
    
    SceneClass.prototype.update = function(time, delta) {
      if (originalUpdate) {
        originalUpdate.call(this, time, delta);
      }
      
      if (this.updateQuestUI) {
        this.updateQuestUI();
      }
    };
    
    SceneClass.prototype.setupQuestUI = function() {
      // Implementation as before...
    };
    
    SceneClass.prototype.updateQuestUI = function() {
      // Implementation as before...
    };
    
    SceneClass.prototype.showQuestNotification = function(message) {
      // Implementation as before...
    };
    
    SceneClass.prototype.triggerQuestEvent = function(eventName, params = {}) {
      // Implementation as before...
    };
    
    return SceneClass;
  } 
  else {
    const instance = scene;
    
    setupQuestFunctionalityForScene(instance);
    
    instance.setupQuestUI = function() {
      // Implementation as before...
    };
    
    instance.updateQuestUI = function() {
      // Implementation as before...
    };
    
    instance.showQuestNotification = function(message) {
      console.log(`QUEST NOTIFICATION: ${message}`);
      
      if (this.alertPrefab && this.alertPrefab.alert) {
        this.alertPrefab.alert(message);
      }
    };
    
    instance.triggerQuestEvent = function(eventName, params = {}) {
      console.log(`Triggering quest event: ${eventName}`, params);
      
      // Add scene reference to params
      params.scene = this;
      
      questSystem.handleEvent(eventName, params);
    };
    
    return instance;
  }
}

function setupQuestFunctionalityForScene(scene) {
  if (scene.setupQuestUI) {
    scene.setupQuestUI();
  }
  
  questSystem.registerScenes(scene);
  scene.questSystem = questSystem;
}

export function setupTownDetection(scene) {
  console.log("Setting up town detection for quest progress");
  
  // Create a zone that represents the town boundary
  const townZone = scene.add.zone(
    scene.townCenterX || 500, // Default value if townCenterX is not defined
    scene.townCenterY || 500, // Default value if townCenterY is not defined
    scene.townWidth || 600,   // Default town width
    scene.townHeight || 400   // Default town height
  );
  
  // Physics body for town zone
  scene.physics.world.enable(townZone);
  townZone.body.setAllowGravity(false);
  townZone.body.moves = false;
  
  // Create overlap detection with player
  scene.physics.add.overlap(
    scene.playerPrefab, 
    townZone, 
    () => {
      // Only trigger once
      if (!scene.playerEnteredTown) {
        scene.playerEnteredTown = true;
        
        if (scene.triggerQuestEvent) {
          console.log("Player entered town - triggering quest event");
          scene.triggerQuestEvent('player:enteredTown');
        } else {
          console.warn("triggerQuestEvent not available on scene");
        }
      }
    },
    null,
    scene
  );
  
  return townZone;
}

export function setupNPCGreetingTracking(scene) {
  // List of NPCs that need to be greeted
  const npcsToGreet = [
    "Jack", "Lydia", "Victoria", "Rowan", "Lily" 
  ];
  
  // Track which NPCs have been greeted
  scene.greetedNPCs = new Set();
  
  // Method to check if all NPCs have been greeted
  scene.checkAllNPCsGreeted = function() {
    if (npcsToGreet.every(npc => this.greetedNPCs.has(npc))) {
      // All NPCs have been greeted
      if (this.triggerQuestEvent) {
        this.triggerQuestEvent('npc:allGreeted');
        
        // Show notification
        if (this.alertPrefab) {
          this.alertPrefab.alert("Quest Completed: Good Invitation");
        }
      }
      return true;
    }
    return false;
  };
  
  // Method to mark an NPC as greeted
  scene.markNPCGreeted = function(npcName) {
    this.greetedNPCs.add(npcName);
    console.log(`Marked NPC ${npcName} as greeted`);
    
    // Check if all NPCs have been greeted
    this.checkAllNPCsGreeted();
    
    // Show notification
    if (this.alertPrefab) {
      this.alertPrefab.alert(`Greeted ${npcName}`);
    }
  };
  
  return {
    markNPCGreeted: (npcName) => scene.markNPCGreeted(npcName),
    checkAllNPCsGreeted: () => scene.checkAllNPCsGreeted()
  };
}

export function extendHarvestPrefab(HarvestPrefab) {
  const originalChangeState = HarvestPrefab.prototype.changeState;
  
  HarvestPrefab.prototype.changeState = function() {
    const prevState = this.state;
    
    originalChangeState.call(this);
    
    if (prevState !== this.state) {
      switch(this.state) {
        case "GROUND":
          if (prevState === "ROCK") {
            this.scene.triggerQuestEvent('harvest:rockRemoved', { harvest: this });
          }
          break;
        case "SOIL":
          if (prevState === "GROUND") {
            this.scene.triggerQuestEvent('harvest:groundHoed', { harvest: this });
          }
          break;
        case "PLANTED":
          this.scene.triggerQuestEvent('harvest:seedPlanted', { seed: this.seed, harvest: this });
          break;
        case "WATERED":
          this.scene.triggerQuestEvent('harvest:cropWatered', { seed: this.seed, harvest: this });
          break;
      }
    }
  };
  
  const originalPrefabCreateCycle = HarvestPrefab.prototype.prefabCreateCycle;
  
  HarvestPrefab.prototype.prefabCreateCycle = function() {
    originalPrefabCreateCycle.call(this);
    
    const originalPointerDown = this.listeners('pointerdown')[0];
    
    if (originalPointerDown) {
      this.off('pointerdown', originalPointerDown);
      
      this.on('pointerdown', function(_pointer) {
        if (this.isReadyForHarvest) {
          const cropType = this.seed;
          
          originalPointerDown.call(this, _pointer);
          
          if (this.scene.triggerQuestEvent) {
            this.scene.triggerQuestEvent('harvest:cropHarvested', { crop: cropType, harvest: this });
          }
          return;
        }
        
        originalPointerDown.call(this, _pointer);
      }, this);
    }
  };
  
  return HarvestPrefab;
}

export function extendJackNpc(OldManJackNpcPrefab) {
  const originalPrefabCreateCycle = OldManJackNpcPrefab.prototype.prefabCreateCycle;
  
  OldManJackNpcPrefab.prototype.prefabCreateCycle = function() {
    originalPrefabCreateCycle.call(this);
    
    if (this.npc) {
      const originalPointerDown = this.npc.listeners('pointerdown')[0];
      
      if (originalPointerDown) {
        this.npc.off('pointerdown', originalPointerDown);
        
        this.npc.on('pointerdown', async function(_pointer) {
          if (this.scene.triggerQuestEvent) {
            this.scene.triggerQuestEvent('npc:jackInteraction', { npc: this });
          }
          
          await originalPointerDown.call(this, _pointer);
        }, this);
      }
    }
  };
  
  return OldManJackNpcPrefab;
}