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
    if (!item) return;
    
    e.dataTransfer.setData('text/plain', JSON.stringify({
      index: slotIndex,
      isQuickAccess,
      item
    }));
  };

  return (
    <div 
      className={`relative cursor-pointer ${isDragOver ? 'bg-gray-500/20' : ''} ${isActive && isQuickAccess ? 'ring-2 ring-yellow-500' : ''}`}
      style={{
        width: '50px',
        height: '50px',
      }}
      onClick={() => onItemClick(item, slotIndex, isQuickAccess)}
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
  const [inventoryFull, setInventoryFull] = useState(false);
  
  useEffect(() => {
    if (!phaserInstance) return;

    if (!phaserInstance.mainInventoryData) {
      phaserInstance.mainInventoryData = Array(24).fill(null);
    }

    refreshInventoryFromPhaser();

    const hasSpace = phaserInstance.itemData.includes(null) || 
                     phaserInstance.mainInventoryData.some(item => item === null);
    setInventoryFull(!hasSpace);
    
    const handleInventoryChange = () => {
      refreshInventoryFromPhaser();
    };
    
    phaserInstance.scene.events.on('inventory-changed', handleInventoryChange);
    
    return () => {
      phaserInstance.scene.events.off('inventory-changed', handleInventoryChange);
    };
  }, [phaserInstance]);

  const refreshInventoryFromPhaser = () => {
    if (!phaserInstance) return;
    
    const mappedQuickItems = phaserInstance.itemData.map((key, index) => {
      if (!key) return null;

      const phaserItem = phaserInstance.items[index];
      if (!phaserItem?.visible) return null;
      
      return {
        id: key,
        icon: phaserItem.texture.key,
        frame: phaserItem.frame.name || 0,
        textureKey: phaserItem.texture.key,
        frameName: phaserItem.frame.name || 0,
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
    setActiveQuickSlot(phaserInstance.activeIndex !== -1 ? phaserInstance.activeIndex : 0);
    
    const hasSpace = phaserInstance.itemData.includes(null) || 
                     phaserInstance.mainInventoryData.some(item => item === null);
    setInventoryFull(!hasSpace);
  };

  const handleItemClick = (item, slotIndex, isQuickAccess) => {
    if (!phaserInstance) return;

    if (isQuickAccess) {
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
    } else {
      if (item) {
        const emptyQuickIndex = phaserInstance.itemData.findIndex(i => i === null);
        if (emptyQuickIndex !== -1) {
          const mainIndex = slotIndex;
          
          phaserInstance.itemData[emptyQuickIndex] = item.id;
          if (phaserInstance.items[emptyQuickIndex]) {
            phaserInstance.items[emptyQuickIndex].visible = true;
            phaserInstance.items[emptyQuickIndex].setTexture(item.textureKey || item.icon);
            if (item.frameName !== undefined) {
              phaserInstance.items[emptyQuickIndex].setFrame(item.frameName);
            }
          }
          
          if (phaserInstance.itemCounters?.[emptyQuickIndex]) {
            phaserInstance.itemCounters[emptyQuickIndex].visible = true;
            phaserInstance.itemCounters[emptyQuickIndex].text = item.quantity.toString();
          }
          
          phaserInstance.mainInventoryData[mainIndex] = null;
          
          refreshInventoryFromPhaser();
        }
      }
    }
  };

  const handleItemDrop = (fromData, toIndex) => {
    if (!phaserInstance) return;
    
    const { index: fromIndex, isQuickAccess: fromQuickAccess, item: draggedItem } = fromData;
    
    const isToQuickAccess = toIndex >= 24;
    const toActualIndex = isToQuickAccess ? toIndex - 24 : toIndex;
    const fromActualIndex = fromQuickAccess ? fromIndex - 24 : fromIndex;
    
    if (fromIndex === toIndex) {
      return;
    }
    
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
        phaserInstance.itemData[toActualIndex] = combinedItem.id;
        if (phaserInstance.itemCounters?.[toActualIndex]) {
          phaserInstance.itemCounters[toActualIndex].text = combinedItem.quantity.toString();
        }
        newQuickItems[toActualIndex] = combinedItem;
      } else {
        phaserInstance.mainInventoryData[toActualIndex] = combinedItem;
        newMainItems[toActualIndex] = combinedItem;
      }
      
      if (fromQuickAccess) {
        phaserInstance.itemData[fromActualIndex] = null;
        if (phaserInstance.items?.[fromActualIndex]) {
          phaserInstance.items[fromActualIndex].visible = false;
        }
        if (phaserInstance.itemCounters?.[fromActualIndex]) {
          phaserInstance.itemCounters[fromActualIndex].visible = false;
        }
        newQuickItems[fromActualIndex] = null;
      } else {
        phaserInstance.mainInventoryData[fromActualIndex] = null;
        newMainItems[fromActualIndex] = null;
      }
    } else {
      if (fromQuickAccess) {
        phaserInstance.itemData[fromActualIndex] = targetItem?.id || null;
        
        if (targetItem) {
          if (phaserInstance.items?.[fromActualIndex]) {
            phaserInstance.items[fromActualIndex].visible = true;
            phaserInstance.items[fromActualIndex].setTexture(targetItem.textureKey || targetItem.icon);
            if (targetItem.frameName !== undefined) {
              phaserInstance.items[fromActualIndex].setFrame(targetItem.frameName);
            }
          }
          if (phaserInstance.itemCounters?.[fromActualIndex]) {
            phaserInstance.itemCounters[fromActualIndex].visible = true;
            phaserInstance.itemCounters[fromActualIndex].text = targetItem.quantity.toString();
          }
        } else {
          if (phaserInstance.items?.[fromActualIndex]) {
            phaserInstance.items[fromActualIndex].visible = false;
          }
          if (phaserInstance.itemCounters?.[fromActualIndex]) {
            phaserInstance.itemCounters[fromActualIndex].visible = false;
          }
        }
        
        newQuickItems[fromActualIndex] = targetItem;
        
        if (isToQuickAccess) {
          phaserInstance.itemData[toActualIndex] = draggedItem.id;
          if (phaserInstance.items?.[toActualIndex]) {
            phaserInstance.items[toActualIndex].visible = true;
            phaserInstance.items[toActualIndex].setTexture(draggedItem.textureKey || draggedItem.icon);
            if (draggedItem.frameName !== undefined) {
              phaserInstance.items[toActualIndex].setFrame(draggedItem.frameName);
            }
          }
          if (phaserInstance.itemCounters?.[toActualIndex]) {
            phaserInstance.itemCounters[toActualIndex].visible = true;
            phaserInstance.itemCounters[toActualIndex].text = draggedItem.quantity.toString();
          }
          newQuickItems[toActualIndex] = draggedItem;
        } else {
          phaserInstance.mainInventoryData[toActualIndex] = draggedItem;
          newMainItems[toActualIndex] = draggedItem;
        }
      } else {
        phaserInstance.mainInventoryData[fromActualIndex] = targetItem;
        newMainItems[fromActualIndex] = targetItem;
        
        if (isToQuickAccess) {
          phaserInstance.itemData[toActualIndex] = draggedItem.id;
          if (phaserInstance.items?.[toActualIndex]) {
            phaserInstance.items[toActualIndex].visible = true;
            phaserInstance.items[toActualIndex].setTexture(draggedItem.textureKey || draggedItem.icon);
            if (draggedItem.frameName !== undefined) {
              phaserInstance.items[toActualIndex].setFrame(draggedItem.frameName);
            }
          }
          if (phaserInstance.itemCounters?.[toActualIndex]) {
            phaserInstance.itemCounters[toActualIndex].visible = true;
            phaserInstance.itemCounters[toActualIndex].text = draggedItem.quantity.toString();
          }
          newQuickItems[toActualIndex] = draggedItem;
        } else {
          phaserInstance.mainInventoryData[toActualIndex] = draggedItem;
          newMainItems[toActualIndex] = draggedItem;
        }
      }
    }

    setMainItems(newMainItems);
    setQuickItems(newQuickItems);
    
    const hasSpace = phaserInstance.itemData.includes(null) || 
                     phaserInstance.mainInventoryData.some(item => item === null);
    setInventoryFull(!hasSpace);
    
    phaserInstance.cleanupInventory?.();
    phaserInstance.scene.events.emit('inventory-changed');
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
        
        {inventoryFull && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-600/80 text-white px-4 py-1 rounded text-sm">
            Inventory Full
          </div>
        )}
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
    frame: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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