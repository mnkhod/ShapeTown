/**
 * Portal Manager - Handles consistent scene transitions with proper positioning
 * Ensures players always teleport to the correct location when moving between maps
 */

class PortalManager {
  constructor() {
    // Define portal connections with exact coordinates for logical map positions
    // Based on actual portal trigger locations:
    // - Square Beach portal at (2400, 2860)
    // - Square Farm portal at (240, 1552)
    // - Farm Square portal at (2520, 1112)
    // - Beach Square portal at (1600, 0)
    this.portals = {
      // Farm to Square portal
      'ShapeTownFarmingMapScene_to_ShapeTownSquareMapScene': {
        from: 'ShapeTownFarmingMapScene',
        to: 'ShapeTownSquareMapScene',
        targetPosition: { x: 300, y: 1500 }, // Near the farm portal entrance in Square (left side)
        fadeEffect: true
      },

      // Square to Farm portal
      'ShapeTownSquareMapScene_to_ShapeTownFarmingMapScene': {
        from: 'ShapeTownSquareMapScene',
        to: 'ShapeTownFarmingMapScene',
        targetPosition: { x: 2450, y: 1112 }, // Near the square portal exit in Farm (right side)
        fadeEffect: true
      },

      // Square to Beach portal
      'ShapeTownSquareMapScene_to_ShapeTownBeachMapScene': {
        from: 'ShapeTownSquareMapScene',
        to: 'ShapeTownBeachMapScene',
        targetPosition: { x: 1600, y: 100 }, // Near beach portal entrance (top area, on walkable ground)
        fadeEffect: true
      },

      // Beach to Square portal
      'ShapeTownBeachMapScene_to_ShapeTownSquareMapScene': {
        from: 'ShapeTownBeachMapScene',
        to: 'ShapeTownSquareMapScene',
        targetPosition: { x: 2400, y: 2750 }, // Near beach portal exit in Square (bottom area)
        fadeEffect: true
      },

      // Mine connections (if they exist)
      'ShapeTownSquareMapScene_to_ShapeTownMineMapScene': {
        from: 'ShapeTownSquareMapScene',
        to: 'ShapeTownMineMapScene',
        targetPosition: { x: 960, y: 1800 }, // Mine entrance
        fadeEffect: true
      },

      'ShapeTownMineMapScene_to_ShapeTownSquareMapScene': {
        from: 'ShapeTownMineMapScene',
        to: 'ShapeTownSquareMapScene',
        targetPosition: { x: 800, y: 1200 }, // Near mine portal in square
        fadeEffect: true
      }
    };

    // Track transitions to prevent duplicate triggers
    this.isTransitioning = false;
    this.transitionCooldown = 1000; // 1 second cooldown
  }

  /**
   * Initiate a portal transition between scenes
   * @param {Object} currentScene - The scene the player is leaving
   * @param {string} targetSceneName - The scene the player is going to
   * @param {Object} options - Optional settings
   */
  transition(currentScene, targetSceneName, options = {}) {
    if (this.isTransitioning) {
      console.log("🚫 Portal transition blocked - already transitioning");
      return false;
    }

    const portalKey = `${currentScene.scene.key}_to_${targetSceneName}`;
    const portal = this.portals[portalKey];

    if (!portal) {
      console.error(`❌ No portal configuration found for: ${portalKey}`);
      return false;
    }

    console.log(`🚪 Starting portal transition: ${portal.from} → ${portal.to}`);
    this.isTransitioning = true;

    // Save current scene inventory
    this.saveSceneInventory(currentScene);

    // Perform the scene transition
    this.performTransition(currentScene, portal, options);

    // Reset transition lock after cooldown
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.transitionCooldown);

