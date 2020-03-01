import ExampleObject from '../objects/exampleObject';
import Beam from '../objects/Beam'
import BossBeam from '../objects/BossBeam'
import BossBall from '../objects/BossBall'
import Boss from '../objects/Boss'
import Bomb from '../objects/Bomb'
import Player from '../objects/Player'
import { GameObjects } from 'phaser';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  boss: Boss;
  background: Phaser.GameObjects.TileSprite;
  player: Player;
  beam: Phaser.GameObjects.Sprite;
  explosion: Phaser.GameObjects.Sprite;
  bossBall: Phaser.GameObjects.Sprite;
  bomb: Bomb;
  width: number;
  height: number;
  moveLeft: boolean;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  projectiles: GameObjects.Group;
  bossShots: GameObjects.Group;
  body: Phaser.Physics.Arcade.Body;
  hasWon: boolean;
  cycle: number
  scoreLabel: Phaser.GameObjects.BitmapText
  win: Phaser.GameObjects.BitmapText;
  haCount: number;
  flip: boolean;
  
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(){
    this.height = 272;
    this.width = 256;
    this.moveLeft = false;
    this.hasWon = false;
    this.flip = false;
    this.cycle = 0;
    this.haCount = 0;
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.width, this.height, "background");
    this.background.setOrigin(0,0);
    this.boss = new Boss(this);
    this.player = new Player(this);
    this.player.setScale(.8);
    this.player.setAngle(180);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.boss.setScale(.5);
    this.projectiles = this.add.group();
    this.bossShots = this.physics.add.group();
    this.physics.add.overlap(this.projectiles, this.boss, this.hurtBoss);
    this.physics.add.overlap(this.player, this.bossShots, this.lose);
    this.physics.add.overlap(this.player, this.boss, this.loseBoss);
    this.scoreLabel = this.add.bitmapText(10,5,"pixelFont", "Health: ", 16 );
    
    this.anims.create({
      key:"boom_anim",
      frames: this.anims.generateFrameNumbers("explosion",{ start: 0, end: 4 }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key:"beam_anim",
      frames: this.anims.generateFrameNumbers("beam", {start:0, end:1}),
      frameRate: 20,
      repeat:-1
    });
    this.anims.create({
      key:"ball_anim",
      frames: this.anims.generateFrameNumbers("ball", {start:0, end:2}),
      frameRate: 20,
      repeat:-1
    })
    this.anims.create({
      key:"bomb_anim",
      frames: this.anims.generateFrameNumbers("bomb", {start:0, end:1}),
      frameRate: 20,
      repeat: -1
    });
  }

  update() {;
    this.playBoss();
    this.movePlayerManager();
    this.bossShotsManager();
    this.cycle++;

    if(this.cycle === 121){
      this.cycle = 1;
    }

    this.scoreLabel.text = "Boss Health: " + this.boss.health;

    if(this.cycle%10 === 0 && this.boss.health > 0){
      this.shootBeam();
    }
    

    for(let i =0; i<this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update(); 
    }

    if(!this.player.active){
      if(this.haCount < 1500){
        this.haCount++;
        let ha = this.add.bitmapText(Math.floor(Math.random()*this.width),Math.floor(Math.random()*this.height),"pixelFont", "HA", 15 );
      }
    }
    
    this.background.tilePositionY -= 0.5;
  }

  playBoss(){
    if(this.boss.health>0){
      if(this.moveLeft){
       this.boss.x -=1;
        if(this.boss.x === this.width/2-50){
          this.moveLeft = false;
        }
      }
      else{
        this.boss.x +=1;
        if(this.boss.x === this.width/2+50){
          this.moveLeft = true;
        }
      }
    }
    else if(this.player.active){
      this.win = this.add.bitmapText(this.width/2-40,this.height/2-30,"pixelFont", "YOU WIN!", 30 );
      let x = Math.floor(Math.random()* 300);
      let y = Math.floor(Math.random()* 90);
      if(x > this.boss.x - 100 && x < this.boss.x + 100){
        let boomuwu = this.add.sprite(x, y, "explosion")
        boomuwu.play("boom_anim");
      }
    }
  }
  
  movePlayerManager(){
    if(this.player.active){
      if(this.cursorKeys.left?.isDown && this.player.x > 13){
        this.player.x -= 2.5;
      }
      else if(this.cursorKeys.right?.isDown && this.player.x < this.width-13){
        this.player.x += 2.5;
      }
      if(this.cursorKeys.up?.isDown && this.player.y > 13){
        this.player.y -= 2.5;
      }
      else if(this.cursorKeys.down?.isDown && this.player.y < this.height-13){
        this.player.y += 2.5;
      }
    }
  }
  
  shootBeam(){
    if(this.player.active){
      if(this.flip){
        this.flip = false;
        var beam = new Beam(this,1);
      }
      else{
        this.flip = true;
        var beam = new Beam(this,2);
      }
    }
  }

  hurtBoss(projectile, boss){
    boss.hurt()
    projectile.destroy();
  }

  bossShotsManager(){
    if(this.boss.health>0 && this.player.active){
      for(let i =0; i<this.bossShots.getChildren().length; i++){
        let shot = this.bossShots.getChildren()[i];
        shot.update(); 
      }
      if(this.cycle === 120){
        let ball1 = new BossBall(this, 1, 1);
        let ball2 = new BossBall(this, 2, 1);
        let ball3 = new BossBall(this, 3, 1);
        let ball4 = new BossBall(this, 1, 2);
        let ball5 = new BossBall(this, 2, 2);
        let ball6 = new BossBall(this, 3, 2);
      }
      if(this.cycle === 60){
        let shot1 = new BossBeam(this, 1);
        let shot2 = new BossBeam(this, 2);
      }
      if(this.cycle%30 === 0){
        if(this.moveLeft){
          let bomb1 = new Bomb(this,1 , 1, this.cycle);
          let bomb2 = new Bomb(this,1 , 2, this.cycle);
        }
        else{
          let bomb1 = new Bomb(this,2, 1, this.cycle);
          let bomb2 = new Bomb(this,2, 2, this.cycle);
        }
      }
    }
    else{
      for(let i =0; i<this.bossShots.getChildren().length; i++){
        let shot = this.bossShots.getChildren()[i];
        shot.destroy(); 
      }
    }
  }
  lose(player){
      player.destroy();
  }
  loseBoss(player, boss){
    boss.hurt();  //Hi, Seth here, I am sure you are asking "why didn't you write a loop?" 
    boss.hurt();  //The answer is because I didn't want to and it's 5 of them
    boss.hurt();
    boss.hurt();
    boss.hurt();
    if(boss.health > 0){
      player.destroy();
    }
  }
}
