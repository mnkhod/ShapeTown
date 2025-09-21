import { useState } from 'react';

/**
 * Custom hook to manage all game modal states
 * Centralizes modal state management and provides clean API
 */
export const useGameModals = () => {
  // Modal states
  const [showAchievements, setShowAchievements] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showTrader, setShowTrader] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNavigateBack, setShowNavigateBack] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showShopSell, setShowShopSell] = useState(false);
  const [showShopBuy, setShowShopBuy] = useState(false);

  // Game instance states
  const [phaserInstance, setPhaserInstance] = useState(null);
  const [merchantType, setMerchantType] = useState("farmer");

  /**
   * Close all modals - useful for cleanup and modal switching
   */
  const closeAllModals = () => {
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
  };

  /**
   * Show modal by ID with optional data
   * @param {string} modalId - The modal identifier
   * @param {Object} modalData - Optional data for the modal
   */
  const showModal = (modalId, modalData = {}) => {
    console.log("useGameModals showModal received:", { modalId, modalData });

    // Close all modals first to prevent multiple modals
    closeAllModals();

    switch (modalId) {
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
        console.warn(`Unknown modal ID: ${modalId}`);
        break;
    }
  };

  /**
   * Get current modal states for debugging
   */
  const getModalStates = () => ({
    showAchievements,
    showInventory,
    showTrader,
    showQuest,
    showSettingsModal,
    showNavigateBack,
    showMail,
    showHelpSupport,
    showSignOutModal,
    showLeaderboard,
    showShopSell,
    showShopBuy
  });

  /**
   * Check if any modal is currently open
   */
  const isAnyModalOpen = () => {
    const states = getModalStates();
    return Object.values(states).some(state => state === true);
  };

  return {
    // Modal states
    modalStates: {
      showAchievements,
      showInventory,
      showTrader,
      showQuest,
      showSettingsModal,
      showNavigateBack,
      showMail,
      showHelpSupport,
      showSignOutModal,
      showLeaderboard,
      showShopSell,
      showShopBuy
    },

    // Modal setters
    modalSetters: {
      setShowAchievements,
      setShowInventory,
      setShowTrader,
      setShowQuest,
      setShowSettingsModal,
      setShowNavigateBack,
      setShowMail,
      setShowHelpSupport,
      setShowSignOutModal,
      setShowLeaderboard,
      setShowShopSell,
      setShowShopBuy
    },

    // Game states
    gameStates: {
      phaserInstance,
      merchantType
    },

    // Game setters
    gameSetters: {
      setPhaserInstance,
      setMerchantType
    },

    // Actions
    showModal,
    closeAllModals,
    getModalStates,
    isAnyModalOpen
  };
};