import Boss from '../objects/Boss'
export default class PreloadScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite
  boss: Boss;
  bossArive: boolean;
  player: Phaser.GameObjects.Sprite; 

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {//Hey look I have all my images (wow)
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

  create() {//wow this is a lot of lines for a stupid flyup animation
    this.background = this.add.tileSprite(0, 0, 256, 272, "background");
    this.background.setOrigin(0,0);
    this.boss = new Boss(this);
    this.boss.y = -50
    this.boss.setScale(.5);
    this.player = this.physics.add.sprite(256/2,286, "ship3");
    this.player.setScale(.8);
    this.player.setAngle(180);
    this.anims.create({
      key:"player_anim",
      frames: this.anims.generateFrameNumbers("player",{ start: 0, end: 1 }),
      frameRate: 20,
      repeat: -1
    });
    this.player.play("player_anim");
  }
  update(){//wow you deticated even more lines of code to a flyup animation, whats wrong with you
    this.boss.y+=.5;
    this.player.y-=.5;
    if(this.boss.y===30){
      this.scene.start('MainScene');
    }
  }
}