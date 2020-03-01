export default class Boss extends Phaser.GameObjects.Image{
    body: Phaser.Physics.Arcade.Body;
    health: number;

    constructor(scene) {//the big boy, the chonker, the unit, boss he's cool I guess
        let x = 256/2;
        let y = 30;
        super(scene, x, y, "boss");
        this.health = 100
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }


    hurt(){ //wow you are actually reading this? It's pretty self explanitory 
        if(this.health>0){
            this.health--;
        }
    }
}