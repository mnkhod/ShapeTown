// inventory-service.ts
import { getMyInventory, updateMyInventory } from './query-helper';
import { EventBus } from '../game/EventBus';

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  textureKey: string;
  frame?: number;
  frameName?: number;
  quantity: number;
  slotIndex: number;
  itemType: string;
  sellPrice?: number;
}

export interface DatabaseInventoryItem {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  slotIndex: number;
  item: {
    id: string;
    name: string;
    description: string;
    itemType: string;
    imageUrl: string;
    isStackable: boolean;
    maxStack: number;
  };
}

export class InventoryService {
  private static instance: InventoryService;
  private inventoryData: InventoryItem[] = [];
  private isLoaded = false;

  static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  /**
   * Load inventory from database instead of localStorage
   */
  async loadInventoryFromDatabase(): Promise<InventoryItem[]> {
    try {
      console.log('🎒 Loading inventory from database...');
      const response = await getMyInventory();

      if (response.success && response.data) {
        const dbInventory: DatabaseInventoryItem[] = response.data;

        // Convert database format to game format
        this.inventoryData = dbInventory.map(slot => {
          const textureData = this.getTextureKey(slot.item.imageUrl, slot.item.name);
          return {
            id: slot.item.id,
            name: slot.item.name,
            icon: slot.item.imageUrl,
            textureKey: textureData.texture,
            frame: textureData.frame,
            frameName: textureData.frame,
            quantity: slot.quantity,
            slotIndex: slot.slotIndex,
            itemType: slot.item.itemType,
            sellPrice: this.calculateItemValue(slot.item.name, slot.item.itemType)
          };
        });

        this.isLoaded = true;
        console.log('✅ Inventory loaded from database:', this.inventoryData);

        // Store in localStorage as backup/cache
        localStorage.setItem('gameInventory', JSON.stringify(this.inventoryData));

        return this.inventoryData;
      } else {
        console.warn('⚠️ No inventory data from database, using empty inventory');
        this.inventoryData = [];
        this.isLoaded = true;
        return [];
      }
    } catch (error) {
      console.error('❌ Failed to load inventory from database:', error);

      // Fallback to localStorage if database fails
      const localInventory = localStorage.getItem('gameInventory');
      if (localInventory) {
        console.log('📦 Falling back to localStorage inventory');
        this.inventoryData = JSON.parse(localInventory);
        this.isLoaded = true;
        return this.inventoryData;
      }

      this.inventoryData = [];
      this.isLoaded = true;
      return [];
    }
  }

  /**
   * Find the best available texture from a list of candidates
   */
  private findBestTexture(candidates: string[], availableTextures: string[]): string | null {
    for (const candidate of candidates) {
      if (availableTextures.includes(candidate)) {
        console.log(`✅ Found matching texture: ${candidate}`);
        return candidate;
      }
    }
    console.log(`❌ No matching texture found from candidates:`, candidates);
    return null;
  }

