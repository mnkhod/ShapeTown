import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const NavigateBack = ({ onClose, isOpen }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getButtonImage = (type) => {
    if (clickedButton === type) {
      return type === 'yes' ? 'clickedYesButton' : 'clickedNoButton';
    }
    if (hoveredButton === type) {
      return type === 'yes' ? 'hoveredYesButton' : 'hoveredNoButton';
    }
    return type === 'yes' ? 'yesButton' : 'noButton';
  };

  const handleMouseDown = (type) => {
    setClickedButton(type);
  };

  const handleMouseUp = (type) => {
    setClickedButton(null);
    if (type === 'yes') {
      window.location.href = '/customize';
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 font-malio"
      onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
      >
      <div 
        ref={modalRef}
        className="relative rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('/assets/hud/Options/yesNoOptionBackground.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '500px',
          height: '280px'
        }}
      >
        <div className="flex flex-col justify-center h-full p-8">
          <h2 className="text-sm mb-4 text-black px-4">
            Navigate to dashboard
          </h2>
          <p className="text-black text-xs mb-6 px-8">
            Are you sure you want to leave the game and open the dashboard?
          </p>
          
          <div className="flex gap-4 mx-8 justify-end">
            <button
              className="relative w-24 h-12"
              onMouseEnter={() => setHoveredButton('yes')}
              onMouseLeave={() => {
                setHoveredButton(null);
                setClickedButton(null);
              }}
              onMouseDown={() => handleMouseDown('yes')}
              onMouseUp={() => handleMouseUp('yes')}
            >
              <img
                src={`/assets/hud/Options/${getButtonImage('yes')}.png`}
                alt="Yes"
                className="w-full h-full object-contain"
              />
            </button>

            <button
              className="relative w-24 h-12"
              onMouseEnter={() => setHoveredButton('no')}
              onMouseLeave={() => {
                setHoveredButton(null);
                setClickedButton(null);
              }}
              onMouseDown={() => handleMouseDown('no')}
              onMouseUp={() => handleMouseUp('no')}
            >
              <img
                src={`/assets/hud/Options/${getButtonImage('no')}.png`}
                alt="No"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NavigateBack.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default NavigateBack;