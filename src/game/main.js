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
    type: Phaser.AUTO, // Auto-detect best renderer (WebGL or Canvas fallback)
    parent: 'game-container',
    backgroundColor: '#028af8',
    width: 1920,
    height: 1080,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            tileBias: 32,
            fps: 60, // Lock to 60 FPS
        }
    },
    render: {
        pixelArt: true,
        antialias: false, // Disable for better performance with pixel art
        powerPreference: 'high-performance', // Use high-performance GPU
        mipmapFilter: 'LINEAR', // Better performance
        roundPixels: true, // Better pixel art rendering
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1920,
            height: 1080
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true // Better performance control
    },
    loader: {
        maxParallelDownloads: 4, // Limit concurrent downloads for better performance
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
    try {
        return new Phaser.Game({ ...config, parent });
    } catch (error) {
        console.error('Failed to start Phaser game:', error);

        // Try with Canvas fallback if WebGL fails
        if (error.message.includes('WebGL')) {
            console.log('WebGL failed, trying Canvas renderer...');
            return new Phaser.Game({ ...config, parent, type: Phaser.CANVAS });
        }

        throw error;
    }
}

export default StartGame;
