export default class Bomb extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;
    len: number;

    constructor(scene, mode:number, side:number, seq:number) {
        if(side === 1){ //wow this looks terrible, well at least it does not in game uwu
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
        this.setScale(.6); //bomb too big, no longer too big


        this.play("bomb_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 130;
            if(mode === 1){ //whats this switchy crap? I like things to move in different directions, cool it
                this.body.velocity.x = 50;
            }
            else{
                this.body.velocity.x = -50;
            }
    }

    update(){
        if (this.y > 272){
            this.destroy();
        }
    }
}