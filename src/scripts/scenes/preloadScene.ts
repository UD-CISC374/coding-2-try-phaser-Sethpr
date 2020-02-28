import Boss from '../objects/Boss'
export default class PreloadScene extends Phaser.Scene {//this.scene.start('MainScene');
  background: Phaser.GameObjects.TileSprite
  boss: Boss;
  bossArive: boolean;
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background" , "assets/Images/background.png");
    this.load.image("boss", "assets/Images/Boss.png");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 256, 272, "background");
    this.background.setOrigin(0,0);
    this.boss = new Boss(this);
    this.boss.y = -50
    this.boss.setScale(.5);
  }
  update(){
    this.boss.y+=.5
    if(this.boss.y===30){
      this.scene.start('MainScene');
    }
  }
}