  /**
   * Get texture directly from item name (for NEW: items without imageUrl)
   */
  private getTextureFromItemName(cleanName: string, availableTextures?: string[]): { texture: string, frame: number } {
    console.log(`🗺️ Looking up texture for clean name: ${cleanName}`);

    // Direct name-to-texture mapping for NEW: items
    const nameToTextureMap: { [key: string]: { textures: string[], frame: number } } = {
      // Materials
      'iron-ingot': { textures: ['Icon_IronBar', 'IconToolPickaxe', 'IconToolHoe', 'AppleItem'], frame: 0 },  // Iron ingot should use Icon_IronBar texture
      'iron-bar': { textures: ['Icon_IronBar', 'IconToolPickaxe', 'IconToolHoe', 'AppleItem'], frame: 0 },   // Iron bar should also use Icon_IronBar texture

      // Backend database item names (exact match with spaces and capitals)
      'Iron Ingot': { textures: ['Icon_IronBar', 'IconToolPickaxe', 'IconToolHoe', 'AppleItem'], frame: 0 },
      'Iron Bar': { textures: ['Icon_IronBar', 'IconToolPickaxe', 'IconToolHoe', 'AppleItem'], frame: 0 },
      'Iron Ore': { textures: ['IconToolPickaxe', 'Icon_Coal', 'MiningToolPickaxe_V01', 'AppleItem'], frame: 0 },
      'Coal': { textures: ['Icon_Coal', 'IconToolPickaxe', 'AppleItem'], frame: 0 },
      'Wood': { textures: ['GameIcons1'], frame: 12 },
      'Stone': { textures: ['GameIcons1'], frame: 13 },
      'Carrot': { textures: ['crops-carrot', 'AppleItem'], frame: 0 },
      'Carrot Seeds': { textures: ['crops-seed bags-carrot', 'AppleItem'], frame: 0 },
      'Potato': { textures: ['crops-potato', 'AppleItem'], frame: 0 },
      'Potato Seeds': { textures: ['crops-seed bags-potato', 'AppleItem'], frame: 0 },
      'Wheat Seeds': { textures: ['crops-seed bags-wheat', 'AppleItem'], frame: 0 },
      'Tomato Seeds': { textures: ['crops-seed bags-tomato', 'AppleItem'], frame: 0 },
      'Iron Hoe': { textures: ['IconToolHoe', 'AppleItem'], frame: 0 },
      'Watering Can': { textures: ['IconToolWateringCan', 'AppleItem'], frame: 0 },
      'Steel Pickaxe': { textures: ['IconToolPickaxe', 'AppleItem'], frame: 0 },
      'Iron Sword': { textures: ['IconIronSword', 'AppleItem'], frame: 0 },
      'Steel Axe': { textures: ['IconToolAxe', 'AppleItem'], frame: 0 },
      'Seashell': { textures: ['Icon_Shell', 'AppleItem'], frame: 0 },
      'Steamed Carrot': { textures: ['AppleItem', 'GameIcons1'], frame: 0 },
      'iron-ore': { textures: ['IconToolPickaxe', 'Icon_Coal', 'MiningToolPickaxe_V01', 'AppleItem'], frame: 0 },  // Use pickaxe or coal icon as fallback
      'coal': { textures: ['Icon_Coal', 'IconToolPickaxe', 'AppleItem'], frame: 0 },      // Use coal icon if available
      'wood': { textures: ['GameIcons1'], frame: 12 },      // Frame 12 for wood
      'stone': { textures: ['GameIcons1'], frame: 13 },     // Frame 13 for stone

      // Seeds
      'carrot-seeds': { textures: ['crops-seed bags-carrot', 'GameIcons1'], frame: 0 },
      'potato-seeds': { textures: ['crops-seed bags-potato', 'crops-seed bags-carrot', 'GameIcons1'], frame: 0 },
      'wheat-seeds': { textures: ['crops-seed bags-wheat', 'crops-seed bags-carrot', 'GameIcons1'], frame: 0 },
      'tomato-seeds': { textures: ['crops-seed bags-tomato', 'crops-seed bags-carrot', 'GameIcons1'], frame: 0 },

      // Vegetables
      'carrot': { textures: ['crops-carrot', 'AppleItem', 'GameIcons1'], frame: 0 },
      'potato': { textures: ['crops-potato', 'AppleItem', 'GameIcons1'], frame: 0 },

      // Tools
      'watering-can': { textures: ['IconToolWateringCan', 'FarmingToolsWatering', 'GameIcons1'], frame: 0 },
      'steel-pickaxe': { textures: ['IconToolPickaxe', 'MiningToolPickaxe_V01', 'GameIcons1'], frame: 0 },
      'iron-hoe': { textures: ['IconToolHoe', 'FarmingToolsHoe', 'GameIcons1'], frame: 0 },

      // Weapons
      'iron-sword': { textures: ['IconIronSword', 'GameIcons1'], frame: 0 },
      'steel-axe': { textures: ['IconToolAxe', 'HarvestingToolAxe_V01', 'GameIcons1'], frame: 0 },

      // Consumables
      'seashell': { textures: ['ShellBeach_Icon', 'GameIcons1'], frame: 0 },
      'steamed-carrot': { textures: ['AppleItem', 'GameIcons1'], frame: 0 },
    };

    if (nameToTextureMap[cleanName]) {
      const mapping = nameToTextureMap[cleanName];
      console.log(`🗺️ Found direct mapping for ${cleanName}, trying textures:`, mapping.textures);

      // If we have available textures, try to find the best match
      if (availableTextures && availableTextures.length > 0) {
        const bestTexture = this.findBestTexture(mapping.textures, availableTextures);
        if (bestTexture) {
          console.log(`✅ Selected texture ${bestTexture} with frame ${mapping.frame} for ${cleanName}`);
          return { texture: bestTexture, frame: mapping.frame };
        }
      }

      // Fallback to first texture in list
      console.log(`🔄 Using fallback texture ${mapping.textures[0]} with frame ${mapping.frame} for ${cleanName}`);
      return { texture: mapping.textures[0], frame: mapping.frame };
    }

    // If no direct mapping found, use GameIcons1 as fallback
    console.log(`⚠️ No direct mapping found for ${cleanName}, using GameIcons1 fallback`);
    return { texture: 'GameIcons1', frame: 0 };
  }

  /**
   * Map game item keys back to database item names (for harvested crops, etc.)
   */
  private getDbItemNameFromGameKey(gameKey: string): string | null {
    const gameKeyToDbName: { [key: string]: string } = {
      'CARROT_SEED': 'Carrot Seeds',
      'seed_carrot': 'Carrot Seeds', // Jack NPC uses this key
      'POTATO_SEED': 'Potato Seeds',
      'WHEAT_SEED': 'Wheat Seeds',
      'TOMATO_SEED': 'Tomato Seeds',
      'CARROT': 'Carrot',
      'POTATO': 'Potato',
      'ToolWateringCan': 'Watering Can',
      'ToolPickaxe': 'Steel Pickaxe',
      'ToolHoe': 'Iron Hoe',
      'IronSword': 'Iron Sword',
      'ToolAxe': 'Steel Axe',
      'Seashell': 'Seashell',
      'SteamedCarrot': 'Steamed Carrot',
      'IronIngot': 'Iron Ingot',
    };

    return gameKeyToDbName[gameKey] || null;
  }

  /**
   * Map database item names to game item keys expected by the game logic
   */
  private getGameItemKey(itemName: string): string {
    // Check if this is a UUID (items with UUIDs shouldn't be mapped)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(itemName)) {
      console.warn(`⚠️ Skipping UUID item in getGameItemKey: ${itemName}`);
      return itemName; // Return as-is for UUID items
    }

