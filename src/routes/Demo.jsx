import { useState } from 'react';
import TokenTrader from '../components/TokenTrader';
import AchievementHUD from '../components/AchievementHUD';
import InventoryHUD from '../components/InventoryHUD';
import QuestComponent from '../components/QuestComponent';
import SettingsComponent from '../components/Settings';
import NavigateBack from '../components/NavigateBack';
import MailInterface from '../components/MailComponent';
import HelpInterface from '../components/HelpAndSupport';
import SignOutModal from '../components/LogoutComponent';
import LeaderboardComponent from '../components/LeaderBoard';
import MerchantBuyScreen from '../components/TradingBuy';
import MerchantSellScreen from '../components/TradingSell';

function Demo() {
    const [showTrader, setShowTrader] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showQuest, setShowQuest] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [showNavigateBack, setShowNavigateBack] = useState(false);
    const [showMailbox, setShowMailbox] = useState(false);
    const [showHelpSupport, setShowHelpSupport] = useState(false);
    const [showLogout, setShowLogOut] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showShopSell, setShowShopSell] = useState(false);
    const [showShopBuy, setShowShopBuy] = useState(false);
    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log('Trading:', { fromAmount, fromToken, toToken });
    };

    return (
        <div className="min-h-screen flex items-center justify-center flex-wrap gap-4 font-malio bg-gray-900">
            <button 
                onClick={() => setShowTrader(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Open Trader
            </button>

            <button 
                onClick={() => setShowAchievements(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Show Achievements
            </button>

            <button 
                onClick={() => setShowInventory(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Show Inventory
            </button>

            <button 
                onClick={() => setShowQuest(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Show Quest
            </button>

            <button 
                onClick={() => setShowSetting(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Show Settings
            </button>
            <button 
                onClick={() => setShowNavigateBack(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Navigate Back
            </button>
            <button 
                onClick={() => setShowMailbox(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Open Mail
            </button>
            <button 
                onClick={() => setShowHelpSupport(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Help and Support
            </button>
            <button 
                onClick={() => setShowLogOut(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Log Out
            </button>
            <button 
                onClick={() => setShowLeaderboard(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Leaderboard
            </button>
            <button 
                onClick={() => setShowShopSell(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Open Shop(Sell)
            </button>
            <button 
                onClick={() => setShowShopBuy(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Open Shop(Buy)
            </button>
            {showTrader && (
                <TokenTrader 
                    balance={1000}
                    onTrade={handleTrade}
                    onClose={() => setShowTrader(false)}
                />
            )}

            {showAchievements && (
                <AchievementHUD 
                    onClose={() => setShowAchievements(false)}
                />
            )}

            {showInventory && (
              <InventoryHUD 
                onClose={() => setShowInventory(false)}
              />
            )}

            {showQuest && (
              <QuestComponent
                onClose={() => setShowQuest(false)}
              />
            )}

            {showSetting && (
              <SettingsComponent
                onClose={() => setShowSetting(false)}
              />
            )}
            
            {showNavigateBack && (
                <NavigateBack
                  onClose={() => setShowNavigateBack(false)}
                  isOpen={showNavigateBack}
                />
            )}
            
            {showMailbox && (
                <MailInterface
                  onClose={() => setShowMailbox(false)}
                  isOpen={showMailbox}
                />
            )}
            
            {showHelpSupport && (
                <HelpInterface
                  onClose={() => setShowHelpSupport(false)}
                  isOpen={showHelpSupport}
                />
            )}
            
            {showLogout && (
                <SignOutModal
                  onClose={() => setShowLogOut(false)}
                  isOpen={showLogout}
                />
            )}
            
            {showLeaderboard && (
                <LeaderboardComponent
                  onClose={() => setShowLeaderboard(false)}
                  isOpen={showLeaderboard}
                />
            )}

            {showShopSell && (
                <MerchantSellScreen
                    onClose={() => setShowShopSell(false)}
                    isOpen={showShopSell}
                />
            )}

            {showShopBuy && (
                <MerchantBuyScreen
                    onClose={() => setShowShopBuy(false)}
                    isOpen={showShopBuy}
                />
            )}
        </div>
    );
}

export default Demo;