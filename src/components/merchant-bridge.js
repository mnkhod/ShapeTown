import { EventBus } from '../game/EventBus';
import { MERCHANT_TYPES } from './merchant-manager';

export function initMerchantBridge(phaserScene) {
  if (!phaserScene || !phaserScene.reactEvent) {
    console.error('Cannot initialize merchant bridge: invalid scene or missing reactEvent');
    return;
  }

  phaserScene.reactEvent.on('show-shop-buy-modal', (merchant) => {
    if (!merchant) {
      console.error('Cannot show shop buy modal: merchant is undefined');
      return;
    }

    const merchantType = merchant.merchantType || MERCHANT_TYPES.FARMER;
    
    const merchantInventory = merchant.getInventory ? merchant.getInventory() : null;
    
    const merchantInstance = {
      gold: phaserScene.gold,
      
      ...merchant,
      
      getInventory: function() {
        return merchantInventory;
      }
    };

    EventBus.emit('open-merchant-buy', {
      phaserInstance: merchantInstance,
      merchantType: merchantType,
      onClose: () => {
        EventBus.emit('close-merchant-buy');
      }
    });
  });

  phaserScene.reactEvent.on('show-shop-sell-modal', (merchant) => {
    if (!merchant) {
      console.error('Cannot show shop sell modal: merchant is undefined');
      return;
    }

    const merchantType = merchant.merchantType || MERCHANT_TYPES.FARMER;
    
    const merchantInstance = {
      ...merchant,
      
      gold: phaserScene.gold,
      mainInventoryData: phaserScene.newItemHudPrefab?.mainInventoryData || [],
      itemData: phaserScene.newItemHudPrefab?.itemData || [],
      items: phaserScene.newItemHudPrefab?.items || [],
      itemCounters: phaserScene.newItemHudPrefab?.itemCounters || []
    };

    EventBus.emit('open-merchant-sell', {
      phaserInstance: merchantInstance,
      merchantType: merchantType,
      onClose: () => {
        EventBus.emit('close-merchant-sell');
      }
    });
  });
}

export default initMerchantBridge;