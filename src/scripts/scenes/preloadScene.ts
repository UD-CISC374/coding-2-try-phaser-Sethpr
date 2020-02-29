import Boss from '../objects/Boss'
export default class PreloadScene extends Phaser.Scene {//this.scene.start('MainScene');
  background: Phaser.GameObjects.TileSprite
  boss: Boss;
  bossArive: boolean;
  player: Phaser.GameObjects.Sprite; 

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background" , "assets/Images/background.png");
    this.load.image("boss", "assets/Images/Boss.png");
    this.load.spritesheet("bomb", "assets/Images/power-up.png",{
      frameWidth:16,
      frameHeight:16
    });
    this.load.spritesheet("player" , "assets/Images/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("beam", "assets/Images/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("explosion" , "assets/Images/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ball", "assets/Images/ball.png",{
      frameWidth:100,
      frameHeight:100
    });
    this.load.image("boss", "assets/Images/Boss.png");
    this.load.bitmapFont("pixelFont", "assets/font.png", "assets/font.xml")
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 256, 272, "background");
    this.background.setOrigin(0,0);
    this.boss = new Boss(this);
    this.boss.y = -50
    this.boss.setScale(.5);
    //this.player = this.physics.add.sprite(config.width/2,config.scale.height/2+70, "ship3");
    //this.player.setScale(.8);
    //this.player.setAngle(180);
  }
  update(){
    this.boss.y+=.5
    if(this.boss.y===30){
      this.scene.start('MainScene');
    }
  }
}