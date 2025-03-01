import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInventorySync } from './inventory-sync';

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
  const { inventory, sellItem, refreshInventory } = useInventorySync(phaserInstance);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState('default');
  const maxInventorySlots = 32;
  
  useEffect(() => {
    refreshInventory();
    
    const handleInventoryChange = () => {
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
      };
    }
  }, [phaserInstance, refreshInventory, inventory, selectedItem, quantity]);

  const allInventoryItems = [
    ...inventory.quickItems.filter(item => item !== null),
    ...inventory.mainItems.filter(item => item !== null)
  ];

  const handleItemSelect = (item) => {
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
    
    const success = sellItem(selectedItem, quantity);
    
    if (success) {
      setSelectedItem(null);
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
              <span className="text-yellow-300 font-medium">{inventory.totalGold}</span>
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
  phaserInstance: PropTypes.object
};

export default MerchantSellScreen;