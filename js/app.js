//This file is a part of FEND Classic Arcade Game Clone
//JM 6/2018
//I KEEP HERE ALL THE INITIAL COMMENTS GIVEN IN THE ASSIGNMENT
// Enemies our player must avoid
//declare the button to restart the game
var restartBtn = document.querySelector('input[type="button"]');

var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.width = 90;
  this.height = 80;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 505) {
    this.x = 0;
    Enemy();
  }
  checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
  this.sprite = 'images/char-horn-girl.png';
  this.x = x;
  this.y = y;
  this.width = 5;
  this.height = 50;
  score = 0;
  //return player to the initial position
  this.stepBack = function stepBack() {
    this.x = 400;
    this.y = 400;
  };
  //display a modal when a player reaches the water
  this.gameOver = function gameOver() {

    restartBtn.onclick = function() {
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillRect(0, 0, width, height);
      score = 0;
      player.stepBack();
    }
  };
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.shadowBlur = 0;
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.shadowBlur = 0;
  ctx.fillText(`Score: ${score}`, 20, 20);
  //declare the conditions when the player reaches the water
  if (player.x > -100 && player.x < 500 && player.y > -100 && player.y < 40) {
    //draw the congratulation modal
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.fillRect(130, 120, 250, 250);
    ctx.font = "32px Arial";
    ctx.fillStyle = "green";
    ctx.shadowBlur = 0;
    ctx.fillText(`You won!`, 190, 240);
    ctx.closePath();
  }
};
// This class requires an update(), render() and
// a handleInput() method.
//move the player one step at a time by pressing key buttons
Player.prototype.handleInput = function(keyCode) {
  //score moves
  score++;
  if (keyCode === 'left' && this.x > 10) {
    this.x -= 100
  }
  if (keyCode === 'right' && this.x < 400) {
    this.x += 100
  }
  if (keyCode === 'up' && this.y > 1) {
    this.y -= 90
  }
  if (keyCode === 'down' && this.y < 400) {
    this.y += 90
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
//move the bugs
let bugs = [50, 50, 130, 220, 220];
for (const bug of bugs) {
  let enemy = new Enemy(0, bug, 0 + Math.floor(Math.random() * Math.floor(300)));
  allEnemies.push(enemy);
}
// Place the player object in a variable called player
let player = new Player(400, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
//check if the collision occurs
function checkCollisions() {
  for (let i = 0; i < allEnemies.length; i++) {
    if (player.x + player.width > allEnemies[i].x && player.x < allEnemies[i].x + allEnemies[i].width && player.y + player.height > allEnemies[i].y && player.y < allEnemies[i].y + allEnemies[i].height) {
      player.stepBack(400, 400);
      score = 0;
    }
    if (player.x > -100 && player.x < 500 && player.y > -100 && player.y < 50) {

      player.gameOver();

    }
  }
};
