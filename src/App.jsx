import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { PhaserGame } from "./game/PhaserGame";
import GameModals from "./components/GameModals";
import GameErrorBoundary from "./components/GameErrorBoundary";
import Providers from "./Providers";
import { useAuth } from "./contexts/AuthContext";
import { initializeQuestSystemWithQuery, initializeQuestSystemWithAuth } from "./components/QuestSystem";
import { useGameModals } from "./hooks/useGameModals";
import { useGameEvents } from "./hooks/useGameEvents";

function App() {
    const { walletAddress, isAuthenticated } = useAuth();
    const queryClient = useQueryClient();
    const phaserRef = useRef();

    // Use custom hooks for modal and event management
    const {
        modalStates,
        modalSetters,
        gameStates,
        gameSetters,
        showModal
    } = useGameModals();

    // Initialize game events
    useGameEvents({
        showModal,
        walletAddress,
        isAuthenticated,
        queryClient,
        initializeQuestSystemWithQuery,
        initializeQuestSystemWithAuth
    });

    // Game data and handlers
    const currentScene = (scene) => {};
    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log("Trading:", { fromAmount, fromToken, toToken });
    };


    return (
        <Providers>
            <div id="app">
                <GameErrorBoundary>
                    <PhaserGame
                        ref={phaserRef}
                        currentActiveScene={currentScene}
                        showModal={showModal}
                        gameData={{}}
                    />
                </GameErrorBoundary>

                <GameModals
                    // Modal states
                    {...modalStates}

                    // Modal setters
                    {...modalSetters}

                    // Game states
                    {...gameStates}

                    // Game setters
                    {...gameSetters}

                    // Handlers
                    handleTrade={handleTrade}
                />
            </div>
        </Providers>
    );
}

export default App;
