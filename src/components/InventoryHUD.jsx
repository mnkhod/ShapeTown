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
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const fromData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onItemDrop(fromData, slotIndex);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      index: slotIndex,
      isQuickAccess,
      item
    }));
  };

  return (
    <div 
      className={`relative cursor-pointer ${isDragOver ? 'bg-gray-500/20' : ''}`}
      style={{
        width: '50px',
        height: '50px',
      }}
      onClick={() => onItemClick(item, slotIndex)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable={!!item}
      onDragStart={handleDragStart}
    >
      {item && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={`/assets/${item.icon}.png`}
            alt={item.name}
            className="w-[32px] h-[48px]"
            style={{ 
              imageRendering: 'pixelated',
              objectFit: 'none',
              objectPosition: `${item.frame * -32}px 10px`
            }}
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
    if (!phaserInstance) return;

    const mappedQuickItems = phaserInstance.itemData.map((key, index) => {
      if (!key || !phaserInstance.items?.[index]?.visible) return null;

      const phaserItem = phaserInstance.items[index];
      return {
        id: key,
        icon: phaserItem.texture.key,
        frame: phaserItem.frame.name,
        textureKey: phaserItem.texture.key,
        frameName: phaserItem.frame.name,
        quantity: parseInt(phaserInstance.itemCounters[index].text) || 1,
        name: key
      };
    });

    const mappedMainItems = phaserInstance.mainInventoryData?.map((item) => {
      if (!item) return null;
      return {
        ...item,
        textureKey: item.textureKey || item.icon,
        frameName: item.frameName || item.frame
      };
    }) || Array(24).fill(null);

    setQuickItems(mappedQuickItems);
    setMainItems(mappedMainItems);
  }, [phaserInstance]);

  const handleItemClick = (item, slotIndex, isQuickAccess) => {
    if (!isQuickAccess || !phaserInstance) return;

    const quickIndex = slotIndex - 24;
    setActiveQuickSlot(quickIndex);
    phaserInstance.activeIndex = quickIndex;
    phaserInstance.selectedItem = item?.id || null;

    if (phaserInstance.activeItemSlots) {
      phaserInstance.activeItemSlots.forEach((slot, i) => {
        if (slot) {
          slot.visible = i === quickIndex;
        }
      });
    }
  };

  const handleItemDrop = (fromData, toIndex) => {
    const { index: fromIndex, isQuickAccess: fromQuickAccess, item: draggedItem } = fromData;
    
    const isToQuickAccess = toIndex >= 24;
    const toActualIndex = isToQuickAccess ? toIndex - 24 : toIndex;
    const fromActualIndex = fromQuickAccess ? fromIndex - 24 : fromIndex;
    
    const newQuickItems = [...quickItems];
    const newMainItems = [...mainItems];
    
    const targetItem = isToQuickAccess ? quickItems[toActualIndex] : mainItems[toActualIndex];
    
    if (targetItem && draggedItem && 
        targetItem.id === draggedItem.id && 
        targetItem.icon === draggedItem.icon &&
        targetItem.frame === draggedItem.frame) {
      const combinedItem = {
        ...targetItem,
        quantity: (targetItem.quantity || 1) + (draggedItem.quantity || 1)
      };
      
      if (isToQuickAccess) {
        newQuickItems[toActualIndex] = combinedItem;
      } else {
        newMainItems[toActualIndex] = combinedItem;
      }
      
      if (fromQuickAccess) {
        newQuickItems[fromActualIndex] = null;
      } else {
        newMainItems[fromActualIndex] = null;
      }
    } else {
      if (fromQuickAccess) {
        newQuickItems[fromActualIndex] = targetItem;
        if (isToQuickAccess) {
          newQuickItems[toActualIndex] = draggedItem;
        } else {
          newMainItems[toActualIndex] = draggedItem;
        }
      } else {
        newMainItems[fromActualIndex] = targetItem;
        if (isToQuickAccess) {
          newQuickItems[toActualIndex] = draggedItem;
        } else {
          newMainItems[toActualIndex] = draggedItem;
        }
      }
    }

    setMainItems(newMainItems);
    setQuickItems(newQuickItems);

    if (phaserInstance && phaserInstance.items) {
      phaserInstance.itemData = newQuickItems.map(item => item?.id || null);
      phaserInstance.mainInventoryData = newMainItems.map(item => item ? {
        id: item.id,
        icon: item.icon,
        frame: item.frame,
        textureKey: item.textureKey || item.icon,
        frameName: item.frameName || item.frame,
        quantity: item.quantity,
        name: item.name
      } : null);
      
      newQuickItems.forEach((item, index) => {
        if (!phaserInstance.items[index]) return;
        
        if (item) {
          phaserInstance.items[index].visible = true;
          phaserInstance.items[index].setTexture(item.textureKey || item.icon);
          if (item.frameName !== undefined) {
            phaserInstance.items[index].setFrame(item.frameName);
          }
          
          if (phaserInstance.itemCounters?.[index]) {
            phaserInstance.itemCounters[index].visible = true;
            phaserInstance.itemCounters[index].text = item.quantity.toString();
          }
        } else {
          phaserInstance.items[index].visible = false;
          if (phaserInstance.itemCounters?.[index]) {
            phaserInstance.itemCounters[index].visible = false;
          }
        }
      });
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
            className="absolute top-[16px] left-[24px]"
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
                onItemClick={(item) => handleItemClick(item, index + 24, true)}
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
    quantity: PropTypes.number,
    frame: PropTypes.number
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