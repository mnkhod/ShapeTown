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
        
        if (this.game.scene.getScene('TutorialScene')) {
            extendSceneWithQuests(this.game.scene.getScene('TutorialScene').constructor.prototype);
        } else {
            const TutorialScene = this.sys.game.scene.scenes.find(s => s.key === 'TutorialScene')?.constructor;
            if (TutorialScene) {
                extendSceneWithQuests(TutorialScene.prototype);
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