import { Scene } from 'phaser';
import questSystem from '../../components/QuestSystem';
import { extendSceneWithQuests } from '../../components/QuestSystem';

export default class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('background', 'assets/bg.png');
    }

    create() {
        this.game.questSystem = questSystem;
        
        if (this.game.scene.getScene('ShapeTownFarmingMapScene')) {
            extendSceneWithQuests(this.game.scene.getScene('ShapeTownFarmingMapScene').constructor.prototype);
        } else {
            const ShapeTownFarmingMapScene = this.sys.game.scene.scenes.find(s => s.key === 'ShapeTownFarmingMapScene')?.constructor;
            if (ShapeTownFarmingMapScene) {
                extendSceneWithQuests(ShapeTownFarmingMapScene.prototype);
            }
        }
        this.game.questSystem = questSystem;
        window.getQuestProgress = () => {
          if (this.game && this.game.questSystem) {
            return this.game.questSystem.getQuestProgress();
          }
          return {};
        };

        window.updateQuestProgress = (update) => {
          if (this.game && this.game.questSystem) {
            this.game.questSystem.updateQuestProgress(update);
          }
        };

        this.scene.start('Preloader');
    }
}