import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InventoryItem = ({ item, onClick, isSelected }) => {
  if (!item) return (
    <div 
      className="w-14 h-14 cursor-pointer flex-shrink-0"
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
      className={`w-14 h-14 cursor-pointer relative flex-shrink-0 ${isSelected ? 'ring-2 ring-yellow-500' : ''}`}
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
          src={item.iconPath || `/assets/${item.icon || 'items/default'}.png`}
          alt={item.name}
          className="max-w-full max-h-full scale-90" 
          style={{ 
            imageRendering: 'pixelated',
            objectFit: item.frame !== undefined ? 'none' : 'contain',
            objectPosition: item.frame !== undefined ? `${item.frame * -32}px 0` : 'center'
          }}
        />
      </div>
      
      {item.quantity > 1 && (
        <span className="absolute bottom-1 right-1 text-xs text-white drop-shadow-md">
          {item.quantity}
        </span>
      )}
    </div>
  );
};

const MerchantSellScreen = ({ onClose, phaserInstance }) => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalGold, setTotalGold] = useState(0);
  const maxInventorySlots = 32;
  
  const [buttonState, setButtonState] = useState('default');

  const SAMPLE_ITEMS = [
    {
      id: 'seed',
      name: 'Bok choy seeds',
      icon: 'items/seed',
      iconPath: '/assets/Crops/Icons/seed sack/crops/crops-seed bags-bok choy.png',
      quantity: 2,
      sellPrice: 25,
      description: 'Crop Seed'
    },
    {
      id: 'seed',
      name: 'Broccoli seeds',
      icon: 'items/seed',
      iconPath: '/assets/Crops/Icons/seed sack/crops/crops-seed bags-broccoli.png',
      quantity: 3,
      sellPrice: 30,
      description: 'Crop Seed'
    },
    {
      id: 'seed',
      name: 'Carrot seeds',
      icon: 'items/seed',
      iconPath: '/assets/Crops/Icons/seed sack/crops/crops-seed bags-carrot.png',
      quantity: 5,
      sellPrice: 120,
      description: 'Crop Seed'
    },
  ];

  useEffect(() => {
    console.log("Loading inventory and gold...");
    
    const loadPlayerInventory = () => {
      if (phaserInstance) {
        console.log("PhaserInstance:", phaserInstance);
        
        if (phaserInstance.gold !== undefined) {
          setTotalGold(phaserInstance.gold);
        } else {
          setTotalGold(100);
        }
        
        const quickItems = Array.isArray(phaserInstance.itemData) ? phaserInstance.itemData : [];
        const mainItems = Array.isArray(phaserInstance.mainInventoryData) ? phaserInstance.mainInventoryData : [];
        
        console.log("Quick items:", quickItems);
        console.log("Main items:", mainItems);
        
        const allItems = [...quickItems, ...mainItems]
          .filter(item => item !== null)
          .map(item => {
            if (typeof item === 'string') {
              return {
                id: item,
                name: item,
                icon: 'items/default',
                iconPath: '/assets/items/default.png',
                quantity: 1,
                sellPrice: 10
              };
            }
            return {
              ...item,
              iconPath: item.iconPath || `/assets/${item.icon || 'items/default'}.png`,
              sellPrice: item.sellPrice || calculateItemValue(item)
            };
          });
        
        console.log("Processed player items:", allItems);
        
        if (allItems.length > 0) {
          setInventory(allItems);
          return;
        }
      }
      
      console.log("Using sample items");
      setInventory(SAMPLE_ITEMS);
      setTotalGold(100);
    };

    loadPlayerInventory();

    const handleInventoryChange = () => {
      loadPlayerInventory();
    };

    const handleGoldChange = () => {
      if (phaserInstance && phaserInstance.gold !== undefined) {
        setTotalGold(phaserInstance.gold);
      }
    };

    if (phaserInstance?.scene?.events) {
      phaserInstance.scene.events.on('inventory-changed', handleInventoryChange);
      phaserInstance.scene.events.on('gold-earned', handleGoldChange);
      phaserInstance.scene.events.on('gold-spent', handleGoldChange);
      
      return () => {
        phaserInstance.scene.events.off('inventory-changed', handleInventoryChange);
        phaserInstance.scene.events.off('gold-earned', handleGoldChange);
        phaserInstance.scene.events.off('gold-spent', handleGoldChange);
      };
    }
  }, [phaserInstance]);

  const calculateItemValue = (item) => {
    const baseValue = 10;
    const rarityMultiplier = item.rarity ? {
      common: 1,
      uncommon: 2,
      rare: 5,
      epic: 10,
      legendary: 25
    }[item.rarity] : 1;
    
    return baseValue * rarityMultiplier;
  };

  const handleItemSelect = (item) => {
    console.log("Selected item:", item);
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    if (!selectedItem) return;
    
    const newQuantity = Math.max(1, Math.min(selectedItem.quantity, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleSell = () => {
    if (!selectedItem) return;
    
    console.log("Selling item:", selectedItem);
    console.log("Quantity:", quantity);
    
    const totalValue = selectedItem.sellPrice * quantity;
    
    if (phaserInstance) {
      phaserInstance.gold = (phaserInstance.gold || 0) + totalValue;
      
      if (phaserInstance.TotalGoldPrefab && phaserInstance.TotalGoldPrefab.TotalGold !== undefined) {
        phaserInstance.TotalGoldPrefab.TotalGold = phaserInstance.gold;
        if (phaserInstance.TotalGoldPrefab.totalGoldAmountText) {
          phaserInstance.TotalGoldPrefab.totalGoldAmountText.setText(phaserInstance.gold.toString());
        }
      }
      
      if (quantity >= selectedItem.quantity) {
        if (phaserInstance.itemData) {
          const quickIndex = phaserInstance.itemData.findIndex(id => 
            id === selectedItem.id || (typeof id === 'object' && id?.id === selectedItem.id)
          );
          
          if (quickIndex !== -1) {
            phaserInstance.itemData[quickIndex] = null;
            if (phaserInstance.items?.[quickIndex]) {
              phaserInstance.items[quickIndex].visible = false;
            }
            if (phaserInstance.itemCounters?.[quickIndex]) {
              phaserInstance.itemCounters[quickIndex].visible = false;
            }
          } else {
            const mainIndex = phaserInstance.mainInventoryData?.findIndex(item => 
              item && (item.id === selectedItem.id)
            );
            
            if (mainIndex !== -1) {
              phaserInstance.mainInventoryData[mainIndex] = null;
            }
          }
        }
      } else {
        const quickIndex = phaserInstance.itemData?.findIndex(id => 
          id === selectedItem.id || (typeof id === 'object' && id?.id === selectedItem.id)
        );
        
        if (quickIndex !== -1 && phaserInstance.itemCounters?.[quickIndex]) {
          const newQuantity = selectedItem.quantity - quantity;
          phaserInstance.itemCounters[quickIndex].text = newQuantity.toString();
          
          if (typeof phaserInstance.itemData[quickIndex] === 'object') {
            phaserInstance.itemData[quickIndex].quantity = newQuantity;
          }
        } else {
          const mainIndex = phaserInstance.mainInventoryData?.findIndex(item => 
            item && (item.id === selectedItem.id)
          );
          
          if (mainIndex !== -1) {
            phaserInstance.mainInventoryData[mainIndex].quantity -= quantity;
          }
        }
      }
      
      if (phaserInstance.scene && phaserInstance.scene.events) {
        phaserInstance.scene.events.emit('inventory-changed');
        phaserInstance.scene.events.emit('gold-earned', totalValue);
      }
    }
    
    const updatedInventory = inventory.filter(item => 
      item.id !== selectedItem.id || 
      (item.id === selectedItem.id && item.quantity > quantity)
    ).map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, quantity: item.quantity - quantity };
      }
      return item;
    });
    
    setInventory(updatedInventory);
    setTotalGold(prev => prev + totalValue);
    
    setSelectedItem(null);
    setQuantity(1);
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
              <span className="text-yellow-300 font-medium">{totalGold}</span>
            </div>
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
                        src={selectedItem.iconPath || `/assets/${selectedItem.icon || 'items/default'}.png`}
                        alt={selectedItem.name}
                        className="max-w-full max-h-full"
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
                  {inventory.length > 0 ? (
                    inventory.map((item, index) => (
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
                  
                  {inventory.length > 0 && inventory.length < maxInventorySlots && (
                    Array(maxInventorySlots - inventory.length).fill(null).map((_, index) => (
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
  phaserInstance: PropTypes.object
};

export default MerchantSellScreen;