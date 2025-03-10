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
      phaserInstance.scene.events.on('gold-changed', handleInventoryChange);
      phaserInstance.scene.events.on('item-purchased', () => {
        handleInventoryChange();
      });
      
      return () => {
        phaserInstance.scene.events.off('inventory-changed', handleInventoryChange);
        phaserInstance.scene.events.off('gold-earned', handleInventoryChange);
        phaserInstance.scene.events.off('gold-spent', handleInventoryChange);
        phaserInstance.scene.events.off('gold-changed', handleInventoryChange);
        phaserInstance.scene.events.off('item-purchased');
      };
    }
  }, [phaserInstance]);

  /**
   * Calculate item value based on rarity or other properties
   * @param {Object|string} item - Item to calculate value for
   * @returns {number} - Calculated value
   */
  const ITEM_PRICES = {
    // Seeds
    "seed-artichoke": 180,
    "seed-blueberry": 110,
    "seed-bok chok": 40,
    "seed-broccoli": 55,
    "seed-carrot": 10,
    "seed-cauliflower": 30,
    "seed-chili": 70,
    "seed-coffee bean": 200,
    "seed-corn": 50,
    "seed-eggplant": 65,
    "seed-garlic": 35,
    "seed-grape": 140,
    "seed-green bean": 25,
    "seed-melon": 160,
    "seed-parsnip": 12,
    "seed-potato": 20,
    "seed-pumpkin": 125,
    "seed-radish": 15,
    "seed-red cabagge": 45,
    "seed-strawberry": 100,
    "seed-tomato": 60,
    "seed-wheat": 15,
    
    // Crops (sell prices)
    "crops_artichoke": 450,
    "crops_blueberry": 280,
    "crops_bok-choy": 95,
    "crops_broccoli": 140,
    "crops_carrot": 25,
    "crops_cauliflower": 75,
    "crops_chili": 165,
    "crops_coffee-bean": 500,
    "crops_corn": 125,
    "crops_eggplant": 160,
    "crops_garlic": 85,
    "crops_grape": 350,
    "crops_green-bean": 65,
    "crops_melon": 400,
    "crops_parsnip": 30,
    "crops_potato": 50,
    "crops_pumpkin": 320,
    "crops_radish": 25,
    "crops_red-cabagge": 110,
    "crops_strawberry": 250,
    "crops_tomato": 150,
    "crops_wheat": 35,
    
    // Fish and other items
    "FISH": 28,
    "GoldCoin": 100,
    "IronIngot": 45,
    "ToolIronSword": 150,
    "ToolAxe": 80,
    "ToolFishingRod": 120,
    "ToolHoe": 75,
    "ToolWateringCan": 70,
    "ToolPickaxe": 85,
    "Mushroom": 25,
    "maplesyrup": 40,
    "octopus": 65,
    "pinenuts": 18,
    "Salmon": 45,
    "sunfish": 35,
    "truffle": 150,
    "SHELL": 15,
  };
  
  const calculateItemValue = (item) => {
    if (!item) return 10;
    
    // Get item ID
    let itemId = typeof item === 'string' ? item : item.id;
    
    // Clean up item ID by removing file extension and path
    if (itemId) {
      // Remove file extension if present
      itemId = itemId.replace(/\.(png)$/, '');
      
      // Remove path if present
      itemId = itemId.split('/').pop();
    }
    
    // Check if we have a defined price for this item
    if (itemId && ITEM_PRICES[itemId]) {
      return ITEM_PRICES[itemId];
    }
    
    // Fall back to rarity-based calculation if no price is defined
    const baseValue = 10;
    let rarityMultiplier = 1;
    
    if (typeof item === 'object' && item.rarity) {
      const rarityValues = {
        common: 10,
        uncommon: 20,
        rare: 50,
        epic: 100,
        legendary: 250
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
      
      // Get current gold value before updating
      let currentGold = 0;
      if (phaserInstance.gold !== undefined) {
        currentGold = phaserInstance.gold || 0;
      } else if (phaserInstance.scene && phaserInstance.scene.gold !== undefined) {
        currentGold = phaserInstance.scene.gold || 0;
      } else if (phaserInstance.TotalGoldPrefab?.TotalGold !== undefined) {
        currentGold = phaserInstance.TotalGoldPrefab.TotalGold || 0;
      }
      
      // Calculate new gold amount
      const newGoldAmount = currentGold + totalValue;
      
      // Update gold in all locations
      if (phaserInstance.gold !== undefined) {
        phaserInstance.gold = newGoldAmount;
      }
      
      if (phaserInstance.scene && phaserInstance.scene.gold !== undefined) {
        phaserInstance.scene.gold = newGoldAmount;
      }
      
      if (phaserInstance.TotalGoldPrefab) {
        if (phaserInstance.TotalGoldPrefab.TotalGold !== undefined) {
          phaserInstance.TotalGoldPrefab.TotalGold = newGoldAmount;
        }
        
        if (phaserInstance.TotalGoldPrefab.totalGoldAmountText) {
          phaserInstance.TotalGoldPrefab.totalGoldAmountText.setText(newGoldAmount.toString());
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
        phaserInstance.scene.events.emit('gold-changed', newGoldAmount);
      }
      
      // Update React state
      setTimeout(() => {
        isUpdatingRef.current = false;
        const newData = getInventoryData(phaserInstance);
        // Force the gold amount to ensure it's accurate
        newData.totalGold = newGoldAmount; 
        setInventory(newData);
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
      // First check if a similar item already exists in quick access slots
      let addedToExisting = false;
      
      if (phaserInstance.itemData) {
        const quickIndex = phaserInstance.itemData.findIndex(id => 
          id && (id === item.id || (typeof id === 'object' && id?.id === item.id))
        );
        
        if (quickIndex !== -1) {
          if (typeof phaserInstance.itemData[quickIndex] === 'object') {
            phaserInstance.itemData[quickIndex].quantity = 
              (phaserInstance.itemData[quickIndex].quantity || 1) + (item.quantity || 1);
              
            if (phaserInstance.itemCounters?.[quickIndex]) {
              phaserInstance.itemCounters[quickIndex].text = 
                phaserInstance.itemData[quickIndex].quantity.toString();
            }
            
            addedToExisting = true;
          }
        }
      }
      
      // Check if we can add to existing item in main inventory
      if (!addedToExisting && phaserInstance.mainInventoryData) {
        const mainIndex = phaserInstance.mainInventoryData.findIndex(existingItem => 
          existingItem && existingItem.id === item.id
        );
        
        if (mainIndex !== -1) {
          phaserInstance.mainInventoryData[mainIndex].quantity += (item.quantity || 1);
          addedToExisting = true;
        }
      }
      
      // If not added to existing item, find empty slot
      if (!addedToExisting) {
        // Try to use the built-in addItem function from the HUD prefab
        if (typeof phaserInstance.addItem === 'function') {
          const result = phaserInstance.addItem(
            item.id,
            item.textureKey || item.icon,
            item.frameName !== undefined ? item.frameName : (item.frame || 0),
            item.quantity || 1,
            true
          );
          
          if (!result) {
            // If built-in function fails, add item directly to mainInventoryData
            if (phaserInstance.mainInventoryData) {
              const emptySlot = phaserInstance.mainInventoryData.findIndex(slot => slot === null);
              if (emptySlot !== -1) {
                phaserInstance.mainInventoryData[emptySlot] = {
                  ...item,
                  id: item.id,
                  icon: item.icon || 'items/default',
                  textureKey: item.textureKey || item.icon || 'items/default',
                  frame: item.frame !== undefined ? item.frame : 0,
                  frameName: item.frameName !== undefined ? item.frameName : 0,
                  quantity: item.quantity || 1,
                  name: item.name || item.id,
                  sellPrice: item.sellPrice || (item.buyPrice ? Math.floor(item.buyPrice * 0.4) : 10)
                };
              } else {
                isUpdatingRef.current = false;
                return false;
              }
            }
          }
        } else {
          // If no addItem function, add to mainInventoryData directly
          if (phaserInstance.mainInventoryData) {
            const emptySlot = phaserInstance.mainInventoryData.findIndex(slot => slot === null);
            if (emptySlot !== -1) {
              phaserInstance.mainInventoryData[emptySlot] = {
                ...item,
                id: item.id,
                icon: item.icon || 'items/default',
                textureKey: item.textureKey || item.icon || 'items/default',
                frame: item.frame !== undefined ? item.frame : 0,
                frameName: item.frameName !== undefined ? item.frameName : 0,
                quantity: item.quantity || 1,
                name: item.name || item.id,
                sellPrice: item.sellPrice || (item.buyPrice ? Math.floor(item.buyPrice * 0.4) : 10)
              };
            } else {
              isUpdatingRef.current = false;
              return false;
            }
          }
        }
      }
      
      // Emit events
      if (phaserInstance.scene?.events) {
        phaserInstance.scene.events.emit('inventory-changed');
      }
      
      // Update React state
      setTimeout(() => {
        isUpdatingRef.current = false;
        const newInventory = getInventoryData(phaserInstance);
        setInventory(newInventory);
      }, 50);
      
      return true;
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
      // Get source and destination details
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
              name: draggedItem.name,
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