import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGoldManager } from './gold-manager';
import { MERCHANT_TYPES, getMerchantInventory } from './merchant-manager';

const ShopItem = ({ item, onClick, isSelected }) => {
  if (!item) return (
    <div 
      className="w-full h-16 cursor-pointer flex-shrink-0"
      style={{
        backgroundImage: 'url("/assets/hud/Merchant/Hud_Inventory_Item_BackGround_3.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated'
      }}
    />
  );

  return (
    <div 
      className={`w-full h-16 cursor-pointer relative flex-shrink-0 ${isSelected ? 'ring-2 ring-yellow-500' : ''}`}
      onClick={() => onClick(item)}
      style={{
        backgroundImage: 'url("/assets/hud/Merchant/Hud_Inventory_Item_BackGround_3.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated'
      }}
    >
      <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center w-12">
        <img
          src={item.iconPath || `/assets/InventoryIcons/${item.icon || 'items/default'}.png`}
          alt={item.name}
          className="w-10 h-10" 
          style={{ 
            imageRendering: 'pixelated',
            objectFit: item.frame !== undefined ? 'none' : 'contain',
            objectPosition: item.frame !== undefined ? `${item.frame * -32}px 0` : 'center'
          }}
        />
      </div>
      
      <div className="absolute left-16 right-2 top-1">
        <span className="text-white text-xs font-bold block">{item.name}</span>
      </div>
      
      <div className="absolute left-16 bottom-1 flex items-center">
        <img 
          src="/assets/Icon/IconGoldCoin.png" 
          alt="Gold" 
          className="w-4 h-4 mr-1"
          style={{ imageRendering: 'pixelated' }}
        />
        <span className="text-yellow-300 text-xs font-bold">{item.buyPrice}</span>
      </div>
    </div>
  );
};

