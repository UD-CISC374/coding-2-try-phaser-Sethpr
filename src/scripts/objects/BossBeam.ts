export default class BossBeam extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;

    constructor(scene, type:number) {
        if(type === 1){
            let x = scene.boss.x-20;
            let y = scene.boss.y+70;
            super(scene, x, y, "beam");
        }
        else{
            let x = scene.boss.x+20;
            let y = scene.boss.y+70;
            super(scene, x, y, "beam");
        }
        scene.add.existing(this);
        this.setAngle(180);//making the hitbox more accurate so you can fly through the middle with them MAD SKILLZ
        this.setSize(8,10);
        scene.bossShots.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 150;
        this.body.setOffset(4,4);//for some reason the offset to fix the hitbox had to be here, but it makes it line up
    }

    update(){
        if (this.y > 272){
            this.destroy();
        }
    }
}