import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene, showModal,gameData }, ref) {
    const game = useRef();

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {

        if (game.current === undefined) {
            game.current = StartGame("game-container");

            if (ref !== null) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        }

    }, [ref]);

    useEffect(() => {

        EventBus.on('current-scene-ready', (currentScene) => {

            if (currentActiveScene instanceof Function) {
                currentActiveScene(currentScene);
            }
            ref.current.scene = currentScene;
        });

        return () => EventBus.removeListener('show-achievements-modal');
    }, [currentActiveScene, ref])

    useEffect(() => {

        EventBus.on('show-achievements-modal', (currentScene) => {
            showModal("ACHIVEMENTS", currentScene)
        });

        return () => EventBus.removeListener('show-achievements-modal');
    }, [showModal, ref])

    useEffect(() => {

        EventBus.on('show-inventory-modal', (currentScene) => {
            showModal("INVENTORY", currentScene)
        });

        return () => EventBus.removeListener('show-inventory-modal');
    }, [showModal, ref])

    useEffect(() => {

        EventBus.on('show-market-modal', (currentScene) => {
            showModal("MARKET", currentScene)
        });

        return () => EventBus.removeListener('show-market-modal');
    }, [showModal, ref])
    useEffect(() => {
    
        EventBus.on('show-quest-modal', (currentScene) => {
            showModal("QUEST", currentScene);
        });
    
        return () => EventBus.removeListener('show-quest-modal');
    }, [showModal]);
    return (
        <div id="game-container" className="h-screen"></div>
    );

});

// Props definitions
PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func
}
