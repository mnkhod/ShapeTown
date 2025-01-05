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
      <div className="w-full h-full bg-[url('public/assets/hud/achievementSlot.png')] bg-contain bg-no-repeat bg-center">
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
        <div className="absolute z-50 w-64 p-2 font-malio bg-orange-100 border-2 border-yellow-900 rounded-lg -top-20 left-1/2 transform -translate-x-1/2">
          <h3 className="font-bold text-sm pb-2 text-yellow-900">{achievement.title}</h3>
          <p className="text-xs text-yellow-800">{achievement.description}</p>
        </div>
      )}
    </div>
  );
};

const AchievementHUD = ({ onClose }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetchAchievementInfo();
  }, []);

  async function fetchAchievementInfo() {
    let contractAddress = "0x6bc9Da82cB85D6D9e34EF7b8B2F930a8A83F5FB2";
    let contractAbi = [
      "function balanceOf(address,uint256) view returns (uint256)",
      "function mint(address,uint256,uint256,bytes)",
      "function uri(uint256) view returns (string)"
    ];

    let provider = new ethers.JsonRpcProvider("https://rpc.open-campus-codex.gelato.digital");
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
  }

  async function fetchMetamaskAccount() {
    if (!window.ethereum || !window.ethereum.selectedAddress) 
      return "0x081901916FF0eBff4573533D1b34D54029B89B07";
    return window.ethereum.selectedAddress;
  }

  const filledSlots = [...nfts];
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
        <div className="bg-[url('public/assets/hud/achievementDashboard.png')] bg-contain bg-no-repeat pr-16 pl-10 py-10">
                <img 
                  src="/assets/files/image%2035.png"
                  alt="Close"
                  onClick={onClose}
                  className="w-12 h-12 right-0 top-0 absolute cursor-pointer hover:opacity-80"
                />
          <div className="bg-[url('public/assets/hud/achievementBackground.png')] bg-contain bg-no-repeat">
            <div className="px-4 py-2">
              <div className="text-xl font-bold text-yellow-900 flex justify-between items-center">
                <span>Achievements</span>
              </div>
            </div>
            <div className="w-96 aspect-square p-6">
              <div className="w-full h-full grid grid-cols-3 gap-1">
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