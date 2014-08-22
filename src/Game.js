var  leftBtn,rightBtn;
var playing = false;
var showTimer;
BasicGame.Game = function (game) {

//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator




//	You can use any of these from any function within this State.
//	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {


        /**
         * Background
         * @type {Phaser.Graphics}
         */
        this.bg = this.add.graphics(0, 0);
        this.bg.beginFill(0xCCEEFF, 1);
        this.bg.drawRect(0, 0, this.world.width, this.world.height);
        this.bg.endFill();


        /**
         * Espada
         * @type {Phaser.Sprite}
         */
        this.espada = this.add.sprite(325, 950, 'espada');
        this.espada.scale.setTo(2.0,2.0);
        this.espada.anchor.setTo(0,1,0,1);
        //this.espada.input.enableDrag();

        /**
         * Roca
         * @type {Phaser.Sprite}
         */
        this.roca = this.add.sprite(10, 750, 'roca');
        this.roca.scale.setTo(2.0,2.0);


        this.game.time.events.add(Phaser.Timer.SECOND * 2, showEscudo, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, showInstrucciones, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, showBoton, this);





        function showEscudo(){

            this.escudo = this.add.sprite(this.game.width/2 -(536/2), -50, 'escudo');
            this.tween = this.add.tween(this.escudo).to( { y: 100 }, 1500, Phaser.Easing.Bounce.Out, true);
        }

        function showInstrucciones(){
            var titulo = this.add.text(3 * this.world.width / 6,this.world.height / 3,"",{
                    font: '20px "Press Start 2P"',
                    fill: '#fff',
                    stroke: '#210',
                    strokeThickness: 8,
                    align: 'center'
                });
            titulo.setText("Retira la espada\nde la piedra\nsiguiendo las\nindicaciones\n\n\nEstas listo?");
            titulo.anchor.setTo(0.5, 0.5);
            titulo.renderable = false;
            titulo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        }


        function showBoton(){
            var botonok = this.add.sprite(this.game.width/2 , 570, 'botonok');
            botonok.anchor.setTo(0.5, 0.5);
            botonok.alpha = 0;
            this.game.add.tween(botonok).to( { alpha: 1 }, 1000, null, true);
            this.game.input.onDown.add(this.startGame, this);
        }



        /**
         * Boton izq
         * @type {Phaser.Sprite}
         */
        leftBtn = this.add.sprite(232 - 112, 350, 'boton-flecha', 0);
        leftBtn.alpha = 0;
        leftBtn.inputEnabled = true;


        /**
         * Boton der
         * @type {Phaser.Sprite}
         */
        rightBtn = this.add.sprite(640 - 112, 350, 'boton-flecha', 1);
        rightBtn.alpha = 0;
        rightBtn.inputEnabled = true;





    },

    update: function () {
        if (playing == true){
            if(leftBtn.input.pointerOver()){
                this.espada.rotation = -0.06;
                leftBtn.alpha = 0.5;
                rightBtn.alpha = 0;
            }

            if(rightBtn.input.pointerOver()){
                this.espada.rotation = 0.06;
                rightBtn.alpha = 0.5;
                leftBtn.alpha = 0;
            }
        }

        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    render: function(){
        this.game.debug.inputInfo(32, 32);
        this.game.debug.spriteInputInfo(leftBtn, 300, 32);
    },
    startGame: function(){
        console.log('ahora si');
    }

};
