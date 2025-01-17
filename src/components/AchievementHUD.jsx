import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { ethers } from "ethers";

const AchievementSlot = ({ achievement }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative w-full h-full p-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="w-full h-full bg-[url('hud/achievementSlot.png')] bg-contain bg-no-repeat bg-center">
        <div className="absolute inset-[20%] flex items-center justify-center">
          {achievement && (
            <img 
              src={achievement.image}
              alt={achievement.title}
              className={`w-3/4 h-3/4 object-contain ${!achievement.unlocked ? 'opacity-30' : ''}`}
            />
          )}
        </div>
      </div>

      {showTooltip && achievement && (
        <div className="absolute z-50 w-64 p-2 font-malio bg-orange-100 border-2 border-yellow-900 rounded-lg top-0 left-56 transform -translate-x-1/2">
          <h3 className="font-bold text-sm pb-2 text-yellow-900">{achievement.title}</h3>
          <p className="text-xs text-yellow-800">{achievement.description}</p>
        </div>
      )}
    </div>
  );
};

const AchievementHUD = ({ onClose }) => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    fetchAchievementInfo();
    
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  async function fetchAchievementInfo() {
    try {
      setIsLoading(true);
      let contractAddress = "0x23d6e7fe6dc435cdDC32e5aBBd3d6bE7f807bAbD";
      // let contractAddress = "0x6bc9Da82cB85D6D9e34EF7b8B2F930a8A83F5FB2";
      let contractAbi = [
        "function balanceOf(address,uint256) view returns (uint256)",
        "function mint(address,uint256,uint256,bytes)",
        "function uri(uint256) view returns (string)"
      ];

      let provider = new ethers.JsonRpcProvider("https://rpc.open-campus-codex.gelato.digital");
	    // let provider = new ethers.JsonRpcProvider("https://mainnet.shape.network")
      let metamaskAccount = await fetchMetamaskAccount();

      const nftContract = new ethers.Contract(contractAddress, contractAbi, provider);

      let nftIds = [0, 1, 2, 3, 4];
      let results = [];

      for (let i = 0; i < nftIds.length; i++) {
        const nftId = nftIds[i];
        let result = await nftContract.balanceOf(metamaskAccount, nftId);
        if (result > 0) {
          let axiosResult = await axios.get(`https://shape-town-api.vercel.app/nft/data/${nftId}`);
          results.push({
            id: nftId.toString(),
            title: axiosResult.data.name,
            description: axiosResult.data.description,
            image: axiosResult.data.image,
            unlocked: true
          });
        }
      }

      setNfts(results);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMetamaskAccount() {
    if (!window.ethereum || !window.ethereum.selectedAddress) 
      return "0x081901916FF0eBff4573533D1b34D54029B89B07";
    return window.ethereum.selectedAddress;
  }

  const filledSlots = isLoading 
    ? Array(9).fill(null) 
    : [...nfts];

  while (filledSlots.length < 9) {
    filledSlots.push(null);
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        {isLoading ? (
          <div className="w-96 h-96 relative">
            <img 
              src="/assets/files/LoadingFrame.png"
              alt="Loading frame"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-gray-600 mb-4 font-pixel inline-flex w-24 justify-center">
                Loading{'.'.repeat(dots)}
                <span className="invisible">...</span>
              </span>
              <img 
                src="/assets/files/LoadingIcon.png"
                alt="Loading icon"
                className="w-20 h-20 animate-spin"
                style={{ animationDuration: '1s' }}
              />
              <img 
                src="/assets/TradeIcons/Merchant/IconGold.png"
                alt="Loading icon"
                className="w-8 h-8 absolute mt-12 animate-bounce"
                style={{ animationDuration: '1s'  }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-[url('hud/achievementDashboard.png')] bg-contain bg-no-repeat pr-16 pl-10 py-10">
            <img 
              src="/assets/files/image%2035.png"
              alt="Close"
              onClick={onClose}
              className="w-12 h-12 right-0 top-0 absolute cursor-pointer hover:opacity-80"
            />
            <div className="bg-[url('hud/achievementBackground.png')] bg-contain bg-no-repeat">
              <div className="px-4 py-2">
                <div className="text-xl font-bold text-yellow-900 flex justify-between items-center">
                  <span>Achievements</span>
                </div>
              </div>
              <div className="w-96 aspect-square pt-6 ml-2 mt-1 pr-8 pb-4">
                <div className="w-full h-full grid grid-cols-3">
                  {filledSlots.map((achievement, index) => (
                    <AchievementSlot
                      key={achievement?.id || `empty-${index}`}
                      achievement={achievement}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AchievementHUD.propTypes = {
  onClose: PropTypes.func.isRequired
};

AchievementSlot.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    unlocked: PropTypes.bool
  })
};

export default AchievementHUD;