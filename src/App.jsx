import { useEffect, useRef, useState } from "react";

import Phaser from "phaser";
import { PhaserGame } from "./game/PhaserGame";
import SettingsComponent from "./components/Settings";
import AchievementHUD from "./components/AchievementHUD";
import InventoryHUD from "./components/InventoryHUD";
import TokenTrader from "./components/TokenTrader";
import QuestComponent from "./components/QuestComponent";
import QuestComponentTanStack from "./components/QuestComponentTanStack";
import NavigateBack from "./components/NavigateBack";
import MailInterface from "./components/MailComponent";
import HelpInterface from "./components/HelpAndSupport";
import SignOutModal from "./components/LogoutComponent";
import LeaderboardComponent from "./components/LeaderBoard";
import MerchantSellScreen from "./components/TradingSell";
import MerchantBuyScreen from "./components/TradingBuy";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { EventBus } from "./game/EventBus";

import Providers from "./Providers";
import { useAuth } from "./contexts/AuthContext";
import { initializeQuestSystemWithQuery, initializeQuestSystemWithAuth } from "./components/QuestSystem";

function App() {
    const { walletAddress, signer, isAuthenticated } = useAuth();
    const queryClient = useQueryClient();
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
    const [merchantType, setMerchantType] = useState("farmer");

    const [gameData] = useState({});

    const currentScene = (scene) => {};

    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log("Trading:", { fromAmount, fromToken, toToken });
    };

    const showModal = (id, modalData) => {
        console.log("App showModal received:", { id, modalData });
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
                console.log("Inventory modal data:", modalData);
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
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                    if (modalData.merchantType) {
                        setMerchantType(modalData.merchantType);
                    }
                }
                setShowShopSell(true);
                break;
            case "SHOPBUY":
                if (modalData && modalData.phaserInstance) {
                    setPhaserInstance(modalData.phaserInstance);
                    if (modalData.merchantType) {
                        setMerchantType(modalData.merchantType);
                    }
                }
                setShowShopBuy(true);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        // Initialize quest system with QueryClient
        if (queryClient) {
            initializeQuestSystemWithQuery(queryClient);
            console.log("Quest system initialized with TanStack Query");
        }

        // Emit wallet address when available
        if (walletAddress) {
            EventBus.emit("blockchain-account", walletAddress);
        }

        const handleOpenMerchantBuy = (data) => {
            console.log("Opening merchant buy screen with data:", data);
            if (data && data.phaserInstance) {
                setPhaserInstance(data.phaserInstance);
                if (data.merchantType) {
                    setMerchantType(data.merchantType);
                }
                setShowShopBuy(true);
            }
        };

        const handleCloseMerchantBuy = () => {
            setShowShopBuy(false);
            setPhaserInstance(null);
        };

        const handleOpenMerchantSell = (data) => {
            console.log("Opening merchant sell screen with data:", data);
            if (data && data.phaserInstance) {
                setPhaserInstance(data.phaserInstance);
                if (data.merchantType) {
                    setMerchantType(data.merchantType);
                }
                setShowShopSell(true);
            }
        };

        const handleCloseMerchantSell = () => {
            setShowShopSell(false);
            setPhaserInstance(null);
        };

        EventBus.on("open-merchant-buy", handleOpenMerchantBuy);
        EventBus.on("close-merchant-buy", handleCloseMerchantBuy);
        EventBus.on("open-merchant-sell", handleOpenMerchantSell);
        EventBus.on("close-merchant-sell", handleCloseMerchantSell);

        return () => {
            EventBus.off("open-merchant-buy", handleOpenMerchantBuy);
            EventBus.off("close-merchant-buy", handleCloseMerchantBuy);
            EventBus.off("open-merchant-sell", handleOpenMerchantSell);
            EventBus.off("close-merchant-sell", handleCloseMerchantSell);
        };
    }, [walletAddress]);

    // Initialize quest data when user is authenticated
    useEffect(() => {
        if (isAuthenticated && queryClient) {
            console.log("User authenticated, initializing quest data...");
            initializeQuestSystemWithAuth();
        }
    }, [isAuthenticated, queryClient]);


    return (
        <Providers>
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
                    <QuestComponentTanStack
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
                        phaserInstance={phaserInstance}
                        merchantType={merchantType}
                        onClose={() => {
                            setShowShopSell(false);
                            setPhaserInstance(null);
                        }}
                        isOpen={showShopSell}
                    />
                )}

                {showShopBuy && (
                    <MerchantBuyScreen
                        phaserInstance={phaserInstance}
                        merchantType={merchantType}
                        onClose={() => {
                            setShowShopBuy(false);
                            setPhaserInstance(null);
                        }}
                        isOpen={showShopBuy}
                    />
                )}
            </div>
        </Providers>
    );
}

export default App;
