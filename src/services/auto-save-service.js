import { debounce, throttle } from '../utils/debounce.js';
import { createCheckpoint } from '../lib/query-helper.ts';
import { inventoryService } from '../lib/inventory-service.ts';
import { EventBus } from '../game/EventBus.js';

class AutoSaveService {
  constructor() {
    this.isEnabled = false;
    this.user = null;
    this.sceneManagerRef = null;
    this.saveInProgress = false;
    this.saveQueue = [];

    // Debounced save - triggers after 5 seconds of inactivity
    this.debouncedSave = debounce(this.performSave.bind(this), 5000);

    // Throttled save - maximum once per 30 seconds for frequent changes
    this.throttledSave = throttle(this.performSave.bind(this), 30000);

    // Critical save - immediate save for important events
    this.criticalSave = this.performSave.bind(this);

    // Fallback interval save - every 5 minutes as backup
    this.fallbackInterval = null;

    // Store event handler references for cleanup
    this.eventHandlers = {
      inventoryChanged: () => this.requestSave(),
      inventorySynced: () => this.requestSave(),
      sceneChanged: () => this.requestCriticalSave(),
      questStarted: () => this.requestSave(),
      questCompleted: () => this.requestCriticalSave(),
      taskProgress: () => this.requestSave(),
      visibilityChange: () => {
        if (document.visibilityState === 'hidden') {
          this.requestCriticalSave();
        }
      },
      beforeUnload: () => this.requestCriticalSave()
    };
  }

  /**
   * Initialize the auto-save service
   * @param {Object} user - Authenticated user data
   * @param {Object} sceneManagerRef - Reference to scene manager
   */
  initialize(user, sceneManagerRef) {
    this.user = user;
    this.sceneManagerRef = sceneManagerRef;
    this.isEnabled = true;

    console.log('🔄 Auto-save service initialized');

    // Start fallback interval (every 5 minutes)
    this.startFallbackInterval();

    // Listen for game events that should trigger saves
    this.setupEventListeners();
  }

  /**
   * Shutdown the auto-save service
   */
  shutdown() {
    this.isEnabled = false;
    this.user = null;
    this.sceneManagerRef = null;

    if (this.fallbackInterval) {
      clearInterval(this.fallbackInterval);
      this.fallbackInterval = null;
    }

    this.removeEventListeners();
    console.log('🛑 Auto-save service shutdown');
  }

  /**
   * Trigger a debounced save (most common)
   */
  requestSave() {
    if (!this.isEnabled) return;
    this.debouncedSave();
  }

  /**
   * Trigger a throttled save for frequent events
   */
  requestFrequentSave() {
    if (!this.isEnabled) return;
    this.throttledSave();
  }

  /**
   * Trigger an immediate save for critical events
   */
  requestCriticalSave() {
    if (!this.isEnabled) return;
    this.criticalSave();
  }

