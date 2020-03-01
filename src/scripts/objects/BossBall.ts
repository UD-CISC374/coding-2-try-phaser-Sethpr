export default class BossBall extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;
    len: number;

    constructor(scene, mode:number, side:number) {
        if(side === 1){ //this determines the gun the boss shoots from
            let x = scene.boss.x - 58;
            let y = scene.boss.y + 50;
            super(scene, x, y, "ball");
        }
        else {
            let x = scene.boss.x + 58;
            let y = scene.boss.y + 50;
            super(scene, x, y, "ball");
        }
        scene.add.existing(this);
        scene.bossShots.add(this);
        this.len = scene.height;
        this.setScale(.35);  //hitbox correction stuff
        this.body.setSize(50,50); 
        this.body.setOffset(30,17)

        this.play("ball_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 120;
        if(mode === 1){  //makes the balls fly in 3 different directions
            this.body.velocity.x = 90;
        }
        else if(mode === 3){
            this.body.velocity.x = -90;
        }

    }

    update(){
        if (this.y > 272){
            this.destroy();
        }
    }
}