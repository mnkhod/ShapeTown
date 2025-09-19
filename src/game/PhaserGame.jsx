import PropTypes from "prop-types";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import SceneManager from "../components/SceneManager";
import { useAutoCheckpointSync } from "../hooks/useCheckpoint";
import { useAuth } from "../contexts/AuthContext";
import { autoSave, createCheckpoint } from "../lib/query-helper";

export const PhaserGame = forwardRef(function PhaserGame(
    { currentActiveScene, showModal, gameData },
    ref
) {
    const game = useRef();
    const sceneManager = useRef();
    const { user, isAuthenticated } = useAuth();

    const { checkpointData, isLoading } = useAutoCheckpointSync();

    useEffect(() => {
        // Checkpoint data is automatically synced via the hook
        if (isAuthenticated && checkpointData) {
            console.log("Checkpoint data loaded:", checkpointData);

            // Log the actual checkpoint structure for debugging
            console.log("Full checkpoint structure:", JSON.stringify(checkpointData, null, 2));

            // Try to restore from multiple possible checkpoint data locations
            let checkpointPayload = null;
            if (checkpointData.data && checkpointData.data.data) {
                checkpointPayload = checkpointData.data.data;
            } else if (checkpointData.data) {
                checkpointPayload = checkpointData.data;
            }

            if (checkpointPayload) {
                // Restore quest progress from checkpoint if available
                if (checkpointPayload.questProgress) {
                    try {
                        console.log("🔄 Restoring quest progress from checkpoint:", checkpointPayload.questProgress);
                        // Emit event to quest system to restore state
                        if (window.questSystem) {
                            console.log("📋 Quest system found, restoring state...");
                            window.questSystem.restoreFromCheckpoint(checkpointPayload.questProgress);
                        } else {
                            console.warn("⚠️ Quest system not available, quest state restoration skipped");
                        }
                    } catch (error) {
                        console.error("❌ Error restoring quest progress from checkpoint:", error);
                    }
                } else {
                    console.log("ℹ️ No quest progress found in checkpoint");
                }

                // Restore inventory from checkpoint if available
                if (checkpointPayload.inventory) {
                    try {
                        localStorage.setItem('gameInventory', JSON.stringify(checkpointPayload.inventory));
                        console.log("Restored inventory from checkpoint");
                    } catch (error) {
                        console.error("Error restoring inventory from checkpoint:", error);
                    }
                }

                // Restore achievements from checkpoint if available
                if (checkpointPayload.achievements) {
                    try {
                        localStorage.setItem('gameAchievements', JSON.stringify(checkpointPayload.achievements));
                        console.log("Restored achievements from checkpoint:", checkpointPayload.achievements);
                    } catch (error) {
                        console.error("Error restoring achievements from checkpoint:", error);
                    }
                }

                // Restore NPC progress from checkpoint if available
                if (checkpointPayload.npcProgress) {
                    try {
                        if (checkpointPayload.npcProgress.jackLifeCycleStep !== undefined) {
                            localStorage.setItem('jackLifeCycleStep', checkpointPayload.npcProgress.jackLifeCycleStep.toString());
                            console.log("Restored Jack lifecycle step:", checkpointPayload.npcProgress.jackLifeCycleStep);
                        }
                        if (checkpointPayload.npcProgress.jackDailyQuestCompleted !== undefined) {
                            localStorage.setItem('jackDailyQuestCompleted', checkpointPayload.npcProgress.jackDailyQuestCompleted.toString());
                            console.log("Restored Jack daily quest state:", checkpointPayload.npcProgress.jackDailyQuestCompleted);
                        }
                        if (checkpointPayload.npcProgress.gameAchievements) {
                            localStorage.setItem('gameAchievements', checkpointPayload.npcProgress.gameAchievements);
                            console.log("Restored achievements from NPC progress");
                        }
                        if (checkpointPayload.npcProgress.greetedNPCs) {
                            localStorage.setItem('greetedNPCs', checkpointPayload.npcProgress.greetedNPCs);
                            console.log("Restored greeted NPCs");
                        }
                    } catch (error) {
                        console.error("Error restoring NPC progress from checkpoint:", error);
                    }
                }

                // Restore player position from checkpoint if available
                if (checkpointPayload.positionX !== undefined && checkpointPayload.positionX !== null &&
                    checkpointPayload.positionY !== undefined && checkpointPayload.positionY !== null) {
                    try {
                        // Store position in localStorage so the scene can restore it
                        localStorage.setItem('checkpointPlayerX', checkpointPayload.positionX.toString());
                        localStorage.setItem('checkpointPlayerY', checkpointPayload.positionY.toString());
                        console.log(`🎯 Player position restored from checkpoint: (${checkpointPayload.positionX}, ${checkpointPayload.positionY})`);

                        // Also set a flag to indicate position should be restored
                        localStorage.setItem('shouldRestorePosition', 'true');
                    } catch (error) {
                        console.error("Error restoring player position from checkpoint:", error);
                    }
                } else {
                    console.log("ℹ️ No player position found in checkpoint");
                }
            } else {
                console.log("No checkpoint payload found to restore from");
            }
        }
    }, [isAuthenticated, checkpointData]);

    // Auto-save only if authenticated
    useEffect(() => {
        if (!isAuthenticated || !user?.data?.user?.id) return;

        const interval = setInterval(() => {
            // Make auto-save non-blocking to prevent game lag
            setTimeout(async () => {
                try {
                    // Collect current game state for checkpoint
                    const gameState = {
                        achievements: JSON.parse(localStorage.getItem('gameAchievements') || '{}'),
                        npcProgress: {
                            jackLifeCycleStep: parseInt(localStorage.getItem('jackLifeCycleStep') || '0', 10),
                            jackDailyQuestCompleted: localStorage.getItem('jackDailyQuestCompleted') === 'true'
                        },
                        timestamp: new Date().toISOString()
                    };

                    // Include player position if available
                    const playerX = localStorage.getItem('currentPlayerX');
                    const playerY = localStorage.getItem('currentPlayerY');
                    if (playerX && playerY) {
                        gameState.positionX = parseInt(playerX, 10);
                        gameState.positionY = parseInt(playerY, 10);
                        console.log(`💾 Auto-saving with player position: (${gameState.positionX}, ${gameState.positionY})`);
                    }

                    // Save checkpoint with game state
                    await createCheckpoint(gameState);
                } catch (error) {
                    console.error('Auto-checkpoint save failed:', error);
                }
            }, 0);
        }, 120_000); // Reduced frequency: auto-save every 2 minutes instead of 1

        return () => clearInterval(interval);
    }, [isAuthenticated, user]);

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
                            sceneManager.current.changeScene(sceneName, {
                                ...data,
                                checkpoint: checkpointData,
                            });
                        }
                    },
                    getCurrentScene: () => {
                        return sceneManager.current
                            ? sceneManager.current.getCurrentScene()
                            : null;
                    },
                };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        };
    }, [ref, checkpointData]);

    useEffect(() => {
        EventBus.on("current-scene-ready", (currentScene) => {
            if (currentActiveScene instanceof Function) {
                currentActiveScene(currentScene);
            }
            ref.current.scene = currentScene;
        });

        return () => EventBus.removeListener("current-scene-ready");
    }, [currentActiveScene, ref]);

    useEffect(() => {
        EventBus.on("show-achievements-modal", (currentScene) => {
            showModal("ACHIVEMENTS", currentScene);
        });

        return () => EventBus.removeListener("show-achievements-modal");
    }, [showModal, ref]);

    useEffect(() => {
        const handleSettingsModal = (currentScene) => {
            showModal("SETTINGS", currentScene);
        };

        EventBus.on("show-settings-modal", handleSettingsModal);

        return () =>
            EventBus.removeListener("show-settings-modal", handleSettingsModal);
    }, [showModal]);

    useEffect(() => {
        const handleInventoryModal = (modalData) => {
            console.log("PhaserGame received:", modalData);

            // Save inventory state before showing modal
            if (sceneManager.current && sceneManager.current.activeScene) {
                sceneManager.current.saveInventoryFromScene(
                    sceneManager.current.activeScene
                );
            }

            if (modalData && modalData.phaserInstance) {
                showModal("INVENTORY", modalData);
            } else {
                console.error("Invalid modal data received:", modalData);
            }
        };

        EventBus.on("show-inventory-modal", handleInventoryModal);
        return () =>
            EventBus.removeListener(
                "show-inventory-modal",
                handleInventoryModal
            );
    }, [showModal]);

    useEffect(() => {
        EventBus.on("show-market-modal", (currentScene) => {
            showModal("MARKET", currentScene);
        });

        return () => EventBus.removeListener("show-market-modal");
    }, [showModal, ref]);

    useEffect(() => {
        EventBus.on("show-navigate-modal", (currentScene) => {
            showModal("NAVIGATE", currentScene);
        });

        return () => EventBus.removeListener("show-navigate-modal");
    }, [showModal]);

    useEffect(() => {
        EventBus.on("show-mail-modal", (currentScene) => {
            showModal("MAIL", currentScene);
        });

        return () => EventBus.removeListener("show-mail-modal");
    }, [showModal]);

    useEffect(() => {
        EventBus.on("show-help-modal", (currentScene) => {
            showModal("HELP", currentScene);
        });

        return () => EventBus.removeListener("show-help-modal");
    }, [showModal]);

    useEffect(() => {
        EventBus.on("show-signout-modal", (currentScene) => {
            showModal("SIGNOUT", currentScene);
        });

        return () => EventBus.removeListener("show-signout-modal");
    }, [showModal]);

    useEffect(() => {
        EventBus.on("show-quest-modal", (currentScene) => {
            showModal("QUEST", currentScene);
        });

        return () => EventBus.removeListener("show-quest-modal");
    }, [showModal]);

    useEffect(() => {
        EventBus.on("show-leaderboard-modal", (currentScene) => {
            showModal("LEADERBOARD", currentScene);
        });

        return () => EventBus.removeListener("show-leaderboard-modal");
    }, [showModal]);

    useEffect(() => {
        const handleShopSellModal = (merchantPrefab) => {
            // Save inventory state before showing shop modal
            if (sceneManager.current && sceneManager.current.activeScene) {
                sceneManager.current.saveInventoryFromScene(
                    sceneManager.current.activeScene
                );
            }

            const inventoryInstance =
                merchantPrefab.itemHud ||
                merchantPrefab.scene?.newItemHudPrefab;

            if (!inventoryInstance) {
                console.error("No inventory instance found for merchant");
                return;
            }

            const modalData = {
                phaserInstance: inventoryInstance,
                merchantType: merchantPrefab.merchantType,
            };

            showModal("SHOPSELL", modalData);
        };

        EventBus.on("show-shop-sell-modal", handleShopSellModal);

        return () =>
            EventBus.removeListener(
                "show-shop-sell-modal",
                handleShopSellModal
            );
    }, [showModal]);

    useEffect(() => {
        const handleShopBuyModal = (merchantPrefab) => {
            // Save inventory state before showing shop modal
            if (sceneManager.current && sceneManager.current.activeScene) {
                sceneManager.current.saveInventoryFromScene(
                    sceneManager.current.activeScene
                );
            }

            const modalData = {
                phaserInstance: merchantPrefab.scene.newItemHudPrefab,
                merchantType: merchantPrefab.merchantType,
            };

            showModal("SHOPBUY", modalData);
        };

        EventBus.on("show-shop-buy-modal", handleShopBuyModal);

        return () =>
            EventBus.removeListener("show-shop-buy-modal", handleShopBuyModal);
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

        EventBus.on("scene-changed", handleSceneChanged);

        return () => {
            EventBus.removeListener("scene-changed", handleSceneChanged);
        };
    }, []);

    return <div id="game-container" className="h-screen"></div>;
});

PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func,
    showModal: PropTypes.func.isRequired,
    gameData: PropTypes.object,
};

export default PhaserGame;

