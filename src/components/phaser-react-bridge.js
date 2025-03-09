// src/components/phaser-react-bridge.js
import { EventBus } from "../game/EventBus";
import { globalInventory } from "./GlobalInvetoryManager";

/**
 * Initializes the bridge between Phaser's inventory system and React components
 * Ensures inventory data remains synchronized across scene transitions
 * 
 * @param {Object} phaserInstance - The inventory HUD prefab from the Phaser scene
 * @param {Object} reactEvents - Event bus for communication with React components
 * @returns {Object} - Bridge control methods
 */
export function initInventoryBridge(phaserInstance, reactEvents) {
  if (!phaserInstance) {
    console.error('Invalid Phaser instance provided to inventory bridge');
    return;
  }
  
  // Store event bus reference on the instance for other components to use
  phaserInstance.reactEvent = reactEvents;
  
  // Flag to prevent update loops
  let isUpdating = false;
  
  // Cache original methods if they exist
  const originalSyncWithGlobalInv = phaserInstance.syncWithGlobalInventory;
  const originalUpdateGlobalInv = phaserInstance.updateGlobalInventory;
  const originalCleanup = phaserInstance.cleanupInventory;
  const originalAddItem = phaserInstance.addItem;
  const originalRemoveItemByKey = phaserInstance.removeItemByKey;

  /**
   * Formats inventory data for React components
   */
  phaserInstance.getFormattedInventory = function() {
    // Format quick items
    const quickItems = Array.isArray(this.itemData) ? this.itemData.map((key, index) => {
      if (!key || !this.items[index] || !this.items[index].visible) {
        return null;
      }
      
      return {
        id: key,
        name: typeof key === 'string' ? key : key.id || 'Unknown Item',
        icon: this.items[index].texture.key,
        textureKey: this.items[index].texture.key,
        frame: this.items[index].frame.name || 0,
        frameName: this.items[index].frame.name || 0,
        quantity: parseInt(this.itemCounters[index].text) || 1,
        sellPrice: this.calculateItemValue ? this.calculateItemValue(key) : 10
      };
    }) : Array(8).fill(null);
    
    // Format main inventory
    const mainItems = Array.isArray(this.mainInventoryData) 
      ? this.mainInventoryData.map(item => {
          if (!item) return null;
          
          return {
            ...item,
            id: item.id || item,
            name: item.name || item.id || 'Unknown Item',
            icon: item.icon || 'items/default',
            textureKey: item.textureKey || item.icon || 'items/default',
            frameName: item.frameName !== undefined ? item.frameName : 
                      (item.frame !== undefined ? item.frame : 0),
            quantity: item.quantity || 1,
            sellPrice: item.sellPrice || (this.calculateItemValue ? this.calculateItemValue(item) : 10)
          };
        })
      : Array(24).fill(null);
    
    // Get gold amount from various possible locations
    let totalGold = 0;
    if (this.gold !== undefined) {
      totalGold = this.gold;
    } else if (this.scene && this.scene.gold !== undefined) {
      totalGold = this.scene.gold;
    } else if (this.TotalGoldPrefab && this.TotalGoldPrefab.TotalGold !== undefined) {
      totalGold = this.TotalGoldPrefab.TotalGold;
    }
    
    return {
      quickItems,
      mainItems,
      activeSlot: this.activeIndex !== -1 ? this.activeIndex : 0,
      totalGold
    };
  };

  /**
   * Syncs the HUD with the global inventory data
   */
  phaserInstance.syncWithGlobalInventory = function() {
    if (isUpdating) return;
    isUpdating = true;
    
    try {
      // Clear current items first
      this.itemData = Array(8).fill(null);
      
      // Hide all item sprites
      if (this.items) {
        this.items.forEach(item => {
          if (item) item.visible = false;
        });
      }
      
      // Hide all counter text
      if (this.itemCounters) {
        this.itemCounters.forEach(counter => {
          if (counter) {
            counter.text = "0";
            counter.visible = false;
          }
        });
      }
      
      // Hide active slot indicators
      if (this.activeItemSlots) {
        this.activeItemSlots.forEach(slot => {
          if (slot) slot.visible = false;
        });
      }
      
      // Populate from global inventory's quick items
      if (Array.isArray(globalInventory.quickItems)) {
        globalInventory.quickItems.forEach((itemData, index) => {
          if (!itemData) return;
          
          this.itemData[index] = itemData.id;
          
          if (this.items && this.items[index]) {
            this.items[index].visible = true;
            this.items[index].setTexture(itemData.textureKey || itemData.icon);
            if (itemData.frameName !== undefined) {
              this.items[index].setFrame(itemData.frameName);
            }
          }
          
          if (this.itemCounters && this.itemCounters[index]) {
            this.itemCounters[index].visible = true;
            this.itemCounters[index].text = itemData.quantity.toString();
          }
        });
      }
      
      // Set active slot
      if (globalInventory.activeIndex >= 0 && 
          this.activeItemSlots && 
          globalInventory.activeIndex < this.activeItemSlots.length &&
          this.itemData[globalInventory.activeIndex]) {
        this.activeIndex = globalInventory.activeIndex;
        this.selectedItem = this.itemData[globalInventory.activeIndex];
        
        if (this.activeItemSlots[globalInventory.activeIndex]) {
          this.activeItemSlots[globalInventory.activeIndex].visible = true;
        }
      } else if (this.itemData && this.itemData.some(item => item !== null)) {
        // Activate first non-empty slot if no active slot
        const firstItemIndex = this.itemData.findIndex(item => item !== null);
        this.activeIndex = firstItemIndex;
        this.selectedItem = this.itemData[firstItemIndex];
        
        if (this.activeItemSlots && this.activeItemSlots[firstItemIndex]) {
          this.activeItemSlots[firstItemIndex].visible = true;
        }
      }
      
      // Sync main inventory
      if (Array.isArray(globalInventory.mainItems)) {
        this.mainInventoryData = JSON.parse(JSON.stringify(globalInventory.mainItems));
      }
      
      // Call original sync method if it exists
      if (typeof originalSyncWithGlobalInv === 'function') {
        originalSyncWithGlobalInv.call(this);
      }
      
      // Notify React components
      if (this.reactEvent) {
        this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
      }
    } catch (error) {
      console.error("Error in syncWithGlobalInventory:", error);
    } finally {
      isUpdating = false;
    }
  };

  /**
   * Updates the global inventory from the current HUD state
   */
  phaserInstance.updateGlobalInventory = function() {
    if (isUpdating) return;
    isUpdating = true;
    
    try {
      // Update quick items in global inventory
      const updatedQuickItems = Array(8).fill(null);
      
      if (this.itemData && this.items) {
        this.itemData.forEach((id, index) => {
          if (!id) return;
          
          const item = this.items[index];
          if (!item || !item.visible) return;
          
          updatedQuickItems[index] = {
            id: id,
            icon: item.texture.key,
            frame: item.frame.name,
            textureKey: item.texture.key,
            frameName: item.frame.name,
            quantity: parseInt(this.itemCounters[index]?.text || '1'),
            name: typeof id === 'string' ? id : id.id || 'Unknown Item'
          };
        });
      }
      
      globalInventory.quickItems = updatedQuickItems;
      
      // Update main inventory in global inventory
      if (this.mainInventoryData) {
        globalInventory.mainItems = JSON.parse(JSON.stringify(this.mainInventoryData));
      }
      
      // Update active index
      globalInventory.activeIndex = this.activeIndex;
      
      // Call original update method if it exists
      if (typeof originalUpdateGlobalInv === 'function') {
        originalUpdateGlobalInv.call(this);
      }
      
      // Notify React components
      if (this.reactEvent) {
        this.reactEvent.emit('global-inventory-changed', globalInventory);
        this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
      }
    } catch (error) {
      console.error("Error in updateGlobalInventory:", error);
    } finally {
      isUpdating = false;
    }
  };

  /**
   * Cleans up the inventory display, ensuring consistency
   */
  phaserInstance.cleanupInventory = function() {
    if (isUpdating) return;
    isUpdating = true;
    
    try {
      // Call original cleanup if it exists
      if (typeof originalCleanup === 'function') {
        originalCleanup.call(this);
      }
      
      // Hide items for empty slots
      if (this.itemData && this.items) {
        this.itemData.forEach((itemId, index) => {
          if (!itemId && this.items[index]) {
            this.items[index].visible = false;
            if (this.itemCounters && this.itemCounters[index]) {
              this.itemCounters[index].visible = false;
            }
          }
        });
      }
      
      // Update global inventory
      this.updateGlobalInventory();
      
      // Emit inventory change event
      if (this.reactEvent) {
        this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
      }
    } catch (error) {
      console.error("Error in cleanupInventory:", error);
    } finally {
      isUpdating = false;
    }
  };

  /**
   * Calculates the value of an item for selling
   */
  if (!phaserInstance.calculateItemValue) {
    phaserInstance.calculateItemValue = function(item) {
      // Get basic item pricing data from the globalInventory or use defaults
      const baseValue = 10;
      let itemId = typeof item === 'string' ? item : (item && item.id ? item.id : null);
      
      if (!itemId) return baseValue;
      
      // Clean up item ID (remove extensions, paths)
      itemId = itemId.replace(/\.(png|jpg|jpeg|gif)$/i, '').split('/').pop();
      
      // Check if it's a known item with predefined price
      const ITEM_PRICES = {
        "apple": 15,
        "ToolHoe": 75,
        "ToolWateringCan": 70,
        "ToolPickaxe": 85,
        // Add more items as needed
      };
      
      if (ITEM_PRICES[itemId]) {
        return ITEM_PRICES[itemId];
      }
      
      // Determine price by item type/category
      if (itemId.includes('seed')) return 5;
      if (itemId.includes('crop')) return 25;
      if (itemId.includes('Tool')) return 80;
      
      return baseValue;
    };
  }

  /**
   * Overrides the addItem method to ensure global sync
   */
  if (typeof originalAddItem === 'function') {
    phaserInstance.addItem = function(key, textureName, textureId, amount = 1, isAddable = true) {
      if (isUpdating) return originalAddItem.call(this, key, textureName, textureId, amount, isAddable);
      isUpdating = true;
      
      let result;
      try {
        result = originalAddItem.call(this, key, textureName, textureId, amount, isAddable);
        
        if (result && this.cleanupInventory) {
          this.cleanupInventory();
        }
      } catch (error) {
        console.error("Error in addItem:", error);
      } finally {
        isUpdating = false;
      }
      
      return result;
    };
  }

  /**
   * Overrides the removeItemByKey method to ensure global sync
   */
  if (typeof originalRemoveItemByKey === 'function') {
    phaserInstance.removeItemByKey = function(key) {
      if (isUpdating) return originalRemoveItemByKey.call(this, key);
      isUpdating = true;
      
      try {
        originalRemoveItemByKey.call(this, key);
        
        if (this.cleanupInventory) {
          this.cleanupInventory();
        }
      } catch (error) {
        console.error("Error in removeItemByKey:", error);
      } finally {
        isUpdating = false;
      }
    };
  }

  // Helper function to select an item if none is selected
  const fixItemSelection = () => {
    if (isUpdating) return;
    isUpdating = true;
    
    try {
      if (!phaserInstance.selectedItem && phaserInstance.items) {
        // Find first visible item
        for (let i = 0; i < phaserInstance.items.length; i++) {
          if (phaserInstance.items[i] && phaserInstance.items[i].visible) {
            const textureName = phaserInstance.items[i].texture.key;
            let itemId;
            
            if (phaserInstance.itemData && phaserInstance.itemData[i]) {
              itemId = phaserInstance.itemData[i];
            } else {
              // Determine item type from texture
              if (textureName.includes("Hoe") || textureName.includes("hoe")) {
                itemId = "ToolHoe";
              } else if (textureName.includes("Water") || textureName.includes("water")) {
                itemId = "ToolWateringCan";
              } else if (textureName.includes("Pick") || textureName.includes("pick")) {
                itemId = "ToolPickaxe";
              } else {
                itemId = textureName.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
              }
              
              if (phaserInstance.itemData) {
                phaserInstance.itemData[i] = itemId;
              }
            }
            
            phaserInstance.selectedItem = itemId;
            phaserInstance.activeIndex = i;
            
            if (phaserInstance.activeItemSlots) {
              phaserInstance.activeItemSlots.forEach((slot, idx) => {
                if (slot) slot.visible = idx === i;
              });
            }
            
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error in fixItemSelection:", error);
    } finally {
      isUpdating = false;
    }
  };

  // Set up event handlers for React components
  if (reactEvents) {
    // Handle inventory slot selection from React UI
    reactEvents.on('inventory-slot-selected', (data) => {
      if (isUpdating) return;
      isUpdating = true;
      
      try {
        const { index, item } = data;
        
        if (index >= 0 && index < 8 && phaserInstance.activeItemSlots) {
          phaserInstance.activeIndex = index;
          phaserInstance.selectedItem = item?.id || null;
          
          phaserInstance.activeItemSlots.forEach((slot, i) => {
            if (slot) {
              slot.visible = i === index;
            }
          });
          
          phaserInstance.updateGlobalInventory();
        }
      } catch (error) {
        console.error("Error handling inventory-slot-selected:", error);
      } finally {
        isUpdating = false;
      }
    });
    
    // Handle item movement between inventory slots
    reactEvents.on('move-item', (data) => {
      if (isUpdating) return;
      isUpdating = true;
      
      try {
        const { fromIndex, fromQuickAccess, toIndex, toQuickAccess, item } = data;
        
        // Remove from source
        if (fromQuickAccess) {
          const quickIndex = fromIndex - 24;
          if (phaserInstance.itemData) {
            phaserInstance.itemData[quickIndex] = null;
          }
          
          if (phaserInstance.items && phaserInstance.items[quickIndex]) {
            phaserInstance.items[quickIndex].visible = false;
          }
          
          if (phaserInstance.itemCounters && phaserInstance.itemCounters[quickIndex]) {
            phaserInstance.itemCounters[quickIndex].visible = false;
          }
        } else if (phaserInstance.mainInventoryData) {
          phaserInstance.mainInventoryData[fromIndex] = null;
        }
        
        // Add to destination
        if (toQuickAccess) {
          const quickIndex = toIndex - 24;
          if (phaserInstance.itemData) {
            phaserInstance.itemData[quickIndex] = item.id;
          }
          
          if (phaserInstance.items && phaserInstance.items[quickIndex]) {
            phaserInstance.items[quickIndex].visible = true;
            phaserInstance.items[quickIndex].setTexture(
              item.textureKey || item.icon || 'items/default'
            );
            
            if (item.frameName !== undefined) {
              phaserInstance.items[quickIndex].setFrame(item.frameName);
            }
          }
          
          if (phaserInstance.itemCounters && phaserInstance.itemCounters[quickIndex]) {
            phaserInstance.itemCounters[quickIndex].visible = true;
            phaserInstance.itemCounters[quickIndex].text = (item.quantity || 1).toString();
          }
        } else if (phaserInstance.mainInventoryData) {
          phaserInstance.mainInventoryData[toIndex] = {
            id: item.id,
            icon: item.icon || item.textureKey,
            textureKey: item.textureKey || item.icon,
            frame: item.frame !== undefined ? item.frame : item.frameName,
            frameName: item.frameName !== undefined ? item.frameName : item.frame,
            quantity: item.quantity || 1,
            name: item.name || item.id
          };
        }
        
        phaserInstance.updateGlobalInventory();
      } catch (error) {
        console.error("Error handling move-item:", error);
      } finally {
        isUpdating = false;
      }
    });
    
    // Handle scene transitions
    reactEvents.on('scene-switched', (scene) => {
      if (!scene || !scene.newItemHudPrefab) return;
      
      // Sync the new scene's inventory with global data
      if (scene.newItemHudPrefab.syncWithGlobalInventory) {
        scene.newItemHudPrefab.syncWithGlobalInventory();
      }
    });
  }
  
  // Set up event handlers for scene transitions
  if (phaserInstance.scene) {
    // Save inventory state when scene shuts down
    phaserInstance.scene.events.on('shutdown', () => {
      if (phaserInstance.updateGlobalInventory) {
        phaserInstance.updateGlobalInventory();
      }
    });
    
    // Save inventory state when scene sleeps
    phaserInstance.scene.events.on('sleep', () => {
      if (phaserInstance.updateGlobalInventory) {
        phaserInstance.updateGlobalInventory();
      }
    });
  }
  
  // Do initial sync and selection fix
  if (phaserInstance.syncWithGlobalInventory) {
    phaserInstance.syncWithGlobalInventory();
  }
  setTimeout(fixItemSelection, 500);
  
  return {
    sync: () => {
      if (phaserInstance.syncWithGlobalInventory) {
        phaserInstance.syncWithGlobalInventory();
      }
    },
    update: () => {
      if (phaserInstance.updateGlobalInventory) {
        phaserInstance.updateGlobalInventory();
      }
    },
    fixSelection: fixItemSelection
  };
}

export default initInventoryBridge;