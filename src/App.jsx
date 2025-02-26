import { useEffect, useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import SettingsComponent from './components/Settings';
import AchievementHUD from './components/AchievementHUD';
import InventoryHUD from './components/InventoryHUD';
import TokenTrader from './components/TokenTrader';
import QuestComponent from './components/QuestComponent';
import NavigateBack from './components/NavigateBack';
import MailInterface from './components/MailComponent';
import HelpInterface from './components/HelpAndSupport';
import SignOutModal from './components/LogoutComponent';
import LeaderboardComponent from './components/LeaderBoard';
import MerchantSellScreen from './components/TradingSell';
import MerchantBuyScreen from './components/TradingBuy';

import { ethers } from "ethers";
import { EventBus } from "./game/EventBus";


function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    const [showAchievements, setShowAchievements] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showTrader, setShowTrader] = useState(false);
    const [showQuest, setShowQuest] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [phaserInstance, setPhaserInstance] = useState(null);
    const [showNavigateBack, setShowNavigateBack] = useState(false);
    const [showMail, setShowMail] = useState(false);
    const [showHelpSupport, setShowHelpSupport] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showShopSell, setShowShopSell] = useState(false);
    const [showShopBuy, setShowShopBuy] = useState(false);

    const [gameData] = useState({});

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {

    }

    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log('Trading:', { fromAmount, fromToken, toToken });
    };

    const showModal = (id, modalData) => {
        console.log('App showModal received:', { id, modalData });
        setShowAchievements(false);
        setShowInventory(false);
        setShowTrader(false);
        setShowQuest(false);
        setShowSettingsModal(false);
        setShowNavigateBack(false);
        setShowMail(false);
        setShowHelpSupport(false);
        setShowLeaderboard(false);
        setShowShopSell(false);
        setShowShopBuy(false);
    
        switch (id) {
            case "ACHIVEMENTS":
                setShowAchievements(true);
                break;
            case "INVENTORY":
                console.log('Inventory modal data:', modalData);
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                    setShowInventory(true);
                }
                break;
            case "MARKET":
                setShowTrader(true);
                break;
            case "QUEST":
                setShowQuest(true);
                break;
            case "SETTINGS":
                setShowSettingsModal(true);
                break;
            case "NAVIGATE":
                setShowNavigateBack(true);
                break;
            case "MAIL":
                setShowMail(true);
                break;
            case "HELP":
                setShowHelpSupport(true);
                break;
            case "SIGNOUT":
                setShowSignOutModal(true);
                break;
            case "LEADERBOARD":
                setShowLeaderboard(true);
                break;
            case "SHOPSELL":
                setShowShopSell(true);
                break;
            case "SHOPBUY":
                setShowShopBuy(true);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        getMetamaskAccount()
    }, [])

    async function getMetamaskAccount() {
        let signer = null;

        let provider;
        if (window.ethereum) {
            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();

            EventBus.emit("blockchain-account", signer.address)
        }
    }

    return (
        <div id="app">
            <PhaserGame 
                ref={phaserRef} 
                currentActiveScene={currentScene} 
                showModal={showModal} 
                gameData={gameData} 
            />
            {showAchievements && (
                <AchievementHUD
                    onClose={() => setShowAchievements(false)}
                />
            )}
            {showInventory && (
                <InventoryHUD
                    phaserInstance={phaserInstance}
                    onClose={() => {
                        setShowInventory(false);
                        setPhaserInstance(null);
                    }}
                />
            )}
            {showTrader && (
                <TokenTrader
                    balance={1000}
                    onTrade={handleTrade}
                    onClose={() => setShowTrader(false)}
                />
            )}
            {showQuest && (
               <QuestComponent 
                   onClose={() => setShowQuest(false)}
               />
            )}
            {showSettingsModal && (
                <SettingsComponent
                    isOpen={showSettingsModal}
                    onClose={() => setShowSettingsModal(false)}
                />
            )}
            {showNavigateBack && (
                <NavigateBack
                    onClose={() => setShowNavigateBack(false)}
                    isOpen={showNavigateBack}
                />
            )}
            {showMail && (
                <MailInterface
                    onClose={() => setShowMail(false)}
                    isOpen={showMail}
                />
            )}
            {showHelpSupport && (
                <HelpInterface
                  onClose={() => setShowHelpSupport(false)}
                  isOpen={showHelpSupport}
                />
            )}
            {showSignOutModal && (
                <SignOutModal
                    onClose={() => setShowSignOutModal(false)}
                    isOpen={showSignOutModal}
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
    )
}

export default App
