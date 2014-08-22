var  leftBtn,rightBtn;
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
    this.espada;



    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {

        this.bg = this.add.graphics(0, 0);

        this.bg.beginFill(0xCCEEFF, 1);

        this.bg.drawRect(0, 0, this.world.width, this.world.height);
        this.bg.endFill();


        this.espada = this.add.sprite(325, 950, 'espada');
        var roca = this.add.sprite(10, 750, 'roca');
        roca.scale.setTo(2.0,2.0);
        this.espada.scale.setTo(2.0,2.0);



        leftBtn = this.add.sprite(232 - 112, 500, 'boton-flecha', 0);
        leftBtn.alpha = 0;
        rightBtn = this.add.sprite(640 - 112, 500, 'boton-flecha', 1);
        rightBtn.alpha = 0;

        leftBtn.inputEnabled = true;
        rightBtn.inputEnabled = true;
        this.espada.anchor.setTo(0,1,0,1);

        //this.espada.input.enableDrag();
    },

    update: function () {
        if(leftBtn.input.pointerOver()){
            this.espada.rotation = -0.01;
            leftBtn.alpha = 0.5;
            rightBtn.alpha = 0;
        }

        if(rightBtn.input.pointerOver()){
            this.espada.rotation = 0.01;
            rightBtn.alpha = 0.5;
            leftBtn.alpha = 0;
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
    }

};
