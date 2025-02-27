export function initInventoryBridge(phaserInstance, reactEvents) {
    if (!phaserInstance || !phaserInstance.scene) {
      console.error('Invalid Phaser instance provided to inventory bridge');
      return;
    }
  
    phaserInstance.reactEvent = reactEvents;
    
    let isUpdating = false;
    
    const originalSyncWithGlobalInv = phaserInstance.syncWithGlobalInventory;
    const originalUpdateGlobalInv = phaserInstance.updateGlobalInventory;
  
    phaserInstance.getFormattedInventory = function() {
      const quickItems = this.itemData.map((key, index) => {
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
      });
      
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
      
      let totalGold = 0;
      if (this.gold !== undefined) {
        totalGold = this.gold;
      } else if (this.scene?.gold !== undefined) {
        totalGold = this.scene.gold;
      } else if (this.TotalGoldPrefab?.TotalGold !== undefined) {
        totalGold = this.TotalGoldPrefab.TotalGold;
      }
      
      return {
        quickItems,
        mainItems,
        activeSlot: this.activeIndex !== -1 ? this.activeIndex : 0,
        totalGold
      };
    };
  
    phaserInstance.syncWithGlobalInventory = function() {
      if (isUpdating) return;
      isUpdating = true;
      
      try {
        if (typeof originalSyncWithGlobalInv === 'function') {
          originalSyncWithGlobalInv.call(this);
        }
        
        if (this.reactEvent) {
          this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
        }
      } finally {
        isUpdating = false;
      }
    };
  
    phaserInstance.updateGlobalInventory = function() {
      if (isUpdating) return;
      isUpdating = true;
      
      try {
        if (typeof originalUpdateGlobalInv === 'function') {
          originalUpdateGlobalInv.call(this);
        }
        
        if (this.reactEvent) {
          this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
        }
      } finally {
        isUpdating = false;
      }
    };
  
    const originalCleanup = phaserInstance.cleanupInventory || function() {};
    phaserInstance.cleanupInventory = function() {
      if (isUpdating) return;
      isUpdating = true;
      
      try {
        originalCleanup.call(this);
        
        this.itemData.forEach((itemId, index) => {
          if (!itemId && this.items[index]) {
            this.items[index].visible = false;
            if (this.itemCounters[index]) {
              this.itemCounters[index].visible = false;
            }
          }
        });
        
        if (this.updateGlobalInventory) {
          this.updateGlobalInventory();
        }
        
        if (this.reactEvent) {
          this.reactEvent.emit('inventory-changed', this.getFormattedInventory());
        }
      } finally {
        isUpdating = false;
      }
    };
  
    if (!phaserInstance.calculateItemValue) {
      phaserInstance.calculateItemValue = function(item) {
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
    }
  
    const originalAddItem = phaserInstance.addItem;
    phaserInstance.addItem = function(key, textureName, textureId, amount = 1, isAddable = true) {
      if (isUpdating) return originalAddItem.call(this, key, textureName, textureId, amount, isAddable);
      isUpdating = true;
      
      let result;
      try {
        result = originalAddItem.call(this, key, textureName, textureId, amount, isAddable);
        
        if (result && this.cleanupInventory) {
          this.cleanupInventory();
        }
      } finally {
        isUpdating = false;
      }
      
      return result;
    };
  
    const originalRemoveItemByKey = phaserInstance.removeItemByKey;
    phaserInstance.removeItemByKey = function(key) {
      if (isUpdating) return originalRemoveItemByKey.call(this, key);
      isUpdating = true;
      
      try {
        originalRemoveItemByKey.call(this, key);
        
        if (this.cleanupInventory) {
          this.cleanupInventory();
        }
      } finally {
        isUpdating = false;
      }
    };
  
    if (reactEvents) {
      reactEvents.on('inventory-slot-selected', (data) => {
        if (isUpdating) return;
        isUpdating = true;
        
        try {
          const { index, item } = data;
          
          if (index >= 0 && index < 8) {
            phaserInstance.activeIndex = index;
            phaserInstance.selectedItem = item?.id || null;
            
            phaserInstance.activeItemSlots.forEach((slot, i) => {
              if (slot) {
                slot.visible = i === index;
              }
            });
            
            if (phaserInstance.cleanupInventory) {
              phaserInstance.cleanupInventory();
            }
          }
        } finally {
          isUpdating = false;
        }
      });
      
      reactEvents.on('move-item', (data) => {
        if (isUpdating) return;
        isUpdating = true;
        
        try {
          const { fromIndex, fromQuickAccess, toIndex, toQuickAccess, item } = data;
          
          if (fromQuickAccess) {
            const quickIndex = fromIndex - 24;
            phaserInstance.itemData[quickIndex] = null;
            if (phaserInstance.items[quickIndex]) {
              phaserInstance.items[quickIndex].visible = false;
            }
            if (phaserInstance.itemCounters[quickIndex]) {
              phaserInstance.itemCounters[quickIndex].visible = false;
            }
          } else {
            phaserInstance.mainInventoryData[fromIndex] = null;
          }
          
          if (toQuickAccess) {
            const quickIndex = toIndex - 24;
            phaserInstance.itemData[quickIndex] = item.id;
            if (phaserInstance.items[quickIndex]) {
              phaserInstance.items[quickIndex].visible = true;
              phaserInstance.items[quickIndex].setTexture(
                item.textureKey || item.icon || 'items/default'
              );
              if (item.frameName !== undefined) {
                phaserInstance.items[quickIndex].setFrame(item.frameName);
              }
            }
            if (phaserInstance.itemCounters[quickIndex]) {
              phaserInstance.itemCounters[quickIndex].visible = true;
              phaserInstance.itemCounters[quickIndex].text = (item.quantity || 1).toString();
            }
          } else {
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
          
          if (phaserInstance.cleanupInventory) {
            phaserInstance.cleanupInventory();
          }
        } finally {
          isUpdating = false;
        }
      });
      
      reactEvents.on('sell-item', (data) => {
        if (isUpdating) return;
        isUpdating = true;
        
        try {
          const { item, quantity } = data;
          
          if (!item) return;
          
          if (phaserInstance.gold !== undefined) {
            phaserInstance.gold = (phaserInstance.gold || 0) + (item.sellPrice * quantity);
          } else if (phaserInstance.scene.gold !== undefined) {
            phaserInstance.scene.gold = (phaserInstance.scene.gold || 0) + (item.sellPrice * quantity);
          }
          
          if (phaserInstance.TotalGoldPrefab?.TotalGold !== undefined) {
            phaserInstance.TotalGoldPrefab.TotalGold = phaserInstance.gold || phaserInstance.scene.gold;
            if (phaserInstance.TotalGoldPrefab.totalGoldAmountText) {
              phaserInstance.TotalGoldPrefab.totalGoldAmountText.setText(phaserInstance.TotalGoldPrefab.TotalGold.toString());
            }
          }
          
          const quickIndex = phaserInstance.itemData.findIndex(id => 
            id === item.id || (typeof id === 'object' && id?.id === item.id)
          );
          
          if (quickIndex !== -1) {
            if (quantity >= item.quantity) {
              phaserInstance.itemData[quickIndex] = null;
              if (phaserInstance.items[quickIndex]) {
                phaserInstance.items[quickIndex].visible = false;
              }
              if (phaserInstance.itemCounters[quickIndex]) {
                phaserInstance.itemCounters[quickIndex].visible = false;
              }
            } else {
              const newQuantity = item.quantity - quantity;
              if (phaserInstance.itemCounters[quickIndex]) {
                phaserInstance.itemCounters[quickIndex].text = newQuantity.toString();
              }
            }
          } else {
            const mainIndex = phaserInstance.mainInventoryData.findIndex(i => 
              i && i.id === item.id
            );
            
            if (mainIndex !== -1) {
              if (quantity >= phaserInstance.mainInventoryData[mainIndex].quantity) {
                phaserInstance.mainInventoryData[mainIndex] = null;
              } else {
                phaserInstance.mainInventoryData[mainIndex].quantity -= quantity;
              }
            }
          }
          
          if (phaserInstance.scene.events) {
            phaserInstance.scene.events.emit('gold-earned', item.sellPrice * quantity);
          }
          
          if (phaserInstance.cleanupInventory) {
            phaserInstance.cleanupInventory();
          }
        } finally {
          isUpdating = false;
        }
      });
    }
  
    if (phaserInstance.syncWithGlobalInventory) {
      phaserInstance.syncWithGlobalInventory();
    }
  }
  
  export default initInventoryBridge;