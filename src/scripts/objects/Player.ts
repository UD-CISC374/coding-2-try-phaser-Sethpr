export default class Player extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;

    constructor(scene) {
        let x = scene.width/2;
        let y = scene.height/2+70;
        super(scene, x, y, "player");
        scene.anims.create({//I do this here cause I needed to do it before I created the player and any other place
            key:"player_anim", // looked like garbage
            frames: scene.anims.generateFrameNumbers("player",{ start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
          });
        this.setScale(.8);//resize
        this.setAngle(180);//flip
        this.play("player_anim");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setSize(26, 24);//hitbox correction                                                                                                                hi there
        this.body.setOffset(3,0);
    }
}