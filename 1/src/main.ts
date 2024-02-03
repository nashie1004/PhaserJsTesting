// import Phaser from 'phaser'
import sky from "./assets/sky.png"
import ground from "./assets/platform.png"
import star from "./assets/star.png"
import bomb from "./assets/bomb.png"
import dude from "./assets/dude.png"
import 'phaser';


class Game extends Phaser.Scene{
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super();
        
    }

    preload(){
        this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48 })
        this.load.image("sky", sky) // 800 x 600
        this.load.image("ground", ground) //400 x 32
        this.load.image("star", star)
        this.load.image("bomb", bomb)
    }

    create(){
        this.add.image(1, 0, "sky").setOrigin(0, 0)

        // create tiles
        const tiles = this.physics.add.staticGroup();
        tiles.create(400, 180, "ground")
        tiles.create(400, 570, "ground")
        tiles.create(230, 450, "ground")
        tiles.create(50, 350, "ground")
        tiles.create(550, 300, "ground")
        tiles.create(-100, 250, "ground")

        // create stars

        // create player
        this.player = this.physics.add
        .sprite(400, 0, "dude")
        .setCollideWorldBounds(true)
        .setBounce(0.15);

            // move player
        this.anims.create({
            key: "left"
            ,frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 })
            ,frameRate: 10
            ,repeat: -1
        })

        this.anims.create({
            key: "turn",
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        })

        this.anims.create({
            key: "right"
            ,frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 })
            ,frameRate: 10
            ,repeat: -1
        })

        // event listener
        this.cursors = this.input.keyboard.createCursorKeys();

        // coliders
        this.physics.add.collider(this.player, tiles)
    }

    update(): void {
        
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true)
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play("right", true)
        } 
        else {
            this.player.setVelocityX(0)
            this.player.anims.play("turn", true)
        }

        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-400)
        }

    }
}

const config: Phaser.Types.Core.GameConfig  = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: Game
}

const game = new Phaser.Game(config);