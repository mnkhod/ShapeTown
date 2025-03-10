import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInventorySync } from './inventory-sync';
import { getGoldManager } from './gold-manager';
import { MERCHANT_TYPES } from './merchant-manager';

const InventoryItem = ({ item, onClick, isSelected }) => {
  if (!item) return (
    <div 
      className="w-16 h-16 ml-2 mt-2 cursor-pointer flex-shrink-0"
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
      className={`w-16 h-16 ml-2 mt-2 cursor-pointer relative flex-shrink-0 ${isSelected ? 'ring-4 ring-yellow-500' : ''}`}
      onClick={() => onClick(item)}
      style={{
        backgroundImage: 'url("/assets/hud/Merchant/Hud_Inventory_Item_BackGround_3.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={item.iconPath || `/assets/InventoryIcons/${item.icon || 'items/default'}.png`}
          alt={item.name}
          className="max-w-full max-h-full scale-100" 
          style={{ 
            imageRendering: 'pixelated',
            objectFit: item.frame !== undefined ? 'none' : 'contain',
            objectPosition: item.frame !== undefined ? `${item.frame * -32}px 0` : 'center'
          }}
        />
      </div>
      
      {item.quantity > 1 && (
        <span className="absolute bottom-2 right-2 text-xs text-white drop-shadow-md">
          {item.quantity}
        </span>
      )}
    </div>
  );
};

const MerchantSellScreen = ({ onClose, phaserInstance, merchantType = MERCHANT_TYPES.FARMER }) => {
  const { inventory, refreshInventory } = useInventorySync(phaserInstance);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState('default');
  const [lastSoldGold, setLastSoldGold] = useState(0);
  const [currentGold, setCurrentGold] = useState(0);
  const [merchantTitle, setMerchantTitle] = useState("Sell Items");
  const maxInventorySlots = 32;
  
  const goldManager = getGoldManager(phaserInstance);
  
  useEffect(() => {
    // Set merchant title based on type
    setMerchantTitle("Sell Items");
    
    refreshInventory();
    
    if (goldManager) {
      setCurrentGold(goldManager.getGold());
      
      goldManager.addListener((newGoldAmount) => {
        console.log(`MerchantSellScreen: Gold changed to ${newGoldAmount}`);
        setCurrentGold(newGoldAmount);
      });
    }
    
    const handleInventoryChange = () => {
      console.log("MerchantSellScreen: Inventory changed");
      refreshInventory();
      
      if (selectedItem) {
        const allItems = [
          ...inventory.quickItems.filter(item => item !== null),
          ...inventory.mainItems.filter(item => item !== null)
        ];
        
        const updatedItem = allItems.find(item => item && item.id === selectedItem.id);
        
        if (!updatedItem) {
          setSelectedItem(null);
          setQuantity(1);
        } else if (updatedItem.quantity < quantity) {
          setQuantity(updatedItem.quantity);
        }
      }
    };
    
    if (phaserInstance && phaserInstance.scene?.events) {
      phaserInstance.scene.events.on('inventory-changed', handleInventoryChange);
      
      return () => {
        phaserInstance.scene.events.off('inventory-changed', handleInventoryChange);
        if (goldManager) {
          goldManager.removeListener(setCurrentGold);
        }
      };
    }
  }, [phaserInstance, refreshInventory, inventory, selectedItem, quantity, goldManager, merchantType]);

  const allInventoryItems = [
    ...inventory.quickItems.filter(item => item !== null),
    ...inventory.mainItems.filter(item => item !== null)
  ];

  const handleItemSelect = (item) => {
    console.log("Selected item for selling:", item);
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    if (!selectedItem) return;
    
    const newQuantity = Math.max(1, Math.min(selectedItem.quantity, quantity + delta));
    setQuantity(newQuantity);
  };

  const removeItemFromInventory = (item, quantity) => {
    if (!phaserInstance || !item) return false;
    
    try {
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
      
      if (phaserInstance.scene?.events) {
        phaserInstance.scene.events.emit('inventory-changed');
      }
      
      return true;
    } catch (err) {
      console.error('Error removing item from inventory:', err);
      return false;
    }
  };

  const handleSell = () => {
    if (!selectedItem || !goldManager) return;
    
    const saleValue = selectedItem.sellPrice * quantity;
    console.log(`Selling ${quantity}x ${selectedItem.name} for ${saleValue} gold`);
    
    const isIronItem = selectedItem.id === "IronIngot" || selectedItem.id === "Ironbar";
    const isQuestActive = phaserInstance?.scene?.questSystem?.isQuestActive("002");
    
    // Log quest status
    console.log(`Selling iron item: ${isIronItem}, Quest active: ${isQuestActive}`);
    
    const itemRemoved = removeItemFromInventory(selectedItem, quantity);
    
    if (itemRemoved) {
      goldManager.addGold(saleValue);
      
      setLastSoldGold(saleValue);
      
      // Trigger quest completion if selling iron items
      if (isIronItem && isQuestActive) {
        console.log("Triggering quest completion from sell screen");
        if (phaserInstance.scene?.triggerQuestEvent) {
          phaserInstance.scene.triggerQuestEvent('quest:sold-items-to-lydia', { 
            npc: phaserInstance.scene.children.list.find(c => c.constructor.name === "MerchantPrefab")
          });
          
          goldManager.addGold(1000);
          
          if (phaserInstance.scene.alertPrefab) {
            phaserInstance.scene.alertPrefab.alert("Quest Complete: Taste of Gold");
          }
        }
      }
      
      setTimeout(() => {
        setLastSoldGold(0);
      }, 3000);
  
      refreshInventory();
  
      if (quantity >= selectedItem.quantity) {
        setSelectedItem(null);
      }
  
      setQuantity(1);
    }
  };

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
              <span className="text-yellow-300 font-medium">{currentGold}</span>
              
              {lastSoldGold > 0 && (
                <span className="ml-2 text-green-400 font-medium animate-pulse">
                  +{lastSoldGold}
                </span>
              )}
            </div>
          </div>

          {/* Merchant Title */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
            {merchantTitle}
          </div>

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
                  className="w-28 h-28 relative"
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
                        src={selectedItem.iconPath || `/assets/InventoryIcons/${selectedItem.icon || 'items/default'}.png`}
                        alt={selectedItem.name}
                        className="max-w-full max-h-full scale-150"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}
                </div>

                <div className="w-16 h-20 flex items-center justify-center">
                  <img 
                    src="/assets/hud/Merchant/Hud_SellArea_ExchangeIcon_BackGround_3.png"
                    alt="Exchange"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div 
                  className="w-1/3 h-12 relative"
                  style={{
                    backgroundImage: 'url("/assets/hud/Merchant/Hud_SellArea_GoldPrice_BackGround_3.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                >
                  {selectedItem && (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-yellow-300 font-medium">
                        {(selectedItem.sellPrice * quantity)}g
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
                    disabled={!selectedItem || quantity >= selectedItem.quantity}
                    className="w-16 h-16 flex items-center justify-center text-3xl text-white font-bold disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (selectedItem) {
                      setButtonState('active');
                      setTimeout(() => {
                        handleSell();
                        setButtonState('hover');
                      }, 100);
                    }
                  }}
                  onMouseEnter={() => setButtonState('hover')}
                  onMouseLeave={() => setButtonState('default')}
                  onMouseDown={() => setButtonState('active')}
                  onMouseUp={() => setButtonState('hover')}
                  disabled={!selectedItem}
                  className="transition-transform duration-100 absolute -mt-8 -ml-3"
                  style={{
                    width: '100px',
                    height: '75px',
                    backgroundImage: 'url("/assets/hud/Merchant/buy sell buttom.png")',
                    backgroundPosition: buttonState === 'default' ? '0 0' : 
                                       buttonState === 'hover' ? '-96px 0' : '-190px 0',
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
                <div className="grid grid-cols-4 gap-6">
                  {allInventoryItems.length > 0 ? (
                    allInventoryItems.map((item, index) => (
                      <InventoryItem
                        key={`item-${index}`}
                        item={item}
                        onClick={handleItemSelect}
                        isSelected={selectedItem && selectedItem.id === item.id}
                      />
                    ))
                  ) : (
                    Array(12).fill(null).map((_, index) => (
                      <InventoryItem 
                        key={`empty-${index}`} 
                        item={null} 
                        onClick={() => {}} 
                        isSelected={false} 
                      />
                    ))
                  )}
                  
                  {allInventoryItems.length > 0 && allInventoryItems.length < maxInventorySlots && (
                    Array(maxInventorySlots - allInventoryItems.length).fill(null).map((_, index) => (
                      <InventoryItem 
                        key={`fill-${index}`} 
                        item={null} 
                        onClick={() => {}} 
                        isSelected={false} 
                      />
                    ))
                  )}
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

InventoryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    iconPath: PropTypes.string,
    quantity: PropTypes.number,
    sellPrice: PropTypes.number,
    description: PropTypes.string,
    frame: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
};

MerchantSellScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  phaserInstance: PropTypes.object,
  merchantType: PropTypes.string
};

export default MerchantSellScreen;