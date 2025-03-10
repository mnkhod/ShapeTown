import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInventorySync } from './inventory-sync';

const InventorySlot = ({ 
item, 
onItemClick, 
slotIndex, 
onItemDrop,
isQuickAccess = false,
isActive = false
}) => {
return (
<div 
  className={`relative cursor-pointer ${isActive && isQuickAccess ? 'ring-2 ring-yellow-500' : ''}`}
  style={{
    width: '50px',
    height: '50px',
  }}
  onClick={() => onItemClick(item, slotIndex, isQuickAccess)}
  onDragOver={(e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-500/20');
  }}
  onDragLeave={(e) => {
    e.currentTarget.classList.remove('bg-gray-500/20');
  }}
  onDrop={(e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-500/20');
    const fromData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onItemDrop(fromData, slotIndex);
  }}
  draggable={!!item}
  onDragStart={(e) => {
    if (!item) return;
    
    e.dataTransfer.setData('text/plain', JSON.stringify({
      index: slotIndex,
      isQuickAccess,
      item
    }));
  }}
>
  {item && (
    <div className="absolute inset-0 flex items-center justify-center">
      <img 
        src={item.iconPath || `/assets/InventoryIcons/${item.icon}.png`}
        alt={item.name}
        className="w-[32px] h-[48px]"
        style={{ 
          imageRendering: 'pixelated',
          objectFit: 'none',
          objectPosition: `${(item.frame || 0) * -32}px 10px`
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
const { inventory, moveItem, refreshInventory } = useInventorySync(phaserInstance);

useEffect(() => {
refreshInventory();
}, [phaserInstance, refreshInventory]);

const handleItemClick = (item, slotIndex, isQuickAccess) => {
if (!phaserInstance) return;

if (isQuickAccess) {
  const quickIndex = slotIndex - 24;
  phaserInstance.activeIndex = quickIndex;
  phaserInstance.selectedItem = item?.id || null;

  if (phaserInstance.activeItemSlots) {
    phaserInstance.activeItemSlots.forEach((slot, i) => {
      if (slot) {
        slot.visible = i === quickIndex;
      }
    });
  }
  
  if (phaserInstance.reactEvent) {
    phaserInstance.reactEvent.emit('inventory-slot-selected', {
      index: quickIndex,
      item: item
    });
  }
  
  if (phaserInstance.scene?.events) {
    phaserInstance.scene.events.emit('inventory-changed');
  }
} else if (item) {
  const quickItems = inventory.quickItems;
  const emptyQuickIndex = quickItems.findIndex(i => i === null);
  
  if (emptyQuickIndex !== -1) {
    moveItem(
      { index: slotIndex, isQuickAccess: false, item }, 
      emptyQuickIndex + 24
    );
  }
}
};

const handleItemDrop = (fromData, toIndex) => {
if (!phaserInstance) return;

moveItem(fromData, toIndex);
};

const inventoryFull = !inventory.quickItems.includes(null) && 
                    !inventory.mainItems.includes(null);

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
        {inventory.mainItems.map((item, index) => (
          <InventorySlot
            key={index}
            item={item}
            slotIndex={index}
            onItemClick={handleItemClick}
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
        {inventory.quickItems.map((item, index) => (
          <InventorySlot
            key={index}
            item={item}
            slotIndex={index + 24}
            onItemClick={handleItemClick}
            onItemDrop={handleItemDrop}
            isQuickAccess={true}
            isActive={index === inventory.activeSlot}
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