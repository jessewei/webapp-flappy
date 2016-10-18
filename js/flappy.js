// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/jamesBond.gif");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#3399ff");
    game.add.text(20, 20, "Welcome to my game", {font: "30px Arial", fill: "#FFFFFF"});
    // game.add.sprite(10, 270, "playerImg");
    game.input.onDown.add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);


    // alert(score);
    labelScore = game.add.text(20, 20, "0");
    // changeScore();
    // changeScore();

    player = game.add.sprite(100, 200, "playerImg");

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.x = 100;
    player.body.gravity.y = 100;

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown
        .add(playerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                       .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                      .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
                       .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
                      .onDown.add(moveDown);

    // generatePipe();
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(
        pipeInterval,
        generatePipe
    );
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
   game.physics.arcade.overlap(
       player,
		  pipes,
		  gameOver);
}

function gameOver(){
   location.reload();
}

function clickHandler(event) {
    // alert("Click!");
    // alert("The position is: " + event.x + "," + event.y);
    player = game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
	score = score + 1;
  labelScore.setText(score.toString());
}

function moveRight() {
	player.x = player.x + 10;
  // console.log(player.x);
}
function moveLeft() {
	player.x = player.x - 10;
  // console.log(player.x);
}
function moveUp() {
	player.y = player.y - 10;
}
function moveDown() {
	player.y = player.y + 10;
}

//  Pipe
function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // insert it in the 'pipes' array
    pipes.push(block);
}

function generatePipe() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();
}

function playerJump() {
    player.body.velocity.y = -200;
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}
