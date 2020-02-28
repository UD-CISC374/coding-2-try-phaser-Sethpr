export default class Boss extends Phaser.GameObjects.Image{
    body: Phaser.Physics.Arcade.Body;
    health: number;

    constructor(scene) {//this.physics.add.image(this.width/2,30, "boss");
        let x = 256/2;
        let y = 30;
        super(scene, x, y, "boss");
        this.health = 50;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }


    hurt(){
        if(this.health>0){
            this.health--;
        }
    }
}