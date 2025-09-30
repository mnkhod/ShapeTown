import PropTypes from "prop-types";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import SceneManager from "../components/SceneManager";
import { useAutoCheckpointSync } from "../hooks/useCheckpoint";
import { useAuth } from "../contexts/AuthContext";
import { autoSave, createCheckpoint } from "../lib/query-helper";
import { inventoryService } from "../lib/inventory-service";
import { autoSaveService } from "../services/auto-save-service";

export const PhaserGame = forwardRef(function PhaserGame(
    { currentActiveScene, showModal, gameData },
    ref
) {
    const game = useRef();
    const sceneManager = useRef();
    const { user, isAuthenticated } = useAuth();

    const { checkpointData, isLoading } = useAutoCheckpointSync();

    // Load inventory from database and restore checkpoint data
    useEffect(() => {
        const initializeGameData = async () => {
            if (!isAuthenticated) return;

            // Load inventory from database first
            try {
                console.log("🚀 Initializing game data from database...");
                await inventoryService.loadInventoryFromDatabase();
                console.log("✅ Inventory loaded from database");
            } catch (error) {
                console.error("❌ Failed to load inventory from database:", error);
            }

            // Then restore checkpoint data if available
            if (checkpointData) {
                console.log("🔄 Restoring checkpoint data:", checkpointData);

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
                            if (window.questSystem) {
                                console.log("📋 Quest system found, restoring state...");
                                window.questSystem.restoreFromCheckpoint(checkpointPayload.questProgress);
                            } else {
                                console.warn("⚠️ Quest system not available, quest state restoration deferred");
                                // Store for later restoration when quest system is ready
                                localStorage.setItem('pendingQuestRestore', JSON.stringify(checkpointPayload.questProgress));
                            }
                        } catch (error) {
                            console.error("❌ Error restoring quest progress from checkpoint:", error);
                        }
                    }

                    // Restore achievements from checkpoint if available
                    if (checkpointPayload.achievements) {
                        try {
                            localStorage.setItem('gameAchievements', JSON.stringify(checkpointPayload.achievements));
                            console.log("🏆 Restored achievements from checkpoint:", checkpointPayload.achievements);
                        } catch (error) {
                            console.error("Error restoring achievements from checkpoint:", error);
                        }
                    }

                    // Restore NPC progress from checkpoint if available
                    if (checkpointPayload.npcProgress) {
                        try {
                            if (checkpointPayload.npcProgress.jackLifeCycleStep !== undefined &&
                                checkpointPayload.npcProgress.jackLifeCycleStep !== null) {
                                localStorage.setItem('jackLifeCycleStep', String(checkpointPayload.npcProgress.jackLifeCycleStep));
                                console.log("👴 Restored Jack lifecycle step:", checkpointPayload.npcProgress.jackLifeCycleStep);
                            }
                            if (checkpointPayload.npcProgress.jackDailyQuestCompleted !== undefined &&
                                checkpointPayload.npcProgress.jackDailyQuestCompleted !== null) {
                                localStorage.setItem('jackDailyQuestCompleted', String(checkpointPayload.npcProgress.jackDailyQuestCompleted));
                                console.log("📅 Restored Jack daily quest state:", checkpointPayload.npcProgress.jackDailyQuestCompleted);
                            }
                            if (checkpointPayload.npcProgress.greetedNPCs) {
                                localStorage.setItem('greetedNPCs', checkpointPayload.npcProgress.greetedNPCs);
                                console.log("👋 Restored greeted NPCs");
                            }
                        } catch (error) {
                            console.error("Error restoring NPC progress from checkpoint:", error);
                        }
                    }

                    // Restore player position from checkpoint if available
                    if (checkpointPayload.positionX !== undefined && checkpointPayload.positionX !== null &&
                        checkpointPayload.positionY !== undefined && checkpointPayload.positionY !== null) {
                        try {
                            localStorage.setItem('checkpointPlayerX', checkpointPayload.positionX.toString());
                            localStorage.setItem('checkpointPlayerY', checkpointPayload.positionY.toString());
                            localStorage.setItem('shouldRestorePosition', 'true');
                            console.log(`🎯 Player position restored from checkpoint: (${checkpointPayload.positionX}, ${checkpointPayload.positionY})`);
                        } catch (error) {
                            console.error("Error restoring player position from checkpoint:", error);
                        }
                    }

                    // Restore map information if available
                    if (checkpointPayload.mapId) {
                        try {
                            localStorage.setItem('lastMapId', checkpointPayload.mapId);
                            console.log("🗺️ Last map restored from checkpoint:", checkpointPayload.mapId);
                        } catch (error) {
                            console.error("Error restoring map from checkpoint:", error);
                        }
                    }
                } else {
                    console.log("ℹ️ No checkpoint payload found to restore from");
                }
            }
        };

        initializeGameData();
    }, [isAuthenticated, checkpointData]);

    // Initialize auto-save service when authenticated
    useEffect(() => {
        if (!isAuthenticated || !user?.data?.user?.id) {
            // Shutdown auto-save service if not authenticated
            autoSaveService.shutdown();
            return;
        }

        // Initialize the auto-save service with user and scene manager
        autoSaveService.initialize(user, sceneManager);

        return () => {
            // Cleanup: shutdown auto-save service
            autoSaveService.shutdown();
        };
    }, [isAuthenticated, user]);

    useLayoutEffect(() => {
        if (game.current === undefined) {
            game.current = StartGame("game-container");

            // Initialize SceneManager with the game instance
            sceneManager.current = new SceneManager(game.current);

            // Make game accessible globally for debugging
            if (typeof window !== 'undefined') {
                window.debugGame = {
                    game: game.current,
                    sceneManager: sceneManager.current,
                    getCurrentScene: () => sceneManager.current?.getCurrentScene() || null
                };

                // Expose inventory service globally for fallback checks
                window.inventoryService = inventoryService;
            }

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
    }, [ref]); // Removed checkpointData dependency to prevent game restarts

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

    // Listen for in-game alert messages
    useEffect(() => {
        const handleGameAlert = (message) => {
            const currentScene = sceneManager.current?.getCurrentScene();
            if (currentScene?.alertPrefab) {
                currentScene.alertPrefab.alert(message);
            }
        };

        EventBus.on("show-game-alert", handleGameAlert);

        return () => EventBus.removeListener("show-game-alert", handleGameAlert);
    }, []);

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

    // Add listener for scene changes to ensure inventory sync from database
    useEffect(() => {
        const handleSceneChanged = ({ from, to }) => {
            console.log(`🔄 Scene changed from ${from} to ${to}`);

            // Wait for scene to be fully ready before syncing inventory
            setTimeout(() => {
                if (sceneManager.current) {
                    const currentScene = sceneManager.current.getCurrentScene();
                    if (currentScene && currentScene.newItemHudPrefab) {
                        // Load from database first, then apply to scene
                        if (inventoryService.isInventoryLoaded()) {
                            console.log("📦 Applying database inventory to new scene");
                            console.log("🔍 Scene HUD prefab:", currentScene.newItemHudPrefab);
                            console.log("🔍 HUD items array:", currentScene.newItemHudPrefab?.items);
                            console.log("🔍 HUD counters array:", currentScene.newItemHudPrefab?.itemCounters);

                            inventoryService.applyInventoryToGame(currentScene.newItemHudPrefab);
                        } else {
                            console.log("⚠️ Inventory not loaded yet, loading now...");

                            // Try to load inventory now
                            inventoryService.loadInventoryFromDatabase().then(() => {
                                console.log("✅ Inventory loaded, applying to scene");
                                inventoryService.applyInventoryToGame(currentScene.newItemHudPrefab);
                            }).catch(error => {
                                console.error("❌ Failed to load inventory for scene:", error);
                                sceneManager.current.loadInventoryToScene(currentScene);
                            });
                        }
                    }
                }
            }, 200);
        };

        EventBus.on("scene-changed", handleSceneChanged);

        return () => {
            EventBus.removeListener("scene-changed", handleSceneChanged);
        };
    }, []);

    // Add listener for initial game ready to load database inventory
    useEffect(() => {
        const handleGameReady = async () => {
            console.log("🎮 Game ready event triggered");

            // Ensure inventory is loaded from database
            if (!inventoryService.isInventoryLoaded() && isAuthenticated) {
                try {
                    console.log("🔄 Loading inventory from database on game ready...");
                    await inventoryService.loadInventoryFromDatabase();
                } catch (error) {
                    console.error("❌ Failed to load inventory on game ready:", error);
                }
            }

            if (inventoryService.isInventoryLoaded() && sceneManager.current) {
                const currentScene = sceneManager.current.getCurrentScene();
                if (currentScene && currentScene.newItemHudPrefab) {
                    console.log("🎮 Game ready, applying database inventory...");
                    inventoryService.applyInventoryToGame(currentScene.newItemHudPrefab);
                }
            }
        };

        // Set up a more robust inventory application system
        const tryApplyInventory = async () => {
            console.log("🔄 Attempting automatic inventory application...");

            if (!isAuthenticated) {
                console.log("⚠️ User not authenticated yet, will retry...");
                return; // Don't exit completely, just return and let the interval retry
            }

            // Try to apply inventory every 2 seconds until successful
            const applyInterval = setInterval(async () => {
                try {
                    // Ensure inventory is loaded
                    if (!inventoryService.isInventoryLoaded()) {
                        console.log("🔄 Loading inventory from database...");
                        await inventoryService.loadInventoryFromDatabase();
                    }

                    // Try to find and apply to active scene with HUD
                    if (inventoryService.isInventoryLoaded() && game.current) {
                        // Use the same logic as forceApplyInventory
                        const scenes = game.current.scene?.scenes || [];
                        let targetScene = null;

                        // First try to find active scene with HUD
                        for (const scene of scenes) {
                            const isActive = scene.scene.isActive();
                            const hasHUD = !!scene.newItemHudPrefab;

                            if (isActive && hasHUD) {
                                targetScene = scene;
                                console.log(`🎯 Found active scene with HUD: ${scene.scene.key}`);
                                break;
                            }
                        }

                        // If no active scene with HUD, fall back to any scene with HUD
                        if (!targetScene) {
                            for (const scene of scenes) {
                                if (scene.newItemHudPrefab) {
                                    targetScene = scene;
                                    console.log(`🎯 Found scene with HUD: ${scene.scene.key} (not active)`);
                                    break;
                                }
                            }
                        }

                        if (targetScene) {
                            console.log("✅ Automatically applying database inventory...");
                            inventoryService.applyInventoryToGame(targetScene.newItemHudPrefab);

                            // Set up automatic sync to database when inventory changes
                            console.log("🔍 Checking scene events:", {
                                hasScene: !!targetScene.scene,
                                hasEvents: !!targetScene.scene?.events,
                                hasDirectEvents: !!targetScene.events,
                                sceneKey: targetScene.scene?.key
                            });

                            // Try multiple ways to access the events system
                            let eventsObject = null;
                            if (targetScene.scene && targetScene.scene.events) {
                                eventsObject = targetScene.scene.events;
                                console.log("📡 Using scene.events");
                            } else if (targetScene.events) {
                                eventsObject = targetScene.events;
                                console.log("📡 Using direct scene events");
                            } else if (targetScene.sys && targetScene.sys.events) {
                                eventsObject = targetScene.sys.events;
                                console.log("📡 Using sys.events");
                            }

                            if (eventsObject) {
                                const syncToDatabase = async () => {
                                    try {
                                        console.log("🔄 Syncing inventory changes to database...");

                                        // Add a small delay to ensure all inventory operations are complete
                                        setTimeout(async () => {
                                            await inventoryService.syncInventoryToDatabase(targetScene.newItemHudPrefab);
                                        }, 100);
                                    } catch (error) {
                                        console.error("❌ Failed to sync inventory to database:", error);
                                    }
                                };

                                // Listen for inventory changes and sync to database
                                eventsObject.on('inventory-changed', syncToDatabase);
                                console.log("📡 Set up automatic inventory sync to database");

                                // Add manual sync function for debugging
                                if (typeof window !== 'undefined') {
                                    window.forceInventorySync = () => {
                                        console.log("🔧 Manual inventory sync triggered");
                                        syncToDatabase();
                                    };
                                }
                            } else {
                                console.warn("⚠️ Cannot set up inventory sync - no events system found");
                            }

                            clearInterval(applyInterval); // Success! Stop trying
                            return;
                        }
                    }

                    console.log("⏳ Scene not ready yet, will retry...");
                } catch (error) {
                    console.error("❌ Error in automatic inventory application:", error);
                }
            }, 2000);

            // Stop trying after 30 seconds
            setTimeout(() => {
                clearInterval(applyInterval);
                console.log("⏰ Stopped automatic inventory application attempts");
            }, 30000);
        };

        // Start trying to apply inventory after a short delay
        setTimeout(tryApplyInventory, 1000);

        return () => {
            // Cleanup function
        };

        const handleQuestSystemReady = () => {
            // Check if there's pending quest data to restore
            const pendingQuestRestore = localStorage.getItem('pendingQuestRestore');
            if (pendingQuestRestore && window.questSystem) {
                try {
                    console.log("📋 Restoring deferred quest progress...");
                    window.questSystem.restoreFromCheckpoint(JSON.parse(pendingQuestRestore));
                    localStorage.removeItem('pendingQuestRestore');
                } catch (error) {
                    console.error("❌ Error restoring deferred quest progress:", error);
                }
            }
        };

        EventBus.on("game-ready", handleGameReady);
        EventBus.on("quest-system-ready", handleQuestSystemReady);

        return () => {
            EventBus.removeListener("game-ready", handleGameReady);
            EventBus.removeListener("quest-system-ready", handleQuestSystemReady);
        };
    }, [isAuthenticated]); // Re-run when authentication changes

    return <div id="game-container" className="h-screen"></div>;
});

PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func,
    showModal: PropTypes.func.isRequired,
    gameData: PropTypes.object,
};

export default PhaserGame;

