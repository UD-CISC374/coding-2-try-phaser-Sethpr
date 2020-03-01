export default class Beam extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;

    constructor(scene, mode:number) {
        if(mode === 1){//alternates sides to look nice
        let x = scene.player.x+6;
        let y = scene.player.y-9;
        super(scene, x, y, "beam");
        }
        else{
            let x = scene.player.x-6;
        let y = scene.player.y-9;
        super(scene, x, y, "beam");
        }
        scene.add.existing(this);
        scene.projectiles.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250; //nyoom
    }

    update(){
        if (this.y < 32){
            this.destroy();
        }
    }
}