    // Strip NEW: prefix if present (for newly created items)
    const cleanItemName = itemName.startsWith('NEW:') ? itemName.substring(4) : itemName;

    const itemKeyMap: { [key: string]: string } = {
      'Carrot Seeds': 'seed_carrot', // Use the same key Jack NPC uses for consistency
      'Potato Seeds': 'POTATO_SEED',
      'Wheat Seeds': 'WHEAT_SEED',
      'Tomato Seeds': 'TOMATO_SEED',
      'Carrot': 'CARROT',
      'Potato': 'POTATO',
      'Watering Can': 'ToolWateringCan',
      'Steel Pickaxe': 'ToolPickaxe',
      'Iron Hoe': 'ToolHoe',
      'Iron Sword': 'IronSword',
      'Steel Axe': 'ToolAxe',
      'Seashell': 'Seashell',
      'Steamed Carrot': 'SteamedCarrot',
      'Iron Ingot': 'IronIngot',
    };

    if (itemKeyMap[cleanItemName]) {
      return itemKeyMap[cleanItemName];
    }

    // Fallback: use the clean item name if no mapping found
    if (!uuidRegex.test(cleanItemName)) {
      console.warn(`⚠️ No game key mapping found for item: ${cleanItemName}`);
    }
    return cleanItemName.replace(/\s+/g, '');
  }

  /**
   * Get texture key and frame from database image URL
   */
  private getTextureKey(imageUrl: string, itemName: string, availableTextures?: string[]): { texture: string, frame: number } {
    // Handle NEW: prefixed items or items without imageUrl
    if (!imageUrl || imageUrl === '') {
      console.log(`🔧 No imageUrl for ${itemName}, generating from name...`);
      // Generate texture path from item name for NEW: items
      const cleanName = itemName.replace(/^NEW:/, '').toLowerCase().replace(/\s+/g, '-');
      const texturePath = `items/${cleanName}`;
      console.log(`🔧 Generated texture path: ${texturePath} for item: ${itemName}`);

      // For NEW: items, use the direct texture mapping without URL conversion
      return this.getTextureFromItemName(cleanName, availableTextures);
    }

    // Extract texture key from URL path
    // e.g., "/items/carrot-seeds.png" -> "items/carrot-seeds"
    let texturePath = imageUrl.replace(/^\//, '').replace(/\.(png|jpg|jpeg)$/i, '');
    console.log(`🗂️ Processing texture path: ${texturePath} for item: ${itemName}`);

    // Skip problematic assets/InventoryIcons paths - these are for UI only, not Phaser textures
    if (texturePath.startsWith('assets/InventoryIcons/')) {
      console.log(`⚠️ Skipping assets/InventoryIcons path for Phaser texture: ${texturePath}`);
      // Use item name instead for texture lookup
      const cleanName = itemName.replace(/^NEW:/, '').toLowerCase().replace(/\s+/g, '-');
      return this.getTextureFromItemName(cleanName, availableTextures);
    }

    // Handle common texture mapping issues with frames
    // Try multiple possible texture names for each item
    const textureMap: { [key: string]: { textures: string[], frame: number } } = {
      // Seeds
      'items/carrot-seeds': { textures: ['crops-seed bags-carrot', 'IconToolHoe', 'GameIcons1'], frame: 0 },
      'items/potato-seeds': { textures: ['crops-seed bags-potato', 'crops-seed bags-carrot', 'GameIcons1'], frame: 0 },
      'items/wheat-seeds': { textures: ['crops-seed bags-wheat', 'crops-seed bags-carrot', 'GameIcons1'], frame: 0 },
      'items/tomato-seeds': { textures: ['crops-seed bags-tomato', 'crops-seed bags-carrot', 'GameIcons1'], frame: 0 },

      // Vegetables
      'items/carrot': { textures: ['crops-carrot', 'AppleItem', 'GameIcons1'], frame: 0 },
      'items/potato': { textures: ['crops-potato', 'AppleItem', 'GameIcons1'], frame: 0 },

      // Tools
      'items/watering-can': { textures: ['IconToolWateringCan', 'FarmingToolsWatering', 'GameIcons1'], frame: 0 },
      'items/steel-pickaxe': { textures: ['IconToolPickaxe', 'MiningToolPickaxe_V01', 'GameIcons1'], frame: 0 },
      'items/iron-hoe': { textures: ['IconToolHoe', 'FarmingToolsHoe', 'GameIcons1'], frame: 0 },

      // Weapons
      'items/iron-sword': { textures: ['IconIronSword', 'GameIcons1'], frame: 0 },
      'items/steel-axe': { textures: ['IconToolAxe', 'HarvestingToolAxe_V01', 'GameIcons1'], frame: 0 },

      // Consumables
      'items/seashell': { textures: ['ShellBeach_Icon', 'GameIcons1'], frame: 0 },
      'items/steamed-carrot': { textures: ['AppleItem', 'GameIcons1'], frame: 0 },

      // Materials
      'items/iron-ingot': { textures: ['Icon_IronBar', 'IconToolPickaxe', 'IconToolHoe', 'AppleItem'], frame: 0 },
      'items/iron-bar': { textures: ['Icon_IronBar', 'IconToolPickaxe', 'IconToolHoe', 'AppleItem'], frame: 0 },
      'items/coal': { textures: ['Icon_Coal', 'GameIcons1'], frame: 0 },
      'items/wood': { textures: ['apple', 'GameIcons1'], frame: 0 },
      'items/stone': { textures: ['Icon_Stone', 'GameIcons1'], frame: 0 },

      // New asset paths from database (removed problematic paths)
      'Icon_IronBar': { textures: ['Icon_IronBar', 'AppleItem'], frame: 0 },
      'Icon_Iron_Ore': { textures: ['Icon_Iron_Ore', 'AppleItem'], frame: 0 },
      'IconIronSword': { textures: ['IconIronSword', 'AppleItem'], frame: 0 },
      'IconToolAxe': { textures: ['IconToolAxe', 'AppleItem'], frame: 0 },
      'ShellBeach_Icon': { textures: ['ShellBeach_Icon', 'AppleItem'], frame: 0 },
      'crops-carrot': { textures: ['crops-carrot', 'AppleItem'], frame: 0 },
      'Icon_Coal': { textures: ['Icon_Coal', 'AppleItem'], frame: 0 },
      'apple': { textures: ['apple', 'AppleItem'], frame: 0 },
      'Icon_Stone': { textures: ['Icon_Stone', 'AppleItem'], frame: 0 },
    };

    if (textureMap[texturePath]) {
      const mapping = textureMap[texturePath];
      console.log(`🗺️ Found mapping for ${texturePath}, trying textures:`, mapping.textures);

      // If we have available textures, try to find the best match
      if (availableTextures && availableTextures.length > 0) {
        const bestTexture = this.findBestTexture(mapping.textures, availableTextures);
        if (bestTexture) {
          return { texture: bestTexture, frame: mapping.frame };
        }
      }

      // Fallback to first texture in list
      return { texture: mapping.textures[0], frame: mapping.frame };
    }

    console.log(`🗺️ Using default texture mapping: ${texturePath}`);
    return { texture: texturePath, frame: 0 };
  }

  /**
   * Calculate item sell price based on item name and type
   */
  private calculateItemValue(itemName: string, itemType: string): number {
    const ITEM_PRICES: { [key: string]: number } = {
      // Seeds
      'Carrot Seeds': 10,
      'Potato Seeds': 20,
      'Wheat Seeds': 15,
      'Tomato Seeds': 60,

      // Vegetables
      'Carrot': 25,
      'Potato': 50,

      // Tools
      'Iron Hoe': 75,
      'Watering Can': 70,
      'Steel Pickaxe': 85,

      // Weapons
      'Iron Sword': 150,
      'Steel Axe': 80,

      // Consumables
      'Seashell': 15,
      'Steamed Carrot': 40,
    };

    if (ITEM_PRICES[itemName]) {
      return ITEM_PRICES[itemName];
    }

    // Fallback based on item type
    switch (itemType) {
      case 'WEAPON': return 100;
      case 'TOOL': return 75;
      case 'CONSUMABLE': return 20;
      case 'SEED': return 15;
      case 'VEGETABLE': return 30;
      default: return 10;
    }
  }

  /**
   * Apply inventory data to Phaser game instance
   */
  applyInventoryToGame(phaserInstance: any): void {
    if (!phaserInstance || !this.isLoaded) {
      console.warn('⚠️ Cannot apply inventory: Phaser instance not ready or inventory not loaded');
      return;
    }

    console.log('🎮 Applying database inventory to game...', this.inventoryData.length, 'items');
    console.log('📦 Items to apply:', this.inventoryData);

    // Debug: List available textures
    let availableTextures: string[] = [];
    if (phaserInstance.scene && phaserInstance.scene.textures) {
      availableTextures = Object.keys(phaserInstance.scene.textures.list);
      console.log('🎨 Total available textures:', availableTextures.length);
      console.log('🌾 Crop textures:', availableTextures.filter(key => key.toLowerCase().includes('crop')));
      console.log('🛠️ Tool textures:', availableTextures.filter(key => key.toLowerCase().includes('tool')));
      console.log('📦 Item textures:', availableTextures.filter(key => key.toLowerCase().includes('item')));
      console.log('🗂️ Game textures:', availableTextures.filter(key => key.includes('Game')));
      console.log('🎯 Icon textures:', availableTextures.filter(key => key.toLowerCase().includes('icon')));

      // Check if specific textures that we need are available
      const requiredTextures = ['GameIcons1', 'IconToolHoe', 'crops-carrot', 'crops-seed bags-carrot'];
      console.log('🔍 Required texture availability:');
      requiredTextures.forEach(texture => {
        console.log(`  ${texture}: ${availableTextures.includes(texture) ? '✅' : '❌'}`);
      });
    } else {
      console.error('❌ No texture manager found! Scene:', phaserInstance.scene);
    }

    // Initialize inventory arrays
    phaserInstance.itemData = Array(8).fill(null);
    phaserInstance.mainInventoryData = Array(24).fill(null);

    // Clear existing visual items
    if (phaserInstance.items) {
      phaserInstance.items.forEach((item: any) => {
        if (item) item.visible = false;
      });
    }

    if (phaserInstance.itemCounters) {
      phaserInstance.itemCounters.forEach((counter: any) => {
        if (counter) counter.visible = false;
      });
    }

    // Apply inventory items
    this.inventoryData.forEach((item, index) => {
      console.log(`🔧 Applying item ${index}:`, item);

      // Regenerate texture data with available textures for proper mapping
      let actualTextureKey = item.textureKey;
      let actualFrame = item.frame || 0;

      // If texture key is empty or invalid, regenerate it with available texture info
      if (!item.textureKey || item.textureKey.trim() === '') {
        console.log(`🔧 Regenerating texture data for ${item.name} with available textures...`);
        const regeneratedTexture = this.getTextureKey(item.icon, item.name, availableTextures);
        actualTextureKey = regeneratedTexture.texture;
        actualFrame = regeneratedTexture.frame;
        console.log(`🔧 Regenerated: ${item.name} -> ${actualTextureKey} (frame: ${actualFrame})`);
      }

      if (item.slotIndex < 8) {
        // Quick access slot
        // Map database item names to game item keys
        const gameItemKey = this.getGameItemKey(item.name);
        console.log(`📱 Setting quick slot ${item.slotIndex} to ${gameItemKey} (was ${item.id}) (texture: ${actualTextureKey})`);
        phaserInstance.itemData[item.slotIndex] = gameItemKey;

        if (phaserInstance.items && phaserInstance.items[item.slotIndex]) {
          const phaserItem = phaserInstance.items[item.slotIndex];
          phaserItem.visible = true;
          try {
            // Check if texture key exists and is valid
            if (!actualTextureKey || actualTextureKey.trim() === '') {
              console.error(`❌ Item ${item.name} STILL has empty/null textureKey after regeneration!`);
              throw new Error(`Empty texture key for item ${item.name} after regeneration`);
            }

            // Check if the texture exists before trying to set it
            if (availableTextures.includes(actualTextureKey)) {
              phaserItem.setTexture(actualTextureKey);
              if (actualFrame > 0) {
                phaserItem.setFrame(actualFrame);
              }
              console.log(`✅ Texture set successfully: ${actualTextureKey} (frame: ${actualFrame})`);
            } else {
              console.warn(`⚠️ Texture ${actualTextureKey} not available. Available count: ${availableTextures.length}`);
              throw new Error(`Texture ${actualTextureKey} not found`);
            }
          } catch (error) {
            console.error(`❌ Failed to set texture ${actualTextureKey}:`, error);
            console.log(`🔍 Item details:`, item);
            console.log(`🔍 Actual texture used:`, actualTextureKey, 'frame:', actualFrame);

            // Try smart fallback textures based on item type
            let fallbackTextures = [];
            const itemName = item.name.toLowerCase();

            // Choose fallbacks based on item type
            if (itemName.includes('seed')) {
              fallbackTextures = ['crops-seed bags-carrot', 'GameIcons1'];
            } else if (itemName.includes('pickaxe') || itemName.includes('tool')) {
              fallbackTextures = ['IconToolPickaxe', 'IconToolHoe', 'GameIcons1'];
            } else if (itemName.includes('hoe')) {
              fallbackTextures = ['IconToolHoe', 'GameIcons1'];
            } else if (itemName.includes('watering') || itemName.includes('can')) {
              fallbackTextures = ['IconToolWateringCan', 'GameIcons1'];
            } else if (itemName.includes('carrot') || itemName.includes('crop')) {
              fallbackTextures = ['crops-carrot', 'GameIcons1'];
            } else if (itemName.includes('iron') || itemName.includes('ingot')) {
              fallbackTextures = ['IconToolPickaxe', 'IconToolHoe', 'MiningToolPickaxe_V01', 'AppleItem'];
            } else {
              // Generic fallback - use GameIcons1 only to avoid carrot flicker
              fallbackTextures = ['GameIcons1'];
            }

            let textureSet = false;
            console.log(`🔄 Trying ${fallbackTextures.length} smart fallback textures for ${item.name}:`, fallbackTextures);

            for (const fallbackTexture of fallbackTextures) {
              try {
                if (availableTextures.includes(fallbackTexture)) {
                  phaserItem.setTexture(fallbackTexture);
                  console.log(`✅ Smart fallback texture set: ${fallbackTexture} for item ${item.name}`);
                  textureSet = true;
                  break;
                } else {
                  console.log(`⚠️ Fallback texture ${fallbackTexture} not available`);
                }
              } catch (fallbackError) {
                console.warn(`⚠️ Fallback texture ${fallbackTexture} failed:`, fallbackError);
              }
            }

            if (!textureSet) {
              console.error(`❌ All fallback textures failed for item ${item.name}. This will appear as green box.`);
              console.log(`🔍 Available textures:`, availableTextures.slice(0, 10), '...'); // Show first 10
            }
          }

          // Frame was already set above when texture was set, no need to set again
          // (actualFrame is already applied with the texture)
        } else {
          console.warn(`⚠️ No Phaser item found at slot ${item.slotIndex}`);
        }

        if (phaserInstance.itemCounters && phaserInstance.itemCounters[item.slotIndex]) {
          const counter = phaserInstance.itemCounters[item.slotIndex];
          counter.visible = true;
          counter.setText(item.quantity.toString());
          console.log(`📊 Set counter for slot ${item.slotIndex}: ${item.quantity}`);
        } else {
          console.warn(`⚠️ No item counter found at slot ${item.slotIndex}`);
        }
      } else {
        // Main inventory slot (adjust for 0-based indexing)
        const mainIndex = item.slotIndex - 8;
        if (mainIndex < 24) {
          const gameItemKey = this.getGameItemKey(item.name);
          phaserInstance.mainInventoryData[mainIndex] = {
            id: gameItemKey, // Use game key instead of UUID
            name: item.name,
            icon: item.icon,
            textureKey: actualTextureKey, // Use regenerated texture
            frame: actualFrame,          // Use regenerated frame
            frameName: actualFrame,      // Use regenerated frame
            quantity: item.quantity,
            sellPrice: item.sellPrice
          };
        }
      }
    });

    // Set first item as active if available
    if (phaserInstance.itemData.some((item: any) => item !== null)) {
      const firstItemIndex = phaserInstance.itemData.findIndex((item: any) => item !== null);
      if (firstItemIndex !== -1) {
        phaserInstance.activeIndex = firstItemIndex;
        phaserInstance.selectedItem = phaserInstance.itemData[firstItemIndex];

        if (phaserInstance.activeItemSlots && phaserInstance.activeItemSlots[firstItemIndex]) {
          phaserInstance.activeItemSlots[firstItemIndex].visible = true;
        }
      }
    }

    console.log('✅ Database inventory applied to game');

    // Emit inventory change event
    if (phaserInstance.scene?.events) {
      phaserInstance.scene.events.emit('inventory-changed');
    }
  }

  /**
   * Get current inventory data
   */
  getInventoryData(): InventoryItem[] {
    return this.inventoryData;
  }

  /**
   * Check if inventory is loaded
   */
  isInventoryLoaded(): boolean {
    return this.isLoaded;
  }

  /**
   * Sync current game inventory back to database
   */
  async syncInventoryToDatabase(phaserInstance: any): Promise<boolean> {
    try {
      if (!phaserInstance) {
        console.warn('⚠️ Cannot sync inventory: No Phaser instance provided');
        return false;
      }

      console.log('🔄 Syncing inventory to database...');

      // Debug: Add window function for manual testing
      if (typeof window !== 'undefined') {
        window.debugInventorySync = () => {
          this.syncInventoryToDatabase(phaserInstance);
        };
        window.debugInventoryData = () => {
          console.log('📊 Current Phaser inventory data:');
          console.log('  - itemData:', phaserInstance.itemData);
          console.log('  - itemCounters text:', phaserInstance.itemCounters?.map(c => c?.text));
          console.log('  - mainInventoryData:', phaserInstance.mainInventoryData);
          if (typeof phaserInstance.getFormattedInventory === 'function') {
            console.log('  - formatted inventory:', phaserInstance.getFormattedInventory());
          }
        };
      }

      // Create a map of game keys to database items for reverse lookup
      const gameKeyToDbItem = new Map();
      this.inventoryData.forEach(item => {
        const gameKey = this.getGameItemKey(item.name);
        gameKeyToDbItem.set(gameKey, item);
      });

      // Collect current inventory from Phaser game
      const currentInventory: any[] = [];

      // Collect quick access items (slots 0-7)
      if (phaserInstance.itemData) {
        phaserInstance.itemData.forEach((gameItemKey: any, index: number) => {
          if (gameItemKey) {
            // Try multiple ways to get the correct quantity
            let quantity = 1; // default

            // Try multiple methods to get the most reliable quantity
            let methods = [];

            // Method 1: Try getItemCount if available (most reliable)
            if (typeof phaserInstance.getItemCount === 'function') {
              const count = phaserInstance.getItemCount(gameItemKey);
              if (count > 0) {
                methods.push({ method: 'getItemCount', quantity: count });
              }
            }

            // Method 2: Try itemCounters text
            if (phaserInstance.itemCounters?.[index]?.text) {
              const count = parseInt(phaserInstance.itemCounters[index].text) || 0;
              if (count > 0) {
                methods.push({ method: 'itemCounters', quantity: count });
              }
            }

            // Method 3: Check formatted inventory
            if (typeof phaserInstance.getFormattedInventory === 'function') {
              const formatted = phaserInstance.getFormattedInventory();
              const quickItem = formatted.quickItems?.[index];
              if (quickItem && quickItem.id === gameItemKey && quickItem.quantity > 0) {
                methods.push({ method: 'formatted', quantity: quickItem.quantity });
              }
            }

            // Use the highest quantity found (in case of discrepancies)
            if (methods.length > 0) {
              const maxMethod = methods.reduce((max, current) =>
                current.quantity > max.quantity ? current : max
              );
              quantity = maxMethod.quantity;
              console.log(`🔢 Item ${gameItemKey} quantities:`, methods, `Using: ${maxMethod.method} = ${quantity}`);
            } else {
              quantity = 1;
              console.warn(`⚠️ No quantity found for ${gameItemKey}, defaulting to 1`);
            }

            // Find the original database item
            const dbItem = gameKeyToDbItem.get(gameItemKey);
            if (dbItem) {
              // Update existing database item
              currentInventory.push({
                itemId: dbItem.id, // Use original database UUID
                quantity,
                slotIndex: index
              });
              console.log(`📦 Slot ${index}: ${dbItem.name} x${quantity} (${gameItemKey} -> ${dbItem.id})`);
            } else {
              // This is a new item (like harvested crops)
              console.log(`🆕 New item in slot ${index}: ${gameItemKey} x${quantity}`);

              // For harvested crops, we need to use a special identifier that the backend can recognize
              // The backend should create new inventory entries for items that don't exist yet
              const dbItemName = this.getDbItemNameFromGameKey(gameItemKey);
              if (dbItemName) {
                currentInventory.push({
                  itemId: `NEW:${dbItemName}`, // Mark as new item for backend to handle
                  quantity,
                  slotIndex: index
                });
                console.log(`📦 Marked as new item: NEW:${dbItemName}`);
              } else {
                console.warn(`⚠️ Unknown game item: ${gameItemKey}`);
              }
            }
          }
        });
      }

      // Collect main inventory items (slots 8-31)
      if (phaserInstance.mainInventoryData) {
        phaserInstance.mainInventoryData.forEach((item: any, index: number) => {
          if (item) {
            currentInventory.push({
              itemId: item.id,
              quantity: item.quantity || 1,
              slotIndex: index + 8 // Offset for main inventory
            });
          }
        });
      }

      // Update inventory in database
      console.log('📤 Sending inventory data to backend:', currentInventory);

      // Validate data before sending
      for (const item of currentInventory) {
        if (!item.itemId || typeof item.quantity !== 'number' || typeof item.slotIndex !== 'number') {
          console.error('❌ Invalid inventory item before sending:', item);
          throw new Error(`Invalid inventory item: ${JSON.stringify(item)}`);
        }
      }

      await updateMyInventory(currentInventory);

      // Update our local cache
      this.inventoryData = currentInventory.map(slot => ({
        id: slot.itemId,
        name: slot.itemId, // Will be updated when we reload
        icon: '', // Will be updated when we reload
        textureKey: '', // Will be updated when we reload
        frame: 0,
        frameName: 0,
        quantity: slot.quantity,
        slotIndex: slot.slotIndex,
        itemType: 'UNKNOWN',
        sellPrice: 10
      }));

      console.log('✅ Inventory synced to database successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to sync inventory to database:', error);
      return false;
    }
  }

  /**
   * Update local inventory from Phaser game state
   */
  updateFromPhaserInstance(phaserInstance: any): void {
    if (!phaserInstance) return;

    const updatedItems: InventoryItem[] = [];

    // Update quick access items
    if (phaserInstance.itemData) {
      phaserInstance.itemData.forEach((itemId: any, index: number) => {
        if (itemId) {
          const item = phaserInstance.items?.[index];
          const quantity = parseInt(phaserInstance.itemCounters?.[index]?.text || '1');

          updatedItems.push({
            id: typeof itemId === 'object' ? itemId.id : itemId,
            name: typeof itemId === 'object' ? itemId.name || itemId.id : itemId,
            icon: item?.texture?.key || '',
            textureKey: item?.texture?.key || '',
            frame: item?.frame?.name || 0,
            frameName: item?.frame?.name || 0,
            quantity,
            slotIndex: index,
            itemType: 'UNKNOWN'
          });
        }
      });
    }

    // Update main inventory items
    if (phaserInstance.mainInventoryData) {
      phaserInstance.mainInventoryData.forEach((item: any, index: number) => {
        if (item) {
          updatedItems.push({
            id: item.id,
            name: item.name || item.id,
            icon: item.icon || item.textureKey,
            textureKey: item.textureKey || item.icon,
            frame: item.frame || 0,
            frameName: item.frameName || 0,
            quantity: item.quantity || 1,
            slotIndex: index + 8,
            itemType: item.itemType || 'UNKNOWN',
            sellPrice: item.sellPrice || 10
          });
        }
      });
    }

    this.inventoryData = updatedItems;
  }
}

