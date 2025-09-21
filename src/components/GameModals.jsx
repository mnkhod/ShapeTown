import React from 'react';
import ModalErrorBoundary from './ModalErrorBoundary';
import AchievementHUD from './AchievementHUD';
import InventoryHUD from './InventoryHUD';
import TokenTrader from './TokenTrader';
import QuestComponentTanStack from './QuestComponentTanStack';
import SettingsComponent from './Settings';
import NavigateBack from './NavigateBack';
import MailInterface from './MailComponent';
import HelpInterface from './HelpAndSupport';
import SignOutModal from './LogoutComponent';
import LeaderboardComponent from './LeaderBoard';
import MerchantSellScreen from './TradingSell';
import MerchantBuyScreen from './TradingBuy';

const GameModals = ({
  // Modal states
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
  showShopBuy,

  // Modal handlers
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
  setShowShopBuy,

  // Game data
  phaserInstance,
  setPhaserInstance,
  merchantType,
  handleTrade
}) => {
  return (
    <>
      {showAchievements && (
        <ModalErrorBoundary modalName="Achievements">
          <AchievementHUD
            onClose={() => setShowAchievements(false)}
          />
        </ModalErrorBoundary>
      )}

      {showInventory && (
        <ModalErrorBoundary modalName="Inventory">
          <InventoryHUD
            phaserInstance={phaserInstance}
            onClose={() => {
              setShowInventory(false);
              setPhaserInstance(null);
            }}
          />
        </ModalErrorBoundary>
      )}

      {showTrader && (
        <ModalErrorBoundary modalName="TokenTrader">
          <TokenTrader
            balance={1000}
            onTrade={handleTrade}
            onClose={() => setShowTrader(false)}
          />
        </ModalErrorBoundary>
      )}

      {showQuest && (
        <ModalErrorBoundary modalName="Quest">
          <QuestComponentTanStack
            onClose={() => setShowQuest(false)}
          />
        </ModalErrorBoundary>
      )}

      {showSettingsModal && (
        <ModalErrorBoundary modalName="Settings">
          <SettingsComponent
            isOpen={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
          />
        </ModalErrorBoundary>
      )}

      {showNavigateBack && (
        <ModalErrorBoundary modalName="Navigation">
          <NavigateBack
            onClose={() => setShowNavigateBack(false)}
            isOpen={showNavigateBack}
          />
        </ModalErrorBoundary>
      )}

      {showMail && (
        <ModalErrorBoundary modalName="Mail">
          <MailInterface
            onClose={() => setShowMail(false)}
            isOpen={showMail}
          />
        </ModalErrorBoundary>
      )}

      {showHelpSupport && (
        <ModalErrorBoundary modalName="Help">
          <HelpInterface
            onClose={() => setShowHelpSupport(false)}
            isOpen={showHelpSupport}
          />
        </ModalErrorBoundary>
      )}

      {showSignOutModal && (
        <ModalErrorBoundary modalName="SignOut">
          <SignOutModal
            onClose={() => setShowSignOutModal(false)}
            isOpen={showSignOutModal}
          />
        </ModalErrorBoundary>
      )}

      {showLeaderboard && (
        <ModalErrorBoundary modalName="Leaderboard">
          <LeaderboardComponent
            onClose={() => setShowLeaderboard(false)}
            isOpen={showLeaderboard}
          />
        </ModalErrorBoundary>
      )}

      {showShopSell && (
        <ModalErrorBoundary modalName="ShopSell">
          <MerchantSellScreen
            phaserInstance={phaserInstance}
            merchantType={merchantType}
            onClose={() => {
              setShowShopSell(false);
              setPhaserInstance(null);
            }}
            isOpen={showShopSell}
          />
        </ModalErrorBoundary>
      )}

      {showShopBuy && (
        <ModalErrorBoundary modalName="ShopBuy">
          <MerchantBuyScreen
            phaserInstance={phaserInstance}
            merchantType={merchantType}
            onClose={() => {
              setShowShopBuy(false);
              setPhaserInstance(null);
            }}
            isOpen={showShopBuy}
          />
        </ModalErrorBoundary>
      )}
    </>
  );
};

export default GameModals;