import Boot from './scenes/Boot';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import Phaser from 'phaser';
import Preloader from './scenes/Preloader';
import TutorialScene from "./scenes/TutorialScene";
import FarmingScene from "./scenes/FarmingScene";


// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
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
        // mode: Phaser.Scale.FIT,
        // mode: Phaser.Scale.RESIZE,
        // width: 1920,
        // height: 1080,
        // autoCenter: Phaser.Scale.Center
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        TutorialScene,
        FarmingScene
    ]
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
