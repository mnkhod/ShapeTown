import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import SceneManager from '../components/SceneManager';

export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene, showModal, gameData }, ref) {
    const game = useRef();
    const sceneManager = useRef();

    useLayoutEffect(() => {
        if (game.current === undefined) {
            game.current = StartGame("game-container");
            
            // Initialize SceneManager with the game instance
            sceneManager.current = new SceneManager(game.current);

            if (ref !== null) {
                ref.current = { 
                    game: game.current, 
                    scene: null,
                    sceneManager: sceneManager.current,
                    changeScene: (sceneName, data) => {
                        if (sceneManager.current) {
                            sceneManager.current.changeScene(sceneName, data);
                        }
                    },
                    getCurrentScene: () => {
                        return sceneManager.current ? sceneManager.current.getCurrentScene() : null;
                    }
                };
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

        return () => EventBus.removeListener('current-scene-ready');
    }, [currentActiveScene, ref])

    useEffect(() => {
        EventBus.on('show-achievements-modal', (currentScene) => {
            showModal("ACHIVEMENTS", currentScene)
        });

        return () => EventBus.removeListener('show-achievements-modal');
    }, [showModal, ref])

    useEffect(() => {
        const handleSettingsModal = (currentScene) => {
            showModal("SETTINGS", currentScene);
        };

        EventBus.on('show-settings-modal', handleSettingsModal);
        
        return () => EventBus.removeListener('show-settings-modal', handleSettingsModal);
    }, [showModal]);
    
    useEffect(() => {
        const handleInventoryModal = (modalData) => {
            console.log('PhaserGame received:', modalData);
            
            // Save inventory state before showing modal
            if (sceneManager.current && sceneManager.current.activeScene) {
                sceneManager.current.saveInventoryFromScene(sceneManager.current.activeScene);
            }
            
            if (modalData && modalData.phaserInstance) {
                showModal("INVENTORY", modalData);
            } else {
                console.error('Invalid modal data received:', modalData);
            }
        };
    
        EventBus.on('show-inventory-modal', handleInventoryModal);
        return () => EventBus.removeListener('show-inventory-modal', handleInventoryModal);
    }, [showModal]);

    useEffect(() => {
        EventBus.on('show-market-modal', (currentScene) => {
            showModal("MARKET", currentScene)
        });

        return () => EventBus.removeListener('show-market-modal');
    }, [showModal, ref])

    useEffect(() => {
        EventBus.on('show-navigate-modal', (currentScene) => {
            showModal("NAVIGATE", currentScene);
        });

        return () => EventBus.removeListener('show-navigate-modal');
    }, [showModal]);

    useEffect(() => {
        EventBus.on('show-mail-modal', (currentScene) => {
            showModal("MAIL", currentScene);
        });

        return () => EventBus.removeListener('show-mail-modal');
    }, [showModal]);

    useEffect(() => {
        EventBus.on('show-help-modal', (currentScene) => {
            showModal("HELP", currentScene);
        });

        return () => EventBus.removeListener('show-help-modal');
    }, [showModal]);

    useEffect(() => {
        EventBus.on('show-signout-modal', (currentScene) => {
            showModal("SIGNOUT", currentScene);
        });

        return () => EventBus.removeListener('show-signout-modal');
    }, [showModal]);

    useEffect(() => {
        EventBus.on('show-quest-modal', (currentScene) => {
            showModal("QUEST", currentScene);
        });
    
        return () => EventBus.removeListener('show-quest-modal');
    }, [showModal]);

    useEffect(() => {
        EventBus.on('show-leaderboard-modal', (currentScene) => {
            showModal("LEADERBOARD", currentScene);
        });
    
        return () => EventBus.removeListener('show-leaderboard-modal');
    }, [showModal]);

    useEffect(() => {
        const handleShopSellModal = (merchantPrefab) => {
            // Save inventory state before showing shop modal
            if (sceneManager.current && sceneManager.current.activeScene) {
                sceneManager.current.saveInventoryFromScene(sceneManager.current.activeScene);
            }
            
            const inventoryInstance = merchantPrefab.itemHud || 
                                     merchantPrefab.scene?.newItemHudPrefab;
            
            if (!inventoryInstance) {
                console.error('No inventory instance found for merchant');
                return;
            }
            
            const modalData = {
                phaserInstance: inventoryInstance,
                merchantType: merchantPrefab.merchantType
            };
            
            showModal("SHOPSELL", modalData);
        };
        
        EventBus.on('show-shop-sell-modal', handleShopSellModal);
        
        return () => EventBus.removeListener('show-shop-sell-modal', handleShopSellModal);
    }, [showModal]);
    
    useEffect(() => {
        const handleShopBuyModal = (merchantPrefab) => {
            // Save inventory state before showing shop modal
            if (sceneManager.current && sceneManager.current.activeScene) {
                sceneManager.current.saveInventoryFromScene(sceneManager.current.activeScene);
            }
            
            const modalData = {
                phaserInstance: merchantPrefab.scene.newItemHudPrefab,
                merchantType: merchantPrefab.merchantType
            };
            
            showModal("SHOPBUY", modalData);
        };
        
        EventBus.on('show-shop-buy-modal', handleShopBuyModal);
        
        return () => EventBus.removeListener('show-shop-buy-modal', handleShopBuyModal);
    }, [showModal]);
    
    // Add listener for scene changes to ensure inventory sync
    useEffect(() => {
        const handleSceneChanged = ({ from, to }) => {
            console.log(`Scene changed from ${from} to ${to}`);
            
            // Wait for scene to be fully ready before syncing inventory
            setTimeout(() => {
                if (sceneManager.current) {
                    const currentScene = sceneManager.current.getCurrentScene();
                    if (currentScene && currentScene.newItemHudPrefab) {
                        sceneManager.current.loadInventoryToScene(currentScene);
                    }
                }
            }, 200);
        };
        
        EventBus.on('scene-changed', handleSceneChanged);
        
        return () => {
            EventBus.removeListener('scene-changed', handleSceneChanged);
        };
    }, []);

    return (
        <div id="game-container" className="h-screen"></div>
    );
});

PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func,
    showModal: PropTypes.func.isRequired,
    gameData: PropTypes.object
};

export default PhaserGame;