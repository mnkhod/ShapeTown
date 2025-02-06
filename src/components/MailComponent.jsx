import PropTypes from 'prop-types';

const MailInterface = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <img 
          src="/assets/hud/Options/mailBackground.png" 
          alt="Mail Frame"
          className="w-auto h-auto"
        />
        
        <div className="absolute inset-0 flex flex-col items-center w-full px-16">
          <div 
            className="absolute top-0 -right-2 cursor-pointer"
            onClick={onClose}
          >
            <img 
              src="/assets/files/image%2035.png" 
              alt="Close"
              className="w-10 h-10 mr-4 mt-2 hover:opacity-80 transition-opacity"
            />
          </div>

          <div className="pt-16 pb-8">
            <img 
              src="/assets/hud/Options/mailTitle.png"
              alt="Inbox"
              className="mx-auto w-48"
            />
          </div>

          {/* Content Area */}
          <div className="w-full px-16 flex items-center justify-center">
            <p className="text-gray-600 font-pixel text-sm mt-16 text-center"
               style={{
                 imageRendering: 'pixelated'
               }}>
              You have no mail at this time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MailInterface.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default MailInterface;