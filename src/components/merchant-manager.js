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
      sellPrice: 95,
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
      sellPrice: 140,
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
      sellPrice: 25,
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
      sellPrice: 75,
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
      sellPrice: 165,
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
      sellPrice: 125,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_eggplant',
      name: 'Eggplant seeds',
      icon: 'crops-seed bags-eggplant',
      iconPath: '/assets/InventoryIcons/crops-seed bags-eggplant.png',
      quantity: 999,
      buyPrice: 65,
      sellPrice: 160,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_garlic',
      name: 'Garlic seeds',
      icon: 'crops-seed bags-garlic',
      iconPath: '/assets/InventoryIcons/crops-seed bags-garlic.png',
      quantity: 999,
      buyPrice: 35,
      sellPrice: 85,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_greenbean',
      name: 'Greenbean seeds',
      icon: 'crops-seed bags-green bean',
      iconPath: '/assets/InventoryIcons/crops-seed bags-green bean.png',
      quantity: 999,
      buyPrice: 25,
      sellPrice: 65,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_parsnip',
      name: 'Parsnip seeds',
      icon: 'crops-seed bags-parsnip',
      iconPath: '/assets/InventoryIcons/crops-seed bags-parsnip.png',
      quantity: 999,
      buyPrice: 12,
      sellPrice: 30,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_potato',
      name: 'Potato seeds',
      icon: 'crops-seed bags-potato',
      iconPath: '/assets/InventoryIcons/crops-seed bags-potato.png',
      quantity: 999,
      buyPrice: 20,
      sellPrice: 50,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_pumpkin',
      name: 'Pumpkin seeds',
      icon: 'crops-seed bags-pumpkin',
      iconPath: '/assets/InventoryIcons/crops-seed bags-pumpkin.png',
      quantity: 999,
      buyPrice: 125,
      sellPrice: 320,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_radish',
      name: 'Radish seeds',
      icon: 'crops-seed bags-radish',
      iconPath: '/assets/InventoryIcons/crops-seed bags-radish.png',
      quantity: 999,
      buyPrice: 15,
      sellPrice: 25,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_red_cabbage',
      name: 'Red Cabbage seeds',
      icon: 'crops-seed bags-red cabagge',
      iconPath: '/assets/InventoryIcons/crops-seed bags-red cabagge.png',
      quantity: 999,
      buyPrice: 45,
      sellPrice: 110,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_artichoke',
      name: 'Artichoke seeds',
      icon: 'crops-seed bags-artichoke',
      iconPath: '/assets/InventoryIcons/crops-seed bags-artichoke.png',
      quantity: 999,
      buyPrice: 180,
      sellPrice: 450,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_blueberry',
      name: 'Blueberry seeds',
      icon: 'crops-seed bags-blueberry',
      iconPath: '/assets/InventoryIcons/crops-seed bags-blueberry.png',
      quantity: 999,
      buyPrice: 110,
      sellPrice: 280,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_coffee_bean',
      name: 'Coffee Bean seeds',
      icon: 'crops-seed bags-coffee bean',
      iconPath: '/assets/InventoryIcons/crops-seed bags-coffee bean.png',
      quantity: 999,
      buyPrice: 200,
      sellPrice: 500,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_grape',
      name: 'Grape seeds',
      icon: 'crops-seed bags-grape',
      iconPath: '/assets/InventoryIcons/crops-seed bags-grape.png',
      quantity: 999,
      buyPrice: 140,
      sellPrice: 350,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_melon',
      name: 'Melon seeds',
      icon: 'crops-seed bags-melon',
      iconPath: '/assets/InventoryIcons/crops-seed bags-melon.png',
      quantity: 999,
      buyPrice: 160,
      sellPrice: 400,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_strawberry',
      name: 'Strawberry seeds',
      icon: 'crops-seed bags-strawberry',
      iconPath: '/assets/InventoryIcons/crops-seed bags-strawberry.png',
      quantity: 999,
      buyPrice: 100,
      sellPrice: 250,
      description: 'Crop Seed',
      category: 'seeds'
    },
    {
      id: 'seed_tomato',
      name: 'Tomato seeds',
      icon: 'crops-seed bags-tomato',
      iconPath: '/assets/InventoryIcons/crops-seed bags-tomato.png',
      quantity: 999,
      buyPrice: 60,
      sellPrice: 150,
      description: 'Crop Seed',
      category: 'seeds'
    }
  ],
  
  [MERCHANT_TYPES.FOOD]: [
    {
      id: 'food_material_flour',
      name: 'Flour',
      icon: 'Icon_Flour',
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
      icon: 'Icon_Bottle_Of_Wine',
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
      icon: 'Icon_Recipe_V01',
      iconPath: '/assets/InventoryIcons/Icon_Recipe_V01.png',
      quantity: 5,
      buyPrice: 0,
      sellPrice: 1,
      description: 'OH YAM YAM YAM YAM...',
      category: 'drink'
    }
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