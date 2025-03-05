import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGoldManager } from './gold-manager';

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

const MerchantBuyScreen = ({ onClose, phaserInstance }) => {
  const [shopItems, setShopItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalGold, setTotalGold] = useState(0);
  const [buttonState, setButtonState] = useState('default');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goldManager = getGoldManager(phaserInstance);
  
  const SHOP_ITEMS = [
    {
      id: 'seed_bok-choy',
      name: 'Bok choy seeds',
      icon: 'crops-seed bags-bok choy',
      iconPath: '/assets/InventoryIcons/crops-seed bags-bok choy.png',
      quantity: 999,
      buyPrice: 25,
      sellPrice: 8,
      description: 'Crop Seed'
    },
    {
      id: 'seed_broccoli',
      name: 'Broccoli seeds',
      icon: 'crops-seed bags-broccoli',
      iconPath: '/assets/InventoryIcons/crops-seed bags-broccoli.png',
      quantity: 999,
      buyPrice: 30,
      sellPrice: 10,
      description: 'Crop Seed'
    },
    {
      id: 'seed_carrot',
      name: 'Carrot seeds',
      icon: 'crops-seed bags-carrot',
      iconPath: '/assets/InventoryIcons/crops-seed bags-carrot.png',
      quantity: 5,
      buyPrice: 120,
      sellPrice: 6,
      description: 'Crop Seed'
    },
    {
      id: 'seed_cauliflower',
      name: 'Cauliflower seeds',
      icon: 'crops-seed bags-cauliflower',
      iconPath: '/assets/InventoryIcons/crops-seed bags-cauliflower.png',
      quantity: 5,
      buyPrice: 80,
      sellPrice: 12,
      description: 'Crop Seed'
    },
    {
      id: 'seed_chili',
      name: 'Chili seeds',
      icon: 'crops-seed bags-chili',
      iconPath: '/assets/InventoryIcons/crops-seed bags-chili.png',
      quantity: 3,
      buyPrice: 150,
      sellPrice: 9,
      description: 'Crop Seed'
    },
    {
      id: 'seed_corn',
      name: 'Corn seeds',
      icon: 'crops-seed bags-corn',
      iconPath: '/assets/InventoryIcons/crops-seed bags-corn.png',
      quantity: 2,
      buyPrice: 200,
      sellPrice: 8,
      description: 'Crop Seed'
    },
  ];

  useEffect(() => {
    const loadShopAndGold = () => {
      setShopItems(SHOP_ITEMS);

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
    };

    loadShopAndGold();

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
  }, [phaserInstance, goldManager]);

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
      
      let addedToExisting = false;
      
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
          }
        }
      }
      
      if (!addedToExisting && phaserInstance.mainInventoryData) {
        const mainIndex = phaserInstance.mainInventoryData.findIndex(item => 
          item && item.id === selectedItem.id
        );
        
        if (mainIndex !== -1) {
          phaserInstance.mainInventoryData[mainIndex].quantity += quantity;
          addedToExisting = true;
        }
      }
      
      if (!addedToExisting) {
        const newItem = {
          id: selectedItem.id,
          name: selectedItem.name,
          icon: selectedItem.icon,
          iconPath: selectedItem.iconPath,
          textureKey: selectedItem.icon,
          frame: selectedItem.frame || 0,
          frameName: selectedItem.frame || 0,
          quantity: quantity,
          sellPrice: selectedItem.sellPrice || Math.floor(selectedItem.buyPrice * 0.4),
          description: selectedItem.description
        };
        
        if (phaserInstance.mainInventoryData) {
          const emptySlot = phaserInstance.mainInventoryData.findIndex(item => item === null);
          if (emptySlot !== -1) {
            phaserInstance.mainInventoryData[emptySlot] = newItem;
          } else {
            setErrorMessage("Inventory is full!");
            if (goldManager) {
              goldManager.addGold(totalCost);
            } else if (phaserInstance) {
              phaserInstance.gold += totalCost;
            }
            return;
          }
        }
      }
      
      if (phaserInstance.scene && phaserInstance.scene.events) {
        phaserInstance.scene.events.emit('inventory-changed');
        phaserInstance.scene.events.emit('gold-spent', totalCost);
        phaserInstance.scene.events.emit('item-purchased', selectedItem);
      }
      
      if (!goldManager) {
        setTotalGold(prev => prev - totalCost);
      }
      
      setPurchaseSuccess(true);
      setQuantity(1);
    } catch (error) {
      setErrorMessage("Failed to purchase item!");
      
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

          {purchaseSuccess && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600/80 text-white px-4 py-2 rounded text-sm animate-bounce">
              Item purchased successfully!
            </div>
          )}
          
          {errorMessage && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600/80 text-white px-4 py-2 rounded text-sm animate-bounce">
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
  phaserInstance: PropTypes.object
};

export default MerchantBuyScreen;