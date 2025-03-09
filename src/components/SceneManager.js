// src/game/SceneManager.js
import { EventBus } from "../game/EventBus";
import { globalInventory } from "../components/GlobalInvetoryManager";

/**
 * Manages scene transitions and ensures inventory persistence
 * Handles syncing global inventory between scenes
 */
class SceneManager {
  constructor(game) {
    this.game = game;
    this.currentSceneName = null;
    this.activeScene = null;
    this.setupEventListeners();
    
    console.log('SceneManager initialized');
  }

  /**
   * Set up event listeners for scene management
   */
  setupEventListeners() {
    // Listen for scene changes via current-scene-ready event
    EventBus.on('current-scene-ready', (scene) => {
      this.handleSceneChange(scene);
    });
    
    // Monitor Phaser scene events for all scenes
    if (this.game && this.game.scene) {
      this.game.scene.scenes.forEach(scene => {
        // When scene shuts down (removed from display)
        scene.events.on('shutdown', () => {
          this.saveInventoryFromScene(scene);
        });
        
        // When scene goes to sleep (inactive but not destroyed)
        scene.events.on('sleep', () => {
          this.saveInventoryFromScene(scene);
        });
        
        // When scene wakes up (becomes active again)
        scene.events.on('wake', () => {
          setTimeout(() => {
            this.loadInventoryToScene(scene);
            EventBus.emit('scene-switched', scene);
          }, 100);
        });
        
        // When scene starts (first initialized)
        scene.events.on('start', () => {
          setTimeout(() => {
            this.loadInventoryToScene(scene);
            EventBus.emit('scene-switched', scene);
          }, 100);
        });
      });
    }
  }

  /**
   * Handle when a scene becomes active
   * @param {Object} scene - The scene that has become active
   */
  handleSceneChange(scene) {
    if (!scene) return;
    
    console.log(`Scene changed to: ${scene.scene.key}`);
    
    // Update tracking
    this.currentSceneName = scene.scene.key;
    this.activeScene = scene;
    
    // Load inventory to the new scene
    if (scene.newItemHudPrefab) {
      setTimeout(() => {
        this.loadInventoryToScene(scene);
        EventBus.emit('scene-switched', scene);
      }, 100);
    }
  }

  /**
   * Change to a different scene
   * @param {string} sceneName - Name of the scene to change to
   * @param {Object} data - Optional data to pass to the scene
   */
  changeScene(sceneName, data = {}) {
    if (!this.game) return;
    
    console.log(`Manually changing scene to: ${sceneName}`);
    
    // Save inventory from current scene first
    if (this.activeScene && this.activeScene.newItemHudPrefab) {
      this.saveInventoryFromScene(this.activeScene);
    }
    
    // Switch to the new scene
    if (this.currentSceneName) {
      this.game.scene.switch(this.currentSceneName, sceneName);
    } else {
      this.game.scene.start(sceneName, data);
    }
  }

  /**
   * Save inventory state from a specific scene
   * @param {Object} scene - The scene to save inventory from
   */
  saveInventoryFromScene(scene) {
    if (!scene || !scene.newItemHudPrefab) return;
    
    console.log(`Saving inventory from scene: ${scene.scene.key}`);
    
    try {
      if (scene.newItemHudPrefab.updateGlobalInventory) {
        scene.newItemHudPrefab.updateGlobalInventory();
      }
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  }

  /**
   * Load inventory state to a specific scene
   * @param {Object} scene - The scene to load inventory to
   */
  loadInventoryToScene(scene) {
    if (!scene || !scene.newItemHudPrefab) return;
    
    console.log(`Loading inventory to scene: ${scene.scene.key}`);
    
    try {
      if (scene.newItemHudPrefab.syncWithGlobalInventory) {
        scene.newItemHudPrefab.syncWithGlobalInventory();
      } else if (globalInventory.syncInventoryToScene) {
        globalInventory.syncInventoryToScene(scene);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  }

  /**
   * Get the current active scene
   * @returns {Object} The current active scene
   */
  getCurrentScene() {
    return this.activeScene;
  }
}

export default SceneManager;