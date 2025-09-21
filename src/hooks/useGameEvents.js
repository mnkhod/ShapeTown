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