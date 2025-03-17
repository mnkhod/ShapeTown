import Boot from './scenes/Boot';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import Phaser from 'phaser';
import Preloader from './scenes/Preloader';
import TutorialScene from "./scenes/TutorialScene";
import FarmingScene from "./scenes/FarmingScene";
import ForestScene from "./scenes/ForestScene";
import MarketScene from "./scenes/MarketScene";
import ShapeFarmingScene from "./scenes/ShapeFarmingScene"
import ShapeTownFarmingMapScene from "./scenes/ShapeTownFarmingMapScene"
import ShapeTownBeachMapScene from "./scenes/ShapeTownBeachMapScene"
import ShapeTownMineMapScene from "./scenes/ShapeTownMineMapScene"
import ShapeTownSquareMapScene from "./scenes/ShapeTownSquareMapScene"



// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    // width: 1920,
    // height: 1080,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            tileBias: 32,
        }
    },
    render: {
        pixelArt: true,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%",
        // width: 1920,
        // height: 1080,
        // min: {
        //     width: 800,
        //     height: 450
        // },
        // max: {
        //     width: 3480,
        //     height: 2160
        // }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        TutorialScene,
        FarmingScene,
        ForestScene,
        MarketScene,
        ShapeFarmingScene,
        ShapeTownFarmingMapScene,
        ShapeTownBeachMapScene,
        ShapeTownMineMapScene,
        ShapeTownSquareMapScene
    ]
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
