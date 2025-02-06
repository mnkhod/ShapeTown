import PropTypes from 'prop-types';

const HelpInterface = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio text-xs"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <img 
          src="/assets/hud/Options/helpBackground.png" 
          alt="Help Frame"
          className="w-auto h-auto"
        />
        
        <div className="absolute inset-0 flex flex-col items-center px-16 py-6">
          <div 
            className="absolute top-1 right-1 cursor-pointer"
            onClick={onClose}
          >
            <img 
              src="/assets/files/image%2035.png" 
              alt="Close"
              className="w-12 h-12 hover:opacity-80 transition-opacity"
            />
          </div>

          <div className="my-8">
            <img 
              src="/assets/hud/Options/helpTitle.png"
              alt="Help and Support"
              className="h-12 w-auto"
            />
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2 px-8">
              <h3 className="text-blue-800">Movement</h3>
              <ul className="space-y-1 pl-4">
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  Press and hold mouse button or touch screen in the direction you want to move
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  Or, Use Arrow key to move
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  Or, Use A,S,W,D keys to move
                </li>
              </ul>
            </div>

            <div className="w-full flex justify-center py-2">
              <img 
                src="/assets/hud/Options/helpSeperator.png" 
                alt="separator"
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-2 px-8">
              <h3 className="text-blue-800">Quests</h3>
              <ul className="space-y-1 pl-4">
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  Active Quests can be seen by clicking or tapping on the Pinned Note in the upper right corner
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  Quests help you learn how to play
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  Some quests provide you with rewards, such as Coins or special items
                </li>
              </ul>
            </div>

            <div className="w-full flex justify-center py-2">
              <img 
                src="/assets/hud/Options/helpSeperator.png" 
                alt="separator"
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-2 px-8">
              <h3 className="text-blue-800">Keyboard Shortcuts</h3>
              <ul className="space-y-1 pl-4">
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  B - Expand Inventory ( Backpack )
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  C - Open chat
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  TAB/SHIFT + TAB - Change Inventory Row
                </li>
                <li className="text-gray-800 flex items-start">
                  <span className="mr-2">•</span>
                  1, 2, 3, 4, 5, 6 - Select Inventory Item From Current Row
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HelpInterface.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default HelpInterface;