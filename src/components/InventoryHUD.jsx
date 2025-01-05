import { useState } from 'react';
import PropTypes from 'prop-types';

const InventorySlot = ({ item, onItemClick, slotIndex, onItemDrop }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData('text/plain');
    onItemDrop(parseInt(fromIndex), slotIndex);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', slotIndex.toString());
  };

  return (
    <div 
      className="w-12 h-12 cursor-pointer relative"
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
            className="w-12 h-12"
            style={{ imageRendering: 'pixelated' }}
          />
          {item.quantity > 1 && (
            <span className="absolute bottom-1 right-1 text-sm font-bold text-white bg-neutral-900/80 px-1 rounded">
              {item.quantity}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const InventoryGrid = ({ onClose }) => {
  // const [items, setItems] = useState(Array(36).fill(null).map((_, index) => {
  //   if (index === 0) return { id: '1', icon: '/assets/files/image 1.png', name: 'Item 1', quantity: 1 };
  //   if (index === 1) return { id: '2', icon: '/assets/files/image 2.png', name: 'Item 2', quantity: 1 };
  //   if (index === 2) return { id: '3', icon: '/assets/files/image 3.png', name: 'Item 3', quantity: 5 };
  //   return null;
  // }));

  const [items, setItems] = useState([]);

  const handleItemClick = (item, slotIndex) => {
    if (item) {
      const newItems = [...items];
      if (item.quantity > 1) {
        newItems[slotIndex] = { ...item, quantity: item.quantity - 1 };
      } else {
        newItems[slotIndex] = null;
      }
      setItems(newItems);
    }
  };

  const handleItemDrop = (fromIndex, toIndex) => {
    const newItems = [...items];
    const fromItem = newItems[fromIndex];
    const toItem = newItems[toIndex];

    newItems[toIndex] = fromItem;
    newItems[fromIndex] = toItem;
    
    setItems(newItems);
  };

  const handleTabClick = (tabIndex) => {
    console.log(`Tab ${tabIndex} clicked`);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/75" />
      
      <div 
        className="fixed inset-0 flex items-center justify-center z-40"
        onClick={onClose}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[800px] mx-4"
        >
          <img 
            src="/assets/hud/inventory.png" 
            alt="Inventory background"
            className="w-full h-auto"
            style={{ imageRendering: 'pixelated' }}
          />
          
          <div className="absolute top-4 left-16 flex gap-8 items-end">
            <div 
              className="w-16 h-12 cursor-pointer hover:bg-neutral-700/20"
              onClick={() => handleTabClick(0)}
            />
            <div 
              className="w-16 h-10 cursor-pointer hover:bg-neutral-700/20"
              onClick={() => handleTabClick(1)}
            />
            <div 
              className="w-16 h-10 cursor-pointer hover:bg-neutral-700/20"
              onClick={() => handleTabClick(2)}
            />
          </div>  

          <div className="absolute top-24 left-8 p-6">
            <div className="grid grid-cols-9 gap-7">
              {items.map((item, index) => (
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

          <img 
            src="/assets/files/image 35.png"
            alt="Close"
            onClick={onClose}
            className="absolute top-0 -right-1 w-10 h-10 cursor-pointer hover:opacity-80"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </>
  );
};

InventoryGrid.propTypes = {
  onClose: PropTypes.func.isRequired
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
  onItemDrop: PropTypes.func.isRequired
};

export default InventoryGrid;