    return true;
  }

  /**
   * Save inventory from the current scene before transition
   * @param {Object} currentScene - Scene to save inventory from
   */
  saveSceneInventory(currentScene) {
    try {
      // Update global inventory
      if (currentScene.newItemHudPrefab && currentScene.newItemHudPrefab.updateGlobalInventory) {
        currentScene.newItemHudPrefab.updateGlobalInventory();
      }

      // Force sync to database if available
      if (typeof window !== "undefined" && window.forceInventorySync) {
        console.log("🔄 Syncing inventory to database before portal transition...");
        window.forceInventorySync();
      }
    } catch (error) {
      console.error("❌ Error saving inventory during portal transition:", error);
    }
  }

  /**
   * Perform the actual scene transition
   * @param {Object} currentScene - Current scene
   * @param {Object} portal - Portal configuration
   * @param {Object} options - Additional options
   */
  performTransition(currentScene, portal, options) {
    // Add fade out effect if enabled
    if (portal.fadeEffect && options.fadeOut !== false) {
      currentScene.cameras.main.fadeOut(500, 0, 0, 0);
    }

    // Switch to target scene
    currentScene.scene.switch(portal.to);

    // Position player in target scene
    setTimeout(() => {
      this.positionPlayerInTargetScene(portal);
    }, 100); // Small delay to ensure scene is ready

    // Emit scene change event
    if (typeof window !== 'undefined' && window.EventBus) {
      window.EventBus.emit('scene-changed', {
        from: portal.from,
        to: portal.to,
        via: 'portal'
      });
    }
  }

  /**
   * Position the player at the correct location in the target scene
   * @param {Object} portal - Portal configuration
   */
  positionPlayerInTargetScene(portal) {
    const targetScene = window.debugGame?.game?.scene?.getScene(portal.to);

    if (!targetScene) {
      console.error(`❌ Target scene not found: ${portal.to}`);
      return;
    }

    if (!targetScene.playerPrefab) {
      // Retry after a short delay
      setTimeout(() => this.positionPlayerInTargetScene(portal), 200);
      return;
    }

    // Set exact position
    targetScene.playerPrefab.x = portal.targetPosition.x;
    targetScene.playerPrefab.y = portal.targetPosition.y;

    console.log(`✅ Player positioned at (${portal.targetPosition.x}, ${portal.targetPosition.y}) in ${portal.to}`);

    // Add fade in effect
    if (portal.fadeEffect) {
      targetScene.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    // Force inventory reload in target scene
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.forceApplyInventory) {
        console.log("🔄 Applying database inventory to target scene...");
        window.forceApplyInventory();
      }
    }, 1000);

    // Save current position to localStorage for checkpoint system
    this.savePlayerPosition(portal.targetPosition, portal.to);
  }

  /**
   * Save player position for checkpoint system
   * @param {Object} position - Player position {x, y}
   * @param {string} sceneName - Current scene name
   */
  savePlayerPosition(position, sceneName) {
    try {
      localStorage.setItem('currentPlayerX', position.x.toString());
      localStorage.setItem('currentPlayerY', position.y.toString());
      localStorage.setItem('lastMapId', sceneName);
      console.log(`💾 Saved player position: (${position.x}, ${position.y}) in ${sceneName}`);
    } catch (error) {
      console.error("❌ Error saving player position:", error);
    }
  }

  /**
   * Get portal configuration for debugging
   * @param {string} fromScene - Source scene
   * @param {string} toScene - Target scene
   * @returns {Object|null} Portal configuration
   */
  getPortalConfig(fromScene, toScene) {
    const portalKey = `${fromScene}_to_${toScene}`;
    return this.portals[portalKey] || null;
  }

  /**
   * Add a new portal configuration
   * @param {string} fromScene - Source scene
   * @param {string} toScene - Target scene
   * @param {Object} config - Portal configuration
   */
  addPortal(fromScene, toScene, config) {
    const portalKey = `${fromScene}_to_${toScene}`;
    this.portals[portalKey] = {
      from: fromScene,
      to: toScene,
      ...config
    };
    console.log(`✅ Added portal: ${portalKey}`);
  }

  /**
   * List all available portals for debugging
   */
  listPortals() {
    console.log("🚪 Available Portals:");
    Object.keys(this.portals).forEach(key => {
      const portal = this.portals[key];
      console.log(`  ${portal.from} → ${portal.to}: (${portal.targetPosition.x}, ${portal.targetPosition.y})`);
    });
  }

  /**
   * Get current player position for debugging portal positions
   */
  getCurrentPlayerPosition() {
    const game = window.debugGame?.game;
    if (!game) {
      console.log("❌ Game not available for debugging");
      return null;
    }

    const activeScene = game.scene.scenes.find(scene => scene.scene.isActive());
    if (!activeScene || !activeScene.playerPrefab) {
      console.log("❌ No active scene or player found");
      return null;
    }

    const position = {
      x: Math.round(activeScene.playerPrefab.x),
      y: Math.round(activeScene.playerPrefab.y),
      scene: activeScene.scene.key
    };

    console.log(`📍 Current player position: (${position.x}, ${position.y}) in ${position.scene}`);
    console.log(`📋 Copy this position: { x: ${position.x}, y: ${position.y} }`);

    return position;
  }

  /**
   * Update portal destination coordinates
   * @param {string} fromScene - Source scene
   * @param {string} toScene - Target scene
   * @param {Object} newPosition - New target position {x, y}
   */
  updatePortalPosition(fromScene, toScene, newPosition) {
    const portalKey = `${fromScene}_to_${toScene}`;
    if (!this.portals[portalKey]) {
      console.error(`❌ Portal not found: ${portalKey}`);
      return false;
    }

    this.portals[portalKey].targetPosition = newPosition;
    console.log(`✅ Updated ${portalKey} to position (${newPosition.x}, ${newPosition.y})`);
    return true;
  }

  /**
   * Clear saved player position data (useful when position gets corrupted)
   */
  clearSavedPosition() {
    try {
      localStorage.removeItem('currentPlayerX');
      localStorage.removeItem('currentPlayerY');
      localStorage.removeItem('lastMapId');
      localStorage.removeItem('shouldRestorePosition');
      localStorage.removeItem('checkpointPlayerX');
      localStorage.removeItem('checkpointPlayerY');
      console.log('🧹 Cleared all saved position data');
      console.log('🔄 Refresh the page to spawn at default position');
    } catch (error) {
      console.error('❌ Error clearing saved position:', error);
    }
  }

  /**
   * Set player to default spawn position for a scene
   * @param {string} sceneName - Scene to set default position for
   */
  setDefaultSpawnPosition(sceneName) {
    const defaultPositions = {
      'ShapeTownFarmingMapScene': { x: 600, y: 620 }, // Near Old Man Jack
      'ShapeTownSquareMapScene': { x: 1200, y: 1500 }, // Center of square
      'ShapeTownBeachMapScene': { x: 1000, y: 1000 }, // Beach center
    };

    const defaultPos = defaultPositions[sceneName];
    if (!defaultPos) {
      console.error(`❌ No default position defined for scene: ${sceneName}`);
      return false;
    }

    this.savePlayerPosition(defaultPos, sceneName);
    console.log(`✅ Set default spawn position for ${sceneName}: (${defaultPos.x}, ${defaultPos.y})`);
    console.log('🔄 Refresh to spawn at this position');
    return true;
  }
}

// Create singleton instance
const portalManager = new PortalManager();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  window.portalManager = portalManager;
}

export default portalManager;