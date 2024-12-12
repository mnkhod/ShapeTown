import { useState } from 'react';
import PropTypes from 'prop-types';

const InventorySlot = ({ item, onItemClick, slotIndex, onItemDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
      className="aspect-square w-16 h-16 bg-gray-700 border-2 border-gray-600 rounded-sm hover:border-gray-500 cursor-pointer relative"
      onClick={() => onItemClick(item, slotIndex)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable={!!item}
      onDragStart={handleDragStart}
    >
      {item && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">{item.icon}</span>
          {item.quantity > 1 && (
            <span className="absolute bottom-1 right-1 text-sm font-bold text-white bg-gray-800/80 px-1 rounded">
              {item.quantity}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const InventoryGrid = ({ onClose }) => {
  const [items, setItems] = useState(Array(36).fill(null).map((_, index) => {
    if (index === 0) return { id: '1', icon: '🗡️', name: 'Sword', quantity: 1 };
    if (index === 1) return { id: '2', icon: '🛡️', name: 'Shield', quantity: 1 };
    if (index === 2) return { id: '3', icon: '🧪', name: 'Potion', quantity: 5 };
    return null;
  }));

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

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <div className="bg-gray-800 border-4 border-orange-900/80 rounded-lg relative">
          {/* Title bar with full-width brown backdrop */}
          <div className="bg-amber-800/90 border-b-4 border-orange-900/80 w-full px-8 py-4">
            <div className="text-4xl font-bold text-center text-orange-100/90 flex justify-between">
                Inventory          
                <div 
                    onClick={onClose}
                    className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full cursor-pointer flex items-center justify-center">
                    <span className="text-orange-100 text-xl">X</span>
                </div>

            </div>
          </div>
          <div 
            className="p-8"
          >
            <div className="grid grid-cols-9 gap-2">
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
        </div>
      </div>
    </div>
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