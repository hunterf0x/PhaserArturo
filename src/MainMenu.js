
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
    this.bg = null;
    this.clouds =null;
    //var cloudsTimer=null;
    this.SPEED = 180;
    this.cloud=null;


};




BasicGame.MainMenu.prototype = {



    preload: function(){
        //this.load.spritesheet('buttonJugar', 'images/buttons/button_play.png', 128, 65);
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


    },
	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)


        this.bg = this.add.graphics(0, 0);
        this.bg.beginFill(0xCCEEFF, 1);
        this.bg.drawRect(0, 0, this.world.width, this.world.height);
        this.bg.endFill();

        var titulo = this.add.text(
            3 * this.world.width / 6,
            this.world.height / 3,
            "",
            {
                font: '30px "Press Start 2P"',
                fill: '#fff',
                stroke: '#410',
                strokeThickness: 8,
                align: 'center'
            }
        );
        titulo.setText("ARTURO\nY\nLA\nESPADA!");
        titulo.anchor.setTo(0.5, 0.5);
        titulo.renderable = false;

        this.playButton = this.add.button(this.world.centerX - 65, 500, 'playButton', this.startGame, this, 1,0,2);
        this.clouds = this.add.group();

        //cloudsTimer = new Phaser.Timer(this.game);



        //cloudsTimer.start();
        spawnCloud;
        this.game.time.events.loop(Phaser.Timer.SECOND*4, spawnCloud, this);
        //cloudsTimer.add(Math.random());

        function spawnCloud(){
            //console.log('hola');
            //cloudsTimer.stop();

            var cloudY = Math.random() * this.game.height / 3;
            var cloud = this.clouds.create(
                this.game.width,
                cloudY,
                'clouds',
                Math.floor(4 * Math.random())
            );
            var cloudScale = 2 + 2 * Math.random();
            cloud.alpha = 2 / cloudScale;
            cloud.scale.setTo(cloudScale, cloudScale);
            this.game.physics.arcade.enableBody(cloud);
            cloud.body.allowGravity = false;
            cloud.body.velocity.x = -this.SPEED / cloudScale;
            cloud.anchor.y = 0;

            //cloudsTimer.start();
            //cloudsTimer.add(4 * Math.random());
        }

        //this.reset();


		/*this.music = this.add.audio('titleMusic');
		this.music.play();*/

		//this.add.sprite(0, 0, 'titlepage');

	    //this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

	},

	update: function () {
        //console.log('lala');

		//	Do some nice funky main menu effect here
        //cloudsTimer.update();
        // Remove offscreen clouds
        this.clouds.forEachAlive(function(cloud) {
            //console.log(cloud.parent);
            if(cloud.inWorld == false){
                cloud.kill();

            }

            /*if (cloud.x + cloud.width < this.world.bounds.left) {
                cloud.kill();
            }*/
        });
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}



};
