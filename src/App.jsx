import { useEffect, useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import AchievementHUD from './components/AchievementHUD';
import InventoryHUD from './components/InventoryHUD';
import TokenTrader from './components/TokenTrader';
import { ethers } from "ethers";
import { EventBus } from "./game/EventBus";


function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    const [showAchievements, setShowAchievements] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showTrader, setShowTrader] = useState(false);

    const [gameData] = useState({});

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {

    }

    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log('Trading:', { fromAmount, fromToken, toToken });
    };

    const showModal = (id, scene) => {
        switch (id) {
            case "ACHIVEMENTS":
                setShowAchievements(true)
                break;
            case "INVENTORY":
                setShowInventory(true)
                break;
            case "MARKET":
                setShowTrader(true)
                break;
            default:
                break;
        }
    }

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
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} showModal={showModal} gameData={gameData} />
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
            {showTrader && (
                <TokenTrader
                    balance={1000}
                    onTrade={handleTrade}
                    onClose={() => setShowTrader(false)}
                />
            )}
        </div>
    )
}

export default App
