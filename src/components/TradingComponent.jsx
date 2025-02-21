import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ShopInterface = ({ onClose, phaserInstance }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirming, setConfirming] = useState(false);
  
  const shopItems = [
    { id: 'sword', name: 'Iron Sword', price: 100, description: 'A basic but reliable weapon', icon: 'hud/Merchant/sword' },
    { id: 'potion', name: 'Health Potion', price: 50, description: 'Restores 50 HP', icon: 'hud/Merchant/potion' },
    { id: 'armor', name: 'Leather Armor', price: 150, description: 'Basic protection', icon: 'hud/Merchant/armor' },
    { id: 'scroll', name: 'Magic Scroll', price: 200, description: 'Contains mysterious power', icon: 'hud/Merchant/scroll' }
  ];

  const [playerGold] = useState(500); // This would normally come from phaserInstance

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setConfirming(false);
  };

  const handlePurchaseClick = () => {
    if (selectedItem && playerGold >= selectedItem.price) {
      setConfirming(true);
    }
  };

  const handleConfirmPurchase = () => {
    // Here you would handle the actual purchase through phaserInstance
    setConfirming(false);
    setSelectedItem(null);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src="/assets/hud/Merchant/ShopBackground.png" 
          alt="Shop background"
          className="w-[800px]"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Shop Items Grid */}
        <div className="absolute top-16 left-8 grid grid-cols-2 gap-4 p-4">
          {shopItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className={`relative cursor-pointer transition-all ${
                selectedItem?.id === item.id ? 'scale-105' : ''
              }`}
              className="flex items-center p-2"
            >
              <div 
                className="relative flex items-center justify-center"
                style={{
                  backgroundImage: 'url("/assets/hud/Merchant/ItemBackground.png")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  width: '50px',
                  height: '50px',
                  imageRendering: 'pixelated'
                }}
              >
                <img 
                  src={`/assets/${item.icon}.png`}
                  alt={item.name}
                  className="w-8 h-8"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="ml-4 text-white">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                <p className="mt-1 text-yellow-400">{item.price} Gold</p>
              </div>
            </div>
          ))}
        </div>

        {/* Player Gold Display */}
        <div 
          className="absolute top-4 right-8 p-4"
          style={{
            backgroundImage: 'url("/assets/hud/Merchant/MainBackground.png")',
            backgroundSize: 'cover',
            width: '200px',
            imageRendering: 'pixelated'
          }}
        >
          <p className="text-yellow-400 font-bold text-xl text-center">{playerGold} G</p>
        </div>

        {/* Purchase Controls */}
        {selectedItem && (
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4"
            style={{
              backgroundImage: 'url("/assets/hud/Merchant/MainBackground.png")',
              backgroundSize: 'cover',
              width: '300px',
              imageRendering: 'pixelated'
            }}
          >
            {!confirming ? (
              <button
                onClick={handlePurchaseClick}
                disabled={playerGold < selectedItem.price}
                className="w-full h-12 bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("/assets/hud/Merchant/${playerGold >= selectedItem.price ? 'yesButton' : 'noButton'}.png")`,
                  imageRendering: 'pixelated'
                }}
              />
            ) : (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmPurchase}
                  className="w-24 h-12 bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/assets/hud/Merchant/yesButton.png")',
                    imageRendering: 'pixelated'
                  }}
                />
                <button
                  onClick={() => setConfirming(false)}
                  className="w-24 h-12 bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/assets/hud/Merchant/noButton.png")',
                    imageRendering: 'pixelated'
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1"
          style={{
            width: '32px',
            height: '32px',
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

ShopInterface.propTypes = {
  onClose: PropTypes.func.isRequired,
  phaserInstance: PropTypes.object
};

export default ShopInterface;