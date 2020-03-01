export default class Player extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;

    constructor(scene) {
        let x = scene.width/2;
        let y = scene.height/2+70;
        super(scene, x, y, "player");
        scene.anims.create({
            key:"player_anim",
            frames: scene.anims.generateFrameNumbers("player",{ start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
          });
        this.play("player_anim");
        scene.add.existing(this);
        //this.play("player_anim");
        scene.physics.world.enableBody(this);
        this.body.setSize(26, 24);
        this.body.setOffset(3,0);
    }
}