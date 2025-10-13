import { useEffect } from 'react';
import { EventBus } from '../game/EventBus';

/**
 * Custom hook to manage game event listeners
 * Centralizes all EventBus event handling for the main App component
 */
export const useGameEvents = ({
  showModal,
  walletAddress,
  isAuthenticated,
  queryClient,
  initializeQuestSystemWithQuery,
  initializeQuestSystemWithAuth
}) => {

  // Handle wallet address changes
  useEffect(() => {
    if (walletAddress) {
      EventBus.emit("blockchain-account", walletAddress);
    }
  }, [walletAddress]);

  // Handle quest system initialization
  useEffect(() => {
    if (queryClient) {
      initializeQuestSystemWithQuery(queryClient);
      console.log("Quest system initialized with TanStack Query");
    }
  }, [queryClient, initializeQuestSystemWithQuery]);

  useEffect(() => {
    if (isAuthenticated && queryClient) {
      console.log("User authenticated, initializing quest data...");
      initializeQuestSystemWithAuth();
    }
  }, [isAuthenticated, queryClient, initializeQuestSystemWithAuth]);

  // Setup quest update event handler
  useEffect(() => {
    const handleQuestUpdated = async (data) => {
      console.log("Quest updated event received:", data);

      // Force immediate refetch of ALL quest queries for instant UI updates
      if (queryClient) {
        // Import QUEST_KEYS dynamically
        const { QUEST_KEYS } = await import('./useQuests');

        // Force immediate refetch (not just invalidate) for instant UI updates
        await Promise.all([
          queryClient.refetchQueries({ queryKey: QUEST_KEYS.active() }),
          queryClient.refetchQueries({ queryKey: QUEST_KEYS.completed() }),
          queryClient.refetchQueries({ queryKey: QUEST_KEYS.available() }),
          queryClient.refetchQueries({ queryKey: QUEST_KEYS.lists() }),
        ]);
        console.log("✅ All quest data refreshed instantly after update");
      }

      // If quest was completed, refresh inventory and gold
      // The backend automatically awards rewards when a quest is completed
      if (data?.questCompleted || data?.completed) {
        console.log("🎁 Quest completed! Refreshing inventory and gold from backend...");

        try {
          // Dynamically import inventory service and query helpers
          const [{ inventoryService }, { getSession }] = await Promise.all([
            import('../lib/inventory-service'),
            import('../lib/query-helper')
          ]);

          // Reload inventory from database
          const inventory = await inventoryService.loadInventoryFromDatabase();
          console.log("✅ Inventory reloaded from database:", inventory.length, "items");

          // Reload session data (includes gold)
          const sessionResponse = await getSession();
          console.log("✅ Session data reloaded:", sessionResponse);

          // Find the active Phaser scene and apply the updated inventory/gold
          if (window.debugGame?.game?.scene?.scenes) {
            const activeScene = window.debugGame.game.scene.scenes.find(
              (scene) => scene.scene.isActive() && scene.newItemHudPrefab
            );

            if (activeScene) {
              // Apply inventory to Phaser game
              inventoryService.applyInventoryToGame(activeScene.newItemHudPrefab);
              console.log("✅ Inventory applied to Phaser game");

              // Update gold in Phaser game
              if (sessionResponse?.success && sessionResponse?.data) {
                const goldAmount = sessionResponse.data.gold || 0;

                // Update gold in multiple locations for compatibility
                if (activeScene.gold !== undefined) {
                  activeScene.gold = goldAmount;
                }

                if (activeScene.newItemHudPrefab?.TotalGoldPrefab) {
                  activeScene.newItemHudPrefab.TotalGoldPrefab.TotalGold = goldAmount;
                  if (activeScene.newItemHudPrefab.TotalGoldPrefab.totalGoldAmountText) {
                    activeScene.newItemHudPrefab.TotalGoldPrefab.totalGoldAmountText.setText(goldAmount.toString());
                  }
                }

                // Emit gold-changed event
                if (activeScene.events) {
                  activeScene.events.emit('gold-changed', goldAmount);
                }

                console.log("✅ Gold updated in Phaser game:", goldAmount);
              }

              // Show success notification
              if (activeScene.alertPrefab) {
                activeScene.alertPrefab.alert("Quest rewards received!");
              }
            } else {
              console.warn("⚠️ Could not find active scene with HUD to apply inventory/gold");
            }
          }
        } catch (error) {
          console.error("❌ Failed to refresh inventory/gold after quest completion:", error);
        }
      }
    };

    EventBus.on("quest-updated", handleQuestUpdated);

    return () => {
      EventBus.off("quest-updated", handleQuestUpdated);
    };
  }, [queryClient]);

  // Setup merchant event handlers
  useEffect(() => {
    const handleOpenMerchantBuy = (data) => {
      console.log("Opening merchant buy screen with data:", data);
      showModal("SHOPBUY", data);
    };

    const handleCloseMerchantBuy = () => {
      // This could be handled by the modal component itself
      console.log("Merchant buy screen closed");
    };

    const handleOpenMerchantSell = (data) => {
      console.log("Opening merchant sell screen with data:", data);
      showModal("SHOPSELL", data);
    };

    const handleCloseMerchantSell = () => {
      // This could be handled by the modal component itself
      console.log("Merchant sell screen closed");
    };

    // Register event listeners
    EventBus.on("open-merchant-buy", handleOpenMerchantBuy);
    EventBus.on("close-merchant-buy", handleCloseMerchantBuy);
    EventBus.on("open-merchant-sell", handleOpenMerchantSell);
    EventBus.on("close-merchant-sell", handleCloseMerchantSell);

    // Cleanup function
    return () => {
      EventBus.off("open-merchant-buy", handleOpenMerchantBuy);
      EventBus.off("close-merchant-buy", handleCloseMerchantBuy);
      EventBus.off("open-merchant-sell", handleOpenMerchantSell);
      EventBus.off("close-merchant-sell", handleCloseMerchantSell);
    };
  }, [showModal]);

  return {
    // Could return event status or handlers if needed
    eventsInitialized: true
  };
};