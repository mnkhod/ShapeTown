import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InventorySlot = ({ 
  item, 
  onItemClick, 
  slotIndex, 
  onItemDrop,
  isQuickAccess = false,
  isActive = false
}) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const fromData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onItemDrop(fromData, slotIndex);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      index: slotIndex,
      isQuickAccess
    }));
  };

  return (
    <div 
      className="relative cursor-pointer"
      style={{
        width: '50px',
        height: '50px',
      }}
      onClick={() => onItemClick(item, slotIndex)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable={!!item}
      onDragStart={handleDragStart}
    >
      {item && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={item.icon} 
            alt={item.name}
            className="w-[48px] h-[48px] "
            style={{ imageRendering: 'pixelated' }}
          />
          {item.quantity > 1 && (
            <span className="absolute bottom-1 right-1 text-[10px] text-white">
              {item.quantity}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const PhaserInventory = ({ onClose, phaserInstance }) => {
  const [mainItems, setMainItems] = useState(Array(24).fill(null));
  const [quickItems, setQuickItems] = useState(Array(8).fill(null));
  const [activeQuickSlot, setActiveQuickSlot] = useState(0);

  useEffect(() => {
    if (phaserInstance) {
      const phaserItems = phaserInstance.itemData.map((key, index) => {
        if (!key) return null;
        return {
          id: key,
          icon: phaserInstance.items[index].texture.key,
          textureId: phaserInstance.items[index].frame.name,
          quantity: parseInt(phaserInstance.itemCounters[index].text),
          name: key
        };
      });
      setQuickItems(phaserItems);
    }
  }, [phaserInstance]);

  const handleItemClick = (item, slotIndex, isQuickAccess) => {
    if (isQuickAccess) {
      setActiveQuickSlot(slotIndex);
      if (phaserInstance) {
        phaserInstance.activeIndex = slotIndex;
        phaserInstance.selectedItem = item?.id || null;
      }
    }
  };

  const handleItemDrop = (fromData, toIndex) => {
    const { index: fromIndex, isQuickAccess: fromQuickAccess } = fromData;
    
    if (fromQuickAccess) {
      const newQuickItems = [...quickItems];
      const fromItem = newQuickItems[fromIndex];
      
      if (toIndex >= 24) {
        const toItem = quickItems[toIndex - 24];
        newQuickItems[toIndex - 24] = fromItem;
        newQuickItems[fromIndex] = toItem;
        setQuickItems(newQuickItems);
      } else {
        // Drop to main inventory
        const newMainItems = [...mainItems];
        const toItem = mainItems[toIndex];
        newMainItems[toIndex] = fromItem;
        newQuickItems[fromIndex] = toItem;
        setMainItems(newMainItems);
        setQuickItems(newQuickItems);
      }
    } else {
      const newMainItems = [...mainItems];
      const fromItem = newMainItems[fromIndex];
      
      if (toIndex >= 24) {
        const newQuickItems = [...quickItems];
        const toItem = quickItems[toIndex - 24];
        newQuickItems[toIndex - 24] = fromItem;
        newMainItems[fromIndex] = toItem;
        setQuickItems(newQuickItems);
        setMainItems(newMainItems);
      } else {
        const toItem = mainItems[toIndex];
        newMainItems[toIndex] = fromItem;
        newMainItems[fromIndex] = toItem;
        setMainItems(newMainItems);
      }
    }
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
          src="/assets/hud/Inventory/InventoryBackground.png" 
          alt="Inventory background"
          className=''
          style={{ 
            imageRendering: 'pixelated',
            width: '800px',
            height: 'auto'
          }}
        />
        
        <div className="absolute top-12 left-20">
          <img 
            src="/assets/hud/Inventory/InactiveSlotBackground.png"
            alt="Inactive slot background"
            style={{ 
              imageRendering: 'pixelated',
              width: '90%',
              height: '90%'
            }}
          />
          <div 
            className="absolute top-[16px] left-[24px]"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 78px)',
              gridTemplateRows: 'repeat(3, 72px)',
              gap: 0
            }}
          >
            {mainItems.map((item, index) => (
              <InventorySlot
                key={index}
                item={item}
                slotIndex={index}
                onItemClick={(item) => handleItemClick(item, index, false)}
                onItemDrop={handleItemDrop}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-20">
          <img 
            src="/assets/hud/Inventory/ActiveSlotBackground.png"
            alt="Active slot background"
            style={{ 
              imageRendering: 'pixelated',
              width: '90%',
              height: '90%'
            }}
          />
          <div 
            className="absolute top-[16px] left-[24px] "
            style={{
              display: 'flex',
              gap: 28,
            }}
          >
            {quickItems.map((item, index) => (
              <InventorySlot
                key={index}
                item={item}
                slotIndex={index + 24}
                onItemClick={(item) => handleItemClick(item, index, true)}
                onItemDrop={handleItemDrop}
                isQuickAccess={true}
                isActive={index === activeQuickSlot}
              />
            ))}
          </div>
        </div>

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

InventorySlot.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number
  }),
  onItemClick: PropTypes.func.isRequired,
  slotIndex: PropTypes.number.isRequired,
  onItemDrop: PropTypes.func.isRequired,
  isQuickAccess: PropTypes.bool,
  isActive: PropTypes.bool
};

PhaserInventory.propTypes = {
  onClose: PropTypes.func.isRequired,
  phaserInstance: PropTypes.object
};

export default PhaserInventory;