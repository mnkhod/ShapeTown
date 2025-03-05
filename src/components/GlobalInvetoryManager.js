import { EventBus } from "../game/EventBus";

class GlobalInventoryManager {
  constructor() {
    if (GlobalInventoryManager.instance) {
      return GlobalInventoryManager.instance;
    }
    
    GlobalInventoryManager.instance = this;
    
    this.quickItems = Array(8).fill(null);
    this.mainItems = Array(24).fill(null);
    this.activeIndex = 0;
    
    EventBus.on('inventory-changed', this.onInventoryChanged, this);
    EventBus.on('scene-switched', this.syncInventoryToScene, this);
  }
  
  syncInventoryToScene(scene) {
    if (!scene || !scene.newItemHudPrefab) return;
    
    const hudPrefab = scene.newItemHudPrefab;
    
    hudPrefab.itemData = Array(8).fill(null);
    
    hudPrefab.items.forEach(item => {
      if (item) {
        item.visible = false;
        item.setTexture("_MISSING");
      }
    });
    
    hudPrefab.itemCounters.forEach(counter => {
      if (counter) {
        counter.text = "0";
        counter.visible = false;
      }
    });
    
    hudPrefab.activeItemSlots.forEach(slot => {
      if (slot) slot.visible = false;
    });
    
    hudPrefab.activeIndex = -1;
    hudPrefab.selectedItem = null;
    
    hudPrefab.mainInventoryData = Array(24).fill(null);
    
    this.quickItems.forEach((itemData, index) => {
      if (!itemData) return;
      
      hudPrefab.itemData[index] = itemData.id;
      
      if (hudPrefab.items[index]) {
        hudPrefab.items[index].visible = true;
        hudPrefab.items[index].setTexture(itemData.textureKey || itemData.icon);
        if (itemData.frameName !== undefined) {
          hudPrefab.items[index].setFrame(itemData.frameName);
        }
      }
      
      if (hudPrefab.itemCounters[index]) {
        hudPrefab.itemCounters[index].visible = true;
        hudPrefab.itemCounters[index].text = itemData.quantity.toString();
      }
    });
    
    hudPrefab.mainInventoryData = JSON.parse(JSON.stringify(this.mainItems));
    
    if (this.activeIndex >= 0 && this.activeIndex < hudPrefab.activeItemSlots.length && 
        hudPrefab.itemData[this.activeIndex]) {
      hudPrefab.activeIndex = this.activeIndex;
      hudPrefab.selectedItem = hudPrefab.itemData[this.activeIndex];
      
      if (hudPrefab.activeItemSlots[this.activeIndex]) {
        hudPrefab.activeItemSlots[this.activeIndex].visible = true;
      }
    } else {
      const firstItemIndex = hudPrefab.itemData.findIndex(item => item !== null);
      if (firstItemIndex !== -1) {
        hudPrefab.activeIndex = firstItemIndex;
        hudPrefab.selectedItem = hudPrefab.itemData[firstItemIndex];
        
        if (hudPrefab.activeItemSlots[firstItemIndex]) {
          hudPrefab.activeItemSlots[firstItemIndex].visible = true;
        }
        
        this.activeIndex = firstItemIndex;
      }
    }
    
    EventBus.emit('inventory-synced', scene);
  }
  
  onInventoryChanged(scene) {
    if (!scene || !scene.newItemHudPrefab) return;
    
    const hudPrefab = scene.newItemHudPrefab;
    
    this.quickItems = hudPrefab.itemData.map((id, index) => {
      if (!id) return null;
      
      const item = hudPrefab.items[index];
      if (!item || !item.visible) return null;
      
      return {
        id: id,
        icon: item.texture.key,
        frame: item.frame.name,
        textureKey: item.texture.key,
        frameName: item.frame.name,
        quantity: parseInt(hudPrefab.itemCounters[index].text) || 1,
        name: id
      };
    });
    
    if (hudPrefab.mainInventoryData) {
      this.mainItems = [...hudPrefab.mainInventoryData];
    }
    
    this.activeIndex = hudPrefab.activeIndex;
    EventBus.emit('global-inventory-changed', this);
  }
  
  addItem(id, textureKey, frameId, quantity = 1, stackable = true) {
    if (stackable) {
      const quickIndex = this.quickItems.findIndex(item => 
        item && item.id === id && item.textureKey === textureKey);
      
      if (quickIndex !== -1) {
        this.quickItems[quickIndex].quantity += quantity;
        EventBus.emit('global-inventory-changed', this);
        return true;
      }
      
      const mainIndex = this.mainItems.findIndex(item => 
        item && item.id === id && item.textureKey === textureKey);
      
      if (mainIndex !== -1) {
        this.mainItems[mainIndex].quantity += quantity;
        EventBus.emit('global-inventory-changed', this);
        return true;
      }
    }
    
    const emptyQuickIndex = this.quickItems.findIndex(item => item === null);
    if (emptyQuickIndex !== -1) {
      this.quickItems[emptyQuickIndex] = {
        id: id,
        icon: textureKey,
        frame: frameId,
        textureKey: textureKey,
        frameName: frameId,
        quantity: quantity,
        name: id
      };
      EventBus.emit('global-inventory-changed', this);
      return true;
    }
    
    const emptyMainIndex = this.mainItems.findIndex(item => item === null);
    if (emptyMainIndex !== -1) {
      this.mainItems[emptyMainIndex] = {
        id: id,
        icon: textureKey,
        frame: frameId,
        textureKey: textureKey,
        frameName: frameId,
        quantity: quantity,
        name: id
      };
      EventBus.emit('global-inventory-changed', this);
      return true;
    }
    
    return false;
  }
  
  removeItem(id, quantity = 1) {
    for (let i = 0; i < this.quickItems.length; i++) {
      const item = this.quickItems[i];
      if (item && item.id === id) {
        if (item.quantity <= quantity) {
          this.quickItems[i] = null;
        } else {
          item.quantity -= quantity;
        }
        EventBus.emit('global-inventory-changed', this);
        return true;
      }
    }
    
    for (let i = 0; i < this.mainItems.length; i++) {
      const item = this.mainItems[i];
      if (item && item.id === id) {
        if (item.quantity <= quantity) {
          this.mainItems[i] = null;
        } else {
          item.quantity -= quantity;
        }
        EventBus.emit('global-inventory-changed', this);
        return true;
      }
    }
    
    return false;
  }
  
  hasItem(id) {
    let quantity = 0;
    
    this.quickItems.forEach(item => {
      if (item && item.id === id) {
        quantity += item.quantity;
      }
    });
    
    this.mainItems.forEach(item => {
      if (item && item.id === id) {
        quantity += item.quantity;
      }
    });
    
    return quantity;
  }
  
  saveToLocalStorage() {
    try {
      const saveData = {
        quickItems: this.quickItems,
        mainItems: this.mainItems
      };
      localStorage.setItem('inventory_data', JSON.stringify(saveData));
      return true;
    } catch (error) {
      return false;
    }
  }
  
  loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('inventory_data');
      if (!savedData) return false;
      
      const inventoryData = JSON.parse(savedData);
      if (inventoryData.quickItems) this.quickItems = inventoryData.quickItems;
      if (inventoryData.mainItems) this.mainItems = inventoryData.mainItems;
      
      EventBus.emit('global-inventory-changed', this);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  clearInventory() {
    this.quickItems = Array(8).fill(null);
    this.mainItems = Array(24).fill(null);
    EventBus.emit('global-inventory-changed', this);
  }
}

export const globalInventory = new GlobalInventoryManager();