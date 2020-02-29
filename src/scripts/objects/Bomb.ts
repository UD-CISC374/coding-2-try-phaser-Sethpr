export default class Bomb extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;
    len: number;

    constructor(scene, mode:number, side:number, seq:number) {
        if(side === 1){
            let x = scene.boss.x - 39;
            let y = scene.boss.y + 60;
            super(scene, x, y, "bomb");
        }
        else {
            let x = scene.boss.x + 39;
            let y = scene.boss.y + 60;
            super(scene, x, y, "bomb");
        }
        scene.add.existing(this);
        scene.bossShots.add(this);
        this.len = scene.height;
        this.setScale(.5);


        this.play("bomb_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 120;
        if(mode === 1){
            this.body.velocity.x = seq;
        }
        else{
            this.body.velocity.x = -120-seq;
        }
    }

    update(){
        if (this.y > 272){
            this.destroy();
        }
    }
}