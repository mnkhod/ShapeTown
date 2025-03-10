export const MERCHANT_TYPES = {
    FARMER: 'farmer',
    FOOD: 'food',
    BLACKSMITH: 'blacksmith'
  };
  
  const MERCHANT_INVENTORIES = {
    [MERCHANT_TYPES.FARMER]: [
      {
        id: 'seed_bok-choy',
        name: 'Bok choy seeds',
        icon: 'crops-seed bags-bok choy',
        iconPath: '/assets/InventoryIcons/crops-seed bags-bok choy.png',
        quantity: 999,
        buyPrice: 40,
        sellPrice: 8,
        description: 'Crop Seed',
        category: 'seeds'
      },
      {
        id: 'seed_broccoli',
        name: 'Broccoli seeds',
        icon: 'crops-seed bags-broccoli',
        iconPath: '/assets/InventoryIcons/crops-seed bags-broccoli.png',
        quantity: 999,
        buyPrice: 55,
        sellPrice: 10,
        description: 'Crop Seed',
        category: 'seeds'
      },
      {
        id: 'seed_carrot',
        name: 'Carrot seeds',
        icon: 'crops-seed bags-carrot',
        iconPath: '/assets/InventoryIcons/crops-seed bags-carrot.png',
        quantity: 5,
        buyPrice: 10,
        sellPrice: 6,
        description: 'Crop Seed',
        category: 'seeds'
      },
      {
        id: 'seed_cauliflower',
        name: 'Cauliflower seeds',
        icon: 'crops-seed bags-cauliflower',
        iconPath: '/assets/InventoryIcons/crops-seed bags-cauliflower.png',
        quantity: 5,
        buyPrice: 30,
        sellPrice: 12,
        description: 'Crop Seed',
        category: 'seeds'
      },
      {
        id: 'seed_chili',
        name: 'Chili seeds',
        icon: 'crops-seed bags-chili',
        iconPath: '/assets/InventoryIcons/crops-seed bags-chili.png',
        quantity: 3,
        buyPrice: 70,
        sellPrice: 9,
        description: 'Crop Seed',
        category: 'seeds'
      },
      {
        id: 'seed_corn',
        name: 'Corn seeds',
        icon: 'crops-seed bags-corn',
        iconPath: '/assets/InventoryIcons/crops-seed bags-corn.png',
        quantity: 2,
        buyPrice: 50,
        sellPrice: 8,
        description: 'Crop Seed',
        category: 'seeds'
      },
    ],
    
    [MERCHANT_TYPES.FOOD]: [
      {
        id: 'food_material_flour',
        name: 'Flour',
        icon: 'food-material',
        iconPath: '/assets/InventoryIcons/Icon_Flour.png',
        quantity: 10,
        buyPrice: 35,
        sellPrice: 5,
        description: 'Flour',
        category: 'food'
      },
      {
        id: 'drink_wine',
        name: 'Bottle Of Wine',
        icon: 'drink-wine',
        iconPath: '/assets/InventoryIcons/Icon_Bottle_Of_Wine.png',
        quantity: 5,
        buyPrice: 1250,
        sellPrice: 0,
        description: 'Bottle Of fine wine',
        category: 'recipe'
      },
      {
        id: 'recipe_carrot_soup',
        name: 'Carrot Soup Recipe',
        icon: 'recipe_carrot_soup',
        iconPath: '/assets/InventoryIcons/Icon_Recipe_V01.png',
        quantity: 5,
        buyPrice: 0,
        sellPrice: 1,
        description: 'OH YAM YAM YAM YAM...',
        category: 'drink'
      },
    ],
    
    [MERCHANT_TYPES.BLACKSMITH]: [
      {
        id: 'IronSword',
        name: 'Iron Sword',
        icon: 'IconIronSword',
        iconPath: '/assets/InventoryIcons/IconIronSword.png',
        quantity: 1,
        buyPrice: 800,
        sellPrice: 400,
        description: 'A basic sword',
        category: 'weapons'
      },
      {
        id: 'GoldenSword',
        name: 'Golden Sword',
        icon: 'GoldenSword',
        iconPath: '/assets/InventoryIcons/Icon_Gold_Sword.png',
        quantity: 1,
        buyPrice: 50000,
        sellPrice: 25000,
        description: 'Oh- OH!? SHINY!',
        category: 'weapons'
      }
    ]
  };
  
  /**
   * Get inventory items for a specific merchant type
   * @param {string} merchantType - Type of merchant (from MERCHANT_TYPES)
   * @returns {Array} - Array of items for that merchant
   */
  export const getMerchantInventory = (merchantType) => {
    if (!merchantType || !MERCHANT_INVENTORIES[merchantType]) {
      console.warn(`Unknown merchant type: ${merchantType}. Defaulting to farmer.`);
      return MERCHANT_INVENTORIES[MERCHANT_TYPES.FARMER];
    }
    
    return MERCHANT_INVENTORIES[merchantType];
  };
  
  /**
   * Check if an item can be sold to a specific merchant
   * @param {Object} item - The item to check
   * @param {string} merchantType - Type of merchant
   * @returns {boolean} - Whether the merchant will buy this item
   */
  export const canMerchantBuyItem = (item, merchantType) => {
    if (!item || !merchantType) return false;
    
    // Each merchant buys specific categories
    const buyableCategories = {
      [MERCHANT_TYPES.FARMER]: ['seeds', 'crops'],
      [MERCHANT_TYPES.FOOD]: ['food', 'crops', 'ingredients'],
      [MERCHANT_TYPES.BLACKSMITH]: ['tools', 'weapons', 'ores', 'metals']
    };
    
    // Get the item's category
    const itemCategory = item.category || getCategoryFromId(item.id);
    
    // Check if this merchant buys this category
    return buyableCategories[merchantType]?.includes(itemCategory) || false;
  };
  
  /**
   * Try to guess category from item ID
   * @param {string} itemId - Item ID
   * @returns {string} - Best guess at category
   */
  const getCategoryFromId = (itemId) => {
    if (!itemId) return 'misc';
    
    if (itemId.startsWith('seed_')) return 'seeds';
    if (itemId.startsWith('food_')) return 'food';
    if (itemId.startsWith('Tool')) return 'tools';
    if (itemId.includes('Sword')) return 'weapons';
    
    return 'misc';
  };