class GoldManager {
    constructor(phaserInstance) {
      this.phaserInstance = phaserInstance;
      this.listeners = [];
      
      // Get initial gold amount
      this.goldAmount = this.getGoldFromGame() || 0;
      
      console.log(`GoldManager initialized with ${this.goldAmount} gold`);
    }
    
    /**
     * Get the current gold amount from the game state
     * @returns {number} The current gold amount
     */
    getGoldFromGame() {
      const instance = this.phaserInstance;
      if (!instance) return 0;
      
      // Try to get gold from all possible locations
      if (instance.gold !== undefined) {
        return instance.gold;
      } else if (instance.scene?.gold !== undefined) {
        return instance.scene.gold;
      } else if (instance.TotalGoldPrefab?.TotalGold !== undefined) {
        return instance.TotalGoldPrefab.TotalGold;
      }
      
      return 0;
    }
    
    /**
     * Get the current gold amount
     * @returns {number} The current gold amount
     */
    getGold() {
      return this.goldAmount;
    }
    
    /**
     * Set the gold amount to a specific value
     * @param {number} amount - The new gold amount
     */
    setGold(amount) {
      const newAmount = Math.max(0, amount);
      console.log(`GoldManager: Setting gold to ${newAmount} (was ${this.goldAmount})`);
      
      this.goldAmount = newAmount;
      this.updateGameGold();
      this.notifyListeners();
      
      return this.goldAmount;
    }
    
    /**
     * Add gold to the player's total
     * @param {number} amount - The amount of gold to add
     * @returns {number} The new gold amount
     */
    addGold(amount) {
      if (amount <= 0) return this.goldAmount;
      
      const newAmount = this.goldAmount + amount;
      console.log(`GoldManager: Adding ${amount} gold. New total: ${newAmount}`);
      
      return this.setGold(newAmount);
    }
    
    /**
     * Spend gold if the player has enough
     * @param {number} amount - The amount of gold to spend
     * @returns {boolean} Whether the transaction was successful
     */
    spendGold(amount) {
      if (amount <= 0) return true;
      if (this.goldAmount < amount) {
        console.log(`GoldManager: Not enough gold to spend ${amount}. Current gold: ${this.goldAmount}`);
        return false;
      }
      
      const newAmount = this.goldAmount - amount;
      console.log(`GoldManager: Spending ${amount} gold. New total: ${newAmount}`);
      
      this.setGold(newAmount);
      return true;
    }
    
    /**
     * Update the gold amount in all game locations
     */
    updateGameGold() {
      const instance = this.phaserInstance;
      if (!instance) return;
      
      // Update gold in all possible locations
      if (instance.gold !== undefined) {
        instance.gold = this.goldAmount;
      }
      
      if (instance.scene && instance.scene.gold !== undefined) {
        instance.scene.gold = this.goldAmount;
      }
      
      if (instance.TotalGoldPrefab) {
        if (instance.TotalGoldPrefab.TotalGold !== undefined) {
          instance.TotalGoldPrefab.TotalGold = this.goldAmount;
        }
        
        if (instance.TotalGoldPrefab.totalGoldAmountText) {
          instance.TotalGoldPrefab.totalGoldAmountText.setText(this.goldAmount.toString());
        }
      }
      
      // Emit events to notify other parts of the game
      if (instance.scene?.events) {
        instance.scene.events.emit('gold-changed', this.goldAmount);
      }
    }
    
    /**
     * Add a listener to be notified when gold changes
     * @param {Function} callback - The callback function
     */
    addListener(callback) {
      if (typeof callback === 'function') {
        this.listeners.push(callback);
      }
    }
    
    /**
     * Remove a listener
     * @param {Function} callback - The callback function to remove
     */
    removeListener(callback) {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    }
    
    /**
     * Notify all listeners of a gold change
     */
    notifyListeners() {
      this.listeners.forEach(callback => {
        try {
          callback(this.goldAmount);
        } catch (err) {
          console.error('Error in gold change listener:', err);
        }
      });
    }
  }
  
  // Create a singleton instance that can be used throughout the game
  let goldManagerInstance = null;
  
  /**
   * Get the gold manager instance, creating it if necessary
   * @param {Object} phaserInstance - The Phaser game instance
   * @returns {GoldManager} The gold manager instance
   */
  export const getGoldManager = (phaserInstance) => {
    if (!goldManagerInstance && phaserInstance) {
      goldManagerInstance = new GoldManager(phaserInstance);
    }
    
    return goldManagerInstance;
  };
  
  export default getGoldManager;