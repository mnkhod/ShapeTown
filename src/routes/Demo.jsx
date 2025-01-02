import { useState } from 'react';
import TokenTrader from '../components/TokenTrader';
import AchievementHUD from '../components/AchievementHUD';
import InventoryHUD from '../components/InventoryHUD';
import QuestComponent from '../components/QuestComponent';

function Demo() {
    const [showTrader, setShowTrader] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showQuest, setShowQuest] = useState(false);
    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log('Trading:', { fromAmount, fromToken, toToken });
    };

    return (
        <div className="min-h-screen flex items-center justify-center gap-4 bg-gray-900">
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
        </div>
    );
}

export default Demo;