import React from 'react';
import PropTypes from 'prop-types';

const LeaderboardComponent = ({ onClose, currentPlayer = { rank: 0, crops: 0 } }) => {
  const leaderboardData = [
    { rank: 1, name: "Duke", crops: 200500 },
    { rank: 2, name: "Conja", crops: 175000 },
    { rank: 3, name: "Hamhai", crops: 120001 },
    { rank: 4, name: "Alex", crops: 102204 },
    { rank: 5, name: "Michael", crops: 95455 },
    { rank: 6, name: "AsianTrump", crops: 85724 },
    { rank: 7, name: "YeahNah", crops: 72581 },
    { rank: 8, name: "Player8", crops: 65432 },
    { rank: 9, name: "Player9", crops: 54321 },
    { rank: 10, name: "Player10", crops: 10000 },
    { rank: 11, name: "Player11", crops: 10000 },
    { rank: 12, name: "Player12", crops: 10000 },
    { rank: 13, name: "Player13", crops: 10000 },
    { rank: 14, name: "Player14", crops: 10000 },
    { rank: 15, name: "Player15", crops: 10000 },
    { rank: 16, name: "Player16", crops: 10000 },
    { rank: 17, name: "Player17", crops: 10000 },
    { rank: 18, name: "Player18", crops: 10000 },
    { rank: 19, name: "Player19", crops: 10000 },
    { rank: 20, name: "Player20", crops: 10000 },
  ];

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-orange-400';
      default: return 'text-gray-900';
    }
  };

  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <img 
          src="/assets/hud/Options/leaderboardBackground.png" 
          alt="Leaderboard Frame"
          className="w-auto h-auto"
        />
        
        <div className="absolute inset-0 flex flex-col px-16 py-6">
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

          <div className="text-center mb-8">
            <h2 className="text-gray-900 font-pixel text-xl pt-16 pb-4 mb-1">LEADERBOARD</h2>
            <h3 className="text-gray-900 font-pixel text-sm pb-2 mb-1">Most crops collected</h3>
            <p className="text-gray-600 text-xs">Last Updated 2/06/2025</p>
          </div>

            <img 
              src="/assets/hud/Options/helpSeperator.png"
              alt="separator"
              className="w-full h-1 opacity-50"
            />
          <div className="flex-1 overflow-y-auto scrollbar-hidden" style={{ maxHeight: "calc(100% - 320px)" }}>
            <div className="flex flex-col">
              {leaderboardData.map((player, index) => (
                <React.Fragment key={player.rank}>
                  <div className="grid grid-cols-5 px-4 py-4 items-center">
                    <div className={`${getRankColor(player.rank)} font-pixel w-12`}>
                      #{player.rank}
                    </div>
                    <div className={`${getRankColor(player.rank)} font-pixel col-span-2`}>
                      {player.name}
                    </div>
                    <div className="text-gray-900 font-pixel text-right">
                      Crops:
                    </div>
                    <div className="text-gray-900 font-pixel text-right">
                      {formatNumber(player.crops)}
                    </div>
                  </div>
                  {index < leaderboardData.length - 1 && (
                    <img 
                      src="/assets/hud/Options/helpSeperator.png"
                      alt="separator"
                      className="w-full h-1 my-1 opacity-50"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="absolute bottom-14 left-0 right-0 px-8">
            <div className="grid grid-cols-5 px-12 py-2 items-center">
              <div className="text-gray-900 font-pixel w-12">
                #{currentPlayer?.rank || 25}
              </div>
              <div className="text-gray-900 font-pixel col-span-2">
                You
              </div>
              <div className="text-gray-900 font-pixel text-right">
                Crops:
              </div>
              <div className="text-gray-900 font-pixel text-right">
                {formatNumber(currentPlayer?.crops)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LeaderboardComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentPlayer: PropTypes.shape({
    rank: PropTypes.number,
    crops: PropTypes.number
  })
};

LeaderboardComponent.defaultProps = {
  currentPlayer: {
    rank: 0,
    crops: 0
  }
};

export default LeaderboardComponent;