  /**
   * Setup event listeners for auto-save triggers
   */
  setupEventListeners() {
    // Listen for game events that should trigger saves
    if (typeof window !== 'undefined') {
      EventBus.on('global-inventory-changed', this.eventHandlers.inventoryChanged);
      EventBus.on('inventory-synced', this.eventHandlers.inventorySynced);
      EventBus.on('scene-changed', this.eventHandlers.sceneChanged);

      // Listen for quest system events if available
      if (window.questSystem) {
        this.setupQuestListeners();
      }

      console.log('📡 Auto-save event listeners setup');
    }

    // Listen for page visibility changes
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.eventHandlers.visibilityChange);
    }

    // Listen for before unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', this.eventHandlers.beforeUnload);
    }
  }

  /**
   * Setup quest system listeners
   */
  setupQuestListeners() {
    if (window.questSystem && window.questSystem.on) {
      window.questSystem.on('quest-started', this.eventHandlers.questStarted);
      window.questSystem.on('quest-completed', this.eventHandlers.questCompleted);
      window.questSystem.on('task-progress', this.eventHandlers.taskProgress);
    }
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    // Remove EventBus listeners
    if (typeof window !== 'undefined') {
      EventBus.off('global-inventory-changed', this.eventHandlers.inventoryChanged);
      EventBus.off('inventory-synced', this.eventHandlers.inventorySynced);
      EventBus.off('scene-changed', this.eventHandlers.sceneChanged);
    }

    // Quest system listeners cleanup
    if (window.questSystem && window.questSystem.off) {
      window.questSystem.off('quest-started', this.eventHandlers.questStarted);
      window.questSystem.off('quest-completed', this.eventHandlers.questCompleted);
      window.questSystem.off('task-progress', this.eventHandlers.taskProgress);
    }

    // Remove DOM listeners
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.eventHandlers.visibilityChange);
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', this.eventHandlers.beforeUnload);
    }
  }

  /**
   * Start the fallback interval timer
   */
  startFallbackInterval() {
    this.fallbackInterval = setInterval(() => {
      console.log('⏰ Fallback auto-save triggered');
      this.performSave();
    }, 300_000); // 5 minutes
  }

  /**
   * Collect current game state
   * @returns {Object} - Current game state
   */
  collectGameState() {
    try {
      const gameState = {
        achievements: JSON.parse(localStorage.getItem('gameAchievements') || '{}'),
        npcProgress: {
          jackLifeCycleStep: parseInt(localStorage.getItem('jackLifeCycleStep') || '0', 10),
          jackDailyQuestCompleted: localStorage.getItem('jackDailyQuestCompleted') === 'true',
          greetedNPCs: localStorage.getItem('greetedNPCs') || '{}'
        },
        inventory: inventoryService.getInventoryData(),
        questProgress: window.questSystem ? window.questSystem.getCurrentState() : {},
        timestamp: new Date().toISOString()
      };

      // Include player position if available
      const playerX = localStorage.getItem('currentPlayerX');
      const playerY = localStorage.getItem('currentPlayerY');
      if (playerX && playerY) {
        gameState.positionX = parseInt(playerX, 10);
        gameState.positionY = parseInt(playerY, 10);
      }

      // Include current map if available
      const lastMapId = localStorage.getItem('lastMapId');
      if (lastMapId) {
        gameState.mapId = lastMapId;
      }

      return gameState;
    } catch (error) {
      console.error('❌ Error collecting game state:', error);
      return null;
    }
  }

  /**
   * Perform the actual save operation
   */
  async performSave() {
    if (!this.isEnabled || !this.user?.data?.user?.id || this.saveInProgress) {
      return;
    }

    this.saveInProgress = true;

    try {
      console.log('💾 Starting auto-save...');

      const gameState = this.collectGameState();
      if (!gameState) {
        console.warn('⚠️ Unable to collect game state, skipping save');
        return;
      }

      // Sync inventory to database if we have a current scene
      if (this.sceneManagerRef?.current) {
        const currentScene = this.sceneManagerRef.current.getCurrentScene();
        if (currentScene?.newItemHudPrefab) {
          try {
            await inventoryService.syncInventoryToDatabase(currentScene.newItemHudPrefab);
            console.log('✅ Inventory synced to database');
          } catch (error) {
            console.error('❌ Failed to sync inventory during auto-save:', error);
            // Don't fail the entire save if inventory sync fails
          }
        }
      }

      // Save checkpoint with game state
      await createCheckpoint(gameState);
      console.log('✅ Auto-save completed successfully');

    } catch (error) {
      console.error('❌ Auto-save failed:', error);

      // Add to queue for retry if it's a network error
      if (error.name === 'NetworkError' || error.message.includes('fetch')) {
        this.saveQueue.push({ gameState: this.collectGameState(), timestamp: Date.now() });
        console.log('📥 Save queued for retry');

        // Try to process the queue after a delay
        setTimeout(() => this.processQueue(), 10000);
      }
    } finally {
      this.saveInProgress = false;
    }
  }

  /**
   * Process queued saves
   */
  async processQueue() {
    if (this.saveQueue.length === 0 || this.saveInProgress) return;

    console.log(`🔄 Processing ${this.saveQueue.length} queued saves...`);

    // Only process the most recent save to avoid overwhelming the server
    const latestSave = this.saveQueue[this.saveQueue.length - 1];
    this.saveQueue = [];

    try {
      this.saveInProgress = true;
      await createCheckpoint(latestSave.gameState);
      console.log('✅ Queued save processed successfully');
    } catch (error) {
      console.error('❌ Failed to process queued save:', error);
      // Re-queue if it fails again
      this.saveQueue.push(latestSave);
    } finally {
      this.saveInProgress = false;
    }
  }

  /**
   * Get save status for debugging
   */
  getStatus() {
    return {
      enabled: this.isEnabled,
      saveInProgress: this.saveInProgress,
      queueLength: this.saveQueue.length,
      hasUser: !!this.user,
      hasSceneManager: !!this.sceneManagerRef?.current
    };
  }
}

// Create and export singleton instance
export const autoSaveService = new AutoSaveService();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  window.autoSaveService = autoSaveService;
}