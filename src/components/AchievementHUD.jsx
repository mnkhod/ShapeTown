import { useState } from 'react';
import PropTypes from 'prop-types';

const AchievementSlot = ({ achievement }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative aspect-square w-full"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="w-full h-full">
        <div className="absolute inset-[15%] bg-gray-800/95">
          {achievement && (
            <img 
              src={`/assets/files/${achievement.image}`}
              alt={achievement.title}
              className={`w-full h-full object-contain p-2 ${!achievement.unlocked ? 'opacity-30' : ''}`}
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-[5%] right-[5%] w-[20%] h-[20%] bg-green-500 rounded-full border-2 border-green-700" />

      {showTooltip && (
        <div className="absolute z-50 w-48 p-2 bg-gray-800 border-2 border-orange-900 rounded-lg -top-20 left-1/2 transform -translate-x-1/2">
          <h3 className="font-bold text-white">{achievement.title}</h3>
          <p className="text-sm text-gray-300">{achievement.description}</p>
        </div>
      )}
    </div>
  );
};

const AchievementHUD = ({ onClose }) => {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Begin your journey",
      image: "image 1.png",
      unlocked: true
    },
    {
      id: 2,
      title: "Battle Master",
      description: "Win 10 battles",
      image: "image 4.png",
      unlocked: false
    },
    {
      id: 3,
      title: "Gem Collector",
      description: "Collect 100 gems",
      image: "image 22.png",
      unlocked: false
    },
    {
      id: 4,
      title: "Blacksmith",
      description: "Craft 50 items",
      image: "image 11.png",
      unlocked: false
    },
    {
      id: 5,
      title: "Monster Hunter",
      description: "Defeat 100 monsters",
      image: "image 13.png",
      unlocked: false
    },
    {
      id: 6,
      title: "Weaponsmith",
      description: "Craft 20 weapons",
      image: "image 35.png",
      unlocked: false
    },
    {
      id: 7,
      title: "Scholar",
      description: "Read 30 books",
      image: "image 63.png",
      unlocked: false
    },
    {
      id: 8,
      title: "Wealthy",
      description: "Collect 10000 gold",
      image: "image 15.png",
      unlocked: false
    },
    {
      id: 9,
      title: "Legend",
      description: "Complete all achievements",
      image: "image 72.png",
      unlocked: false
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-800 border-4 border-amber-900/80 rounded-lg"
      >
        <div className="bg-amber-800/90 border-b-4 border-amber-900/80 w-full px-4 py-2">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-100/90 flex justify-between items-center">
            Achievements
            <div 
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-[url('/assets/files/image%2035.png')] bg-contain cursor-pointer"
            />
          </div>
        </div>

        <div className="relative w-[300px] aspect-square">
          <div 
            className="absolute inset-0 bg-[url('/assets/files/image%2072.png')] bg-cover bg-no-repeat"
          >
            <div className="w-full h-full grid grid-cols-3 p-[2%]">
              {achievements.map((achievement) => (
                <AchievementSlot
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AchievementHUD.propTypes = {
  onClose: PropTypes.func.isRequired
};

AchievementSlot.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    unlocked: PropTypes.bool
  })
};

export default AchievementHUD;