export const inventoryService = InventoryService.getInstance();

// Global debug functions
if (typeof window !== 'undefined') {
  window.debugInventory = () => {
    console.log('🎒 Current inventory data:', inventoryService.getInventoryData());
    console.log('📊 Inventory loaded:', inventoryService.isInventoryLoaded());
  };

  window.forceApplyInventory = () => {
    console.log('🔧 Attempting to force apply inventory...');

    // Try multiple methods to find the Phaser game instance
    const findPhaserInstance = () => {
      // Method 1: Use our debug game reference (most reliable)
      if (window.debugGame && window.debugGame.game) {
        return window.debugGame.game;
      }

      // Method 2: Check Phaser.Game.instances
      if (window.Phaser && window.Phaser.Game && window.Phaser.Game.instances) {
        const gameInstances = window.Phaser.Game.instances;
        if (gameInstances.length > 0) {
          return gameInstances[0];
        }
      }

      // Method 3: Try to find through canvas element
      const canvas = document.querySelector('canvas');
      if (canvas && canvas.game) {
        return canvas.game;
      }

      // Method 4: Try global Phaser references
      if (window.game) return window.game;
      if (window.phaserGame) return window.phaserGame;
      if (window.gameInstance) return window.gameInstance;

      // Method 5: Try to find through WebGL context
      if (canvas) {
        const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (ctx && ctx.canvas && ctx.canvas.phaser) {
          return ctx.canvas.phaser;
        }
      }

      return null;
    };

    const game = findPhaserInstance();
    console.log('🎮 Found game instance:', !!game);

    if (game) {
      console.log('🔍 Game scenes:', game.scene?.scenes?.length || 0);
      console.log('🔍 Scene keys:', game.scene?.scenes?.map(s => s.scene?.key) || []);

      if (game.scene && game.scene.scenes && game.scene.scenes.length > 0) {
        // First try to find the active scene with HUD
        let targetScene = null;

        for (const scene of game.scene.scenes) {
          const isActive = scene.scene.isActive();
          const hasHUD = !!scene.newItemHudPrefab;

          console.log(`🔍 Checking scene ${scene.scene?.key}: active=${isActive}, hasHUD=${hasHUD}`);

          if (isActive && hasHUD) {
            targetScene = scene;
            console.log('🎯 Found ACTIVE scene with HUD prefab!');
            break;
          }
        }

        // If no active scene with HUD, fall back to any scene with HUD
        if (!targetScene) {
          console.log('⚠️ No active scene with HUD, trying any scene with HUD...');
          for (const scene of game.scene.scenes) {
            if (scene.newItemHudPrefab) {
              targetScene = scene;
              console.log(`🎯 Found scene ${scene.scene?.key} with HUD prefab (not active)`);
              break;
            }
          }
        }

        if (targetScene) {
          console.log('📦 Before applying - HUD itemData:', targetScene.newItemHudPrefab.itemData);
          inventoryService.applyInventoryToGame(targetScene.newItemHudPrefab);

          // Check immediately after applying
          setTimeout(() => {
            console.log('📦 After applying - HUD itemData:', targetScene.newItemHudPrefab.itemData);
          }, 100);

          return true;
        } else {
          console.log('❌ No scene found with newItemHudPrefab');
        }
      }
    } else {
      console.log('❌ Could not find Phaser game instance');
      const canvas = document.querySelector('canvas');
      console.log('Canvas found:', !!canvas);
      console.log('Phaser available:', !!window.Phaser);
      console.log('Game instances:', window.Phaser?.Game?.instances?.length || 0);
    }
    return false;
  };

  window.debugScenes = () => {
    console.log('🔍 Debugging all scenes...');

    if (window.debugGame && window.debugGame.game) {
      const game = window.debugGame.game;
      console.log('🎮 Game found, checking scenes...');

      if (game.scene && game.scene.scenes) {
        console.log(`📋 Total scenes: ${game.scene.scenes.length}`);

        game.scene.scenes.forEach((scene, index) => {
          const isActive = scene.scene.isActive();
          const hasHUD = !!scene.newItemHudPrefab;

          console.log(`Scene ${index}: "${scene.scene.key}"`);
          console.log(`  - Active: ${isActive}`);
          console.log(`  - Has HUD: ${hasHUD}`);

          if (hasHUD) {
            console.log(`  - HUD Items: ${scene.newItemHudPrefab.itemData ? scene.newItemHudPrefab.itemData.length : 'no itemData'}`);
            console.log(`  - HUD itemData:`, scene.newItemHudPrefab.itemData);
          }

          if (isActive) {
            console.log(`  ⭐ THIS IS THE ACTIVE SCENE`);
          }
        });

        // Try to get current scene through scene manager
        if (window.debugGame.getCurrentScene) {
          const currentScene = window.debugGame.getCurrentScene();
          console.log('🎯 Scene Manager current scene:', currentScene ? currentScene.scene.key : 'none');
        }
      }
    } else {
      console.log('❌ No game found');
    }
  };

  window.debugTextures = () => {
    console.log('🔍 Searching for textures...');

    // Try multiple ways to access textures
    const attempts = [
      () => window.game?.scene?.scenes?.[0]?.textures,
      () => (window as any).phaserGame?.game?.scene?.scenes?.[0]?.textures,
      () => (window as any).game?.textures,
      () => {
        // Try to get from active scene
        const scenes = window.game?.scene?.scenes || [];
        for (const scene of scenes) {
          if (scene.textures && scene.scene.isActive()) {
            return scene.textures;
          }
        }
        return null;
      }
    ];

    let textures = null;
    for (const attempt of attempts) {
      try {
        textures = attempt();
        if (textures) break;
      } catch (e) {
        console.log('Attempt failed:', e.message);
      }
    }

    if (textures && textures.list) {
      const textureKeys = Object.keys(textures.list);
      console.log('🎨 Found textures manager with', textureKeys.length, 'textures');
      console.log('🎨 All available textures:', textureKeys);
      console.log('🌾 Crop textures:', textureKeys.filter(t => t.toLowerCase().includes('crop')));
      console.log('🛠️ Tool textures:', textureKeys.filter(t => t.toLowerCase().includes('tool')));
      console.log('📦 Item textures:', textureKeys.filter(t => t.toLowerCase().includes('item')));
      console.log('🗂️ Game icon textures:', textureKeys.filter(t => t.includes('Game')));
      console.log('🎯 Icon textures:', textureKeys.filter(t => t.toLowerCase().includes('icon')));
      return textureKeys;
    } else {
      console.log('❌ Could not find texture manager');
      console.log('Available window properties:', Object.keys(window).filter(k => k.includes('game') || k.includes('phaser')));
      return null;
    }
  };

  console.log("✅ Debug functions available: window.debugInventory(), window.debugTextures()");
}