const MerchantBuyScreen = ({ onClose, phaserInstance, merchantType = MERCHANT_TYPES.FARMER }) => {
  const [shopItems, setShopItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalGold, setTotalGold] = useState(0);
  const [buttonState, setButtonState] = useState('default');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [merchantTitle, setMerchantTitle] = useState("");

  const goldManager = getGoldManager(phaserInstance);

  useEffect(() => {
    // Set merchant title based on type
    switch(merchantType) {
      case MERCHANT_TYPES.FARMER:
        setMerchantTitle("Seeds & Farming Tools");
        break;
      case MERCHANT_TYPES.FOOD:
        setMerchantTitle("Fresh Food & Ingredients");
        break;
      case MERCHANT_TYPES.BLACKSMITH:
        setMerchantTitle("Tools & Weapons");
        break;
      default:
        setMerchantTitle("Shop");
    }

    // Load items for this merchant type
    const merchantInventory = getMerchantInventory(merchantType);
    setShopItems(merchantInventory);

    // Get gold amount
    if (goldManager) {
      setTotalGold(goldManager.getGold());
      
      goldManager.addListener((newGoldAmount) => {
        setTotalGold(newGoldAmount);
      });
    } else {
      if (phaserInstance && phaserInstance.gold !== undefined) {
        setTotalGold(phaserInstance.gold);
      } else {
        setTotalGold(100);
      }
    }

    // Set up gold change listeners if goldManager not available
    if (!goldManager && phaserInstance?.scene?.events) {
      const handleGoldChange = () => {
        if (phaserInstance && phaserInstance.gold !== undefined) {
          setTotalGold(phaserInstance.gold);
        }
      };
      
      phaserInstance.scene.events.on('gold-earned', handleGoldChange);
      phaserInstance.scene.events.on('gold-spent', handleGoldChange);
      
      return () => {
        phaserInstance.scene.events.off('gold-earned', handleGoldChange);
        phaserInstance.scene.events.off('gold-spent', handleGoldChange);
        
        if (goldManager) {
          goldManager.removeListener(setTotalGold);
        }
      };
    }
  }, [phaserInstance, goldManager, merchantType]);

  // Clear notifications after 3 seconds
  useEffect(() => {
    if (purchaseSuccess || errorMessage) {
      const timer = setTimeout(() => {
        setPurchaseSuccess(false);
        setErrorMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [purchaseSuccess, errorMessage]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    if (!selectedItem) return;
    
    const maxAffordable = Math.floor(totalGold / selectedItem.buyPrice);
    const maxAvailable = Math.min(selectedItem.quantity, maxAffordable);
    
    const newQuantity = Math.max(1, Math.min(maxAvailable, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleBuy = () => {
    if (!selectedItem) return;
    
    const totalCost = selectedItem.buyPrice * quantity;
    
    if (totalGold < totalCost) {
      setErrorMessage("Not enough gold!");
      return;
    }
    
    try {
      // Deduct gold using goldManager or direct update
      if (goldManager) {
        goldManager.spendGold(totalCost);
      } else if (phaserInstance) {
        phaserInstance.gold = (phaserInstance.gold || 0) - totalCost;
        
        if (phaserInstance.TotalGoldPrefab && phaserInstance.TotalGoldPrefab.TotalGold !== undefined) {
          phaserInstance.TotalGoldPrefab.TotalGold = phaserInstance.gold;
          if (phaserInstance.TotalGoldPrefab.totalGoldAmountText) {
            phaserInstance.TotalGoldPrefab.totalGoldAmountText.setText(phaserInstance.gold.toString());
          }
        }
      }
      
      // Create a copy of the selected item to use for inventory
      const purchasedItem = {
        id: selectedItem.id,
        name: selectedItem.name,
        icon: selectedItem.icon,
        iconPath: selectedItem.iconPath,
        textureKey: selectedItem.icon,
        frame: selectedItem.frame || 0,
        frameName: selectedItem.frame || 0,
        quantity: quantity,
        sellPrice: selectedItem.sellPrice || Math.floor(selectedItem.buyPrice * 0.4),
        description: selectedItem.description,
        category: selectedItem.category
      };
      
      // Try to add to existing items first
      let addedToExisting = false;
      
      // Check quick access inventory
      if (phaserInstance.itemData) {
        const quickIndex = phaserInstance.itemData.findIndex(id => 
          id && (id === selectedItem.id || (typeof id === 'object' && id?.id === selectedItem.id))
        );
        
        if (quickIndex !== -1) {
          if (typeof phaserInstance.itemData[quickIndex] === 'object') {
            phaserInstance.itemData[quickIndex].quantity = 
              (phaserInstance.itemData[quickIndex].quantity || 1) + quantity;
              
            if (phaserInstance.itemCounters?.[quickIndex]) {
              phaserInstance.itemCounters[quickIndex].text = 
                phaserInstance.itemData[quickIndex].quantity.toString();
            }
            
            addedToExisting = true;
            console.log(`Added ${quantity}x ${selectedItem.name} to existing quick slot`);
          }
        }
      }
      
      // Check main inventory
      if (!addedToExisting && phaserInstance.mainInventoryData) {
        // First, create a deep copy of the mainInventoryData array to avoid direct mutation
        const mainInventoryCopy = [...phaserInstance.mainInventoryData];
        
        const mainIndex = mainInventoryCopy.findIndex(item => 
          item && item.id === selectedItem.id
        );
        
        if (mainIndex !== -1) {
          // Create a deep copy of the existing item and update its quantity
          const existingItem = {...mainInventoryCopy[mainIndex]};
          existingItem.quantity += quantity;
          
          // Update the copy in the inventory
          mainInventoryCopy[mainIndex] = existingItem;
          
          // Update the original array with our modified copy
          phaserInstance.mainInventoryData = mainInventoryCopy;
          
          addedToExisting = true;
          console.log(`Added ${quantity}x ${selectedItem.name} to existing inventory item`);
        }
      }
      
      // If not added to existing item, add as new item
      if (!addedToExisting) {
        if (phaserInstance.mainInventoryData) {
          // First, create a deep copy of the mainInventoryData array
          const mainInventoryCopy = [...phaserInstance.mainInventoryData];
          
          const emptySlot = mainInventoryCopy.findIndex(item => item === null);
          if (emptySlot !== -1) {
            // Add the new item to our copy
            mainInventoryCopy[emptySlot] = purchasedItem;
            
            // Update the original array with our modified copy
            phaserInstance.mainInventoryData = mainInventoryCopy;
            
            console.log(`Added ${quantity}x ${selectedItem.name} to empty inventory slot ${emptySlot}`);
          } else {
            setErrorMessage("Inventory is full!");
            // Refund gold
            if (goldManager) {
              goldManager.addGold(totalCost);
            } else if (phaserInstance) {
              phaserInstance.gold += totalCost;
            }
            return;
          }
        }
      }
      
      // Emit events
      if (phaserInstance.scene && phaserInstance.scene.events) {
        // Make sure to emit the event AFTER updating the inventory
        phaserInstance.scene.events.emit('inventory-changed');
        phaserInstance.scene.events.emit('gold-spent', totalCost);
        
        // Find the current merchant instance (FoodMerchant for Lily)
        const currentMerchant = phaserInstance.scene.children?.list.find(
          child => (merchantType === MERCHANT_TYPES.FOOD && child.constructor.name === "FoodMerchant") ||
                   (merchantType === MERCHANT_TYPES.FARMER && child.constructor.name === "MerchantPrefab") ||
                   (merchantType === MERCHANT_TYPES.BLACKSMITH && child.constructor.name === "BlackSmithPrefab")
        );
        
        // Emit with merchant reference
        phaserInstance.scene.events.emit('item-purchased', selectedItem, currentMerchant);
        
        // Specific handling for Quest #8 (Yam, Yam)
        const isCarrotSoupRecipe = selectedItem.id === "recipe_carrot_soup";
        const isQuest8Active = phaserInstance.scene.questSystem?.isQuestActive("008");
        
        console.log(`Buying carrot soup recipe: ${isCarrotSoupRecipe}, Quest #8 active: ${isQuest8Active}`);
        
        if (isCarrotSoupRecipe && isQuest8Active) {
          console.log("Triggering Quest #8 completion from buy screen");
          
          // Update quest progress directly
          if (phaserInstance.scene.questSystem && phaserInstance.scene.questSystem.updateQuestProgress) {
            phaserInstance.scene.questSystem.updateQuestProgress({
              "008": {
                completed: true,
                subtasks: {
                  "008-1": true
                }
              }
            });
          }
          
          // Also trigger the quest event for completeness
          if (phaserInstance.scene.triggerQuestEvent) {
            phaserInstance.scene.triggerQuestEvent('cooking:recipeCooked', { 
              recipeName: "Carrot Soup",
              success: true,
              npc: currentMerchant
            });
          }
          
          // Show success notification
          if (phaserInstance.scene.alertPrefab) {
            phaserInstance.scene.alertPrefab.alert("Quest Complete: Yam, Yam! Learned Steamed Carrot recipe!");
          }
        }
      }
      
      // Update local state if not using goldManager
      if (!goldManager) {
        setTotalGold(prev => prev - totalCost);
      }
      
      // Show success message
      setPurchaseSuccess(true);
      setQuantity(1);
    } catch (error) {
      console.error("Purchase error:", error);
      setErrorMessage("Failed to purchase item!");
      
      // Refund gold on error
      if (goldManager) {
        goldManager.addGold(totalCost);
      } else if (phaserInstance) {
        phaserInstance.gold += totalCost;
      }
    }
  };

  const canAfford = selectedItem ? totalGold >= selectedItem.buyPrice * quantity : false;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 font-malio">
      <div className="relative">
        <div className="flex relative pl-12 pt-28 pr-6"
          style={{
            backgroundImage: 'url("/assets/hud/Merchant/Background1.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
            width: '1100px',
            height: '700px'
          }}
        >
          <div className="absolute top-0 left-24 flex items-center">
            <div 
              className="relative flex items-center px-4 py-2"
            >
              <img 
                src="/assets/Icon/IconGoldCoin.png" 
                alt="Gold" 
                className="w-10 h-10 mr-2"
                style={{ imageRendering: 'pixelated' }}
              />
              <span className="text-yellow-300 font-medium">{totalGold}</span>
            </div>
          </div>

          {/* Merchant Title */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
            {merchantTitle}
          </div>

          {/* Notifications */}
          {purchaseSuccess && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-green-600/80 text-white px-4 py-2 rounded text-sm animate-bounce">
              Item purchased successfully!
            </div>
          )}
          
          {errorMessage && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-red-600/80 text-white px-4 py-2 rounded text-sm animate-bounce">
              {errorMessage}
            </div>
          )}

          <div className="flex w-full h-full p-4">
            <div className="w-[390px] p-16 flex flex-col"
              style={{
                backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_BackGround_2.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated'
              }}
            >
              <div className="flex justify-between items-center mb-4 gap-2">
                <div 
                  className="w-24 h-24 relative"
                  style={{
                    backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_Item_BackGround_3.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                >
                  {selectedItem && (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <img 
                        src={selectedItem.iconPath || `/assets/${selectedItem.icon || 'items/default'}.png`}
                        alt={selectedItem.name}
                        className="max-w-full max-h-full h-12 w-12"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}
                </div>

                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src="/assets/hud/Merchant/Hud_SellArea_ExchangeIcon_BackGround_3.png"
                    alt="Exchange"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div 
                  className="w-24 h-12 relative"
                  style={{
                    backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_GoldPrice_BackGround_3.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                >
                  {selectedItem && (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className={`font-medium ${canAfford ? 'text-yellow-300' : 'text-red-500'}`}>
                        {(selectedItem.buyPrice * quantity)}g
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className="w-full h-[110px] p-4 -mb-4"
                style={{
                  backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_Description_BackGround_3.png")',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated'
                }}
              >
                {selectedItem && (
                  <p className="text-white text-sm p-3">
                    {selectedItem.name}
                    {selectedItem.description && (
                      <span className="block text-xs mt-1 text-gray-300">
                        {selectedItem.description}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="relative flex items-center justify-center gap-2"
                style={{
                  backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_Number_BackGround_3.png")',
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  imageRendering: 'pixelated',
                  width: '270px',
                  height: '100px',
                  margin: '6px 2px'
                }}
              >
                <div className='flex items-center justify-between -mt-3 h-8 -ml-4'>
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={!selectedItem || quantity <= 1}
                    className="w-16 h-16 flex items-center justify-center text-3xl text-white font-bold disabled:opacity-50"
                  >
                    -
                  </button>
                  
                  <div className="w-12 h-8 flex items-center justify-center"
                    style={{
                      backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_Number_BackGround_4.png")',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      imageRendering: 'pixelated'
                    }}
                  >
                    <p className="text-white text-center">
                      {quantity}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={!selectedItem || !canAfford || 
                             (selectedItem && 
                              (quantity >= selectedItem.quantity || 
                               quantity >= Math.floor(totalGold / selectedItem.buyPrice)))}
                    className="w-16 h-16 flex items-center justify-center text-3xl text-white font-bold disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (selectedItem && canAfford) {
                      setButtonState('active');
                      setTimeout(() => {
                        handleBuy();
                        setButtonState('hover');
                      }, 100);
                    }
                  }}
                  onMouseEnter={() => setButtonState('hover')}
                  onMouseLeave={() => setButtonState('default')}
                  onMouseDown={() => setButtonState('active')}
                  onMouseUp={() => setButtonState('hover')}
                  disabled={!selectedItem || !canAfford}
                  className="transition-transform duration-100 absolute -mt-8 -ml-3"
                  style={{
                    width: '100px',
                    height: '75px',
                    backgroundImage: 'url("/assets/hud/Merchant/buy sell buttom.png")',
                    // Using the second part of the sprite sheet for buy button
                    backgroundPosition: buttonState === 'default' ? '0 -75px' : 
                                       buttonState === 'hover' ? '-96px -75px' : '-190px -75px',
                    backgroundSize: '300px 150px',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated',
                    transform: buttonState === 'active' ? 'scale(0.95)' : 'scale(1)',
                  }}
                >
                </button>
              </div>
            </div>

            <div className="w-[800px] p-3 relative ml-4"
              style={{
                backgroundImage: 'url("/assets/hud/Merchant/Hud_Inventory_BackGround_2.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated'
              }}
            >
              <div className="flex justify-center mb-3 items-center absolute -my-10 left-40 p-32"
                style={{
                  backgroundImage: 'url("/assets/hud/Merchant/Hud_Inventory_Label_BackGround_3.png")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}>
              </div>

              <div 
                className="overflow-y-auto pr-1 pb-2"
                style={{ 
                  margin: '40px auto', 
                  maxWidth: '480px',
                  maxHeight: '360px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#8B4513 transparent'
                }}
              >
                <div className="grid grid-cols-2 gap-4 p-4">
                  {shopItems.map((item, index) => (
                    <div key={`item-${index}`} className="w-full">
                      <ShopItem
                        item={item}
                        onClick={handleItemSelect}
                        isSelected={selectedItem && selectedItem.id === item.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-16 right-2 z-10"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer'
          }}
        >
          <img 
            src="/assets/files/image 35.png"
            alt="Close"
            className="w-full h-full"
            style={{ imageRendering: 'pixelated' }}
          />
        </button>
      </div>
    </div>
  );
};

ShopItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    iconPath: PropTypes.string,
    quantity: PropTypes.number,
    buyPrice: PropTypes.number,
    description: PropTypes.string,
    frame: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
};

MerchantBuyScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  phaserInstance: PropTypes.object,
  merchantType: PropTypes.string
};

export default MerchantBuyScreen;