import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 256;
const DEFAULT_HEIGHT = 272;


const config: GameConfig = {
    backgroundColor: '#2f0000',
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //gravity: { y: 400 } //why was this even here to begin with
        }
    },
    render: {
        pixelArt: true
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});


