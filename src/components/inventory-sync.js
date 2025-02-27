// inventory-sync.js
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to connect the player's inventory with React components
 * @param {Object} phaserInstance - Reference to the Phaser game instance containing inventory data
 * @returns {Object} - Methods and data for inventory management
 */
export const useInventorySync = (phaserInstance) => {
  const [inventory, setInventory] = useState({
    quickItems: Array(8).fill(null),
    mainItems: Array(24).fill(null),
    activeSlot: 0,
    totalGold: 0
  });

  // Use a ref to store the latest inventory data
  const inventoryRef = useRef(inventory);
  inventoryRef.current = inventory;

  // Flag to prevent infinite update loops
  const isUpdatingRef = useRef(false);

  // Helper function to get inventory data without setting state
  const getInventoryData = (instance) => {
    if (!instance) return inventoryRef.current;
    
    // Process quick access items
    const quickItems = Array(8).fill(null);
    
    // Map itemData from HUD to our format
    if (Array.isArray(instance.itemData)) {
      instance.itemData.forEach((key, index) => {
        if (!key) return;
        
        const item = instance.items?.[index];
        if (!item?.visible) return;
        
        quickItems[index] = {
          id: key,
          icon: item.texture.key,
          textureKey: item.texture.key,
          frame: item.frame.name || 0,
          frameName: item.frame.name || 0,
          quantity: parseInt(instance.itemCounters?.[index]?.text || '1'),
          name: typeof key === 'string' ? key : key.id || 'Unknown Item',
          sellPrice: calculateItemValue(key)
        };
      });
    }
    
    // Process main inventory items
    const mainItems = Array(24).fill(null);
    
    if (Array.isArray(instance.mainInventoryData)) {
      instance.mainInventoryData.forEach((item, index) => {
        if (!item) return;
        
        mainItems[index] = {
          ...item,
          id: item.id || item,
          icon: item.icon || 'items/default',
          textureKey: item.textureKey || item.icon || 'items/default',
          frameName: item.frameName !== undefined ? item.frameName : (item.frame !== undefined ? item.frame : 0),
          quantity: item.quantity || 1,
          name: item.name || item.id || 'Unknown Item',
          sellPrice: item.sellPrice || calculateItemValue(item)
        };
      });
    }
    
    // Get gold amount
    let totalGold = 0;
    if (instance.gold !== undefined) {
      totalGold = instance.gold;
    } else if (instance.scene?.gold !== undefined) {
      totalGold = instance.scene.gold;
    } else if (instance.TotalGoldPrefab?.TotalGold !== undefined) {
      totalGold = instance.TotalGoldPrefab.TotalGold;
    }
    
    // Get active slot
    const activeSlot = instance.activeIndex !== -1 ? instance.activeIndex : 0;
    
    return {
      quickItems,
      mainItems,
      activeSlot,
      totalGold
    };
  };

  // Initial sync from Phaser to React
  useEffect(() => {
    if (!phaserInstance) return;
    
    // Set up event listeners
    const handleInventoryChange = () => {
      if (isUpdatingRef.current) return;
      
      const newInventory = getInventoryData(phaserInstance);
      
      // Deep comparison to prevent unnecessary updates
      const prevJSON = JSON.stringify(inventoryRef.current);
      const newJSON = JSON.stringify(newInventory);
      
      if (prevJSON !== newJSON) {
        setInventory(newInventory);
      }
    };
    
    // Initial sync
    handleInventoryChange();
    
    // Hook into global inventory system if available
    if (phaserInstance.reactEvent) {
      phaserInstance.reactEvent.on('inventory-changed', handleInventoryChange);
      
      return () => {
        phaserInstance.reactEvent.off('inventory-changed', handleInventoryChange);
      };
    }
    
    // Add event listeners to scene if reactEvent not available
    if (phaserInstance.scene?.events) {
      phaserInstance.scene.events.on('inventory-changed', handleInventoryChange);
      phaserInstance.scene.events.on('gold-earned', handleInventoryChange);
      phaserInstance.scene.events.on('gold-spent', handleInventoryChange);
      
      return () => {
        phaserInstance.scene.events.off('inventory-changed', handleInventoryChange);
        phaserInstance.scene.events.off('gold-earned', handleInventoryChange);
        phaserInstance.scene.events.off('gold-spent', handleInventoryChange);
      };
    }
  }, [phaserInstance]);

  /**
   * Calculate item value based on rarity or other properties
   * @param {Object|string} item - Item to calculate value for
   * @returns {number} - Calculated value
   */
  const calculateItemValue = (item) => {
    if (!item) return 10;
    
    const baseValue = 10;
    let rarityMultiplier = 1;
    
    if (typeof item === 'object' && item.rarity) {
      const rarityValues = {
        common: 1,
        uncommon: 2,
        rare: 5,
        epic: 10,
        legendary: 25
      };
      rarityMultiplier = rarityValues[item.rarity] || 1;
    }
    
    return baseValue * rarityMultiplier;
  };

  /**
   * Sell an item from inventory
   * @param {Object} item - Item to sell
   * @param {number} quantity - Quantity to sell
   * @returns {boolean} - Whether sale was successful
   */
  const sellItem = (item, quantity) => {
    if (!phaserInstance || !item) return false;
    
    // Set updating flag to prevent event handling loops
    isUpdatingRef.current = true;
    
    try {
      const totalValue = item.sellPrice * quantity;
      
      // Try to use reactEvent's sell-item event if available
      if (phaserInstance.reactEvent) {
        phaserInstance.reactEvent.emit('sell-item', { item, quantity });
        
        // Emit the event but wait a brief moment before updating state 
        // to allow Phaser to process the event
        setTimeout(() => {
          isUpdatingRef.current = false;
          setInventory(getInventoryData(phaserInstance));
        }, 50);
        
        return true;
      }
      
      // Fall back to direct inventory modification if reactEvent not available
      
      // Update gold - look for gold in different possible locations
      if (phaserInstance.gold !== undefined) {
        phaserInstance.gold = (phaserInstance.gold || 0) + totalValue;
      } else if (phaserInstance.scene && phaserInstance.scene.gold !== undefined) {
        phaserInstance.scene.gold = (phaserInstance.scene.gold || 0) + totalValue;
      }
      
      // Update gold display if TotalGoldPrefab exists
      if (phaserInstance.TotalGoldPrefab?.TotalGold !== undefined) {
        phaserInstance.TotalGoldPrefab.TotalGold = phaserInstance.gold || phaserInstance.scene?.gold || 0;
        if (phaserInstance.TotalGoldPrefab.totalGoldAmountText) {
          phaserInstance.TotalGoldPrefab.totalGoldAmountText.setText(phaserInstance.TotalGoldPrefab.TotalGold.toString());
        }
      }
      
      // Handle item removal
      const isInQuickAccess = phaserInstance.itemData?.findIndex(id => 
        id === item.id || (typeof id === 'object' && id?.id === item.id)
      );
      
      if (isInQuickAccess !== -1 && isInQuickAccess !== undefined) {
        if (quantity >= item.quantity) {
          phaserInstance.itemData[isInQuickAccess] = null;
          if (phaserInstance.items?.[isInQuickAccess]) {
            phaserInstance.items[isInQuickAccess].visible = false;
          }
          if (phaserInstance.itemCounters?.[isInQuickAccess]) {
            phaserInstance.itemCounters[isInQuickAccess].visible = false;
          }
        } else {
          const newQuantity = item.quantity - quantity;
          if (phaserInstance.itemCounters?.[isInQuickAccess]) {
            phaserInstance.itemCounters[isInQuickAccess].text = newQuantity.toString();
          }
          if (typeof phaserInstance.itemData[isInQuickAccess] === 'object') {
            phaserInstance.itemData[isInQuickAccess].quantity = newQuantity;
          }
        }
      } else {
        // Check main inventory
        const mainIndex = phaserInstance.mainInventoryData?.findIndex(mainItem => 
          mainItem && (mainItem.id === item.id)
        );
        
        if (mainIndex !== -1 && mainIndex !== undefined) {
          if (quantity >= item.quantity) {
            phaserInstance.mainInventoryData[mainIndex] = null;
          } else {
            phaserInstance.mainInventoryData[mainIndex].quantity -= quantity;
          }
        }
      }
      
      // Emit events
      if (phaserInstance.scene?.events) {
        phaserInstance.scene.events.emit('inventory-changed');
        phaserInstance.scene.events.emit('gold-earned', totalValue);
      }
      
      // Update GlobalInventory if available
      if (phaserInstance.updateGlobalInventory) {
        phaserInstance.updateGlobalInventory();
      }
      
      // Update React state
      setTimeout(() => {
        isUpdatingRef.current = false;
        setInventory(getInventoryData(phaserInstance));
      }, 50);
      
      return true;
    } catch (err) {
      console.error('Error in sellItem:', err);
      isUpdatingRef.current = false;
      return false;
    }
  };

  /**
   * Add an item to inventory with proper updating of both Phaser and React state
   * @param {Object} item - Item to add
   * @returns {boolean} - Whether addition was successful
   */
  const addItem = (item) => {
    if (!phaserInstance || !item) return false;
    
    // Set updating flag to prevent event handling loops
    isUpdatingRef.current = true;
    
    try {
      // Use the built-in addItem function from the HUD prefab
      const result = phaserInstance.addItem(
        item.id,
        item.textureKey || item.icon,
        item.frameName !== undefined ? item.frameName : (item.frame || 0),
        item.quantity || 1,
        true
      );
      
      if (result) {
        // Update GlobalInventory if available
        if (phaserInstance.updateGlobalInventory) {
          phaserInstance.updateGlobalInventory();
        }
        
        // Update React state
        setTimeout(() => {
          isUpdatingRef.current = false;
          setInventory(getInventoryData(phaserInstance));
        }, 50);
      } else {
        isUpdatingRef.current = false;
      }
      
      return result;
    } catch (err) {
      console.error('Error in addItem:', err);
      isUpdatingRef.current = false;
      return false;
    }
  };

  /**
   * Move item between inventory slots
   * @param {Object} fromData - Source data (index, type)
   * @param {number} toIndex - Destination index
   * @returns {boolean} - Whether move was successful
   */
  const moveItem = (fromData, toIndex) => {
    if (!phaserInstance) return false;
    
    // Set updating flag to prevent event handling loops
    isUpdatingRef.current = true;
    
    try {
      // Try to use reactEvent's move-item event if available
      if (phaserInstance.reactEvent) {
        phaserInstance.reactEvent.emit('move-item', { 
          ...fromData, 
          toIndex 
        });
        
        // Emit the event but wait a brief moment before updating state 
        // to allow Phaser to process the event
        setTimeout(() => {
          isUpdatingRef.current = false;
          setInventory(getInventoryData(phaserInstance));
        }, 50);
        
        return true;
      }
      
      // Fall back to direct inventory modification
      const { index: fromIndex, isQuickAccess: fromQuickAccess, item: draggedItem } = fromData;
      
      const isToQuickAccess = toIndex >= 24;
      const toActualIndex = isToQuickAccess ? toIndex - 24 : toIndex;
      
      if (fromIndex === toIndex) {
        isUpdatingRef.current = false;
        return false;
      }
      
      // Get target item
      let targetItem = null;
      if (isToQuickAccess) {
        targetItem = phaserInstance.itemData[toActualIndex];
        if (typeof targetItem === 'string') {
          // Handle string ID case
          const item = phaserInstance.items?.[toActualIndex];
          if (item) {
            targetItem = {
              id: targetItem,
              textureKey: item.texture.key,
              frameName: item.frame.name || 0,
              quantity: parseInt(phaserInstance.itemCounters?.[toActualIndex]?.text || '1')
            };
          }
        }
      } else {
        targetItem = phaserInstance.mainInventoryData[toActualIndex];
      }
      
      // Stack similar items
      if (targetItem && draggedItem && 
          targetItem.id === draggedItem.id &&
          (!targetItem.textureKey || !draggedItem.textureKey || targetItem.textureKey === draggedItem.textureKey) &&
          (targetItem.frameName === undefined || draggedItem.frameName === undefined || 
            targetItem.frameName === draggedItem.frameName)) {
        
        const combinedQuantity = (targetItem.quantity || 1) + (draggedItem.quantity || 1);
        
        if (isToQuickAccess) {
          if (typeof phaserInstance.itemData[toActualIndex] === 'object') {
            phaserInstance.itemData[toActualIndex].quantity = combinedQuantity;
          }
          if (phaserInstance.itemCounters?.[toActualIndex]) {
            phaserInstance.itemCounters[toActualIndex].text = combinedQuantity.toString();
          }
        } else {
          phaserInstance.mainInventoryData[toActualIndex].quantity = combinedQuantity;
        }
        
        // Remove from source
        if (fromQuickAccess) {
          const fromActualIndex = fromIndex - 24;
          phaserInstance.itemData[fromActualIndex] = null;
          if (phaserInstance.items?.[fromActualIndex]) {
            phaserInstance.items[fromActualIndex].visible = false;
          }
          if (phaserInstance.itemCounters?.[fromActualIndex]) {
            phaserInstance.itemCounters[fromActualIndex].visible = false;
          }
        } else {
          phaserInstance.mainInventoryData[fromIndex] = null;
        }
      } else {
        // Swap items
        if (fromQuickAccess) {
          const fromActualIndex = fromIndex - 24;
          
          // Update quick slot with target
          phaserInstance.itemData[fromActualIndex] = targetItem?.id || null;
          
          if (targetItem) {
            if (phaserInstance.items?.[fromActualIndex]) {
              phaserInstance.items[fromActualIndex].visible = true;
              phaserInstance.items[fromActualIndex].setTexture(
                targetItem.textureKey || targetItem.icon || 'items/default'
              );
              if (targetItem.frameName !== undefined) {
                phaserInstance.items[fromActualIndex].setFrame(targetItem.frameName);
              }
            }
            if (phaserInstance.itemCounters?.[fromActualIndex]) {
              phaserInstance.itemCounters[fromActualIndex].visible = true;
              phaserInstance.itemCounters[fromActualIndex].text = (targetItem.quantity || 1).toString();
            }
          } else {
            if (phaserInstance.items?.[fromActualIndex]) {
              phaserInstance.items[fromActualIndex].visible = false;
            }
            if (phaserInstance.itemCounters?.[fromActualIndex]) {
              phaserInstance.itemCounters[fromActualIndex].visible = false;
            }
          }
          
          // Update destination
          if (isToQuickAccess) {
            phaserInstance.itemData[toActualIndex] = draggedItem.id;
            if (phaserInstance.items?.[toActualIndex]) {
              phaserInstance.items[toActualIndex].visible = true;
              phaserInstance.items[toActualIndex].setTexture(
                draggedItem.textureKey || draggedItem.icon || 'items/default'
              );
              if (draggedItem.frameName !== undefined) {
                phaserInstance.items[toActualIndex].setFrame(draggedItem.frameName);
              }
            }
            if (phaserInstance.itemCounters?.[toActualIndex]) {
              phaserInstance.itemCounters[toActualIndex].visible = true;
              phaserInstance.itemCounters[toActualIndex].text = (draggedItem.quantity || 1).toString();
            }
          } else {
            phaserInstance.mainInventoryData[toActualIndex] = {
              id: draggedItem.id,
              icon: draggedItem.icon || draggedItem.textureKey,
              textureKey: draggedItem.textureKey || draggedItem.icon,
              frame: draggedItem.frame !== undefined ? draggedItem.frame : draggedItem.frameName,
              frameName: draggedItem.frameName !== undefined ? draggedItem.frameName : draggedItem.frame,
              quantity: draggedItem.quantity || 1,
              name: draggedItem.name || draggedItem.id
            };
          }
        } else {
          // From main to...
          phaserInstance.mainInventoryData[fromIndex] = targetItem;
          
          if (isToQuickAccess) {
            // To quick slot
            phaserInstance.itemData[toActualIndex] = draggedItem.id;
            if (phaserInstance.items?.[toActualIndex]) {
              phaserInstance.items[toActualIndex].visible = true;
              phaserInstance.items[toActualIndex].setTexture(
                draggedItem.textureKey || draggedItem.icon || 'items/default'
              );
              if (draggedItem.frameName !== undefined) {
                phaserInstance.items[toActualIndex].setFrame(draggedItem.frameName);
              }
            }
            if (phaserInstance.itemCounters?.[toActualIndex]) {
              phaserInstance.itemCounters[toActualIndex].visible = true;
              phaserInstance.itemCounters[toActualIndex].text = (draggedItem.quantity || 1).toString();
            }
          } else {
            // To main
            phaserInstance.mainInventoryData[toActualIndex] = draggedItem;
          }
        }
      }
      
      // Update GlobalInventory if available
      if (phaserInstance.updateGlobalInventory) {
        phaserInstance.updateGlobalInventory();
      }
      
      // Emit events
      if (phaserInstance.scene?.events) {
        phaserInstance.scene.events.emit('inventory-changed');
      }
      
      // Update React state
      setTimeout(() => {
        isUpdatingRef.current = false;
        setInventory(getInventoryData(phaserInstance));
      }, 50);
      
      return true;
    } catch (err) {
      console.error('Error in moveItem:', err);
      isUpdatingRef.current = false;
      return false;
    }
  };

  /**
   * Force a refresh of the inventory data
   */
  const refreshInventory = () => {
    if (!phaserInstance || isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    try {
      // First try to sync with global inventory if available
      if (phaserInstance.syncWithGlobalInventory) {
        phaserInstance.syncWithGlobalInventory();
      }
      
      // Update React state
      setTimeout(() => {
        isUpdatingRef.current = false;
        setInventory(getInventoryData(phaserInstance));
      }, 50);
    } catch (err) {
      console.error('Error in refreshInventory:', err);
      isUpdatingRef.current = false;
    }
  };

  // Return methods and data for the hook
  return {
    inventory,
    sellItem,
    addItem,
    moveItem,
    refreshInventory
  };
};

export default useInventorySync;